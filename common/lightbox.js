const detailImages = Array.from(document.querySelectorAll(".detail-grid img"));

if(detailImages.length > 0){
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">×</button>
    <button class="lightbox-prev" aria-label="Previous image">‹</button>
    <img src="" alt="">
    <button class="lightbox-next" aria-label="Next image">›</button>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;
  let touchStartX = 0;

  function openLightbox(index){
    currentIndex = index;
    lightboxImg.src = detailImages[currentIndex].src;
    lightboxImg.alt = detailImages[currentIndex].alt || "";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  function showPrev(){
    currentIndex = (currentIndex - 1 + detailImages.length) % detailImages.length;
    lightboxImg.src = detailImages[currentIndex].src;
    lightboxImg.alt = detailImages[currentIndex].alt || "";
  }

  function showNext(){
    currentIndex = (currentIndex + 1) % detailImages.length;
    lightboxImg.src = detailImages[currentIndex].src;
    lightboxImg.alt = detailImages[currentIndex].alt || "";
  }

  detailImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  lightbox.addEventListener("click", (event) => {
    if(event.target === lightbox || event.target === lightboxImg){
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if(!lightbox.classList.contains("active")) return;

    if(event.key === "Escape") closeLightbox();
    if(event.key === "ArrowLeft") showPrev();
    if(event.key === "ArrowRight") showNext();
  });

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if(Math.abs(diff) > 50){
      if(diff > 0) showNext();
      else showPrev();
    }
  });
}




// CINEMATIC REEL TABS

const reelTabs = document.querySelectorAll(".reel-tab");
const reelVideo = document.getElementById("reelFrame");
const reelVideoWrapper = document.querySelector(".video-wrapper");

if(reelVideoWrapper){
  const reelImage = document.createElement("img");
  reelImage.src = "thumbnail/reel_2025_2026.webp";
  reelImage.alt = "2025-2026 Reel Coming Soon";
  reelImage.style.cssText = "width:100%;border-radius:20px;display:none;";
  reelVideoWrapper.insertAdjacentElement("afterend", reelImage);

  if(reelTabs.length > 0 && reelVideo){
    reelTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const reelIndex = Number(tab.dataset.reel);

        reelTabs.forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");

        if(reelIndex === 0){
          reelVideoWrapper.style.display = "block";
          reelImage.style.display = "none";
        } else {
          reelVideoWrapper.style.display = "none";
          reelImage.style.display = "block";
        }
      });
    });
  }
}
// DETAIL IMAGE TABS

const shotTabs = document.querySelectorAll(".shot-tab");
const shotPanels = document.querySelectorAll(".shot-panel");

if(shotTabs.length > 0 && shotPanels.length > 0){
  shotTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.shot;

      shotTabs.forEach((item) => item.classList.remove("active"));
      shotPanels.forEach((panel) => panel.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
}



 