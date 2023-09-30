import { Route, Routes } from 'react-router-dom';
import './App.css';
import Add from './components/Add';
import View from './components/View';
import Header from './components/Header';
import TableC from './components/Home';
import Edit1 from './components/Edit1';





function App() {
  return (
    <div className="App w-100">
      <Header></Header>
      
      <Routes>
        <Route path='' element={<TableC></TableC>}></Route>
        <Route path='add' element={<Add></Add>}></Route>
        <Route path='view/:id/edit/:id' element={<Edit1></Edit1>}></Route>
        <Route path='view/:id' element={<View></View>}></Route>



      </Routes>
     
      
      
    </div>
  );
}

export default App;
