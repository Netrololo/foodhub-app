import { DishConstructor } from './components/DishConstructor';

function App() {
  return (
    <main style={{ padding: '20px', backgroundColor: '#0f0f12', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Семантический заголовок первого уровня для прохождения аудита Lighthouse */}
      <h1 style={{ color: '#fff', margin: '20px 0 40px 0', fontFamily: 'sans-serif', fontSize: '28px' }}>
        Оформление заказа в FoodHub
      </h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DishConstructor dishId={1} />
      </div>
    </main>
  );
}

export default App;
