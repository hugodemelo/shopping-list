export type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
};

export class OrderLine {
    constructor(public product: Product, public quantity: number) {}

    public getTotal(): number {
        return this.product.price * this.quantity;
    }
}

export class Order {
    private lines = new Map<number, OrderLine>();

    constructor(initialLines?: OrderLine[]) {
        if (initialLines) {
            initialLines.forEach(orderLine => this.lines.set(orderLine.product.id, orderLine));
        }
    }

    public addProduct(product: Product, quantity: number): void {
        if (this.lines.has(product.id)) {
            if (quantity === 0) {
                this.removeProduct(product);
            } else {
                this.lines.get(product.id)!.quantity += quantity;
            }
        } else {
            this.lines.set(product.id, new OrderLine(product, quantity));
        }
    }

    public removeProduct(product: Product): void {
        this.lines.delete(product.id);
    }

    public getOrderLines(): OrderLine[] {
        return [...this.lines.values()];
    }

    public getProductCount(): number {
        return this.getOrderLines().reduce((acc, curr) => acc + curr.quantity, 0);
    }

    public getTotal(): number {
        return this.getOrderLines().reduce((acc, curr) => acc + curr.getTotal(), 0);
    }
}
