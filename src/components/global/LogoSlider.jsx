'use client'
import React from 'react';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

import Bubble from '../../../public/images/logos/Bubble.png';
import Cal from '../../../public/images/logos/Cal.com.png';
import ElevenLabs from '/public/images/logos/ElevenLabs.png';

// Define the style for the images in the carousel
const imageStyle = {
    width: '75px',
    height: '64px',
    // borderRadius: '20px',
    // border: '1px solid #FFFFFF33',
};

function LogoSlider() {
    return (
        <div className="relative flex h-full ">
            <div className="container max-w-screen-xl mx-auto relative z-20 overflow-x-hidden">
                <Splide
                    options={{
                        type: "loop", // Loop back to the beginning when reaching the end
                        autoScroll: {
                            pauseOnHover: false, // Do not pause scrolling when hovering over the carousel
                            pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                            rewind: true, // Rewind to start when the end is reached
                            speed: 1 // Scrolling speed
                        },
                        arrows: false, // Hide navigation arrows
                        pagination: false, // Hide pagination dots
                        fixedWidth: '95px', // Fixed width for each slide
                        gap: '0.5rem', // Gap between slides
                    }}
                    extensions={{ AutoScroll }} // Use the AutoScroll extension
                >
                    <SplideSlide>
                        <img src={'/public/images/logos/Bubble.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/Cal.com.png'} alt="Poster Macao" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/ElevenLabs.png'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/GoHighLevel.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/hubspot.png'} alt="Poster Macao" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/icons8-google-meet.svg.png'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/Make.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/Stripe.png'} alt="Poster Macao" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/Twilio.png'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/images/logos/Zapier.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/Figma.svg'} alt="Poster Macao" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/public/Gitlab.svg'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
}

export default LogoSlider;