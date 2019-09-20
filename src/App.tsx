import React, { Component } from "react";
import { Product, Order } from "./data/entities";
import { ProductList } from "./components/ProductList";
import TestData from "./data.json";
import "./App.css";

const testData = TestData.products;

interface Props {}

interface State {
    order: Order;
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            order: new Order()
        };
    }

    addToOrder = (product: Product, quantity: number) => {
        this.setState(prevState => {
            prevState.order.addProduct(product, quantity);
            return prevState;
        });
    };

    render() {
        const categories = [...new Set(testData.map(p => p.category))];

        return (
            <div className="App">
                <ProductList
                    products={testData}
                    addToOrder={this.addToOrder}
                    categories={categories}
                    order={this.state.order}
                />
            </div>
        );
    }
}

export default App;
