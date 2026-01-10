// ================= NAVBAR TOGGLE =================

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

 /* ----------------------------
     Carousel lightbox & tilt effect
     ---------------------------- */
  (function carouselInit() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtnModal = document.querySelector(".closeBtn");

    document.querySelectorAll(".carousel img").forEach(img => {
      img.addEventListener("click", () => {
        if (!modal || !modalImg) return;
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        modalImg.src = img.src;
      });
    });

    if (closeBtnModal && modal) {
      closeBtnModal.addEventListener("click", () => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
        }
      });
    }

    // Mouse tilt for desktop and touch fallback
    const container = document.querySelector(".carousel");
    if (container) {
      document.addEventListener("mousemove", (e) => {
        let x = (window.innerWidth / 2 - e.clientX) / 40;
        let y = (window.innerHeight / 2 - e.clientY) / 40;
        container.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      });
      document.addEventListener("touchstart", () => { container.style.transform = "rotateY(0deg) rotateX(0deg)"; });
    }
  })();

  console.log("[akshara] script initialized successfully.");
 // end DOMContentLoaded

//  service vedio
  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".services-video");
    if (video) {
      video.play().catch(() => {});
    }
  });
// reels section
   const track = document.getElementById("reelsTrack");

  // Duplicate reels for seamless loop
  track.innerHTML += track.innerHTML;

  let speed = 0.5; // auto scroll speed
  let isDragging = false;
  let startX;
  let scrollLeft;

  function autoScroll() {
    if (!isDragging) {
      track.parentElement.scrollLeft += speed;
      if (track.parentElement.scrollLeft >= track.scrollWidth / 2) {
        track.parentElement.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  // Manual drag (mouse + touch)
  const wrapper = track.parentElement;

  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  wrapper.addEventListener("mouseup", () => isDragging = false);
  wrapper.addEventListener("mouseleave", () => isDragging = false);

  wrapper.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  wrapper.addEventListener("touchend", () => isDragging = false);

  // reels section end

  // testimonial section start

   const tTrack = document.getElementById("testimonialsTrack");
  const tWrapper = tTrack.parentElement;

  // Duplicate for infinite loop
  tTrack.innerHTML += tTrack.innerHTML;

  let tSpeed = 0.4;
  let tDragging = false;
  let tStartX, tScrollLeft;

  function autoScrollTestimonials() {
    if (!tDragging) {
      tWrapper.scrollLeft += tSpeed;
      if (tWrapper.scrollLeft >= tTrack.scrollWidth / 2) {
        tWrapper.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScrollTestimonials);
  }
  autoScrollTestimonials();

  // Drag / swipe
  tWrapper.addEventListener("mousedown", (e) => {
    tDragging = true;
    tStartX = e.pageX;
    tScrollLeft = tWrapper.scrollLeft;
  });

  tWrapper.addEventListener("mousemove", (e) => {
    if (!tDragging) return;
    const walk = (e.pageX - tStartX) * 1.5;
    tWrapper.scrollLeft = tScrollLeft - walk;
  });

  ["mouseup", "mouseleave"].forEach(evt =>
    tWrapper.addEventListener(evt, () => tDragging = false)
  );

  tWrapper.addEventListener("touchstart", (e) => {
    tDragging = true;
    tStartX = e.touches[0].pageX;
    tScrollLeft = tWrapper.scrollLeft;
  });

  tWrapper.addEventListener("touchmove", (e) => {
    if (!tDragging) return;
    const walk = (e.touches[0].pageX - tStartX) * 1.5;
    tWrapper.scrollLeft = tScrollLeft - walk;
  });

  tWrapper.addEventListener("touchend", () => tDragging = false);

  // ================= TESTIMONIAL POPUP ONLY =================

const popup = document.getElementById("testimonialPopup");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popupText");
const popupName = document.getElementById("popupName");
const popupClose = popup.querySelector(".testimonial-popup-close");
const popupBackdrop = popup.querySelector(".testimonial-popup-backdrop");

let popupOpen = false;

// open popup
document.querySelectorAll(".testimonial-card").forEach(card => {
  card.addEventListener("click", () => {

    // avoid popup while dragging
    if (tDragging) return;

    popupImg.src = card.querySelector("img").src;
    popupText.textContent = card.querySelector(".testimonial-text").textContent;
    popupName.textContent = card.querySelector(".testimonial-name").textContent;

    popup.style.display = "block";
    document.body.style.overflow = "hidden";
    popupOpen = true;
  });
});

// close popup
function closePopup() {
  popup.style.display = "none";
  document.body.style.overflow = "";
  popupOpen = false;
}

popupClose.addEventListener("click", closePopup);
popupBackdrop.addEventListener("click", closePopup);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && popupOpen) closePopup();
});

  // testimonials section end

  // WORK FLOW SECTION START
  const workflowSteps = document.querySelectorAll(".workflow-step");

  const workflowObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  workflowSteps.forEach(step => workflowObserver.observe(step));

  // WORKFLOW END SECTION

  // final footer

  document.getElementById("year").textContent = new Date().getFullYear();
