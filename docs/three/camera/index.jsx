/**
 * transform: true
 */
import React, {useEffect} from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
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

    // 创建地面
    let planeGeometry = new THREE.PlaneGeometry(200, 200)
    let planeMaterial = new THREE.MeshLambertMaterial({color: '#ccc'})
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(10, -20, 0)
    plane.receiveShadow = true
    scene.add(plane)

    // 创建一个球体
    const sphereGeometry = new THREE.SphereGeometry(10, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 'gray'
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(2, 4, 2)
    // 开启投影
    sphere.castShadow = true
    scene.add(sphere)

    // 保存希望被GUI改变的属性
    let controls = {
      rotationSpeed: 0.02, // 旋转速度
      bouncingSpeed: 0.03, // 弹跳速度
      lightIntensity: 1
    }

    function addNewCube() {
      // 创建立方体
      let wh = 5
      let geometryT = new THREE.BoxGeometry(wh, wh, wh)
      let colors = ['green', 'pink', 'red', 'blue', 'purple', 'orange']
      let rk = Math.floor(Math.random() * (colors.length - 1))
      const materialT = new THREE.MeshLambertMaterial({
        color: colors[rk],
        opacity: 0.9
      })
      const cubeT = new THREE.Mesh(geometryT, materialT)
      cubeT.castShadow = true
      scene.add(cubeT)
      return cubeT
    }

    for (let i = -10 ; i < 10; i++) {
      for (let j = -10; j < 10; j++) {
        let cubeT = addNewCube()
        cubeT.position.set(i * 10, 0, j * 10)
      }
    }

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper)

    let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.set(-100, 60, 150)
    camera.lookAt(10, 4, 3)

    let cameraHelper = new THREE.CameraHelper(camera)
    scene.add(cameraHelper)

    let orbit = new OrbitControls(camera, renderer.domElement)
    scene.add(orbit)


    const gui = new dat.GUI({autoPlace: false})
    let control = new function () {
      this.showText = '透视投影相机'
      this.changeCamera = function () {
        if (this.showText === '正交投影相机') {
          camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
          camera.position.set(-100, 60, 150)
          camera.lookAt(10, 4, 3)
          this.showText = '透视投影相机'
        } else {
          camera = new THREE.OrthographicCamera(-w/4, w/4, w/4, -w/4, 0.1, 1000)
          camera.position.set(100, 760, 200)
          camera.lookAt(scene.position)
          this.showText = '正交投影相机'
        }
        orbit = new OrbitControls(camera, renderer.domElement)
      }
    }
    gui.add(control, 'showText').listen()
    gui.add(control, 'changeCamera')

    document.getElementById('toolbar').appendChild(gui.domElement)


    // 基础光源
    let ambientLight = new THREE.AmbientLight('gray', controls.lightIntensity)
    scene.add(ambientLight)

    let spotLight = new THREE.SpotLight('#fff')
    spotLight.position.set(-20, 100, 10)
    spotLight.castShadow = true
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.near = 40
    spotLight.shadow.camera.far = 150

    spotLight.lookAt(0,0,0)
    scene.add(spotLight)

    let gap = 0
    // 渲染函数
    function render() {
      renderer.render(scene, camera) //执行渲染操作
      gap += 0.02
      sphere.position.x = 5 + (Math.cos(gap)) * 50
      sphere.position.y = 2 + (Math.abs((Math.sin(gap)) * 40))
      requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
      // camera.lookAt(sphere.position)
      orbit.update()
    }

    render()

  }, [])
  return <div className="container">
    <div id="toolbar">
    </div>
    <div id="canvas"></div>
  </div>
}
