const Routes = {
  HOME: "/home",
  USER: {
    LOGIN: "/login",
    INDEX: "/users",
    NEW: "/users/new",
    EDIT: "/users/:id"
  },
  PRODUCT: {
    INDEX: "/products",
    NEW: "/products/new",
    EDIT: "/products/:id",
    CATEGORY: {
      INDEX: "/products/categories",
      NEW: "/products/categories/new",
      EDIT: "/products/categories/:id"
    }
  },
  SKU: {
    INDEX: "/skus",
    NEW: "/skus/new",
    EDIT: "/skus/:id",
    ATTRIBUTE: {
      CATEGORY: {
        INDEX: "/skus/attributes/categories",
        NEW: "/skus/attributes/categories/new",
        EDIT: "/skus/attributes/categories/:id"
      }
    }
  }
};

export default Routes;
