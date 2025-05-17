// src/app/features/products/models/product.model.ts

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    stock?: number;
    category?: string;
}