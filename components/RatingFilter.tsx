import React, { useState } from 'react'
import type { Filter } from '../types'

type Props = {
    onChange: (filter: Filter) => void;
}

const RatingFilter: React.FC<Props> = ({ onChange }: Props) => {
    const [selected, setSelected] = useState<Set<number>>(() => new Set())

    function handleChange(rating: number, checked: boolean) {
        const draft = structuredClone(selected);

        if (checked) draft.add(rating);
        else draft.delete(rating);

        onChange(draft.size ? ((product) => draft.has(product.rating)) : null)
        setSelected(draft);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12",
            border: "1px solid white",
        }}>
            <h4>Ratings</h4>
            <ul style={{

                padding: 12,

            }}>
                {[1, 2, 3, 4, 5].map((rating) =>
                    <li
                        key={rating}>
                        <label style={{
                            display: "flex",
                            gap: "12px",
                            color: "gold"
                        }}>
                            <input type="checkbox" name="color" value={rating} onChange={(e) => handleChange(rating, e.target.checked)} />
                            {"★".repeat(rating).padEnd(5, "☆")}</label>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default RatingFilter