"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { notifications } from "@/data/notifications";
import { CURRENT_USER } from "@/lib/currentUser";
import LogoutConfirmModal from "@/components/ui/LogoutConfirmModal";

const panelTransition = { duration: 0.16, ease: [0.16, 1, 0.3, 1] as const };

export default function DashboardHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="hidden md:block border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl sticky top-0 z-40 w-full">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5 gap-4 min-h-[60px]">
        {/* Title */}
        <h1 className="text-base md:text-lg font-bold text-gray-900"></h1>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((o) => !o);
                setMenuOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={notifOpen}
              aria-label="Notifications"
              className={`relative text-black  transition-colors p-2 rounded-lg ${
                notifOpen ? "bg-gray-100 text-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <Bell className="w-5 md:w-6 h-5 md:h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white bg-violet-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotifOpen(false)}
                    aria-hidden
                  />
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={panelTransition}
                    style={{ transformOrigin: "top right" }}
                    className="absolute right-0 top-full mt-2 z-50 w-80 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">
                        Notifications
                      </p>
                      <button className="text-xs font-medium text-violet-600 hover:text-violet-700">
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => setNotifOpen(false)}
                          className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-50 transition-colors ${
                            n.unread ? "bg-violet-50/40" : ""
                          } hover:bg-gray-50`}
                        >
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.color}`}
                          >
                            <n.icon size={16} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 leading-snug">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {n.time}
                            </p>
                          </div>
                          {n.unread && (
                            <span className="w-2 h-2 rounded-full bg-violet-600 mt-1.5 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="w-full text-center py-3 text-sm font-semibold text-violet-600 hover:bg-gray-50 transition-colors"
                    >
                      View all
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200"></div>

          {/* Profile + dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen((o) => !o);
                setNotifOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Account menu"
              className={`w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold overflow-hidden transition-shadow ${
                menuOpen ? "ring-2 ring-violet-400 ring-offset-2" : ""
              }`}
            >
              <img
                src={CURRENT_USER.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden
                  />
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={panelTransition}
                    style={{ transformOrigin: "top right" }}
                    className="absolute right-0 top-full mt-2 z-50 w-60 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                      <img
                        src={CURRENT_USER.avatar}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {CURRENT_USER.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {CURRENT_USER.email}
                        </p>
                      </div>
                    </div>

                    <div className="p-1.5">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} className="text-gray-400" />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings size={16} className="text-gray-400" />
                        Settings
                      </Link>
                    </div>

                    <div className="p-1.5 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          setLogoutOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          router.push("/auth/login");
        }}
      />
    </header>
  );
}
