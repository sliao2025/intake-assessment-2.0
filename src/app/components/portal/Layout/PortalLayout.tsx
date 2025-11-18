"use client";

import React, { useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  User,
  ChevronsLeft,
  ChevronsRight,
  Brain,
} from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { DM_Serif_Text } from "next/font/google";
import { intPsychTheme } from "../../theme";
import logo from "@/assets/IP_Logo.png";

interface PortalLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  { key: "journal", label: "Journal", icon: BookOpen, href: "/journal" },
  {
    key: "assessments",
    label: "Assessments",
    icon: FileText,
    href: "/assessments",
  },
  {
    key: "psychoeducation",
    label: "Psychoeducation",
    icon: Brain,
    href: "/psychoeducation",
  },
];

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Initialize state from localStorage synchronously to prevent flash
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem("portalSidebarExpanded");
    return saved !== null ? saved === "true" : true;
  });

  const sidebarWidth = isExpanded ? "w-64" : "w-20";
  const toggleIcon = isExpanded ? (
    <ChevronsLeft className="text-white w-4 h-4" />
  ) : (
    <ChevronsRight className="text-white w-4 h-4" />
  );

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "portalSidebarExpanded",
          next ? "true" : "false"
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

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside
        className={`${sidebarWidth} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 relative`}
      >
        {/* Logo/Title */}
        <div className="relative p-4 border-b flex items-center gap-2 border-gray-200">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Integrative Psych logo"
              className={`object-contain ${isExpanded ? "h-12 w-12" : "h-10 w-10"}`}
            />
            {isExpanded && (
              <h1
                className={`${dm_serif.className} text-xl font-semibold text-gray-800`}
                style={{ color: intPsychTheme.primary }}
              >
                Integrative Psych
              </h1>
            )}
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            style={{ backgroundColor: intPsychTheme.primary }}
            className="absolute right-0 top-full translate-y-[-50%] translate-x-1/2 p-1.5 rounded-full border border-gray-200 transition-colors hover:bg-gray-50"
            aria-label={isExpanded ? "Shrink sidebar" : "Expand sidebar"}
          >
            {toggleIcon}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            const hoverBg = `${intPsychTheme.secondaryLight}`;
            const activeStyle = isActive
              ? {
                  backgroundColor: `${intPsychTheme.secondaryLight}`,
                  color: intPsychTheme.secondaryDark,
                  ["--portal-hover-bg" as any]: hoverBg,
                }
              : { ["--portal-hover-bg" as any]: hoverBg };

            return (
              <div key={item.key} className="relative group">
                <Link
                  href={item.href}
                  style={activeStyle}
                  className={`flex items-center ${
                    isExpanded ? "gap-3 px-3" : "justify-center px-0"
                  } py-2.5 rounded-lg text-md font-thin transition-colors ${
                    isActive
                      ? ""
                      : `text-[${intPsychTheme.primary}] hover:bg-[var(--portal-hover-bg)] hover:text-[${intPsychTheme.primary}]`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isExpanded && item.label}
                </Link>
                {/* Tooltip - show on hover, especially useful when sidebar is collapsed */}
                <div
                  style={{ backgroundColor: intPsychTheme.primary }}
                  className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2  text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-250 delay-200 pointer-events-none whitespace-nowrap z-50 shadow-lg ${
                    isExpanded ? "hidden" : ""
                  }`}
                >
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4  border-t border-gray-200">
          <Menu as="div" className="relative">
            <div
              className={`flex items-center gap-3 ${
                isExpanded ? "" : "justify-center"
              }`}
            >
              <MenuButton
                className={`${
                  isExpanded ? "" : "w-full justify-center"
                } cursor-pointer flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
                title={session?.user?.name ?? "Your profile"}
                aria-label="Open profile menu"
              >
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium overflow-hidden border border-gray-200">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session?.user?.name ?? "Profile"}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {getInitials(session?.user?.name)}
                    </span>
                  )}
                </div>
              </MenuButton>
              {isExpanded && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
              )}
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems
                className={`absolute ${
                  isExpanded ? "left-0" : "left-full ml-2"
                } bottom-full mb-2 w-48 origin-bottom-left rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50`}
              >
                <div className="py-1">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
                    <div className="truncate font-medium text-gray-700">
                      {session?.user?.name ?? "Signed in"}
                    </div>
                    {session?.user?.email?.split("-")[0] === "guest" ? (
                      <div className="truncate italic text-gray-400">
                        (Guest user)
                      </div>
                    ) : (
                      <div className="truncate">
                        {session?.user?.email ?? ""}
                      </div>
                    )}
                  </div>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                        className={`w-full text-left px-3 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Logout
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#E8F5EE] overflow-y-auto">{children}</main>
    </div>
  );
}
