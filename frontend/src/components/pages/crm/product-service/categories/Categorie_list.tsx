import List_table from "@/components/common/table/List_table";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { Chip, ChipProps, CircularProgress, Tooltip } from "@nextui-org/react";
import { Trash2, Edit, RotateCcw, Eraser } from "lucide-react";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import Server_image_card from "@/components/image_compress/Server_image_card";
import {
  useActionMutation,
  useGetAllcategorieQuery,
} from "@/state/categoriesApi";
import { categorie_list, Get_CategorieResponse } from "@/types/categorie_type";

interface Customer_list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}
const INITIAL_VISIBLE_COLUMNS = [
  "_no",
  "name",
  "description",
  "image",
  "Status",
  "updatedAt",
  "audit_log",
  "actions",
];

const columns: any[] = [
  { name: "_id", uid: "_no" },
  { name: "Name", uid: "name" },
  { name: "Description", uid: "description" },
  { name: "Image", uid: "image" },
  { name: "Status", uid: "status" },
  { name: "Last Update", uid: "updatedAt" },
  { name: "Employ", uid: "audit_log" },
  { name: "Actions", uid: "actions" }, // Added actions column
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
};

const Categorie_list: React.FC<Customer_list_props> = ({
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
  const { data, error, isLoading } = useGetAllcategorieQuery({
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
      toast.success("Vendor successfuly updated"); // Show the error toast
    }
  }, [delete_error, delete_success, toast, error]);
  // Fetch vendors only when debouncedFilterValue has a valid value

  const response: Get_CategorieResponse | undefined = data as
    | Get_CategorieResponse
    | undefined;
  const categorie: Get_CategorieResponse = useMemo(() => {
    const categorie: categorie_list[] = response?.categorie || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { categorie, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (categorie: categorie_list, columnKey: React.Key) => {
      const cellValue = categorie[columnKey as keyof categorie_list];

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
          return<p> {categorie?._no}</p>;
        case "name":
          return <p> {categorie?.name}</p>;
        case "image":
          return (
            <div className='w-[50%] sm:w-"50%" md:w-[40%] lg:w-[40%]'>
              <Server_image_card
                src={categorie.images_id[0].path}
                alt={categorie.images_id[0].originalname}
                width={50}
                height={50}
              />
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[categorie.status.toLocaleLowerCase()]}
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
                  categorie.is_active === "yes"
                    ? "Edit categorie"
                    : "Recover categorie"
                }
              >
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  {categorie && categorie.is_delete === "no" ? (
                    categorie.is_active === "yes" ? (
                      <Edit
                        size={20}
                        onClick={() => edit_handler(categorie._id)}
                      />
                    ) : categorie.is_active === "no" ? (
                      <RotateCcw
                        onClick={() =>
                          restoreHandler(categorie._id, "yes", "no")
                        }
                        size={20}
                      />
                    ) : null /* Handle if no other case applies */
                  ) : (
                    <RotateCcw
                      onClick={() =>
                        hard_restoreHandler(categorie._id, "no", "no")
                      }
                      size={20}
                    />
                  )}
                </span>
              </Tooltip>

              <Tooltip
                content={
                  categorie.is_active === "yes"
                    ? "Delete categorie"
                    : "Erase categorie"
                }
              >
                <span className="text-sm text-red-600 cursor-pointer active:opacity-50">
                  {
                    categorie && categorie.is_delete === "no" ? (
                      delete_loading ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : categorie.is_active === "yes" ? (
                        <Trash2
                          className="text-red-600"
                          onClick={() =>
                            deleteHandler(categorie._id, "no", "no")
                          }
                          size={20}
                        />
                      ) : (
                        <Eraser
                          onClick={() =>
                            hard_deleteHandler(categorie._id, "no", "yes")
                          }
                          size={20}
                        />
                      )
                    ) : null /* Handle if categorie.is_delete is "no" */
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
      <List_table<categorie_list>
        data={categorie.categorie}
        loading={isLoading}
        columns={columns}
        resultPerpage={categorie.resultPerpage}
        setRowsPerPage={setRowsPerPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data_length={categorie.data_counter}
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

export default Categorie_list;
