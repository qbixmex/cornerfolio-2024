import Image from "next/image";
import Link from "next/link";
import samplePic from "../../public/sample.png";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white w-screen lg:h-screen">
      <div className="w-full h-[6%] flex justify-end gap-5 pt-5 pr-10 border-b-black font-sans text-lg">
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
        <Link href="/register" className={styles.link}>
          Sign up
        </Link>
      </div>
      <div className="h-[94%] lg:flex lg:justify-between p-10">
        <h1 className="w-[50%] lg:text-5xl  font-semibold flex justify-center lg:pt-32 leading-relaxed">
          Cornerfolio <br /> the best & easy way
          <br />
          to make your portfolio
        </h1>
        <div className="w-[50%] flex-col lg:pt-28">
          <div className="flex lg:justify-end gap-5 mb-8">
            <Image
              src={samplePic}
              alt="sample picture"
              className="lg:w-[300px] lg:h-[210px] sm-w[200px] sm-h-[140px]"
            />
            <Image
              src={samplePic}
              alt="sample picture"
              className="lg:w-[300px] lg:h-[210px]"
            />
          </div>
          <div className="flex lg:justify-end gap-5 mb-8">
            <Image
              src={samplePic}
              alt="sample picture"
              className="lg:w-[300px] lg:h-[210px]"
            />
            <Image
              src={samplePic}
              alt="sample picture"
              className="lg:w-[300px] lg:h-[210px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
