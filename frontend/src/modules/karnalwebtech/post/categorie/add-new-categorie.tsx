"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import { useAddNewCategorieMutation } from "@/state/karnal-web-tech/categorieApi";
import { generate32BitUUID } from "../../../../lib/service/generate32BitUUID";
import { z } from "zod";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import toast from "react-hot-toast";

export default function AddNewPostCategorie() {
  const [keywords, setKeywords] = useState<string[]>([]);
  // -------------  use hookes
  const { imageitemData, files, handleDrop } = useImageDrop();
  const [addNewCategorie, { error, isLoading, isSuccess }] = useAddNewCategorieMutation();
  useHandleNotifications({ error: error, isSuccess, successMessage: "Category added successfully!", redirectPath: "/karnalwebtech/post/categorie" })
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
  });

  // Submit Handler
  const onSubmit: SubmitHandler<z.infer<typeof postSchema>> = async (formData) => {
    if (files.length < 1) {
      toast.error("Please add a image");
      return;
    }
    const updatedData = {
      ...formData,
      keywords,
      uuid: generate32BitUUID(),
      images: files,
      type: "post",
    };
    await addNewCategorie(updatedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dark-custom">
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
        setSelectedCategories={() => { }}
        pageTitle="Categorie"
        isLoading={isLoading}
        discard_link="/karnalwebtech/post/categorie"
      />
    </form>
  );
}
