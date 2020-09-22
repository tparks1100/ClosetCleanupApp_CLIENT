import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { updateClothing, showClothing } from '../../api/clothing'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const UpdateClothing = ({ msgAlert, user, match }) => {
  const [clothing, setClothing] = useState({ todaysDate: '', category: '', clothingDescription: '', isWorn: false, status: 'Pending' })
  // const [clothing, setClothing] = useState({ todaysDate: '', category: '', clothingDescription: '', isWorn: false, status: 'Pending' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showClothing(user, match.params.id)
      .then(res => {
        // This is a string: converting it into a date.
        const d = new Date(res.data.clothing.todaysDate)
        // Need to store the new date format of todaysDate into clothing.
        setClothing(prevClothing => {
          const updatedField = { todaysDate: d }
          // creating a new object from res.data.clothing and assigning our updated field to it
          const editedClothing = Object.assign({}, res.data.clothing, updatedField)
          return editedClothing
        })
      })
      .catch(console.error)
  }, [])

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
    updateClothing(user, clothing, match.params.id)
      .then(() => setUpdated({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Item Success',
        message: messages.updateClothingSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Update Item',
        message: messages.updateClothingFailure,
        variant: 'danger'
      }))
  }

  if (updated) {
    return <Redirect to='/clothes' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Update Item</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="todaysDate">
            <Form.Label>Select Date: </Form.Label> <br />
            <DatePicker
              selected={clothing.todaysDate}
              onChange={handleDateChange}
              name="todaysDate"
              dateFormat="MM/dd/yyyy"
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category: </Form.Label>
            <Form.Control as="select" custom name="category" value={clothing.category} onChange={handleChange}>
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
          <Form.Group id="formGridCheckbox">
            <Form.Check onChange={handleCheckbox} name="isWorn" type="checkbox" label="Worn?" value={clothing.isWorn} checked={clothing.isWorn} />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status: </Form.Label>
            <Form.Control as="select" custom name="status" value={clothing.status} onChange={handleChange}>
              <option value="" disabled hidden>Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Sell">Sell</option>
              <option value="Donate">Donate</option>
            </Form.Control>
          </Form.Group>
          <Button style={{ backgroundColor: '#d8d3cd', borderColor: '#797a7e', color: '#797a7e', borderRadius: '25px', margin: '10px' }} type="submit">Update</Button>
          <Link to='/clothes'>
            <Button style={{ backgroundColor: '#d8d3cd', borderColor: '#797a7e', color: '#797a7e', borderRadius: '25px', margin: '10px' }}>Cancel</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(UpdateClothing)
