import List_table from "@/components/common/table/List_table";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import {
  Chip,
  ChipProps,
  CircularProgress,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Trash2, Edit, RotateCcw, Eraser } from "lucide-react";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import {
  useActionCustomerMutation,
  useGetAllcustomerQuery,
} from "@/state/customerApi";
import {
  Column,
  customer_list,
  Get_CustomerResponse,
} from "@/types/Customer_type";

interface Customer_list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}
const INITIAL_VISIBLE_COLUMNS = [
  "_no",
  "name",
  "phone",
  "gstin",
  "state",
  "updatedAt",
  "audit_log",
  "actions",
];

const columns: Column[] = [
  { name: "_id", uid: "_no" },
  { name: "Name", uid: "name" },
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

const Customer_list: React.FC<Customer_list_props> = ({
  set_open,
  edit_handler,
}) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [page_status, set_page_status] = useState<string>("yes");
  const [deleted_status, set_deleted_status] = useState<string>("no");
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  //-------------use states for apis
  const { data, error, isLoading } = useGetAllcustomerQuery({
    is_active: page_status,
    is_delete: page_status && page_status === "final" ? "yes" : "no",
    keyword: debouncedFilterValue,
    status: statusFilter,
    rowsPerPage: rowsPerPage,
    page: page,
  });

  const [
    actionCustomer,
    {
      error: delete_error,
      isLoading: delete_loading,
      isSuccess: delete_success,
    },
  ] = useActionCustomerMutation();
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
      toast.success("Vendor successfuly updated"); // Show the error toast
    }
  }, [delete_error, delete_success, toast, error]);
  // Fetch vendors only when debouncedFilterValue has a valid value

  const response: Get_CustomerResponse | undefined = data as
    | Get_CustomerResponse
    | undefined;
  const customer: Get_CustomerResponse = useMemo(() => {
    const customer: customer_list[] = response?.customer || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { customer, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (customer: customer_list, columnKey: React.Key) => {
      const cellValue = customer[columnKey as keyof customer_list];

      const deleteHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionCustomer({ id, state, hard_delete });
      };
      const restoreHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionCustomer({ id, state, hard_delete });
      };
      const hard_deleteHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionCustomer({ id, state, hard_delete });
      };
      const hard_restoreHandler = async (
        id: string,
        state: string,
        hard_delete?: string
      ) => {
        await actionCustomer({ id, state, hard_delete });
      };

      switch (columnKey) {
        case "_no":
          return <>{customer?._no}</>;
        case "vendor_name":
          return (
            <User
              key={customer._id}
              avatarProps={{ radius: "lg", src: "" }} // Replace with a valid image URL if available
              name={cellValue}
            >
              {customer.name}
            </User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[customer.status.toLocaleLowerCase()]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "updatedAt":
          return <TimeAgo time={cellValue} />;
        case "audit_log":
          return <p>{cellValue?.name}</p>;
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <Tooltip
                content={
                  customer.is_active === "yes"
                    ? "Edit customer"
                    : "Recover customer"
                }
              >
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  {customer && customer.is_delete === "no" ? (
                    customer.is_active === "yes" ? (
                      <Edit
                        size={20}
                        onClick={() => edit_handler(customer._id)}
                      />
                    ) : customer.is_active === "no" ? (
                      <RotateCcw
                        onClick={() =>
                          restoreHandler(customer._id, "yes", "no")
                        }
                        size={20}
                      />
                    ) : null /* Handle if no other case applies */
                  ) : (
                    <RotateCcw
                      onClick={() =>
                        hard_restoreHandler(customer._id, "no", "no")
                      }
                      size={20}
                    />
                  )}
                </span>
              </Tooltip>

              <Tooltip
                content={
                  customer.is_active === "yes"
                    ? "Delete customer"
                    : "Erase customer"
                }
              >
                <span className="text-sm text-red-600 cursor-pointer active:opacity-50">
                  {
                    customer && customer.is_delete === "no" ? (
                      delete_loading ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : customer.is_active === "yes" ? (
                        <Trash2
                          className="text-red-600"
                          onClick={() =>
                            deleteHandler(customer._id, "no", "no")
                          }
                          size={20}
                        />
                      ) : (
                        <Eraser
                          onClick={() =>
                            hard_deleteHandler(customer._id, "no", "yes")
                          }
                          size={20}
                        />
                      )
                    ) : null /* Handle if customer.is_delete is "no" */
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
      <List_table<customer_list>
        data={customer.customer}
        loading={isLoading}
        columns={columns}
        resultPerpage={customer.resultPerpage}
        setRowsPerPage={setRowsPerPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data_length={customer.data_counter}
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

export default Customer_list;
