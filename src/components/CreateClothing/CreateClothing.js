import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
import { createClothing } from '../../api/clothing'
import messages from '../AutoDismissAlert/messages'

const CreateClothing = ({ msgAlert, user }) => {
  const [clothing, setClothing] = useState({ category: '' })
  const [createdClothingId, setCreatedClothingId] = useState(null)

  const handleChange = event => {
    event.persist()
    setClothing(prevClothing => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedClothing = Object.assign({}, prevClothing, updatedField)
      return editedClothing
    })
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
          <Form.Group controlId="category">
            <label>Category</label>
            <select onChange={handleChange} defaultValue={clothing.category}>
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
            </select>
          </Form.Group>
          <Button style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }} type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  )
}
// <Form.Group controlId="subject">
//   <Form.Label>Subject</Form.Label>
//   <Form.Control
//     required
//     name="subject"
//     value={devpost.subject}
//     type="text"
//     placeholder="Subject"
//     onChange={handleChange}
//   />
// </Form.Group>
// <label>Content</label>
// <InputGroup controlId="content">
//   <Form.Control
//     as="textarea"
//     required
//     name="content"
//     value={devpost.content}
//     type="text"
//     placeholder="Content"
//     rows="4"
//     onChange={handleChange}
//   />
// </InputGroup>

export default CreateClothing
