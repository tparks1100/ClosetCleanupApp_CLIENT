import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { updateClothing, showClothing } from '../../api/clothing'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateClothing = ({ msgAlert, user, match }) => {
  const [clothing, setClothing] = useState({ category: '', clothingDescription: '', isWorn: false, status: 'Pending' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showClothing(user, match.params.id)
      .then(res => setClothing(res.data.clothing))
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
    console.log(event)
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
          <Form.Group controlId="category" onChange={handleChange} value={clothing.category}>
            <Form.Label>Category: </Form.Label>
            <Form.Control as="select" custom name="category" defaultValue={clothing.category}>
              <option value="" disabled hidden>Select clothing category</option>
              <option value="accessories">Accessories</option>
              <option value="tshirt">T-Shirt</option>
              <option value="blouse">Blouse</option>
              <option value="jeans">Jeans</option>
              <option value="pants">Pants</option>
              <option value="shorts">Shorts</option>
              <option value="jacket">Jacket</option>
              <option value="sweater">Sweater</option>
              <option value="pullover">Pullover</option>
              <option value="longsleeve">Longsleeve T-Shirt</option>
              <option value="buttonup">Button Up</option>
              <option value="dress">Dress</option>
              <option value="shoes">Shoes</option>
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
