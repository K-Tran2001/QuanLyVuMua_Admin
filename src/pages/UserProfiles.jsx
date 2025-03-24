import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import TextArea from "../components/form/input/TextArea";
import Button from "../components/ui/button/Button";
import React from "react";
import { PushNotify } from "../api/eventService";
import { toast } from "react-toastify";

export default function UserProfiles() {
  const [request, setRequest] = React.useState({
    token:
      "fMyL2hgFS2yL49x5MsQKPA:APA91bEKyrmA3NFgiDq9X4Jckqm1esbhR1A00JbaEeQKkWC2ov5e7ULcjG0GuDtblKMgojnmV6ciioh29JXYY0yRC4U-8hGIpYXzNmVzqHrw0FJT7hjwtvE",
    title: "Thông báo mới",
    message: "Notify mới",
  });
  const handleSenNotify = async () => {
    const res = await PushNotify(request);
    if (res.success) {
      toast.success("Push notify success!");
    }
  };
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
          <div>
            <div className="mb-4">
              <Label children={"Title"} />
              <Input
                value={request.title}
                onChange={(value) => setRequest({ ...request, title: value })}
              />
            </div>
            <div className="mb-4">
              <Label children={"Message"} />
              <TextArea
                value={request.message}
                onChange={(value) => setRequest({ ...request, message: value })}
                rows={6}
              />
            </div>
            <Button children={"Send"} onClick={handleSenNotify} />
          </div>
        </div>
      </div>
    </>
  );
}
