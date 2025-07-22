import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ) || [];
  
  useEffect(() => {
    if (byDateDesc.length === 0) {
      return () => {}; // Retourner une fonction vide au lieu de undefined
    }
    
    const interval = setInterval(() => {
      setIndex((prevIndex) => 
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);
    
    // Nettoyer l'intervalle quand le composant se démonte
    return () => clearInterval(interval);
  }, [byDateDesc.length]); // Dépendance sur la longueur du tableau
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => {
        const uniqueKey = `${idx}-${event.title}-${event.date}-${event.cover}`;
        
        return (
          <div
            key={uniqueKey}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => {
            const radioKey = `radio-${radioIdx}-${event.title}-${event.date}-${event.cover}`;
            
            return (
              <input
                key={radioKey}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                readOnly
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;