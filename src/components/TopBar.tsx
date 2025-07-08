const TopBar = () => {
  return (
    <header className="w-full bg-white border-b border-[#EEEEEE]">
      <div
        className="mx-auto flex items-center justify-between px-4"
        style={{ maxWidth: "1440px", height: "56px" }}
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-[16px] w-[343px] h-[24px]">
          {/* Panel Icon */}
          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded ml-2">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-green-800"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                stroke="#14532D"
                strokeWidth="2"
              />
              <rect x="15" y="4" width="6" height="16" fill="#14532D" />
            </svg>
          </button>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {/* Green dot */}
            <div className="w-[14px] h-[14px] bg-green-600 rounded-sm mr-1" />
            <span className="text-gray-400">Workspace</span>
            <span className="text-gray-300">›</span>
            <span className="text-gray-400">Folder 2</span>
            <span className="text-gray-300">›</span>
            <span className="font-semibold text-gray-800">Spreadsheet 3</span>
            <span className="material-icons text-gray-400 text-sm ml-1">
              more_horiz
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-[12px] h-[40px]">
          {/* Search Input */}
          <div className="flex items-center bg-[#F6F6F6] rounded-[6px] w-[165px] h-[40px] px-[12px] gap-[8px]">
            <span className="material-icons text-gray-400 text-base">
              search
            </span>
            <input
              type="text"
              placeholder="Search within sheet"
              className="bg-[#F6F6F6] text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 border-none w-full h-full"
            />
          </div>

          {/* Notification Bell */}
          <button className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-lg border border-transparent">
            <img
              src="/Notification_bell.svg"
              alt="Notifications"
              className="w-6 h-6 object-contain"
            />
          </button>

          {/* Profile Section - Small & Right-Aligned */}
          <button className="flex items-center gap-2 px-2 h-[40px] bg-white rounded-lg hover:bg-gray-100 border border-transparent ml-auto">
            {/* Profile Image */}
            <img
              src="/Ellipse 1.svg"
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover"
            />

            {/* Name and Email */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-800">
                John Doe
              </span>
              <span className="text-[10px] text-gray-300">john.doe...</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
