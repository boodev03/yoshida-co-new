"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import HeaderButton from "./HeaderButton";
import { useTranslations } from "@/providers/translation-provider";

export default function Footer() {
  const { dict } = useTranslations();
  const footer = dict.recruit.footer;

  return (
    <footer
      id="footer"
      className="bg-web-main pt-20 pb-[72px] mlg:pb-6 font-shippori-mincho"
      style={{
        backgroundImage: `url('https://pub-1c108179b7cb46a98dc6dd25e0df069c.r2.dev/bg-grainy.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="px-[72px] space-y-6 pb-20">
        <div className="flex flex-col mlg:flex-row gap-6 mlg:gap-0 mlg:justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Link href="/recruit" className="block size-full">
              <Image
                src="/images/light-logo.png"
                alt="logo"
                width={120}
                height={34}
                className="w-[120px] h-[34px] object-cover"
                quality={100}
              />
            </Link>
            <p className="text-xs text-white font-normal text-center whitespace-pre-line">
              {footer.corporationText}
            </p>
          </motion.div>
          <motion.div
            className="hidden mlg:flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Navbar isWhite />
            <HeaderButton isWhite />
          </motion.div>
        </div>
        <div className="space-y-2 mb-20 mlg:mb-0">
          <p className="py-0.5 px-2 border border-white w-fit text-white font-bold">
            {footer.headquartersLabel}
          </p>
          <p className="text-sm whitespace-pre-wrap text-white">
            {footer.address}
          </p>
        </div>

        <motion.div
          className="flex mlg:hidden items-center gap-8 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Navbar isWhite className="flex-col gap-8" />
          <HeaderButton isWhite className="flex-col-reverse gap-8" />
        </motion.div>
      </div>

      <div className="mlg:px-[72px] space-y-8 mlg:space-y-0">
        <div className="flex items-center gap-4 justify-center relative">
          <p className="hidden mlg:block absolute left-0 top-0 text-web-light text-xs">
            {footer.copyright}
          </p>
          <Link href="/" className="text-xs text-white underline">
            {footer.corporateLink}
          </Link>
          <span className="h-[12px] w-[1px] bg-white rounded-full" />
          <Link href="/company/policy" className="text-xs text-white underline">
            {footer.privacyLink}
          </Link>
        </div>
        <p className="block mlg:hidden text-web-light text-xs text-center">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
