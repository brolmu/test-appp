/* eslint-disable @next/next/no-img-element */
import React from 'react'
import type { Product } from '../types'

type Props = {
    product: Product
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
    return (
        <div style={{
            border: "1px solid white",
            padding: "21px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
        }} >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p >Valoracion: <span style={{
                color: "gold"
            }}>{"★".repeat(product.rating).padEnd(5, "☆")}</span></p>
            <p >{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        </div>
    )
}

export default ProductCard