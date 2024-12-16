'use client'

import React, { useState, useCallback } from "react";
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
import { Copy, MoreHorizontal, Eye, Phone, Calendar, Hash, User, Mail, MessageSquare } from 'lucide-react';
import { useGetAllContactsQuery } from "@/state/api";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import { Modal } from "@/components/modal/modal";

interface ListProps { }

const Contacts: React.FC<ListProps> = () => {
    const [rowsPerPage, setRowsPerPage] = useState<string>("25");
    const [contactDetails, setContactDetails] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [categoryFilter, setCategoryFilter] = useState<string>("All");

    const { data, error, isLoading } = useGetAllContactsQuery({
        rowsPerPage: Number(rowsPerPage),
        page,
    });
    useHandleNotifications({
        error: error,
    });

    const { data: apiData } = data || {};
    const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredItems } = useTableFilters(apiData?.result, ["name"]);

    const tableHeader: string[] = ["Name", "Mobile", "Email", "Date", "Action"];
    const categorieDropdown: any[] = [];

    const getSingle = useCallback((id: string) => {
        const filterData = filteredItems?.find(item => item.cont_id === id);
        setContactDetails(filterData);
        setIsDialogOpen(true);
    }, [filteredItems]);

    const dilogeCloseFun = () => {
        setIsDialogOpen(false);
    }
    console.log(isDialogOpen)

    const tableBody = useCallback(() => {
        return filteredItems?.map((post: any) => (
            <TableRow key={post._id}>
                <TableCell className="font-medium">{post.name}</TableCell>
                <TableCell>{post.mobile}</TableCell>
                <TableCell>{post.email}</TableCell>
                <TableCell><TimeAgo time={post.updatedAt} /></TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(post.cont_id)}
                            >
                                <Copy className="mr-2 h-4 w-4" /> Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => getSingle(post.cont_id)}
                            >
                                <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    }, [filteredItems, getSingle]);

    return (
        <>

            <Shadcn_table
                table_header={tableHeader}
                tabelBody={apiData?.result}
                tabel_body={tableBody}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                drop_down_selector={categorieDropdown}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={page}
                setCurrentPage={setPage}
                data_length={apiData?.dataCounter}
                isLoading={isLoading}
            />
            {isDialogOpen &&
                <Modal title="Contact details" isOpen={isDialogOpen} onClose={dilogeCloseFun} aria-describedby="modal-description">
                    <ContactsDetails item={contactDetails} />
                </Modal>
            }
        </>
    );
};

export default Contacts;

function ContactsDetails({ item }: { item: any }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className="relative h-64 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
            >
                <div
                    className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500" />
                    <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
                        <div>
                            <p className="text-sm font-semibold opacity-75">Contact #{item._no}</p>
                            <h2 className="mt-2 text-3xl font-bold truncate">{item.name}</h2>
                            <p className="mt-2 text-sm opacity-75 truncate">{item.email}</p>
                        </div>
                        <div className="flex items-center mt-4">
                            <Phone className="w-4 h-4 mr-2" />
                            <p className="text-sm">{item.mobile}</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`absolute inset-0 w-full h-full bg-white transition-all duration-500 ease-in-out ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="flex flex-col justify-between h-full p-6 overflow-y-scroll">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Details</p>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2 text-purple-600" />
                                    <p className="text-sm text-gray-700">{item.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-purple-600" />
                                    <p className="text-sm text-gray-700">{item.email}</p>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-purple-600" />
                                    <p className="text-sm text-gray-700">{item.mobile}</p>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                                    <p className="text-sm text-gray-700">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <Hash className="w-4 h-4 mr-2 text-purple-600" />
                                    <p className="text-sm text-gray-700 truncate">{item.cont_id}</p>
                                </div>
                                <div className="flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                                    <p className="text-sm text-gray-600 ">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

