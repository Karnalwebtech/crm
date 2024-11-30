'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ShadcnTableHeader from './table-header'
import ShadcnTableFooter from "./table-footer";
import LoadingPage from "../loading-page";

interface Shadcn_table_props {
    table_header: string[];
    tabelBody: any;
    tabel_body: any;
    searchTerm: string;
    drop_down_selector: any[];
    setSearchTerm: (value: string) => void;
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
    statusFilter: any;
    setStatusFilter: any;
    rowsPerPage: string;
    setRowsPerPage: (value: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    data_length: number;
    isLoading: boolean;
}
const status: string[] = ['Published', 'Draft', 'Review'];
export default function Shadcn_table({
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    table_header,
    tabelBody,
    drop_down_selector,
    tabel_body, searchTerm,
    setSearchTerm, isLoading,
    rowsPerPage, setRowsPerPage, currentPage, setCurrentPage, data_length
}: Shadcn_table_props) {


    return (
        <div className="space-y-4">
            <ShadcnTableHeader searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                drop_down_selector={drop_down_selector}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />

            <Table className={isLoading ? "min-h-[400px]" : ""}>
                <TableHeader>
                    <TableRow>
                        {table_header.map((header) => (
                            <TableHead key={header} className="cursor-pointer"
                            // onClick={() => handleSort(header.toLowerCase() as SortConfig['key'])}
                            >
                                {header}
                                {/* <div className="flex items-center">
                                    {sortConfig.key === header.toLowerCase() ? (
                                    {header}
                                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                                    ) : (
                                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                                    )}
                                </div> */}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="relative">
                    {isLoading ? <div className="pt-[100px]"><LoadingPage /></div> :
                        tabel_body()}
                </TableBody>
            </Table>
            {data_length > Number(rowsPerPage) &&
                <ShadcnTableFooter
                    currentPage={currentPage}
                    totalPages={Number(rowsPerPage)}
                    setCurrentPage={setCurrentPage}
                    data_length={data_length}
                />
            }
        </div>
    )
}