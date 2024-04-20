"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { ReactNode, useEffect } from "react";
import Toast from "./toast";
import { resetToast } from "@/store/slices/toast.slice";

type Props = {
  children?: ReactNode;
};

const ToastNotification: React.FC<Readonly<Props>> = ({ children }) => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(state => state.toast);
  useEffect(() => {
		if (toast.message.length > 0) {
			setTimeout(() => dispatch(resetToast()), 3000);
		}
	}, [toast.message]);
  return (
    <>
      {(toast.message.length > 0) && (
        <Toast type={toast.type}>{toast.message}</Toast>
      )}
      {children}
    </>
  );

};

export default ToastNotification;
