import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import type { User } from "../types/user";
import "../apiUsers.css";

export function ApiUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const loadedUsers = await getUsers();
      setUsers(loadedUsers);
    } catch {
      setError("Could not load users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setError(null);
    void loadUsers();
  };

  useEffect(() => {
    void Promise.resolve().then(loadUsers);
  }, [loadUsers]);

  return (
    <main className="api-users-page">
      <header className="api-users-header">
        <div>
          <p className="api-users-eyebrow">HTTP GET EXAMPLE</p>
          <h1>Users from API</h1>
          <p className="api-users-description">
            A simple example of loading users from a public API.
          </p>
        </div>
        <button
          className="api-users-button"
          type="button"
          onClick={handleReload}
          disabled={isLoading}
        >
          Reload
        </button>
      </header>

      <section className="api-users-panel" aria-label="Users from API">
        {isLoading ? (
          <p className="api-users-state" role="status">
            Loading users...
          </p>
        ) : error ? (
          <div className="api-users-state api-users-error" role="alert">
            <p>{error}</p>
            <button
              className="api-users-button api-users-button-secondary"
              type="button"
              onClick={handleReload}
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="api-users-table-scroll">
            <table className="api-users-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="api-users-endpoint">
        GET <span>https://jsonplaceholder.typicode.com/users</span>
      </p>
    </main>
  );
}
