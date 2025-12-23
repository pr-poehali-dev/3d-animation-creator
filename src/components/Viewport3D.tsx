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
      
      const rotation = (currentFrame * 2) % 360;
      const scale = 1 + Math.sin(currentFrame * 0.1) * 0.1;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-30, -60, 60, 40);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-25, -20, 50, 80);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-30, 60, 20, 50);
      ctx.fillRect(10, 60, 20, 50);
      
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-50, -50, 20, 70);
      ctx.fillRect(30, -50, 20, 70);
      
      ctx.strokeStyle = '#ea384c';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      ctx.arc(0, -60, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(-40, -30, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(40, -30, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawCharacter();
      
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

      <div className="absolute top-4 right-4 bg-card border border-border rounded p-2">
        <div className="text-xs text-muted-foreground mb-1">Камера</div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Icon name="ZoomIn" size={14} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="ZoomOut" size={14} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="RotateCw" size={14} />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-card border border-border rounded px-3 py-2 text-sm">
        <div className="text-muted-foreground">Кадр: <span className="text-foreground font-mono">{currentFrame}</span></div>
      </div>
    </div>
  );
};

export default Viewport3D;
