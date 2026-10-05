import type { User } from "../types/user";

interface UsersTableProps {
  users: User[];
  deletingUserId: string | null;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function UsersTable({
  users,
  deletingUserId,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <div className="users-table-scroll">
      <table className="users-table">
        <thead>
          <tr>
            <th scope="col">Usuário</th>
            <th scope="col">Perfil</th>
            <th scope="col">Status</th>
            <th scope="col">Criado em</th>
            <th scope="col"><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-identity">
                  <span className="user-avatar" aria-hidden="true">
                    {user.name.trim().charAt(0).toLocaleUpperCase()}
                  </span>
                  <span>
                    <strong>{user.name}</strong>
                    <span className="user-email">{user.email}</span>
                  </span>
                </div>
              </td>
              <td>{user.role === "admin" ? "Administrador" : "Usuário"}</td>
              <td>
                <span className={`status-badge status-${user.status}`}>
                  <span className="status-dot" aria-hidden="true" />
                  {user.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td>{dateFormatter.format(new Date(user.createdAt))}</td>
              <td>
                <div className="row-actions">
                  <button
                    className="button button-subtle"
                    onClick={() => onEdit(user)}
                    aria-label={`Editar ${user.name}`}
                  >
                    Editar
                  </button>
                  <button
                    className="button button-danger-subtle"
                    onClick={() => onDelete(user)}
                    disabled={deletingUserId === user.id}
                    aria-label={`Excluir ${user.name}`}
                  >
                    {deletingUserId === user.id ? "Excluindo…" : "Excluir"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}