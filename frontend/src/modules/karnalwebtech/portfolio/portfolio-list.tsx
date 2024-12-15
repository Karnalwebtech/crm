import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import Shadcn_table from "@/components/common/shadcn-table/table";
import { useTableFilters } from "@/hooks/useTableFilters";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Copy, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import {
  useDeletePortfolioMutation,
  useGetAllPortfolioQuery,
} from "@/state/karnal-web-tech/portfolioApi";
import { cache_keys } from "@/lib/service/custom_keys";
import { useRemoveCacheMutation } from "@/state/api";
import CacheRemover from "@/components/common/CacheRemover";

interface list_props { }

const PortfolioList: React.FC<list_props> = () => {
  const [rowsPerPage, setRowsPerPage] = useState<string>("25");
  const [page, setPage] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const router = useRouter();

  //---------- all hookes
  const [update] = useRemoveCacheMutation()
  const { data, error, isLoading } = useGetAllPortfolioQuery({
    rowsPerPage: Number(rowsPerPage),
    page: page,
  });
  const [
    deleteTag,
    { error: deleteError, isLoading: deleteLoading, isSuccess },
  ] = useDeletePortfolioMutation();
  useHandleNotifications({
    error: error || deleteError,
    isSuccess,
    successMessage: "Portfolio deleted successfully!",
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
    "Author",
    "Date",
    "Status",
    "Action",
  ];
  const categorie_dropdown: any[] = [];
  const removeRow = async (remove_id: string) => {
    const pattern: string[] = [remove_id, cache_keys.projects]
    for (const item of pattern) {
      const updatedData = { pattern: item };
      await update(updatedData).unwrap(); // Ensure the mutation completes before continuing
    }
    await deleteTag(remove_id);
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
                onClick={() => navigator.clipboard.writeText(post.ptfo_id)}
              >
                <Copy />  Copy ID
              </DropdownMenuItem>
              <CacheRemover pattern={[`${post.ptfo_id}`]} buttonStyle="bg-transparent text-black hover:bg-transparent p-0 border-hidden" />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/karnalwebtech/portfolio/${post.ptfo_id}`)
                }
              >
                <Pencil />   Edit portfolio
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex items-center"
                onClick={() => removeRow(post.ptfo_id)}
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

export default PortfolioList;
