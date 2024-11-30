import List_table from "@/components/common/table/List_table";
import {
  useGetAllVendorsQuery,
  useActionVendorMutation,
} from "@/state/vendorApi";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import {
  Chip,
  ChipProps,
  CircularProgress,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Trash2, Edit, Eye, RotateCcw, Eraser } from "lucide-react";

import {
  vendr_list,
  Get_VendorResponse,
  vendor_Column,
} from "@/types/Vendor_type";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";

interface list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}
const INITIAL_VISIBLE_COLUMNS = ["_no","name", "phone", "gstin", "state", "updatedAt", "audit_log", "actions"];

const columns: vendor_Column[] = [
  { name: "_id", uid: "_no" },
  { name: "Vendor name", uid: "name" },
  { name: "Phone", uid: "phone" },
  { name: "Email", uid: "email" },
  { name: "Company", uid: "company_name" },
  { name: "Status", uid: "status" },
  { name: "GSTIN", uid: "gstin" },
  { name: "Last Update", uid: "updatedAt" },
  { name: "Employ", uid: "audit_log" },
  { name: "Actions", uid: "actions" }, // Added actions column
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
};

const Vendor_list: React.FC<list_props> = ({ set_open, edit_handler }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [page_status, set_page_status] = useState<string>("yes");
  const [deleted_status, set_deleted_status] = useState<string>("no");
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = useGetAllVendorsQuery({
    is_active: page_status,
    is_delete: page_status && page_status === "final" ? "yes" : "no",
    keyword: debouncedFilterValue,
    status: statusFilter,
    rowsPerPage: rowsPerPage,
    page: page,
  });
  const [
    actionVendor,
    {
      error: delete_error,
      isLoading: delete_loading,
      isSuccess: delete_success,
    },
  ] = useActionVendorMutation();
  // Debounce the filter value to avoid excessive API calls
  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );

  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);

  useEffect(() => {
    if (delete_error || error) {
      let errorMessage = "An unexpected error occurred."; // Default message

      // Check if 'error' is defined and has the expected structure
      if (delete_error && 'data' in delete_error) {
        errorMessage = (delete_error as { data?: { message?: string } }).data?.message || errorMessage;
      }

      // Check if 'update_error' is defined and has the expected structure
      if (error && 'data' in error) {
        errorMessage = (error as { data?: { message?: string } }).data?.message || errorMessage;
      }

      toast.error(errorMessage); // Show the error toast
      return
    }
    if (delete_success) {
      toast.success("Vendor successfuly updated"); // Show the error toast
    }
  }, [delete_error, delete_success, toast, error]);
  // Fetch vendors only when debouncedFilterValue has a valid value


  const response: Get_VendorResponse | undefined = data as
    | Get_VendorResponse
    | undefined;
  const vendors: Get_VendorResponse = useMemo(() => {
    const vendor: vendr_list[] = response?.vendor || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { vendor, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (vendor: vendr_list, columnKey: React.Key) => {
      const cellValue = vendor[columnKey as keyof vendr_list];

      const deleteHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionVendor({ id, state, hard_delete });
      };
      const restoreHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionVendor({ id, state, hard_delete });
      };
      const hard_deleteHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionVendor({ id, state, hard_delete });
      };
      const hard_restoreHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionVendor({ id, state, hard_delete });
      };

      switch (columnKey) {
        case "_no":
          return (
         <p>{vendor?._no}</p>
          );
        case "name":
          return (
            <User
              key={vendor._id}
              avatarProps={{ radius: "lg", src: "" }} // Replace with a valid image URL if available
              name={cellValue}
            >
              {vendor?.name}
            </User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[vendor.status.toLocaleLowerCase()]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "updatedAt":
          return (
            <TimeAgo time={cellValue} />
          );
        case "audit_log":
          return (
            <p>{cellValue?.name}</p>
          );
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <Tooltip content={vendor.is_active === "yes" ? "Edit vendor" : "Recover vendor"}>
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  {vendor && vendor.is_delete === "no" ? (
                    vendor.is_active === "yes" ? (
                      <Edit size={20} onClick={() => edit_handler(vendor._id)} />
                    ) : vendor.is_active === "no" ? (
                      <RotateCcw
                        onClick={() => restoreHandler(vendor._id, "yes", "no")}
                        size={20}
                      />
                    ) : null /* Handle if no other case applies */
                  ) : (
                    <RotateCcw
                      onClick={() =>
                        hard_restoreHandler(vendor._id, "no", "no")
                      }
                      size={20}
                    />
                  )}
                </span>
              </Tooltip>

              <Tooltip content={vendor.is_active === "yes" ? "Delete vendor" : "Erase vendor"}>
                <span className="text-sm text-red-600 cursor-pointer active:opacity-50">
                  {
                    vendor && vendor.is_delete === "no" ? (
                      delete_loading ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : vendor.is_active === "yes" ? (
                        <Trash2
                          className="text-red-600"
                          onClick={() => deleteHandler(vendor._id, "no", "no")}
                          size={20}
                        />
                      ) : (
                        <Eraser
                          onClick={() =>
                            hard_deleteHandler(vendor._id, "no", "yes")
                          }
                          size={20}
                        />
                      )
                    ) : null /* Handle if vendor.is_delete is "no" */
                  }
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div>
      {/* <Test set_open={set_open} data={data} />
       */}
      <List_table<vendr_list>
        data={vendors.vendor}
        loading={isLoading}
        columns={columns}
        resultPerpage={vendors.resultPerpage}
        setRowsPerPage={setRowsPerPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data_length={vendors.data_counter}
        page={page}
        setPage={setPage}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        form_open={set_open}
        set_page_status={set_page_status}
        visiable_columns={INITIAL_VISIBLE_COLUMNS}
        renderCell={renderCell}
      />
    </div>
  );
};

export default Vendor_list;
