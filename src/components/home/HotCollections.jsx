import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

const HotCollections = () => {
  const { id } = useParams();
  const [hotcollections, setHotcollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotCollections() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?=${id}`
        );

        setHotcollections(data);
      } finally {
        setLoading(false);
      }
    }

    fetchHotCollections();
  }, [id]);

  /**
   * react-slick adds aria-hidden="true" to slides that are not currently
   * visible. Those slides can still contain focusable links, which causes
   * an accessibility violation.
   *
   * Make elements inside aria-hidden slides unfocusable.
   */
  const updateSlideAccessibility = () => {
    const slider = document.querySelector(".collections-carousel");

    if (!slider) return;

    const slides = slider.querySelectorAll(".slick-slide");

    slides.forEach((slide) => {
      const isHidden = slide.getAttribute("aria-hidden") === "true";
      const focusableElements = slide.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]'
      );

      focusableElements.forEach((element) => {
        if (isHidden) {
          // Store the original tabindex so it can be restored later.
          if (!element.hasAttribute("data-original-tabindex")) {
            const originalTabIndex = element.getAttribute("tabindex");

            element.setAttribute(
              "data-original-tabindex",
              originalTabIndex ?? "0"
            );
          }

          element.setAttribute("tabindex", "-1");
        } else {
          const originalTabIndex = element.getAttribute(
            "data-original-tabindex"
          );

          if (originalTabIndex !== null) {
            if (originalTabIndex === "0") {
              element.removeAttribute("tabindex");
            } else {
              element.setAttribute("tabindex", originalTabIndex);
            }

            element.removeAttribute("data-original-tabindex");
          }
        }
      });
    });
  };

  useEffect(() => {
    // Give react-slick time to render its slides and set aria-hidden.
    const timeout = setTimeout(updateSlideAccessibility, 0);

    return () => clearTimeout(timeout);
  }, [hotcollections, loading]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: false,
    centerMode: false,

    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="fa fa-angle-left" aria-hidden="true"></i>
        <span className="sr-only">Previous slide</span>
      </button>
    ),

    nextArrow: (
      <button type="button" className="slick-next">
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <span className="sr-only">Next slide</span>
      </button>
    ),

    afterChange: () => {
      // react-slick updates aria-hidden after changing slides.
      requestAnimationFrame(updateSlideAccessibility);
    },

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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider {...settings} className="collections-carousel">
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="hotcollections" key={index}>
                    <div className="hotcollections__nftImage--skeleton"></div>
                    <div className="hotcollections__authorImage--skeleton"></div>
                    <div className="hotcollections__title--skeleton"></div>
                    <div className="hotcollections__code--skeleton"></div>
                  </div>
                ))
              : hotcollections.map((item, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt={`${item.title} creator`}
                          />
                        </Link>

                        <i
                          className="fa fa-check"
                          aria-hidden="true"
                        ></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h3>{item.title}</h3>
                        </Link>

                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;