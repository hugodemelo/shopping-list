import { StoreData } from "./types";
import { modifyOrder } from "./actionCreators";
import { connect } from "react-redux";
import { ProductList } from "../components/ProductList";

const stateToProps = (data: StoreData) => ({
    products: data.products,
    categories: [...new Set(data.products.map(p => p.category))],
    order: data.order
});

const dispatchToProps = {
    addToOrder: modifyOrder
};

export const ConnectedProductList = connect(stateToProps, dispatchToProps)(ProductList);
