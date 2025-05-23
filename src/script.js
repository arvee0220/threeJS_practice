import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const textureLoader = new THREE.TextureLoader();

const blueMatcap = textureLoader.load("/matcaps/blue.png");
const redMatcap = textureLoader.load("/matcaps/red.png");
const yellowMatcap = textureLoader.load("/matcaps/yellow.png");
const whiteMatcap = textureLoader.load("/matcaps/white.png");
const greenMatcap = textureLoader.load("/matcaps/green.png");
const orangeMatcap = textureLoader.load("/matcaps/orange.png");


const pane = new Pane();

console.log(pane);


// initialize the scene
const scene = new THREE.Scene();

// create custom geometry
const vertices = new Float32Array([
    // square base
    -1, 0, 1,
    -1, 0, -1,
    1, 0, -1,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,

    // front side left half triangle
    -1, 0, 1,
    0, 1.5, 0,
    0, 0, 1,

    // front side right half triangle
    1, 0, 1,
    0, 1.5, 0,
    0, 0, 1,

    // right side left half triangle
    1, 0, 1,
    0, 1.5, 0,
    1, 0, 0,

    // right side right half triangle
    1, 0, 0,
    0, 1.5, 0,
    1, 0, -1,

    // back side left half triangle
    1, 0, -1,
    0, 1.5, 0,
    0, 0, -1,

    // back side right half triangle
    0, 0, -1,
    0, 1.5, 0,
    -1, 0, -1,

    // left side left half triangle
    -1, 0, -1,
    -1, 0, 0,
    0, 1.5, 0,

    // left side right half triangle
    -1, 0, 1,
    -1, 0, 0,
    0, 1.5, 0,

    // front side left half triangle
    -1, 0, 1,
    0, -2, 0,
    0, 0, 1,

    // front side right half triangle
    1, 0, 1,
    0, -2, 0,
    0, 0, 1,

    // right side left half triangle
    1, 0, 1,
    0, -2, 0,
    1, 0, 0,

    // right side right half triangle
    1, 0, 0,
    0, -2, 0,
    1, 0, -1,

    // back side left half triangle
    1, 0, -1,
    0, -2, 0,
    0, 0, -1,

    // back side right half triangle
    0, 0, -1,
    0, -2, 0,
    -1, 0, -1,

    // left side left half triangle
    -1, 0, -1,
    -1, 0, 0,
    0, -2, 0,

    // left side right half triangle
    -1, 0, 1,
    -1, 0, 0,
    0, -2, 0,
]);

const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute("position", bufferAttribute);

const material = new THREE.MeshMatcapMaterial({matcap: yellowMatcap, side: THREE.DoubleSide});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Create a parameters object
const params = {
    matcap: 'yellow',
    scale: 1,
    wireframe: false
};

// Bind scale
pane.addBinding(params, 'scale', { min: 0.1, max: 2, step: 0.1 }).on('change', (ev) => {
    mesh.scale.setScalar(ev.value);
});

// Bind wireframe toggle
pane.addBinding(params, 'wireframe').on('change', (ev) => {
    mesh.material.wireframe = ev.value;
});

// Dropdown for matcaps
pane.addBinding(params, 'matcap', {
    options: {
        yellow: 'yellow',
        blue: 'blue',
        red: 'red',
        white: 'white',
        green: 'green',
        orange: 'orange'
    }
}).on('change', (ev) => {
    const selected = ev.value;
    const matcaps = {
        blue: blueMatcap,
        red: redMatcap,
        yellow: yellowMatcap,
        white: whiteMatcap,
        green: greenMatcap,
        orange: orangeMatcap,
    };
    mesh.material.matcap = matcaps[selected];
    mesh.material.needsUpdate = true;
});

// add objects to the scene
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

/* const cubeMaterial = [
    new THREE.MeshMatcapMaterial({ color: "orange", matcap: orangeMatcap }), // right
    new THREE.MeshMatcapMaterial({ color: "red", matcap: redMatcap }), // left
    new THREE.MeshMatcapMaterial({ color: "green", matcap: greenMatcap }), // top
    new THREE.MeshMatcapMaterial({ color: "rgba(228, 223, 223, 0.57)", matcap: whiteMatcap }), // bottom
    new THREE.MeshMatcapMaterial({ color: "blue", matcap: blueMatcap }), // front
    new THREE.MeshMatcapMaterial({ color: "yellow", matcap: yellowMatcap }) // back
]; */

// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);



// scene.add(cubeMesh);

// cubeMesh.rotation.reorder("YXZ"); // set the rotation order to YXZ
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(90); // orange
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(45); // green
// cubeMesh.rotation.z = THREE.MathUtils.degToRad(0); // blue

// initialize the camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);

camera.position.z = 5;
camera.position.x = 2;
camera.position.y = 2;

// Add axes helper
const axesHelper = new THREE.AxesHelper(5);
// const meshAxesHelper = new THREE.AxesHelper(1);

// cubeMesh.add(meshAxesHelper);
scene.add(axesHelper);

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;



window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
    const currentTime = clock.getElapsedTime();
    // const delta = currentTime - previousTime;

    previousTime = currentTime;

    // cubeMesh.rotation.x += THREE.MathUtils.degToRad(1) * delta * 10;
    // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 100;
    // cubeMesh.rotation.z += THREE.MathUtils.degToRad(1) * delta * 10;

    // cubeMesh.scale.x = Math.sin(currentTime) + 1;

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
};

renderloop();
