// 3D Background Effects using Three.js

class Background3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('background-canvas'),
            alpha: true
        });

        this.particles = [];
        this.particleCount = 100;
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Setup camera
        this.camera.position.z = 30;

        // Create particles
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.6
        });

        for (let i = 0; i < this.particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Random position
            particle.position.x = Math.random() * 60 - 30;
            particle.position.y = Math.random() * 60 - 30;
            particle.position.z = Math.random() * 60 - 30;
            
            // Random velocity
            particle.velocity = new THREE.Vector3(
                Math.random() * 0.02 - 0.01,
                Math.random() * 0.02 - 0.01,
                Math.random() * 0.02 - 0.01
            );

            this.particles.push(particle);
            this.scene.add(particle);
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation loop
        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.position.add(particle.velocity);

            // Boundary check and reverse direction
            if (Math.abs(particle.position.x) > 30) particle.velocity.x *= -1;
            if (Math.abs(particle.position.y) > 30) particle.velocity.y *= -1;
            if (Math.abs(particle.position.z) > 30) particle.velocity.z *= -1;

            // Rotate particle
            particle.rotation.x += 0.01;
            particle.rotation.y += 0.01;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update particles
        this.updateParticles();

        // Rotate camera slightly
        this.camera.position.x = 30 * Math.cos(Date.now() * 0.0001);
        this.camera.position.z = 30 * Math.sin(Date.now() * 0.0001);
        this.camera.lookAt(this.scene.position);

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const background = new Background3D();
});