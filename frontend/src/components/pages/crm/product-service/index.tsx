"use client";
import React, { useState } from "react";
import Page_header from "../../common/Page_header";
import { Button } from "@nextui-org/react";
// import Product_form from "./product/Product_form";
import Popover_component from "@/components/Popover_component/Popover_component";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Layers3, ShoppingCart } from "lucide-react";
import Categotie_form from "./categories/Categotie_form";
import Category from "./categories/Category";
import Product from "./product/Product";
const Product_servicee = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = () => {};
  return (
    <div>
      <Page_header title={"Products / Services"} />

      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" variant="bordered" className="custom-tabs">
          <Tab
            key="Product"
            title={
              <div className="flex items-center space-x-2">
                <ShoppingCart size={15} />
                <span>Product</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <Product />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="Categories"
            title={
              <div className="flex items-center space-x-2">
                <Layers3 size={15} />
                <span>Categories</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <Category />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Product_servicee;
