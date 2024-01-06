
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Passenger from './pages/Passenger';
import Employee from './pages/Employee';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='/' index element={<Home/>}/>
        <Route path='/passenger' element={<Passenger/>}/>
        <Route path='/employee' element={<Employee/>}/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
