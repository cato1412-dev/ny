// MỞ PHONG BÌ & BẮT ĐẦU HIỆU ỨNG
const openButtons = document.querySelectorAll(".js-open-letter");
const letterBody = document.querySelector(".js-letter-body");
const footerName = document.querySelector(".js-footer-name");

let letterOpened = false;

openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (letterOpened) return;
    letterOpened = true;
    document.body.classList.add("letter-opened");
    startTypewriter();
    revealFooter();
    spawnFloatingHearts();
    createFireworks();
  });
});

function startTypewriter() {
  if (!letterBody) return;

  const paragraphs = Array.from(letterBody.querySelectorAll("p"));
  const originalTexts = paragraphs.map((p) => p.innerHTML);

  paragraphs.forEach((p) => {
    p.dataset.fullText = p.innerHTML;
    p.innerHTML = "";
  });

  let pIndex = 0;

  function typeParagraph() {
    if (pIndex >= paragraphs.length) {
      letterBody.classList.remove("is-typing");
      return;
    }

    const p = paragraphs[pIndex];
    const fullText = p.dataset.fullText || "";
    let charIndex = 0;

    letterBody.classList.add("is-typing");

    function typeChar() {
      if (charIndex > fullText.length) {
        pIndex++;
        setTimeout(typeParagraph, 260);
        return;
      }

      p.innerHTML = fullText.slice(0, charIndex);
      charIndex++;
      const delay =
        12 + Math.random() * 22 + (fullText[charIndex] === " " ? 10 : 0);
      setTimeout(typeChar, delay);
    }

    typeChar();
  }

  // Nhẹ nhàng chờ phong bì mở ra rồi mới gõ
  setTimeout(typeParagraph, 420);
}

function revealFooter() {
  if (!footerName) return;
  setTimeout(() => {
    footerName.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
    footerName.style.opacity = "1";
    footerName.style.transform = "translateY(0)";
  }, 1500);
}

// Thêm vài trái tim nhỏ bay lên khi mở thư
function spawnFloatingHearts() {
  const container = document.body;
  const total = 16;

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("div");
    heart.className = "burst-heart";
    heart.textContent = "♥";
    const startX = 45 + Math.random() * 10;
    const delay = i * 60 + Math.random() * 120;
    const duration = 1200 + Math.random() * 900;
    const size = 10 + Math.random() * 14;

    heart.style.left = startX + "vw";
    heart.style.bottom = "18vh";
    heart.style.fontSize = size + "px";
    heart.style.animationDelay = delay + "ms";
    heart.style.animationDuration = duration + "ms";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, delay + duration + 200);
  }
}

// TẠO STYLE CHO HEART BURST BẰNG JS (cho gọn file CSS chính)
const burstStyle = document.createElement("style");
burstStyle.textContent = `
  .burst-heart {
    position: fixed;
    color: #ff9ebc;
    text-shadow: 0 0 8px rgba(0,0,0,0.6);
    pointer-events: none;
    z-index: 20;
    animation-name: burstHeartUp;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes burstHeartUp {
    0% {
      transform: translate3d(0, 0, 0) scale(0.8);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translate3d(
        calc(-40px + 80px * (var(--rand-x, 0.5))),
        -120px,
        0
      ) scale(1.2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(burstStyle);

// Tạo hiệu ứng pháo hoa nền khi mở thư
function createFireworks() {
  const container = document.body;
  const colors = ['#ff9ebc', '#ffd5e4', '#ffc76a', '#ff4c85', '#ffffff', '#7b61ff'];
  
  // Tối ưu cho mobile: giảm số lượng pháo hoa và hạt
  const isMobile = window.innerWidth <= 768;
  const fireworkCount = isMobile ? 4 : 8; // Giảm từ 8 xuống 4 trên mobile
  const particlesPerFirework = isMobile ? 20 : 30; // Giảm từ 30 xuống 20 trên mobile

  for (let f = 0; f < fireworkCount; f++) {
    setTimeout(() => {
      // Vị trí ngẫu nhiên trên màn hình
      const x = 20 + Math.random() * 60; // 20% - 80% chiều rộng
      const y = 30 + Math.random() * 40; // 30% - 70% chiều cao
      
      // Màu ngẫu nhiên cho mỗi pháo hoa
      const fireworkColor = colors[Math.floor(Math.random() * colors.length)];

      // Tạo các hạt pháo hoa
      for (let i = 0; i < particlesPerFirework; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        
        // Góc bay ngẫu nhiên (360 độ)
        const angle = (Math.PI * 2 * i) / particlesPerFirework + Math.random() * 0.5;
        const velocity = 80 + Math.random() * 120; // Tốc độ bay
        const distanceX = Math.cos(angle) * velocity;
        const distanceY = Math.sin(angle) * velocity;
        
        // Kích thước ngẫu nhiên
        const size = 3 + Math.random() * 5;
        
        particle.style.left = x + "%";
        particle.style.top = y + "%";
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.backgroundColor = fireworkColor;
        particle.style.boxShadow = `0 0 ${size * 2}px ${fireworkColor}`;
        particle.style.setProperty('--distance-x', distanceX + 'px');
        particle.style.setProperty('--distance-y', distanceY + 'px');
        particle.style.animationDelay = (Math.random() * 0.2) + "s";
        
        container.appendChild(particle);

        // Xóa hạt sau khi animation kết thúc
        setTimeout(() => {
          particle.remove();
        }, 2000);
      }
    }, f * 200); // Mỗi pháo hoa cách nhau 200ms
  }
}

// TẠO STYLE CHO PHÁO HOA BẰNG JS
const fireworkStyle = document.createElement("style");
fireworkStyle.textContent = `
  .firework-particle {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 15;
    animation: fireworkBurst 1.5s ease-out forwards;
    opacity: 0;
  }

  @keyframes fireworkBurst {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--distance-x), var(--distance-y)) scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(fireworkStyle);

// TÙY CHỈNH TÊN NGƯỜI NHẬN (NẾU MUỐN)
// Bạn có thể sửa tên hiển thị ở footer tại đây, hoặc để mặc định.
// Ví dụ:
// const herName = "Tên của em";
// if (footerName) {
//   footerName.textContent = herName;
// }

