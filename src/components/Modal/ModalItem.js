import React from 'react';
import { FaPlusCircle, FaMinusCircle } from '../../../node_modules/react-icons/fa';

import styles from './ModalItem.module.css';

const ModalItem = (props) => {

  const addItemHandler = () => {
    props.onAddItem({
      id: props.id,
      name: props.name,
      price: props.price
    })
  }

  const removeItemHandler = () => {
    props.onRemoveItem(props.id)
  }

  return (
    <li id={props.id} className={styles['modal-item']}>
    <div className={styles['item-text']}>
      <h2>{props.name}</h2>
      <div className={styles['price-amount']}>
        <h3>${props.price}</h3>
        <span>x{props.amount}</span>
      </div>
    </div>
    <div className={styles['modal-item__buttons']}>
      <button onClick={addItemHandler}><FaPlusCircle /></button>
      <button onClick={removeItemHandler}><FaMinusCircle /></button>
    </div>
    </li>
  )
}

export default ModalItem