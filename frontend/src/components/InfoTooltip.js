import React from 'react';
import noUnion from '../images/Union3.svg'
import yesUnion from '../images/Union2.svg'

function InfoTooltip({ registration, isOpen, onClose}) {
  return(
    <div className={`popup info-popup ${isOpen ? `popup_opened` : ``}`}>
      <div className={`popup__container info-popup__container`}>
        <div className={'info-popup__picture'} style={{backgroundImage: `url(${registration ? yesUnion : noUnion})`}} ></div>
        <p className={'info-popup__text'}>{registration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button
          className={`popup__close-button`}
          name="close"
          type="button"
          onClick={onClose}
        ></button>        
      </div>
    </div>
  );
};

export default InfoTooltip;