document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Active Nav Link ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop(); // Gets 'projects.html', 'index.html', etc.

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Handle special case for the homepage
        if (currentPath === '' || currentPath === '../index.html') {
            if (linkPath === 'index.html' || link.innerText === 'Home') {
                 link.classList.add('active');
            }
        // Handle project detail pages
        } else if (currentPath.startsWith('project-detail')) {
            if (link.getAttribute('href') === '../pages/projects.html') {
                link.classList.add('active');
            }
        // Handle art detail pages
        } else if (currentPath.startsWith('art-detail')) {
            if (link.getAttribute('href') === '../pages/art.html') {
                link.classList.add('active');
            }
        // Handle blog detail pages
        } else if (currentPath.startsWith('blog-detail')) {
            if (link.getAttribute('href') === '../pages/blog.html') {
                link.classList.add('active');
            }
        // Handle other pages
        } else if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});

// --- Three.js Background Animation ---
try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#hero-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0x818cf8, size: 2, sizeAttenuation: true });
    const starVertices = [];
    for (let i = 0; i < 6000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    let mouseX = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; });
    const animate = () => {
        requestAnimationFrame(animate);
        stars.position.y -= 0.2;
        stars.position.x = (mouseX - window.innerWidth / 2) * 0.0001;
        if (stars.position.y < -500) { stars.position.y = 500; }
        renderer.render(scene, camera);
    };
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
} catch(e) {
    console.error("Three.js animation failed to load.", e);
}