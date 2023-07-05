import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, errors, isValid, handleChange, reset } = useFormValidation();
  const inputRef = useRef();

  useEffect(() => {
    if(values) {
      reset();
    }    
  }, [isOpen, reset])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values['link']);
  }

  return (
    <PopupWithForm
      name={`avatar`}
      text={`Обновить аватар`}
      btnText={`Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="popup__field avatar-popup__field">
        <input
          ref={inputRef}
          type="url"
          className="popup__form-input"
          id="avatar-popup-input"
          name="link"
          placeholder="Ссылка на картинку"
          value={values && 'link' in values ? values['link'] : ''}
          onChange={handleChange}
          required
        />
        <span className="error avatar-popup-input-error">{errors && 'link' in errors ? errors['link'] : ''}</span>
      </fieldset>
    </PopupWithForm>
  );
}
