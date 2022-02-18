import React, {useState} from 'react';
import { FaTimesCircle, FaCheckCircle } from '../../../node_modules/react-icons/fa'
import useInput from '../../hooks/use-input';

import styles from './FormOrder.module.css';

const FormOrder = (props) => {

   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const { 
      value: enteredNameholder,
      valueInputClasses: nameholderInputClasses,
      changeInputValueHandler: changeInputNameholderHandler,
      blurInputValueHandler: blurInputNameholderHandler,
      reset: nameholderInputReset

    } = useInput( value => value.trim() !== "" && value.length > 2 )

   const { 
      value: enteredCreditCard,
      valueInputClasses: creditCardInputClasses,
      changeInputValueHandler: changeInputCreditCardHandler,
      blurInputValueHandler: blurInputCreditCardHandler,
      reset: creditCardInputReset

    } = useInput( value => value.trim() !== "" && value.length > 2 )

   const { 
      value: enteredAddress,
      valueInputClasses: addressInputClasses,
      changeInputValueHandler: changeInputAddressHandler,
      blurInputValueHandler: blurInputAddressHandler,
      reset: addressInputReset

    } = useInput( value => value.trim() !== "" && value.length > 2 )

   const { 
      value: enteredExpireDate,
      valueInputClasses: expireDateInputClasses,
      changeInputValueHandler: changeInputExpireDateHandler,
      blurInputValueHandler: blurInputExpireDateHandler,
      reset: expireDateInputReset

    } = useInput( value => value.trim() !== "" && value.length > 2 )

   const { 
      value: enteredSecurityCode,
      valueInputClasses: securityCodeInputClasses,
      changeInputValueHandler: changeInputSecurityCodeHandler,
      blurInputValueHandler: blurInputSecurityCodeHandler,
      reset: securityCodeInputReset

    } = useInput( value => value.trim() !== "" && value.length > 2 )

    const price = props.totalPriceAmount.toFixed(2);

   const sendData = async () => {
       try {
          console.log(props.selectedMeals)
          setIsLoading(true);
          setError(null)
         const response = await fetch('https://react-form-store-default-rtdb.europe-west1.firebasedatabase.app/formData.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               enteredNameholder,
               enteredCreditCard,
               enteredAddress,
               enteredExpireDate,
               enteredSecurityCode,
               orderedMeals: props.selectedMeals,
               price: `$ ${price}`
            })
         })
  
         if (!response.ok) {
           throw new Error('Request failed!');
         }
  
         const data = await response.json();
         console.log(data)
       }
       catch (err) {
         setError(err.message || 'Something went wrong!');
       }
       setIsLoading(false);
    }

    const formOrderSubmitHandler = e => {
      e.preventDefault();
      sendData();
      nameholderInputReset();
      creditCardInputReset();
      addressInputReset();
      expireDateInputReset();
      securityCodeInputReset();
    }

    let content = <div className={styles.buttons}>
    <button onClick={props.onHideForm}><FaTimesCircle />  <span>Cancel</span></button>
    <button disabled={nameholderInputClasses || creditCardInputClasses || addressInputClasses || expireDateInputClasses || securityCodeInputClasses} type='submit'><FaCheckCircle /> <span>Pay now</span></button>
    </div>

    if(isLoading) {
       content = <p>Loading...</p>
    }
    if(error) {
       content = <p>{error}</p>
    }

  return (
    <React.Fragment>
    <div onClick={props.onHideForm} className={styles['form-order__background']}></div>
    <form onSubmit={formOrderSubmitHandler} className={styles['form-order']}>
     <div className={styles['form-group']}>
        <label className={(nameholderInputClasses) ? styles.invalid : styles.input}>Nameholder</label>
        <input required onBlur={blurInputNameholderHandler} onChange={changeInputNameholderHandler} className={nameholderInputClasses ? styles.invalid : styles.input} type="text" value={enteredNameholder} />
        </div>
     <div className={styles['form-group']}>
        <label className={creditCardInputClasses ? styles.invalid : styles.input}>Credit Card</label>
        <input required className={creditCardInputClasses ? styles.invalid : styles.input} onBlur={blurInputCreditCardHandler} onChange={changeInputCreditCardHandler} type="text" value={enteredCreditCard} />
        </div>
     <div className={styles['form-group']}>
        <label className={addressInputClasses ? styles.invalid : styles.input}>Address</label>
        <input required className={addressInputClasses ? styles.invalid : styles.input} onBlur={blurInputAddressHandler} onChange={changeInputAddressHandler} value={enteredAddress} type="text" />
        </div>
     <div className={styles['form-group']}>
        <label className={expireDateInputClasses ? styles.invalid : styles.input}>Expire Date</label>
        <input required className={expireDateInputClasses ? styles.invalid : styles.input} onBlur={blurInputExpireDateHandler} onChange={changeInputExpireDateHandler} value={enteredExpireDate} type="text" />
        </div>
     <div className={styles['form-group']}>
        <label className={securityCodeInputClasses ? styles.invalid : styles.input}>Security Code</label>
        <input required className={securityCodeInputClasses ? styles.invalid : styles.input} onBlur={blurInputSecurityCodeHandler} onChange={changeInputSecurityCodeHandler} value={enteredSecurityCode} type="text" />
        </div>
     <div className={styles['total-amount']}>
        <h2>Total amount:</h2>
        <h3>${price}</h3>
        </div>
     {content}
    </form>
    </React.Fragment>
  )
}

export default FormOrder