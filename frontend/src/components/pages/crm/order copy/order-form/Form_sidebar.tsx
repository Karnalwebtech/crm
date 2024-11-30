"use client";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Server_image_card from "@/components/image_compress/Server_image_card";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Image_card from "@/components/image_compress/Image_card";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";

interface sidebar_props {
  invoice_files: File[];
  set_invoice_Files: (invoice_files: File[]) => void;
  doket_files: File[];
  set_doket_Files: (doket_files: File[]) => void;
  Image_files: File[];
  set_Image_Files: (Image_files: File[]) => void;
  data: any;
}

export const Form_sidebar: React.FC<sidebar_props> = ({
  invoice_files,
  set_invoice_Files,
  doket_files,
  set_doket_Files,
  Image_files,
  set_Image_Files,
  data,
}) => {
  const [items, setItems] = useState({
    invoice: [] as { img: string; name: string }[],
    doket: [] as { img: string; name: string }[],
    image: [] as { img: string; name: string }[],
  });

  const [field_visible, set_field_visible] = useState([false, false, false]);
  const [item_visible, set_item_visible] = useState([false, false, false]);


  const handleDrop = useCallback(
    (acceptedFiles: File[], type: string) => {
      if (acceptedFiles.length > 1) {
        toast.error(`${type === "pdf" ? "Pdf" : "Image"} allowed only 1`);
        return;
      }
      const imageData = acceptedFiles.map((file) => ({
        img: URL.createObjectURL(file),
        name: file.name,
      }));
      if (type === "invoice") {
        set_invoice_Files(acceptedFiles);
      } else if (type === "doket") {
        set_doket_Files(acceptedFiles);
      } else {
        set_Image_Files(acceptedFiles);
      }
      setItems((prev) => ({ ...prev, [type]: imageData }));
    },
    [set_invoice_Files, set_doket_Files, set_Image_Files]
  );

  type FileType = "invoice" | "doket" | "image";

  const handleDelete = (index: number, type: FileType) => {
    setItems((prev) => ({
      ...prev,
      [type]: prev[type].filter((_: any, i: number) => i !== index),
    }));
  };

  const View_file_handler = (item: any) => {
    item.img ?
      window.open(item.img, "_blank") : window.open(item.path, "_blank")
  };

  useEffect(() => {
    const visibility = [
      items.invoice.length > 0,
      items.doket.length > 0,
      items.image.length > 0,
    ];
    set_field_visible(visibility);
  }, [items]);

  useEffect(() => {
    const invoiceVisible = data?.invoice_id?.length > 0;
    const doketVisible = data?.doket_id?.length > 0;
    const imageVisible = data?.image_id?.length > 0;

    set_item_visible([invoiceVisible, doketVisible, imageVisible]);
  }, [data]);

  const toggleVisibility = (index: number) => {
    set_item_visible((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const renderFileSection = (field: string, index: number, files: any[], dataKey: string) => (
    <Card className="mt-4">
      <CardBody>
        <p className="my-4">{`${field.charAt(0).toUpperCase() + field.slice(1)} Upload`}</p>
        {field_visible[index] ? (
          <div className="flex w-full flex-wrap gap-2">
            {files.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="w-full">
                  <Image_card item={item} index={idx} onDelete={() => handleDelete(idx, field as FileType)} />
                </div>
                <Divider />
                <Button className="bg-black mt-2 text-white" onClick={() => View_file_handler(item)}>
                  View {field === "image" ? "Image" : "PDF"}
                </Button>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <>
            <div>
              {item_visible[index] ? (
                <div className="flex w-full flex-wrap gap-2">
                  {data?.[dataKey]?.map((item: any, i: number) => (
                    <>
                      <div className="w-full" key={i}>
                        <Server_image_card src={item.path} alt={item.originalname} width={200} height={200} />
                      </div>
                      <Button className="bg-black mt-2 text-white" onClick={() => View_file_handler(item)}>
                        View
                      </Button>
                    </>
                  ))}
                </div>
              ) : (
                <Drag_input_field
                  onDrop={(data: any) => handleDrop(data, field)}
                  type={field === "image" ? "image/*" : "application/pdf"}
                />
              )}
            </div>
            <Button className="bg-black mt-2 text-white" onClick={() => toggleVisibility(index)}>
              {item_visible[index] ? `Upload ${field}` : `View ${field}`}
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );

  return (
    <div className="w-full p-4">
      {renderFileSection("invoice", 0, items.invoice, "invoice_id")}
      {renderFileSection("doket", 1, items.doket, "doket_id")}
      {renderFileSection("image", 2, items.image, "image_id")}
    </div>
  );
};
