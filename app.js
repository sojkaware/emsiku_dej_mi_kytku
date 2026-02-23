import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Configuration Parameters ---
const CONFIG = {
    // Interaction
    clicksRequired: 3,
    
    // Confetti
    confettiCount: 150,
    confettiFadeStartMs: 3000, // Starts fading after 3 seconds
    confettiFadeDurationMs: 4000, // Takes 4 seconds to fade completely
    confettiText: 'Vše nejlepší!',
    confettiColors: ['#FF0000', '#FFD700'], // Red and Gold
    confettiWidth: 180,
    confettiHeight: 40,
    confettiGravity: 0.025, // Easy gravity control (lower = slower fall)
    confettiSplashStrength: 0.2, // Control initial explosion speed
    
    // 3D Model
    modelsPath: '3d_models/',
    availableModels: [],
    cameraZ: 2, // Moved closer to make the flower cover more of the screen
    modelZoom: 0.8, // Manual zoom override (1.0 = fit screen, 0.8 = slightly smaller)
    backgroundColor: 0xf0f0f0,
    
    // Rotation constraints
    minPolarAngle: Math.PI / 4,
    maxPolarAngle: Math.PI / 2,
    minAzimuthAngle: -Math.PI / 4,
    maxAzimuthAngle: Math.PI / 4,
};

// --- State ---
let clickCount = 0;
let scene, camera, renderer, controls, model;

// --- DOM Elements ---
const mainButton = document.getElementById('main-button');
const uiContainer = document.getElementById('ui-container');
const confettiContainer = document.getElementById('confetti-container');
const canvasContainer = document.getElementById('canvas-container');

// --- Logic ---

mainButton.addEventListener('click', () => {
    clickCount++;
    
    // Expand-shrink effect
    mainButton.classList.remove('expand-shrink');
    void mainButton.offsetWidth; // Trigger reflow
    mainButton.classList.add('expand-shrink');

    if (clickCount >= CONFIG.clicksRequired) {
        destroyButtonAndStart();
    }
});

function destroyButtonAndStart() {
    uiContainer.style.display = 'none';
    
    // Show 3D model immediately in the background
    show3DModel();
    
    // Spawn physically realistic confetti in the foreground
    spawnConfetti();
}

function spawnConfetti() {
    const confettiPieces = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < CONFIG.confettiCount; i++) {
        const el = document.createElement('div');
        el.classList.add('confetti-piece');
        el.textContent = CONFIG.confettiText;
        
        // Randomly pick color
        const color = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
        el.style.backgroundColor = color;
        el.style.width = `${CONFIG.confettiWidth}px`;
        el.style.height = `${CONFIG.confettiHeight}px`;
        
        // Reset transform origin to center for proper 3D rotation
        el.style.transformOrigin = 'center';

        confettiContainer.appendChild(el);

        // Physics properties
        const angle = Math.random() * Math.PI * 2;
        const velocity = (15 + Math.random() * 25) * CONFIG.confettiSplashStrength; // Initial explosion speed
        
        confettiPieces.push({
            el: el,
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 10, // Slight upward bias
            rotX: Math.random() * 360,
            rotY: Math.random() * 360,
            rotZ: Math.random() * 360,
            vRotX: (Math.random() - 0.5) * 10,
            vRotY: (Math.random() - 0.5) * 10,
            vRotZ: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let startTime = null;
    
    function animateConfetti(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        let allDead = true;

        confettiPieces.forEach(p => {
            if (p.opacity <= 0) return;
            allDead = false;

            // Physics updates
            p.vy += CONFIG.confettiGravity; // Gravity
            p.vx *= 0.98; // Air drag (horizontal)
            p.vy *= 0.99; // Air drag (vertical)
            
            p.x += p.vx;
            p.y += p.vy;
            
            p.rotX += p.vRotX;
            p.rotY += p.vRotY;
            p.rotZ += p.vRotZ;
            
            // Damping rotation
            p.vRotX *= 0.99;
            p.vRotY *= 0.99;
            p.vRotZ *= 0.99;

            // Fading logic
            if (elapsed > CONFIG.confettiFadeStartMs) {
                const fadeProgress = (elapsed - CONFIG.confettiFadeStartMs) / CONFIG.confettiFadeDurationMs;
                p.opacity = Math.max(0, 1 - fadeProgress);
            }

            // Apply transforms (subtract 50% of width/height via translate to keep centered on x/y)
            p.el.style.transform = `translate(${p.x - CONFIG.confettiWidth/2}px, ${p.y - CONFIG.confettiHeight/2}px) rotateX(${p.rotX}deg) rotateY(${p.rotY}deg) rotateZ(${p.rotZ}deg)`;
            p.el.style.opacity = p.opacity;
            
            // Remove DOM element if fully faded
            if (p.opacity <= 0 && p.el.parentNode) {
                p.el.parentNode.removeChild(p.el);
            }
        });

        if (!allDead) {
            requestAnimationFrame(animateConfetti);
        } else {
            confettiContainer.style.display = 'none';
        }
    }

    requestAnimationFrame(animateConfetti);
}

function show3DModel() {
    canvasContainer.style.display = 'block';
    
    if (!scene) {
        initThreeJS();
    }
}

function initThreeJS() {
    // 1. Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.backgroundColor);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = CONFIG.cameraZ;
    camera.position.y = 0; // Adjusted for a more centered view on a large object

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 5. Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    
    // Restrict rotation based on config
    controls.minPolarAngle = CONFIG.minPolarAngle;
    controls.maxPolarAngle = CONFIG.maxPolarAngle;
    controls.minAzimuthAngle = CONFIG.minAzimuthAngle;
    controls.maxAzimuthAngle = CONFIG.maxAzimuthAngle;

    // 6. Load Model
    const loader = new GLTFLoader();
    
    fetch('models.json')
        .then(response => response.json())
        .then(models => {
            CONFIG.availableModels = models;
            if (CONFIG.availableModels.length === 0) {
                console.error('No models found in models.json');
                return;
            }
            // Randomly select a model
            const randomModelName = CONFIG.availableModels[Math.floor(Math.random() * CONFIG.availableModels.length)];
            const modelPath = CONFIG.modelsPath + randomModelName;

            loader.load(modelPath, function (gltf) {
                model = gltf.scene;
                
                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                
                // Scale the model so it perfectly fits the screen based on camera FOV
                const size = box.getSize(new THREE.Vector3());
                
                // Calculate visible screen area at the distance of the model
                const vFov = camera.fov * Math.PI / 180;
                // distance from camera to origin is Math.abs(camera.position.z)
                const visibleHeight = 2 * Math.tan(vFov / 2) * Math.abs(camera.position.z);
                const visibleWidth = visibleHeight * camera.aspect;
                
                // Calculate the scale needed to fit horizontally and vertically
                // If the model is flat or a dimension is 0, we fallback to 1 to avoid Infinity
                const scaleY = size.y > 0 ? visibleHeight / size.y : 1;
                const scaleX = size.x > 0 ? visibleWidth / size.x : 1;
                
                // Take the smaller scale factor to ensure it doesn't clip, using manual zoom level
                const scaleFactor = Math.min(scaleX, scaleY) * CONFIG.modelZoom;
                model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                
                // Recalculate center after scaling to position perfectly
                const scaledBox = new THREE.Box3().setFromObject(model);
                const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
                model.position.sub(scaledCenter);
                
                // Add model to a group to center it properly within the scene
                const group = new THREE.Group();
                group.add(model);
                scene.add(group);
                
            }, undefined, function (error) {
                console.error('Error loading 3D model:', error);
            });
        })
        .catch(err => console.error('Error fetching models.json:', err));

    // 7. Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // required if damping enabled
        renderer.render(scene, camera);
    }
    animate();

    // 8. Handle Resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
