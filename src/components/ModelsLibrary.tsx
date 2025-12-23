import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ModelsLibraryProps {
  onClose: () => void;
  onSelectModel: (model: any) => void;
}

const ModelsLibrary = ({ onClose, onSelectModel }: ModelsLibraryProps) => {
  const characters = [
    { id: 1, name: 'Человек базовый', bones: 18, preview: '🧍' },
    { id: 2, name: 'Женщина', bones: 20, preview: '🧍‍♀️' },
    { id: 3, name: 'Атлет', bones: 22, preview: '🏃' },
    { id: 4, name: 'Ребёнок', bones: 16, preview: '🧒' },
  ];

  const creatures = [
    { id: 5, name: 'Собака', bones: 24, preview: '🐕' },
    { id: 6, name: 'Кошка', bones: 22, preview: '🐈' },
    { id: 7, name: 'Птица', bones: 14, preview: '🦅' },
    { id: 8, name: 'Дракон', bones: 32, preview: '🐉' },
  ];

  const objects = [
    { id: 9, name: 'Куб', bones: 0, preview: '📦' },
    { id: 10, name: 'Сфера', bones: 0, preview: '⚽' },
    { id: 11, name: 'Цилиндр', bones: 0, preview: '🥫' },
    { id: 12, name: 'Конус', bones: 0, preview: '🔺' },
  ];

  const ModelCard = ({ model }: { model: any }) => (
    <Card 
      className="p-4 cursor-pointer hover:bg-accent transition-colors"
      onClick={() => onSelectModel(model)}
    >
      <div className="text-5xl mb-2 text-center">{model.preview}</div>
      <div className="text-sm font-medium">{model.name}</div>
      {model.bones > 0 && (
        <div className="text-xs text-muted-foreground mt-1">
          {model.bones} костей
        </div>
      )}
    </Card>
  );

  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-[800px] h-[600px] bg-card border border-border rounded-lg shadow-2xl flex flex-col">
        <div className="h-14 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Icon name="Library" size={20} />
            <span className="font-semibold text-lg">Библиотека моделей</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <Input 
              placeholder="Поиск моделей..." 
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="characters" className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-6">
            <TabsTrigger value="characters">
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="creatures">
              Существа
            </TabsTrigger>
            <TabsTrigger value="objects">
              Объекты
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="characters" className="p-6 mt-0">
              <div className="grid grid-cols-4 gap-4">
                {characters.map(model => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="creatures" className="p-6 mt-0">
              <div className="grid grid-cols-4 gap-4">
                {creatures.map(model => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="objects" className="p-6 mt-0">
              <div className="grid grid-cols-4 gap-4">
                {objects.map(model => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="h-16 border-t border-border flex items-center justify-between px-6">
          <div className="text-sm text-muted-foreground">
            Все модели включают риггинг и готовы к анимации
          </div>
          <Button variant="ghost" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelsLibrary;
