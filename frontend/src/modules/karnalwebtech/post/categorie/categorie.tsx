"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CategorieList from "./categorie-list";
import CacheRemover from "@/components/common/CacheRemover";
import { cache_keys } from "@/lib/service/custom_keys";
const Categorie = () => {
    const router = useRouter()
    return (
        <div>
            <div className='w-[150px] my-4 flex gap-4'>
                <Button className='bg-black text-white hover:text-black' onClick={(()=>router.push('/karnalwebtech/post/add-new-categorie'))}>Add new post</Button>
                <CacheRemover pattern={[cache_keys.categorie]} />
            </div>
            <CategorieList  />
        </div>
    );
};

export default Categorie;
