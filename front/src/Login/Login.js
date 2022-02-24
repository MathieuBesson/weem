import React, { useState } from "react";

import LoginForm from "./LoginForm"
import img from '../assets/car.webp'
import './Login.css'

const Login = (props) => {
    // const [courseGoals, setCourseGoals] = useState([
    //     { text: 'Do all exercises!', id: 'g1' },
    //     { text: 'Finish the course!', id: 'g2' }
    //   ]);

    // const addGoalHandler = enteredText => {
    //     setCourseGoals(prevGoals => {
    //       const updatedGoals = [...prevGoals];
    //       updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
    //       return updatedGoals;
    //     });
    //   };

    //   if (courseGoals.length > 0) {
    //     content = (
    //       <CourseGoalList items={courseGoals}/>
    //     );
    //   }

    return(
        <div>
            <img src={img} className='login__img'/>
            <LoginForm />
        </div>
    )

}

export default Login