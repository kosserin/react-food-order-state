import React from 'react';

import AvailableMeal from './AvailableMeal'
import styles from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  return (
    <ul className={styles['available-meals']}>
    {props.meals.map((meal, index) => <AvailableMeal key={'meal' + index} id={'meal' + index} name={meal.name} desc={meal.desc} price={meal.price} onAddItem={props.onAddItem} />)}
    </ul>
  )
}

export default AvailableMeals