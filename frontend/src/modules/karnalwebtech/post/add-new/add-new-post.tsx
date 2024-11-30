"use client";
import { useState } from "react";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import { useGetAllcategorieQuery } from "@/state/karnal-web-tech/categorieApi";
import { useGetAllTagQuery } from "@/state/karnal-web-tech/tagApi";
import { useAddNewPostMutation } from "@/state/karnal-web-tech/postApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import toast from "react-hot-toast";

export default function AddNewPost() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTag, setSelectedTags] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  //----------------- use hookes
  const { imageitemData, files, handleDrop } = useImageDrop();
  const { data: categorie_data, error: categorie_error } =
    useGetAllcategorieQuery({
      rowsPerPage: 1000,
      page: 1,
      type: "post",
    });
  const { data: tag_data, error: tag_Error } = useGetAllTagQuery({
    rowsPerPage: 1000,
    page: 1,
    type: "post",
  });
  const [addNewPost, { error: add_error, isLoading, isSuccess }] =
    useAddNewPostMutation();
  const { data: categorieApiData } = categorie_data || {};
  const { data: tagApiData } = tag_data || {};
  useHandleNotifications({
    error: categorie_error || tag_Error || add_error,
    isSuccess,
    successMessage: "Post Added successfully!",
    redirectPath: "/karnalwebtech/post",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    resolver: zodResolver(postSchema),
  });
  // 2. Define the submit handler
  const onSubmit: SubmitHandler<any> = async (data) => {
    if (files.length < 1) {
      toast.error("Please add a image");
      return;
    }
    const updated_data = {
      ...data,
      keywords,
      uuid: generate32BitUUID(),
      images: files,
      tags: selectedTag,
      categorie: selectedCategories,
    };
    await addNewPost(updated_data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="dark-custom">
        <PostFromCard
          control={control} // react form
          errors={errors} // react form
          setValue={setValue} // react form
          watch={watch} // react form
          imageitemData={imageitemData}
          handleDrop={handleDrop}
          setKeywords={setKeywords}
          keywords={keywords}
          isVisiableCategory={true}
          isVisiableTag={true}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          pageTitle={"Post"}
          discard_link={"/karnalwebtech/post"}
          categorieList={categorieApiData?.result}
          selectedTag={selectedTag}
          setSelectedTags={setSelectedTags}
          tagList={tagApiData?.result}
          isLoading={isLoading}
        />
      </form>
    </>
  );
}
