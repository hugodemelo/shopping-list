import { ACTIONS, AddProductsAction, ModifyOrderAction, ResetOrderAction } from "./types";
import { Product } from "./entities";
import { ActionCreator } from "redux";

export const addProduct: ActionCreator<AddProductsAction> = (...products: Product[]) => {
    return {
        type: ACTIONS.ADD_PRODUCTS,
        payload: products
    };
};

export const modifyOrder: ActionCreator<ModifyOrderAction> = (product: Product, quantity: number) => {
    return {
        type: ACTIONS.MODIFY_ORDER,
        payload: {
            product,
            quantity
        }
    };
};

export const resetOrder: ActionCreator<ResetOrderAction> = () => ({ type: ACTIONS.RESET_ORDER });
