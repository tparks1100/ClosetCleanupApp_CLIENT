import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const Clothes = props => {
  const [clothes, setClothes] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/clothes`)
      .then(res => setClothes(res.data.clothes))
      .catch(console.error)
  }, [])

  const clothesJsx = clothes.map(clothing => (
    <li key={clothing._id}>
      <Link to={`/clothes/${clothing._id}`}>{clothing.clothingDescription}</Link>
    </li>
  ))

  return (
    <div>
      <h4>Clothes</h4>
      <ul>
        {clothesJsx}
      </ul>
    </div>
  )
}

export default Clothes
