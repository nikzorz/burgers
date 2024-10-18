import { ListProductsResponse } from "@/types";
import { cache } from "react";

export const getProductList = cache(async function getProductList() {
  const response = await fetch(
    "https://burgerhub00.github.io/data/products.json",
  );
  const data = await response.json();

  return data as ListProductsResponse;
});

export const getProductBySlug = cache(async function getProductBySlug(
  slug: string,
) {
  const { products } = await getProductList();

  return products.find((product) => product.slug === slug);
});
