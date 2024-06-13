import React, { useRef } from "react";
import "./gallery.css";

function Gallery() {
  const galleryRef = useRef(null);

  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="wrap">
      <img src="img/back.png" alt="back" id="backBtn" onClick={scrollLeft} />
      <div className="img-gallery" ref={galleryRef}>
        <div>
          <span id="span_img">
            <img src="img/1.jpg" alt="first" />
          </span>
          <span id="span_img">
            <img src="img/2.jpg" alt="" />
          </span>
          <span id="span_img">
            <img src="img/3.jpg" alt="" />
          </span>
          <span id="span_img">
            <img src="img/4.jpg" alt="" />
          </span>
          <span id="span_img">
            <img src="img/9.jpg" alt="" />
          </span>
        </div>
        <div>
          <span className="photo" id="span_img">
            <img src="img/5.jpg" alt="" />
          </span>
          <span id="span_img">
            <img src="img/6.jpg" alt="" />
          </span>
          <span id="span_img">
            <img src="img/7.jpg" alt="" />
          </span>
          <span id="span_img">
            <img src="img/8.jpg" alt="" />
          </span>
        </div>
      </div>

      <img src="img/front.png" alt="" id="nextBtn" onClick={scrollRight} />
    </div>
  );
}

export default Gallery;
