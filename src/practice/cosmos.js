import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
)


const ambientLight = new THREE.AmbientLight(0xffffff, .3)
const pointLight = new THREE.PointLight(0xffffff, 8, 100)
const rightLight = new THREE.DirectionalLight(0xffffff, 8)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
const rightLightHelper = new THREE.DirectionalLightHelper(rightLight, 1)

scene.background = new THREE.Color(0x000000)
camera.position.set(0, 3, 10)
rightLight.position.set(2,-6,0)
pointLight.position.set(1,2,0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const textureLoader = new THREE.TextureLoader()
const star = textureLoader.load("/textures/nova_0.png")
const galaxyGeometry = new THREE.BufferGeometry()
const galaxyMaterials = new THREE.PointsMaterial({
    color: 0xffffff,
    size: .02,
    sizeAttenuation: true,
    transparent: true,
    alphaTest: 0.001,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: star
})
const count = 10000;
const positions = new Float32Array(count * 3)
for (let i = 0; i < count; i ++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - .5) * 10; //x
    positions[i3 + 1] = (Math.random() - .5) * 10; //y
    positions[i3 + 2] = (Math.random() - .5) * 10 //z
}

galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(positions, 3))
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterials)

// SUN:
const sunTexture = textureLoader.load("/textures/sun.png")
const sunGeometry = new THREE.SphereGeometry(.1, 32, 32)
const sunMaterials = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    // emissive: 0xffaa33,
    emissiveIntensity: 1.5,
    roughness: .2,
    metalness: 0,
    map: star
})
const sun = new THREE.Mesh(sunGeometry, sunMaterials)
const sunLight = new THREE.PointLight(0xffddaa, 5, 50)
const controls = new OrbitControls(camera, renderer.domElement)

scene.add(
    ambientLight,
    pointLight,
    rightLight,
    // pointLightHelper,
    // rightLightHelper,
    galaxy,
    sun
)
function animate() {
    requestAnimationFrame(animate)
    galaxy.rotation.y += .005
    galaxy.rotation.x += .005
    controls.update() 
    renderer.render(scene, camera) 
}

animate()