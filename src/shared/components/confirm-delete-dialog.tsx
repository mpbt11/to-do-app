'use client';

import { Button } from '@/shared/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

type ConfirmDeleteDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirming?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
};

export function ConfirmDeleteDialog({
  open,
  title = 'Excluir tarefa',
  description = 'Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.',
  confirming = false,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={confirming}>Cancelar</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => onConfirm()}
              disabled={confirming}
            >
              {confirming ? 'Excluindo...' : 'Excluir'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
