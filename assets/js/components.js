// This script dynamically loads the header and footer into the page.
// It must be loaded after 'config.js'.

function loadComponents() {
    
    // --- Create and Inject Header ---
    const headerContainer = document.createElement('header');
    
    const navLinksHtml = config.navLinks.map(link => 
        `<a href="${link.href}" class="text-gray-300 hover:text-indigo-400 nav-link">${link.text}</a>`
    ).join('');

    const mobileNavLinksHtml = config.navLinks.map(link => 
        `<a href="${link.href}" class="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-700 nav-link">${link.text}</a>`
    ).join('');

    headerContainer.innerHTML = `
    <nav class="bg-gray-900 bg-opacity-70 backdrop-blur-md sticky top-0 z-50">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="${config.paths.home}" class="text-white text-xl font-bold nav-link">Fatemeh Pourhashem</a>
            <div class="hidden md:flex space-x-8">
                ${navLinksHtml}
            </div>
            <div class="md:hidden">
                <button id="mobile-menu-button" class="text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden">
            ${mobileNavLinksHtml}
        </div>
    </nav>
    `;
    // Add the header to the top of the body
    document.body.prepend(headerContainer);

    // --- Create and Inject Footer ---
    const footerContainer = document.createElement('footer');
    footerContainer.className = 'text-center py-8 border-t border-gray-800 mt-12';
    footerContainer.id = 'contact';
    footerContainer.innerHTML = `\
        <h2 class="text-3xl font-bold text-white mb-4">Get In Touch</h2>
        <p class="max-w-xl mx-auto mb-8">I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.</p>
        <div class="flex justify-center space-x-8 mb-4">
            <a href="${config.socials.github}" target="_blank" class="text-gray-400 hover:text-indigo-400 transition duration-300" aria-label="GitHub"><svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" /></svg></a>
            <a href="${config.socials.linkedin}" target="_blank" class="text-gray-400 hover:text-indigo-400 transition duration-300" aria-label="LinkedIn"><svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="${config.socials.email}" class="text-gray-400 hover:text-indigo-400 transition duration-300" aria-label="Email"><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></a>
        </div>
        <p class="text-gray-500 text-sm">&lt;/&gt; with <span class="heart-icon">&hearts;</span> by Fatemeh Pourhashem</p>
    `;
    // Add the footer to the end of the body
    document.body.append(footerContainer);
}

// Load the components as soon as the script is executed
loadComponents();
