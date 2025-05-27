document.addEventListener('DOMContentLoaded', () => {
  // Card flip functionality
  const card = document.querySelector('.card');
  const frontCta = document.querySelector('.card-front .cta');
  const backCta = document.querySelector('.card-back .cta');

  if (frontCta) {
    frontCta.addEventListener('click', () => {
      card.classList.add('flipped');
    });
  }

  if (backCta) {
    backCta.addEventListener('click', () => {
      card.classList.remove('flipped');
    });
  }

  // Mouse move effect for card
  const container = document.querySelector('.container');
  
  if (container && card) {
    container.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset transform when mouse leaves
    container.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0) rotateX(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    // Remove transition when mouse enters
    container.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  }

  // Add glowing cursor effect
  const createGlowingCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  };

  // Add cursor styles dynamically
  const addCursorStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .cursor-glow {
        position: fixed;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: radial-gradient(circle at center, rgba(74, 0, 224, 0.8) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        filter: blur(5px);
        opacity: 0.7;
      }
      
      body {
        cursor: none;
      }
      
      a, button, .cta {
        cursor: none;
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize glowing cursor effect
  addCursorStyles();
  createGlowingCursor();

  // Add typing effect to bio text
  const bioText = document.querySelector('.bio');
  if (bioText) {
    const originalText = bioText.textContent;
    bioText.textContent = '';
    
    let charIndex = 0;
    const typeText = () => {
      if (charIndex < originalText.length) {
        bioText.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
      }
    };
    
    // Start typing effect after a delay
    setTimeout(typeText, 1500);
  }

  // Add parallax effect to floating shapes
  const shapes = document.querySelectorAll('.shape');
  
  if (shapes.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      shapes.forEach(shape => {
        const speed = parseFloat(shape.getAttribute('data-speed') || 0.05);
        const xOffset = (x - 0.5) * 100 * speed;
        const yOffset = (y - 0.5) * 100 * speed;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
    
    // Set random data-speed attributes to shapes
    shapes.forEach(shape => {
      const randomSpeed = (Math.random() * 0.05 + 0.02).toFixed(3);
      shape.setAttribute('data-speed', randomSpeed);
    });
  }
});
