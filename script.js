window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > header.offsetTop) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});