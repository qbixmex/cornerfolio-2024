import { default as Image } from "next/image";
import Link from "next/link";
import samplePic from "../../public/sample.png";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div
      className={`bg-gray-900 text-white w-screen lg:h-screen sm:h-screen sm:w-[100%] ${styles.responsive_height} p-10`}
    >
      <div className="h-[6%] flex justify-end gap-5 pr-10 border-b-black font-sans text-lg">
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
        <Link href="/register" className={styles.link}>
          Sign up
        </Link>
      </div>
      <div className="h-[94%] lg:flex lg:justify-between ">
        <h1 className="lg:w-[50%] lg:text-5xl sm:text-xl font-semibold flex lg:justify-center sm:justify-start lg:pt-32 leading-relaxed mb-5">
          Cornerfolio <br className="hidden sm:inline" /> the best & easy way
          <br />
          to make your portfolio
        </h1>
        <div className="lg:w-[50%] sm:w-[100%] flex flex-col lg:pt-28 h-full">
          <div className="lg:flex sm:flex lg:justify-end sm:justify-between mb-5 gap-5 lg:flex-row sm:flex-col">
            <Image
              src={samplePic}
              alt="sample picture"
              className={`lg:w-[300px] lg:h-[210px] lg:pb-0  sm:pb-5 ${styles.responsive_top_image}`}
            />
            <Image
              src={samplePic}
              alt="sample picture"
              className={`lg:w-[300px] lg:h-[210px] lg:pb-0  sm:pb-5 ${styles.responsive_bottom_image}`}
            />
          </div>
          <div className="lg:flex sm:flex lg:justify-start sm:justify-between gap-5 mb-8 lg:flex-row sm:flex-col">
            <Image
              src={samplePic}
              alt="sample picture"
              className={`lg:w-[300px] lg:h-[210px] lg:pb-0  sm:pb-5 ${styles.responsive_top_image}`}
            />
            <Image
              src={samplePic}
              alt="sample picture"
              className={`lg:w-[300px] lg:h-[210px] lg:pb-0  sm:pb-5 ${styles.responsive_bottom_image}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
