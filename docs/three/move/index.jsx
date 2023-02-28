/**
 * transform: true
 */
import React, {useEffect} from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui';
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

    let geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshLambertMaterial({
      color: 'pink',
      opacity: 0.9
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(-8, 3, 30)
    cube.castShadow = true
    scene.add(cube)

    let planeGeometry = new THREE.PlaneGeometry(200, 200)
    let planeMaterial = new THREE.MeshLambertMaterial({color: '#ccc'})
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(10, -20, 0)
    plane.receiveShadow = true
    scene.add(plane)

    let light = new THREE.AmbientLight('#fff')
    scene.add(light)

    let spotLight = new THREE.SpotLight('#eee')
    spotLight.position.set(-10, 10, 10)
    spotLight.castShadow = true
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.near = 40
    spotLight.shadow.camera.far = 150
    spotLight.lookAt(0,0,0)
    scene.add(spotLight)

    // 创建一个球体
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 'red'
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(2, 4, 2)
    // 开启投影
    sphere.castShadow = true
    scene.add(sphere)


    // 保存希望被GUI改变的属性
    let controls = {
      'rotationSpeed': 0.02, // 旋转速度
      'bouncingSpeed': 0.03 // 弹跳速度
    }
    const gui = new dat.GUI({autoPlace: false})
    gui.domElement.id = 'abc'
    document.getElementById('toolbar').appendChild(gui.domElement)
    gui.add(controls, 'rotationSpeed', 0, 0.5)
    gui.add(controls, 'bouncingSpeed', 0, 0.8)


    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper)

    let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.set(-30, 30, 60)
    camera.lookAt(10, 4, 3)

    let gap = 0
    // 渲染函数
    function render() {
      renderer.render(scene, camera) //执行渲染操作
      cube.rotation.x += controls.rotationSpeed
      cube.rotation.y += controls.rotationSpeed
      cube.rotation.z += controls.rotationSpeed

      gap += controls.bouncingSpeed
      cube.position.x = 25 + (Math.sin(gap)) * 20
      cube.position.y = 10 + (Math.abs((Math.cos(gap)) * 30))

      sphere.position.x = 5 + (Math.cos(gap)) * 50
      sphere.position.y = 2 + (Math.abs((Math.sin(gap)) * 40))

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
