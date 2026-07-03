import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Trail } from '@react-three/drei'
import * as THREE from 'three'

function Sun({ size = 1.4 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.08
  })
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 48, 48]} />
        <meshBasicMaterial color="#00e5ff" toneMapped={false} />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.15} toneMapped={false} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.08} toneMapped={false} />
      </mesh>
      <pointLight color="#00e5ff" intensity={4} distance={40} />
    </group>
  )
}

function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [radius])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#2563eb" transparent opacity={0.35} />
    </line>
  )
}

function Planet({ data, onSelect, interactive }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const speed = data.speed ?? 0.15
  const startAngle = data.angle ?? Math.random() * Math.PI * 2

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      const targetScale = hovered ? 1.35 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      )
    }
  })

  return (
    <group ref={groupRef} rotation={[0, startAngle, 0]}>
      <OrbitRing radius={data.radius} />
      <group position={[data.radius, 0, 0]}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation()
            interactive && onSelect && onSelect(data)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            interactive && setHovered(true)
            if (interactive) document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            interactive && setHovered(false)
            document.body.style.cursor = 'auto'
          }}
        >
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={hovered ? 1.1 : 0.45}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
        {interactive && (
          <Html distanceFactor={10} position={[0, data.size + 0.5, 0]} center>
            <div
              className={`whitespace-nowrap font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded-full border transition-all duration-300 ${
                hovered
                  ? 'border-glow text-glow bg-space/80 opacity-100'
                  : 'border-white/10 text-white/50 bg-space/40 opacity-70'
              }`}
            >
              {data.label}
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}

function Scene({ planets, onSelect, interactive, sunSize }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <Sun size={sunSize} />
      {planets.map((p) => (
        <Planet key={p.id} data={p} onSelect={onSelect} interactive={interactive} />
      ))}
    </>
  )
}

/**
 * Reusable 3D solar system. Pass `planets` as an array of:
 * { id, label, radius, size, color, speed, angle }
 */
export default function SolarSystem({
  planets,
  onSelect,
  interactive = false,
  sunSize = 1.4,
  cameraPosition = [0, 6, 13],
  allowControls = false,
}) {
  return (
    <Canvas camera={{ position: cameraPosition, fov: 50 }} dpr={[1, 1.5]}>
      <Scene planets={planets} onSelect={onSelect} interactive={interactive} sunSize={sunSize} />
      {allowControls && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
        />
      )}
    </Canvas>
  )
}
