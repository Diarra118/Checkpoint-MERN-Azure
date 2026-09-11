import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Impossible de contacter le serveur.");
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Gestion des utilisateurs</h1>

      {message && <p>{message}</p>}

      {users.length === 0 && !message ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> — {user.email} — {user.age} ans
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;