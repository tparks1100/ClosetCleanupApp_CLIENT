import React, { useState, useEffect } from 'react'
import { viewClothes } from '../../api/clothing'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBIcon } from 'mdbreact'
import styles from '../Header/Header.css'
import moment from 'moment'

const Clothes = ({ msgAlert, user, match }) => {
  const [clothes, setClothes] = useState([])
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    viewClothes(user, clothes)
      .then(res => {
        console.log(res.data.clothes)
        setClothes(res.data.clothes)
      })
      .catch(console.error)
  }, [deleted])
  const destroy = (id) => {
    axios({
      url: apiUrl + `/clothes/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => setDeleted(id))
      .then(() => msgAlert({
        heading: 'Delete Clothing from Closet Success',
        message: messages.deleteClothingSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Delete Clothing from Closet Failure',
        message: messages.deleteClothingFailure,
        variant: 'danger'
      }))
  }
  let clothesToRender
  if (clothes) {
    clothesToRender = clothes.map(clothing => {
      return <div key={clothing._id}>
        <div className="viewClothing mt-5 p-5">
          <Container>
            <MDBCol col='4'>
              <MDBCard wide>
                <MDBCardImage
                  className= {styles.navbarBackground}
                  cascade
                  tag='div'
                >
                  <Card.Header as="h5" className= {styles.navbarBackground}>Clothing Item 👚👖👕👞👡🩳👗🧢👟</Card.Header>
                </MDBCardImage>
                <MDBCardBody cascade className='text-center'>
                  <h2 className='h2-responsive mb-2'>{clothing.category}</h2>
                  <p>
                    <MDBIcon icon='calendar-alt' /> {moment(clothing.todaysDate).format('MM-DD-YYYY')}
                  </p>
                  {clothing.clothingDescription} <br />
                  <br />
                  Worn <input name="isWorn" type="checkbox" label="Worn?" checked={clothing.isWorn} disabled /> <br />
                  <br />
                  Status: {clothing.status} <br />
                  <br />
                  <MDBIcon icon='trash' onClick={() => destroy(clothing._id)}></MDBIcon>
                  <Link to={`/update-clothing/${clothing._id}`} className='mt-1 d-flex justify-content-end align-items-center'>
                    <h5 className='' style={{ color: '#797a7e' }}>
            Update Item{' '}
                      <MDBIcon
                        style={{ color: '#797a7e' }}
                        icon='chevron-right'
                        className='ml-2'
                        size='sm'
                      ></MDBIcon>
                    </h5>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </Container>
        </div>
      </div>
    })
  }
  return (
    <div>
      <div className="">
        <div>
          {clothesToRender}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Clothes)
