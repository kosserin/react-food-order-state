import React from 'react';
import { FaCheckCircle, FaTimesCircle } from '../../../node_modules/react-icons/fa'

import styles from './Modal.module.css';
import ModalItem from './ModalItem';


const Modal = (props) => {

  const price = props.totalPriceAmount.toFixed(2);
  
  const addItemHandler = item => {
    props.onAddItem({...item, amount: 1});
  }
  
  const removeItemHandler = id => {
    props.onRemoveItem(id);
  }

  return (
    <React.Fragment>
        <div onClick={props.onHideModal} className={styles['background-modal']}></div>
        <div className={styles['inner-modal']}>
           {props.selectedMeals.length === 0 ? <p>You didn't choose any meal. Please go back and choose what you would love to eat.</p> : <ul className={styles['modal-list']}>
           {props.selectedMeals.map(meal => <ModalItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} amount={meal.amount} onAddItem={addItemHandler} onRemoveItem={removeItemHandler} />)}
           </ul>} 
           <div className={styles['total-amount']}>
             <h2>Total Amount: </h2>
             <h3>${price}</h3>
           </div>
           <div className={styles.buttons}>
             <button onClick={props.onHideModal}><FaTimesCircle /><span>Close</span></button>
             <button disabled={props.selectedMeals.length === 0} onClick={props.onShowForm}><FaCheckCircle /><span>Order</span></button>
           </div>
        </div>
    </React.Fragment>
  )
}

export default Modal