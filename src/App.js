import './App.css';

import Selector from './components/Selector';
import { FoodProvider } from './FoodContext';
import UserFoods from './components/UserFoods';
// import AddItem from './components/AddItem';




function App() {

  
  return (
    <div className="App">
      
      <h1 className="App-title">Calorie Calc</h1>
      <main className="App-main">
        <FoodProvider>
          <Selector />
          <UserFoods />
        </FoodProvider>
      </main>
    </div>
  );
}

export default App;
