import Image from "next/image";

interface IProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function CoverageCard({ title, description, imageUrl }: IProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video">
        <Image src={imageUrl} alt="blog-decor" fill />
      </div>
      <p className="text-[15px] md:text-base -tracking-[0.02em] font-bold">
        {title}
      </p>
      <p
        className="text-[13px] md:text-sm font-noto-sans-jp font-normal whitespace-pre-line -tracking-[0.02em]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
