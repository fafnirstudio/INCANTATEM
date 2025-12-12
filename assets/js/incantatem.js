document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const items = Array.from(track.children);
  const prev = document.getElementById("carousel-prev");
  const next = document.getElementById("carousel-next");

  const GAP = 75;

  let index = 0;

  function getVisibleCount() {
    
    return window.innerWidth <= 768 ? 1 : 6;
  }

  function getItemWidth() {
    const rect = items[0].getBoundingClientRect();
    return rect.width + GAP;
  }

  function clampIndex(value) {
    const visible = getVisibleCount();
    const maxIndex = Math.max(items.length - visible, 0);
    if (value < 0) return 0;
    if (value > maxIndex) return maxIndex;
    return value;
  }

  function updateCarousel() {
   
    index = clampIndex(index);

    const visibleCount = getVisibleCount();
    const itemWidth = getItemWidth();
    const offset = -index * itemWidth;

    track.style.transform = `translateX(${offset}px)`;

    items.forEach((item, i) => {
      item.style.transition = "opacity 0.3s ease";
      const rel = i - index;

      if (visibleCount === 2) {
        
      } else {
     
        if (rel < 0 || rel > visibleCount - 1) {
          item.style.opacity = "0";
          item.style.pointerEvents = "none";
        } else if (rel === 0 || rel === visibleCount - 1) {
          item.style.opacity = "0.25";
          item.style.pointerEvents = "auto";
        } else {
          item.style.opacity = "1";
          item.style.pointerEvents = "auto";
        }
      }
    });
  }

  prev.addEventListener("click", () => {
    index = clampIndex(index - 1);
    updateCarousel();
  });

  next.addEventListener("click", () => {
    index = clampIndex(index + 1);
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});


document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const originalItems = Array.from(track.children);


  const SPEED = 0.8; 
  const DUPLICATE_TIMES = 5; 

  let pos = 0;

 
  for (let i = 0; i < DUPLICATE_TIMES; i++) {
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.style.opacity = "0"; 
      track.appendChild(clone);
    });
  }

  const allItems = Array.from(track.children);

 
  function animate() {
    if (window.innerWidth <= 768) {
      pos -= SPEED;
      track.style.transform = `translateX(${pos}px)`;

      const firstItem = allItems[0];
      const firstRect = firstItem.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();

     
      if (firstRect.right < trackRect.left) {
        pos += firstRect.width;
        track.appendChild(allItems.shift());
        allItems.push(firstItem);
      }

      applyFade();
    }

    requestAnimationFrame(animate);
  }

  
  function applyFade() {
    const container = track.parentElement.getBoundingClientRect();

    allItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerItem = rect.left + rect.width / 2;
      const centerContainer = container.left + container.width / 2;

      const distance = Math.abs(centerItem - centerContainer);
      const maxDist = container.width / 2;

      let opacity = 1 - distance / maxDist;
      opacity = Math.max(0, Math.min(1, opacity)); 

      item.style.opacity = opacity.toFixed(2);
    });
  }

  animate();
});
