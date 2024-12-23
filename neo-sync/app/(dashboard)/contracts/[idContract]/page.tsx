"use client";

import PDFViewer from "@/components/custom/Contracts/PDFViewer";
import CustomSeparator from "@/components/custom/Overview/CustomSeparator";
import { useSearchParams } from "next/navigation";

export default function PDFPage() {
  const searchParams = useSearchParams();
  const previewUrl = searchParams ? searchParams.get("url") : null;
  return (
    <div className="flex flex-col w-full h-full p-4 lg:gap-6 lg:p-6 mx-auto">
      {/* Header */}
      <div className="flex justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Contrato</h1>
      </div>

      {/* Main view */}
      <div className="flex-grow flex flex-col gap-3 rounded-lg shadow-sm">
        <CustomSeparator />
        <div className="flex-grow">
          <PDFViewer pdfPath={previewUrl || "/prueba.pdf"} />
        </div>
      </div>
    </div>
  );
}
