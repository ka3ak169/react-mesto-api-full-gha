import { Link } from "react-router-dom";

function Register({ formValue, setFormValue, onSubmit }) {
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
      <h2 className="entry-form__heading">Регистрация</h2>
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
          Зарегистрироваться
        </button>
      </form>
      <p className="entry-form__caption">
        Уже зарегистрированы?{" "}
        <Link className="entry-form__caption" to={"/sign-in"}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
