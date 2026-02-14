// Floating sidebar menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('menuSidebar');
    const backdrop = document.getElementById('menuBackdrop');
    const closeBtn = document.getElementById('sidebarClose');
    const header = document.querySelector('header');

    // Sticky header on scroll
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
        if (sidebar.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close button inside sidebar
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close when clicking backdrop
    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    // Close when clicking a link
    sidebar.querySelectorAll('.sidebar-link').forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
            closeMenu();
        }
    });

    function openMenu() {
        toggle.classList.add('is-active');
        sidebar.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-visible');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        toggle.classList.remove('is-active');
        sidebar.classList.remove('is-open');
        if (backdrop) backdrop.classList.remove('is-visible');
        document.body.classList.remove('menu-open');
    }
});
