import List_table from "@/components/common/table/List_table";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { CircularProgress, Tooltip } from "@nextui-org/react";
import { Trash2, Edit, RotateCcw, Eraser } from "lucide-react";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { useActionMutation, useGetAllQuery } from "@/state/expenseApi";
import { columns, Expences_List_Props, Get_Response, INITIAL_VISIBLE_COLUMNS } from "@/types/expense_type";
import { formatCurrency } from "@/lib/service/currencyUtils";

interface Customer_list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}

const Expenses_list: React.FC<Customer_list_props> = ({
  set_open,
  edit_handler,
}) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [page_status, set_page_status] = useState<string>("yes");
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
      toast.success("Expence successfuly updated"); // Show the error toast
    }
  }, [delete_error, delete_success, toast, error]);
  // Fetch vendors only when debouncedFilterValue has a valid value

  const response: Get_Response | undefined = data as
    | Get_Response
    | undefined;
    
  const result: Get_Response = useMemo(() => {
    const result: Expences_List_Props[] = response?.result || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { result, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (result: Expences_List_Props, columnKey: React.Key) => {
      const cellValue = result[columnKey as keyof Expences_List_Props];

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
        case "_no":
          return <p> {result?._no}</p>;
          case "name":
            return <p> {result.name}</p>;
        case "image":
          return (
            <div className='w-[50%] sm:w-"50%" md:w-[40%] lg:w-[40%]'>
              <Server_image_card
                src={result.images_id[0].path}
                alt={result.images_id[0].originalname}
                width={50}
                height={50}
              />
            </div>
          );
        case "amount":
          return (
            <>
              {formatCurrency(cellValue)}
            </>
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
                  result.is_active === "yes"
                    ? "Edit Expenses"
                    : "Recover Expenses"
                }
              >
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  {result && result.is_delete === "no" ? (
                    result.is_active === "yes" ? (
                      <Edit
                        size={20}
                        onClick={() => edit_handler(result._id)}
                      />
                    ) : result.is_active === "no" ? (
                      <RotateCcw
                        onClick={() =>
                          restoreHandler(result._id, "yes", "no")
                        }
                        size={20}
                      />
                    ) : null /* Handle if no other case applies */
                  ) : (
                    <RotateCcw
                      onClick={() =>
                        hard_restoreHandler(result._id, "no", "no")
                      }
                      size={20}
                    />
                  )}
                </span>
              </Tooltip>

              <Tooltip
                content={
                  result.is_active === "yes"
                    ? "Delete epense"
                    : "Erase expense"
                }
              >
                <span className="text-sm text-red-600 cursor-pointer active:opacity-50">
                  {
                    result && result.is_delete === "no" ? (
                      delete_loading ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : result.is_active === "yes" ? (
                        <Trash2
                          className="text-red-600"
                          onClick={() =>
                            deleteHandler(result._id, "no", "no")
                          }
                          size={20}
                        />
                      ) : (
                        <Eraser
                          onClick={() =>
                            hard_deleteHandler(result._id, "no", "yes")
                          }
                          size={20}
                        />
                      )
                    ) : null /* Handle if result.is_delete is "no" */
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
      <List_table<Expences_List_Props>
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
        form_open={set_open}
        set_page_status={set_page_status}
        visiable_columns={INITIAL_VISIBLE_COLUMNS}
        renderCell={renderCell}
      />
    </div>
  );
};

export default Expenses_list;
