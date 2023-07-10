import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorization, authorize } from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", src: "" });
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registration, setRegistration] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const token = JSON.parse(storedToken);
          await tokenCheck(token); // Ждем завершения проверки токена
          setLoggedIn(true);
          navigate("/");
        }
        if (loggedIn) {
          const [userData, cards] = await Promise.all([
            api.getUserInformation(),
            api.getInitialCards(),
          ]);
          setCurrentUser(userData);
          setCards(cards.map((item) => item));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [loggedIn]);
  

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", src: "" });
    setIsInfoTooltipPopupOpen(false);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (data) => {
    setSelectedCard(data);
  };
  const handleCardLike = (card) => {
    if (card.likes && Array.isArray(card.likes)) {

    const isLiked = card.likes.some((i) => i === currentUser._id);

      if (isLiked) {
        console.log(isLiked);
        api
          .deleteLike(card._id)
          .then((data) => {
            setCards((state) =>
            state.map((c) => {
              return c._id === card._id ? data.data : c;
            })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api
          .addLike(card._id)
          .then((data) => {
            setCards((state) =>
            state.map((c) => {
              return c._id === card._id ? data.data : c;
            })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log("card.likes is undefined or not an array");
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .changeUserInformation(data)
      .then((newData) => {
        setCurrentUser(newData.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = (link) => {
    api
      .changeProfileAvatar(link)
      .then((data) => {
        setCurrentUser(prevState => ({ ...prevState, avatar: data.avatar }));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        api.getInitialCards()
        .then((cards) => setCards(cards.map((item) => item)))
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterSubmit = (email, password) => {
    register(email, password)
      .then((result) => {
        setRegistration(true);
        setIsInfoTooltipPopupOpen(true);
        setFormValue({ email: "", password: "" });
        setTimeout(() => {
          navigate("/signin");
          closeAllPopups();
        }, 2000);
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);
        setRegistration(false);
        setIsInfoTooltipPopupOpen(true);
        setFormValue({ email: "", password: "" });
        setTimeout(() => {
          closeAllPopups();
        }, 2000);
      });
  };

  const handleLoginSubmit = (email, password) => {
    authorization(email, password)
    .then((result) => {
      if (result) {       
        localStorage.setItem("token", JSON.stringify(result.token));
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      }
    })
    .catch((error) => {
      console.log(error);
      setIsInfoTooltipPopupOpen(true);
      setFormValue({ email: "", password: "" });
      setRegistration(false);
      setTimeout(() => {
        closeAllPopups();
      }, 2000);
    });
  };

  const tokenCheck = async (token) => {
    try {
      const result = await authorize(token);
      if (result !== null && result.data !== null) {
        setUserEmail(result.data.email);
        setLoggedIn(true);
        api.setToken(token);
      }
    } catch (error) {
      console.log("Токена не существует");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setFormValue({ email: "", password: "" });
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/signin");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  userEmail={userEmail}
                  onLogout={handleLogout}
                  text={"Выйти"}
                  way={"/signin"}
                  loggedIn={loggedIn}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header
                  onLogout={handleLogout}
                  text={"Регистрация"}
                  way={"/signup"}
                  loggedIn={loggedIn}
                />
                <Login
                  formValue={formValue}
                  setFormValue={setFormValue}
                  onSubmit={handleLoginSubmit}
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header
                  onLogout={handleLogout}
                  text={"Войти"}
                  way={"/signin"}
                  loggedIn={loggedIn}
                />
                <Register
                  formValue={formValue}
                  setFormValue={setFormValue}
                  onSubmit={handleRegisterSubmit}
                />
              </>
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name={`deleteCard`}
          text={`Вы уверены?`}
          btnText={`Да`}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          registration={registration}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
