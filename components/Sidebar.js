"use client";

import {
  MdDashboard,
  MdAssignment,
  MdDirectionsCar,
  MdPeople,
  MdSettings,
} from "react-icons/md";

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { label: "Dashboard", icon: MdDashboard },
    { label: "Applications", icon: MdAssignment },
    { label: "Vehicles", icon: MdDirectionsCar },
    { label: "Participants", icon: MdPeople },
    { label: "Settings", icon: MdSettings },
  ];

  return (
    <div className="bg-white w-[30%] sm:w-60 h-full py-4 shadow">
      {/* Logo / Title */}
      <div className="flex mt-6 items-center justify-center bg-yellow-400 text-black rounded-full w-[74px] h-[74px] sm:w-[90px] sm:h-[90px] md:w-[106px] md:h-[106px] mx-auto">
        <p className="text-center text-xs sm:text-sm font-semibold leading-tight px-2">
          NOTTING HILL
          <br />
          CARNIVAL
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-6 mt-4 text-center">Dashboard</h2>

      {/* Sidebar Menu */}
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab.label)}
          className={`px-4 flex items-center gap-2 w-full text-black text-left p-2 rounded transition
          hover:bg-[#fbf9f7] ${
            activeTab === tab.label ? "bg-[#f4f0ea] font-semibold" : ""
          }`}
        >
          <tab.icon className={`text-xl ${activeTab === tab.label ? 'text-[rgb(196 85 90)]':''}`} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
