"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { ChevronDownIcon, PlusIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import Select_normal from "../fields/Select_normal";
import { capitalize } from "@/lib/service/capitalize";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/store/userSlice";
interface props {
  filterValue: string;
  statusFilter: string;
  setFilterValue: (value: string) => void;
  setPage: (value: number) => void;
  setStatusFilter: (value: string) => void;
  columns: any;
  setRowsPerPage: (value: number) => void;
  data_length: number;
  form_open: (vlaue: boolean) => void;
  visibleColumns: any;
  setVisibleColumns: any;
  set_page_status: (value: string) => void;
}
const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];
const TableTopContent: React.FC<props> = ({
  filterValue,
  statusFilter,
  setFilterValue,
  setPage,
  setStatusFilter,
  columns,
  setRowsPerPage,
  data_length,
  form_open,
  visibleColumns,
  setVisibleColumns,
  set_page_status,
}) => {
  const [page_state, set_state] = useState<number>(1);
  const user = useSelector(selectUser);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const hander_page_state = (value: string) => {
    set_page_status(value);
    set_state(value === "yes" ? 1 : value === "no" ? 2 : 3);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Select_normal
            placeholder="status"
            selected={statusFilter}
            label=""
            options={statusOptions}
            get_value={(value: string | number): void =>
              setStatusFilter(value.toString())
            }
          />

          <Dropdown>
            <DropdownTrigger className="flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column: any) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onClick={() => form_open(true)}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-default-400 text-small">
            Total {data_length}
          </span>

          <Button
            size="sm"
            onClick={() => hander_page_state("yes")}
            className={
              page_state === 1
                ? `bg-[#65a30d] text-white text-small`
                : "bg-white text-default-400 text-small"
            }
          >
            Publish
          </Button>
          <Button
            size="sm"
            onClick={() => hander_page_state("no")}
            className={
              page_state === 2
                ? `bg-danger text-white text-small`
                : "bg-white text-default-400 text-small"
            }
          >
            Trash
          </Button>
          {user && user.role === "admin" && (
            <>
              <Button
                size="sm"
                onClick={() => hander_page_state("final")}
                className={
                  page_state === 3
                    ? `bg-black text-white text-small`
                    : "bg-white text-default-400 text-small"
                }
              >
                Deleted
              </Button>
            </>
          )}
        </div>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default TableTopContent;
