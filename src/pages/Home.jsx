import React, { useEffect } from "react";
import VisaCard from "../components/VisaCard";
import ValueCard from "../components/ValueCard";
import OurProcess from "../components/OurProcess";


function Home() {


  return (
    <>
      <section className="site_Hero--section">
        <div className="site_content-container">
          <div className="Hero_inner">
            <div className="Hero_bg--image site_image--radius site_card-image__Ovrly">
              <picture>
                <source src="/assets/home-page-hero-img.png" />
                <img src="/assets/home-page-hero-img.png" alt="" />
              </picture>
            </div>
            <div className="Hero_content">
              <div className="Hero_content--inner">
                <h1 className="site_title-hero">
                  Get your travel visa for any country
                </h1>
                <div className="Hero_field--content">
                  <div className="site_flex Hero_input">
                    <div className="site-input_holder">
                      <input
                        className="site_input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Search For Visa.."
                      />
                      <label className="site_input--label">Search</label>
                    </div>
                    <button className="shortcut_btn">CTRL + K</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-top_values-section">
        <div className="our-top_values-inner  site_content-container site_flex site_flex--column section section_gap">
          <div className="our-top_values-top section_top site_flex">
            <div className="our-top_values-top__left section_left">
              <h2 className="section_title">Our Top Values</h2>
            </div>
            <div className="our-top_values-top__right section_right">
              <p className="section_subtitle">
                We deliver personalized experiences to meet your needs, ensuring
                your complete satisfaction.
              </p>
            </div>
          </div>
          <div className="our-top_values-bottom section_bottom">
            <ValueCard />
          </div>
        </div>
      </section>
      <section className="choose_tour-section">
        <div className="choose_tour-inner site_content-container site_flex site_flex--column section section_gap">
          <div className="choose_tour-top section_top site_flex">
            <div className="choose_tour-top__left section_left">
              <h2 className="section_title">Choose Your Tour</h2>
            </div>
            <div className="choose_tour-top__right section_right">
              <p className="section_subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                efficitur, nunc et bibendum facilisis, nisi nunc aliquet nunc,
                eget aliquam nunc nisl eget nunc.
              </p>
            </div>
          </div>
          <div className="choose_tour-bottom section_bottom">
            <VisaCard />
          </div>
        </div>
      </section>
      < OurProcess />
  
    </>
  );
}
export default Home;
