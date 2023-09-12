import logo from './logo.svg';
import './App.css';
import CodeConverter from './Components/codeConveter';
import Navbar from './Components/navbar';
import Home from './Components/home';
import { Allroutes } from './Components/Allroutes';

function App() {
  return (
    <div className="App">
    
   <Navbar/>  
   
   <Allroutes/>


    </div>
  );
}

export default App;
