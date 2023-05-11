import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: localStorages("cart") || [],
    items: [],
};

function localStorages(key) {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            if (state.cart.find((item) => item.id === action.payload.item.id)) {
                state.cart = state.cart.map((item) => {
                    if (item.id === action.payload.item.id) {
                        item.count += action.payload.item.count;
                    }
                    return item;
                });
            } else {
                state.cart = [...state.cart, action.payload.item];
            }
            // state.cart = [...state.cart, action.payload.item];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 0) {
                    item.count--;
                }
                return item;
            });
            state.cart = state.cart.filter((item) => item.count !== 0)
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        changeCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.item.id) {
                    item.count = action.payload.item.count;
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

    },
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    changeCount,
} = cartSlice.actions;

export default cartSlice.reducer;