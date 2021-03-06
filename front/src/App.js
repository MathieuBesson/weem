import "./App.css";
import "./styles/app.scss";

// import { Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Onboarding from "./pages/authentication/Onboarding";
import NotFound from "./pages/authentication/NotFound";
import InscriptionChoice from "./pages/authentication/InscriptionChoice";
import CarInformation from "./pages/carsCreation/CarInformation";
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
import Loader from "./components/Loader";
import Car from "./pages/car/Car";
import { Helmet } from "react-helmet";

import { useFetch } from "./utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setConstantes,
    setToken,
    setUserDatas,
    setCurrentCar,
} from "./store/store";
import { Routes, Route, useLocation } from "react-router-dom";
import { useGetAuthToken } from "./utils/auth";
import { generateParamsRoutes, ROUTES } from "./utils/routes";
import MaintenanceHistory from "./components/MaintenanceHistory";
import Blog from "./pages/blog/Blog";
import Article from "./pages/blog/Article";

function App() {
    // Store
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const currentCar = useSelector((state) => state.currentCar);
    const location = useLocation();

    console.log(token);

    // State
    // const [isLaunchRequestUser, setIsLaunchRequestUser] = useState(false);
    // const [isLaunchRequestCurrentCar, setIsLaunchRequestCurrentCar] =
    //     useState(false);
    const { haveStateToken, haveCookieToken, cookieToken, stateToken } =
        useGetAuthToken();

    // // Fetch
    const constanteRequest = useFetch({
        endpoint: "constantes",
        launchRequest: true,
    });

    const user = useFetch({
        endpoint: "userConnected",
    });

    const currentCarFetch = useFetch({
        endpoint: "car",
        dataQuery: {
            keyValue: {
                count: 1,
            },
        },
    });

    // Use effect
    useEffect(() => {
        dispatch(setConstantes(constanteRequest.data));
    }, [constanteRequest.isSucceed]);

    useEffect(() => {
        if (haveStateToken || haveCookieToken) {
            // Save token (from Cookie or store)
            dispatch(setToken(cookieToken ? cookieToken : stateToken));
            user.setLaunchRequest(true);
        }
    }, [token]);

    useEffect(() => {
        // Save users datas in store
        console.log(user.isSucceed);

        if (user.isSucceed) {
            dispatch(setUserDatas(user.data));
            currentCarFetch.setLaunchRequest(true);
        }
    }, [user.isSucceed]);

    useEffect(() => {
        if (currentCarFetch.isSucceed) {
            dispatch(setCurrentCar(currentCarFetch.data[0]));
        }
    }, [currentCarFetch.isSucceed]);

    const isAccessLoggedOk = () => {
        return (
            constanteRequest.isSucceed &&
            user.isSucceed &&
            currentCarFetch.isSucceed
        );
    };

    const isAccessNotLoggedOk = () => {
        return constanteRequest.isSucceed;
    };

    return (
        <>
            {!isAccessNotLoggedOk() ? (
                <Loader />
            ) : (
                <>
                    <Helmet>
                        <title>Weem</title>
                    </Helmet>
                    <Routes>
                        {isAccessNotLoggedOk() && (
                            <>
                                <Route
                                    path="/"
                                    element={<InscriptionChoice />}
                                />
                                <Route
                                    path={ROUTES.login.url}
                                    element={<Login />}
                                />
                                <Route
                                    path={ROUTES.registration.url}
                                    element={<Register />}
                                />
                            </>
                        )}

                        {isAccessLoggedOk() && (
                            <>
                                <Route
                                    path={ROUTES.onboarding.url}
                                    element={<Onboarding />}
                                />
                                <Route
                                    path={ROUTES.carInformation.url}
                                    element={<CarInformation />}
                                />
                                <Route
                                    path={ROUTES.partsPrincipalInformation.url}
                                    element={<PartsPrincipalInformation />}
                                />
                                <Route
                                    path={ROUTES.home.url}
                                    element={<Home />}
                                />
                                <Route
                                    path={ROUTES.maintenanceBook.url}
                                    element={<MaintenanceBook />}
                                />
                                <Route
                                    path={ROUTES.maintenanceUpcoming.url}
                                    element={<MaintenanceUpcoming />}
                                />
                                <Route
                                    path={ROUTES.maintenanceHistory.url}
                                    element={<CompleteHistory />}
                                />
                                <Route
                                    path={ROUTES.listMaintenanceParts.url}
                                    element={<ListMaintenanceParts />}
                                />
                                <Route
                                    path={
                                        ROUTES.detailPart.url +
                                        generateParamsRoutes(
                                            ROUTES.detailPart,
                                            [],
                                            true
                                        )
                                    }
                                    element={<DetailPart />}
                                />
                                <Route
                                    path={
                                        ROUTES.maintenanceSave.url +
                                        generateParamsRoutes(
                                            ROUTES.maintenanceSave,
                                            [],
                                            true
                                        )
                                    }
                                    element={<UpdateMaintenance />}
                                />
                                <Route
                                    path={
                                        ROUTES.carSave.url +
                                        generateParamsRoutes(
                                            ROUTES.carSave,
                                            [],
                                            true
                                        )
                                    }
                                    element={<Car />}
                                />
                                <Route
                                    path={ROUTES.blog.url}
                                    element={<Blog />}
                                />
                                <Route
                                    path={ROUTES.article.url}
                                    element={<Article />}
                                />
                            </>
                        )}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    {console.log(currentCar)}
                    {console.log(location.pathname)}

                    {isAccessLoggedOk() &&
                        currentCar !== undefined &&
                        currentCar !== null &&
                        location.pathname !==
                            ROUTES.partsPrincipalInformation.url && <NavBar />}
                </>
            )}

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
            {/* <Car /> */}
            {/* <Login /> */}
            {/* <Register/> */}
        </>
    );
}

export default App;
