import { useState, useEffect } from "react";

function List({ onSelect, selectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json"
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки списка");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Ошибка при получении списка пользователей:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          onClick={() => onSelect(user)}
          className={selectedUser?.id === user.id ? "active" : ""}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default List;
