import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface IProps {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
  leftIcon?: React.ReactNode;
  isWhite?: boolean;
  textClassName?: string;
}

export default function NavbarItem({
  label,
  href,
  children,
  leftIcon,
  isWhite,
  textClassName,
}: IProps) {
  const commonClasses = cn(
    "h-full flex cursor-pointer outline-none items-center gap-[6px] text-sm -tracking-[1.5%] font-bold transition-opacity duration-300",
    isWhite ? "text-white" : textClassName || "text-web-dark"
  );

  if (children) {
    return (
      <div className="h-full lg:px-1 xl:px-3 group relative">
        <Link href={href} className={commonClasses}>
          {label}
          <div className="transition-all duration-200 text-web-main group-hover:opacity-30">
            <ChevronDown />
          </div>
        </Link>
        <div className="absolute w-full h-4 -bottom-4 left-0 bg-transparent" />
        <div className="absolute border top-full left-1/2 -translate-x-1/2 py-4 w-max bg-white rounded-none shadow-sm z-[99999999999] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-4">
          {children.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-xs font-bold tracking-[-1.5%] text-center hover:bg-gray-100/80 hover:text-web-main py-3 px-4 transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center gap-[6px] lg:px-1 xl:px-3">
      <Link href={href} className={`${commonClasses} hover:opacity-30`}>
        {label}
      </Link>
      {leftIcon && leftIcon}
    </div>
  );
}
