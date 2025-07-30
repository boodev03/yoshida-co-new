"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/providers/translation-provider";

export default function CorporateSelect() {
  const { company } = useTranslations();
  
  return (
    <div className="flex flex-col items-center mlg:justify-center mlg:flex-row gap-4 mlg:gap-8">
      <div className="flex-1 max-w-full w-[256px]">
        <Select defaultValue={company.select.message}>
          <SelectTrigger className="transition-all w-full rounded-full border-web-main font-bold bg-white text-web-main [&>svg]:!text-web-main hover:bg-web-main hover:text-white hover:[&>svg]:!text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={company.select.message}>{company.select.message}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 max-w-full w-[256px]">
        <Select defaultValue={company.select.history}>
          <SelectTrigger className="transition-all w-full rounded-full border-web-main font-bold bg-white text-web-main [&>svg]:!text-web-main hover:bg-web-main hover:text-white hover:[&>svg]:!text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={company.select.history}>{company.select.history}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 max-w-full w-[256px]">
        <Select defaultValue={company.select.certification}>
          <SelectTrigger className="transition-all w-full rounded-full border-web-main font-bold bg-white text-web-main [&>svg]:!text-web-main hover:bg-web-main hover:text-white hover:[&>svg]:!text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={company.select.certification}>{company.select.certification}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
