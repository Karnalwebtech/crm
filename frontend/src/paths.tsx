interface Paths {
  crm: {
    product_service: string;
    crm: string;
    vendor: string;
    customer: string;
    expense: string;
    users: string;
    order: {
      list: string;
      form: string;
    };
    purchases: {
      list: string;
      form: string;
    };
  };
  dashboard: {
    products: string;
    users: string;
    inventory: string;
  };
  streaming: {
    uploadVideo: string;
    users: string;
    inventory: string;
  };
  karnalwebtech: {
    post: string;
    media: string;
    post_categorie: string;
    post_tag: string;
    portfolio: string;
    portfolio_categorie: string;
    portfolio_tag: string;
    users: string;
    inventory: string;
  };
}

export const paths: Paths = {
  crm: {
    order: {
      list: "/crm/orders",
      form: "/crm/orders/form",
    },
    purchases: {
      list: "/crm/purchase",
      form: "/crm/purchase/form",
    },
    product_service: "/crm/product",
    crm: "/crm",
    expense: "/crm/expense",
    customer: "/crm/customer",
    vendor: "/crm/vendor",
    users: "/crm/users",
  },
  dashboard: {
    products: "/products",
    users: "/users",
    inventory: "/inventory",
  },
  streaming: {
    uploadVideo: "/streaming/upload-video",
    users: "/streaming/users",
    inventory: "/streaming/inventory",
  },
  karnalwebtech: {
    post: "/karnalwebtech/post",
    media: "/karnalwebtech/media",
    post_categorie: "/karnalwebtech/post/categorie",
    post_tag: "/karnalwebtech/post/tag",
    users: "/streaming/users",
    inventory: "/streaming/inventory",
    portfolio: "/karnalwebtech/portfolio",
    portfolio_categorie: "/karnalwebtech/portfolio/categorie",
    portfolio_tag: "/karnalwebtech/portfolio/tag",
  },
};
