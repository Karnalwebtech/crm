"use client";

import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { X, CheckCircle, XCircle } from "lucide-react";
import InputField from "../fields-shadcn/input-field";
import TextareaField from "../fields-shadcn/textarea-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SeoFormProps {
  control: any;
  errors: any;
  watch: any;
  setValue: any;
  keywords: any;
  setKeywords: any;
  disabled_path?:any;
}

const Seo_form = ({disabled_path, control, errors, watch, setValue, keywords, setKeywords }: SeoFormProps) => {
  const title = watch("metaTitle", "");
  const description = watch("metaDescription", "");
  const [keywordInput, setKeywordInput] = useState("");

  const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const addKeywords = useCallback((newKeywords: string[]) => {
    setKeywords((prev:any) => {
      const uniqueNewKeywords = newKeywords.filter(
        (keyword) => keyword.trim() !== "" && !prev?.includes(keyword.trim())
      );
      return [...prev, ...uniqueNewKeywords];
    });
  }, []);

  const handleKeywordInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeywords = keywordInput.split(",").map((k) => k.trim());
      addKeywords(newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev:any) => prev.filter((k:any) => k !== keyword));
  };

  // Character Count Color Logic
  const getCharacterCountColor = (current: number, max: number) => {
    if (current === 0) return "text-gray-500";
    return current <= max ? "text-green-500" : "text-red-500";
  };

  return (
    <Card className="w-full bg-transparent">
      <CardHeader>
        <CardTitle className="text-gray-200">SEO Fields</CardTitle>
        <CardDescription className="text-gray-200">
          Enter your page's SEO information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Meta Title */}
        <div className="space-y-2">
          <Label htmlFor="metaTitle" className="text-gray-200 text-lg">
            Meta Title
          </Label>
          <InputField
            control={control}
            errors={errors}
            name="metaTitle"
            label="Enter page title"
            type="text"
            inputStyle="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
          />
          <div className="flex justify-between text-sm">
            <span className="text-gray-200">Recommended: 50-60 characters</span>
            <span className={getCharacterCountColor(title.length, 60)}>
              {title.length}/60
            </span>
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription" className="text-gray-200 text-lg">
            Meta Description
          </Label>
          <TextareaField
            control={control}
            errors={errors}
            name="metaDescription"
            label="Enter meta description"
            inputStyle="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
          />
          <div className="flex justify-between text-sm">
            <span className="text-gray-200">
              Recommended: 150-160 characters
            </span>
            <span
              className={getCharacterCountColor(description.length, 160)}
            >
              {description.length}/160
            </span>
          </div>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-gray-200 text-lg">
            Keywords
          </Label>

          <Input
            placeholder="Enter keywords (comma-separated or press Enter)"
            value={keywordInput}
            className="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
            onChange={handleKeywordInputChange}
            onKeyDown={handleKeywordInputKeyDown}
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {keywords?.map((keyword:any, index:number) => (
              <span
                key={index}
                className="bg-gray-300 text-black px-2 py-1 rounded-full text-sm flex items-center"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 focus:outline-none"
                  aria-label={`Remove ${keyword}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Canonical URL */}
        <div className="space-y-2">
          <Label htmlFor="canonicalUrl" className="text-gray-300 text-lg">
            Canonical URL
          </Label>
          <p className="text-gray-300 text-sm">Remove symbols like /, @, #, !, $, %, ^, &, *, (, ), +, =, [, ], |, :, ;, ', &quot;, &lt;, &gt;, ,, ?, and ~.</p>
          <div className="relative">

            <InputField
              control={control}
              errors={errors}
              disabled_path={disabled_path==="canonical-url"?true:false} 
              name="metaCanonicalUrl"
              label="Enter meta Canonical Url"
              type="text"
              inputStyle="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
            />
          </div>

        </div>

      </CardContent>
    </Card >
  );
};

export default Seo_form;
