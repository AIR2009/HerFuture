// script.js
// Counter Animation for Impact Section

const counters = document.querySelectorAll('.counter');
const speed = 200; // lower is faster

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 15);
    } else {
      counter.innerText = target;
    }
  };

  // Trigger animation when in view
  const onScroll = () => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      updateCount();
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll);
});
// Scroll to top button logic
const scrollBtn = document.getElementById('scrollTopBtn');

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("shareBtn");
  const sharePopup = document.getElementById("sharePopup");

  // Toggle popup when clicking the Share button
  shareBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    sharePopup.classList.toggle("show");

    // Position popup near the button
    const rect = shareBtn.getBoundingClientRect();
    sharePopup.style.top = `${rect.bottom + window.scrollY + 10}px`;
    sharePopup.style.left = `${rect.left + window.scrollX}px`;
  });

  // Close popup if clicking outside
  document.addEventListener("click", (e) => {
    if (!sharePopup.contains(e.target) && e.target !== shareBtn) {
      sharePopup.classList.remove("show");
    }
  });

  // Copy link to clipboard
  document.getElementById("copyLink").addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  });

  // Share to WhatsApp
  document.getElementById("shareWhatsApp").addEventListener("click", () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, "_blank");
  });

  // Share to Twitter
  document.getElementById("shareTwitter").addEventListener("click", () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  });

  // Share to Facebook
  document.getElementById("shareFacebook").addEventListener("click", () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  });

  // Share via Email
  document.getElementById("shareEmail").addEventListener("click", () => {
    window.location.href = `mailto:?subject=Check this out&body=${encodeURIComponent(window.location.href)}`;
  });
});
