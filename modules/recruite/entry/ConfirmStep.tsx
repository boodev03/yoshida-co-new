"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SmallCheck } from "@/components/icons/Check";

interface ConfirmStepProps {
  formData: {
    type: string;
    jobType: string;
    name: string;
    furigana: string;
    phone: string;
    email: string;
    message?: string;
    privacy: boolean;
  };
  uploadedFile?: {
    name: string;
    size: string;
  } | null;
  onBack: () => void;
  onSubmit: () => void;
}

const LabelCondition = (require: { require?: boolean }) => {
  return (
    <div
      className={cn(
        "bg-web-light rounded-[2px] relative -top-[1px]",
        require && "bg-web-vivid"
      )}
    >
      <p className="flex items-center justify-center text-normal text-[8px] text-white px-2 pt-0.5 font-bold">
        {require.require ? "必須" : "任意"}
      </p>
    </div>
  );
};

export default function ConfirmStep({
  formData,
  uploadedFile,
  onBack,
  onSubmit,
}: ConfirmStepProps) {
  const formControlClass = "flex flex-col md:flex-row gap-6";
  const labelWrapperClass = "w-full md:w-1/4 flex items-center gap-2";
  const valueClass = "flex-1 text-jp-p2 text-web-dark";
  if (!formData) return null;
  // px-6 mlg:px-[95px] py-[60px] mlg:py-[120px] space-y-12 shadow-[4px_4px_12px_0px_#0000001A] bg-white
  return (
    <div className="my-12 mlg:my-[120px] px-6 mlg:px-[95px] py-[60px] mlg:py-[120px] space-y-12 shadow-[4px_4px_12px_0px_#0000001A] bg-white">
      <div className="space-y-6 md:space-y-8">
        {/* Type */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">種別</span>
            </Label>
            <LabelCondition require />
          </div>
          <p className={valueClass}>{formData.type}</p>
        </div>
        {/* 1. Job Type */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">応募職種</span>
            </Label>
            <LabelCondition require />
          </div>
          <p className={valueClass}>{formData.jobType}</p>
        </div>

        {/* 2. Name */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">お名前</span>
            </Label>
            <LabelCondition require />
          </div>
          <p className={valueClass}>{formData.name}</p>
        </div>

        {/* 3. Furigana */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">ふりがな</span>
            </Label>
            <LabelCondition require />
          </div>
          <p className={valueClass}>{formData.furigana}</p>
        </div>

        {/* 4. Email */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">メールアドレス</span>
            </Label>
            <LabelCondition require />
          </div>
          <p className={valueClass}>{formData.email}</p>
        </div>

        {/* 5. Phone */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">電話番号</span>
            </Label>
            <LabelCondition require />
          </div>
          <p className={valueClass}>{formData.phone}</p>
        </div>

        {/* 6. File Upload */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">添付ファイル</span>
            </Label>
            <LabelCondition require />
          </div>
          <div className={valueClass}>
            {uploadedFile ? (
              <p className="flex gap-1 items-center text-jp-p2">
                <SmallCheck /> {`${uploadedFile.name}(${uploadedFile.size})`}
              </p>
            ) : (
              <p className="text-jp-p2">---</p>
            )}
          </div>
        </div>

        {/* 7. Message */}
        <div className={formControlClass}>
          <div className={labelWrapperClass}>
            <Label asChild>
              <span className="text-jp-p2 font-bold">備考・ご質問</span>
            </Label>
            <LabelCondition />
          </div>
          <p className={cn(valueClass, "whitespace-pre-wrap")}>
            {formData.message?.trim() || "---"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto md:px-[120px] py-6 rounded-[5px] h-[72px]"
          >
            戻る
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            className="w-full md:w-auto md:px-[120px] py-6 rounded-[5px] h-[72px]"
          >
            送信する
          </Button>
        </div>
      </div>
    </div>
  );
}
