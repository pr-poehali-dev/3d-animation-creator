import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera, Box, Sphere, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Viewport3DProps {
  selectedObject: any;
  currentFrame: number;
  keyframes: any[];
}

const AnimatedCharacter = ({ currentFrame }: { currentFrame: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    
    const time = currentFrame * 0.05;
    
    groupRef.current.rotation.y = Math.sin(time) * 0.3;
    
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 2) * 0.2;
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 3) * 0.5 + 0.3;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(time * 3) * 0.5 - 0.3;
    }
    
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 4) * 0.4;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = -Math.sin(time * 4) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={headRef} position={[0, 1.6, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <axesHelper args={[0.3]} position={[0, 1.6, 0]} />
      
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      
      <mesh ref={leftArmRef} position={[-0.45, 1.1, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <axesHelper args={[0.2]} position={[-0.45, 1.1, 0]} />
      
      <mesh ref={rightArmRef} position={[0.45, 1.1, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <axesHelper args={[0.2]} position={[0.45, 1.1, 0]} />
      
      <mesh ref={leftLegRef} position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <axesHelper args={[0.2]} position={[-0.15, 0, 0]} />
      
      <mesh ref={rightLegRef} position={[0.15, 0, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <axesHelper args={[0.2]} position={[0.15, 0, 0]} />
    </group>
  );
};

const Scene3D = ({ currentFrame }: { currentFrame: number }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      
      <Grid 
        args={[20, 20]} 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#2a2a2a" 
        sectionSize={5} 
        sectionThickness={1} 
        sectionColor="#0ea5e9" 
        fadeDistance={30} 
        fadeStrength={1}
        infiniteGrid
      />
      
      <AnimatedCharacter currentFrame={currentFrame} />
      
      <Box position={[-3, 0.5, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#ea384c" />
      </Box>
      
      <Sphere position={[-3, 0.5, 2]} args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#9b87f5" />
      </Sphere>
      
      <Cylinder position={[3, 0.5, 0]} args={[0.5, 0.5, 1, 32]}>
        <meshStandardMaterial color="#F97316" />
      </Cylinder>
      
      <Cone position={[3, 0.5, 2]} args={[0.5, 1, 32]}>
        <meshStandardMaterial color="#D946EF" />
      </Cone>
    </>
  );
};

const Viewport3D = ({ selectedObject, currentFrame, keyframes }: Viewport3DProps) => {
  const [viewMode, setViewMode] = useState<'perspective' | 'top' | 'front' | 'side'>('perspective');

  const getCameraPosition = (): [number, number, number] => {
    switch (viewMode) {
      case 'top': return [0, 10, 0];
      case 'front': return [0, 2, 8];
      case 'side': return [8, 2, 0];
      default: return [5, 5, 5];
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={getCameraPosition()} />
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
        <Scene3D currentFrame={currentFrame} />
      </Canvas>
      
      <div className="absolute top-4 left-4 flex gap-2">
        <Button 
          variant={viewMode === 'perspective' ? 'default' : 'secondary'} 
          size="sm"
          onClick={() => setViewMode('perspective')}
        >
          <Icon name="Box" size={16} className="mr-2" />
          3D
        </Button>
        <Button 
          variant={viewMode === 'top' ? 'default' : 'secondary'} 
          size="sm"
          onClick={() => setViewMode('top')}
        >
          Сверху
        </Button>
        <Button 
          variant={viewMode === 'front' ? 'default' : 'secondary'} 
          size="sm"
          onClick={() => setViewMode('front')}
        >
          Спереди
        </Button>
        <Button 
          variant={viewMode === 'side' ? 'default' : 'secondary'} 
          size="sm"
          onClick={() => setViewMode('side')}
        >
          Сбоку
        </Button>
      </div>

      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur border border-border rounded p-3">
        <div className="text-xs text-muted-foreground mb-2 font-medium">УПРАВЛЕНИЕ</div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>🖱️ Левая кнопка: вращение</div>
          <div>🖱️ Правая кнопка: панорама</div>
          <div>🖱️ Колесо: зум</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded px-3 py-2">
        <div className="text-xs text-muted-foreground">
          Кадр: <span className="text-foreground font-mono font-bold">{currentFrame}</span> | 
          Камера: <span className="text-foreground">{viewMode}</span>
        </div>
      </div>
    </div>
  );
};

export default Viewport3D;