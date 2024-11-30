"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PostFromCard from "@/components/post/post-form-card";
import LoadingPage from "@/components/common/loading-page";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import {
  useGetSingleQuery,
  useUpdateMutation,
} from "@/state/karnal-web-tech/categorieApi";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";

interface UpdatePostCategorieProps {
  id: string;
}
export default function UpdatePostCategorie({ id }: UpdatePostCategorieProps) {

  // API Hooks
  const { data, error, isLoading } = useGetSingleQuery(id);
  const { data: apiData } = data || {};
  const [update, { error: updateError, isSuccess, isLoading: isUpdating }] = useUpdateMutation();

  // Local States
  const [keywords, setKeywords] = useState<string[]>([]);
  const { imageitemData, files, fileData, setFileData, handleDrop } = useImageDrop();
  useHandleNotifications({ error: error || updateError, isSuccess, successMessage: "Category updated successfully!", redirectPath: "/karnalwebtech/post/categorie" })

  // Form Handling
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { status: "" },
  });

  // Image URL
  const imageURL = apiData?.feature_image?._id;

  // Handle Form Submission
  const onSubmit: SubmitHandler<any> = async (formData) => {
    const images = files.length > 0 ? files : imageURL;
    const updatedData = { ...formData, id, keywords, images };
    await update(updatedData);
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
    }
  }, [apiData, setValue, setKeywords, setFileData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark-custom relative">
      {isLoading ? (
        <div className="pt-28">
          <LoadingPage />
        </div>
      ) : (
        <PostFromCard
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
          imageitemData={imageitemData}
          handleDrop={handleDrop}
          setKeywords={setKeywords}
          keywords={keywords}
          selectedCategories={[]}
          setSelectedCategories={() => {}}
          isVisiableCategory={false}
          pageTitle="Categorie"
          discard_link="/karnalwebtech/post/categorie"
          image_files={fileData}
          isLoading={isUpdating}
        />
      )}
    </form>
  );
}
