import React from "react";
import { useParams } from "react-router-dom"; 
import visaData from "../data/visaData.json"; 

function VisaDetails() {
  const { slug } = useParams(); 
  const visa = visaData.find((item) => item.slug === slug); 

  if (!visa) {
    return <div className="site_content-container site_flex" style={{textAlign:'center', width: "100%", justifyContent: "center",minHeight:"50vh", alignItems:"center"} }> <span> Visa not found </span> </div>; 
  }

  return (
    <div className="visa_details section_gap site_flex site_flex--column">
      <div className="visa_details--header site_content-container">
        <div className="visa_feature--image__holder">  
          <img className="visa_feature--image" src={visa.image} alt={`${visa.title} Image`} />
        </div>
        <div className="visa_title--holder">
          <h1 className="visa_feature--title"  >{visa.title}</h1>
        </div>
      </div>
      <div className="visa_details--content site_content-container">
        <p>
          Price: <span>{visa.currency}{visa.price}</span> per person
        </p>
        <p>
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum vestibulum.
        </p>
        <a href={visa.link} className="site_gradient-btn">
          Apply Now
        </a>
      </div>
    </div>
  );
}

export default VisaDetails;