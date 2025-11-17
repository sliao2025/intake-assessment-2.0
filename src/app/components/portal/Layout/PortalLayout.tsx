"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  User,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
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
  { key: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarWidth = isExpanded ? "w-64" : "w-20";
  const toggleIcon = isExpanded ? (
    <ChevronsLeft className="w-4 h-4" />
  ) : (
    <ChevronsRight className="w-4 h-4" />
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("portalSidebarExpanded");
    if (saved !== null) {
      setIsExpanded(saved === "true");
    }
  }, []);

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
            className="absolute right-0 top-full translate-y-[-50%] translate-x-1/2 p-1.5 rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
            aria-label={isExpanded ? "Shrink sidebar" : "Expand sidebar"}
          >
            {toggleIcon}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            const hoverBg = `${intPsychTheme.secondary}1a`;
            const activeStyle = isActive
              ? {
                  backgroundColor: `${intPsychTheme.secondary}33`,
                  color: intPsychTheme.text,
                  ["--portal-hover-bg" as any]: hoverBg,
                }
              : { ["--portal-hover-bg" as any]: hoverBg };

            return (
              <Link
                key={item.key}
                href={item.href}
                style={activeStyle}
                className={`flex items-center ${
                  isExpanded ? "gap-3 px-3" : "justify-center px-0"
                } py-2.5 rounded-lg text-sm font-thin transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:bg-[var(--portal-hover-bg)] hover:text-[#113e60]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {isExpanded && item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div
            className={`flex items-center gap-3 ${
              isExpanded ? "" : "justify-center"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
              {getInitials(session?.user?.name)}
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#E8F5EE] overflow-y-auto">{children}</main>
    </div>
  );
}
