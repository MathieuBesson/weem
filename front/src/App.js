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
import CarSwitcher from "./components/CarSwitcher";
import Car from "./pages/car/Car";

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

      {/* <Unboarding/> */}

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


        <Car />
        <CarSwitcher />
      {/* <Car /> */}

      {/* <Login /> */}
      {/* <Register/> */}
    </main>
    // <Welcome/>
    // <DataCar/>
  );
}

export default App;
