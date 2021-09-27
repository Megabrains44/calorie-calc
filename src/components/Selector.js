import { useEffect, useState } from "react";
import { useFoods } from "../FoodContext";
import { ReactComponent as LeftArrowIcon} from '../svg/leftArrow.svg';
import { ReactComponent as RightArrowIcon } from '../svg/rightArrow.svg';
import DropDown from "./Dropdown";
import Food from "./Food";
import SearchInput from "./SearchInput";
// import AddItem from "./AddItem";

export default function Selector(){
    const { renderedFoods } = useFoods();
    const [isScroll, setIsScroll] = useState(true);
    useEffect(() => {
        const foodSelector = document.querySelector('.food-selector')
  
        document.querySelector('.food-selector, .food-selector *').addEventListener('wheel', e => {
            e.preventDefault();
            foodSelector.scrollLeft += e.deltaY / 2;
        }, {passive: false})
        if (renderedFoods.length <= 1){
            setIsScroll(false)
        } else {
            setIsScroll(true)
        }
      
    }, [renderedFoods, isScroll])
    function handlePageClick(dir = "left" ){
        const foodSelector = document.querySelector('.food-selector');
        switch (dir){
            case 'left':
                foodSelector.scrollLeft -= 50;
                break;
            case 'right':
                foodSelector.scrollLeft += 50;
                break;
            default: 
                foodSelector.scrollLeft += 0;
                break;
  
        }
    }
   
    
    return (
        <div className="food-selector-container">
            <DropDown />
            <SearchInput />
            {/* <AddItem /> */}
            
            <div className={`food-selector ${`overflow-${isScroll}`}`} >
            
                {renderedFoods.length ? (
                    renderedFoods.map(food => {
                        const name = food.name ? food.name : 'Unknown';
                        const img = food.img ? food.img : 'https://i.stack.imgur.com/y9DpT.jpg';
                        const calories = food.calories ? food.calories : 0;
                        return <Food key={name} img={img} label={name} calories={calories} drag={true}/>
            
                    })
                ) : (
                    <div className="noresults">There are no results available</div>
                )
            }
            </div>
            <div className="food-pagebuttons">
            <span className="food-pagebtn"><LeftArrowIcon onClick={() => handlePageClick('left')}/></span>
            <span className="food-pagebtn"><RightArrowIcon onClick={() => handlePageClick('right')}/></span>
            </div>
        </div>
      
    )
}