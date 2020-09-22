import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
import { createClothing } from '../../api/clothing'
import messages from '../AutoDismissAlert/messages'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const CreateClothing = ({ msgAlert, user }) => {
  const [clothing, setClothing] = useState({ todaysDate: '', category: '', clothingDescription: '', isWorn: false, status: 'Pending' })
  const [createdClothingId, setCreatedClothingId] = useState(null)

  const handleChange = event => {
    event.persist()
    setClothing(prevClothing => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedClothing = Object.assign({}, prevClothing, updatedField)
      return editedClothing
    })
  }

  const handleDateChange = date => {
    setClothing(prevClothing => {
      const updatedField = { todaysDate: date }
      const editedClothing = Object.assign({}, prevClothing, updatedField)
      return editedClothing
    })
  }

  const handleCheckbox = event => {
    event.persist()
    if (clothing.isWorn === false) {
      setClothing({ ...clothing, isWorn: true })
    } else {
      setClothing({ ...clothing, isWorn: false })
    }
  }
  const handleSubmit = event => {
    event.preventDefault()
    // const msgAlert = this.props
    createClothing(user, clothing)
      .then(res => setCreatedClothingId(res.data.clothing._id))
      .then(() => msgAlert({
        heading: 'Create New Clothing Item Success',
        message: messages.createClothingSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Create New Clothing Item: ',
        message: messages.createClothingFailure,
        variant: 'danger'
      }))
  }

  if (createdClothingId) {
    return <Redirect to='/clothes' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Add New Clothing Item</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="todaysDate">
            <DatePicker
              selected={clothing.todaysDate}
              onChange={handleDateChange}
              name="todaysDate"
              dateFormat="MM/dd/yyyy"
            />
          </Form.Group>
          <Form.Group controlId="category" onChange={handleChange} value={clothing.category}>
            <Form.Label>Category: </Form.Label>
            <Form.Control as="select" custom name="category" defaultValue={clothing.category}>
              <option value="" disabled hidden>Select clothing category</option>
              <option value="Accessories">Accessories</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Blouse">Blouse</option>
              <option value="Jeans">Jeans</option>
              <option value="Pants">Pants</option>
              <option value="Shorts">Shorts</option>
              <option value="Jacket">Jacket</option>
              <option value="Sweater">Sweater</option>
              <option value="Pullover">Pullover</option>
              <option value="Longsleeve">Longsleeve T-Shirt</option>
              <option value="Buttonup">Button Up</option>
              <option value="Dress">Dress</option>
              <option value="Shoes">Shoes</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="clothingDescription">
            <Form.Label>Clothing Desecription: </Form.Label>
            <Form.Control
              rows='4'
              as="textarea"
              required
              name="clothingDescription"
              value={clothing.clothingDescription}
              type="text"
              placeholder="Describe the item"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group id="formGridCheckbox" onChange={handleCheckbox}>
            <Form.Check name="isWorn" type="checkbox" label="Worn?" value={clothing.isWorn} />
          </Form.Group>
          <Form.Group controlId="status" onChange={handleChange}>
            <Form.Label>Status: </Form.Label>
            <Form.Control as="select" custom name="status" defaultValue={clothing.status}>
              <option value="" disabled hidden>Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Sell">Sell</option>
              <option value="Donate">Donate</option>
            </Form.Control>
          </Form.Group>
          <Button style={{ backgroundColor: '#d8d3cd', borderColor: '#797a7e', color: '#797a7e' }} type="submit">Add New Item to My Closet</Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateClothing
