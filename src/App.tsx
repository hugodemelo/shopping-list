import React, { FunctionComponent } from "react";
import { Product } from "./data/entities";
import { ProductList } from "./components/ProductList";
import TestData from "./data.json";
import "./App.css";

const testData = TestData.products;

const App: FunctionComponent = () => {
    const addToOrder = (product: Product, quantity: number) => {
        console.log(`Add ${quantity} of ${product.name}`);
    };

    return (
        <div className="App">
            <ProductList products={testData} addToOrder={addToOrder} />
        </div>
    );
};

export default App;
