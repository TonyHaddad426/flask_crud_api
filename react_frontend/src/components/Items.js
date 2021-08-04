import React, {useState} from 'react'
import Item from "./Item";
import "./Items.css";
import Filter from './Filter'
function Items(props) {
    const [priceFilter, setPriceFiler] = useState('')
    const priceFilterChangedHandler = (selectedPriceFilter) => {
        setPriceFiler(selectedPriceFilter)
    }
    console.log(priceFilter)
    let filteredItems = props.items;

    if (priceFilter === "Asc") {
       filteredItems = props.items.sort((a,b) => a.item_price - b.item_price)
    } 
    if (priceFilter === "Desc") {
        filteredItems =  props.items.sort((a,b) => b.item_price - a.item_price)
    } 
    
    
  return (
    <div className="items">
        <Filter selected ={priceFilter} onChangeFilter={priceFilterChangedHandler}/>
      {
        /* the map method takes an array and executes a function on each item within that array */
        filteredItems.map((item) => (
          <Item
            key={item.store_id+item.item_name}
            store={item.store_name}
            title={item.item_name}
            amount={item.item_price}
          />
        ))
      }
    </div>
  );
}

export default Items;
