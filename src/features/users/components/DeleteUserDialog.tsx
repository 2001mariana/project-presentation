import type { User } from "../types/user";

interface DeleteUserDialogProps {
  user: User;
  isDeleting: boolean;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteUserDialog({ user, isDeleting, error, onConfirm, onCancel }: DeleteUserDialogProps) {
  return (
    <div className="dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !isDeleting) onCancel();
    }}>
      <section
        className="dialog-card confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        onKeyDown={(event) => {
          if (event.key === "Escape" && !isDeleting) onCancel();
        }}
      >
        <div className="confirm-icon" aria-hidden="true">!</div>
        <h2 id="delete-dialog-title">Excluir usuário?</h2>
        <p>Essa ação removerá <strong>{user.name}</strong> ({user.email}) da lista. Não é possível desfazer.</p>
        {error && <div className="form-alert" role="alert">{error}</div>}
        <div className="dialog-actions">
          <button className="button button-secondary" onClick={onCancel} disabled={isDeleting}>Cancelar</button>
          <button className="button button-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Excluindo…" : "Excluir usuário"}
          </button>
        </div>
      </section>
    </div>
  );
}