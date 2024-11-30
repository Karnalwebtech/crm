// pages/orders/form/[slug]/page.tsx

import Update_order from "@/components/pages/crm/order/update/Update_order";
import { FC } from "react";

interface SlugPageProps {
  params: {
    slug: string;
  };
}

const SlugPage: FC<SlugPageProps> = ({ params }) => {
  const { slug } = params; // Extract slug from params

  return (
    <Update_order id={slug}/>
  );
};

export default SlugPage;
