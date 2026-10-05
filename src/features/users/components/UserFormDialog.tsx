import type { CreateUserInput, User } from "../types/user";
import { UserForm } from "./UserForm";

interface UserFormDialogProps {
  user: User | null;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (data: CreateUserInput) => Promise<boolean>;
  onClose: () => void;
}

export function UserFormDialog({ user, isSubmitting, error, onSubmit, onClose }: UserFormDialogProps) {
  return (
    <div className="dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !isSubmitting) onClose();
    }}>
      <section
        className="dialog-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-dialog-title"
        onKeyDown={(event) => {
          if (event.key === "Escape" && !isSubmitting) onClose();
        }}
      >
        <header className="dialog-header">
          <div>
            <p className="eyebrow">GERENCIAMENTO DE USUÁRIOS</p>
            <h2 id="user-dialog-title">{user ? "Editar usuário" : "Novo usuário"}</h2>
            <p>Preencha os dados abaixo para {user ? "atualizar este cadastro" : "adicionar uma pessoa"}.</p>
          </div>
          <button className="dialog-close" onClick={onClose} disabled={isSubmitting} aria-label="Fechar janela">×</button>
        </header>
        <UserForm
          key={user?.id ?? "new-user"}
          user={user}
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </section>
    </div>
  );
}