import { ArrowDownLong } from "@/components/icons/ArrowDownLong";
import { ArrowDownLongDash } from "@/components/icons/ArrowDownLongDash";

interface IProps {
  index: number;
  position: string;
  title: string;
  description: string;
  before: string;
  steps: string[];
  now: string;
}

export default function CareerPathCardMobile({
  index,
  position,
  title,
  description,
  before,
  steps,
  now,
}: IProps) {
  return (
    <div className="font-shippori-mincho flex flex-col mlg:flex-row gap-0 mlg:gap-[100px] mlg:items-center">
      <div className="space-y-4 w=full mlg:w-[355px]">
        <p className="text-[13px] text-web-light leading-[15px]">
          CAREER PATH {index.toString().padStart(2, "0")}
        </p>
        <p className="text-xl font-bold">{position}</p>

        {/* Card */}
        <div className="border border-line-gray py-[26px] px-3 space-y-4">
          <p className="text-[15px] font-bold text-web-dark">{title}</p>
          <p className="text-[13px] text-web-dark leading-[15px]">
            {description}
          </p>
        </div>
      </div>

      {/* Stage */}
      <div className="mt-8 space-y-2">
        {/* Before */}
        <div className="gap-2 flex flex-col items-center">
          <p className="text-[15px] text-web-main font-bold mb-4 text-center">
            BEFORE
          </p>
          <div className="bg-web-main py-5 w-full">
            <p
              key={index}
              className="text-[13px] leading-[1.625] text-center text-white font-medium whitespace-pre-line"
            >
              {before}
            </p>
          </div>
          <ArrowDownLong />
        </div>

        {/* Steps */}
        <div className="gap-2 flex flex-col items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full gap-2"
            >
              <div className="bg-web-main py-5 w-full">
                <p
                  key={index}
                  className="whitespace-pre-line tracking-[0.02em] text-[15px] text-white font-bold text-center"
                >
                  {step}
                </p>
              </div>
              {index === steps.length - 1 ? (
                <ArrowDownLongDash />
              ) : (
                <ArrowDownLong />
              )}
            </div>
          ))}
        </div>

        {/* Now */}
        <div className="gap-2 flex flex-col items-center">
          <p className="text-[15px] text-web-main font-bold mb-4 text-center">
            NOW
          </p>

          <div className="bg-web-main py-5 w-full">
            <p
              key={index}
              className="whitespace-pre-line tracking-[0.02em] text-[15px] text-white font-bold text-center"
            >
              {now}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
