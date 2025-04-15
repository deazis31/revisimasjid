document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Ganti ikon menu
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.replace('fa-times', 'fa-bars');
        } else {
            icon.classList.replace('fa-bars', 'fa-times');
        }
    });

    // Tutup menu mobile saat link diklik
    const navLinks = document.querySelectorAll('#mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
});