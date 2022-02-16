import React from 'react';

import styles from './FoodBox.module.css';

const FoodBox = () => {
  return (
    <div className={styles['food-box']}>
      <h1>Food you love,</h1>
      <h1>Food we serve.</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet natus voluptas dicta! Eum velit neque nisi nesciunt sapiente rem eos illum tempore, officia atque ad? <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ullam! Ex vitae quia eaque enim mollitia labore similique accusantium, saepe ab quaerat nam officiis deleniti.</p>
    </div>
  )
}

export default FoodBox