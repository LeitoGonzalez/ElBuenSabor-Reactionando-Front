import Carousel from 'react-bootstrap/Carousel';

function Carrousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src='src/assets/images/hamburger2.jpeg' alt='hamburger' style={{maxHeight: "26rem", maxWidth:"100", width: "100vw", objectFit: "cover"}}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='src/assets/images/sanguche.jpg' alt='hamburger' style={{maxHeight: "26rem", maxWidth:"100", width: "100vw", objectFit: "cover"}}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='src/assets/images/pizza.jpg' alt='hamburger' style={{maxHeight: "26rem", maxWidth:"100", width: "100vw", objectFit: "cover"}}/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;