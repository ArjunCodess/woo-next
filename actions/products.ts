"use server";

import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WP_WEBSITE_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: "wc/v3",
  queryStringAuth: true,
});

export const getProducts = async () => {
  try {
    const products = await WooCommerce.get("products");
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProduct = async (id: string) => {
  try {
    const product = await WooCommerce.get("products", {
      id: parseInt(id),
    });
    return product.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};