import React, { useState, useEffect, useRef } from 'react';

export default function BootstrapCarousel({ slides = [], height = 500 }) {
  const [currentSlides, setCurrentSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (slides && slides.length > 0) {
      setCurrentSlides(slides);
    }
  }, [slides]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentSlides.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentSlides.length);
      }, 8000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentSlides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? currentSlides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentSlides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!currentSlides || currentSlides.length === 0) {
    return null;
  }

  return (
    <div 
      style={{ 
        width: '100%',
        height: height,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '40px',
        position: 'relative',
        backgroundColor: '#f8f9fa'
      }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Carousel Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {currentSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: index === currentIndex ? '#e74c3c' : 'rgba(255,255,255,0.5)',
              boxShadow: index === currentIndex ? '0 0 0 2px rgba(255,255,255,0.8)' : 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.target.style.background = 'rgba(255,255,255,0.8)';
                e.target.style.transform = 'scale(1.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.target.style.background = 'rgba(255,255,255,0.5)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          />
        ))}
      </div>

      {/* Carousel Slides */}
      {currentSlides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'translateX(0)' : 'translateX(100%)',
            transition: 'opacity 1000ms ease-in-out, transform 1000ms ease-in-out',
            zIndex: index === currentIndex ? 2 : 1
          }}
        >
          <img
            src={slide.image}
            alt={slide.alt || slide.title || `Slide ${index + 1}`}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            onError={(e) => {
              e.target.src = '/slides/slide-1.jpg'; // Fallback image
            }}
          />
          
          {/* Overlay */}
          <div style={{ 
            position: 'absolute', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)' 
          }} />
          
          {/* Content */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '100%',
            maxWidth: '800px',
            padding: '0 20px',
            zIndex: 3
          }}>
            {slide.kicker && (
              <div style={{
                fontSize: '14px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#ffffff',
                fontWeight: '500',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '8px 20px',
                borderRadius: '20px',
                display: 'inline-block',
                border: '1px solid rgba(255,255,255,0.3)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                marginBottom: '20px'
              }}>
                {slide.kicker}
              </div>
            )}
            {slide.title && (
              <h5 style={{
                fontSize: '56px',
                lineHeight: '1.1',
                fontWeight: '800',
                color: '#ffffff',
                textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                letterSpacing: '-1px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {slide.title}
              </h5>
            )}
            {slide.subtitle && (
              <p style={{
                fontSize: '20px',
                lineHeight: '1.5',
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)',
                marginBottom: '30px',
                maxWidth: '700px',
                margin: '0 auto 30px auto'
              }}>
                {slide.subtitle}
              </p>
            )}
            {slide.buttonText && slide.buttonHref && (
              <a
                href={slide.buttonHref}
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(231,76,60,0.4)',
                  display: 'inline-block',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#c0392b';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(231,76,60,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#e74c3c';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(231,76,60,0.4)';
                }}
              >
                {slide.buttonText}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#333',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          zIndex: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255,255,255,0.9)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#333',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          zIndex: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255,255,255,0.9)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        ›
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(0,0,0,0.8)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(0,0,0,0.6)';
        }}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </div>
  );
}
