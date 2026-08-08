"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { mainNavItems } from "@/lib/navigation";

const MobileNavContext = createContext<{ openNav: () => void }>({
  openNav: () => {},
});

export const useMobileNav = () => useContext(MobileNavContext);

export function MobileNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const close = () => setOpen(false);

  return (
    <MobileNavContext.Provider value={{ openNav: () => setOpen(true) }}>
      {children}

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
              {/* Header */}
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

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                  {mainNavItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
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
                  })}
                </div>

                {/* Verify card */}
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

              {/* Footer */}
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    close();
                    router.push("/auth/login");
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
