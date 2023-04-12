import { useState, useEffect } from "react";
import Card from "./card";

const Cards = ({ videogames, filtroOrder }) => {
  const [orderedGames, setOrderedGames] = useState([]);

  useEffect(() => {
    // Clonamos el array de videogames para no modificar el estado original
    const clonedVideogames = [...videogames];
    // Ordenamos los videojuegos según el filtro seleccionado
    if (filtroOrder.order === "desc") {
      clonedVideogames.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (filtroOrder.order === "asc") {
      clonedVideogames.sort((a, b) => (a.name > b.name ? -1 : 1));
    }

    // Actualizamos el estado con los videojuegos ordenados
    setOrderedGames(clonedVideogames);
  }, [videogames, filtroOrder]);

  return (
    <div className="cards-container theme-color">
      {orderedGames.map((card) => {
        return (
          <Card
            key={`key_${card.id.toString()}`}
            id={card.id}
            name={card.name}
            image={card.background_image || card.image}
            genres={card.genres}
            game={card}
          />
        );
      })}
    </div>
  );
};

export default Cards;
