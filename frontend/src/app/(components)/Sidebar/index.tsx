"use client";
import React from "react";
import { ScrollShadow, Select, SelectItem } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed, setWorkspace } from "@/state";
import Menu_list from "./Menu_list";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { navItems } from "./config";

export const workspce_selector = [
  { key: "crm", label: "CRM" },
  { key: "dashboard", label: "Dashboard" },
  { key: "streaming", label: "Streaming" },
  { key: "karnalwebtech", label: "Karnal Web Tech" },
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const Workspace = useAppSelector((state) => state.global.Workspace);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col dark:bg-[#1f1228] ${isSidebarCollapsed ? "w-[0px] lg:w-[65px]" : "w-72 md:w-64"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  // Update handleWorkSpace to handle string values
  const handleWorkSpace = (value: string) => {
    router.push(`/${value}`);
    dispatch(setWorkspace(value));
  };

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"
          }`}
      >
        <h1
          className={`${isSidebarCollapsed ? "hidden" : "block"
            } font-extrabold text-2xl`}
        >
          EDSTOCK
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <Select
          isRequired
          label="Workspace"
          onChange={(e) => handleWorkSpace(e.target.value)} // Extract value from event
          defaultSelectedKeys={[Workspace]}
          className="max-w-xs text-lg p-4"
        >
          {workspce_selector.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <ScrollShadow isEnabled={false} hideScrollBar={true} orientation="horizontal" className="max-h-[440px]">
          {navItems
            .filter((item) => item.key === Workspace)
            .map((item) => (
              <Menu_list key={item.key} pages={item.pages} isSidebarCollapsed={isSidebarCollapsed} />
            ))}
        </ScrollShadow>
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500 pt-4">
          &copy; 2024 Edstock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
