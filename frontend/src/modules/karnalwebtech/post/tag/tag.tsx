"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TagList from "./tag-list";
import CacheRemover from "@/components/common/CacheRemover";
import { cache_keys } from "@/lib/service/custom_keys";

const Tag = () => {
    const router = useRouter()
    return (
        <div>
            <div className='w-[150px] my-4 flex gap-4'>
                <Button className='bg-black text-white hover:text-black' onClick={(() => router.push('/karnalwebtech/post/add-new-tag'))}>Add new tag</Button>
                <CacheRemover pattern={[cache_keys.tags]} />
            </div>
            <TagList />
        </div>
    );
};

export default Tag;
