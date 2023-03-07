import React, { useState, useEffect } from 'react';
import WishList from './components/WishList';
import WishForm from './components/WishForm';
import './App.css'

function App() {

  const loadWishesFromLocalStorage = () => {
    const localWishes = localStorage.getItem("wishes");
    return localWishes ? JSON.parse(localWishes) : [];
  };  

  const [wishes, setWishes] = useState(loadWishesFromLocalStorage());
  const [displayWishes, setDisplayWishes] = useState(loadWishesFromLocalStorage());
  const [selectedSort, setSelectedSort] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");


  function SortArray(prevArr, sortType) {
    switch (sortType) {
       case "all":
        return prevArr;
       
       case "priority":
        return prevArr.sort((a,b) => a.priority - b.priority);
      
        case "+priority":
          return prevArr.sort((a,b) => b.priority - a.priority);
            
        default:
          return prevArr;
    }
  }

  function FilterArray(prevArr, filterType) {
  
    switch (filterType) {
      case "all":
        return prevArr;
      
        case "isChecked":
          return prevArr.filter(el =>( el.isChecked == false));
      

        case "+isChecked":
          return prevArr.filter(el =>( el.isChecked == true));
        
    
        default:
          return prevArr;
    }
  }

  const wish = {
    _id: 0,
    isChecked: true,
    text: "asdasd",
    priority: 1,
  }

  useEffect(() => {
    console.log(wishes);
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);  

  useEffect(() => {
    let filteredArray = FilterArray(wishes, selectedFilter)
    let sortedArray  = SortArray(filteredArray, selectedSort)
   
    setDisplayWishes(sortedArray);
  }, [selectedSort, wishes, selectedFilter]);  
  
  const saveWishesToLocalStorage = (wishes) => {
    localStorage.setItem("wishes", JSON.stringify(wishes));
  };  

  const addWish = (wish) => {
    const newWishes = [...wishes, wish];
    setWishes(newWishes);
    saveWishesToLocalStorage(newWishes);
  };    

  const deleteWish = (id) => {
    let newWishes = [...wishes];
    newWishes = newWishes.filter(el => el.id !== id);
    setWishes(newWishes);
    saveWishesToLocalStorage(newWishes);
  };  
  
  const editWish = (id, newText, newChecked, newPriority) => {
    console.log(id, newText, newChecked, newPriority)
    const newWishes = [...wishes];
    const ind = newWishes.findIndex(el => el.id === id);
    if(ind === -1 ) {return}
    newWishes[ind].text = newText;
    newWishes[ind].isChecked = newChecked;
    newWishes[ind].priority = newPriority;

    setWishes(newWishes);
    saveWishesToLocalStorage(newWishes);
  };  

  return (
    <div className="App">
      <h1>Wish List</h1>
      <WishForm onAdd={addWish} />
      <div className='sort-container'>
      <select className='select' value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
            <option value="all" label="All priorities"> see all</option>
            <option value="priority" label="priority asc"> priority asc</option>
            <option value="+priority" label="priority desc"> priority desc</option>
      </select>
      <select className='select filter' value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="all" label="All statuses"> see all</option>
            <option value="isChecked" label="Active"> not checked</option>
            <option value="+isChecked" label="Done"> checked</option>
      </select>
      </div>
      <WishList wishes={displayWishes} onDelete={deleteWish} onEdit={editWish} />
    </div>
  );
}

export default App;
