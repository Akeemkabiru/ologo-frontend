"use client";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5 gap-4 min-h-[60px]">
        {/* Title */}
        <h1 className="text-base md:text-lg font-bold text-gray-900 pl-12 md:pl-0">
          Overview
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Search - Hidden on mobile */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search for something"
              className="w-48 lg:w-64 px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-500 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
            />
            <svg
              className="absolute right-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Settings */}
            <button className="text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-5 md:w-6 h-5 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Notifications */}
            <button className="relative text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-5 md:w-6 h-5 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-gray-700 rounded-full">
                1
              </span>
            </button>

            {/* Divider - Hidden on mobile */}
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            {/* Profile */}
            <button className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold overflow-hidden">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
