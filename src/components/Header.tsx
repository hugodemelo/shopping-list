import React, { FunctionComponent } from "react";
import { Order } from "../data/entities";
import { NavLink } from "react-router-dom";

interface Props {
    order: Order;
}

export const Header: FunctionComponent<Props> = props => {
    let count = props.order.getProductCount();
    return (
        <div className="p-1 bg-secondary text-white text-right">
            {count === 0 ? "No Selection" : `${count} product(s), $${props.order.getTotal().toFixed(2)}`}
            <NavLink to="/order" className="btn btn-sm btn-primary m-1">
                Submit Order
            </NavLink>
        </div>
    );
};
