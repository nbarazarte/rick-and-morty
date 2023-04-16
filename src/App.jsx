import { useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomLocation from './utils/getRandomLocation';
import MainContent from './components/MainContent';

function App() {

  const [inputValue, setInputValue] = useState(getRandomLocation())

  const url = `https://rickandmortyapi.com/api/location/${inputValue}`

  const [location, hasError] = useFetch(url)

  if (location){
    console.log(location);
  }
  
  const inputLocation = useRef()

  const handleSumit = event => {
    event.preventDefault()
    setInputValue(inputLocation.current.value)
  }

  return (
    <div className="app">
      <h1 className='app__title'>Rick and Morty</h1>

      <form className='app__form' onSubmit={handleSumit}>
        <input className='app__input' ref={inputLocation} type="text" />
        <button className='app__btn'>search</button>
      </form>

      {
        !hasError ?
        <MainContent location={location}/>
        : <h2 className='app__error'>❌ Hey! you must provide an id from 1 to 126😭</h2>
      }
      
    </div>

  )
}

export default App
