import { Metadata } from "next";
import ComparePage from "./ComparePage";
import { CompareStoreProvider } from "@/lib/compare-store";

export const metadata: Metadata = {
  title: "产品对比 - Tobacco Atlas",
  description: "并排对比烟草产品的参数和特性",
};

export default function Compare() {
  return (
    <CompareStoreProvider>
      <ComparePage />
    </CompareStoreProvider>
  );
}
