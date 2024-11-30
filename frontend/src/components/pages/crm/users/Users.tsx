"use client";
import React, { useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import Users_list from "./Users_list";

const Users = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const edit_handler = (value: string) => {
    };
    return (
        <div>
            {isOpen && (
                <Popover_component
                    open={isOpen}
                    set_open={setIsOpen}
                    components={
                        <>
                            comming soon
                        </>
                    }
                />
            )}

            <Users_list set_open={setIsOpen} edit_handler={edit_handler} />
        </div>
    );
};

export default Users;
