import { useRef } from "react"
import { useFoods } from "../FoodContext";

export default function SearchInput(){
    const searchQuery = useRef();
    const { setRenderedFoods, foods } = useFoods();
    function handleSubmit(e){
        e.preventDefault();
        setRenderedFoods(foods.filter(foo => { 
            if (!foo.name) return false;
            console.log(foo.name.includes(searchQuery.current.value));
            return foo.name.toLowerCase().includes(searchQuery.current.value.toLowerCase())
        }))
        console.log(e)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input ref={searchQuery} className="searchinput" placeholder="Search"/>

        </form>
    )
}