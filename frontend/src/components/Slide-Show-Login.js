import React, { useEffect } from 'react';

export default function IntroImages(props) {
  useEffect(() => {
    // Initialize the carousel
    const carousel = new window.bootstrap.Carousel(document.getElementById('carouselExampleFade'), {
      interval: 3000, // Time to wait before transitioning (3000ms = 3 seconds)
      ride: 'carousel', // This ensures it automatically starts
    });

    // Start carousel on mount
    carousel.cycle();
  }, []);

  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ width: '100%', height: '100vh', objectFit: 'cover' }}>
            <video className="d-block w-100" autoPlay loop muted>
              <source src={props.img1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="carousel-item" style={{ width: '100%', height: '100vh', objectFit: 'cover' }}>
            <video className="d-block w-100" autoPlay loop muted>
              <source src={props.img2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="carousel-item" style={{ width: '100%', height: '100vh', objectFit: 'cover' }}>
            <video className="d-block w-100" autoPlay loop muted>
              <source src={props.img3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
