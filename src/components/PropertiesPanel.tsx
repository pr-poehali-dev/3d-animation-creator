import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PropertiesPanelProps {
  selectedObject: any;
  setSelectedObject: (obj: any) => void;
}

const PropertiesPanel = ({ selectedObject }: PropertiesPanelProps) => {
  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      <div className="h-12 border-b border-border flex items-center px-4">
        <Icon name="Settings" size={18} className="mr-2" />
        <span className="font-medium">Свойства</span>
      </div>

      <Tabs defaultValue="transform" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger value="transform" className="rounded-none">
            Трансформ
          </TabsTrigger>
          <TabsTrigger value="bones" className="rounded-none">
            Кости
          </TabsTrigger>
          <TabsTrigger value="material" className="rounded-none">
            Материал
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="transform" className="p-4 space-y-4 mt-0">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">ПОЗИЦИЯ</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="pos-x" className="text-xs">X</Label>
                  <Input 
                    id="pos-x" 
                    type="number" 
                    defaultValue="0.00" 
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="pos-y" className="text-xs">Y</Label>
                  <Input 
                    id="pos-y" 
                    type="number" 
                    defaultValue="0.00" 
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="pos-z" className="text-xs">Z</Label>
                  <Input 
                    id="pos-z" 
                    type="number" 
                    defaultValue="0.00" 
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">ВРАЩЕНИЕ</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="rot-x" className="text-xs">X</Label>
                  <Input 
                    id="rot-x" 
                    type="number" 
                    defaultValue="0.00" 
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="rot-y" className="text-xs">Y</Label>
                  <Input 
                    id="rot-y" 
                    type="number" 
                    defaultValue="0.00" 
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="rot-z" className="text-xs">Z</Label>
                  <Input 
                    id="rot-z" 
                    type="number" 
                    defaultValue="0.00" 
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">МАСШТАБ</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="scale-x" className="text-xs">X</Label>
                  <Input 
                    id="scale-x" 
                    type="number" 
                    defaultValue="1.00" 
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="scale-y" className="text-xs">Y</Label>
                  <Input 
                    id="scale-y" 
                    type="number" 
                    defaultValue="1.00" 
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="scale-z" className="text-xs">Z</Label>
                  <Input 
                    id="scale-z" 
                    type="number" 
                    defaultValue="1.00" 
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bones" className="p-4 space-y-4 mt-0">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">АРМАТУРА</Label>
              <div className="text-sm text-muted-foreground p-4 border border-border rounded">
                Выберите объект с костями для редактирования риггинга
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">СПИСОК КОСТЕЙ</Label>
              {['Head', 'Spine', 'Arm.L', 'Arm.R', 'Leg.L', 'Leg.R'].map((bone) => (
                <div 
                  key={bone}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
                >
                  <Icon name="CircleDot" size={14} className="text-primary" />
                  <span className="text-sm">{bone}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="material" className="p-4 space-y-4 mt-0">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">БАЗОВЫЙ ЦВЕТ</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  defaultValue="#0ea5e9" 
                  className="h-10 w-20"
                />
                <Input 
                  type="text" 
                  defaultValue="#0ea5e9" 
                  className="h-10 flex-1"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">МЕТАЛЛИЧНОСТЬ</Label>
              <Input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                defaultValue="0.5"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">ШЕРОХОВАТОСТЬ</Label>
              <Input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                defaultValue="0.5"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">ПРОЗРАЧНОСТЬ</Label>
              <Input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                defaultValue="1"
              />
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
