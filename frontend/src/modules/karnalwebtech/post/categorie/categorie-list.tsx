import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteCateorieMutation,
  useGetAllcategorieQuery,
} from "@/state/karnal-web-tech/categorieApi";
import { TableCell, TableRow } from "@/components/ui/table";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import Shadcn_table from "@/components/common/shadcn-table/table";
import { useTableFilters } from "@/hooks/useTableFilters";
import { Button } from "@/components/ui/button";
import { Trash2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";

interface Customer_list_props {}

const CategorieList: React.FC<Customer_list_props> = () => {
  const [rowsPerPage, setRowsPerPage] = useState<string>("25");
  const [page, setPage] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const router = useRouter();

  //---------- all hookes
  const { data, error, isLoading } = useGetAllcategorieQuery({
    rowsPerPage: Number(rowsPerPage),
    page: page,
    type: "post",
  });
  const [
    deleteCateorie,
    { error: deleteError, isLoading: deleteLoading, isSuccess },
  ] = useDeleteCateorieMutation();
  useHandleNotifications({
    error: error || deleteError,
    isSuccess,
    successMessage: "Category deleted successfully!",
  });
  const { data: api_data } = data || {};
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredItems,
  } = useTableFilters(api_data?.result, ["title"]);

  const table_header: string[] = [
    "Title",
    "	Author",
    "Date",
    "Status",
    "Action",
  ];
  const categorie_dropdown: any[] = [];
  const removeRow = async (remove_id: string) => {
    await deleteCateorie(remove_id);
  };
  function tabel_body() {
    return filteredItems?.map((post: any) => (
      <TableRow key={post._id}>
        <TableCell className="font-medium">{post.title}</TableCell>
        <TableCell>{post.audit_log?.name}</TableCell>
        <TableCell>{<TimeAgo time={post.updatedAt} />}</TableCell>
        <TableCell>{post.status}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(post.cat_id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/karnalwebtech/post/categorie/${post.cat_id}`)
                }
              >
                Edit Categorie
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex items-center"
                onClick={() => removeRow(post.cat_id)}
              >
                <Trash2 color="red" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <Shadcn_table
      table_header={table_header}
      tabelBody={api_data?.result}
      tabel_body={tabel_body}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      drop_down_selector={categorie_dropdown}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      currentPage={page}
      setCurrentPage={setPage}
      data_length={api_data?.dataCounter}
      isLoading={isLoading || deleteLoading}
    />
  );
};

export default CategorieList;
