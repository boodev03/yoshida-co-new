"use client";
import RecruitePosition from "./RecruitePosition";
import { useTranslations } from "@/providers/translation-provider";

export default function RecruitePositionList() {
  const { recruit } = useTranslations();
  const { positions } = recruit;
  
  return (
    <div className="wrapper">
      <RecruitePosition
        index={1}
        title={positions.sales.title}
        description={positions.sales.description}
        leftDescImage={positions.sales.leftDescImage}
        positions={positions.sales.roles}
        bgImage={positions.sales.bgImage}
      />
      <RecruitePosition
        index={2}
        title={positions.design.title}
        description={positions.design.description}
        positions={positions.design.roles}
        bgImage={positions.design.bgImage}
      />
      <RecruitePosition
        index={3}
        title={positions.production.title}
        description={positions.production.description}
        positions={positions.production.roles}
        bgImage={positions.production.bgImage}
      />
      <RecruitePosition
        index={4}
        title={positions.manufacturing.title}
        description={positions.manufacturing.description}
        positions={positions.manufacturing.roles}
        bgImage={positions.manufacturing.bgImage}
      />
      <RecruitePosition
        index={5}
        title={positions.quality.title}
        description={positions.quality.description}
        positions={positions.quality.roles}
        bgImage={positions.quality.bgImage}
      />
    </div>
  );
}
