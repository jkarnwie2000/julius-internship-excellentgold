import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const LandingIntro = () => {
useEffect(() => {
AOS.init({
          duration: 200, // Global animation duration in ms
          once: false,    // Whether animation should happen only once - while scrolling down
  });
}, [])
  

  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-out">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_wallet" data-aos="fade-up"></i>
              <div className="text" data-aos="fade-up">
                <h4 className="">Set up your wallet</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_wallet"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_cloud-upload_alt" data-aos="fade-up"></i>
              <div className="text" data-aos="fade-up">
                <h4 className="">Add your NFT's</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_tags_alt" data-aos="fade-up"></i>
              <div className="text" data-aos="fade-up">
                <h4 className="">Sell your NFT's</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_tags_alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
