"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SmallCheck } from "@/components/icons/Check";
import { useState } from "react";
import { useTranslations } from "@/providers/translation-provider";

interface ConfirmStepProps {
  formData: {
    category: string;
    company?: string | undefined;
    name: string;
    phone: string;
    email: string;
    message: string;
    privacy: boolean;
  };
  uploadedFile?: {
    name: string;
    size: string;
  } | null;
  onBack: () => void;
  onSubmit: () => void;
}

const LabelCondition = ({ require }: { require?: boolean }) => {
  const { dict } = useTranslations();

  return (
    <div className={cn("bg-web-light rounded-full", require && "bg-web-vivid")}>
      <p className="flex items-center justify-center text-normal text-[8px] md:text-[12px] text-white py-1 px-2 leading-[9px] font-bold relative -top-[1px]">
        {require
          ? dict.contact.confirmStep.labels.required
          : dict.contact.confirmStep.labels.optional}
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
  const { dict } = useTranslations();
  const confirmStep = dict.contact.confirmStep;

  const [loading, setLoading] = useState(false);
  const formControlClass = "flex flex-col md:flex-row gap-6";
  const labelWrapperClass = "w-full md:w-1/4 flex items-center gap-2";
  const valueClass = "flex-1 text-jp-p2 text-web-dark";

  if (!formData) return null;

  // Wrap the onSubmit to handle loading state
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* 1. Category */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.category}
            </span>
          </Label>
          <LabelCondition require />
        </div>
        <p className={valueClass}>{formData.category}</p>
      </div>

      {/* 2. Company */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.company}
            </span>
          </Label>
          <LabelCondition require />
        </div>
        <p className={valueClass}>
          {formData.company?.trim() || confirmStep.values.noData}
        </p>
      </div>

      {/* 3. Name */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.name}
            </span>
          </Label>
          <LabelCondition require />
        </div>
        <p className={valueClass}>{formData.name}</p>
      </div>

      {/* 4. Phone */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.phone}
            </span>
          </Label>
          <LabelCondition require />
        </div>
        <p className={valueClass}>{formData.phone}</p>
      </div>

      {/* 5. Email */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.email}
            </span>
          </Label>
          <LabelCondition require />
        </div>
        <p className={valueClass}>{formData.email}</p>
      </div>

      {/* 6. Message */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.message}
            </span>
          </Label>
          <LabelCondition require />
        </div>
        <p className={cn(valueClass, "whitespace-pre-wrap")}>
          {formData.message}
        </p>
      </div>

      {/* 7. File Upload */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.attachment}
            </span>
          </Label>
        </div>
        <div className={valueClass}>
          {uploadedFile ? (
            <p className="flex gap-1 items-center text-jp-p2">
              <SmallCheck /> {`${uploadedFile.name}(${uploadedFile.size})`}
            </p>
          ) : (
            <p className="text-jp-p2">{confirmStep.values.noData}</p>
          )}
        </div>
      </div>

      {/* 8. Privacy Policy */}
      <div className={formControlClass}>
        <div className={labelWrapperClass}>
          <Label asChild>
            <span className="text-jp-p2 font-bold">
              {confirmStep.fields.privacy}
            </span>
          </Label>
        </div>
        <p className={valueClass}>{confirmStep.values.privacyAgree}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full md:w-auto md:px-[120px] py-6 rounded-full"
          disabled={loading}
        >
          {confirmStep.buttons.back}
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full md:w-auto md:px-[120px] py-6 rounded-full"
          disabled={loading}
        >
          {loading
            ? confirmStep.buttons.submitting
            : confirmStep.buttons.submit}
        </Button>
      </div>
    </div>
  );
}
