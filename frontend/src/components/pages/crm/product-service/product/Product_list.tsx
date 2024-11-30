import List_table from "@/components/common/table/List_table";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { Chip, ChipProps, CircularProgress, Tooltip } from "@nextui-org/react";
import { Trash2, Edit, RotateCcw, Eraser } from "lucide-react";
import toast from "react-hot-toast";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { useActionMutation, useGetAllproductsQuery } from "@/state/productApi";
import { Get_Response, product_type_list } from "@/types/Product_types";
import { formatCurrency } from "@/lib/service/currencyUtils";

interface list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}
const INITIAL_VISIBLE_COLUMNS = [
  "_no",
  "name",
  "selling_price",
  "tax",
  "total_quantity",
  "categorie",
  "status",
  "updatedAt",
  "audit_log",
  "actions",
];

const columns: any[] = [
  { name: "_id", uid: "_no" },
  { name: "Name", uid: "name" },
  { name: "Selling price", uid: "selling_price" },
  { name: "Purchase price", uid: "purchase_price" },
  { name: "Primary unit", uid: "primary_unit" },
  { name: "SKU", uid: "sku" },
  { name: "HSN/SAC", uid: "hsn" },
  { name: "Categorie", uid: "categorie" },
  { name: "Stock", uid: "total_quantity" },
  { name: "Barcode", uid: "barcode" },
  { name: "Weight", uid: "weight" },
  { name: "Depth", uid: "depth" },
  { name: "Width", uid: "width" },
  { name: "Height", uid: "height" },
  { name: "Tax", uid: "tax" },
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

const Product_list: React.FC<list_props> = ({ set_open, edit_handler }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [page_status, set_page_status] = useState<string>("yes");
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  //-------------use states for apis
  const { data, error, isLoading } = useGetAllproductsQuery({
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

  const response: Get_Response | undefined = data as Get_Response | undefined;
  const product: Get_Response = useMemo(() => {
    const product: product_type_list[] = response?.product || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { product, resultPerpage, data_counter };
  }, [response]);

  const renderCell = React.useCallback(
    (product: product_type_list, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof product_type_list];

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
          return <p> {product?._no}</p>;
          case "name":
            return <p> {cellValue}</p>;
        case "selling_price":
          return <p> {formatCurrency(cellValue)}</p>;
        case "purchase_price":
          return <p> {formatCurrency(cellValue)}</p>;
        case "tax":
          return <p> {cellValue}%</p>;
        case "categorie":
          return <p> {product?.categorie?product?.categorie?.name:<span className="text-orange-500">Not set</span>}</p>;
        case "total_quantity":
          return (
            <Chip
              className="capitalize"
              color={Number(cellValue) < 1 ? "danger" : "success"}
              size="sm"
              variant="flat"
            >
              {Number(cellValue)}
            </Chip>
          );
        case "image":
          return (
            <div className="w-[50px] sm:w-[50px] md:w-[40px] lg:w-[40px]">
              {product.images_id && product.images_id.length > 0 ? (
                <Server_image_card
                  src={product.images_id[0].path}
                  alt={product.images_id[0].originalname}
                  width={100}
                  height={50}
                />
              ) : (
                <p>No Image</p>
              )}
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[product.status.toLocaleLowerCase()]}
              size="sm"
              variant="flat"
            >
              {product.status ?? "Unknown"}
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
                  product.is_active === "yes"
                    ? "Edit product"
                    : "Recover product"
                }
              >
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  {product && product.is_delete === "no" ? (
                    product.is_active === "yes" ? (
                      <Edit
                        size={20}
                        onClick={() => edit_handler(product._id)}
                      />
                    ) : product.is_active === "no" ? (
                      <RotateCcw
                        onClick={() => restoreHandler(product._id, "yes", "no")}
                        size={20}
                      />
                    ) : null /* Handle if no other case applies */
                  ) : (
                    <RotateCcw
                      onClick={() =>
                        hard_restoreHandler(product._id, "no", "no")
                      }
                      size={20}
                    />
                  )}
                </span>
              </Tooltip>

              <Tooltip
                content={
                  product.is_active === "yes"
                    ? "Delete product"
                    : "Erase product"
                }
              >
                <span className="text-sm text-red-600 cursor-pointer active:opacity-50">
                  {
                    product && product.is_delete === "no" ? (
                      delete_loading ? (
                        <CircularProgress size="sm" aria-label="Loading..." />
                      ) : product.is_active === "yes" ? (
                        <Trash2
                          className="text-red-600"
                          onClick={() => deleteHandler(product._id, "no", "no")}
                          size={20}
                        />
                      ) : (
                        <Eraser
                          onClick={() =>
                            hard_deleteHandler(product._id, "no", "yes")
                          }
                          size={20}
                        />
                      )
                    ) : null /* Handle if product.is_delete is "no" */
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
      <List_table<product_type_list>
        data={product.product}
        loading={isLoading}
        columns={columns}
        resultPerpage={product.resultPerpage}
        setRowsPerPage={setRowsPerPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data_length={product.data_counter}
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

export default Product_list;
