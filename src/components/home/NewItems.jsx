import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./NewItems.css";
import axios from "axios";
import NewItem from "../UI/NewItem";

const NewItems = () => {
  const { id } = useParams();
  const [newitems, setNewitems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?=${id}`
      );
      setNewitems(data);
      setLoading(false);
    }
    fetchNewItems();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: false,
    centerMode: false,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="fa fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="fa fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings} className="collections-carousel">
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="newitems" key={index}>
                    <div className="newitems__nftImage--skeleton"></div>
                    <div className="newitems__authorImage--skeleton"></div>
                    <div className="newitems__title--skeleton"></div>
                    <div className="newitems__code--skeleton"></div>
                  </div>
                ))
              : newitems.map((item) => (
                  <NewItem key={item.nftId} item={item} />
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;