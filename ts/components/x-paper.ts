customElements.define('x-paper',
    class extends HTMLElement {
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
    }
);