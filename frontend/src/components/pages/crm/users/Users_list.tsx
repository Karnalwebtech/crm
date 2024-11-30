import List_table from "@/components/common/table/List_table";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, Switch, Tooltip } from "@nextui-org/react";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import { useActionMutation } from "@/state/expenseApi";
import { Expences_List_Props, Get_Response } from "@/types/expense_type";
import { useAllQuery, useStatus_actionMutation } from "@/state/usersApi";
import { columns, INITIAL_VISIBLE_COLUMNS } from "@/types/auth_type";

interface Customer_list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}

const Users_list: React.FC<Customer_list_props> = ({
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
  const { data, error, isLoading } = useAllQuery({
    is_active: page_status,
    is_delete: page_status && page_status === "final" ? "yes" : "no",
    keyword: debouncedFilterValue,
    status: statusFilter,
    rowsPerPage: rowsPerPage,
    page: page,
  });
  const [
    status_action,
    {
      error: status_update__error,
      isLoading: status_update_loading,
      isSuccess: status_update_success,
    },
  ] = useStatus_actionMutation();
  // Debounce the filter value to avoid excessive API calls
  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );

  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);

  useEffect(() => {
    if (status_update__error || error) {
      let errorMessage = "An unexpected error occurred."; // Default message

      // Check if 'error' is defined and has the expected structure
      if (status_update__error && "data" in status_update__error) {
        errorMessage =
          (status_update__error as { data?: { message?: string } }).data
            ?.message || errorMessage;
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
    if (status_update_success) {
      toast.success("Expence successfuly updated"); // Show the error toast
    }
  }, [status_update__error, status_update_success, toast, error]);
  // Fetch vendors only when debouncedFilterValue has a valid value

  const handleSwitchChange = useCallback(
    async (id: string) => {
      await status_action({ id }).unwrap();
    },
    [status_action]
  );

  const response: Get_Response | undefined = data as Get_Response | undefined;

  const result: Get_Response = useMemo(() => {
    const result: Expences_List_Props[] = response?.result || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { result, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (result: Expences_List_Props, columnKey: React.Key) => {
      const cellValue = result[columnKey as keyof Expences_List_Props];

      switch (columnKey) {
        case "_no":
          return <p> {result?._no}</p>;
        case "name":
          return <p> {result?.name}</p>;
        case "updatedAt":
          return <TimeAgo time={cellValue} />;

        case "isActive":
          return (
            <div className="relative flex justify-end gap-2">
              {status_update_loading ? (
                <CircularProgress />
              ) : (
                <Tooltip content={cellValue ? "User Inactive" : "User Active"}>
                  <Switch
                    checked={cellValue}
                    isSelected={cellValue}
                    onChange={() => handleSwitchChange(result._id)}
                    size="sm"
                  >
                    {cellValue ? "Active" : "Inactive"}
                  </Switch>
                </Tooltip>
              )}
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

export default Users_list;
