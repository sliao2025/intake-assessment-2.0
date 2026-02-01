"use client";

import React, { useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
  Brain,
  ClipboardList,
  Sprout,
  PanelLeft, // Changed from AlignJustify to match clinician report
  X,
} from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { intPsychTheme, sigmundTheme } from "../../theme";
import logo from "@/assets/IP_Logo.png";
import sigmund_logo from "public/Sigmund Window.png";
import { useWeather } from "../../../lib/hooks/useWeather";
import WeatherWidget from "../../WeatherWidget";
import { useSound } from "use-sound";

interface PortalLayoutProps {
  children: React.ReactNode;
}

// Using IntPsych Theme Colors
const navigationItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: `text-[${intPsychTheme.primary}]`, // Navy
  },
  {
    key: "journal",
    label: "Journal",
    icon: BookOpen,
    href: "/journal",
    color: `text-[${sigmundTheme.primary}]`, // Orange/Amber
  },
  {
    key: "scales",
    label: "Scales",
    icon: ClipboardList,
    href: "/scales",
    color: `text-[${intPsychTheme.accent}]`, // Blue
  },
];

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });
const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const { weather } = useWeather();
  const [play] = useSound("/sfx/mid-pop.wav");

  // Initialize state from localStorage synchronously to prevent flash
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem("portalSidebarExpanded");
    return saved !== null ? saved === "true" : true;
  });

  const sidebarWidth = isExpanded ? "w-72" : "w-24";
  const toggleIcon = isExpanded ? (
    <ChevronsLeft className="text-white w-5 h-5" />
  ) : (
    <ChevronsRight className="text-white w-5 h-5" />
  );

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "portalSidebarExpanded",
          next ? "true" : "false",
        );
      }
      return next;
    });
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
    // Determine effective expanded state for rendering content
    const expanded = isMobile || isExpanded;

    return (
      <>
        {/* Logo/Title - Header */}
        <div
          className={`relative p-6 flex items-center gap-3 ${
            expanded ? "justify-start" : "justify-center"
          } border-b-2 border-[${sigmundTheme.border}]`}
        >
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-[#e0f2fe] rounded-full transform scale-0" />
            <Image
              src={sigmund_logo}
              alt="Sigmund logo"
              className={`relative object-contain transition-all duration-300 ${
                expanded ? "h-14 w-14" : "h-12 w-12"
              }`}
            />
          </div>

          {expanded && (
            <h1
              className={`${dm_serif.className} text-4xl tracking-tight leading-none`}
              style={{ color: sigmundTheme.accent }}
            >
              Sigmund
            </h1>
          )}

          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-100 text-stone-500"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Desktop Toggle Button */}
          {!isMobile && (
            <button
              type="button"
              onClick={toggleSidebar}
              className={`absolute right-[-2px] top-full translate-x-1/2 -translate-y-1/2 bg-[#91654f] border-[${sigmundTheme.border}] p-1.5 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all z-50 text-white hover:text-white`}
              aria-label={isExpanded ? "Shrink sidebar" : "Expand sidebar"}
            >
              {toggleIcon}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 px-4 py-6 space-y-2 scrollbar-hide ${
            expanded ? "overflow-y-auto" : "overflow-visible"
          }`}
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <div key={item.key} className="relative group">
                <Link
                  href={item.href}
                  onClick={() => isMobile && setMobileOpen(false)} // Close on navigate (mobile)
                  className={`flex items-center ${
                    expanded ? "gap-4 px-4" : "justify-center px-0"
                  } py-4 rounded-xl text-base font-medium transition-all duration-200 relative overflow-hidden group ${
                    isActive
                      ? `bg-[#f0f9ff] text-[#426459] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border-2 border-[${sigmundTheme.border}]`
                      : "text-stone-500 hover:bg-stone-100 hover:text-[#426459] border border-transparent"
                  }`}
                >
                  {/* Active Indicator Pill */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#426459] rounded-r-full" />
                  )}

                  <Icon
                    className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                      isActive
                        ? item.color
                        : "text-stone group-hover:text-[#426459]"
                    }`}
                    strokeWidth={2}
                  />
                  {expanded && (
                    <span className="tracking-wide">{item.label}</span>
                  )}
                </Link>

                {/* Tooltip for collapsed state (Desktop only) */}
                {!expanded && (
                  <div
                    style={{ backgroundColor: sigmundTheme.accent }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2  text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[9999] shadow-xl pointer-events-none"
                  >
                    {item.label}
                    <div
                      style={{ borderRightColor: sigmundTheme.accent }}
                      className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white"
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`p-3 border-t-2 border-[${sigmundTheme.border}]`}>
          <Menu as="div" className="relative">
            <MenuButton
              className={`w-full ${
                expanded ? "px-3 py-3" : "justify-center py-2"
              } flex items-center gap-3 rounded-xl hover:bg-[#f5f5f4] border border-transparent hover:border-[${
                sigmundTheme.border
              }] transition-all group outline-none`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center text-[#0369a1] font-bold text-lg overflow-hidden">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session?.user?.name ?? "Profile"}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    getInitials(session?.user?.name)
                  )}
                </div>
              </div>

              {expanded && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-bold text-[#1c1917] truncate">
                    {session?.user?.name || "Adventurer"}
                  </p>
                  <p className="text-xs text-stone-500">Patient Portal</p>
                </div>
              )}
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95 translate-y-2"
              enterTo="transform opacity-100 scale-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100 translate-y-0"
              leaveTo="transform opacity-0 scale-95 translate-y-2"
            >
              <MenuItems
                className={`absolute ${
                  expanded
                    ? "left-0 bottom-full mb-4 w-full"
                    : "left-full bottom-0 ml-4 w-56"
                } rounded-xl border border-[${
                  sigmundTheme.border
                }] bg-white shadow-xl focus:outline-none z-[9999] overflow-hidden p-1`}
              >
                <div
                  className={`px-4 py-3 bg-[${sigmundTheme.background}] border-b border-[${sigmundTheme.border}] mb-1`}
                >
                  <p className="text-xs font-bold text-stone-400 uppercase">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-stone-700 truncate">
                    {session?.user?.email}
                  </p>
                </div>

                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        active ? "bg-red-50 text-red-700" : "text-stone-600"
                      }`}
                    >
                      Log Out
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </>
    );
  };

  return (
    <div
      className={`flex h-screen overflow-hidden bg-slate-50 ${dm_sans.className}`}
    >
      {/* Mobile Overlay */}
      <Transition show={isMobileOpen} as={Fragment}>
        <div className="fixed inset-0 z-40 sm:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <aside
              className={`fixed inset-y-0 left-0 w-72 bg-white border-r-2 border-[${sigmundTheme.border}] flex flex-col z-50 shadow-xl`}
            >
              <SidebarContent isMobile={true} />
            </aside>
          </Transition.Child>
        </div>
      </Transition>

      {/* Desktop Sidebar */}
      <aside
        className={`${sidebarWidth} hidden sm:flex bg-white border-r-2 border-[${sigmundTheme.border}] flex-col transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="sm:hidden bg-white border-b border-stone-200 p-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors"
          >
            <PanelLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <Image
              src={sigmund_logo}
              alt="Sigmund logo"
              className="h-8 w-8 object-contain"
            />
            <h1
              className={`${dm_serif.className} text-xl tracking-tight leading-none`}
              style={{ color: sigmundTheme.accent }}
            >
              Sigmund
            </h1>
          </div>

          <div className="ml-auto">
            <WeatherWidget weather={weather} compact />
          </div>
        </div>

        <main
          className="flex-1 overflow-y-auto scroll-smooth"
          style={{ backgroundColor: sigmundTheme.background }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
