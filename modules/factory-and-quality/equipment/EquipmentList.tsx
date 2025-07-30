"use client";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { equipmentList } from "./data";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/providers/translation-provider";

export default function EquipmentList() {
  const { equipment } = useTranslations();
  const { equipmentList: equipmentListTranslations } = equipment;
  const [visibleItems, setVisibleItems] = useState(10);

  const handleShowMore = () => {
    if (visibleItems < equipmentList.length) {
      setVisibleItems((prev) => prev + 10);
    }
  };

  return (
    <div className="py-[60px] md:py-[120px]">
      <div className="w-full space-y-2 flex flex-col items-center justify-center">
        <div className="relative">
          <div
            className="absolute top-0 left-0 -translate-x-1/2 size-[30px] bg-web-light rotate-[135deg]"
            style={{ clipPath: "polygon(50% 0%, 100% 82%, 0% 82%)" }}
          />
          <p className="text-web-main font-bold text-[13px] md:text-base -tracking-[0.02em] relative z-10">
            {equipmentListTranslations.title}
          </p>
        </div>
        <p className="font-bold text-web-dark text-xl md:text-[32px] -tracking-[0.02em]">
          {equipmentListTranslations.heading}
        </p>
      </div>

      <div className="container mt-12">
        <Table className="w-full font-noto-sans-jp">
          <TableHeader>
            <TableRow className="bg-web-main hover:bg-web-main">
              <TableHead className="text-center text-white text-[13px] md:text-base -tracking-[0.02em]">
                {equipmentListTranslations.tableHeaders.name}
              </TableHead>
              <TableHead className="text-center text-white text-[13px] md:text-base -tracking-[0.02em]">
                {equipmentListTranslations.tableHeaders.quantity}
              </TableHead>
              <TableHead className="text-center text-white text-[13px] md:text-base -tracking-[0.02em]">
                {equipmentListTranslations.tableHeaders.model}
              </TableHead>
              <TableHead className="text-center text-white text-[13px] md:text-base -tracking-[0.02em]">
                {equipmentListTranslations.tableHeaders.capacity}
              </TableHead>
            </TableRow>
          </TableHeader>
          {/* Mobile */}
          <TableBody className="mlg:hidden">
            {equipmentList.slice(0, visibleItems).map((equipment, index) => (
              <TableRow key={index}>
                <TableCell className="align-baseline font-medium text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.name}
                </TableCell>
                <TableCell className="align-baseline text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.quantity}
                </TableCell>
                <TableCell className="align-baseline whitespace-pre-line text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.model}
                </TableCell>
                <TableCell className="align-baseline whitespace-pre-line text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.capacity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Desktop */}
          <TableBody className="hidden mlg:table-row-group">
            {equipmentList.map((equipment, index) => (
              <TableRow key={index}>
                <TableCell className="align-baseline font-medium text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.name}
                </TableCell>
                <TableCell
                  className={cn(
                    "align-baseline text-center text-[13px] md:text-base -tracking-[0.02em]",
                    equipment.highlight && "text-[#D30F0F]"
                  )}
                >
                  {equipment.quantity}
                </TableCell>
                <TableCell className="align-baseline whitespace-pre-line text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.model}
                </TableCell>
                <TableCell className="align-baseline whitespace-pre-line text-center text-[13px] md:text-base -tracking-[0.02em]">
                  {equipment.capacity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center md:hidden mt-6 w-full">
          <Button
            onClick={handleShowMore}
            className="group relative overflow-hidden"
          >
            {equipmentListTranslations.buttonText}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
