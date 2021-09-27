import { useEffect, useState } from "react";
import { useFoods } from "../FoodContext";
import Food from "./Food";

export default function UserFoods(){
    const {setFoods} = useFoods()
    const { renderedUserFoods, setRenderedUserFoods } = useFoods();
    const [totalCalories, setTotalCalories] = useState(0);
    function allowDrop(ev){
        ev.preventDefault();
    }
    useEffect(() => {
        console.log(renderedUserFoods)
    })
    
    function drop(e){
        e.preventDefault();
        const food = JSON.parse(e.dataTransfer.getData("food-item"));
        console.log(e.target)
        setFoods(prev => prev.filter(o => { 
            console.log(food.name);
            console.log(o.name)
            return o.name !== food.name
        }))
        // e.target.appendChild(document.getElementById(data))
        setRenderedUserFoods(prev => [...prev, food])
        setTotalCalories(prev => prev + food.calories)
        // document.querySelector(".userfoods-input").appendChild(document.getElementById(data))
        
    }
    return (
        <div className="userfoods" onDrop={drop} onDragOver={allowDrop}>
            <h5 className="userfoods-title">My Selection</h5>
            <div className="userfoods-input" >
                {totalCalories ? (
                    renderedUserFoods.map(foo => 
                    <Food 
                    key={foo.name}
                    label={foo.name}
                    img={foo.img} 
                    calories={foo.calories} 
                    isDrag={false}
                    /> 
                    )
                ): <div className="userfoods-placeholder">Drag and Drop Food Items here to view their total calories</div> }
                </div>
            <h5 className="userfoods-total-calories">{totalCalories} Total Calories</h5>
        </div>
    )
}