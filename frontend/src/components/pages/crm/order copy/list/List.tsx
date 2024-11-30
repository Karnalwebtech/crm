"use client";
import List_table from "@/components/common/table/List_table";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { Chip, CircularProgress, Tooltip } from "@nextui-org/react";
import { Trash2, Edit, RotateCcw, Eraser } from "lucide-react";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import { useActionMutation } from "@/state/productApi";
import { product_type_list } from "@/types/Product_types";
import { statusColorMap } from "@/components/common/table/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAllQuery } from "@/state/purchaseApi";

interface list_props { }
const INITIAL_VISIBLE_COLUMNS = [
  "purchase_no",
  "vendor",
  "purchase_date",
  "supplier_invoice_serial_no",
  "order_status",
  "payment_mode",
  "updatedAt",
  "audit_log",
  "actions",
];

const columns: any[] = [
  { name: "Purchase no", uid: "purchase_no" },
  { name: "Vendor", uid: "vendor" },
  { name: "Prchase Date", uid: "purchase_date" },
  { name: "Invoice no", uid: "supplier_invoice_serial_no" },
  { name: "Order status", uid: "order_status" },
  { name: "Payment mode", uid: "payment_mode" },
  { name: "Status", uid: "status" },
  { name: "Last Update", uid: "updatedAt" },
  { name: "Employ", uid: "audit_log" },
  { name: "Actions", uid: "actions" }, // Added actions column
];

const List: React.FC<list_props> = () => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState<string>("");
  const [page_status, set_page_status] = useState<string>("yes");
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [page, setPage] = useState<number>(1);

  //-------------use states for apis
  const { data, error, isLoading } = useGetAllQuery({
    is_active: page_status,
    is_delete: page_status && page_status === "final" ? "yes" : "no",
    keyword: debouncedFilterValue,
    status: statusFilter,
    rowsPerPage: rowsPerPage,
    page: page,
  });

  const [
    action,
    {
      error: delete_error,
      isLoading: delete_loading,
      isSuccess: delete_success,
    },
  ] = useActionMutation();
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
      if (delete_error && "data" in delete_error) {
        errorMessage =
          (delete_error as { data?: { message?: string } }).data?.message ||
          errorMessage;
      }

      // Check if 'update_error' is defined and has the expected structure
      if (error && "data" in error) {
        errorMessage =
          (error as { data?: { message?: string } }).data?.message ||
          errorMessage;
      }

      toast.error(errorMessage); // Show the error toast
      return;
    }
    if (delete_success) {
      toast.success("Product successfuly updated"); // Show the error toast
    }
  }, [delete_error, delete_success, toast, error]);
  // Fetch vendors only when debouncedFilterValue has a valid value

  const response: any | undefined = data as any | undefined;
  const result: any = useMemo(() => {
    const result: any[] = response?.result || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { result, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (orders: product_type_list, columnKey: React.Key) => {
      const cellValue = orders[columnKey as keyof product_type_list];

      const deleteHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await action({ id, state, hard_delete });
      };
      const restoreHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await action({ id, state, hard_delete });
      };
      const hard_deleteHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await action({ id, state, hard_delete });
      };
      const hard_restoreHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await action({ id, state, hard_delete });
      };

      switch (columnKey) {
        case "order_no":
          return <p> #{cellValue}</p>;
          case "vendor":
            return <p> {cellValue?.name}</p>;
        case "name":
          return <p> {cellValue}</p>;
        case "order_date":
          return <TimeAgo time={cellValue} />;
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[orders.status.toLocaleLowerCase()]}
              size="sm"
              variant="flat"
            >
              {orders.status ?? "Unknown"}
            </Chip>
          );
        case "updatedAt":
          return <TimeAgo time={cellValue} />;
        case "audit_log":
          return <p>{cellValue?.name ?? "No Log"}</p>;
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <Tooltip
                content={
                  orders.is_active === "yes" ? "Edit order" : "Recover order"
                }
              >
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  {orders && orders.is_delete === "no" ? (
                    orders.is_active === "yes" ? (
                      <Link href={`/crm/orders/form/${orders._id}`}>
                        <Edit size={20} />
                      </Link>
                    ) : orders.is_active === "no" ? (
                      <RotateCcw
                        onClick={() => restoreHandler(orders._id, "yes", "no")}
                        size={20}
                      />
                    ) : null /* Handle if no other case applies */
                  ) : (
                    <RotateCcw
                      onClick={() =>
                        hard_restoreHandler(orders._id, "no", "no")
                      }
                      size={20}
                    />
                  )}
                </span>
              </Tooltip>

              <Tooltip
                content={
                  orders.is_active === "yes" ? "Delete order" : "Erase order"
                }
              >
                <span className="text-sm text-red-600 cursor-pointer active:opacity-50">
                  {
                    orders && orders.is_delete === "no" ? (
                      delete_loading ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : orders.is_active === "yes" ? (
                        <Trash2
                          className="text-red-600"
                          onClick={() => deleteHandler(orders._id, "no", "no")}
                          size={20}
                        />
                      ) : (
                        <Eraser
                          onClick={() =>
                            hard_deleteHandler(orders._id, "no", "yes")
                          }
                          size={20}
                        />
                      )
                    ) : null /* Handle if orders.is_delete is "no" */
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
  const funedirect = () => {
    if (router) {
      router.push("/crm/orders");
    }
  };
  return (
    <div>
      <List_table<product_type_list>
        data={result.result}
        loading={isLoading}
        columns={columns}
        resultPerpage={result.resultPerpage}
        setRowsPerPage={setRowsPerPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data_length={result.data_counter}
        page={page}
        setPage={setPage}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        form_open={funedirect}
        set_page_status={set_page_status}
        visiable_columns={INITIAL_VISIBLE_COLUMNS}
        renderCell={renderCell}
      />
    </div>
  );
};

export default List;
