import React from 'react';
import { Link } from 'react-router-dom';
import pizzaImg from '../Assets/pizza.jpg';
import './Homepage.css';

export default function Homepage() {
    return (
        <div className="home_wrapper">
            <h1 className="title">Lambda Eats</h1>
            <img className="pizzaImg" src={pizzaImg} alt="pizza" />
            <Link className="link" to="/Pizza">
                <button className="orderBtn">Order Now!</button>
            </Link>    
        </div>
    );
}
