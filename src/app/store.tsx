import { Book } from "../../type/Book";
import { createSlice, configureStore, current, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "books",
    initialState: {
        books: [] as Book[],
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action?.payload;
        },
        addBook: {
            reducer: (state, action: PayloadAction<Book>) => {
                state.books.push(action.payload);
            },
            prepare: (name: string, price: number, category: string, description: string) => {
                const id = nanoid();
                return { payload: { id, name, price, category, description } };
            },
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(function (value, index, arr) {
                return value?.id != action?.payload;
            });
        },
    },
});

export const { setBooks, addBook, deleteBook } = bookSlice.actions;
// export const { incremented, decremented } = bookSlice.actions;

const store = configureStore({
    reducer: bookSlice.reducer,
});

export default store;

// Can still subscribe to the store
store.subscribe(() => console.log("state", store.getState()));
