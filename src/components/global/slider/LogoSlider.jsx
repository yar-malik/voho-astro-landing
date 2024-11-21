import React from 'react';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";


// Define the style for the images in the carousel
const imageStyle = {
    // width: '75px',
    // height: '64px',
    // borderRadius: '20px',
    // border: '1px solid #FFFFFF33',
};

function LogoSlider() {
    return (
        <div className="relative flex h-full  overflow-hidden">
            <div className="container max-w-screen-xl  mx-auto relative z-20 overflow-x-hidden">
                <Splide
                    options={{
                        type: "loop", 
                        autoScroll: {
                            pauseOnHover: false, 
                            pauseOnFocus: false,
                            rewind: true, 
                            speed: 1 
                        },
                        arrows: false, 
                        pagination: false, 
                        fixedWidth: 'auto',
                        focus: 'center',
                        gap: '3.5rem', 
                    }}
                    extensions={{ AutoScroll }} 
              
                >
                    <SplideSlide>
                        <img src={'/images/logos/Bubble.png'} alt="Poster Brooklyn"  style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/Cal.com.png'} alt="Poster Macao" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/ElevenLabs.png'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/GoHighLevel.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/hubspot.png'} alt="Poster Macao" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/icons8-google-meet.svg.png'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/Make.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/Stripe.png'} alt="Poster Macao" style={{ height: 'auto',  width:'auto' }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/Twilio.png'} alt="Poster Navada" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/Zapier.png'} alt="Poster Brooklyn" style={imageStyle} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/figma-logo.webp'} alt="Poster Macao" style={{ height: '8rem',   }} />
                    </SplideSlide>
                    <SplideSlide>
                        <img src={'/images/logos/git.png'} alt="Poster Navada" style={{ height: '8rem',  width:'auto' }} />
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
}

export default LogoSlider;