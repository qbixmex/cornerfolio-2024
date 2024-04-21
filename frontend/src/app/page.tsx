import { default as Image } from "next/image";
import Link from "next/link";
import samplePic from "../../public/sample.png";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white pt-4 sm:px-8 sm:pt-8 lg:pt-5 h-screen">
      <div className="w-[95%] mx-auto h-full">
        <div className="flex justify-end gap-5 mb-5 sm:mb-5 lg:mb-8 md:flex-row border-b-black font-sans text-lg">
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
        <div className="w-full flex flex-col sm:flex-row sm:pt-28 md:justify-between md:gap-4">
          <section className="w-full mb-10 sm:mb-0 md:w-max-8/12 flex justify-center sm:pt-20 lg:pt-40">
            <h1 className="text-lg sm:text-center font-semibold leading-relaxed md:text-2xl lg:text-3xl">
              Welcome to <span className="inline text-blue-400 opacity-90 text-2xl md:text-4xl font-bold">Cornerfolio</span><br />
              the best and easy way<br />
              to make your portfolio.
            </h1>
          </section>
          <section className="w-full flex flex-col h-full">
            <div className="block mb-0 md:flex md:flex-col md:max-w-4/12 md:justify-center md:items-center md:gap-y-4">
              <Image
                src={samplePic}
                alt="sample picture"
                width={480}
                height={300}
                className="max-w-[300px] mx-auto md:max-w-full h-auto mb-12 sm:mb-4 md:mb-0 lg:pb-0"
              />
              <Image
                src={samplePic}
                alt="sample picture"
                width={480}
                height={300}
                className="max-w-[300px] mx-auto h-auto md:max-w-full lg:pb-0"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
