document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mainAction');
    const hero = document.getElementById('heroSection');
    const secret = document.getElementById('secretSection');

    btn.addEventListener('click', () => {
        // 1. Energetic Confetti Explosion
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 1000 };

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            
            const particleCount = 40 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
        }, 250);

        // 2. Energetic UI Transition
        hero.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        hero.style.opacity = "0";
        hero.style.transform = "scale(0.9) translateY(-30px)";

        setTimeout(() => {
            hero.style.display = "none";
            
            // Unlock Scrolling for Act 2
            document.body.style.overflowY = "auto";
            document.body.style.height = "auto";
            
            secret.classList.remove('hidden');
            secret.style.display = "block";
            
            // Fade in Secret Section
            setTimeout(() => {
                secret.style.opacity = "1";
                secret.style.transform = "translateY(0)";
                startCounters();
            }, 100);
        }, 800);

        // Haptic Feedback for Linux/Mobile
        if (navigator.vibrate) navigator.vibrate([100, 30, 100]);
    });
});

// Counter Animation Logic
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const target = +counter.getAttribute('data-target');
        const increment = target / 40;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}
