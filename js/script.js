window.onload = function () {
    const pages = $$('#menu button').map(x => x.id.substring(7)); // removes `button-` prefix
    for (const x of pages)
        onClick($(`button-${x}`), () => {
            if ($$('.page.visible').length > 1)
                return; // wait until only one page is visible
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
        const popup = this.querySelector('.popup');
        if (!hasClass(popup, 'active')) {
            addClass(popup, 'active');
            setTimeout(function () { removeClass(popup, 'active'); }, 5000);
        }
    });
    // Hello world!
    console.log('👋🏻 🌍!');
};
function setPage(name, animate = true) {
    var _a;
    const activePage = (_a = $$('.page.active')) === null || _a === void 0 ? void 0 : _a[0];
    const page = $(`page-${name}`);
    if (page == activePage)
        return;
    // Swap `active` class, add `visible` class
    if (activePage)
        removeClass(activePage, 'active');
    addClass(page, 'active');
    addClass(page, 'visible');
    // Scroll pages out and in
    const transition = `left var(--easing-time) var(--easing-function)`;
    if (animate) {
        if (activePage)
            activePage.style.left = '-100%';
        page.style.transition = null;
        page.style.left = '100%';
        setTimeout(() => { page.style.transition = transition; page.style.left = '0%'; }, 10);
    }
    else {
        if (activePage)
            activePage.style.left = '-100%';
        page.style.left = '0%';
        setTimeout(() => { page.style.transition = transition; }, 10);
    }
    // Remove visibility of non-active pages
    const easingTime = 500;
    if (activePage)
        setTimeout(() => { if (!hasClass(activePage, 'active'))
            removeClass(activePage, 'visible'); }, easingTime);
    // Trigger window resize event
    onWindowResize();
}
function onWindowResize() {
    var _a;
    const activePage = (_a = $$('.page.active')) === null || _a === void 0 ? void 0 : _a[0];
    if (activePage == null)
        return;
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
};
function $(id) {
    return document.getElementById(id);
}
function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
}
function create(tag, properties, content) {
    const elem = document.createElement(tag);
    if (properties !== undefined) {
        for (const key in properties) {
            if (key.startsWith('@'))
                elem.addEventListener(key.substring(1), properties[key]);
            else
                elem.setAttribute(key, properties[key]);
        }
    }
    if (content !== undefined) {
        if (typeof (content) === 'string')
            elem.innerHTML = content;
        if (content instanceof HTMLElement)
            elem.append(content);
        if (Array.isArray(content))
            for (const child of content)
                elem.append(child);
    }
    return elem;
}
function clear(elem) {
    elem.innerHTML = '';
}
function onClick(elem, f) {
    elem.addEventListener('click', f);
}
function onMouseDown(elem, f) {
    elem.addEventListener('mousedown', f);
}
function onMouseUp(elem, f) {
    elem.addEventListener('mouseup', f);
}
function onMouseMove(elem, f) {
    elem.addEventListener('mousemove', f);
}
function onWheel(elem, f) {
    elem.addEventListener('wheel', f);
}
function onContextMenu(elem, f) {
    elem.addEventListener('contextmenu', f);
}
function onChange(elem, f) {
    elem.addEventListener('change', f);
}
function onInput(elem, f) {
    elem.addEventListener('input', f);
}
function onRightClick(elem, f) {
    elem.addEventListener('contextmenu', f);
}
function onKeyPress(elem, f) {
    elem.addEventListener('keypress', f);
}
function onKeyDown(elem, f) {
    elem.addEventListener('keydown', f);
}
function onKeyUp(elem, f) {
    elem.addEventListener('keyup', f);
}
function onDrop(elem, f) {
    elem.addEventListener('drop', f);
}
function onDragOver(elem, f) {
    elem.addEventListener('dragover', f);
}
function addClass(elem, c) {
    elem.classList.add(c);
}
function removeClass(elem, c) {
    elem.classList.remove(c);
}
function hasClass(elem, c) {
    return elem.classList.contains(c);
}
function toggleClass(elem, c) {
    hasClass(elem, c) ? removeClass(elem, c) : addClass(elem, c);
}
function setHTML(elem, html) {
    elem.innerHTML = html;
}
function setText(elem, text) {
    elem.innerText = text;
}
function requestGET(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () { resolve(this.responseText); };
        xhr.onerror = reject;
        xhr.open('GET', url);
        xhr.send();
    });
}
function requestPOST(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () { resolve(this.responseText); };
        xhr.onerror = reject;
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
    });
}
function requestHEAD(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () { resolve(this.status == 200); };
        xhr.onerror = reject;
        xhr.open('HEAD', url);
        xhr.send();
    });
}
function cssVariable(name) {
    return getComputedStyle(document.body).getPropertyValue(name);
}
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
    const cookies = decodeURIComponent(document.cookie).split(';');
    const needle = `${name}=`;
    for (let c of cookies) {
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(needle) == 0)
            return c.substring(needle.length, c.length);
    }
    return null;
}
customElements.define('x-paper', class extends HTMLElement {
    constructor() {
        super();
        // Information
        const title = this.getAttribute('title');
        const year = this.getAttribute('year');
        const comments = this.getAttribute('comments');
        const url = this.getAttribute('url');
        // Shadow root
        const root = this.attachShadow({ mode: 'open' });
        root.append(create('a', { href: url, target: '_blank', class: 'title' }, '> ' + title));
        root.append(create('span', { class: 'subtitle' }, `${comments} (${year})`));
        // root.append(create('a', { href: url, target: '_blank' }, create('div', { class: 'thumbnail' }, create('img', { src: img }))));
        // root.append(create('a', { href: url, target: '_blank' }, create('span', { class: 'title' }, title)));
        // root.append(create('span', { class: 'subtitle' }, subtitle));
        // root.append(create('span', { class: 'description' }, description));
        // root.append(create('button', { style: '' }, "Visit project"));
        // Style
        const style = document.createElement('style');
        style.textContent = `
                a {
                    text-decoration: none;
                }

                .title {
                    font-size: 20px;
                    font-weight: 500;
                    color: var(--text-color);
                    cursor: pointer;

                }

                .subtitle {
                    display: block;
                    font-weight: normal;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 16px;
                    font-weight: 400;
                    margin-top: 6px;
                    margin-bottom: 16px;
                }
            `;
        root.appendChild(style);
    }
});
customElements.define('x-project', class extends HTMLElement {
    constructor() {
        super();
        // Information
        const title = this.getAttribute('title');
        const subtitle = this.getAttribute('subtitle');
        const url = this.getAttribute('url');
        const img = this.getAttribute('img');
        const description = this.innerHTML;
        const color = this.getAttribute('color');
        // Shadow root
        const root = this.attachShadow({ mode: 'open' });
        root.append(create('a', { href: url, target: '_blank' }, create('div', { class: 'square' }, create('div', { class: 'thumbnail' }, create('img', { src: img })))));
        root.append(create('a', { href: url, target: '_blank' }, create('span', { class: 'title' }, title)));
        root.append(create('span', { class: 'subtitle' }, subtitle));
        root.append(create('span', { class: 'description' }, description));
        // root.append(create('button', { style: '' }, "Visit project"));
        // Style
        const style = document.createElement('style');
        style.textContent = `
                a {
                    text-decoration: none;
                }

                .title {
                    display: block;
                    margin-top: 20px;
                    margin-bottom: 16px;
                    font-size: 24px;
                    font-weight: 500;
                    color: var(--text-color);
                    cursor: pointer;
                }

                .subtitle {
                    display: block;
                    font-weight: normal;
                    color: var(--text-color);
                    opacity: 0.5;
                    font-size: 16px;
                    font-weight: 400;
                    margin-top: 16px;
                    margin-bottom: 16px;
                }
                
                .description {
                    display: block;
                    margin: 8px 0px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 28px;
                }

                .square {
                    position: relative;
                    max-width: 400px;
                    overflow: hidden;
                }

                .square::before {
                    content: '';
                    display: block;
                    padding-top: 100%;
                }

                .thumbnail {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: ${color};
                    background-size: cover;
                    background-position: center;
                    cursor: pointer;
                    
                }
                
                .thumbnail img {
                    max-width: 78.25%;
                    max-height: 78.25%;
                    filter: drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.67));
                    border-radius: 6px;
                    transition: transform 0.4s var(--easing-function);
                }

                .thumbnail img:hover {
                    transform: scale(1.05);
                }
                
                button {
                    width: 160px;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    background-color: var(--color-mint);
                    border: 0;
                    color: white;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: bold;
                }
            `;
        root.appendChild(style);
    }
});
