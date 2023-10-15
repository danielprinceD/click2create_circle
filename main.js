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
// const ballGeo = new THREE.SphereGeometry(0.5)
// const ballMat = new THREE.MeshBasicMaterial(
//   {color:'0x00ff00'}
// )
// const ball = new THREE.Mesh(ballGeo,ballMat)
// scene.add(ball)
camera.position.set(0,0,10)
camera.position.z=10
orbit.update()


const mouse = new THREE.Vector2()
const planeNormal = new THREE.Vector3()
const intersectPoint = new THREE.Vector3()
const plane = new THREE.Plane()
const raycaster = new THREE.Raycaster()

window.addEventListener('mousemove',(e)=>
{
  mouse.x= (e.clientX/window.innerWidth)*2-1
  mouse.y= -(e.clientY/window.innerHeight)*2+1
  planeNormal.copy(camera.position).normalize()
  plane.setFromNormalAndCoplanarPoint(planeNormal,scene.position)
  raycaster.setFromCamera(mouse,camera)
  raycaster.ray.intersectPlane(plane,intersectPoint)
})

window.addEventListener('click',(e)=>
{
  const sphereGeo = new THREE.SphereGeometry(0.5)
  const sphereMat = new THREE.MeshBasicMaterial(
    {
      color:0xff0f00
    }
  )
  const sphere = new THREE.Mesh(sphereGeo,sphereMat)
  scene.add(sphere)

  sphere.position.copy(intersectPoint)
})




function animate ()
{
  // ball.rotation.x+=0.01/10
  renderer.render(scene,camera)
}


renderer.setAnimationLoop(animate)
