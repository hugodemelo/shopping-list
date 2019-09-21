import React, { Component } from "react";
import { Provider } from "react-redux";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { dataStore } from "./data/dataStore";
import { addProduct } from "./data/actionCreators";
import { ConnectedProductList } from "./components/ProductList";
import "./App.css";

interface Props {}

class App extends Component<Props> {
    componentDidMount() {
        (async () => {
            const result = await fetch("http://localhost:4600/products/");
            const products = await result.json();
            dataStore.dispatch(addProduct(...products));
        })();
    }

    render() {
        return (
            <div className="App">
                <Provider store={dataStore}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/products" component={ConnectedProductList} />
                            <Redirect to="/products" />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    }
}

export default App;
