import React, { useState, useEffect } from 'react'
import { viewClothes } from '../../api/clothing'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBIcon } from 'mdbreact'

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
  // const timestampFormation = new Date('mm/dd/yyyy').getTime()
  if (clothes) {
    clothesToRender = clothes.map(clothing => {
      return <div key={clothing._id}>
        <div className="viewClothing mt-5 p-5">
          <Container>
            <MDBCol col='4'>
              <MDBCard wide>
                <MDBCardImage
                  className='view view-cascade gradient-card-header peach-gradient'
                  cascade
                  tag='div'
                >
                  <h2 className='h2-responsive mb-2'>{clothing.category}</h2>
                  <p>
                    <MDBIcon icon='calendar-alt' /> {clothing.createdAt}
                  </p>
                </MDBCardImage>
                <MDBCardBody cascade className='text-center'>
                  <MDBCardText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam
            dignissimos neque rem nihil ratione est placeat vel, natus non
            quos laudantium veritatis sequi.Ut enim ad minima veniam, quis
            nostrum.
                  </MDBCardText>
                  <a
                    href='!#'
                    className='orange-text mt-1 d-flex justify-content-end align-items-center'
                  >
                    <h5 className=''>
            Read more{' '}
                      <MDBIcon
                        icon='chevron-right'
                        className='ml-2'
                        size='sm'
                      ></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <Row>
              <Col xl={{ span: 12, offset: 3 }}>
                <Card style={{ backgroundColor: '#e0ece4', width: '35rem', margin: '10px', opacity: '100%' }}>
                  <Card.Header as="h5" style={{ backgroundColor: '#f7f2e7' }}>Clothing Item 👚👖👕👞👡🩳👗🧢👟</Card.Header>
                  <Card.Body>
                    <Card.Title>Category:{clothing.category}</Card.Title>
                    <Card.Subtitle>Clothing Description: {clothing.clothingDescription}</Card.Subtitle>
                    <Card.Text>
                      Worn <input name="isWorn" type="checkbox" label="Worn?" checked={clothing.isWorn} disabled /> <br />
                      Status: {clothing.status} <br />
                      <Button style={{ backgroundColor: '#d8d3cd', borderColor: '#797a7e', color: '#e0ece4', borderRadius: '25px', margin: '10px' }} onClick={() => destroy(clothing._id)}>Delete Item</Button>
                      <Link to={`/update-clothing/${clothing._id}`}>
                        <Button style={{ backgroundColor: '#d8d3cd', borderColor: '#797a7e', color: '#e0ece4', borderRadius: '25px', margin: '10px' }}>Update Item</Button>
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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
