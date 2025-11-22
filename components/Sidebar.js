"use client";

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = ["Dashboard", "Applications", "Vehicles", "Participants", "Settings"];

  return (
    <div className="bg-gray-800 text-white w-[30%] sm:w-60 h-full p-4">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`block w-full text-left p-2 rounded hover:bg-gray-700 ${
            activeTab === tab ? "bg-gray-700" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
