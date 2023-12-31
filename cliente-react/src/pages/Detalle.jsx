import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ejemplo from "../assets/ejemplo.jpg";

const Detalle = () => {

const responsive = {
    superLargeDesktop: {
          // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
        },
        desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
        },
        tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
        },
        mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
        }
    };
return (
    <div>
        <Carousel rswipeable={false}
    draggable={false}
    showDots={true}
    responsive={responsive}
  ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlay={this.props.deviceType !== "mobile" ? true : false}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    customTransition="all .5"
    transitionDuration={500}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    deviceType={this.props.deviceType}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px">
        <div><img src={ejemplo} alt="" /></div>
        <div><img src={ejemplo} alt="" /></div>
        <div><img src={ejemplo} alt="" /></div>
        <div><img src={ejemplo} alt="" /></div>
        <div><img src={ejemplo} alt="" /></div>
        <div><img src={ejemplo} alt="" /></div>
        </Carousel>;
    </div>
)
}

export default Detalle