import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import PageMeta from "../../components/common/PageMeta";
import DatePicker from "../../components/form/input/DatePicker";
import dayjs from "dayjs";
import {
  DeleteEvent,
  GetAllEvent,
  SaveEvent,
  UpdateEvent,
} from "../../api/eventService";
import { toast } from "react-toastify";
import Button from "../../components/ui/button/Button";

const Calendar = () => {
  const INIT_REQUEST = {
    id: "",
    title: "",
    start: dayjs().toDate(),
    end: dayjs().add(1, "day").toDate(),
    allDay: true,
    extendedProps: { calendar: "" },
  };

  const [request, setRequest] = useState(INIT_REQUEST);
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [errors, setErrors] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageFilter, setPageFilter] = useState({
    fromDate: dayjs().startOf("month").toDate(), // Ngày đầu tháng (kiểu Date)
    toDate: dayjs().endOf("month").toDate(), // Ngày cuối tháng (kiểu Date)
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState(dayjs().toDate());
  const [eventEndDate, setEventEndDate] = useState(dayjs().toDate());
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  const handleDateSelect = (selectInfo) => {
    console.log("selectInfo", selectInfo);

    resetModalFields();
    setRequest({
      ...request,
      title: selectInfo.title,
      start: selectInfo.start,
      end: selectInfo.end || selectInfo.start,
    });
    openModal();
  };

  const handleEventClick = (clickInfo) => {
    console.log("clickInfo", clickInfo);

    const event = clickInfo.event;
    console.log("event", event);

    setSelectedEvent(event);
    setRequest({
      ...request,
      id: event?.extendedProps?._id,
      title: event.title,
      start: event.start,
      end: event.end,
      extendedProps: { calendar: event.extendedProps.calendar },
    });

    openModal();
  };

  // const handleAddOrUpdateEvent = () => {
  //   if (selectedEvent) {
  //     // Update existing event
  //     setEvents((prevEvents) =>
  //       prevEvents.map((event) =>
  //         event.id === selectedEvent.id
  //           ? {
  //               ...event,
  //               title: request.title,
  //               start: request.start,
  //               end: request.end,
  //               extendedProps: { calendar: request.extendedProps.calendar },
  //             }
  //           : event
  //       )
  //     );
  //   } else {
  //     // Add new event
  //     const newEvent = {
  //       id: Date.now().toString(),
  //       title: request.title,
  //       start: request.start,
  //       end: request.end,
  //       allDay: true,
  //       extendedProps: { calendar: request.extendedProps.calendar },
  //     };
  //     setData((prevEvents) => [...prevEvents, newEvent]);
  //   }
  //   closeModal();
  //   resetModalFields();
  // };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
      UpdateData();
    } else {
      // Add new event
      SaveData();
    }
  };
  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };
  const handleViewChange = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const view = calendarApi.view; // Lấy view hiện tại

      const start = view.currentStart; // Ngày bắt đầu của view
      const end = view.currentEnd; // Ngày kết thúc của view

      setPageFilter({
        ...pageFilter,
        fromDate: start,
        toDate: end,
      });
    }
  };

  const LoadData = async () => {
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    GetAllEvent(pageFilter)
      .then((res) => {
        if (res.success) {
          setData(res.data);
          setTotalRecords(res.metaData.totalRecords);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };
  const onValidate = () => {
    var listError = [];
    // if (request == null || request?.productName?.length === 0) {
    //   listError = [...listError, "productName"];
    // }
    // if (request == null || request?.price == "" || request?.price == null) {
    //   listError = [...listError, "price"];
    // }
    // if (request == null || request?.number == "" || request?.number == null) {
    //   listError = [...listError, "number"];
    // }
    setErrors(listError);
    return listError.length == 0;
  };
  const SaveData = async () => {
    if (isBusy) {
      return;
    }
    if (!onValidate()) {
      return;
    }

    SaveEvent(request)
      .then((res) => {
        if (res.success) {
          toast.success("Create Success!");
          LoadData();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeModal();
        resetModalFields();
        setIsBusy(false);
      });
  };
  console.log("request", request);
  console.log("dataa", data);

  const UpdateData = async () => {
    if (isBusy) {
      return;
    }
    if (!onValidate()) {
      return;
    }
    setIsBusy(true);
    UpdateEvent(request.id, request)
      .then((res) => {
        if (res.success) {
          toast.success("Update Success!");
          LoadData();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeModal();
        resetModalFields();
        setIsBusy(false);
      });
  };

  const DeleteData = async () => {
    if (isBusy) {
      return;
    }
    setIsBusy(true);
    DeleteEvent(request.id)
      .then((res) => {
        if (res.success) {
          toast.success("Delete Success!");
          LoadData();
        }
      })
      .catch(() => {
        toast.error("Delete Failed!");
      })
      .finally(() => {
        closeModal();
        resetModalFields();
        setIsBusy(false);
      });
  };

  useEffect(() => {
    LoadData();
  }, [pageFilter]);

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next addEventButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={data}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            customButtons={{
              addEventButton: {
                text: "Add Event +",
                click: openModal,
              },
            }}
            datesSet={handleViewChange} // Gọi khi view thay đổi
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plan your next big moment: schedule or edit an event to stay on
                track
              </p>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Event Title
                  </label>
                  <input
                    id="event-title"
                    type="text"
                    value={request?.title}
                    onChange={(e) => {
                      setEventTitle(e.target.value);
                      setRequest({
                        ...request,
                        title: e.target.value,
                      });
                    }}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Color
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {Object.entries(calendarsEvents).map(([key, value]) => (
                    <div key={key} className="n-chk">
                      <div
                        className={`form-check form-check-${value} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`modal${key}`}
                        >
                          <span className="relative">
                            <input
                              className="sr-only form-check-input"
                              type="radio"
                              name="event-level"
                              value={key}
                              id={`modal${key}`}
                              checked={request.extendedProps.calendar === key}
                              onChange={() => {
                                setEventLevel(key);
                                setRequest({
                                  ...request,
                                  extendedProps: { calendar: key },
                                });
                              }}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  eventLevel === key ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter Start Date
                </label>
                {/* <div className="relative">
                  <input
                    id="event-start-date"
                    type="date"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div> */}
                <DatePicker
                  initValue={request.start}
                  onChange={(e) => {
                    setRequest({
                      ...request,
                      start: e,
                    });
                  }}
                />
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter End Date
                </label>
                {/* <div className="relative">
                  <input
                    id="event-end-date"
                    type="date"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div> */}
                <DatePicker
                  initValue={request.end}
                  onChange={(e) => {
                    setRequest({
                      ...request,
                      end: e,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>
              {selectedEvent && (
                <button
                  onClick={DeleteData}
                  type="button"
                  className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 sm:w-auto"
                >
                  Delete
                </button>
              )}

              <button
                onClick={handleAddOrUpdateEvent}
                type="button"
                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                {selectedEvent ? "Update Changes" : "Add Event"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const renderEventContent = (eventInfo) => {
  console.log("eventInfo", eventInfo);

  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`relative event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      {false && <div className="fc-event-time">{eventInfo.timeText}</div>}

      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;
