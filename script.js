        // ── NAVBAR SCROLL ──
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // ── HERO SLIDER ──
        let currentSlide = 0;
        const totalSlides = 3;
        let slideTimer = null;
        let progressTimer = null;
        let progressWidth = 0;

        function goToSlide(n) {
            document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === n));
            document.querySelectorAll('.hero-thumb').forEach((t, i) => t.classList.toggle('active', i === n));
            currentSlide = n;
            const counter = document.getElementById('slideCounter');
            counter.textContent = String(n + 1).padStart(2, '0');
            resetProgress();
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, 6000);
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }

        function resetProgress() {
            progressWidth = 0;
            const fill = document.getElementById('progressFill');
            fill.style.transition = 'none';
            fill.style.width = '0%';
            clearInterval(progressTimer);
            setTimeout(() => {
                fill.style.transition = 'width 6s linear';
                fill.style.width = '100%';
            }, 30);
        }

        slideTimer = setInterval(nextSlide, 6000);
        resetProgress();

        // ── CARD SCROLL ──
        function scrollCards(id, dir) {
            const el = document.getElementById(id);
            el.scrollBy({
                left: dir * 340,
                behavior: 'smooth'
            });
        }

        // ── FAQ ──
        function toggleFaq(btn) {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        }

        // ── SEARCH ──
        function openSearch() {
            document.getElementById('searchOverlay').classList.add('open');
            setTimeout(() => document.getElementById('searchInput').focus(), 100);
        }

        function closeSearch() {
            document.getElementById('searchOverlay').classList.remove('open');
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeSearch();
        });

        // ── MOBILE NAV ──
        function openMobileNav() {
            document.getElementById('mobileNav').classList.add('open');
            document.getElementById('mobileOverlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileNav() {
            document.getElementById('mobileNav').classList.remove('open');
            document.getElementById('mobileOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }

        // ── GENRE PILLS ──
        document.querySelectorAll('.genre-pill').forEach(pill => {
            pill.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // ── SCROLL REVEAL ──
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));