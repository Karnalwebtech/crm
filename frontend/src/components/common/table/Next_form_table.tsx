import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Next_form_table_props } from "@/types/Table_type";

export default function Next_form_table<T>({
  columns,
  rows, topContent,
  footercontent,
  renderCell, // Accept renderCell as a prop
}: Next_form_table_props<T>) {


  return (
    <Table
      topContent={topContent}
      aria-label="Table with client-side pagination"
      bottomContent={footercontent}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={(item as any).key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
