import { useContext, useMemo } from 'react';
import './App.css';
import { Context } from './context/Context';
import Home from './pages/Home';

function App() {
  const {comments} = useContext(Context);
  const memoizedValue = useMemo(()=><Home/>,[]);
  return (
    <div className="App">
      {
        memoizedValue
      }
    </div>
  );
}

export default App;
