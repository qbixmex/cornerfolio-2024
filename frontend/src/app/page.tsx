import { default as Image } from "next/image";
import Link from "next/link";
import samplePic from "../../public/sample.png";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white py-4 md:min-h-screen">
      <div className="w-[95%] mx-auto">
        <div className="flex flex-col items-center gap-3 mb-5 md:flex-row md:mb-8 md:justify-end md:gap-5 border-b-black font-sans text-lg">
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
        <div className="block w-full md:flex min-h-screen md:justify-between md:gap-4">
          <section className="w-full mb-10 md:w-max-8/12 md:flex md:justify-center md:items-center">
            <h1 className="text-lg text-center font-semibold leading-relaxed md:text-3xl md:mb-0">
              Welcome to <span className="inline text-blue-400 opacity-90 text-2xl md:text-4xl font-bold">Cornerfolio</span><br />
              the best and easy way<br />
              to make your portfolio.
            </h1>
          </section>
          <section className="w-full flex flex-col">
            <div className="block mb-0 md:flex md:flex-col md:max-w-4/12 md:justify-center md:items-center md:gap-y-4 md:min-h-screen">
              <Image
                src={samplePic}
                alt="sample picture"
                width={600}
                height={350}
                className="max-w-[300px] mx-auto md:max-w-full h-auto mb-4 md:mb-0 lg:pb-0"
              />
              <Image
                src={samplePic}
                alt="sample picture"
                width={600}
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
