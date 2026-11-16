// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Copy to Clipboard Function
function copyText(text, statusElementId) {
    navigator.clipboard.writeText(text).then(() => {
        const statusEl = document.getElementById(statusElementId);
        statusEl.textContent = '✓ Copied!';
        setTimeout(() => {
            statusEl.textContent = '';
        }, 2000);
    });
}