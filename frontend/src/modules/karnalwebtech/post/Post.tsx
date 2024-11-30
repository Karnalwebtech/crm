"use client";
import React, { useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import PostList from "./post-list";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Post = () => {
  const router = useRouter();

  return (
    <div>
      <div className="w-[150px] my-4">
        <Button
          className="bg-black text-white hover:text-black"
          onClick={() => router.push("/karnalwebtech/post/add-new")}
        >
          Add new post
        </Button>
      </div>

      <PostList />
    </div>
  );
};

export default Post;
