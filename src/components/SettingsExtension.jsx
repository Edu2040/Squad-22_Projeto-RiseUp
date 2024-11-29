import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SettingsExtension({ switches, onSwitchChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Configuração de campos</h4>
            <p className="text-sm text-muted-foreground">
              Selecione os campos abaixo:
            </p>
          </div>
          <div className="grid gap-2">
            {[
              { id: "users-data", label: "Dados do Usuário" },
              { id: "organizations", label: "Empresas" },
              { id: "financial-data", label: "Dados Financeiros" },
              { id: "platforms", label: "Plataformas" },
              { id: "deals", label: "Negociações" },
              { id: "deal-stages", label: "Etapas do Funil" },
              { id: "tasks", label: "Tarefas" },
              { id: "campaigns", label: "Campanhas" },
            ].map(({ id, label }) => (
              <div className="flex items-center space-x-2" key={id}>
                <Switch
                  id={id}
                  checked={switches[id]}
                  onCheckedChange={(value) => onSwitchChange(id, value)}
                />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}