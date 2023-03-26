function createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');

    const logo = document.createElement('div');
    logo.classList.add('header-logo', 'd-flex', 'justify-content-center', 'align-items-center');
    logo.innerHTML = `
        <div class="header-image">
            <img src="../../images/header.png" alt="">
        </div>
    `;

    const nav = document.createElement('nav');
    nav.classList.add('header-options', 'd-flex', 'justify-content-center');
    nav.innerHTML = `
        <ul class="d-flex justify-content-around">
            <li>
                <a class="d-flex flex-wrap" href="main-page.html">Main Page</a>
            </li>
            <li>
                <a href="schedule.html">Schedule</a>
            </li>
            <li>
                <a href="standings.html">Standings</a>
            </li>
            <li>
                <a href="account.html">Account</a>
            </li>
        </ul>
    `;

    header.appendChild(logo);
    header.appendChild(nav);

    return header;
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer', 'd-flex', 'flex-row', 'justify-content-around', 'align-items-center');

    const pageIcon = document.createElement('div');
    pageIcon.classList.add('footer-page-icon', 'd-flex', 'justify-content-start', 'align-items-center');
    pageIcon.innerHTML = `
        <img src="../../images/icon-local-league.png" alt="">
    `;

    const links = document.createElement('div');
    links.classList.add('footer-links', 'd-flex', 'justify-content-center', 'align-items-start');
    links.innerHTML = `
        <nav class="footer-links-options d-flex flex-column justify-content-center align-items-start">
            <label for="footer-options">LINKS</label>
            <ul class="footer-options d-flex flex-column">
                <li>
                    <a href="main-page.html">Main Page</a>
                </li>
                <li>
                    <a href="schedule.html">Schedule</a>
                </li>
                <li>
                    <a href="standings.html">Standings</a>
                </li>
                <li>
                    <a href="account.html">Account</a>
                </li>
            </ul>
        </nav>
    `;

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('footer-contact-info', 'd-flex', 'justify-content-center', 'align-items-start');
    contactInfo.innerHTML = `
        <nav class="footer-contact-info-options d-flex flex-column justify-content-center align-items-start">
            <label for="footer-options">CONTACT INFO</label>
            <ul class="footer-options d-flex flex-column">
                <li>
                    <a href="https://www.google.com/maps/place/%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1+%CE%97%CE%BB%CE%B5%CE%BA%CF%84%CF%81%CE%BF%CE%BB%CF%8C%CE%B3%CF%89%CE%BD+%CE%9C%CE%B7%CF%87%CE%B1%CE%BD%CE%B9%CE%BA%CF%8E%CE%BD+%CE%BA%CE%B1%CE%B9+%CE%A4%CE%B5%CF%87%CE%BD%CE%BF%CE%BB%CE%BF%CE%B3%CE%AF%CE%B1%CF%82+%CE%A5%CF%80%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CF%83%CF%84%CF%8E%CE%BD,+%CE%A0%CE%BF%CE%BB%CF%85%CF%84%CE%B5%CF%87%CE%BD%CE%B9%CE%BA%CE%AE+%CE%A3%CF%87%CE%BF%CE%BB%CE%AE,+%CE%A0%CE%B1%CE%BD%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%AE%CE%BC%CE%B9%CE%BF+%CE%A0%CE%B1%CF%84%CF%81%CF%8E%CE%BD/@38.288481,21.7881479,18z/data=!3m1!4b1!4m6!3m5!1s0x135e4b2793dd6803:0x52ca8ed18dc0ae06!8m2!3d38.288481!4d21.7892422!16s%2Fg%2F11tryg300w">
                        Electrical and Computer Engineering, University of Patras
                    </a>
                </li>
                <li>
                    <a href="mailto:up1072824@upnet.gr,up1072774@upnet.gr">
                        Send us an email
                    </a>
                </li>
                <li>
                    <a href="tel:+306948753087">
                        Call us
                    </a>
                </li>
            </ul>
        </nav>
    `;

    const connectWithUs = document.createElement('div');
    connectWithUs.classList.add('footer-connect-with-us', 'd-flex', 'flex-column',  'justify-content-start', 'align-items-center');
    connectWithUs.innerHTML = `
        <label for="connection-icons">CONNECT WITH US</label>
        <div class="connection-icons d-flex flex-row justify-content-around align-items-center">
            <div class="info-box">
                <a href="https://www.facebook.com/tsaperlein/">
                    <img src="../../images/facebook-logo.png" alt="">
                </a>
            </div>
            <div class="info-box">
                <a href="https://twitter.com/tsaperlein">
                    <img src="../../images/twitter-logo.png" alt="">
                </a>
            </div>
            <div class="info-box">
                <a href="https://github.com/tsaperlein/Local_League">
                    <img src="../../images/github-logo.png" alt="">
                </a>
            </div>
        </div>
    `;
    footer.appendChild(pageIcon);
    footer.appendChild(links);
    footer.appendChild(contactInfo);
    footer.appendChild(connectWithUs);

    return footer;
}

const header = createHeader();
const footer = createFooter();
document.getElementById('header').appendChild(header);
document.getElementById('footer').appendChild(footer);