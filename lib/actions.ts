// export const getCollections = async () => {
//   const collections = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/collections`
//   );

import { createClerkClient } from '@clerk/nextjs/server';

//   return await collections.json();
// };

export const getCollections = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections`,
      { cache: 'no-store' }
    );

    // Check if the response status is OK (200)
    if (!response.ok) {
      // Log the status and statusText for debugging
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text(); // Read the response as text
      console.error(`Error response: ${errorText}`);
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }

    // Parse the response as JSON
    const collections = await response.json();
    return collections;
  } catch (error) {
    console.error('GET_COLLECTIONS: Failed to fetch collections:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
    { cache: 'no-store' }
  );
  return await collection.json();
};

export const getProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      { cache: 'no-store' }
    );

    // Check if the response status is OK (200)
    if (!response.ok) {
      // Log the status and statusText for debugging
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text(); // Read the response as text
      console.error(`Error response: ${errorText}`);
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }

    // Parse the response as JSON
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('GET_PRODUCTS: Failed to fetch products:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text(); // Read the response as text
      console.error(`Error response: ${errorText}`);
      throw new Error(`Error fetching collections: ${response.statusText}`);
    }
    // Parse the response as JSON
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(
      '[GET_PRODUCT_DETAUILS] failed to fetch product details',
      error
    );
    throw error; // Re-throw the error after logging it
  }
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`
  );
  return await searchedProducts.json();
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,
    { cache: 'no-store' }
  );
  return await orders.json();
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/relatedProducts`
  );
  return await relatedProducts.json();
};
