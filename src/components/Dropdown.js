// import { useState } from "react";
import { useFoods } from "../FoodContext";

export default function DropDown(){
    const { setFoodType, foods, setRenderedFoods } = useFoods();
    const handleSelectChange = e => {
        if (e.target.value === "all") return setRenderedFoods(foods)
        console.log("handled change" + e.target.value)
        setFoodType(e.target.value);
        
        setRenderedFoods(foods.filter(food => {
            console.log("Food Type" + food.type);
            console.log('Correct' + e.target.value )
            return food.type === e.target.value
        }))
    }
    return (
        <select 
        className="foodtype-dropdown" 
        name="foods" 
        id="foodtype-select" 
        onChange={handleSelectChange}
        >
            <option value="all">All Foods</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="junk food">Junk Food</option>
            <option value="drinks">Drinks</option>
        </select>
    )
}