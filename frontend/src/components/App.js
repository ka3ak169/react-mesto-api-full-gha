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
    async function fetchData() {
      try {
        tokenCheck();
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
    }
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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((data) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? data : c))
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
            state.map((c) => (c._id === card._id ? data : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
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
      .then((data) => {
        setCurrentUser(data);
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
        setCurrentUser(data);
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
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterSubmit = (email, password) => {
    register(email, password)
      .then((result) => {
        console.log(result);
        setRegistration(true);
        setIsInfoTooltipPopupOpen(true);
        setFormValue({ email: "", password: "" });
        setTimeout(() => {
          navigate("/sign-in");
          closeAllPopups();
        }, 2000);
      })
      .catch((error) => {
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
        localStorage.setItem("token", JSON.stringify({ result }));
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
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

  const tokenCheck = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const token = JSON.parse(storedToken).result;
      authorize(token)
        .then((result) => {
          if (result !== null && result.data !== null) {
            // console.log(result.data.email);
            setUserEmail(result.data.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setFormValue({ email: "", password: "" });
    navigate("/sign-in");
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
                  way={"/sign-in"}
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
            path="/sign-in"
            element={
              <>
                <Header
                  onLogout={handleLogout}
                  text={"Регистрация"}
                  way={"/sign-up"}
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
            path="/sign-up"
            element={
              <>
                <Header
                  onLogout={handleLogout}
                  text={"Войти"}
                  way={"/sign-in"}
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
