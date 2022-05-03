import "./App.css";
import "./styles/app.scss";

// import { Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Onboarding from "./pages/authentication/Onboarding";
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
import NavBar from "./components/NavBar";
import Car from "./pages/car/Car";

import { useFetch } from "./utils/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConstantes, setToken } from "./store/store";
import { Routes, Route } from "react-router-dom";
import { useGetAuthToken } from "./utils/auth";
import { ROUTES } from "./utils/routes";

function App() {
    const constanteRequest = useFetch({
        endpoint: "constantes",
        launchRequest: true,
    });
    const dispatch = useDispatch();
    const { haveStateToken, haveCookieToken, cookieToken } = useGetAuthToken();

    useEffect(() => {
        // Save token in state if have token in cookies
        console.log(haveCookieToken);
        if (!haveStateToken && haveCookieToken) {
            dispatch(setToken(cookieToken));
        }
        // Load const of application
        dispatch(setConstantes(constanteRequest.data));
    }, [constanteRequest.data]);

    return (
        <>
            <Routes>
                <Route path="/" element={<InscriptionChoice />} />
                <Route path={ROUTES.login.name} element={<Login />} />
                <Route path={ROUTES.registration.name} element={<Register />} />
                <Route path={ROUTES.onboarding.name} element={<Onboarding />} />
            </Routes>
            {/* <InscriptionChoice />
            {console.log(user)} */}

            {/* <InscriptionChoice /> */}
            {/* <Login/> */}
            {/* <Register/> */}

            {/* <Onboarding/> */}

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

            {/* <Car /> */}
            {/* <CarSwitcher /> */}
            {/* <NavBar /> */}
            {/* <Car /> */}

            {/* <Login /> */}
            {/* <Register/> */}
        </>
    );
}

export default App;
