// assets/js/config.js

const config = {
    // Paths to your main pages
    paths: {
        home: '/index.html',
        projects: '/pages/projects.html',
        art: '/pages/art.html',
        blog: '/pages/blog.html',
        blogPost: '/pages/blog-post.html'
    },
    // Paths to your JavaScript files
    scripts: {
        tailwind: 'https://cdn.tailwindcss.com',
        three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        marked: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
        main: '/assets/js/script.js',
        config: '/assets/js/config.js',
        components: '/assets/js/components.js',
        head: '/assets/js/head.js'
    },
    meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0',
        favicon: '/images/pngegg.png', // Default favicon path
        stylesheet: '/assets/css/style.css', // Default stylesheet path
        fonts: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
        author: 'Fatemeh Pourhashem'
    },
    // Social links remain the same as they are absolute URLs
    socials: {
        github: 'https://github.com/fatemehprhm',
        linkedin: 'https://www.linkedin.com/in/fatemeh-pourhashem/',
        email: 'mailto:pourhashemf266@gmail.com'
    },
    // Navigation links for the header and footer
    navLinks: [
        { href: '/index.html', text: 'Home' },
        { href: '/pages/projects.html', text: 'Projects' },
        { href: '/pages/art.html', text: 'Fine Arts' },
        { href: '/pages/blog.html', text: 'Blog' }
    ]
};