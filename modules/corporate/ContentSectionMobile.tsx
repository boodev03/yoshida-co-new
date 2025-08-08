import Image from "next/image";

interface IProps {
  title: string;
  subTitle: string;
  description: string;
  imageUrl: string;
  // Image position
  align?: "left" | "right";
  developmentItems?: string[];
  button?: React.ReactNode;
}

export default function ContentSectionMobile({
  title,
  subTitle,
  description,
  imageUrl,
  align = "left",
  developmentItems,
  button,
}: IProps) {
  return (
    <div className="px-6 space-y-4 relative">
      <p className="text-web-main font-bold text-[13px]">{title}</p>
      <p className="text-web-dark font-bold text-xl whitespace-pre-line">
        {subTitle}
      </p>
      <p className="text-web-dark text-[13px] whitespace-pre-line">
        {description}
      </p>

      {developmentItems && developmentItems.length > 0 && (
        <div className="bg-white rounded-[8px] w-full border border-web-main py-8 px-6 space-y-6">
          <p className="text-[15px] mlg:text-xl -tracking-[0.02em] font-bold text-web-main text-center">
            開発項目
          </p>
          <ul className="text-[13px] mlg:text-base font-noto-sans-jp -tracking-[0.02em] text-web-dark space-y-2">
            {developmentItems?.map((item) => (
              <li key={item} className="flex items-baseline gap-1">
                <span>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {imageUrl && (
        <div className="w-full aspect-video relative z-10">
          <Image src={imageUrl} alt="section image" fill />
        </div>
      )}
      <div
        style={{
          clipPath:
            align === "left"
              ? "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 0%, 75% 0%, 100% 100%, 0% 100%)",
        }}
        className="bg-web-gray w-full flex justify-end items-center aspect-video absolute -bottom-10 right-0 z-0"
      />
      {button && (
        <div className="flex justify-center items-center">{button}</div>
      )}
    </div>
  );
}
