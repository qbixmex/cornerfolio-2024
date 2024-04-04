import { FaExclamationTriangle } from "react-icons/fa";

type Props = {
  message: string;
};

const ErrorToast: React.FC<Readonly<Props>> = ({ message }) => {
  return (
    <section className="absolute top-[50%] translate-x-[-200px] translate-y-[-50px] left-[50%] w-[400px] h-[100px] flex items-center justify-center gap-x-4 bg-red-500 p-5 rounded-lg text-white font-bold text-2xl">
      <FaExclamationTriangle size={32} />
      <span>{message}</span>
    </section>
  );
};

export default ErrorToast;
