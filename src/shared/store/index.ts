import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type ProductState } from '~/shared/store/types/productState';

export const useProductsStore = create<ProductState>()(
  persist(
    (set) => ({
      productsInShoppingCart: [],
      addToShoppingCart: (productToCart) =>
        set((state) => ({
          productsInShoppingCart: [
            ...state.productsInShoppingCart,
            productToCart,
          ],
        })),
      removeFromShoppingCart: (productId: string) =>
        set((state) => ({
          productsInShoppingCart: state.productsInShoppingCart.filter(
            ({ product }) => product.id !== productId,
          ),
        })),
      increaseCount: (productId) =>
        set((state) => ({
          productsInShoppingCart: state.productsInShoppingCart.map(
            (product) => {
              if (product.count >= 10 || product.count < 1) {
                return product;
              }

              if (product.product.id === productId) {
                return {
                  ...product,
                  count: product.count + 1,
                };
              }

              return product;
            },
          ),
        })),
      decreaseCount: (productId) =>
        set((state) => ({
          productsInShoppingCart: state.productsInShoppingCart.map(
            (product) => {
              if (product.count >= 10 || product.count === 1) {
                return product;
              }

              if (product.product.id === productId) {
                return {
                  ...product,
                  count: product.count - 1,
                };
              }

              return product;
            },
          ),
        })),
      clearShoppingCart: () => set({ productsInShoppingCart: [] }),
    }),
    {
      name: 'productStore',
    },
  ),
);
