import * as THREE from "three"

// ---------------------
// Scene & Camera
// ---------------------
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000) // پس‌زمینه مشکی

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
)
camera.position.z = 5

// ---------------------
// Renderer
// ---------------------
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// ---------------------
// Materials
// ---------------------
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const grayMaterial = new THREE.MeshBasicMaterial({ color: 0xd5d5d5 })
const pinkMaterial = new THREE.MeshBasicMaterial({ color: 0xfc64ff })
const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x6dd47b })

// ---------------------
// Geometries & Meshes
// ---------------------

// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(cubeGeometry, redMaterial)

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphere = new THREE.Mesh(sphereGeometry, grayMaterial)
sphere.position.x = 3

// Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 4, 32)
const cylinder = new THREE.Mesh(cylinderGeometry, pinkMaterial)
cylinder.position.x = -3

// Torus / Ring
const torusGeometry = new THREE.TorusGeometry(1, 0.1, 12, 100)
const torus = new THREE.Mesh(torusGeometry, greenMaterial)
torus.position.y = 3

// Add all objects to scene
scene.add(cube, sphere, cylinder, torus)

// ---------------------
// Render Scene
// ---------------------
renderer.render(scene, camera)
