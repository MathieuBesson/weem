import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "./../../utils/api";

// Pictures
import wheel from "./../../assets/images/icons/wheel.svg";

// Components
import ButtonIcon from "./../../components/ButtonIcon";
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import InvoicePreview from './../../components/InvoicePreview'
import BlogPreview from "./../../components/BlogPreview"
import NavBar from "./../../components/NavBar"

const Home = () => {

    const user = useSelector((state) => state.user.datas);
    // const currentCar = useSelector((state) => state.currentCar);
    // const [isLaunchRequestCarParts, setIsLaunchRequestCarParts] = useState(false);

    // const carPartList = useFetch({
    //     endpoint: "carParts",
    //     launchRequest: isLaunchRequestCarParts,
    //     dataQuery: {
    //         keyValue: {
    //             "car.id": currentCar?.id ?? null,
    //             count: 3,
    //         },
    //     },
    // });

    // useEffect(() => {
    //     setIsLaunchRequestCarParts(true)
    // }, [currentCar]);


    // console.log(carPartList)
    return (
        <main className="home">
            <header className="home__header d-flex justify-content-between">
                <h2 className="home__header-title">
                    <span>Bonjour,</span>
                    <span className="green">{user?.name}</span>
                </h2>
                <div className="d-flex align-items-center">
                    <ButtonIcon icon={wheel} theme="light" />
                </div>
            </header>
            <button className="btn btn-secondary w-100">
                Ajouter un nouveau changement
            </button>
            <MaintenanceUpcomingPreview />
            <InvoicePreview carPartNames={['Pneus avants', 'Filtre à air']}/>
            <BlogPreview />
            <NavBar />
        </main>
    );
};

export default Home;
