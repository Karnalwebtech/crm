"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface tag_props {
  class_cat: string;
  selectedTag: any;
  setSelectedTags: any;
  tagList: any;

}
export default function TagSelector({ tagList, class_cat, setSelectedTags, selectedTag }: tag_props) {


  const handleTagChange = (tagId: string) => {
    setSelectedTags((prev: any) =>
      prev.includes(tagId)
        ? prev.filter((id: any) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${class_cat}`}>
          Select Tags
        </h2>
        {tagList?.length > 0 ? tagList?.map((tag: any) => (
          <div key={tag?._id} className="flex items-center space-x-2">
            <Checkbox
              id={tag._id}
              className="bg-gray-600 text-white border"
              checked={selectedTag.includes(tag?._id)}
              onCheckedChange={() => handleTagChange(tag?._id)}
            />
            <Label
              htmlFor={tag?._id}
              className={`${class_cat} text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
            >
              {tag?.title}
            </Label>
          </div>
        )) : <div className="h-[100px] flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-gray-300" /></div>}
      </div>
      {selectedTag.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Selected tag IDs:</h3>
          <p className={`${class_cat} text-sm`}>
            {selectedTag.join(", ")}
          </p>
        </div>
      )}
    </form>
  );
}
