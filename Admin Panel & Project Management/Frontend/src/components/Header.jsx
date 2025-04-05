import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between mx-[75px]">
        {/* Logo or Site Title */}
        <div className="text-2xl font-bold text-blue-600">Autovault</div>
        <div className="flex space-x-3">
          <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 transition">
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
