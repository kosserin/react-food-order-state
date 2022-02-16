import React from 'react';

import styles from './AvailableMeal.module.css';
import AvailableMealForm from './AvailableMealForm/AvailableMealForm';

const AvailableMeal = (props) => {

  const price = props.price.toFixed(2);

  const addItemHandler = (amount) => {
    props.onAddItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount
    })
  }

  return (
    <li className={styles['available-meal']} id={props.id}>
    <div className={styles['meal-text']}>
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
      <h3>${price}</h3>
    </div>
    <AvailableMealForm onAddItem={addItemHandler} />
    </li>
  )
}

export default AvailableMeal