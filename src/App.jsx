import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomLocation from "./utils/getRandomLocation";
import MainContent from "./components/MainContent";
import axios from "axios";
import LoaderLocation from "./components/LoaderLocation";

function App() {
  const inputLocation = useRef();
  const [initiallocation, setInitiallocation] = useState(getRandomLocation());
  const [inputValue, setInputValue] = useState("");
  const [namelocations, setNamelocations] = useState();
  const [newlocation, setNewlocation] = useState(0);

  //1.- Inicio buscando una locacion aleatoria:
  let url = `https://rickandmortyapi.com/api/location/${initiallocation}`;
  const [apiurl, setApiurl] = useState(url);

  //2.- Creo un estado con el nombre que este en el input:
  const handleSearchByName = () => {
    document.getElementById("listLocationContent").style.display = "inline";
    document.getElementById("listLocations").style.visibility = "visible";
    setInputValue(inputLocation.current.value);
  };

  //2.1 - Busco las locaciones por nombre y con el estado nameLocations creo una lista:
  useEffect(() => {
    if (inputValue != "") {
      const url = `https://rickandmortyapi.com/api/location?name=${inputValue}`;

      axios
        .get(url)
        .then((res) => {
          //console.log(res.data.results);
          setNamelocations(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inputValue]);

  //3.- Obtengo el id del nombre de la locacion seleccionada
  const handlerSelect = (e) => {
    let text = e.target.innerHTML;

    console.log(text);

    let id = Number(text.split("-")[0].split(" ").join(""));
    setNewlocation(id);
  };

  useEffect(() => {
    if (newlocation != 0) {
      let url = `https://rickandmortyapi.com/api/location/${newlocation}`;

      document.getElementById("inputSearch").value = "";
      document.getElementById("listLocationContent").style.display = "none";
      document.getElementById("listLocations").style.visibility = "hidden";

      setApiurl(url);
    }
  }, [newlocation]);

  const [location, hasError] = useFetch(apiurl);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewlocation(getRandomLocation());
    //setInputValue(inputLocation.current.value)
  };

  return (
    <>
      {location ? (
        <div className="app">
          <header className="app__header"></header>
          <h1 className="app__title">Rick and Morty</h1>

          <form className="app__form" onSubmit={handleSubmit}>
            <input
              id="inputSearch"
              className="app__input"
              ref={inputLocation}
              type="text"
              onChange={handleSearchByName}
              placeholder="Search by location's name"
            />
            <button className="app__btn">Reset</button>
          </form>

          <div id="listLocationContent">
            <ul id="listLocations" className="app__listLocations">
              {namelocations?.map((namelocation) => (
                <li
                  className="app__listNames"
                  key={namelocation.id}
                  onClick={handlerSelect}
                >
                  {`${namelocation.id} - ${namelocation.name}`}
                </li>
              ))}
            </ul>
          </div>
          {!hasError ? (
            <MainContent location={location} newlocation={newlocation} />
          ) : (
            <h2 className="app__error">
              ❌ Hey! you must provide an id from 1 to 126😭
            </h2>
          )}
        </div>
      ) : (
        <LoaderLocation />
      )}
    </>
  );
}

export default App;
