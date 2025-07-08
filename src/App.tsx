import TopBar from "./components/TopBar";
import SecondaryToolbar from "./components/SecondaryToolbar";
import Table from "./components/Table";
import TitleTabs from "./components/Title";
import { useState } from "react";
import type { RowData } from "./types";

const initialData: RowData[] = [
  {
    id: "1",
    jobRequest: "Landing Page",
    submitted: "2025-07-01",
    status: "Active",
    submitter: "John Doe",
    url: "https://example.com",
    assigned: "Rohan",
    priority: "High",
    dueDate: "2025-07-10",
    value: "$500",
  },
  {
    id: "2",
    jobRequest: "Marketing Campaign",
    submitted: "2025-07-02",
    status: "Inactive",
    submitter: "Alice Smith",
    url: "https://campaign.io",
    assigned: "Priya",
    priority: "Low",
    dueDate: "2025-07-15",
    value: "$300",
  },
];

export default function App() {
  const [data] = useState<RowData[]>(initialData);
  const [selectedColumn] = useState<string | null>("Assigned"); // For testing

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="flex flex-col w-[1440px] h-[1024px] bg-white border border-gray-200 shadow-sm">
        <div className="z-20">
          <TopBar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 py-2 border-b border-gray-200 bg-white z-10">
            <SecondaryToolbar selectedColumn={selectedColumn} />
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-2">
            <Table data={data} />
          </div>

          <div className="border-t border-gray-200 px-8 py-2 bg-white">
            <TitleTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
