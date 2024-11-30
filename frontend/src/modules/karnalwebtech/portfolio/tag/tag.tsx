"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TagList from "./tag-list";

const Tag = () => {
    const router = useRouter()
    return (
        <div>
            <div className='w-[150px] my-4'>
                <Button className='bg-black text-white hover:text-black' onClick={(() => router.push('/karnalwebtech/portfolio/add-new-tag'))}>Add new tag</Button>
            </div>
            <TagList />
        </div>
    );
};

export default Tag;
