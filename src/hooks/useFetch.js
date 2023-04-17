import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const useFetch = (url) => {

    const [state, setState] = useState()
    const [hasError, setHasError] = useState(false)

    useEffect(() => {

        axios.get(url)
            .then(res => {
                //console.log(res.data);
                setState(res.data)
                setHasError(false)
            })
            .catch(err => {
                //console.log(err)
                setHasError(true)
            })

    }, [url])

    return [state, hasError]
}

export default useFetch