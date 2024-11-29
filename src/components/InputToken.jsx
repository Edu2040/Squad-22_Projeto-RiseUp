import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function InputToken({ token, onTokenChange }) {

  const handleSaveToken = () => {
    // Salva o token no armazenamento local do Chrome
    chrome.storage.local.set({ token: token }, () => {
      console.log("Token salvo:", token);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Inserir Token</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inserir Token</DialogTitle>
          <DialogDescription>Insira o novo token abaixo.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="token"
            value={token}
            onChange={(e) => onTokenChange(e.target.value)} // Chama a função para atualizar o token
            className="col-span-4"
            placeholder="Insira o token"
          />
        </div>
        <DialogFooter>
          <Button id="saveToken" onClick={handleSaveToken}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InputToken;
