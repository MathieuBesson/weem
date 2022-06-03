import react, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../utils/api";
import moment from "moment";

import CostEstimationPart from "./../components/CostEstimationPart";

const CostEstimation = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const times = [3, 6, 12];

    const [total, setTotal] = useState(0);
    const [activeTime, setActiveTime] = useState(times[2]);

    const carPartList = useFetch({
        endpoint: "carPart",
        dataQuery: {
            keyValue: {
                "car.id": currentCar?.id ?? null,
                "futureChangeDate[strictly_before]": moment()
                    .add(activeTime, "M")
                    .format("YYYY-MM-DD"),
            },
        },
    });

    const countTotal = () => {
        setTotal(
            carPartList.data.reduce(
                (previousValue, currentValue) =>
                    previousValue +
                    (currentValue.carStandardPart.priceMin +
                        currentValue.carStandardPart.priceMax) /
                        2,
                0
            )
        );
    };

    const handleClickFilterTime = (time) => {
        setActiveTime(time);
        carPartList.setLaunchRequest(true);
    };

    useEffect(() => {
        if (currentCar !== null) {
            carPartList.setLaunchRequest(true);
        }
    }, [currentCar]);

    useEffect(() => {
        console.log("do resuqresjhsdfgkjbhsdkjfbhkjgbjkhgb");
        if (carPartList.isSucceed === true) {
            carPartList.resetQuery();
            countTotal();
        }
    }, [carPartList.isSucceed]);

    return (
        <div className="cost-estimation">
            <h3 className="cost-estimation__title">
                Estimation des coûts à venir
            </h3>
            <ul className="cost-estimation__filters">
                {times.map((time, id) => (
                    <li
                        key={id}
                        onClick={() => handleClickFilterTime(time)}
                        className={`cost-estimation__filters-item ${
                            activeTime === time ? "active" : ""
                        }`}
                    >
                        D'ici {time} mois
                    </li>
                ))}
            </ul>

            <div className="cost-estimation__parts">
                {Object.keys(carPartList.data).length !== 0 &&
                    carPartList.data.map((carPart, id) => (
                        <CostEstimationPart key={id} carPart={carPart} />
                    ))}
            </div>
            <div className="cost-estimation__total d-flex justify-content-between">
                <span className="cost-estimation__total-content">Total</span>
                <span className="cost-estimation__total-cost">~{total}€</span>
            </div>
        </div>
    );
};

export default CostEstimation;
