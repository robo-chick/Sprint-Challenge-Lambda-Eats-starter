import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import './Pizza.css';


const formSchema = yup.object().shape({
    name: yup.string().min(2, "Name must be a minimum of 2 characters"),
    size: yup.string().oneOf(["S", "M", "L", "XL", "XXL", "Please Select a Size"]),
    how_many: yup.number().min(1).required("How many pies would you like?"),
    special_instructions: yup.string().required("Any instructions you'd like to add?")
});

// styling
let Background = styled.div` {
    background-color: slategrey;
    height: 100vh;
    overflow-y: hidden;
}`

export default function Pizza() {
    // state for form inputs
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        veggies: "",
        pepperoni: "",
        sausage: "",
        ham: "",
        pineapple: "",
        how_many: "",
        special_instructions: ""
    });

    // state for errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        veggies: "",
        pepperoni: "",
        sausage: "",
        ham: "",
        pineapple: "",
        how_many: "",
        special_instructions: ""
    });

    // submit button
    const [buttonDisable, setButtonDisable] = useState(true);

    // POST Request
    const [post, setPost] = useState();

    // Button activation
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisable(!valid);
        });
    }, [formState]);

    // Validation 
    function validate(e) {
        yup
            .reach(formSchema, (e.target.type === "radio" || e.target.type === "textarea") ? null : e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({...errors, [e.target.name]: ""});
            })
            .catch(err => {
                setErrors({...errors, [e.target.name]: err.errors[0]})
            });
    }

    // Change handler
    function inputChange(e) {
        e.persist();
        const newData = {
            ...formState,
            [e.target.name] : e.target.type === "radio" ? e.target.checked : e.target.value,
        };
        validate(e);
        setFormState(newData);
    }

    // post data on submit
    function submitForm(e) {
        e.preventDefault();
        axios   
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", res);

                setFormState({
                    name: "",
                    size: "",
                    veggies: "",
                    pepperoni: "",
                    sausage: "",
                    ham: "",
                    pineapple: "",
                    how_many: "",
                    special_instructions: ""
                });
            })
            .catch(err => console.log(err.res));
    }

    return (
       <Background>
           <NavLink to="/">Home</NavLink>

           <form onSubmit={submitForm}>
               <label htmlFor="Name">
                   Customer Name: 
                   <input
                   name="name"
                   value={formState.name}
                   onChange={inputChange}
                   />
               </label>
               <br />
               <label htmlFor="size">
                   Pizza Size:
                   <select name="size" onChange={inputChange}>
                       <option>Select your size</option>
                       <option value="S">S</option>
                       <option value="M">M</option>
                       <option value="L">L</option>
                       <option value="L">L</option>
                       <option value="XL">XL</option>
                       <option value="XXL">XXL</option>
                   </select>
                   {errors.size.length > 0 ? <p className="error">{errors.size}</p> : null}
               </label>
               <br />
               <label htmlFor="toppings" className="toppings">
                   <input
                   type="radio"
                   name="veggies"
                   checked={formState.veggies}
                   value={formState.veggies}
                   onChange={inputChange}
                   />
                   Veggies
               </label>
               <label htmlFor="toppings" className="toppings">
                   <input
                   type="radio"
                   name="pepperoni"
                   checked={formState.pepperoni}
                   value={formState.pepperoni}
                   onChange={inputChange}
                   />
                   Pepperoni
               </label>
               <label htmlFor="toppings" className="toppings">
                   <input
                   type="radio"
                   name="sausage"
                   checked={formState.sausage}
                   value={formState.sausage}
                   onChange={inputChange}
                   />
                   Sausage
               </label>
               <label htmlFor="toppings" className="toppings">
                   <input
                   type="radio"
                   name="ham"
                   checked={formState.ham}
                   value={formState.ham}
                   onChange={inputChange}
                   />
                   Ham
               </label>
               <label htmlFor="toppings" className="toppings">
                   <input
                   type="radio"
                   name="pineapple"
                   checked={formState.pineapple}
                   value={formState.pineapple}
                   onChange={inputChange}
                   />
                   Pineapple
               </label>
               <br />
               <label>
                   Special Instructions: 
                   <textarea 
                   type="textarea"
                   name="special_instructions"
                   value={formState.special_instructions}
                   onChange={inputChange} />
               </label>
               <label htmlFor="how_many"  onChange={inputChange}>
                   How many pies would you like?
                   <input className="how_many"
                   type="number"
                   name="how_many"
                   step="1"
                   value={formState.how_many}
                   onChange={inputChange} />
                   {errors.how_many === 0 ? (
                       <p className="error">{errors.how_many}</p>) : null}
               </label>
               <br />
               <pre>{JSON.stringify(post, null, 2)}</pre>
               <button disabled={buttonDisable}>Submit Order!</button>
           </form>
       </Background>
    );
}
