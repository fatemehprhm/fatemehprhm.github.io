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


async function loadJobs() {
    try {
        const response = await fetch('../../lists/jobs.yaml');
        const yamlText = await response.text();
        
        const data = jsyaml.load(yamlText);
        const jobs = data.jobs;
        
        const container = document.getElementById('jobs-container');

        // Loop through each job and create the HTML
        jobs.forEach(job => {
            const jobHTML = `
                <div class="mb-12">
                    <div class="absolute w-4 h-4 bg-indigo-500 rounded-full -left-2 mt-1.5"></div>
                    <p class="text-sm text-indigo-300">${job.period}</p>
                    <h3 class="text-xl font-semibold text-white mt-1">${job.title}</h3>
                    <p class="text-gray-400">${job.company}</p>
                    <p class="mt-2 text-justify">${job.description}</p>
                </div>
            `;

            // Add the new job HTML to the container
            container.innerHTML += jobHTML;
        });
        
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

loadJobs();

async function loadCurrentProjects() {
    try {
        const response = await fetch('../../lists/current_projects.yaml');
        const yamlText = await response.text();
        
        const data = jsyaml.load(yamlText);
        const projects = data.projects;
        
        const container = document.getElementById('current-projects-container');
        
        // Status color mapping
        const statusColors = {
            'Active Development': { bg: 'green', text: 'green' },
            'Research Phase': { bg: 'yellow', text: 'yellow' },
            'Testing Phase': { bg: 'blue', text: 'blue' },
            'Planning Phase': { bg: 'purple', text: 'purple' },
            'On Hold': { bg: 'gray', text: 'gray' },
            'Preparation Phase': { bg: 'emerald', text: 'emerald' }
        };
        
        // Progress color mapping
        const progressColors = {
            'Active Development': 'from-indigo-500 to-purple-500',
            'Research Phase': 'from-yellow-500 to-orange-500',
            'Testing Phase': 'from-blue-500 to-cyan-500',
            'Planning Phase': 'from-purple-500 to-pink-500',
            'On Hold': 'from-gray-500 to-gray-600',
            'Preparation Phase': 'from-emerald-500 to-green-500'
        };

        // Loop through each project and create the HTML
        projects.forEach(project => {
            const statusColor = statusColors[project.status] || statusColors['Planning Phase'];
            const progressColor = progressColors[project.status] || progressColors['Planning Phase'];
            
            // Generate tech stack tags
            const techStackHTML = project.tech_stack.map(tech => 
                `<span class="px-2 py-1 bg-${tech.color}-600/20 text-${tech.color}-300 rounded-full text-xs">${tech.name}</span>`
            ).join('');
            
            // Generate action buttons (only if buttons exist and array is not empty)
            let buttonsHTML = '';
            if (project.buttons && project.buttons.length > 0) {
                buttonsHTML = project.buttons.map((button, index) => {
                    if (index === 0) {
                        return `<a href="${button.link}" class="flex-1 bg-${statusColor.bg}-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-${statusColor.bg}-700 transition duration-300 text-center">${button.text}</a>`;
                    } else {
                        return `<a href="${button.link}" class="px-4 py-2 border border-gray-600 text-gray-300 text-sm rounded-lg hover:border-gray-500 transition duration-300">${button.text}</a>`;
                    }
                }).join('');
            }

            const projectHTML = `
                <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-${statusColor.bg}-500/30 hover:border-${statusColor.bg}-500/60 transition-all duration-300 transform hover:scale-105">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-${statusColor.bg}-500 rounded-full animate-pulse"></div>
                            <span class="text-sm text-${statusColor.text}-400 font-medium">${project.status}</span>
                        </div>
                        <div class="text-xs text-gray-400">${project.started}</div>
                    </div>
                    
                    <h3 class="text-xl font-semibold text-white mb-3">${project.title}</h3>
                    <p class="text-gray-300 mb-4 text-sm">
                        ${project.description}
                    </p>
                    
                    <!-- Progress Bar -->
                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs text-gray-400">Progress</span>
                            <span class="text-xs text-${statusColor.text}-400">${project.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-700 rounded-full h-2">
                            <div class="bg-gradient-to-r ${progressColor} h-2 rounded-full" style="width: ${project.progress}%"></div>
                        </div>
                    </div>
                    
                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${techStackHTML}
                    </div>
                    
                    <!-- Action Buttons (only if buttons exist) -->
                    ${buttonsHTML ? `<div class="flex gap-2">${buttonsHTML}</div>` : ''}
                </div>
            `;

            // Add the new project HTML to the container
            container.innerHTML += projectHTML;
        });
        
    } catch (error) {
        console.error('Error loading current projects:', error);
    }
}

loadCurrentProjects();

async function loadArtworks() {
    try {
        const response = await fetch('../lists/artworks.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        
        renderArtworks(data.artworks);
    } catch (error) {
        console.error('Error loading artworks:', error);
    }
}

// Function to render artworks in the gallery
function renderArtworks(artworks) {
    const grid = document.getElementById('artworks-grid');
    grid.innerHTML = '';
    
    artworks.forEach(artwork => {
        const artworkElement = document.createElement('div');
        artworkElement.className = 'group cursor-pointer';
        artworkElement.innerHTML = `
            <div class="relative overflow-hidden rounded-lg bg-gray-800 aspect-[3/4] hover:scale-105 transition-transform duration-300">
                <img src="${artwork.image}" 
                    alt="${artwork.alt}" 
                    class="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
        `;
        
        artworkElement.addEventListener('click', () => {
            openArtworkModal(artwork.id, artwork.image, artwork.alt);
        });
        
        grid.appendChild(artworkElement);
    });
}

// Function to open artwork in modal
function openArtworkModal(id, image, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm';
    modal.style.animation = 'fadeIn 0.3s ease-out';
    
    modal.innerHTML = `
        <div class="relative max-w-6xl max-h-full flex items-center justify-center">
            <img src="${image}" 
                    alt="${alt}" 
                    class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    style="animation: scaleIn 0.3s ease-out;">
            <button onclick="closeModal(this)" 
                    class="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition-all duration-200 font-bold">
                ×
            </button>
        </div>
    `;
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    document.body.appendChild(modal);
}

// Function to close modal with animation
function closeModal(element) {
    const modal = element.closest ? element.closest('.fixed') : element;
    modal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 300);
}

document.addEventListener('DOMContentLoaded', loadArtworks);

function loadVolunteering() {
    const themes = {
        sky: 'from-sky-600/10 to-blue-600/10 border-sky-500/30 bg-sky-500',
        rose: 'from-rose-600/10 to-pink-600/10 border-rose-500/30 bg-rose-500',
        amber: 'from-amber-600/10 to-yellow-600/10 border-amber-500/30 bg-amber-500',
        lime: 'from-lime-600/10 to-green-600/10 border-lime-500/30 bg-lime-500'
    };

    fetch('../lists/volunteering.yaml')
        .then(response => response.text())
        .then(yaml => {
            const volunteeringItems = jsyaml.load(yaml);
            const container = document.getElementById('volunteering-container');
            
            let html = '';
            volunteeringItems.forEach(item => {
                const themeClasses = themes[item.theme] || themes.sky;
                html += `
                    <div class="bg-gradient-to-r ${themeClasses.split(' ')[0]} ${themeClasses.split(' ')[1]} p-6 rounded-xl border ${themeClasses.split(' ')[2]}">
                        <div class="flex items-start gap-4">
                            <div class="w-3 h-3 ${themeClasses.split(' ')[3]} rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <h3 class="text-xl font-semibold text-white mb-2">${item.title}</h3>
                                <p class="text-gray-300 mb-2">${item.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching or parsing volunteering data:', error);
            const container = document.getElementById('volunteering-container');
            container.innerHTML = '<p class="text-center text-red-400">Could not load volunteering experience.</p>';
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadVolunteering(); 
});