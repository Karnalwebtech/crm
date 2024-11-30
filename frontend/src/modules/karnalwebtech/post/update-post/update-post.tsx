"use client";
import { useEffect, useState } from "react";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import { useGetAllcategorieQuery } from "@/state/karnal-web-tech/categorieApi";
import { useGetAllTagQuery } from "@/state/karnal-web-tech/tagApi";
import {
  useAddNewPostMutation,
  useGetSingleQuery,
  useUpdateMutation,
} from "@/state/karnal-web-tech/postApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import LoadingPage from "@/components/common/loading-page";
interface UpdatePostProps {
  id: string;
}
export default function UpdatePost({ id }: UpdatePostProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTag, setSelectedTags] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  //----------------- use hookes
  // API Hooks
  const { imageitemData, files, fileData, setFileData, handleDrop } =
    useImageDrop();
  const { data, error, isLoading } = useGetSingleQuery(id);
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
  const [update, { error: updateError, isSuccess, isLoading: isUpdating }] =
    useUpdateMutation();

  const { data: apiData } = data || {};
  const { data: categorieApiData } = categorie_data || {};
  const { data: tagApiData } = tag_data || {};

  useHandleNotifications({
    error: categorie_error || tag_Error || updateError || error,
    isSuccess,
    successMessage: "Post updated successfully!",
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
  // 2. Define the submit handler\
  const imageURL = apiData?.feature_image?._id;
  const onSubmit: SubmitHandler<any> = async (data) => {
    const images = files.length > 0 ? files : imageURL;
    const updated_data = {
      ...data,
      keywords,
      id,
      images: images,
      tags: selectedTag,
      categorie: selectedCategories,
    };
    await update(updated_data);
  };

  // Populate Form Data
  useEffect(() => {
    if (apiData) {
      setValue("title", apiData.title);
      setValue("status", apiData.status);
      setValue("content", apiData.content);
      setValue("description", apiData.description);
      setValue("metaTitle", apiData.seo?.title);
      setValue("metaDescription", apiData.seo?.meta_description);
      setValue("metaCanonicalUrl", apiData.seo?.canonical_url);
      setKeywords(apiData.seo?.keywords || []);
      setFileData(apiData.feature_image);
      setSelectedCategories(apiData?.categorie?.map((item: any) => item._id));
      setSelectedTags(apiData?.tag?.map((item: any) => item._id));
      // setSelectedTags(apiData?.)
    }
  }, [apiData, setValue, setKeywords, setFileData, setSelectedTags]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark-custom relative">
      {isLoading ? (
        <div className="pt-28">
          <LoadingPage />
        </div>
      ) : (
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
          image_files={fileData}
          setSelectedTags={setSelectedTags}
          tagList={tagApiData?.result}
          isLoading={isUpdating}
        />
      )}
    </form>
  );
}
