import React, { Component } from "react";
import { Provider } from "react-redux";
import { dataStore } from "./data/dataStore";
import { addProduct } from "./data/actionCreators";
import { ConnectedProductList } from "./data/productListConnector";
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
                    <ConnectedProductList />
                </Provider>
            </div>
        );
    }
}

export default App;
