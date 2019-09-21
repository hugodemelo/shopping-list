import React, { FunctionComponent } from "react";
import { StoreData } from "../data/types";
import { Order } from "../data/entities";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetOrder } from "../data/actionCreators";

interface Props {
    order: Order;
    resetOrder: () => void;
    navigateTo: (id: number) => void;
}

const OrderSummary: FunctionComponent<Props> = props => {
    
    const submit = async () => {
        const orderData = {
            lines: [...props.order.getOrderLines().values()].map(ol => ({
                productId: ol.product.id,
                productName: ol.product.name,
                quantity: ol.quantity
            }))
        };
        const result = await fetch("http://localhost:4600/orders/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });
        const payload = await result.json();
        props.navigateTo(payload.id);
        props.resetOrder();
    };

    return (
        <div>
            <h3 className="text-center bg-primary text-white p-2">Order Summary</h3>
            <div className="p-3">
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Product</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.order.getOrderLines().map(line => (
                            <tr key={line.product.id}>
                                <td>{line.quantity}</td>
                                <td>{line.product.name}</td>
                                <td className="text-right">${line.product.price.toFixed(2)}</td>
                                <td className="text-right">${line.getTotal().toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="text-right" colSpan={3}>
                                Total:
                            </th>
                            <th className="text-right">${props.order.getTotal().toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="text-center">
                <NavLink to="/products" className="btn btn-secondary m-1">
                    Back
                </NavLink>
                <button className="btn btn-primary m-1" onClick={() => submit()}>
                    Submit Order
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (data: StoreData) => ({
    order: data.order
});

const mapDispatchToProps = {
    resetOrder: resetOrder
};

export const ConnectedOrderSummary = connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
