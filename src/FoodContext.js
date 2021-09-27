import { createContext, useContext, useState } from "react";
import { foodDatabase } from "./fooddb";

export const useFoods = () => useContext(FoodContext)
export const FoodContext = createContext()

export const FoodProvider = ({children}) => {
    
    const [foods, setFoods] = useState(foodDatabase);
    const [renderedFoods, setRenderedFoods] = useState(foodDatabase);
    const [renderedUserFoods, setRenderedUserFoods ] = useState([])
    const [foodType, setFoodType] = useState('fruits')
    const value = {
        foods,
        setFoods,

        renderedFoods,
        setRenderedFoods,

        foodType, 
        setFoodType,

        renderedUserFoods,
        setRenderedUserFoods
    }
    return (
        <FoodContext.Provider value={value}>
            {children}
        </FoodContext.Provider>
    )
}