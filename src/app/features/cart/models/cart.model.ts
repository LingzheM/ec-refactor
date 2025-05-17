import { Product } from "../../products/models/product.model";

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
}