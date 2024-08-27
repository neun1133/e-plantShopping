import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

export const selectTotalItems = createSelector(
    state => state.cart.items,
    items => items.reduce((total, item) => total + item.quantity, 0)
);

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.name === action.payload.name);
            if (itemIndex > -1) {
                state.items.splice(itemIndex, 1);
            }
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;