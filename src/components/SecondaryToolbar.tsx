import { useState } from "react";

type Props = {
  selectedColumn: string | null;
};

const SecondaryToolbar = ({ selectedColumn }: Props) => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const handleClick = (action: string) => {
    if (selectedColumn) {
      console.log(`${action} clicked for column: ${selectedColumn}`);
    } else {
      console.log(`${action} clicked (no column selected)`);
    }
  };

  const hoverClass =
    "hover:bg-gray-100 transition-transform duration-200 hover:scale-[1.02]";

  const actionButtons = [
    { icon: "/Eye.svg", label: "Hide Fields" },
    { icon: "/Filter.svg", label: "Filter" },
    { icon: "/Arrow Sort.svg", label: "Sort" },
    { icon: "/Arrow Autofit.svg", label: "Cell View" },
  ];

  return (
    <div className="w-full bg-white border-b border-[#EEEEEE] relative">
      <div
        className="mx-auto flex items-center justify-between px-4"
        style={{ maxWidth: "1440px", height: "56px" }}
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 h-full">
          {/* Toolbar */}
          <button
            onClick={() => handleClick("Toolbar")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md border border-transparent text-sm text-gray-100 font-medium ${hoverClass}`}
          >
            <img src="/Chevron Double.svg" alt="Toolbar" className="w-4 h-4" />
            <span className="select-none">Toolbar</span>
          </button>

          {/* Hide, Sort, Filter, Cell View */}
          <div className="flex items-center gap-4">
            {actionButtons.map(({ icon, label }) => (
              <div className="relative" key={label}>
                <button
                  onClick={() => handleClick(label)}
                  onMouseEnter={() => setTooltip(label)}
                  onMouseLeave={() => setTooltip(null)}
                  className={`flex items-center gap-2 h-10 px-3 text-sm rounded-md bg-transparent border border-transparent ${
                    selectedColumn ? "font-semibold text-black" : "text-gray-800"
                  } ${hoverClass}`}
                >
                  <img src={icon} alt={label} className="w-4 h-4" />
                  <span className="select-none">{label}</span>
                </button>

                {/* Tooltip */}
                {tooltip === label && selectedColumn && (
                  <div className="absolute top-11 left-0 z-10 text-xs bg-black text-white rounded px-2 py-1 whitespace-nowrap">
                    Column: {selectedColumn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 h-full">
          {/* Import, Export, Share */}
          <div className="flex items-center gap-4">
            {[
              { icon: "/Arrow Download.svg", label: "Import" },
              { icon: "/Arrow Upload.svg", label: "Export" },
              { icon: "/Share.svg", label: "Share" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                onClick={() => handleClick(label)}
                className={`flex items-center gap-2 h-10 px-3 text-sm text-gray-800 bg-transparent border border-transparent rounded-md ${hoverClass}`}
              >
                <img src={icon} alt={label} className="w-4 h-4" />
                <span className="select-none">{label}</span>
              </button>
            ))}
          </div>

          {/* New Action */}
          <button
            onClick={() => handleClick("New Action")}
            className="flex items-center justify-center gap-2 h-10 px-6 text-sm font-medium text-white bg-[#4B6A4F] rounded-md hover:bg-[#3e5942] transition-transform duration-200 hover:scale-[1.02]"
          >
            <img src="/Arrow Split.svg" alt="New Action" className="w-4 h-4" />
            <span>New Action</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryToolbar;
