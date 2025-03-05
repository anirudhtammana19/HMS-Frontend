import React from "react";
import "./WhoWeAre.css";

const WhoWeAre = () => {
  return (
    <section className="who-we-are">
      <div className="who-we-are-image">
        <img
          src="./whoweare.png"
          alt="Who We Are"
        />
      </div>
      <div className="who-we-are-content">
        <h2>Who We Are</h2>
        <p>
          Amaze Care is a healthcare technology platform focused on connecting
          patients with trusted doctors. Our system streamlines appointment
          booking and consultations, making quality care accessible and
          efficient for all.
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;
