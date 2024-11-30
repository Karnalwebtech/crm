import React from "react";
interface page_header_props {
  title: string;
}
const Page_header: React.FC<page_header_props> = ({ title }) => {
  return (
    <div className="my-2">
      <h1 className="text-3xl font-medium">{title}</h1>
    </div>
  );
};

export default Page_header;
