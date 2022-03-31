import './App.css';
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
import Updatepart from './pages/part/Updatepart';
import DetailPart from './pages/part/DetailPart';
import AddMaintenance from './components/AddMaintenance';



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


        {/* <Home/> */}
        {/* <MaintenanceBook /> */}
        {/* <PartsPrincipalInformation /> */}
        {/* <CarsInformation /> */}
        {/* <CompleteHistory /> */}
        {/* <MaintenanceUpcoming /> */}


        {/* <ListMaintenanceParts /> */}
        {/* <Updatepart /> */}
        {/* <DetailPart name="Courroie de disctribution"/> */}
        {/* <UpdateMaintenance /> */}
        <AddMaintenance />
      {/* <Login /> */}
      {/* <Register/> */}
    </main>
    // <Welcome/>
    // <DataCar/>
  );

}

export default App;
