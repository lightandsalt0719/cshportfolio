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


// BREAKDOWN CARDS

function cubicBezier077(t){
  const p1x=0.77,p1y=0,p2x=0.18,p2y=1;
  let s=0,e=1,m=0;
  for(let i=0;i<12;i++){
    m=(s+e)/2;
    const x=3*m*(1-m)*(1-m)*p1x+3*m*m*(1-m)*p2x+m*m*m;
    if(x<t) s=m; else e=m;
  }
  const u=m;
  return 3*u*(1-u)*(1-u)*p1y+3*u*u*(1-u)*p2y+u*u*u;
}

document.querySelectorAll('.card.has-breakdown').forEach(card => {
  const line = card.querySelector('.bd-divider line');
  if(!line) return;

  const IDLE  = { x1: 281.6, x2: 230.4 };
  const HOVER = { x1: 185.6, x2: 134.4 };
  const DURATION = 600;

  let animId = null, startTime = null;
  let fromX1 = IDLE.x1, fromX2 = IDLE.x2;
  let toX1 = IDLE.x1, toX2 = IDLE.x2;

  function animate(ts){
    if(!startTime) startTime = ts;
    const t = Math.min((ts - startTime) / DURATION, 1);
    const e = cubicBezier077(t);
    line.setAttribute('x1', fromX1 + (toX1 - fromX1) * e);
    line.setAttribute('x2', fromX2 + (toX2 - fromX2) * e);
    if(t < 1) animId = requestAnimationFrame(animate);
  }

  function startAnim(tx1, tx2){
    if(animId) cancelAnimationFrame(animId);
    fromX1 = parseFloat(line.getAttribute('x1'));
    fromX2 = parseFloat(line.getAttribute('x2'));
    toX1 = tx1; toX2 = tx2;
    startTime = null;
    animId = requestAnimationFrame(animate);
  }

  card.addEventListener('mouseenter', () => startAnim(HOVER.x1, HOVER.x2));
  card.addEventListener('mouseleave', () => startAnim(IDLE.x1, IDLE.x2));
});


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



 