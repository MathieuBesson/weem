import react, { useState } from "react";

import carburant from '../assets/activity.svg'

import './DataCar.css'

const DataCar = () => {
    return(

        <div>
            <h2><a> Renseignements du <br/> véhicule</a></h2>


            <form>

                <input
                    type="text"
                    placeholder="Modèle"
                />

                <input
                    type="text"
                    placeholder="Numéro d'immatriculation"
                />
                <input
                    type="date"
                    placeholder="Mise en circulation"
                    value="Mise en circulation"
                />
                <input
                    type="number"
                    placeholder="Kilométrage du véhicule"
                />

                <div>
                    <div>Type de carburant</div>
                    {/* <input type="checkbox" > <img src={carburant}/> </input> */}
                    {/* <input type="checkbox" > ici </input>*/}

                    <ul>

                        <li>
                            <input type="radio" id="carburant1" />
                            <label for="carburant1"><img src={carburant} className="dataCar__carburant" /></label>
                        </li>

                        <li>
                            <input type="radio" id="carburant2" />
                            <label for="carburant2"><img src={carburant} className="dataCar__carburant" /></label>
                        </li>

                        <li>
                            <input type="radio" id="carburant3" />
                            <label for="carburant3"><img src={carburant} className="dataCar__carburant" /></label>
                        </li>

                        <li>
                            <input type="radio" id="carburant4" />
                            <label for="carburant4"><img src={carburant} className="dataCar__carburant" /></label>
                        </li>

                        <li>
                            <input type="radio" id="carburant5" />
                            <label for="carburant5"><img src={carburant} className="dataCar__carburant" /></label>
                        </li>

                    </ul>
                </div>



            </form>

        </div>

    )
}

export default DataCar