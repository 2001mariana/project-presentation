import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  CreateUserInput,
  User,
  UserFilters,
  UserRole,
  UserStatus,
  UpdateUserInput,
} from "../types/user";
import { userService } from "../services/userService";

const initialFilters: UserFilters = {
  search: "",
  role: "all",
  status: "all",
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setUsers(await userService.getUsers());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível carregar os usuários.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    userService
      .getUsers()
      .then((loadedUsers) => {
        if (isCurrent) setUsers(loadedUsers);
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Não foi possível carregar os usuários.",
          );
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const visibleUsers = useMemo(() => {
    const search = filters.search.trim().toLocaleLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLocaleLowerCase().includes(search) ||
        user.email.toLocaleLowerCase().includes(search);
      const matchesRole = filters.role === "all" || user.role === filters.role;
      const matchesStatus =
        filters.status === "all" || user.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [filters, users]);

  const createUser = async (data: CreateUserInput): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await userService.createUser(data);
      await refetch();
      setSuccessMessage("Usuário criado com sucesso.");
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível criar o usuário.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateUser = async (
    id: string,
    data: UpdateUserInput,
  ): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await userService.updateUser(id, data);
      await refetch();
      setSuccessMessage("Usuário atualizado com sucesso.");
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível atualizar o usuário.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setDeletingUserId(id);
    setError(null);
    setSuccessMessage(null);
    try {
      await userService.deleteUser(id);
      await refetch();
      setSuccessMessage("Usuário excluído com sucesso.");
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível excluir o usuário.");
      return false;
    } finally {
      setDeletingUserId(null);
    }
  };

  const updateFilters = (next: Partial<UserFilters>) => {
    setFilters((current) => ({ ...current, ...next }));
  };

  return {
    users,
    visibleUsers,
    isLoading,
    isSaving,
    deletingUserId,
    error,
    successMessage,
    filters,
    refetch,
    createUser,
    updateUser,
    deleteUser,
    updateFilters,
    clearError: () => setError(null),
    clearSuccess: () => setSuccessMessage(null),
  };
}

export type { UserRole, UserStatus };