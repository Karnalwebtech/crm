"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Link2Icon, FileTextIcon } from "lucide-react";
import { PostForm } from "@/components/post/index-form";
import CategorySelector from "@/components/post/post-categorie";
import { ScrollArea } from "@/components/ui/scroll-area";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import Seo_form from "@/components/common/seo/seo";
import { useState } from "react";
import SelectFields from "../common/fields-shadcn/select-field";
import { useRouter } from "next/navigation";
import Server_image_card from "../image_compress/Server_image_card";
import TagSelector from "./post-tag";

interface PostFromCardProps {
  imageitemData?: { img: string; name: string }[]; // Corrected to match the useState structure
  handleDrop?: any;
  errors?: any; // react form
  control?: any; // react form
  setValue?: any; // react form
  watch?: any; // react form
  setKeywords?: any;
  keywords?: any;
  selectedCategories?: any;
  setSelectedCategories?: any;
  selectedTag?: any;
  setSelectedTags?: any;
  isVisiableCategory?: boolean;
  isVisiableTag?: boolean;
  pageTitle: string;
  isLoading?: boolean;
  discard_link?: string;
  image_files?: any;
  categorieList?: any;
  tagList?: any;
}
export default function PostFromCard({
  imageitemData,
  handleDrop,
  setValue,
  control,
  errors,
  watch,
  keywords,
  setKeywords,
  selectedCategories,
  setSelectedCategories,
  isVisiableCategory = false,
  isVisiableTag = false,
  pageTitle,
  isLoading = false,
  discard_link, image_files, categorieList, selectedTag,
  setSelectedTags,
  tagList,
}: PostFromCardProps) {
  const [postType, setPostType] = useState<string>(pageTitle);

  const handleDelete = (index: number) => {
    // const newImages = files.filter((_: any, i: number) => i !== index);
    // const imageData = newImages.map((file: any) => ({
    //     img: URL.createObjectURL(file),
    //     name: file.name,
    // }));
    // // setFiles(newImages);
    // setItemData(imageData);
  };
  const drop_down_selector = [
    {
      key: 'published',
      value: 'Published',
    },
    {
      key: 'draft',
      value: 'Draft'
    },
    {
      key: 'review',
      value: 'Review'
    }
  ]
  return (
    <div className="min-h-screen text-white p-4">
      <Card className="mx-auto bg-black border-zinc-800">
        <CardContent className="p-6">
          <div className="block lg:flex gap-4">
            {/* Left Panel: Post Creation */}
            <div className="w-full lg:w-[70%]">
              <h1 className="text-gray-200 text-2xl">Create a new {pageTitle}</h1>
              <Tabs
                value={postType}
                onValueChange={setPostType}
                className="mb-6"
              >
                <TabsList className="bg-gray-700 my-2">
                  {[
                    { value: pageTitle, label: pageTitle, icon: FileTextIcon },
                    { value: "image", label: "Image", icon: ImageIcon },
                    { value: "seo", label: "SEO", icon: Link2Icon },
                  ].map(({ value, label, icon: Icon }) => (
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

                <TabsContent value={pageTitle}>
                  <PostForm
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />
                </TabsContent>

                <TabsContent value="image">
                  <Drag_input_field onDrop={handleDrop} color_class={"white"} />
                </TabsContent>

                <TabsContent value="seo">
                  <Seo_form
                    control={control}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    setKeywords={setKeywords}
                    keywords={keywords}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Panel: Sharing Options */}
            <div className="w-full lg:w-[30%]">
              <div className="mb-4">
                <h3 className="text-gray-200 text-lg">

                  Add Post Status
                </h3>
                <SelectFields
                  control={control}
                  errors={errors}
                  name={"status"}
                  placeholder="Select status"  // Default placeholder
                  drop_down_selector={drop_down_selector}
                  class_style={"text-gray-200"}
                />
              </div>
              {isVisiableCategory && (
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <CategorySelector
                    class_cat={"text-gray-200"}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                    categorieList={categorieList}
                  />
                </ScrollArea>
              )}
              {isVisiableTag && (
                <ScrollArea className="h-[200px] w-full my-2  rounded-md border p-4">
                  <TagSelector
                    class_cat={"text-gray-200"}
                    selectedTag={selectedTag}
                    setSelectedTags={setSelectedTags}
                    tagList={tagList}
                  />
                </ScrollArea>
              )}
              {imageitemData ? (
                <div className="text-gray-200 my-2 bg-black w-full rounded-md border p-4">
                  <h3 className="text-xl">Feature Image</h3>
                  <div className="flex w-full flex-wrap my-2 gap-2">
                    {imageitemData.length > 0 ? imageitemData.map((item, index) => (
                      <div key={index} className="w-[100%]">
                        <Image_card
                          item={item}
                          index={index}
                          onDelete={handleDelete}
                        />
                      </div>
                    )) :

                      <div className="w-[100%]">
                        <Server_image_card
                          src={image_files?.path}
                          alt={image_files?.originalname}
                          width={200}
                          height={200}
                        />
                      </div>
                    }
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <FooterActions isLoading={isLoading} discard_link={discard_link} />
        </CardContent>
      </Card>
    </div>
  );
}

interface FooterActionsProps {
  isLoading: boolean;
  discard_link: any;
}
function FooterActions({ isLoading, discard_link }: FooterActionsProps) {
  const router = useRouter()
  return (
    <div className="flex justify-between mt-6 pt-6 border-t border-zinc-800">
      <p onClick={() => router.push(discard_link)} className="rounded text-black bg-gray-300 cursor-pointer px-[15px] m-0 py-[3px] pt-[7px]">
        Discard
      </p>
      <div className="space-x-2 flex">

        <Button
          type="submit"
          className="bg-orange-600 w-[100px] relative hover:bg-orange-700 relative"
          disabled={isLoading}  // Disable the button if loading
        >
          {isLoading ? (
            <span className="absolute  flex justify-center items-center">
              <div className="spinner-border animate-spin border-4 border-t-4 border-white w-5 h-5 rounded-full"></div> {/* This spinner can be replaced with your loading indicator */}
            </span>
          ) : (
            'Post'
          )}
        </Button>
      </div>
    </div>
  );
}
