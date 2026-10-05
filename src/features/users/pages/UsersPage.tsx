import { useState } from "react";
import { DeleteUserDialog } from "../components/DeleteUserDialog";
import { UserFormDialog } from "../components/UserFormDialog";
import { UsersTable } from "../components/UsersTable";
import { UsersToolbar } from "../components/UsersToolbar";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";
import "../users.css";

export function UsersPage() {
  const usersState = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const closeForm = () => {
    setEditingUser(null);
    setIsCreating(false);
    usersState.clearError();
  };

  const handleFormSubmit = async (data: Parameters<typeof usersState.createUser>[0]) => {
    const succeeded = editingUser
      ? await usersState.updateUser(editingUser.id, data)
      : await usersState.createUser(data);

    if (succeeded) closeForm();
    return succeeded;
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    const succeeded = await usersState.deleteUser(deletingUser.id);
    if (succeeded) setDeletingUser(null);
  };

  const hasActiveFilters =
    usersState.filters.search !== "" ||
    usersState.filters.role !== "all" ||
    usersState.filters.status !== "all";

  return (
    <main style={{ border: "2px solid greenyellow" }} className="users-page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">ESPAÇO DE TRABALHO / CONTAS</p>
          <h1>Usuários</h1>
          <p className="page-description">Gerencie as pessoas e os acessos da sua organização.</p>
        </div>
        <div className="users-count-card">
          <span className="count-icon" aria-hidden="true">♙</span>
          <span><strong>{usersState.users.length}</strong><small>usuários cadastrados</small></span>
        </div>
      </header>

      <section className="users-panel" aria-label="Lista de usuários">
        <div className="panel-heading">
          <div>
            <h2>Todos os usuários</h2>
            <p>Visualize e gerencie os acessos da sua equipe.</p>
          </div>
          <span className="results-count">{usersState.visibleUsers.length} resultados</span>
        </div>

        {usersState.successMessage && (
          <div className="success-banner" role="status">
            <span aria-hidden="true">✓</span> {usersState.successMessage}
            <button onClick={usersState.clearSuccess} aria-label="Fechar mensagem">×</button>
          </div>
        )}

        <UsersToolbar
          filters={usersState.filters}
          onSearchChange={(search) => usersState.updateFilters({ search })}
          onRoleChange={(role) => usersState.updateFilters({ role })}
          onStatusChange={(status) => usersState.updateFilters({ status })}
          onCreate={() => {
            usersState.clearError();
            setIsCreating(true);
          }}
        />

        {usersState.error &&
          !usersState.isLoading &&
          usersState.users.length > 0 &&
          !isCreating &&
          !editingUser &&
          !deletingUser && (
            <div className="form-alert inline-error" role="alert">
              {usersState.error}{" "}
              <button className="button button-subtle" onClick={() => void usersState.refetch()}>
                Recarregar lista
              </button>
            </div>
          )}

        {usersState.isLoading ? (
          <div className="table-state" role="status">
            <span className="loading-spinner" aria-hidden="true" />
            <strong>Carregando usuários…</strong>
            <span>Estamos buscando os dados mais recentes.</span>
          </div>
        ) : usersState.error && usersState.users.length === 0 ? (
          <div className="table-state error-state" role="alert">
            <span className="state-icon" aria-hidden="true">!</span>
            <strong>Não foi possível carregar os usuários</strong>
            <span>{usersState.error}</span>
            <button className="button button-secondary" onClick={() => void usersState.refetch()}>Tentar novamente</button>
          </div>
        ) : usersState.visibleUsers.length > 0 ? (
          <UsersTable
            users={usersState.visibleUsers}
            deletingUserId={usersState.deletingUserId}
            onEdit={(user) => {
              usersState.clearError();
              setEditingUser(user);
            }}
            onDelete={(user) => {
              usersState.clearError();
              setDeletingUser(user);
            }}
          />
        ) : (
          <div className="table-state empty-state">
            <span className="state-icon" aria-hidden="true">⌕</span>
            <strong>{hasActiveFilters ? "Nenhum resultado encontrado" : "Nenhum usuário cadastrado"}</strong>
            <span>{hasActiveFilters ? "Experimente ajustar ou limpar os filtros." : "Comece adicionando o primeiro usuário à sua equipe."}</span>
            {hasActiveFilters ? (
              <button className="button button-secondary" onClick={() => usersState.updateFilters({ search: "", role: "all", status: "all" })}>Limpar filtros</button>
            ) : (
              <button className="button button-primary" onClick={() => setIsCreating(true)}>＋ Novo usuário</button>
            )}
          </div>
        )}

        <footer className="panel-footer">Os dados são mantidos nesta sessão e serão restaurados ao atualizar a página.</footer>
      </section>

      {(isCreating || editingUser) && (
        <UserFormDialog
          user={editingUser}
          isSubmitting={usersState.isSaving}
          error={usersState.error}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          isDeleting={usersState.deletingUserId === deletingUser.id}
          error={usersState.error}
          onConfirm={() => void handleDelete()}
          onCancel={() => {
            setDeletingUser(null);
            usersState.clearError();
          }}
        />
      )}
    </main>
  );
}