"use client";

import { License } from "@/interfaces";
import { useAppDispatch } from "@/store";
import { setToast } from "@/store/slices/toast.slice";
import { updateLicense } from "@/users/actions/license.actions";

import { FormEvent, useState } from "react";

type Props = {
  license: License;
  closeModal: () => void;
};

const LicensePopup: React.FC<Props> = ({ license, closeModal }) => {
  //* This is for button to be disabled, implement this after being able to get login-user membership info
  const [isFree, setIsFree] = useState(true);
  const dispatch = useAppDispatch();

  const handleUpgrade = async (event: FormEvent) => {
    event.preventDefault();

    const data = await updateLicense(license);

    if (data.error) {
      dispatch(setToast({ message: data.error, type: "error" }));
      closeModal();
    }

    if (data.message) {
      dispatch(setToast({ message: data.message, type: "success" }));
      closeModal();
    }
  };

  const handleDowngrade = () => {
    console.log("Now downgraded to free 😢");
  };

  return (
    <div className="h-[90%] flex justify-between p-5">
      <div className="flex flex-col justify-between mx-auto border-2 w-[40%] px-10 py-5">
        <div>
          <h1 className="text-2xl text-center mb-5">Free</h1>
          <p>$0/month</p>
          <p className="my-5">1 portfolio</p>
        </div>
        <div className="w-full">
          <button
            className={`mx-auto block w-full p-1 rounded-md text-white ${isFree ? "bg-gray-400" : "bg-indigo-600"
              }`}
            onClick={handleDowngrade}
            disabled={isFree}
          >
            Current plan
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between mx-auto border-2 w-[40%] px-10 py-5">
        <div>
          <h1 className="text-2xl text-center mb-5">Premium</h1>
          <p>$10/month</p>
          <p className="my-5">Unlimited</p>
        </div>

        <div className="w-full">
          <form onSubmit={handleUpgrade}>

            <button
              type="submit"
              className={`mx-auto block w-full p-1 rounded-md text-white ${isFree ? "bg-indigo-600" : "bg-gray-400"
                }`}
              disabled={!isFree}
            >Upgrade</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LicensePopup;
