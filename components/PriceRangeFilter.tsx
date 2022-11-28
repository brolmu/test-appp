import React, { useState } from 'react'
import type { Filter } from '../types'

type Props = {
    onChange: (filter: Filter) => void;
}

const PriceRangeFilter: React.FC<Props> = ({ onChange }: Props) => {
    const [min, setMin] = useState<number>(0)
    const [max, seMax] = useState<number>(Infinity)

    function handleChangeMin(value: number) {
        setMin(value);
        onChange(value ? (product) => product.price >= value && product.price <= max : null)
    }

    function handleChangeMax(value: number) {
        seMax(value);
        onChange(value ? (product) => product.price <= value && product.price >= min : null);
    }


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12",
            border: "1px solid white",
        }}>
            <h4>Price</h4>
            <label style={{
                display: "flex",
                gap: "12px",
            }} >
                MIN:
                <input onChange={(e) => handleChangeMin(Number(e.target.value))} type="number" name="min" />
            </label>
            <label style={{
                display: "flex",
                gap: "12px",
            }} >
                MAX:
                <input onChange={(e) => handleChangeMax(Number(e.target.value))} type="number" name="max" />
            </label>
        </div>
    )
}

export default PriceRangeFilter