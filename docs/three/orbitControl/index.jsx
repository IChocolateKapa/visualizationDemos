import React, {useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls'
import './index.css'

export default () => {
  useEffect(() => {
    let canvas = document.getElementById('canvas')
    let w = canvas.clientWidth
    let h = 400
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    canvas.appendChild(renderer.domElement)

    let scene = new THREE.Scene()

    let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.set(-30, 40, 50)

    let geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshLambertMaterial({
      color: 'red',
      opacity: 0.5
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, 0)
    cube.castShadow = true
    scene.add(cube)

    let planeGeometry = new THREE.PlaneGeometry(100, 100)
    let planeMaterial = new THREE.MeshLambertMaterial({color: '#ccc'})
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, -20, 0)
    scene.add(plane)

    let light = new THREE.AmbientLight('#aaa')
    scene.add(light)

    let spotLight = new THREE.SpotLight('#eee')
    spotLight.position.set(-40, 20, 50)
    spotLight.castShadow = true
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.near = 40
    spotLight.shadow.camera.far = 150

    // spotLight.lookAt(10,50,10)
    scene.add(spotLight)


    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper)

    camera.lookAt(10, 4, 3)

// 渲染函数
    function render() {
      renderer.render(scene, camera) //执行渲染操作
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      cube.rotation.z += 0.01
      requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
    }

    render()

  }, [])
  return <div className="container">
    <div id="toolbar">

    </div>
    <div id="canvas"></div>
  </div>
}
