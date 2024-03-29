import React, { FunctionComponent } from "react";
import { match } from "react-router";
import { NavLink } from "react-router-dom";

interface Params {
    id: string;
}

interface Props {
    match: match<Params>;
}

export const Summary: FunctionComponent<Props> = props => {
    const { match: { params: { id }}} = props;
    return (
        <div className="m-2 text-center">
            <h2>Thanks!</h2>
            <p>Thanks for placing your order.</p>
            <p>Your order is #{id}</p>
            <p>We'll ship your goods as soon as possible.</p>
            <NavLink to="/products" className="btn btn-primary">
                OK
            </NavLink>
        </div>
    );
};
