
import { useState } from "react";

export function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    alert(`Nome: ${name}\nEmail: ${email}`);
  };

  return (
    <div>
      <h1>Formulário</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>

          <input
            type="string"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <button type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}