import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import "../App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";

const LayoutContent = () => {
  const context = useContext(MainContext);
  const navigate = useNavigate();
  const { user } = context;
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/signin", { replace: true });
  //   }
  // }, []);
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="dark:bg-[var(--color-gray-800)] p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <ToastContainer />

      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
