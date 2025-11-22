"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex h-screen">

      {/* SIDEBAR (remains same) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100 overflow-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Admin Dashboard</h1>

        {/* TOP SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Applications", value: "432" },
            { label: "Approved", value: "275" },
            { label: "Participants", value: "34" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm md:text-base">{item.label}</p>
              <p className="text-2xl md:text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* APPLICATIONS OVERVIEW CARDS */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Applications Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Accredited", value: "6,540" },
              { label: "Vehicles", value: "6,540" },
              { label: "Participants", value: "6,540" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-gray-500 text-sm md:text-base">{item.label}</p>
                <p className="text-2xl md:text-3xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATIONS TABLE */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Applications Overview</h2>

          {/* Horizontal scroll for mobile */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm">Organisation</th>
                  <th className="p-3 text-sm">Status</th>
                  <th className="p-3 text-sm">Vehicles</th>
                  <th className="p-3 text-sm">Participants</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Michael Brown", status: "Approved", vehicles: 3, participants: 105 },
                  { name: "Sareh Johnson", status: "Approved", vehicles: 1, participants: 350 },
                  { name: "David Wilson", status: "Approved", vehicles: 2, participants: 60 },
                  { name: "Emily White", status: "Approved", vehicles: 1, participants: 60 },
                  { name: "James Clark", status: "Approved", vehicles: 4, participants: 30 }
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3 text-sm">{row.name}</td>
                    <td className="p-3 text-sm">{row.status}</td>
                    <td className="p-3 text-sm">{row.vehicles}</td>
                    <td className="p-3 text-sm">{row.participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TEXTAREA + CHECKBOX + BUTTON */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
          <label className="block font-medium mb-2 text-sm md:text-base">
            Please give a detailed explanation of what the vehicle will be used for:
          </label>

          <textarea
            className="w-full border p-3 rounded text-sm md:text-base mb-4"
            rows={4}
          ></textarea>

          <label className="flex items-start space-x-2 mb-4">
            <input type="checkbox" className="mt-1" />
            <span className="text-sm text-gray-600">
              Please state this checkbox if your registration necessitates a minimum of only 2 individuals.
            </span>
          </label>

          <button className="bg-yellow-500 text-white w-full md:w-auto px-6 py-2 rounded hover:bg-yellow-600">
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
