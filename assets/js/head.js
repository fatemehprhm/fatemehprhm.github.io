/**
 * Dynamically loads the content for the <head> section of the page.
 * This script must be loaded in the <head> after config.js.
 * @param {string} pageTitle - The title for the specific page.
 * @param {object} [options={}] - Optional overrides for paths.
 * @param {string} [options.stylesheet] - A custom path to a stylesheet for this page.
 * @param {string} [options.favicon] - A custom path to a favicon for this page.
 */
function loadHeadContent(pageTitle, options = {}) {
    // Determine the correct paths, using defaults from config and overriding if options are provided.
    const stylesheetPath = options.stylesheet || config.meta.stylesheet;
    const faviconPath = options.favicon || config.meta.favicon;

    // Set the document title
    document.title = `${pageTitle} | ${config.meta.author}`;

    // Use document.write to inject the tags directly into the head as it's being parsed.
    // This is one of the few valid use cases for document.write, ensuring styles are loaded before the body renders.
    document.write(`
        <meta charset="${config.meta.charset}">
        <meta name="viewport" content="${config.meta.viewport}">
        <link rel="icon" href="${faviconPath}" type="image/x-icon" />
        
        <!-- Scripts and External Styles -->
        <script src="${config.scripts.tailwind}"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="${config.meta.fonts}" rel="stylesheet">
        <script src="${config.scripts.three}"></script>
        
        <!-- Main Stylesheet -->
        <link rel="stylesheet" href="${stylesheetPath}">
    `);
}
