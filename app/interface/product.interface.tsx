type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    currency: string,
    image: string,
    rating: number
}

type  ProductCardProps = {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    rating: number;
  }

export type {
    Product,
    ProductCardProps
}