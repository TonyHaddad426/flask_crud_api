import React from 'react'
import classes from './Filter.module.css' 

const Filter = (props) => {
    const dropDownChangedHandler = (event) => {
        props.onChangeFilter(event.target.value)
    }

    return (
        <div className={classes.filter}>
          <div className={classes.filter__control}>
            <label>Sort by Price</label>
            <select value={props.selected} onChange={dropDownChangedHandler}>
              <option value='Desc'>High to Low</option>
              <option value='Asc'>Low to High</option>
            </select>
          </div>
        </div>
      );
}

export default Filter; 