"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PortfolioList from "./portfolio-list";

const Portfolio = () => {
  const router = useRouter();

  return (
    <div>
      <div className="w-[150px] my-4">
        <Button
          className="bg-black text-white hover:text-black"
          onClick={() => router.push("/karnalwebtech/portfolio/add-new")}
        >
          Add new portfolio
        </Button>
      </div>
      <PortfolioList />
    </div>
  );
};

export default Portfolio;
