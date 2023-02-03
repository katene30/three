import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3)


renderer.render(scene, camera)

// Torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({color: 0x037bfc });
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

// Lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)


const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

// Helper
// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

// const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(gridHelper)


// const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const color = new THREE.Color( 0xffffff );
  color.setHex( Math.random() * 0xffffff );
  const material = new THREE.MeshStandardMaterial({ color });
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)

}

Array(200).fill().forEach(addStar)

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

// Avatar

const kateneTexture = new THREE.TextureLoader().load('katene.png');

const katene = new THREE.Mesh(
  new THREE.BoxGeometry(4,3,3),
  new THREE.MeshBasicMaterial({ map: kateneTexture})
)

scene.add(katene)

// Mars

const marsTexture = new THREE.TextureLoader().load('mars.jpeg');
const normalTexture = new THREE.TextureLoader().load('mars-normal.jpeg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture
  })
)

scene.add(mars);


const loader = new GLTFLoader();

loader.load( 'dinosaur.glb', function ( gltf ) {
  const dinosaur = gltf.scene

  dinosaur.position.x = -10;
  dinosaur.position.z = 40;
  

	scene.add( dinosaur );

  function animate(){
    requestAnimationFrame(animate);
    
    dinosaur.rotation.x += 0.001;
    dinosaur.rotation.y += 0.005;
    dinosaur.rotation.z += 0.001;

    
 
    renderer.render(scene, camera)
  }
  
  animate()

});


mars.position.z = 30;
mars.position.setX(-10);

katene.position.z = -5;
katene.position.x = 2;


// Scroll Animation

function moveCamera(){
  
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;
  

  katene.rotation.x += 0.01;
  katene.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera



function animate(){
  requestAnimationFrame(animate);
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera)
}

animate()
