jQuery(function() {
    var navMenuDom = null;
    var logoDom = null;
    var touchShowTime = 3000;
    var showTime = 2000;
    var hideTimeout = null;


    function initMenu() {
        navMenuDom = document.getElementById("bba-nav");
        logoDom = document.getElementById("bba-logo");

        logoDom.addEventListener("mousemove", event => {
            showMenu();
            hideMenuSoon();
        });
        logoDom.addEventListener("pointerdown", event => {
            showMenu();
            hideMenuSoon();
        });
        navMenuDom.addEventListener("mouseover", event => {
            showMenu();
            clearTimeout(hideTimeout);
        });
        navMenuDom.addEventListener("mouseleave", event => {
            hideMenuSoon();
        });

        logoDom.ontouchstart = (e) => {
            showMenu();
            hideMenuSoon(touchShowTime);
            e.stopPropagation();
            e.preventDefault();
        };

        logoDom.onclick = (e) => {
            document.location = BigBlueApp.siteUrl;
        };

        logoDom.ondblclick= (e) => {
            document.location = BigBlueApp.siteUrl;
        };

        logoDom = document.getElementById("bba-logo");
    }

    function showMenu() {
        navMenuDom.style.transform = "scale(1,1)";
    }

    function hideMenuSoon(time = null) {
        if(!time){
            time = showTime;
        }
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            navMenuDom.style.transform = "scale(0,0)";
        }, time);
    }

    initMenu();
});
