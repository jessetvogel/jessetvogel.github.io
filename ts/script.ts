window.onload = function () {
    const pages = $$('#menu button').map(x => x.id.substring(7)); // removes `button-` prefix
    for (const x of pages)
        onClick($(`button-${x}`), () => {
            if ($$('.page.visible').length > 1) return; // wait until only one page is visible
            setPage(x);
            for (const y of pages)
                (x == y ? addClass : removeClass)($(`button-${y}`), 'active');
        });

    // Set home page
    const home = 'home';
    setPage(home, false);
    addClass($(`button-${home}`), 'active');

    // E-mail popup
    onClick($('contact-email'), function () {
        const popup = this.querySelector('.popup') as HTMLElement;
        if (!hasClass(popup, 'active')) {
            addClass(popup, 'active');
            setTimeout(function () { removeClass(popup, 'active'); }, 5000);
        }
    });

    // Hello world!
    console.log('👋🏻 🌍!');
};

function setPage(name: string, animate: boolean = true): void {
    const activePage = $$('.page.active')?.[0];
    const page = $(`page-${name}`);
    if (page == activePage) return;

    // Swap `active` class, add `visible` class
    if (activePage) removeClass(activePage, 'active');
    addClass(page, 'active');
    addClass(page, 'visible');

    // Scroll pages out and in
    const transition = `left var(--easing-time) var(--easing-function)`;
    if (animate) {
        if (activePage) activePage.style.left = '-100%';
        page.style.transition = null;
        page.style.left = '100%';
        setTimeout(() => { page.style.transition = transition; page.style.left = '0%'; }, 10);
    }
    else {
        if (activePage) activePage.style.left = '-100%';
        page.style.left = '0%';
        setTimeout(() => { page.style.transition = transition; }, 10);
    }

    // Remove visibility of non-active pages
    const easingTime = 500;
    if (activePage) setTimeout(() => { if (!hasClass(activePage, 'active')) removeClass(activePage, 'visible'); }, easingTime);

    // Trigger window resize event
    onWindowResize();
}

function onWindowResize() {
    const activePage = $$('.page.active')?.[0];
    if (activePage == null) return;

    // Set content height
    $('content').style.height = `${activePage.getBoundingClientRect().height}px`;

    // Set menu marker
    const name = activePage.id.substring(5); // removes `page-` prefix
    const button = $(`button-${name}`);

    const color = {
        'home': 'var(--color-blue)',
        'projects': 'var(--color-green)',
        'math': 'var(--color-yellow)',
        'music': 'var(--color-red)'
    }[name];

    // Set marker properties
    const marker = $$('#menu .marker')[0];
    marker.style.left = `${button.offsetLeft}px`;
    marker.style.width = `${button.offsetWidth}px`;
    marker.style.backgroundColor = color;
}

window.onresize = function () {
    onWindowResize();
}
