const swiper = new Swiper('.swiper', {
    loop: true, // Loop through slides
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  
  (() => {
    
    const componentLightBox = document.querySelector('.component-LightBox');
    const slides = document.getElementsByClassName('slide');
    const navigationButtons = componentLightBox.querySelectorAll('.navigation-buttons > a');
  
    let currentIndex = 0;
  
  
    const navigationDotContainer = document.createElement('div');
    navigationDotContainer.className = 'navigation-dot-container';
  
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'navigation-dot';
      if (i === 0) dot.classList.add('active'); 
      navigationDotContainer.appendChild(dot);
    }
  
    componentCarousel.querySelector('.slider-LightBox').appendChild(navigationDotContainer);
    const navigationDots = navigationDotContainer.querySelectorAll('.navigation-dot');
  
   
    function showSlides(n) {
      currentIndex = n;
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (let i = 0; i < navigationDots.length; i++) {
        navigationDots[i].className = navigationDots[i].className.replace(' active', '');
      }
      slides[currentIndex].style.display = 'block';
      navigationDots[currentIndex].className += ' active';
    }
  
   
    const incrementIndex = (increment) => (currentIndex + increment + slides.length) % slides.length;
  
    
    function initLightBox() {
      showSlides(currentIndex);
  
      
      navigationButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          if (event.target.className.includes('next')) {
            currentIndex = incrementIndex(1);
          }
          if (event.target.className.includes('previous')) {
            currentIndex = incrementIndex(-1);
          }
          showSlides(currentIndex);
        });
      });
  
      
      navigationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showSlides(index);
        });
      });
  
    
    }
  
   
    window.addEventListener('load', () => {
      initLightBox();
    });
  })();
  