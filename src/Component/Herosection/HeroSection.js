import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Connecting You to Quality Care</h1>
        <h2>Book, Consult, Heal.</h2>
        <p>
        At Amaze Care, we are dedicated to connecting you to quality
          healthcare with ease and efficiency. Our platform streamlines the
          process of finding and consulting with top healthcare professionals,
          ensuring you receive the best possible care. With a focus on
          convenience and trust, Amaze Care allows patients to book
          appointments, consult with doctors, and manage their health journey—
          all in one place.
        </p>
      </div>
      <div className="hero-image">
        <img src="./Caring Image.jpg" alt="Hero Illustration" />
      </div>
    </section>
  );
};

export default HeroSection;
