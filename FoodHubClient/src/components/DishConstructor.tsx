import React, { useState, useEffect } from 'react';

interface Modifier {
    id: string;
    name: string;
    price: number;
    isDefault: boolean;
}

interface DishData {
    dishId: number;
    name: string;
    basePrice: number;
    modifiers: Modifier[];
}

export const DishConstructor: React.FC<{ dishId: number }> = ({ dishId }) => {
    const [dish, setDish] = useState<DishData | null>(null);
    const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetch(`https://localhost:7023/api/dish/${dishId}/modifiers`)
            .then((res) => res.json())
            .then((data) => {
                setDish(data);

                const defaultIds = data.modifiers
                    .filter((m: Modifier) => m.isDefault)
                    .map((m: Modifier) => m.id);
                setSelectedModifiers(defaultIds);
                setLoading(false);
            })
            .catch((err) => console.error("Ошибка связи с C# API:", err));
    }, [dishId]);

    const toggleModifier = (id: string) => {
        setSelectedModifiers((prev) =>
            prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
        );
    };

    const calculateTotalPrice = (): number => {
        if (!dish) return 0;
        let total = dish.basePrice;

        dish.modifiers.forEach((mod) => {
            const isSelected = selectedModifiers.includes(mod.id);

            if (isSelected && !mod.isDefault) {
                total += mod.price;
            }
        });
        return total;
    };

    if (loading || !dish) return <div style={ { color: '#fff', padding: '20px' } }> Загрузка конструктора FoodHub...</div>;

    return (
        <div style= {{ padding: '25px', maxWidth: '400px', backgroundColor: '#141416', color: '#fff', borderRadius: '16px', fontFamily: 'sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }
}>
    <h2 style={ { color: '#28a745', margin: '0 0 8px 0', fontSize: '24px' } }> { dish.name } </h2>
        < p style = {{ color: '#6c757d', margin: '0 0 20px 0', fontSize: '14px' }}> Стартовая цена: { dish.basePrice } ₽</p>

            < div style = {{ margin: '20px 0' }}>
                <h4 style={ { borderBottom: '1px solid #232325', paddingBottom: '8px', marginBottom: '12px', color: '#adb5bd' } }> Дополнительные ингредиенты: </h4>
{
    dish.modifiers.map((mod) => (
        <div key= { mod.id } style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0' }}>
            <label style={ { cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px' } }>
                <input
                type="checkbox"
checked = { selectedModifiers.includes(mod.id) }
onChange = {() => toggleModifier(mod.id)}
style = {{ width: '18px', height: '18px', accentColor: '#28a745', cursor: 'pointer' }}
              />
{ mod.name } { mod.isDefault && <span style={ { fontSize: '11px', color: '#495057' } }> (базовый) </span> }
</label>
    < span style = {{ color: '#28a745', fontWeight: 'bold', fontSize: '15px' }}>
    { mod.price > 0 ? `+${mod.price} ₽` : '0 ₽' }
        </span>
        </div>
        ))}
</div>

    < div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #232325' }}>
        <div>
        <span style={ { fontSize: '12px', color: '#6c757d' } }> Итоговая стоимость: </span>
            < h3 style = {{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}> { calculateTotalPrice() } ₽</h3>
                </div>
                < button style = {{ backgroundColor: '#28a745', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' }}>
                    В корзину
                        </button>
                        </div>
                        </div>
  );
};
