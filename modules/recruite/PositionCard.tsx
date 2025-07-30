import Image from "next/image";
import parse from "html-react-parser";

interface PositionCardProps {
  index: number;
  title: string;
  description: string;
  image?: string;
}

export default function PositionCard({
  index,
  title,
  description,
  image,
}: PositionCardProps) {
  return (
    <div className="font-shippori-mincho space-y-4 px-[35.5px] mlg:px-0 flex flex-col justify-between">
      <div className="space-y-4">
        <p className="flex items-center gap-4 text-xl">
          <span className="text-web-light">
            {index.toString().padStart(2, "0")}
          </span>
          <span className="text-web-dark font-bold">{title}</span>
        </p>
        <hr />
        <div className="text-[13px] mlg:text-sm text-web-dark font-medium whitespace-pre-line">
          {parse(description)}
        </div>
      </div>

      {image && (
        <div className="relative aspect-video">
          <Image
            src={image}
            alt="position-card"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
