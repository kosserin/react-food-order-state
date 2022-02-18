import React, {useState, useEffect} from 'react';
import reactDom from 'react-dom';
import AvailableMeals from './components/AvailableMeals/AvailableMeals';
import FoodBox from './components/FoodBox/FoodBox';
import FormOrder from './components/FormOrder/FormOrder';
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

const modalDomStore = document.getElementById('modal-root');
const formOrderDomStore = document.getElementById('form-order-root');

const App = () => {

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [totalItemsAmount, setTotalItemsAmount] = useState(0);
  const [totalPriceAmount, setTotalPriceAmount] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState ([]);
  const [availableMeals, setAvailableMeals] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://react-available-meals-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
    if(!response.ok){
      console.log('Request failed!');
    }
    const data = await response.json();
    console.log(data)
    
    const loadedMeals = [];

    for(const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        desc: data[key].desc,
        price: data[key].price
      })
    }

    setAvailableMeals(loadedMeals)


    } catch(err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData(); 
  }, [])

  useEffect(() => {
    if(selectedMeals.length === 0){
      return
    }
    setTotalItemsAmount(selectedMeals.map(meal => parseInt(meal.amount, 10)).reduce((a,b) => a + b ));
  }, [selectedMeals])
  
  const showModalHandler = () => {
    setShowModal(true);
  }
  
  const showFormHandler = () => {
    setShowForm(true);
  }

  const hideModalHandler = () => {
    setShowModal(false);
  }

  const hideFormHandler = () => {
    setShowForm(false);
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

  const paragraphStyles = {
    margin: '8rem auto 0 auto',
    textAlign: 'center',
    fontSize: '1.125rem',
    color: '#fefefe',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(0,0,0, .4)',
    width: 'fit-content',
    borderRadius: '3px',
    boxShadow: '0px 0px 15px rgba(0,0,0,.25)'
  }
  let content = <AvailableMeals meals={availableMeals} onAddItem={addItemHandler} />

  if(availableMeals.length === 0){
    content = <p style={paragraphStyles}>No meals available. Please try later.</p>
  }
  if(isLoading) {
    content = <p style={paragraphStyles}>Loading...</p>
  }
  if(error) {
    content = <p style={paragraphStyles}>{error}</p>
  }

  
  return (
    <React.Fragment>
    {showForm && reactDom.createPortal( <FormOrder onHideForm={hideFormHandler} totalPriceAmount={totalPriceAmount} selectedMeals={selectedMeals} />, formOrderDomStore)}
    {showModal && reactDom.createPortal(<Modal selectedMeals={selectedMeals} totalPriceAmount={totalPriceAmount} onHideModal={hideModalHandler} onAddItem={addItemHandler} onRemoveItem={removeItemHandler} onShowForm={showFormHandler} />, modalDomStore)}
      <Header onShowModal={showModalHandler} totalItemsAmount={totalItemsAmount} />
      <main>
        <FoodBox />
        {content}
      </main>
    </React.Fragment>
  );
}

export default App;
