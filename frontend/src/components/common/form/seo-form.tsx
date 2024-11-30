"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Seo_form from "../seo/seo";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { ImageIcon, Link2Icon } from "lucide-react";
import Input_field from "../fields-shadcn/input-field";
import Textarea_field from "../fields-shadcn/textarea-field";

interface SEOFormProps {
  imageSrc: string;
  imageAlt: string;
  control?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
  setKeywords?: any;
  keywords?: any;
  isLoading?: boolean;
}

const TABS_DATA = [
  { value: "image", label: "Image", icon: ImageIcon },
  { value: "seo", label: "SEO", icon: Link2Icon },
];

export function SEOForm({
  control,
  errors,
  watch,
  setValue,
  setKeywords,
  keywords,
  isLoading = false,
}: SEOFormProps) {
  const [postType, setPostType] = useState<string>("image");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className="min-h-screen w-full text-white p-4">
      <Card className="mx-auto bg-black border-zinc-800">
        <CardContent className="p-6">
          <div className="block lg:flex gap-4">
            <div className="w-full">
              {/* Tabs for switching between Image and SEO */}
              <Tabs
                value={postType}
                onValueChange={setPostType}
                className="mb-6"
              >
                <TabsList className="bg-gray-700 my-2">
                  {TABS_DATA.map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="data-[state=active]:bg-white hover:bg-gray-400 hover:text-black m-[2px]"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Image Tab Content */}
                <TabsContent value="image">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="title"
                        label="Enter image title"
                        type="text"
                        inputStyle="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea_field
                        control={control}
                        errors={errors}
                        name="description"
                        label="Enter image description"
                        inputStyle="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="altText">Alt Text</Label>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="alt"
                        label="Enter image alt text"
                        type="text"
                        inputStyle="text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* SEO Tab Content */}
                <TabsContent value="seo">
                  <Seo_form
                    control={control}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    setKeywords={setKeywords}
                    keywords={keywords}
                    disabled_path="canonical-url"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-orange-600 w-[100px] hover:bg-orange-700 relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="spinner-border animate-spin border-4 border-t-4 border-white w-5 h-5 rounded-full"></div>
              </div>
            ) : (
              "Post"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
