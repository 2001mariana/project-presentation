import { useState, type FormEvent } from "react";
import type { CreateUserInput, User, UserRole, UserStatus } from "../types/user";

interface UserFormProps {
  user: User | null;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (data: CreateUserInput) => Promise<boolean>;
  onCancel: () => void;
}

type FormErrors = Partial<Record<keyof CreateUserInput, string>>;

export function UserForm({ user, isSubmitting, error, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "user");
  const [status, setStatus] = useState<UserStatus>(user?.status ?? "active");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) nextErrors.name = "Informe o nome.";
    if (!trimmedEmail) {
      nextErrors.email = "Informe o email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Informe um email válido.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit({ name: trimmedName, email: trimmedEmail, role, status });
  };

  return (
    <form className="user-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
      {error && <div className="form-alert" role="alert">{error}</div>}

      <label className="form-field">
        <span>Nome completo</span>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "user-name-error" : undefined}
          placeholder="Ex.: Maria Oliveira"
        />
        {errors.name && <small id="user-name-error" className="field-error">{errors.name}</small>}
      </label>

      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "user-email-error" : undefined}
          placeholder="nome@exemplo.com"
        />
        {errors.email && <small id="user-email-error" className="field-error">{errors.email}</small>}
      </label>

      <div className="form-field-row">
        <label className="form-field">
          <span>Perfil</span>
          <select value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <label className="form-field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as UserStatus)}>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </label>
      </div>

      <div className="dialog-actions">
        <button type="button" className="button button-secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </button>
        <button type="submit" className="button button-primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando…" : user ? "Salvar alterações" : "Criar usuário"}
        </button>
      </div>
    </form>
  );
}