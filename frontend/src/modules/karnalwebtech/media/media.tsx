"use client";

import LoadingPage from "@/components/common/loading-page";
import ShadcnTableFooter from "@/components/common/shadcn-table/table-footer";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import { useGetAllImagesQuery, useLazyGetSingleQuery, useUpdateMutation } from "@/state/karnal-web-tech/imageApi";
import { imageSchema } from "@/zod-schemas/karnal-web-tech/image_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ImageGallery() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<string>("25");
  const [page, setPage] = useState<number>(1);

  const [getSingle, { data: single_data, isLoading: single_loading, isError: single_error }] = useLazyGetSingleQuery();
  const [update, { isLoading: update_loading, isSuccess, isError: update_error }] = useUpdateMutation();

  const { data, error, isLoading } = useGetAllImagesQuery({
    rowsPerPage: Number(rowsPerPage),
    page: page,
  });

  useHandleNotifications({
    error: error || single_error || update_error,
    isSuccess,
    successMessage: "Image updated successfully",
  });

  const { data: api_data } = data || {};
  const { data: single_data_api_data } = single_data || {};

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<any>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      title: "",
      description: "",
      alt: "",
      metaTitle: "",
      metaDescription: "",
      metaCanonicalUrl: "",
    },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    const updated_data = {
      ...data,
      keywords,
      id: single_data_api_data?._id,
    };
    await update(updated_data);
  };

  const getSingleDataHandler = async (id: string) => {
    await getSingle(id);
  };

  useEffect(() => {
    const resetValues = () => {
      setValue("title", "");
      setValue("description", "");
      setValue("alt", "");
      setValue("metaTitle", "");
      setValue("metaDescription", "");
      setValue("metaCanonicalUrl", "");
      setKeywords([]);
    };

    const populateValues = (data: typeof single_data_api_data) => {
      setValue("title", data?.title ?? "");
      setValue("description", data?.caption ?? "");
      setValue("alt", data?.altText ?? "");
      setValue("metaTitle", data?.seo?.title ?? "");
      setValue("metaDescription", data?.seo?.meta_description ?? "");
      setValue("metaCanonicalUrl", data?.path ?? "");
      setKeywords(Array.isArray(data?.seo?.keywords) ? data.seo.keywords : []);
    };

    if (single_data_api_data) {
      populateValues(single_data_api_data);
    } else {
      resetValues();
    }
  }, [single_data_api_data, setValue, setKeywords]);

  return (
    <div className="container mx-auto py-8 relative">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {api_data?.result?.map((image: any, index: number) => (
              <Server_image_card
                width={300}
                height={200}
                key={index}
                id={image?._id}
                src={image.path}
                alt={image.altText || "image"}
                isVisible={true}
                onSubmit={onSubmit}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                watch={watch}
                keywords={keywords}
                setKeywords={setKeywords}
                getSingleDataHandler={getSingleDataHandler}
                isLoading={single_loading}
                isUpdateLoading={update_loading}
                isSuccess={isSuccess}
              />
            ))}
          </div>
          <ShadcnTableFooter
            currentPage={page}
            totalPages={api_data?.resultPerPage}
            setCurrentPage={setPage}
            data_length={api_data?.dataCounter}
          />
        </>
      )}
    </div>
  );
}
