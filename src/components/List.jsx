import { useState, useEffect } from "react";

function List({ onSelect, selectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
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