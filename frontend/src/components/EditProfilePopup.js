import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, reset, handleChange, setValue, setIsValid } = useFormValidation();


  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('about', currentUser.about);
      if (currentUser.name && currentUser.about) {
        setIsValid(true);
      }
    }    
  }, [currentUser, isOpen, setValue, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({ name: values["name"], about: values["about"] });
  };

  const onClosePopup = () => {
    onClose();
    if (currentUser) {
      reset({'name': currentUser.name, 'about': currentUser.about});
    }
  }

  return (
    <PopupWithForm
      name={`profile`}
      text={`Редактировать профиль`}
      btnText={`Сохранить`}
      isOpen={isOpen}
      onClose={onClosePopup}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="popup__field">
        <input
          className="popup__form-input profile-popup-name"
          id="profile-name-input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={ values['name'] ?? ""}
          onChange={handleChange}
          required
        />
        <span className="error profile-name-input-error">{errors['name']}</span>
        <input
          className="popup__form-input profile-popup-activity"
          id="profile-activity-input"
          type="text"
          name="about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          value={values['about'] ?? ""}
          onChange={handleChange}
          required
        />
        <span className="error profile-activity-input-error">{errors['about']}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
