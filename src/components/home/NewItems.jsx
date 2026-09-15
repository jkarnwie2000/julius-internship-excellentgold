import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./NewItems.css";
import axios from "axios";
import NewItem from "../UI/NewItem";

const NewItems = () => {
  const { id } = useParams();
  const [newitems, setNewitems] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?=${id}`
        );

        setNewitems(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewItems();
  }, [id]);

  /**
   * react-slick adds aria-hidden="true" to slides that are not visible.
   *
   * A hidden slide must not contain keyboard-focusable elements.
   * This function changes focusable elements inside hidden slides to
   * tabindex="-1", while restoring their original tabindex when visible.
   */
  const updateSlideAccessibility = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const slides = slider.querySelectorAll(".slick-slide");

    slides.forEach((slide) => {
      const isHidden = slide.getAttribute("aria-hidden") === "true";

      const focusableElements = slide.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]'
      );

      focusableElements.forEach((element) => {
        if (isHidden) {
          // Save the original tabindex only once.
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

  /**
   * Run after the component has rendered.
   */
  useEffect(() => {
    if (loading) return;

    const timeout = setTimeout(() => {
      updateSlideAccessibility();
    }, 0);

    return () => clearTimeout(timeout);
  }, [newitems, loading]);

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
      // Wait until react-slick has updated aria-hidden.
      requestAnimationFrame(() => {
        updateSlideAccessibility();
      });
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div ref={sliderRef}>
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
      </div>
    </section>
  );
};

export default NewItems;