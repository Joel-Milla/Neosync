// RequirementHeader.tsx
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from '@/utils/supabase/client';
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequirementHeaderProps {
  data: {
    id: string;
    nombre: string;
    tipo: "funcional" | "no funcional";
    fecha_inicio: string | null;
    estatus: string;
  };
  onUpdate: (updatedData: any) => void;
}

export function RequirementHeader({ data, onUpdate }: RequirementHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tipo, setTipo] = useState(data.tipo);
  const [startDate, setStartDate] = useState<Date | undefined>(
    data.fecha_inicio ? new Date(data.fecha_inicio) : undefined
  );

  const handleSave = async () => {
    const supabase = createClient();
    
    try {
      const { error } = await supabase
        .from('requerimiento')
        .update({
          tipo: tipo,
          fecha_inicio: startDate?.toISOString() || null,
        })
        .eq('id', data.id);

      if (error) throw error;

      onUpdate({
        ...data,
        tipo: tipo,
        fecha_inicio: startDate?.toISOString() || null,
      });

      toast({
        title: "Éxito",
        description: "Requerimiento actualizado correctamente",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating requirement:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el requerimiento",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold">{data.nombre}</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Column: Type */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Tipo</p>
              {isEditing ? (
                <Select value={tipo} onValueChange={(value) => setTipo(value as "funcional" | "no funcional")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funcional">Funcional</SelectItem>
                    <SelectItem value="no funcional">No Funcional</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm capitalize">{tipo}</p>
              )}
            </div>

            {/* Right Column: Status */}
            <div className="space-y-1">
              <p className="text-sm font-medium">Estado</p>
              <p className="text-sm capitalize">{data.estatus}</p>
            </div>
          </div>

          {/* Start Date and Edit Button Row */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Fecha de inicio</p>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] h-8 justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <p className="text-sm">
                  {startDate ? format(startDate, "PPP") : "No establecida"}
                </p>
              )}
            </div>

            {/* Edit/Save Buttons */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTipo(data.tipo);
                      setStartDate(data.fecha_inicio ? new Date(data.fecha_inicio) : undefined);
                      setIsEditing(false);
                    }}
                    className="h-8"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="h-8 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Guardar
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="h-8"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}