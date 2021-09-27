export default function Food({img, label="Text", calories=0, isDrag = true}){
    

    function drag(e){
        if (!isDrag) return;
        console.log('drag')
        e.dataTransfer.setData("food-item", JSON.stringify({img, name: label, calories}));
        console.log(e.dataTransfer);
    }

    
    
    return (
      <div onDragStart={drag} id={`food-${label}`} className="food-item" draggable={isDrag}>
        <p className="food-calories">{calories}</p>
        <img className="food-img" src={img} alt={label} />
        <p className="food-name">{label}</p>
      </div>
    )
}