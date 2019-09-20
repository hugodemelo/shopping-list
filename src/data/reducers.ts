import { StoreData, StoreAction, ACTIONS } from "./types";
import { Order } from "./entities";
import { Reducer } from "redux";

export const StoreReducer: Reducer<StoreData, StoreAction> = (data, action) => {
    data = data || { products: [], order: new Order() };
    switch (action.type) {
        case ACTIONS.ADD_PRODUCTS:
            return {
                ...data,
                products: [...data.products, ...action.payload]
            };

        case ACTIONS.MODIFY_ORDER:
            data.order.addProduct(action.payload.product, action.payload.quantity);
            return { ...data };

        case ACTIONS.RESET_ORDER:
            return {
                ...data,
                order: new Order()
            };

        default:
            return data;
    }
};
