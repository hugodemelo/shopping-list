import React, { FunctionComponent } from "react";
import { ProductItem } from "./ProductItem";
import { Product } from "../data/entities";

interface Props {
    products: Product[];
    addToOrder: (product: Product, quantity: number) => void;
}

export const ProductList: FunctionComponent<Props> = props => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-9 p-2">
                        {props.products.map(p => (
                            <ProductItem key={p.id} product={p} callback={props.addToOrder} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
