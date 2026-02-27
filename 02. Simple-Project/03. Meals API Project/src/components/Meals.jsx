import axios from "axios";
import "../style.css"
import { useState } from 'react'
import { useEffect } from 'react';

const Meals = () => {
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood").then((res) => {
            // console.log(res.data.meals);
            setItems(res.data.meals)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const ItemsList = items.map(({strMeal, strMealThumb, idMeal}) => {
        return (
            <section className="card">
                <img src={strMealThumb} alt={strMeal} />
                <section className="content">
                    <p>{strMeal}</p>
                    <p>#{idMeal}</p>
                </section>
            </section>
        )
    })
  return (
    <div className="items-container">
        {ItemsList}
    </div>
  )
}

export default Meals