import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnSizingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import type { RowData } from "../types";

interface CustomColumn {
  accessorKey: string;
  header: string;
  type: "text" | "checkbox" | "date" | "number" | "select";
  options?: string[];
}

type Props = {
  data: RowData[];
};

const Table = ({ data: initialData }: Props) => {
  const [data, setData] = useState<RowData[]>(() => {
    const saved = localStorage.getItem("tableData");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: string;
  } | null>(null);
  const [customColumns, setCustomColumns] = useState<CustomColumn[]>(() => {
    const saved = localStorage.getItem("tableColumns");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("tableColumns", JSON.stringify(customColumns));
  }, [customColumns]);

  const updateData = (
    rowIndex: number,
    columnId: string,
    value: string | boolean
  ) => {
    setData((old) =>
      old.map((row, index) => {
        if (index !== rowIndex) return row;
        return { ...row, [columnId]: value };
      })
    );
  };

  const handleAddRow = () => {
    const newRow: RowData = {
      id: (data.length + 1).toString(),
      jobRequest: "",
      submitted: "",
      status: "",
      submitter: "",
      url: "",
      assigned: "",
      priority: "",
      dueDate: "",
      value: "",
    };
    customColumns.forEach((col) => {
      (newRow as Record<string, string | boolean>)[col.accessorKey] =
        col.type === "checkbox" ? false : "";
    });
    setData([...data, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddColumn = () => {
    const header = prompt("Enter column title:");
    if (!header) return;

    const type = prompt(
      "Enter type (text, checkbox, date, number, select):"
    ) as CustomColumn["type"];
    if (!["text", "checkbox", "date", "number", "select"].includes(type))
      return;

    const key = header.toLowerCase().replace(/\s+/g, "_") + "_" + nanoid(4);
    const options =
      type === "select"
        ? prompt("Comma-separated options")
            ?.split(",")
            .map((o) => o.trim()) ?? []
        : undefined;

    const updatedData = data.map((row) => ({
      ...row,
      [key]: type === "checkbox" ? false : "",
    }));

    setData(updatedData);
    setCustomColumns([
      ...customColumns,
      { accessorKey: key, header, type, options },
    ]);
  };

  const handleDeleteColumn = (key: string) => {
    setCustomColumns((cols) => cols.filter((c) => c.accessorKey !== key));
    setData((rows) =>
      rows.map((row) => {
        const copy: Record<string, unknown> = { ...row };
        delete copy[key];
        return copy as RowData;
      })
    );
  };

  const headerBackgrounds: Record<string, string> = {
    jobRequest: "#EEEEEE",
    submitted: "#EEEEEE",
    status: "#EEEEEE",
    submitter: "#EEEEEE",
    url: "#EEEEEE",
    assigned: "#E8F0E9",
    priority: "#EAE3FC",
    dueDate: "#EAE3FC",
    value: "#FFE9E0",
  };

  const staticKeys = [
    "jobRequest",
    "submitted",
    "status",
    "submitter",
    "url",
    "assigned",
    "priority",
    "dueDate",
    "value",
  ];
  const staticColumns: ColumnDef<RowData>[] = [
    {
      id: "rowNumber",
      header: "#",
      size: 40,
      enableResizing: false,
      cell: ({ row }) => (
        <div className="text-center text-gray-400">{row.index + 1}</div>
      ),
    },
    {
      id: "deleteRow",
      header: "🗑",
      size: 40,
      enableResizing: false,
      cell: ({ row }) => (
        <button
          onClick={() => handleDeleteRow(row.index)}
          className="text-red-500 hover:text-red-700"
        >
          🗑
        </button>
      ),
    },
    ...staticKeys.map((key) => ({
      accessorKey: key,
      header: () => (
        <div
          style={{ backgroundColor: headerBackgrounds[key] || undefined }}
          className="w-full h-full px-2 py-1"
        >
          {key === "value"
            ? "Est. Value"
            : key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
        </div>
      ),
      enableResizing: true,
      size: 160,
      cell: ({
        row,
        column,
      }: {
        row: ReturnType<typeof table.getRowModel>["rows"][number];
        column: ReturnType<typeof table.getAllColumns>[number];
      }) => {
        const isSelected =
          selectedCell?.row === row.index && selectedCell?.col === column.id;
        const value = row.getValue(column.id) ?? "";

        const editable = () => {
          if (key === "status" || key === "priority") {
            const options =
              key === "status"
                ? ["In Process", "Need to Start", "Complete", "Blocked"]
                : ["High", "Medium", "Low"];
            return (
              <select
                autoFocus
                value={String(value ?? "")}
                onChange={(e) => {
                  updateData(row.index, column.id, e.target.value);
                  setSelectedCell(null);
                }}
                className="w-full px-1 py-0.5 border border-blue-500 outline-none rounded text-sm"
              >
                <option value="" disabled hidden>
                  Select...
                </option>
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            );
          }

          if (key === "dueDate") {
            return (
              <input
                type="date"
                autoFocus
                value={String(value ?? "")}
                onChange={(e) =>
                  updateData(row.index, column.id, e.target.value)
                }
                onBlur={() => setSelectedCell(null)}
                className="w-full px-1 py-0.5 border border-blue-500 outline-none rounded text-sm"
              />
            );
          }

          return (
            <input
              autoFocus
              value={String(value ?? "")}
              onChange={(e) => updateData(row.index, column.id, e.target.value)}
              onBlur={() => setSelectedCell(null)}
              className="w-full px-1 py-0.5 border border-blue-500 outline-none rounded text-sm"
            />
          );
        };

        return (
          <div
            onClick={() => setSelectedCell({ row: row.index, col: column.id })}
            onKeyDown={(e) => {
              const rowCount = table.getRowModel().rows.length;
              const headers = row.getVisibleCells().map((c) => c.column.id);
              const currentIndex = headers.indexOf(column.id);

              if (e.key === "ArrowRight" && currentIndex < headers.length - 1) {
                setSelectedCell({
                  row: row.index,
                  col: headers[currentIndex + 1],
                });
              } else if (e.key === "ArrowLeft" && currentIndex > 0) {
                setSelectedCell({
                  row: row.index,
                  col: headers[currentIndex - 1],
                });
              } else if (e.key === "ArrowDown" && row.index < rowCount - 1) {
                setSelectedCell({ row: row.index + 1, col: column.id });
              } else if (e.key === "ArrowUp" && row.index > 0) {
                setSelectedCell({ row: row.index - 1, col: column.id });
              }
            }}
            tabIndex={0}
            className={`w-full h-full px-3 py-2 cursor-pointer outline-none group ${
              isSelected
                ? "bg-white ring-2 ring-blue-500"
                : "group-hover:border-blue-400"
            }`}
          >
            {isSelected ? editable() : <span>{String(value ?? "")}</span>}
          </div>
        );
      },
    })),
  ];

  const dynamicColumns: ColumnDef<RowData>[] = customColumns.map((col) => ({
    accessorKey: col.accessorKey,
    header: () => (
      <div
        className="flex items-center justify-between gap-2"
        style={{ backgroundColor: "#EEEEEE" }}
      >
        {col.header}
        <button
          onClick={() => handleDeleteColumn(col.accessorKey)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    ),
    enableResizing: true,
    size: 150,
    cell: ({ row }) => {
      const val = row.getValue(col.accessorKey);
      if (col.type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={Boolean(val)}
            onChange={(e) =>
              updateData(row.index, col.accessorKey, e.target.checked)
            }
          />
        );
      }
      if (col.type === "select") {
        return (
          <select
            value={typeof val === "string" ? val : ""}
            onChange={(e) =>
              updateData(row.index, col.accessorKey, e.target.value)
            }
            className="w-full px-1 py-0.5 bg-white border outline-none rounded text-sm"
          >
            {col.options?.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        );
      }
      return (
        <input
          type={col.type}
          value={typeof val === "string" || typeof val === "number" ? val : ""}
          onChange={(e) =>
            updateData(row.index, col.accessorKey, e.target.value)
          }
          className="w-full px-1 py-0.5 bg-white outline-none text-sm"
        />
      );
    },
  }));

  const table = useReactTable({
    data,
    columns: [...staticColumns, ...dynamicColumns],
    state: { sorting, columnSizing },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerGroups = table.getHeaderGroups();
  return (
    <div className="space-y-4 font-sans text-sm">
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full table-fixed border-collapse text-sm">
          <thead className="bg-gray-100 text-[#1A1A1A] font-medium sticky top-0 z-10">
            <tr>
              <th
                className="text-blue-600 text-lg font-bold px-3 py-2 text-left w-10 cursor-pointer"
                onClick={handleAddRow}
              >
                +
              </th>
              <th></th>

              {/* Financial Overview */}
              <th
                colSpan={5}
                style={{ backgroundColor: "#E2E2E2" }}
                className="text-center px-2 py-2 border-b border-gray-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <img src="/Link.svg" alt="link" className="w-4 h-4" />
                  <span>Financial Overview</span>
                  <img src="/Shape.svg" alt="shape" className="w-4 h-4" />
                </div>
              </th>

              {/* ABC with arrow */}
              <th
                colSpan={1}
                style={{ backgroundColor: "#D2E0D4" }}
                className="text-center px-2 py-2 border-b border-gray-300"
              >
                <div className="flex items-center justify-center gap-1">
                  <img src="/Arrow Split.svg" alt="Arrow" className="w-4 h-4" />
                  ABC
                </div>
              </th>

              {/* Answer a Question with arrow */}
              <th
                colSpan={2}
                style={{ backgroundColor: "#DCCFFC" }}
                className="text-center px-2 py-2 border-b border-gray-300"
              >
                <div className="flex items-center justify-center gap-1">
                  <img src="/Arrow Split.svg" alt="Arrow" className="w-4 h-4" />
                  Answer a Question
                </div>
              </th>

              {/* Extract with arrow */}
              <th
                colSpan={1}
                style={{ backgroundColor: "#FAC2AF" }}
                className="text-center px-2 py-2 border-b border-gray-300"
              >
                <div className="flex items-center justify-center gap-1">
                  <img src="/Arrow Split.svg" alt="Arrow" className="w-4 h-4" />
                  Extract
                </div>
              </th>

              {/* New Column group */}
              <th
                colSpan={customColumns.length || 1}
                style={{ backgroundColor: "#EEEEEE" }}
                className="text-center px-2 py-2 border-b border-gray-300"
              >
                New Column
              </th>

              <th
                className="text-green-600 px-3 py-2 text-right w-10 cursor-pointer"
                onClick={handleAddColumn}
              >
                +
              </th>
            </tr>

            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="relative border border-gray-200 px-3 py-2 text-left select-none group"
                  >
                    <div className="flex justify-between items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanResize() && (
                        <div
                          {...header.getResizeHandler()}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize bg-transparent group-hover:bg-blue-400 transition"
                          style={{ zIndex: 10 }}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-200 bg-white p-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
