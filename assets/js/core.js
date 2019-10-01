/* Adapted from Strata by HTML5 UP */
const breakpoints = require('./breakpoints.min.js');
const browser = require('./browser.min.js');

const version = 1.0;

(() => {
  // Make sure sw are supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../../sw_site.js')
        .then(reg => console.log('Service Worker: Registered (Site)'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
  }

  console.log(`Version: ${version}`);
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const main = document.getElementById('main');
  const settings = {
    // Parallax background effect?
    parallax: true,
    // Parallax factor (lower = more intense, higher = less intense).
    parallaxFactor: 20,
  };

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1800px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
  });

  // Play initial animations on page load.
  window.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
      document.body.classList.remove('is-preload');
    }, 100);
  });

  // Touch?
  if (browser.mobile) {
    // Turn on touch mode.
    document.body.classList.add('is-touch');

    // Height fix (mostly for iOS).
    window.setTimeout(() => {
      window.scrollTo(0, window.pageYOffest + 1);
    }, 0);
  }

  // Footer.
  breakpoints.on('<=medium', () => {
    document.body.insertBefore(footer, main.nextElementSibling);
  });

  breakpoints.on('>medium', () => {
    header.insertBefore(footer, header.lastElementChild.nextElementSibling);
  });

  // Header.

  // Parallax background.

  // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
  if (browser.name === 'ie' || browser.mobile) settings.parallax = false;

  if (settings.parallax) {
    const strataParallax = () => {
      header.style.backgroundPosition = `left ${-1 *
        (parseInt(window.pageYOffset) / settings.parallaxFactor)}px`;
    };

    breakpoints.on('<=medium', () => {
      window.removeEventListener('scroll', strataParallax, false);
      header.style.backgroundPosition = null;
    });

    breakpoints.on('>medium', () => {
      header.style.backgroundPosition = 'left 0px';
      window.addEventListener('scroll', strataParallax);
    });
  }
})();
