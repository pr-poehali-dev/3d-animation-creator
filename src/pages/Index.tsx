import { useState } from 'react';
import Viewport3D from '@/components/Viewport3D';
import Timeline from '@/components/Timeline';
import Toolbar from '@/components/Toolbar';
import PropertiesPanel from '@/components/PropertiesPanel';
import ModelsLibrary from '@/components/ModelsLibrary';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [keyframes, setKeyframes] = useState<any[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      <header className="bg-card border-b border-border h-12 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Icon name="Box" size={18} className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">3D Studio</span>
        </div>
        
        <div className="flex-1 flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Icon name="File" size={16} className="mr-2" />
            Файл
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Edit" size={16} className="mr-2" />
            Правка
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Рендер
          </Button>
        </div>

        <Button 
          variant="default" 
          size="sm"
          onClick={() => setShowLibrary(!showLibrary)}
        >
          <Icon name="Library" size={16} className="mr-2" />
          Библиотека
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <Toolbar />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <Viewport3D 
              selectedObject={selectedObject}
              currentFrame={currentFrame}
              keyframes={keyframes}
            />
          </div>
          
          <Timeline 
            keyframes={keyframes}
            setKeyframes={setKeyframes}
            currentFrame={currentFrame}
            setCurrentFrame={setCurrentFrame}
            selectedObject={selectedObject}
          />
        </div>

        <PropertiesPanel 
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        />

        {showLibrary && (
          <ModelsLibrary 
            onClose={() => setShowLibrary(false)}
            onSelectModel={(model) => {
              console.log('Selected model:', model);
              setShowLibrary(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
