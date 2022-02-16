import React, {useRef} from 'react';

import styles from './AvailableMealForm.module.css';

const AvailableMealForm = (props) => {

  const amountInputRef = useRef();
  
  const amountFormHandler = e => {
    e.preventDefault();
    props.onAddItem(amountInputRef.current.value)
  }

  return (
    <form onSubmit={amountFormHandler}>
    <div className={styles['form-group']}>
      <label>Amount:</label>
      <input ref={amountInputRef} type="number" min="1" max="5" defaultValue = "1" />  
    </div>
    <button type='submit'>Add</button>
    </form>
  )
}

export default AvailableMealForm