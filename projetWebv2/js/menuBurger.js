document.getElementById('menuBurger').addEventListener('click', function() {
    var nav = document.getElementById('menuNav');
    if (nav.style.display === 'none') {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});