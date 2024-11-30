"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface categorie_props {
  class_cat: string;
  selectedCategories: any;
  setSelectedCategories: any;
  categorieList: any;

}
export default function CategorySelector({ categorieList, class_cat, setSelectedCategories, selectedCategories }: categorie_props) {


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev: any) =>
      prev.includes(categoryId)
        ? prev.filter((id: any) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected category IDs:", selectedCategories);
    // Here you can perform any action with the selected category IDs
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${class_cat}`}>
          Select Categories
        </h2>
        {categorieList?.length > 0 ? categorieList?.map((category: any) => (
          <div key={category?._id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              className="bg-gray-600 text-white border"
              checked={selectedCategories.includes(category?._id)}
              onCheckedChange={() => handleCategoryChange(category?._id)}
            />
            <Label
              htmlFor={category?._id}
              className={`${class_cat} text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
            >
              {category?.title}
            </Label>
          </div>
        )) : <div className="h-[100px] flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-gray-300" /></div>}
      </div>
      {selectedCategories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Selected Category IDs:</h3>
          <p className={`${class_cat} text-sm`}>
            {selectedCategories.join(", ")}
          </p>
        </div>
      )}
    </form>
  );
}
