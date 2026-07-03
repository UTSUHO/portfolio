'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ProjectWebGLPreviewProps {
  visualType: 'wireframe' | 'network' | 'voxel' | 'shader'
}

export default function ProjectWebGLPreview({ visualType }: ProjectWebGLPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    if (visualType === 'wireframe') {
      const geometry = new THREE.IcosahedronGeometry(1.5, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true })
      const mesh = new THREE.Mesh(geometry, material)
      group.add(mesh)

      const innerGeometry = new THREE.IcosahedronGeometry(1.2, 0)
      const innerMaterial = new THREE.MeshBasicMaterial({ color: 0xf84532, wireframe: true })
      const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)
      group.add(innerMesh)
    } else if (visualType === 'network') {
      const nodeGeometry = new THREE.BufferGeometry()
      const nodeCount = 40
      const positions = new Float32Array(nodeCount * 3)
      for (let i = 0; i < nodeCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 4
      }
      nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const nodeMaterial = new THREE.PointsMaterial({ color: 0xf84532, size: 0.04 })
      const nodes = new THREE.Points(nodeGeometry, nodeMaterial)
      group.add(nodes)

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333 })
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < 1.2) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
              new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
            ])
            const line = new THREE.Line(lineGeometry, lineMaterial)
            group.add(line)
          }
        }
      }
    } else if (visualType === 'voxel') {
      const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 })
      const accentMaterial = new THREE.MeshBasicMaterial({ color: 0xf84532 })
      for (let x = -3; x <= 3; x++) {
        for (let y = -3; y <= 3; y++) {
          for (let z = -3; z <= 3; z++) {
            if (Math.random() > 0.7) {
              const material = Math.random() > 0.9 ? accentMaterial : boxMaterial
              const cube = new THREE.Mesh(boxGeometry, material)
              cube.position.set(x * 0.25, y * 0.25, z * 0.25)
              group.add(cube)
            }
          }
        }
      }
    } else {
      const geometry = new THREE.PlaneGeometry(4, 4, 32, 32)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0xf84532) }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 4.0 + uTime) * 0.2;
            pos.z += cos(pos.y * 4.0 + uTime) * 0.2;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 uColor;
          void main() {
            float grid = step(0.95, fract(vUv.x * 20.0)) + step(0.95, fract(vUv.y * 20.0));
            vec3 color = mix(vec3(0.05), uColor, grid * 0.5);
            gl_FragColor = vec4(color, 1.0);
          }
        `
      })
      const mesh = new THREE.Mesh(geometry, material)
      group.add(mesh)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / width - 0.5) * 2,
        y: ((e.clientY - rect.top) / height - 0.5) * 2
      }
    }

    container.addEventListener('mousemove', handleMouseMove)

    let targetRotationX = 0
    let targetRotationY = 0
    let animationId: number

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate)

      targetRotationX = mouseRef.current.y * 0.3
      targetRotationY = mouseRef.current.x * 0.3

      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05

      if (visualType === 'shader') {
        group.children.forEach((child) => {
          const material = (child as THREE.Mesh).material as THREE.ShaderMaterial
          if (material.uniforms) {
            material.uniforms.uTime.value = time * 0.001
          }
        })
      }

      renderer.render(scene, camera)
    }

    animationId = requestAnimationFrame(animate)

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [visualType])

  return <div ref={containerRef} className="w-full h-full min-h-[400px] bg-bg-invert" />
}
