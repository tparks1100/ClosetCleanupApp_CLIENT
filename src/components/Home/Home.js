import React from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from 'mdbreact'
import styles from './Home.css'

const Home = () => {
  return (
    <MDBContainer>
      <div className={styles.homeStyles}>
        <h1>Welcome to ClosetCleanup! Your closet organizer app. </h1>
        <br />
        <p> Do you ever stare at your closet, and see a bunch of clothes you have not worn in a very long time, or even considered wearing? We all know how hard it is to part ways with clothing that you have so many memories with. This app allows you to add some logic into your decision, and show you how many days it has been since you have last worn an article of clothing!</p>
        <br />
        <br />
        <h4>Sign up, or log in to start organizing!</h4>
        <br />
        <br />
      </div>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1 thula-carousel"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100 thula-image"
                src="https://i.imgur.com/Ka2Iyv4.jpg"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://i.imgur.com/9DvrYff.jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://i.imgur.com/CXuLA3O.jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  )
}

export default Home
