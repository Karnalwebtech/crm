"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CategorieList from "./categorie-list";
const Categorie = () => {
    const router = useRouter()
    return (
        <div>
            <div className='w-[150px] my-4'>
                <Button className='bg-black text-white hover:text-black' onClick={(()=>router.push('/karnalwebtech/post/add-new-categorie'))}>Add new post</Button>
            </div>
            <CategorieList  />
        </div>
    );
};

export default Categorie;
