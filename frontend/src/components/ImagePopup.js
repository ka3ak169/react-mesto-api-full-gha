import React from "react"

export default function ImagePopup({ card, onClose }) {

  return(
    <div className={`popup image-popup ${card.link ? `popup_opened` : ``}`}>
      <div className="image-popup__container">
        <button onClick={onClose} className="image-popup__close-button popup__close-button" name="close" type="button"></button>
        <img className="image-popup__image" src={card.link} alt={card.name} />
        <p className="image-popup__description">{card.name}</p>
      </div>
    </div>
  )
}