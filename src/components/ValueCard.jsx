import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ValueData from "../data/valueData.json";
import 'swiper/css';


function ValueCard() {
    return (
        <div className="site_flex">
             <Swiper
      spaceBetween={20}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {ValueData.map((card) => (
      <SwiperSlide>
            <div className="flex_item" key={card.id}>
            <div className="value_card site_flex site_flex--column">
                <div className="value_card--img">
                <img src={card.image} alt={`${card.title} Image`} />
                </div>
                <div className="value_card--content site_flex site_flex--column">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                </div>
            </div>
            </div>
      </SwiperSlide>
        ))}

    </Swiper>
        
        </div>
    );
    }
export default ValueCard;