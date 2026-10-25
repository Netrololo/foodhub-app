import { DishConstructor } from './components/DishConstructor';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f0f12' }}>
      {}
      <DishConstructor dishId={1} />
    </div>
  );
}

export default App;
