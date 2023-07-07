import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // console.log(card._id);
  // console.log( cardKey );
  const currentUser = useContext(CurrentUserContext);
  // console.log(currentUser._id);
  // console.log(card.likes);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes && card.likes.some((i) => i === currentUser._id);
  // console.log(isLiked);
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
        <p className="card__like-counter">{card.likes && card.likes.length}</p>
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
