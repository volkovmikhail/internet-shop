import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function About() {
    return (
        <div>
            <Header active="about" />
            <h1 className="title">About us</h1>

            <Footer />
        </div>
    );
}

export default About;
