"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PortfolioList from "./portfolio-list";
import CacheRemover from "@/components/common/CacheRemover";
import { cache_keys } from "@/lib/service/custom_keys";

const Portfolio = () => {
  const router = useRouter();

  return (
    <div>
      <div className="w-[150px] my-4 flex gap-4">
        <Button
          className="bg-black text-white hover:text-black"
          onClick={() => router.push("/karnalwebtech/portfolio/add-new")}
        >
          Add new portfolio
        </Button>
        <CacheRemover pattern={[cache_keys.projects]} />
      </div>
      <PortfolioList />
    </div>
  );
};

export default Portfolio;
