import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const TextComponent = () => {
  const textRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const textElements = Array.from(document.querySelectorAll('.scrolltext'));

    textElements.forEach(textz => {
      gsap.to(textz, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: textz,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
        },
      });
    });

    return () => {
      // Clean up ScrollTrigger instances
      textElements.forEach(textz => {
        if (textz && textz.scrollTrigger) {
          textz.scrollTrigger.kill();
        }
      });
    };
  }, []);

  return (
    <div>

    <div className="scrolltext myfont" ref={textRef}>
      <h1>Why are you waiting ?</h1>
    </div>
    
    <div className="scrolltext myfont" ref={textRef}>
       <h1>Grab this Opportunity ASAP!</h1>
    </div>
    </div>

  );
};

export default TextComponent;


