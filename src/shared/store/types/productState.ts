import { type Product } from '@prisma/client';

export type productToCart = {
  product: Product;
  count: number;
};

export type ProductState = {
  productsInShoppingCart: productToCart[];
  addToShoppingCart: (product: productToCart) => void;
  removeFromShoppingCart: (productId: string) => void;
  decreaseCount: (productId: string) => void;
  increaseCount: (productId: string) => void;
  clearShoppingCart: () => void;
};
