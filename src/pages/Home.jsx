import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home_container">
      <section className="hero_section">
        <h1>Welcome to the League</h1>
        <p>Experience the best games and stats tracking.</p>
      </section>

      <section className="about_section">
        <h2>About Our League</h2>
        <p>We provide the best basketball and tennis league experience.</p>
      </section>

      <section className="players_section">
        <h2>Meet the Players</h2>
        <p>Get to know the top players in our league.</p>
      </section>

      <section className="contact_section">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us anytime.</p>
      </section>
    </div>
  );
}

export default Home;
