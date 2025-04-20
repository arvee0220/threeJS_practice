import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const textureLoader = new THREE.TextureLoader();

const blueMatcap = textureLoader.load("/matcaps/blue.png");
const redMatcap = textureLoader.load("/matcaps/red.png");
const yellowMatcap = textureLoader.load("/matcaps/yellow.png");
const whiteMatcap = textureLoader.load("/matcaps/white.png");
const greenMatcap = textureLoader.load("/matcaps/green.png");
const orangeMatcap = textureLoader.load("/matcaps/orange.png");

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cubeMaterial = [
    new THREE.MeshMatcapMaterial({ color: "blue", matcap: blueMatcap }), // right
    new THREE.MeshMatcapMaterial({ color: "red", matcap: redMatcap }), // left
    new THREE.MeshMatcapMaterial({ color: "rgba(228, 223, 223, 0.57)", matcap: whiteMatcap }), // top
    new THREE.MeshMatcapMaterial({ color: "yellow", matcap: yellowMatcap }), // bottom
    new THREE.MeshMatcapMaterial({ color: "green", matcap: greenMatcap }), // front
    new THREE.MeshMatcapMaterial({ color: "orange", matcap: orangeMatcap }) // back
];

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);

camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 3;

// Add axes helper
const axesHelper = new THREE.AxesHelper(5);

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

// render the scene
const renderloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
};

renderloop();
