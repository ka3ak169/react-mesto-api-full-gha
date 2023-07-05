import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  return (
    <div className="card__element">
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={() => onCardClick(card)}
      />
      <div className="card__group">
        <h2 className="card__place">{card.name}</h2>
        <div className="card__like-box">
          <button
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
            type="button"
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__trash"
          onClick={() => onCardDelete(card)}
          type="button"
        ></button>
      )}
    </div>
  );
}
