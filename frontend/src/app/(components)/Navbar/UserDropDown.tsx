"use client"
import React, { useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import cookiesManager from '@/lib/service/cookies-axis/Cookies';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/state/usersApi';
import toast from 'react-hot-toast';

export const UserDropDown = () => {
    const { user } = useSelector((state: any) => state.user);
    const router = useRouter();
    const [logout, { isSuccess, isLoading, error }] = useLogoutMutation()
    const handleLogout = async () => {
        await logout(); // Make sure it's awaited properly
    };

    useEffect(() => {
        if (error) {
            let errorMessage = "An unexpected error occurred."; // Default message
            // Check if 'error' is defined and has the expected structure
            if (error && "data" in error) {
                errorMessage =
                    (error as { data?: { message?: string } }).data?.message ||
                    errorMessage;
            }
            toast.error(errorMessage);
        }
        if (isSuccess) {

            toast.success("Logout successfully");
            router.push('/auth/sign-in')
        }
    }, [isSuccess, router, error])

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                        }}
                        className="transition-transform text-white"
                        description={user.email}
                        name={user.name}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                        {isLoading ? "Logging out..." : "Log Out"}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
