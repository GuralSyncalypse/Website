var menus = document.querySelectorAll('[data-menu-toggle]');

// Thêm sự kiện cho mỗi menu.
menus.forEach(function(menu) {
    var toggleButton = menu.querySelector('span, a');
    toggleButton.addEventListener('click', function() {
        var navDrop = menu.querySelector('.nav-drop');
        if (navDrop.style.display === 'flex') {
            navDrop.style.display = 'none';
        } else {
            navDrop.style.display = 'flex';
            navDrop.style.flexDirection = 'column';
        }
    });
});

// Đóng dropdown khi nhấn bên ngoài.
document.addEventListener('click', function(event) {
    menus.forEach(function(menu) {
        var isMenuClickInside = menu.contains(event.target);
        if (!isMenuClickInside) {
            var navDrops = menu.querySelectorAll('.nav-drop');
            navDrops.forEach(function(navDrop) {
                navDrop.style.display = 'none';
            });
        }
    });
});