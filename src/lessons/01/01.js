import * as THREE from "three";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0o000000)

// ? fov: 75 is standard for 3D
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
renderer.render(scene, camera);