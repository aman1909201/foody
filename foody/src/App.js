
import './App.css';

import Home from './components/Home';
import Login from './scrren/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './scrren/Signup';
import { Cartprovider } from './components/Contextreducer';
import Myorder from './scrren/Myorder';
function App() {
  return (
    <Cartprovider>

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/Myorder" element={<Myorder />} />
          </Routes>
        </div>
      </Router>
    
    </Cartprovider>
  );
}


export default App;
