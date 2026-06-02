import { useState, useEffect } from "react";

function Details({ info }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!info) return;

    const fetchData = async () => {
      setLoading(true);
      setUserData(null);
      
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Ошибка при получении профиля:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <img key={userData.id} src={userData.avatar} alt={userData.name} />
      <h2>{userData.name}</h2>
      <p>City: {userData.details?.city}</p>
      <p>Company: {userData.details?.company}</p>
      <p>Position: {userData.details?.position}</p>
    </div>
  );
}

export default Details;
