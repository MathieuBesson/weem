<<<<<<< HEAD
import './App.css';
import './styles/app.scss';

import {Route} from 'react-router-dom';
// import Login from './pages/authentication/Login';
// import Register from './Register/Register'
// import Welcome from './FirstCar/Welcome';
// import DataCar from './FirstCar/DataCar';
import InscriptionChoice from './pages/authentication/InscriptionChoice'
import CarsInformation from './pages/carsCreation/CarsInformation';
import PartsPrincipalInformation from './pages/carsCreation/PartsPrincipalInformation';
import Home from './pages/homeMaintenance/Home';
import MaintenanceBook from './pages/homeMaintenance/MaintenanceBook';
import CompleteHistory from './pages/maintenance/CompleteHistory';
import MaintenanceUpcoming from './pages/homeMaintenance/MaintenanceUpcoming';
import ListMaintenanceParts from './pages/maintenance/ListMaintenanceParts';
import UpdateMaintenance from './pages/maintenance/UpdateMaintenance';
import UpdatePart from './pages/part/UpdatePart';
import DetailPart from './pages/part/DetailPart';
import AddMaintenance from './components/AddMaintenance';
import CarSwitcher from './components/CarSwitcher';
import Car from './pages/car/Car';


=======
import "./App.css";
import "./styles/app.scss";

import { Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from './pages/authentication/Register'
import Unboarding from './pages/authentication/Unboarding'
import InscriptionChoice from "./pages/authentication/InscriptionChoice";
import CarsInformation from "./pages/carsCreation/CarsInformation";
import PartsPrincipalInformation from "./pages/carsCreation/PartsPrincipalInformation";
import Home from "./pages/homeMaintenance/Home";
import MaintenanceBook from "./pages/homeMaintenance/MaintenanceBook";
import CompleteHistory from "./pages/maintenance/CompleteHistory";
import MaintenanceUpcoming from "./pages/homeMaintenance/MaintenanceUpcoming";
import ListMaintenanceParts from "./pages/maintenance/ListMaintenanceParts";
import UpdateMaintenance from "./pages/maintenance/UpdateMaintenance";
import UpdatePart from "./pages/part/UpdatePart";
import DetailPart from "./pages/part/DetailPart";
import AddMaintenance from "./components/AddMaintenance";
import Car from "./pages/car/Car";
>>>>>>> fcab2cab82af063170b97d63813905d5ef47fa3e

function App() {
  return (
    <main>
      {/* <Route path="/e">
        <InscriptionChoice />

      </Route>

      <Route path="/login">
        <Login/>
      </Route> */}
      {/* <InscriptionChoice /> */}
      {/* <Login/> */}
      {/* <Register/> */}

      <Unboarding/>

      {/* <Home/> */}
      {/* <MaintenanceBook /> */}
      {/* <PartsPrincipalInformation /> */}
      {/* <CarsInformation /> */}
      {/* <CompleteHistory /> */}
      {/* <MaintenanceUpcoming /> */}

      {/* <ListMaintenanceParts /> */}
      {/* <UpdatePart /> */}
      {/* <DetailPart name="Courroie de disctribution"/> */}
      {/* <UpdateMaintenance /> */}
      {/* <AddMaintenance /> */}

<<<<<<< HEAD
        <Car />
        <CarSwitcher />
=======
      {/* <Car /> */}
>>>>>>> fcab2cab82af063170b97d63813905d5ef47fa3e

      {/* <Login /> */}
      {/* <Register/> */}
    </main>
    // <Welcome/>
    // <DataCar/>
  );
}

export default App;
