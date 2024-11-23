document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.progress');

    // Hızlandırma ve yavaşlama fonksiyonu
    function easeInOut(timeFraction) {
        return 0.6 * (1 - Math.cos(Math.PI * timeFraction));
    }

    // Progress bar animasyon fonksiyonu
    function animateProgress(bar, value) {
        let currentWidth = 0;
        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;

            const timeElapsed = (timestamp - startTime) / 1000; // Geçen zamanı saniyeye çevir
            const timeFraction = timeElapsed / 2; // 2 saniyelik süreye böl

            if (timeElapsed < 2) {
                currentWidth = Math.min(value, easeInOut(timeFraction) * value);
                bar.style.width = currentWidth + '%';
                requestAnimationFrame(animate);
            } else {
                bar.style.width = value + '%';
            }
        }

        requestAnimationFrame(animate);
    }

    // Progress bar'ı sıfırlama fonksiyonu
    function resetProgress(bar) {
        bar.style.width = '0%';
    }

    // Intersection Observer ayarları
    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const bar = entry.target;
            const value = bar.getAttribute('data-value');

            if (entry.isIntersecting) {
                animateProgress(bar, value);
            } else {
                // Element görünürlükten çıktığında sıfırla
                resetProgress(bar);
            }
        });
    }, observerOptions);

    // Progress bar'ları observer'a ekle
    bars.forEach((bar) => observer.observe(bar));
});

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
});

