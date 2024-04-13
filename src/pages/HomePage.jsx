import React from "react";
import Layout from "../components/home/Layout";
import background from "../assets/background.jpg";
import '../styles/main.css'

const HomePage = () => {
  return (
    <div>
      <Layout>
        <div className="container">
          <img
            src={background}
            alt="Background Image"
            className="background-image"
          />
          <div className="text-overlay">
            <h1>Get the best Courses Here</h1><br />
            <p>We have courses covering a whole lot of fields that you can try out</p>
          </div>
        </div>
        Homepage
      </Layout>
    </div>
  );
};

export default HomePage;
