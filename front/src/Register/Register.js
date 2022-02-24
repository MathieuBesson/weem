import React, { useState } from "react";

import RegisterForm from "./RegisterForm"
import img from '../assets/car.webp'
import './Register.css'

const Register = (props) => {


    return(
        <div>
            <img src={img} className='login__img'/>
            <RegisterForm />
        </div>
    )

}

export default Register