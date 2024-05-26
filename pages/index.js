import React, { useState } from "react";
import styles from "@/styles/App.module.css";

export default function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 2, name: 'Карточка 2' },
    { id: 2, order: 1, name: 'Карточка 1' },
    { id: 3, order: 4, name: 'Карточка 4' },
    { id: 4, order: 3, name: 'Карточка 3' },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  function dragEndHandler(e) {
    e.preventDefault();
    e.target.style.background = 'white';
  }

  function dragStartHandler(e, card) {
    setCurrentCard(card);
    e.dataTransfer.setData('text/plain', card.id.toString());
    e.target.style.background = 'lightgray';
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }

  function dropHandler(e, card) {
    e.preventDefault();
    setCardList(prevList => {
      const newList = prevList.map(c => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      });
      return newList;
    });
    e.target.style.background = 'white';
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
      <div className={styles.app}>
        {cardList.sort(sortCards).map(card => (
            <div
                key={card.id}
                className={styles.card}
                onDragStart={(e) => dragStartHandler(e, card)}
                onDragEnd={dragEndHandler}
                onDragLeave={dragEndHandler}
                onDragOver={dragOverHandler}
                onDrop={(e) => dropHandler(e, card)}
                draggable={true}
            >
              {card.name}
            </div>
        ))}
      </div>
  );
}
