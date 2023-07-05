import React from "react";

function Login({ formValue, setFormValue, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formValue;
    onSubmit(email, password);
  };

  return (
    <div className="entry-form">
      <h2 className="entry-form__heading">Вход</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="entry-form__field">
          <input
            className="entry-form__form-input"
            id="entry-form-email-input"
            type="text"
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="entry-form__form-input"
            id="entry-form-password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            value={formValue.password}
            onChange={handleChange}
            required
          />
        </fieldset>
        <button
          className="entry-form__submit-button"
          type="submit"
          name="submit"
        >
          {" "}
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
