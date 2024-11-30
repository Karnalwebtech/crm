"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  title: string;
  link: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, link }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-md dark:bg-dark50">
      <div>
        <h2 className="text-2xl font-bold dark:text-dark_color">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <p className="text-base dark:text-dark_color">Setting</p>
        </div>
        <div>
          <Button
            onClick={() => router.push(link)}
            className="bg-black text-white dark:text-dark_color "
          >
            Create Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
