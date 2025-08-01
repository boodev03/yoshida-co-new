import EquipmentDetail from "@/modules/factory-and-quality/equipment/EquipmentDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface EquipmentDetailPageProps {
  params: Promise<{
    lang: "en" | "ja";
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EquipmentDetailPageProps): Promise<Metadata> {
  const { lang, id } = await params;

  return {
    title: lang === "ja" ? "設備詳細" : "Equipment Detail",
    description: lang === "ja" ? "設備詳細を表示" : "View equipment details",
  };
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { lang, id } = await params;

  return <EquipmentDetail equipmentId={id} />;
}