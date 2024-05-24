customElements.define('x-project',
    class extends HTMLElement {
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

            const target = (url == '#') ? '' : '_blank';

            root.append(create('a', { href: url, target: target }, create('div', { class: 'square' }, create('div', { class: 'thumbnail' }, create('img', { src: img })))));
            root.append(create('a', { href: url, target: target }, create('span', { class: 'title' }, title)));
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
    }
);