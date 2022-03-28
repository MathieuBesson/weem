import './App.css';
import {Route} from 'react-router-dom';
import Login from './pages/authentication/Login';
// import Register from './Register/Register'
// import Welcome from './FirstCar/Welcome';
// import DataCar from './FirstCar/DataCar';
import InscriptionChoice from './pages/authentication/InscriptionChoice'

function App() {
  return (
    <div>
      {/* <Route path="/e">
        <InscriptionChoice />

      </Route>

      <Route path="/login">
        <Login/>
      </Route> */}
        {/* <InscriptionChoice /> */}

      <Login />

    </div>
    // <Register/>
    // <Welcome/>
    // <DataCar/>
  );
}

export default App;
