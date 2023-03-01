import React, {useEffect} from 'react'
import * as THREE from 'three'
import './index.css'

export default () => {
  useEffect(() => {
    let canvas = document.getElementById('canvas')
    let w = canvas.clientWidth
    let h = 400

    let scene = new THREE.Scene()

    let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.set(10, 10, 10)

    let geometry = new THREE.BoxGeometry(5, 1, 5)
    const material = new THREE.MeshBasicMaterial({
      color: 'pink',
      opacity: 0.5
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, 0)

    scene.add(cube)

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150)
    scene.add(axesHelper)

    camera.lookAt(10, 4, 3)

    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(w, h)

    canvas.appendChild(renderer.domElement)


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
  return <div id="canvas" />
}
