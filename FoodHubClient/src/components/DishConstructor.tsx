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
    const apiUrl = import.meta.env.VITE_API_URL ?? "https://localhost:7023/api";
    fetch(`${apiUrl}/dish/${dishId}/modifiers`)
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

  if (loading || !dish) {
    return <div className="text-white p-5">Загрузка конструктора FoodHub...</div>;
  }

  return (
    <div className="p-6 w-full max-w-[400px] bg-[#141416] text-white rounded-2xl font-sans shadow-xl border border-zinc-800/80">
      <h2 className="text-[#28a745] mb-2 text-2xl font-bold">
        {dish.name}
      </h2>
      <p className="text-[#6c757d] mb-5 text-sm">
        Стартовая цена: {dish.basePrice} ₽
      </p>

      <div className="my-5">
        <h4 className="border-b border-[#232325] pb-2 mb-3 text-[#adb5bd] text-sm font-medium">
          Дополнительные ингредиенты:
        </h4>

        {dish.modifiers.map((mod) => (
          <div
            key={mod.id}
            className="flex justify-between items-center my-3.5"
          >
            <label className="cursor-pointer flex items-center gap-2.5 text-[15px] select-none">
              <input
                type="checkbox"
                checked={selectedModifiers.includes(mod.id)}
                onChange={() => toggleModifier(mod.id)}
                className="w-[18px] h-[18px] accent-[#28a745] cursor-pointer"
              />
              <span>
                {mod.name}{' '}
                {mod.isDefault && (
                  <span className="text-[11px] text-[#495057]">(базовый)</span>
                )}
              </span>
            </label>

            <span className="text-[#28a745] font-bold text-[15px]">
              {mod.price > 0 ? `+${mod.price} ₽` : '0 ₽'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-5 border-t border-[#232325]">
        <div>
          <span className="text-xs text-[#6c757d] block">
            Итоговая стоимость:
          </span>
          <h3 className="text-2xl font-bold">
            {calculateTotalPrice()} ₽
          </h3>
        </div>

        <button className="bg-[#28a745] hover:bg-[#218838] active:scale-[0.98] text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer">
          В корзину
        </button>
      </div>
    </div>
  );
};
