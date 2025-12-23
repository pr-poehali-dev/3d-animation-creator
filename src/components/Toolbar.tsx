import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Toolbar = () => {
  const [activeTool, setActiveTool] = useState('select');

  const tools = [
    { id: 'select', icon: 'MousePointer', label: 'Выбрать (V)' },
    { id: 'move', icon: 'Move', label: 'Переместить (G)' },
    { id: 'rotate', icon: 'RotateCw', label: 'Повернуть (R)' },
    { id: 'scale', icon: 'Maximize2', label: 'Масштаб (S)' },
    { id: 'bone', icon: 'Bone', label: 'Кости (B)', fallback: 'CircleDot' },
    { id: 'pose', icon: 'User', label: 'Поза (P)' },
  ];

  return (
    <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
      <TooltipProvider>
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === tool.id ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool(tool.id)}
                className="w-12 h-12"
              >
                <Icon 
                  name={tool.icon} 
                  size={20} 
                  fallback={tool.fallback}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="w-10 h-px bg-border my-2" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="w-12 h-12">
              <Icon name="Plus" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Добавить объект</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="w-12 h-12">
              <Icon name="Lightbulb" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Освещение</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="w-12 h-12">
              <Icon name="Camera" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Камера</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Toolbar;
