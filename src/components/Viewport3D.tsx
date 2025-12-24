import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Viewport3DProps {
  selectedObject: any;
  currentFrame: number;
  keyframes: any[];
}

const Viewport3D = ({ selectedObject, currentFrame, keyframes }: Viewport3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewMode, setViewMode] = useState<'perspective' | 'top' | 'front' | 'side'>('perspective');
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawGrid = () => {
      ctx.strokeStyle = '#2a2a2a';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      for (let i = 0; i <= canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      for (let i = 0; i <= canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    const drawCharacter = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const time = currentFrame * 0.05;
      const scale = 1 + Math.sin(time) * 0.1;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationRef.current);
      ctx.scale(scale, scale);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-30, -60, 60, 40);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-25, -20, 50, 80);
      
      const leftArmRot = Math.sin(time * 3) * 0.5;
      ctx.save();
      ctx.translate(-40, -30);
      ctx.rotate(leftArmRot);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-10, -10, 20, 70);
      ctx.restore();
      
      const rightArmRot = -Math.sin(time * 3) * 0.5;
      ctx.save();
      ctx.translate(40, -30);
      ctx.rotate(rightArmRot);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-10, -10, 20, 70);
      ctx.restore();
      
      const leftLegRot = Math.sin(time * 4) * 0.4;
      ctx.save();
      ctx.translate(-15, 60);
      ctx.rotate(leftLegRot);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-10, 0, 20, 50);
      ctx.restore();
      
      const rightLegRot = -Math.sin(time * 4) * 0.4;
      ctx.save();
      ctx.translate(15, 60);
      ctx.rotate(rightLegRot);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-10, 0, 20, 50);
      ctx.restore();
      
      ctx.strokeStyle = '#ea384c';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      ctx.arc(0, -40, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(-25, 0, 6, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(25, 0, 6, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawObjects = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.fillStyle = '#ea384c';
      ctx.fillRect(centerX - 250, centerY, 40, 40);
      
      ctx.fillStyle = '#9b87f5';
      ctx.beginPath();
      ctx.arc(centerX - 250, centerY + 80, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#F97316';
      ctx.fillRect(centerX + 210, centerY, 40, 60);
      
      ctx.fillStyle = '#D946EF';
      ctx.beginPath();
      ctx.moveTo(centerX + 230, centerY + 80);
      ctx.lineTo(centerX + 260, centerY + 120);
      ctx.lineTo(centerX + 200, centerY + 120);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawObjects();
      drawCharacter();
      
      rotationRef.current += 0.005;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentFrame]);

  return (
    <div className="relative w-full h-full bg-[#1a1a1a]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      
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
          <div>📦 Модели в сцене: 5</div>
          <div>🎬 Анимация: активна</div>
          <div>⚡ FPS: 60</div>
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
