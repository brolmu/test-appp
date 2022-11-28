import React, { useMemo, useState } from 'react'
import type { Filter, Product } from '../types'

type Props = {
    products: Product[],
    onChange: (filter: Filter) => void;
}

const ColorFilter: React.FC<Props> = ({ products, onChange }: Props) => {
    const [selected, setSelected] = useState<Set<string>>(() => new Set())

    function handleChange(color: string, checked: boolean) {
        const draft = structuredClone(selected);

        if (checked) draft.add(color);
        else draft.delete(color);

        onChange(draft.size ? ((product) => draft.has(product.color)) : null)
        setSelected(draft);
    }

    const colors = useMemo(() => {
        const buffer: Set<string> = new Set();

        products.forEach(product => {
            buffer.add(product.color)
        })

        return Array.from(buffer);
    }, [products])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12",
            border: "1px solid white",
            overflowY: "auto"
        }}>
            <h4>Colors</h4>
            <ul style={{

                padding: 12,

            }}>
                {colors.map((color) =>
                    <li
                        
                        key={color}>
                        <label style={{
                            display: "flex",
                            gap: "12px",
                        }} >
                            <input type="checkbox" name="color" value={color} onChange={(e) => handleChange(color, e.target.checked)}/>
                            {color}
                        </label>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ColorFilter