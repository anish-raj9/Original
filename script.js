// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption').textContent;
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.innerHTML = `
          <div class="lightbox-content">
              <img src="${img.src}" alt="${img.alt}">
              <p>${caption}</p>
          </div>
      `;
      document.body.appendChild(lightbox);
      lightbox.addEventListener('click', () => {
          lightbox.remove();
      });
  });
});

// Countdown functionality
const countdownDate = new Date("2024-10-15T00:00:00").getTime(); // Updated countdown date

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

  if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdown").innerHTML = "<h2>Happy Birthday!</h2>";
  }
}

const countdownTimer = setInterval(updateCountdown, 1000);

// Video functionality
const video = document.getElementById('birthday-video');
const playPauseButton = document.getElementById('play-pause');
const restartButton = document.getElementById('restart');

playPauseButton.addEventListener('click', () => {
  if (video.paused) {
      video.play();
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
      video.pause();
      playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  }
});

restartButton.addEventListener('click', () => {
  video.currentTime = 0;
  video.play();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
});

video.addEventListener('ended', () => {
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
});

// Floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '♥';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 3 + 2 + 's';
  heart.style.fontSize = Math.random() * 20 + 10 + 'px';
  heart.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
  document.body.appendChild(heart);

  setTimeout(() => {
      heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

// Confetti effect on countdown hover
const countdownItems = document.querySelectorAll('.countdown-item');
countdownItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
      confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
      });
  });
});

// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.section');
  
  parallaxElements.forEach(el => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      el.style.backgroundPositionY = yPos + 'px';
  });
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Add smooth reveal animation to gallery items
const galleryItems2 = document.querySelectorAll('.gallery-item');
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
      }
  });
}, { threshold: 0.1 });

galleryItems2.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer2.observe(item);
});

// Add subtle animation to reasons section
document.querySelectorAll('.reason').forEach((reason, index) => {
  reason.style.opacity = '0';
  reason.style.transform = 'translateY(20px)';
  setTimeout(() => {
      reason.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      reason.style.opacity = '1';
      reason.style.transform = 'translateY(0)';
  }, index * 100);
});
