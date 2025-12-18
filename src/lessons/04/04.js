import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// ---------------------
// Scene
// ---------------------
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

// ---------------------
// Camera
// ---------------------
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
)
camera.position.set(0, 3, 10)

// ---------------------
// Light
// ---------------------
const ambientLight = new THREE.AmbientLight(0xffffff, .3)
const pointLight = new THREE.PointLight(0xffffff, 8, 100)
pointLight.position.set(1,2,0)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)

const rightLight = new THREE.DirectionalLight(0xffffff, 8)
rightLight.position.set(2,-6,0)
const rightLightHelper = new THREE.DirectionalLightHelper(rightLight, 1)
// ---------------------
// Grid Helper
// ---------------------
const grid = new THREE.GridHelper(10,10)

// ---------------------
// Renderer
// ---------------------
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// ---------------------
// Materials
// ---------------------
const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x31700c, wireframe: true })
const pinkMaterial = new THREE.MeshPhongMaterial({color: 0xbf0db3, shininess: 100 })
const blueMaterial = new THREE.MeshStandardMaterial({color: 0x1805ed, metalness: .7, roughness: .5 })
const purpleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x7112b0, transmission: .9, opacity: 1, 
    metalness: 0, roughness: .1, ior: 1.5, clearcoat: .5, thickness: .5,
    clearcoatRoughness: .5
})
const redMaterial = new THREE.MeshLambertMaterial({color: 0xff0000})



// ---------------------
// Geometries & Meshes
// ---------------------
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(cubeGeometry, redMaterial)
const cube2 = new THREE.Mesh(cubeGeometry, greenMaterial)
const cube3 = new THREE.Mesh(cubeGeometry, pinkMaterial)
const cube4 = new THREE.Mesh(cubeGeometry, blueMaterial)
const cube5 = new THREE.Mesh(cubeGeometry, purpleMaterial)


// ? set position:
cube2.position.x = 3
cube3.position.x = -3
cube4.position.z = 3
cube5.position.z = -3



// ---------------------
// Controls
// ---------------------
const controls = new OrbitControls(camera, renderer.domElement)

// ---------------------
// Add objects to scene
// ---------------------
scene.add(cube, grid, ambientLight, pointLight, pointLightHelper, rightLight, 
    rightLightHelper, cube2, cube3, cube4, cube5
)

// ---------------------
// Animate / Render Loop
// ---------------------
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.05
    controls.update() 
    renderer.render(scene, camera) 
}

animate()
