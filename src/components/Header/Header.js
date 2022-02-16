import React from 'react';
import { FaShoppingBag } from '../../../node_modules/react-icons/fa'

import styles from './Header.module.css'

const Header = (props) => {
  return (
    <header>
    <nav>
    <a href="#">KossMeal</a>
    <button onClick={props.onShowModal}>
      <span><FaShoppingBag /></span>
      <span>Orders</span>
      <span>{props.totalItemsAmount}</span>
    </button>
    </nav>
    </header>
  )
}

export default Header