"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ShieldCheck,
  LogOut,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { mainNavItems } from "@/lib/navigation";
import { notifications, unreadCount } from "@/data/notifications";
import { CURRENT_USER } from "@/lib/currentUser";
import LogoutConfirmModal from "@/components/ui/LogoutConfirmModal";

const USER_AVATAR = CURRENT_USER.avatar;

interface MobileNavCtx {
  openNav: () => void;
  openNotifications: () => void;
}

const MobileNavContext = createContext<MobileNavCtx>({
  openNav: () => {},
  openNotifications: () => {},
});

export const useMobileNav = () => useContext(MobileNavContext);

const extraItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function MobileNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const close = () => setOpen(false);

  const renderNavLink = (item: {
    icon: typeof User;
    label: string;
    href: string;
  }) => {
    const isActive =
      pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Link key={item.href} href={item.href} onClick={close}>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
            isActive
              ? "bg-violet-50 text-violet-600 font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <item.icon size={20} />
          <span className="font-medium">{item.label}</span>
        </div>
      </Link>
    );
  };

  return (
    <MobileNavContext.Provider
      value={{
        openNav: () => setOpen(true),
        openNotifications: () => setNotifOpen(true),
      }}
    >
      {children}

      {/* Navigation drawer */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden fixed inset-0 z-[60]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={close}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
              className="absolute left-0 top-0 h-full w-72 max-w-[82%] bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    O
                  </div>
                  <span className="text-xl font-bold text-gray-900">Ologo</span>
                </div>
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                  {mainNavItems.map(renderNavLink)}
                </div>

                <div className="my-3 border-t border-gray-100" />

                <div className="space-y-1">{extraItems.map(renderNavLink)}</div>

                <Link href="/get-verified" onClick={close}>
                  <div className="mt-4 bg-violet-50 border-2 border-violet-200 rounded-xl p-4 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldCheck size={18} className="text-violet-600" />
                      <span className="font-bold text-violet-900 text-sm">
                        Verify Account
                      </span>
                    </div>
                    <p className="text-xs text-violet-700">
                      Complete verification to unlock all features
                    </p>
                  </div>
                </Link>
              </nav>

              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    close();
                    setLogoutOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications panel */}
      <AnimatePresence>
        {notifOpen && (
          <div className="md:hidden fixed inset-0 z-[60]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setNotifOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[86%] bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <p className="text-base font-bold text-gray-900">
                  Notifications
                </p>
                <button
                  onClick={() => setNotifOpen(false)}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
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
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-violet-600 mt-1.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <LogoutConfirmModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          router.push("/auth/login");
        }}
      />
    </MobileNavContext.Provider>
  );
}

export function MobileMenuButton({
  className = "w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  const { openNav } = useMobileNav();
  return (
    <button
      type="button"
      onClick={openNav}
      aria-label="Open menu"
      className={className}
    >
      <Menu size={size} />
    </button>
  );
}

/** Uniform right-side header actions: user avatar (→ profile) + notification bell. */
export function MobileHeaderActions({
  variant = "violet",
}: {
  variant?: "violet" | "plain";
}) {
  const { openNotifications } = useMobileNav();
  const violet = variant === "violet";

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link href="/profile" aria-label="Your profile">
        <img
          src={USER_AVATAR}
          alt="Profile"
          className={
            violet
              ? "w-10 h-10 rounded-full border-2 border-white/30 object-cover"
              : "w-9 h-9 rounded-full object-cover ring-1 ring-gray-200"
          }
        />
      </Link>
      <button
        type="button"
        onClick={openNotifications}
        aria-label="Notifications"
        className={
          violet
            ? "relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white"
            : "relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600"
        }
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            className={`absolute top-0.5 right-0.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold leading-none rounded-full ${
              violet ? "bg-white text-violet-700" : "bg-violet-600 text-white"
            }`}
          >
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
