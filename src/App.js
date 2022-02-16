import React, {useState, useEffect} from 'react';
import reactDom from 'react-dom';
import AvailableMeals from './components/AvailableMeals/AvailableMeals';
import FoodBox from './components/FoodBox/FoodBox';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Pljeskavica',
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: 18.99
  },
  {
    id: 'm2',
    name: 'Pomfrit',
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: 6.99
  },
  {
    id: 'm3',
    name: 'Pizza',
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: 10.99
  },
  {
    id: 'm4',
    name: 'Cevapi',
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    price: 23.99
  },
]

const modalDomStore = document.getElementById('modal-root')

const App = () => {

  const [showModal, setShowModal] = useState(false);
  const [totalItemsAmount, setTotalItemsAmount] = useState(0);
  const [totalPriceAmount, setTotalPriceAmount] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState ([]);

  useEffect(() => {
    if(selectedMeals.length === 0){
      return
    }
    setTotalItemsAmount(selectedMeals.map(meal => parseInt(meal.amount, 10)).reduce((a,b) => a + b ));
  }, [selectedMeals])
  
  const showModalHandler = () => {
    setShowModal(true);
  }

  const hideModalHandler = () => {
    setShowModal(false);
  }

  const addItemHandler = newMeal => {
    setTotalPriceAmount(prevTotal => {
      return prevTotal + +newMeal.price * +newMeal.amount
    })
    const existingMealIndex = selectedMeals.findIndex(meal => meal.id === newMeal.id);
    const existingMealItem = selectedMeals[existingMealIndex];
    if(existingMealIndex !== -1) {
      const updatedItem = {
        ...existingMealItem,
        amount: +existingMealItem.amount + +newMeal.amount
      }
      setSelectedMeals(prevMeals => {
        prevMeals[existingMealIndex] = updatedItem
        return [...prevMeals]
      })
    } else {
      setSelectedMeals(prevMeals => {
        return prevMeals.concat(newMeal);
      })
    }
  }

  const removeItemHandler = id => {
    const existingMealIndex = selectedMeals.findIndex(meal => meal.id === id);
    const existingMealItem = selectedMeals[existingMealIndex];
    setTotalPriceAmount(prevTotal => {
      return prevTotal - +existingMealItem.price
    })

    if(existingMealItem.amount == 1) {
      setSelectedMeals(prevMeals => {
        return prevMeals.filter(meal => meal.id !== id)
      })
      setTotalItemsAmount(0)
    } else {
      const updatedItem = {
        ...existingMealItem,
        amount: +existingMealItem.amount - 1
      }
      setSelectedMeals(prevMeals => {
        prevMeals[existingMealIndex] = updatedItem;
        return [...prevMeals]
      })
    }
  }

  
  return (
    <React.Fragment>
    {showModal && reactDom.createPortal(<Modal selectedMeals={selectedMeals} totalPriceAmount={totalPriceAmount} onHideModal={hideModalHandler} onAddItem={addItemHandler} onRemoveItem={removeItemHandler} />, modalDomStore)}
      <Header onShowModal={showModalHandler} totalItemsAmount={totalItemsAmount} />
      <main>
        <FoodBox />
        <AvailableMeals meals={DUMMY_MEALS} onAddItem={addItemHandler} />
      </main>
    </React.Fragment>
  );
}

export default App;
