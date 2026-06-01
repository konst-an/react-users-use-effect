import { useState, useEffect } from "react";

function Details({ info }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!info) return;

    setLoading(true);
    setUserData(null);

    fetch(
      `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [info?.id]);

  if (!info) {
    return <div className="details empty">Выберите пользователя</div>;
  }

  if (loading) {
    return <div className="details empty">Загрузка...</div>;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="details">
      <img src={userData.avatar} alt={userData.name} />
      <h2>{userData.name}</h2>
      <p>City: {userData.details.city}</p>
      <p>Company: {userData.details.company}</p>
      <p>Position: {userData.details.position}</p>
    </div>
  );
}

export default Details;