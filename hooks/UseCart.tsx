import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
};

type CartStore = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
};

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems; // all the items already in cart
        const itemExists = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (itemExists) {
          return toast('Item already in cart');
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success('Item added to cart', { icon: '🛒' });
      },
      removeItem: (idToRemove: String) => {
        const updatedCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: updatedCartItems });
        toast.success('Item removed from cart');
      },
      increaseQuantity: (idToIncrease: String) => {
        const updatedCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: updatedCartItems });
        toast.success('Item quantity increased');
      },
      decreaseQuantity: (idToDecrease: String) => {
        const updatedCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToDecrease
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        set({ cartItems: updatedCartItems });
        toast.success('Item quantity decreased');
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
