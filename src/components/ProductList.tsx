import React, { FunctionComponent, useState } from "react";
import { Header } from "./Header";
import { CategoryList } from "./CategoryList";
import { ProductItem } from "./ProductItem";
import { Product, Order } from "../data/entities";
import { StoreData } from "../data/types";
import { modifyOrder } from "../data/actionCreators";
import { connect } from "react-redux";

interface Props {
    products: Product[];
    categories: string[];
    order: Order;
    addToOrder: (product: Product, quantity: number) => void;
}

const ProductList: FunctionComponent<Props> = props => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filterCategories = (): Product[] => {
        return props.products.filter(p => selectedCategory === "All" || p.category === selectedCategory);
    };

    return (
        <div>
            <Header order={props.order} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 p-2">
                        <CategoryList
                            categories={props.categories}
                            selected={selectedCategory}
                            selectCategory={setSelectedCategory}
                        />
                    </div>
                    <div className="col-9 p-2">
                        {filterCategories().map(p => (
                            <ProductItem key={p.id} product={p} addToOrder={props.addToOrder} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (data: StoreData) => ({
    products: data.products,
    categories: [...new Set(data.products.map(p => p.category))],
    order: data.order
});

const mapDispatchToProps = {
    addToOrder: modifyOrder
};

export const ConnectedProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);
