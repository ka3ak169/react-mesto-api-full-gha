import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [errorMessage, setErrorMessage] = useState();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({mode: 'onBlur'});
  const [urlValid, setUrlValid] = useState(true)

  useEffect(() => {
    setErrorMessage('');
    reset();
  }, [isOpen]);

    const onSubmit = (data) => {
      onAddPlace( data );
      reset();      
  };

  const handleChange = (e) => {
    setErrorMessage(e.target.validationMessage);
    setUrlValid(e.target.validity.valid);
  };


  return (
    <PopupWithForm
      name={`card`}
      text={`Новое место`}
      btnText={`Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      urlValid={urlValid}
    >
      <fieldset className="popup__field">
        <input
          onInput={handleChange}
          className="popup__form-input card-popup-name"
          placeholder="Название"
          {...register('name', 
          {required: 'Поле обязательно для заполнения', 
           minLength: {
            value: 2,
            message: 'Не менее 2-x символов'
           }, 
           maxLength: {
            value: 30,
            message: 'Не более 30 символов'
           }           
          }) }
        />
        <span className="error card-name-input-error">{errors?.name && errors?.name?.message || ""}</span>
        <input
          type="url"
          onInput={handleChange}
          className="popup__form-input card-popup-activity"
          placeholder="Ссылка на картинку"
          {...register('link', 
          {
            required: 'Поле обязательно для заполнения',                     
          })}
        />
        <span className="error card-activity-input-error">{errors?.link?.message ? errors?.link?.message : errorMessage || ""}</span>
      </fieldset>
    </PopupWithForm>
  );
}
