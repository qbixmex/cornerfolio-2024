"use client";

import { useEffect, useState } from "react";
import LicensePopup from "@/components/licensePopup";
import Modal from "react-modal";
import { UserResponse } from "../interfaces/users";
import DeleteAccount from "./delete/delete-account";
// import styles from "./profile.module.css";
import UpdateUserForm from "./update/update-form";
import PasswordForm from "./update/update-password-form";
import moment from "moment";
import Toast from "@/components/toast";
import { useAppSelector } from "@/store";

type Props = {
  user: UserResponse;
};

const ProfileBody: React.FC<Props> = ({ user }) => {
  const { toast } = useAppSelector((state) => state);

  useEffect(() => {
		// Remove the data-theme attribute
		document.documentElement.removeAttribute('data-theme');
		// Remove the style attribute
		document.documentElement.removeAttribute('style');
	}, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section className="relative">
      {(toast.message) && (
        <Toast type={toast.type}>{toast.message}</Toast>
      )}

      <section className="w-[95%] md:w-[80%] mx-auto py-10">
        <h1 className="text-6xl text-slate-700 font-semibold tracking-tight mb-10">
          User Profile
        </h1>

        <h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-5">
          Account Details
        </h2>

        <hr className="border-b-1 w-full mb-10" />

        <UpdateUserForm user={user} />

        <hr className="border-b-1 w-full my-10" />

        <h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-5">
          Update Password
        </h2>

        <hr className="border-b-1 w-full mb-10" />

        <PasswordForm id={user.id} />

        <hr className="border-b-1 w-full mb-10" />

        <h2 className="text-4xl text-stone-700 font-semibold tracking-tight mb-10">
          Membership
        </h2>

        <section>
          <section className="grid grid-cols-1 lg:grid-cols-2">
            <section className="flex gap-x-5 items-center  w-full">
              <h3 className="text-3xl text-stone-600 font-semibold tracking-tight">
                Current Plan
              </h3>
              <div className={`${user.license.type === "free" ? "bg-gray-200 text-gray-700" : "bg-orange-500 text-white"} font-bold text-lg text-slate-900 w-fit px-5 py-2 rounded`}>
                { (user.license.type === "free" ) ? "Free" : "Premium" }
              </div>
            </section>
            {
              (user.license.type !== "premium") && (
                <section>
                  <button
                    type="submit"
                    className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleOpenModal}
                  >
                    upgrade to premium
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    ariaHideApp={false}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      },
                      content: {
                        width: "50%",
                        height: "50%",
                        margin: "auto",
                        padding: "5px",
                        border: "none",
                        borderRadius: "0.75rem",
                      },
                    }}
                  >
                    <div className="flex justify-end">
                      <button onClick={handleCloseModal}>✖️</button>
                    </div>
                    <LicensePopup
                      license={user.license}
                      closeModal={handleCloseModal}
                    />
                  </Modal>
                </section>
              )
            }
          </section>
          {(user.license.type === "premium") && (
            <section className="mt-5">
              <table>
                <tbody>
                  <tr className="border-b">
                    <th className="font-bold text-slate-700 p-2 w-[110px] text-left">Start Date:</th>
                    <td className="font-semibold text-blue-700 p-2">
                      { moment(user.license?.startDate).utc().format('MMMM D, YYYY') }
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr className="border-b">
                    <th className="font-bold text-slate-700 p-2 w-[110px] text-left">End Date:</th>
                    <td className="font-semibold text-blue-700 p-2">
                      { moment(user.license?.endDate).utc().format('MMMM D, YYYY') }
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
        </section>

        <hr className="border-b-1 w-full my-10" />

        <section className="block lg:flex lg:items-center lg:gap-x-3 w-full">
          <h2 className="lg:w-4/12 text-3xl text-stone-700 font-semibold tracking-tight mb-6 lg:mb-0">
            Delete Account
          </h2>
          <div className="lg:w-8/12 h-auto">
            <DeleteAccount userId={user.id} />
          </div>
        </section>
      </section>
    </section>
  );
};

export default ProfileBody;
