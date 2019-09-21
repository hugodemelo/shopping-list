import React, { FunctionComponent, useEffect } from "react";
import { Provider } from "react-redux";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { dataStore } from "./data/dataStore";
import { addProduct } from "./data/actionCreators";
import { ConnectedProductList } from "./components/ProductList";
import { ConnectedOrderSummary } from "./components/OrderSummary";
import { Summary } from "./components/Summary";
import "./App.css";

const App: FunctionComponent = () => {
    
    useEffect(() => {
        (async () => {
            const result = await fetch("http://localhost:4600/products/");
            const products = await result.json();
            dataStore.dispatch(addProduct(...products));
        })();
    }, []);

    return (
        <div className="App">
            <Provider store={dataStore}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/products" component={ConnectedProductList} />
                        <Route
                            path="/order"
                            render={props => (
                                <ConnectedOrderSummary
                                    {...props}
                                    navigateTo={id => props.history.push(`/summary/${id}`)}
                                />
                            )}
                        />
                        <Route path="/summary/:id" component={Summary} />
                        <Redirect to="/products" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
};

export default App;
