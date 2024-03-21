import { default as Image } from "next/image";
import Link from "next/link";
import samplePic from "../../public/sample.png";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="w-[90%] mx-auto">
        <div className="block md:flex md:justify-end md:gap-5 border-b-black font-sans text-lg">
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
        <div className="block md:flex md:justify-between">
          <h1 className="lg:text-5xl sm:text-xl font-semibold flex lg:justify-center sm:justify-start lg:pt-32 leading-relaxed mb-5">
            Cornerfolio <br className="hidden sm:inline" /> the best & easy way
            <br />
            to make your portfolio
          </h1>
          <div className="sm:w-[100%] flex flex-col lg:pt-28 h-full">
            <div className="block mb-8 md:flex md:justify-start md:mb-3 md:gap-5">
              <Image
                src={samplePic}
                alt="sample picture"
                width={300}
                height={150}
                className="pb-5 max-w-[300px] h-auto lg:pb-0"
              />
              <Image
                src={samplePic}
                alt="sample picture"
                width={300}
                height={150}
                className="pb-5 max-w-[300px] h-auto lg:pb-0"
              />
            </div>
            <div className="block mb-8 md:flex md:justify-start md:mb-3 md:gap-5">
              <Image
                src={samplePic}
                alt="sample picture"
                width={300}
                height={150}
                className="pb-5 max-w-[300px] h-auto lg:pb-0"
              />
              <Image
                src={samplePic}
                alt="sample picture"
                width={300}
                height={150}
                className="pb-5 max-w-[300px] h-auto lg:pb-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
