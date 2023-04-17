import { useEffect, useState } from 'react'
import LocationInfo from './LocationInfo'
import ResidentCard from './ResidentCard'
import './styles/mainContent.css'
import Pagination from './Pagination'

const MainContent = ({location, newlocation}) => {

  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(10);
  const [input, setInput] = useState(1);
  const max = location?.residents.length / forPage;
  

  return (
    <>
      <LocationInfo location={location} />
      <div className='resident-container'>
        {
          location?.residents.slice(
            (page - 1) * forPage,
            (page - 1) * forPage + forPage
          ).map(url => (
            <ResidentCard key={url} url={url} />
          ))
        }
      </div>
      <Pagination page={page} setPage={setPage} max={max} inputReset={input} newlocation={newlocation}/>
    </>
  )
}

export default MainContent