import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
  )
  
const axes = new THREE.AxesHelper(5)
scene.add(axes)

  const orbit = new OrbitControls(camera,renderer.domElement)
const ballGeo = new THREE.SphereGeometry()
const ballMat = new THREE.MeshBasicMaterial(
  {color:'0x00ff00'}
)
const ball = new THREE.Mesh(ballGeo,ballMat)
scene.add(ball)
camera.position.set(0,0,10)
camera.position.z=10
orbit.update()

function animate ()
{
  ball.rotation.x+=0.01/10
  renderer.render(scene,camera)

}

renderer.setAnimationLoop(animate)
