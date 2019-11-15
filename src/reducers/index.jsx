import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import ProductsReducer from "./ProductsReducer";
import ProductInfoReducer from "./ProductInfoReducer";
import ProductCategorySideBarReducer from "./ProductCategorySideBarReducer";
import HomeReducer from "./HomeReducer";
import ProductCategoryReducer from "./ProductCategoryReducer";
import SkuAttributeCategoryReducer from "./SkuAttributeCategoryReducer";
import UserReducer from "./UserReducer";

const counterApp = combineReducers({
  LoginReducer,
  ProductsReducer,
  ProductInfoReducer,
  ProductCategorySideBarReducer,
  HomeReducer,
  ProductCategoryReducer,
  SkuAttributeCategoryReducer,
  UserReducer
});

export default counterApp;
