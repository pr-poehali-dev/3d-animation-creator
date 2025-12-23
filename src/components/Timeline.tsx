import { useRef, useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface TimelineProps {
  keyframes: any[];
  setKeyframes: (keyframes: any[]) => void;
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
  selectedObject: any;
}

const Timeline = ({ keyframes, setKeyframes, currentFrame, setCurrentFrame, selectedObject }: TimelineProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalFrames = 120;
  const [isPlaying, setIsPlaying] = useState(false);
  const playInterval = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const frameWidth = canvas.width / totalFrames;
    
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= totalFrames; i += 5) {
      const x = i * frameWidth;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      
      if (i % 10 === 0) {
        ctx.fillStyle = '#666';
        ctx.font = '10px Roboto';
        ctx.fillText(i.toString(), x + 2, 12);
      }
    }

    keyframes.forEach(kf => {
      const x = kf.frame * frameWidth;
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(x, canvas.height / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    const currentX = currentFrame * frameWidth;
    ctx.strokeStyle = '#ea384c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(currentX, 0);
    ctx.lineTo(currentX, canvas.height);
    ctx.stroke();

  }, [currentFrame, keyframes]);

  const togglePlayback = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    
    if (newIsPlaying) {
      playInterval.current = window.setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= totalFrames - 1) {
            setIsPlaying(false);
            if (playInterval.current) clearInterval(playInterval.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / 24);
    } else {
      if (playInterval.current) clearInterval(playInterval.current);
    }
  };

  const addKeyframe = () => {
    const newKeyframe = {
      frame: currentFrame,
      type: 'transform',
      data: {}
    };
    setKeyframes([...keyframes, newKeyframe]);
  };

  return (
    <div className="h-48 bg-card border-t border-border flex flex-col">
      <div className="h-10 border-b border-border flex items-center px-4 gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentFrame(0)}
        >
          <Icon name="SkipBack" size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={togglePlayback}
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentFrame(totalFrames - 1)}
        >
          <Icon name="SkipForward" size={16} />
        </Button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={addKeyframe}
          disabled={!selectedObject}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Ключевой кадр
        </Button>

        <div className="flex-1" />

        <div className="text-sm text-muted-foreground">
          24 fps
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onClick={(e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const frameWidth = canvas.width / totalFrames;
            const clickedFrame = Math.floor(x / frameWidth);
            setCurrentFrame(clickedFrame);
          }}
        />
      </div>

      <div className="h-12 border-t border-border px-4 flex items-center gap-4">
        <span className="text-sm text-muted-foreground min-w-[60px]">
          {currentFrame} / {totalFrames}
        </span>
        <Slider
          value={[currentFrame]}
          onValueChange={(value) => setCurrentFrame(value[0])}
          max={totalFrames - 1}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default Timeline;