import Image from "next/image";
import Link from "next/link";
import samplePic from "../../public/sample.png";
import styles from "./home.module.css";

export default function Home() {
    return (
        <div className="bg-gray-900 text-white w-screen h-screen">
            <div className="w-full h-[6%] flex justify-end gap-5 pt-5 pr-10 border-b-black font-sans text-lg">
                <Link href="/login" className={styles.link}>
                    Log in
                </Link>
                <Link href="/register" className={styles.link}>
                    Sign up
                </Link>
            </div>
            <div className="h-[94%] flex justify-between p-10">
                <h1 className="w-[50%] text-5xl font-semibold flex justify-center pt-32 leading-relaxed">
                    Cornerfolio <br /> the best & easy way
                    <br />
                    to make your portfolio
                </h1>
                <div className="w-[50%] flex-col pt-28">
                    <div className="flex justify-end gap-5 mb-8">
                        <Image
                            src={samplePic}
                            alt="sample picture"
                            width={300}
                            height={210}
                        />
                        <Image
                            src={samplePic}
                            alt="sample picture"
                            width={300}
                            height={210}
                        />
                    </div>
                    <div className="flex gap-5">
                        <Image
                            src={samplePic}
                            alt="sample picture"
                            width={300}
                            height={210}
                        />
                        <Image
                            src={samplePic}
                            alt="sample picture"
                            width={300}
                            height={210}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
