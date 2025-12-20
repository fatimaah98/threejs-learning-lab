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
// Renderer
// ---------------------
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// ---------------------
// Textures
// ---------------------
const texturesLoader = new THREE.TextureLoader()
const color = texturesLoader.load("/textures/color.png")
const normal = texturesLoader.load("/textures/normal.png")
const roughness = texturesLoader.load("textures/roughness.png")

const moonMaterial = new THREE.MeshStandardMaterial(
    {
        map: color,
        normalMap: normal,
        roughnessMap: roughness
    }
)
// ---------------------
// Geometries & Meshes
// ---------------------
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphere = new THREE.Mesh(sphereGeometry, moonMaterial)

// ? You can use this code. this make a floor for pbject!
// const floorGeometry = new THREE.PlaneGeometry(10, 10) //2D
// const floorMaterial = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     roughness: .5,
//     metalness: .2
// })

// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.rotation.x = -Math.PI / 2
// floor.position.y = -.5 //? add floor to scene
// ---------------------
// Controls
// ---------------------
const controls = new OrbitControls(camera, renderer.domElement)

scene.add(sphere, ambientLight, pointLight, pointLightHelper, rightLight, 
    rightLightHelper
)
// ---------------------
// Animate / Render Loop
// ---------------------
function animate() {
    requestAnimationFrame(animate)
    sphere.rotation.x += 0.02
    controls.update() 
    renderer.render(scene, camera) 
}

animate()
