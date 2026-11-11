import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function SpatialScene() {
  const sceneRef = useRef(null)
  const globeRef = useRef(null)
  const terrainRef = useRef(null)
  const routeRef = useRef(null)
  const projectMarkersRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const progress = useRef(0)
  const prefersReducedMotion = useRef(false)
  const positions = useMemo(() => {
    const values = new Float32Array(540 * 3)
    const seededValue = (seed) => {
      const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
      return value - Math.floor(value)
    }

    for (let index = 0; index < values.length; index += 3) {
      values[index] = (seededValue(index + 1) - 0.5) * 13
      values[index + 1] = (seededValue(index + 2) - 0.5) * 8
      values[index + 2] = (seededValue(index + 3) - 0.5) * 5
    }

    return values
  }, [])
  const routePositions = useMemo(() => {
    const values = new Float32Array(120 * 3)

    for (let index = 0; index < 120; index += 1) {
      const step = index / 119
      values[index * 3] = -2.7 + step * 5.4
      values[index * 3 + 1] = Math.sin(step * Math.PI * 3) * 0.72
      values[index * 3 + 2] = 0.2
    }

    return values
  }, [])
  const projectPositions = useMemo(
    () => new Float32Array([-1.85, 0.78, 0.3, 0.1, -0.08, 0.3, 1.9, 0.62, 0.3]),
    [],
  )

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handlePointerMove = (event) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1
      target.current.y = 1 - (event.clientY / window.innerHeight) * 2
    }
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      progress.current = scrollable > 0 ? window.scrollY / scrollable : 0
    }
    const updateMotionPreference = () => {
      prefersReducedMotion.current = motionPreference.matches
    }

    updateMotionPreference()
    updateProgress()
    motionPreference.addEventListener('change', updateMotionPreference)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      motionPreference.removeEventListener('change', updateMotionPreference)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useFrame((_, delta) => {
    if (!sceneRef.current) return

    const journey = progress.current
    const terrainStage = Math.min(1, Math.max(0, (journey - 0.18) / 0.52))
    const imageryStage = Math.min(1, Math.max(0, (journey - 0.56) / 0.32))
    const projectStage = Math.min(1, Math.max(0, (journey - 0.78) / 0.22))
    const travelStage = Math.min(1, journey * 1.8)

    if (!prefersReducedMotion.current) {
      pointer.current.x += (target.current.x - pointer.current.x) * Math.min(delta * 1.4, 1)
      pointer.current.y += (target.current.y - pointer.current.y) * Math.min(delta * 1.4, 1)
    }

    const smoothing = prefersReducedMotion.current ? 1 : Math.min(delta * 0.8, 1)
    sceneRef.current.rotation.y += (pointer.current.x * 0.05 + travelStage * 0.52 - sceneRef.current.rotation.y) * smoothing
    sceneRef.current.rotation.x += (-pointer.current.y * 0.035 - sceneRef.current.rotation.x) * smoothing

    if (globeRef.current) {
      globeRef.current.scale.setScalar(1.04 - terrainStage * 0.22)
      globeRef.current.material.opacity = 0.28 - imageryStage * 0.08
      globeRef.current.rotation.y += prefersReducedMotion.current ? 0 : delta * (0.025 + terrainStage * 0.08)
      globeRef.current.position.x = -0.75 + travelStage * 0.95
      globeRef.current.position.y = Math.sin(journey * Math.PI * 2) * 0.24
    }

    if (terrainRef.current) {
      terrainRef.current.material.opacity = terrainStage * (0.12 + imageryStage * 0.2)
      terrainRef.current.rotation.z = -journey * 0.22
      terrainRef.current.position.x = 0.65 - travelStage * 0.7
      terrainRef.current.position.y = -0.7 + Math.sin(journey * Math.PI * 2) * 0.16
    }

    if (routeRef.current) {
      routeRef.current.geometry.setDrawRange(0, Math.max(2, Math.floor(journey * 120)))
      routeRef.current.material.opacity = 0.12 + travelStage * 0.46
    }

    if (projectMarkersRef.current) {
      projectMarkersRef.current.material.opacity = projectStage * 0.9
    }
  })

  return (
    <group ref={sceneRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#b7adff"
          size={0.015}
          transparent
          opacity={0.32}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <mesh ref={globeRef}>
        <icosahedronGeometry args={[1.14, 2]} />
        <meshBasicMaterial
          color="#b7adff"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh ref={terrainRef} rotation={[-0.3, 0.2, 0.12]}>
        <planeGeometry args={[3.5, 2.4, 18, 12]} />
        <meshBasicMaterial
          color="#d9ff87"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <line ref={routeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[routePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#d9ff87" transparent opacity={0.4} />
      </line>
      <points ref={projectMarkersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[projectPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#d9ff87"
          size={0.085}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function SpatialCanvas() {
  return (
    <div className="spatial-background" aria-hidden="true">
      <Canvas
        aria-label="Interactive geospatial journey visualization"
        camera={{ position: [0, 0, 6], fov: 54 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <SpatialScene />
      </Canvas>
    </div>
  )
}
