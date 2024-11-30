"use client";
import React from "react";
import { Listbox, ListboxItem, Tooltip } from "@nextui-org/react";
import { IconWrapper } from "./IconWrapper";
import { Accordion, AccordionItem } from "@nextui-org/react";
import DynamicIcon from "@/components/common/DynamicIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PageDataGroup } from "./config";
interface Menu_props {
  isSidebarCollapsed: boolean;
  pages: PageDataGroup[];
}

const Menu_list: React.FC<Menu_props> = ({ pages, isSidebarCollapsed }) => {
  const pathname = usePathname();
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium dark:text-red",
    trigger: "px-2 py-0 bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2 bg-default-100 dark:text-red",
  };

  return pages.map((item: any, i: number) =>
    item.page_data ? (
      <Accordion
        key={i}
        showDivider={false}
        className="p-0 flex flex-col gap-1 w-full max-w-[300px]"
        variant="shadow"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key={`${i}-${item.label}-accordion`} // Unique key for AccordionItem
          aria-label={item.label}
          startContent={<DynamicIcon icon={item.icon} />}
          title={<span className={isSidebarCollapsed ? "hidden" : "block dark:text-red-500"}>{item.label}</span>}
        >
          <Listbox
            aria-label="User Menu"
            className="py-2 px-0 flex flex-col gap-1 w-full max-w-[300px]"
            variant="shadow"
            style={{ maxWidth: "200px", margin: "auto" }}
            itemClasses={{
              base: "p-0  first:rounded-t-medium dark:text-white last:rounded-b-medium rounded-none gap-3 h-12 dark:hover:text-red-500 hover:bg-default-100/80 dark:hover:text-red-500",
            }}
          >
            {item.page_data.map((subitem: any, j: number) => (
              <ListboxItem
                key={j}
                className={
                  pathname === subitem.href ? "bg-black text-white" : ""
                }
              >
                <Link
                  className={`p-0 dark:text-red-500 ${isSidebarCollapsed ? "" : "flex items-center justify-between"} w-full h-full text-inherit`}
                  href={subitem.href}
                >
                  <div className={`${isSidebarCollapsed ? "items-center" : "flex gap-2 items-center"}`}>
                    <span>

                      <Tooltip
                        content={subitem.title}
                        showArrow={true}
                        placement="right" // Adjust placement for better alignment
                      >
                        <IconWrapper className="text-success">
                          <DynamicIcon icon={subitem.icon} />
                        </IconWrapper>
                      </Tooltip>
                    </span>
                    <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>{subitem.title}</span>
                  </div>

                </Link>
              </ListboxItem>
            ))}
          </Listbox>
        </AccordionItem>
      </Accordion>
    ) : (
      <Listbox
        aria-label="User Menu"
        style={{ maxWidth: "220px", margin: "auto" }}
        className="p-0 gap-0 mt-2 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 py-0 first:rounded-t-medium dark:text-white last:rounded-b-medium rounded-none gap-3 h-12 dark:hover:text-red-500 hover:bg-default-100/80 dark:hover:text-red-500",
        }}
      >
        <ListboxItem
          key={i}
          className={pathname === item.href ? "bg-black text-white" : ""}
        >
          <Link
            className={`p-0 dark:text-red-500 ${isSidebarCollapsed ? "items-center" : "flex items-center justify-between"} w-full h-full text-inherit`}
            href={item.href}
          >
            <div className={`${isSidebarCollapsed ? "items-center" : "flex gap-2 items-center"}`}>
              <span>
                <Tooltip
                  content={item.title}
                  showArrow={true}
                  placement="right" // Adjust placement for better alignment
                >
                  <IconWrapper isSidebarCollapsed={isSidebarCollapsed} className="text-success ">
                    <DynamicIcon icon={item.icon} />
                  </IconWrapper>
                </Tooltip>
              </span>
              <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>{item.title}</span>
            </div>

          </Link>
        </ListboxItem>
      </Listbox>
    )
  );
};

export default Menu_list;
