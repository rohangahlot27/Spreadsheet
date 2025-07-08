const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

const TitleTabs = () => {
  return (
    <div className="flex items-center px-2 border-t border-gray-200 bg-white text-sm text-gray-700">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`border border-transparent px-4 py-1 min-w-[100px] text-center whitespace-nowrap ${
            index === 0
              ? "bg-[#E8F0E9] text-[#14532D] font-semibold"
              : "bg-white hover:bg-gray-50 cursor-pointer"
          }`}
        >
          {tab}
        </div>
      ))}
      <button className="border border-transparent px-4 py-1 text-lg font-semibold bg-white hover:bg-gray-100">
        +
      </button>
    </div>
  );
};

export default TitleTabs;
