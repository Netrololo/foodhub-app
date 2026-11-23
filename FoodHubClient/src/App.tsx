import { DishConstructor } from './components/DishConstructor';

function App() {
  return (
    <main className="p-5 bg-[#0f0f12] min-h-screen flex flex-col items-center font-sans">
      {/* Семантический заголовок первого уровня для прохождения аудита Lighthouse */}
      <h1 className="text-white mt-5 mb-10 text-[28px] font-bold">
        Оформление заказа в FoodHub
      </h1>

      <div className="flex justify-center items-center w-full">
        <DishConstructor dishId={1} />
      </div>
    </main>
  );
}

export default App;
