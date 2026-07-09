'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ProjectPlaceholderWebGL() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    const stageEl = stage
    const canvasEl = canvas

    let disposed = false
    let animationId: number

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 100)
    camera.position.set(4.6, 3.0, 5.6)
    camera.lookAt(0.2, 0.3, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const disposables: { dispose?: () => void }[] = []

    function track<T extends { dispose?: () => void }>(item: T): T {
      disposables.push(item)
      return item
    }

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    }

    const root = new THREE.Group()
    root.position.set(1.55, -0.15, 0)
    scene.add(root)

    const cubeGroup = new THREE.Group()
    root.add(cubeGroup)

    const gridGroup = new THREE.Group()
    root.add(gridGroup)

    const accentGroup = new THREE.Group()
    root.add(accentGroup)

    const materialCube = track(
      new THREE.MeshStandardMaterial({
        color: 0x565d63,
        roughness: 0.72,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88
      })
    )

    const materialCubeTop = track(
      new THREE.MeshStandardMaterial({
        color: 0x777f86,
        roughness: 0.62,
        metalness: 0.12,
        transparent: true,
        opacity: 0.55
      })
    )

    const materialSmall = track(
      new THREE.MeshStandardMaterial({
        color: 0x4c5359,
        roughness: 0.78,
        metalness: 0.08
      })
    )

    const materialShadow = track(
      new THREE.ShadowMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.18
      })
    )

    const lineMat = track(
      new THREE.LineBasicMaterial({
        color: 0xdfe5e8,
        transparent: true,
        opacity: 0.3,
        depthWrite: false
      })
    )

    const lineSoftMat = track(
      new THREE.LineBasicMaterial({
        color: 0xdfe5e8,
        transparent: true,
        opacity: 0.16,
        depthWrite: false
      })
    )

    const dashedMat = track(
      new THREE.LineDashedMaterial({
        color: 0xdfe5e8,
        transparent: true,
        opacity: 0.38,
        dashSize: 0.08,
        gapSize: 0.055,
        depthWrite: false
      })
    )

    const accentMat = track(
      new THREE.LineBasicMaterial({
        color: 0xcfd5d9,
        transparent: true,
        opacity: 0.42,
        depthWrite: false
      })
    )

    function createLine(points: THREE.Vector3[], material = lineMat) {
      const geo = track(new THREE.BufferGeometry().setFromPoints(points))
      const line = new THREE.Line(geo, material)
      if (material instanceof THREE.LineDashedMaterial) {
        line.computeLineDistances()
      }
      return line
    }

    function createSegments(points: THREE.Vector3[], material = lineMat) {
      const geo = track(new THREE.BufferGeometry().setFromPoints(points))
      const line = new THREE.LineSegments(geo, material)
      if (material instanceof THREE.LineDashedMaterial) {
        line.computeLineDistances()
      }
      return line
    }

    function addBoxEdges(
      group: THREE.Group,
      size: THREE.Vector3,
      position: THREE.Vector3,
      material = lineMat
    ) {
      const boxGeo = track(new THREE.BoxGeometry(size.x, size.y, size.z))
      const edgeGeo = track(new THREE.EdgesGeometry(boxGeo))
      const edges = new THREE.LineSegments(edgeGeo, material)
      edges.position.copy(position)
      group.add(edges)
      if (material instanceof THREE.LineDashedMaterial) {
        edges.computeLineDistances()
      }
      return edges
    }

    function addMainCube() {
      const cubeGeo = track(new THREE.BoxGeometry(1.55, 1.55, 1.55))
      const cube = new THREE.Mesh(cubeGeo, materialCube)
      cube.castShadow = true
      cube.receiveShadow = true
      cube.position.set(0, 0.78, 0)
      cubeGroup.add(cube)

      const topGeo = track(new THREE.BoxGeometry(1.552, 0.022, 1.552))
      const topPlate = new THREE.Mesh(topGeo, materialCubeTop)
      topPlate.position.set(0, 1.568, 0)
      cubeGroup.add(topPlate)

      addBoxEdges(
        cubeGroup,
        new THREE.Vector3(1.57, 1.57, 1.57),
        new THREE.Vector3(0, 0.78, 0),
        lineMat
      )

      addBoxEdges(
        cubeGroup,
        new THREE.Vector3(2.15, 2.15, 2.15),
        new THREE.Vector3(0, 1.05, 0),
        dashedMat
      )

      return cube
    }

    addMainCube()

    function addGround() {
      const groundGeo = track(new THREE.PlaneGeometry(10, 10))
      const ground = new THREE.Mesh(groundGeo, materialShadow)
      ground.rotation.x = -Math.PI / 2
      ground.position.y = -0.02
      ground.receiveShadow = true
      gridGroup.add(ground)

      const extent = 4.6
      const step = 0.72

      for (let i = -6; i <= 6; i++) {
        const k = i * step
        const opacityFactor = 1 - Math.min(Math.abs(i) / 7, 0.85)

        const localMat = track(
          new THREE.LineBasicMaterial({
            color: 0xdfe5e8,
            transparent: true,
            opacity: 0.055 + opacityFactor * 0.075,
            depthWrite: false
          })
        )

        const a = createLine(
          [new THREE.Vector3(-extent, 0, k), new THREE.Vector3(extent, 0, k)],
          localMat
        )
        const b = createLine(
          [new THREE.Vector3(k, 0, -extent), new THREE.Vector3(k, 0, extent)],
          localMat
        )
        gridGroup.add(a, b)
      }

      gridGroup.add(
        createLine(
          [
            new THREE.Vector3(-3.9, 0.004, -2.0),
            new THREE.Vector3(2.9, 0.004, 2.9)
          ],
          lineSoftMat
        )
      )

      gridGroup.add(
        createLine(
          [
            new THREE.Vector3(-3.2, 0.004, 2.5),
            new THREE.Vector3(3.8, 0.004, -2.0)
          ],
          lineSoftMat
        )
      )

      const base = [
        new THREE.Vector3(-1.62, 0.01, -1.62),
        new THREE.Vector3(1.62, 0.01, -1.62),
        new THREE.Vector3(1.62, 0.01, -1.62),
        new THREE.Vector3(1.62, 0.01, 1.62),
        new THREE.Vector3(1.62, 0.01, 1.62),
        new THREE.Vector3(-1.62, 0.01, 1.62),
        new THREE.Vector3(-1.62, 0.01, 1.62),
        new THREE.Vector3(-1.62, 0.01, -1.62)
      ]
      gridGroup.add(createSegments(base, accentMat))
    }

    addGround()

    function addSmallGeometry() {
      const smallCubeGeo = track(new THREE.BoxGeometry(0.28, 0.28, 0.28))
      const smallCube = new THREE.Mesh(smallCubeGeo, materialSmall)
      smallCube.position.set(-1.48, 0.14, 0.98)
      smallCube.rotation.y = 0.42
      smallCube.castShadow = true
      smallCube.receiveShadow = true
      accentGroup.add(smallCube)

      const slabGeo = track(new THREE.BoxGeometry(0.34, 0.06, 0.22))
      const slab = new THREE.Mesh(slabGeo, materialSmall)
      slab.position.set(-1.55, 0.035, 1.52)
      slab.rotation.y = -0.25
      slab.castShadow = true
      slab.receiveShadow = true
      accentGroup.add(slab)

      const cylGeo = track(new THREE.CylinderGeometry(0.12, 0.12, 0.055, 40))
      const cyl = new THREE.Mesh(cylGeo, materialSmall)
      cyl.position.set(1.12, 0.03, 1.78)
      cyl.castShadow = true
      cyl.receiveShadow = true
      accentGroup.add(cyl)

      const bracketPts = [
        new THREE.Vector3(1.73, 0.02, 0.78),
        new THREE.Vector3(1.93, 0.02, 0.78),
        new THREE.Vector3(1.73, 0.02, 0.78),
        new THREE.Vector3(1.73, 0.02, 0.58),
        new THREE.Vector3(2.23, 0.02, 0.78),
        new THREE.Vector3(2.03, 0.02, 0.78),
        new THREE.Vector3(2.23, 0.02, 0.78),
        new THREE.Vector3(2.23, 0.02, 0.58)
      ]
      accentGroup.add(createSegments(bracketPts, lineMat))

      return { smallCube, slab, cyl }
    }

    const smallShapes = addSmallGeometry()

    function addCallout() {
      const callout = createLine(
        [
          new THREE.Vector3(1.15, 0.04, 1.48),
          new THREE.Vector3(2.9, 0.04, 2.25),
          new THREE.Vector3(3.75, 0.04, 2.25)
        ],
        lineSoftMat
      )
      accentGroup.add(callout)

      const dotGeo = track(new THREE.SphereGeometry(0.022, 16, 16))
      const dotMat = track(
        new THREE.MeshBasicMaterial({
          color: 0xdfe5e8,
          transparent: true,
          opacity: 0.58
        })
      )
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.set(2.9, 0.045, 2.25)
      accentGroup.add(dot)
    }

    addCallout()

    scene.add(new THREE.AmbientLight(0xffffff, 1.55))

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(-3.5, 6.0, 4.0)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(2048, 2048)
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 14
    keyLight.shadow.camera.left = -6
    keyLight.shadow.camera.right = 6
    keyLight.shadow.camera.top = 6
    keyLight.shadow.camera.bottom = -6
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7)
    fillLight.position.set(3.5, 3.0, -2.5)
    scene.add(fillLight)

    function updatePointer(event: PointerEvent) {
      const rect = stageEl.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1)

      pointer.targetX = THREE.MathUtils.clamp(nx, -1, 1)
      pointer.targetY = THREE.MathUtils.clamp(ny, -1, 1)
    }

    function resetPointer() {
      pointer.targetX = 0
      pointer.targetY = 0
    }

    stageEl.addEventListener('pointermove', updatePointer, { passive: true })
    stageEl.addEventListener('pointerleave', resetPointer, { passive: true })

    const clock = new THREE.Clock()

    function animate() {
      if (disposed) return
      animationId = requestAnimationFrame(animate)

      const t = clock.getElapsedTime()

      pointer.x += (pointer.targetX - pointer.x) * 0.075
      pointer.y += (pointer.targetY - pointer.y) * 0.075

      camera.position.x = 4.6 + pointer.x * 0.42
      camera.position.y = 3.0 + pointer.y * 0.25
      camera.position.z = 5.6 + pointer.y * 0.1
      camera.lookAt(0.24 + pointer.x * 0.12, 0.42 + pointer.y * 0.06, 0)

      cubeGroup.rotation.y = pointer.x * 0.055 + Math.sin(t * 0.35) * 0.012
      cubeGroup.rotation.x = -pointer.y * 0.035 + Math.sin(t * 0.27) * 0.008

      gridGroup.position.x = -pointer.x * 0.05
      gridGroup.position.z = pointer.y * 0.05

      accentGroup.position.x = pointer.x * 0.12
      accentGroup.position.z = -pointer.y * 0.08

      smallShapes.smallCube.rotation.y = 0.42 + t * 0.18 + pointer.x * 0.2
      smallShapes.slab.rotation.y = -0.25 + pointer.x * 0.08
      smallShapes.cyl.position.y = 0.03 + Math.sin(t * 0.9) * 0.012

      renderer.render(scene, camera)
    }

    function resize() {
      const rect = stageEl.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stageEl)
    resize()

    animate()

    return () => {
      disposed = true
      cancelAnimationFrame(animationId)
      stageEl.removeEventListener('pointermove', updatePointer)
      stageEl.removeEventListener('pointerleave', resetPointer)
      resizeObserver.disconnect()
      disposables.forEach((item) => item.dispose?.())
      renderer.dispose()
    }
  }, [])

  return (
    <div className="root grid place-items-center w-full h-full min-h-[400px] overflow-hidden bg-[#1f2328] max-md:items-stretch">
      <div
        ref={stageRef}
        className="stage relative w-full max-w-[1680px] aspect-video overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.34)] isolate max-md:w-full max-md:h-full max-md:max-w-none max-md:aspect-auto"
        style={{
          background:
            'radial-gradient(circle at 64% 42%, rgba(255,255,255,0.10), transparent 28%), radial-gradient(circle at 45% 82%, rgba(255,255,255,0.08), transparent 35%), linear-gradient(135deg, #343940 0%, #272c31 45%, #22262b 100%)'
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1] block w-full h-full"
        />

        <div className="top-line absolute z-[6] left-[clamp(34px,5vw,70px)] top-[clamp(34px,7vh,72px)] w-[clamp(140px,20vw,320px)] h-px bg-[linear-gradient(90deg,rgba(235,239,242,0.34),transparent)]" />

        <section
          className="copy absolute z-[6] left-[clamp(8px,3%,240px)] top-[44%] -translate-y-1/2 text-[rgba(235,239,242,0.78)] uppercase tracking-[0.42em] max-md:left-1/2 max-md:top-[25%] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:text-center"
          aria-label="Placeholder text"
        >

          <h1
            className="title m-0 font-normal leading-none text-[clamp(22px,2.25vw,40px)]"
            style={{ textShadow: '0 0 22px rgba(255,255,255,0.08)' }}
          >
            PLACEHOLDER
          </h1>
          <div className="subtitle mt-[30px] text-[rgba(235,239,242,0.48)] text-[clamp(11px,1.05vw,18px)] tracking-[0.54em] font-medium">
            NO CONTENT AVAILABLE
          </div>
          <div className="short-rule w-7 h-px mt-[58px] mx-auto bg-[rgba(235,239,242,0.58)]" />
        </section>

        <div className="corner-copy absolute z-[6] right-[clamp(8px,32px,140px)] bottom-[clamp(8px,32px,160px)] text-[rgba(235,239,242,0.78)] flex items-center gap-[15px] text-[clamp(10px,0.9vw,14px)] tracking-[0.36em] uppercase whitespace-nowrap max-md:hidden">
          NO COVER ASSET
        </div>

        <section className="micro-ui absolute z-[6] left-[clamp(34px,5vw,70px)] bottom-[clamp(34px,7vh,78px)] grid grid-cols-[48px_auto] gap-[22px] items-center text-[rgba(235,239,242,0.48)] text-xs tracking-[0.12em] max-md:hidden">
                    <div className="focus-mark relative w-12 h-12 mx-auto mt-[20px] mb-[20px] opacity-[0.78]">
            <span />
          </div>
          <div className="leading-[1.6]">
            <div>
              <b>MODULE ID</b> Plcaholder
            </div>
            <div>
              <b>STATUS</b> DEFAULT
            </div>
            <div>
              <b>VERSION</b> V2.0
            </div>
          </div>
        </section>

        <div
          className="grain absolute inset-0 z-[4] pointer-events-none opacity-[0.045] mix-blend-screen"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.55) 1px, transparent 1px, transparent 3px)',
            backgroundSize: '12px 12px'
          }}
        />

        <div
          className="vignette absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.20), transparent 18%, transparent 82%, rgba(0,0,0,0.18)), radial-gradient(circle at 55% 50%, transparent 0 45%, rgba(0,0,0,0.28) 100%)'
          }}
        />
      </div>

      <style jsx>{`
        .focus-mark::before,
        .focus-mark::after,
        .focus-mark span::before,
        .focus-mark span::after {
          content: '';
          position: absolute;
          width: 13px;
          height: 13px;
          border-color: rgba(235, 239, 242, 0.72);
        }

        .focus-mark::before {
          left: 0;
          top: 0;
          border-left: 2px solid;
          border-top: 2px solid;
        }

        .focus-mark::after {
          right: 0;
          top: 0;
          border-right: 2px solid;
          border-top: 2px solid;
        }

        .focus-mark span::before {
          left: 0;
          bottom: 0;
          border-left: 2px solid;
          border-bottom: 2px solid;
        }

        .focus-mark span::after {
          right: 0;
          bottom: 0;
          border-right: 2px solid;
          border-bottom: 2px solid;
        }

        .corner-copy::before {
          content: '';
          width: 56px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(235, 239, 242, 0.42));
        }

        .corner-copy::after {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(235, 239, 242, 0.58);
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.22);
        }

        .mini-cube-icon::before,
        .mini-cube-icon::after {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(235, 239, 242, 0.28);
        }

        .micro-ui b {
          display: inline-block;
          min-width: 94px;
          color: rgba(235, 239, 242, 0.6);
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
