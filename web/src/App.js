import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useRecipesContext } from "./hooks/useRecipesContext";

// pages
import {
  Home,
  Login,
  CreateAccount,
  UserProfile,
  CreateRecipes,
  UpdateRecipes,
  MyRecipes,
} from "./pages";

// meal categories
import {
  BreakfastRecipes,
  BrunchRecipes,
  LunchRecipes,
  DinnerRecipes,
} from "./pages/MealCategories";

// components
import { Navbar, Footer } from "./components";

function App() {
  const { user } = useAuthContext();
  const { recipes } = useRecipesContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/breakfast" element={<BreakfastRecipes />} />
            <Route path="/brunch" element={<BrunchRecipes />} />
            <Route path="/lunch" element={<LunchRecipes />} />
            <Route path="/dinner" element={<DinnerRecipes />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/logout" element={<Login />} />
            <Route
              path="/user-profile"
              element={user ? <UserProfile /> : <Navigate to="/login" />}
            />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-recipes" element={<CreateRecipes />} />
            <Route path="/my-recipes" element={<MyRecipes />} />

            <Route
              path="/update-recipe/:id"
              element={<UpdateRecipes recipe={recipes} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
