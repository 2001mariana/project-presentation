import type { UserFilters } from "../types/user";

interface UsersToolbarProps {
  filters: UserFilters;
  onSearchChange: (search: string) => void;
  onRoleChange: (role: UserFilters["role"]) => void;
  onStatusChange: (status: UserFilters["status"]) => void;
  onCreate: () => void;
}

export function UsersToolbar({
  filters,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onCreate,
}: UsersToolbarProps) {
  return (
    <section className="users-toolbar" aria-label="Buscar e filtrar usuários">
      <label className="users-search">
        <span className="sr-only">Buscar por nome ou email</span>
        <span aria-hidden="true" className="search-icon">⌕</span>
        <input
          type="search"
          placeholder="Buscar por nome ou email..."
          value={filters.search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="filter-field">
        <span className="sr-only">Filtrar por perfil</span>
        <select
          value={filters.role}
          onChange={(event) =>
            onRoleChange(event.target.value as UserFilters["role"])
          }
        >
          <option value="all">Todos os perfis</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
        </select>
      </label>

      <label className="filter-field">
        <span className="sr-only">Filtrar por status</span>
        <select
          value={filters.status}
          onChange={(event) =>
            onStatusChange(event.target.value as UserFilters["status"])
          }
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </label>

      <button className="button button-primary create-user-button" onClick={onCreate}>
        <span aria-hidden="true">＋</span> Novo usuário
      </button>
    </section>
  );
}