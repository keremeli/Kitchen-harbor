import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import AuthPage from './pages/AuthPage';
import DashBoard from './pages/DashBoard'
import CreateRecipePage from './pages/CreateRecipePage'; 
import EditRecipePage from './pages/EditRecipePage';
import ShoppingListPage from './pages/ShoppingListPage'
import CreateShoppingListPage from './pages/CreateShoppingListPage';
import EditShoppingList from './pages/EditShoppingList'
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';





function App() {
  


  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthPage />} />
        <Route exact path='/dashboard' element={<DashBoard />} />
        <Route path="/createrecipepage" element={<CreateRecipePage />} />
        <Route path="/editrecipepage/:id?" element={<EditRecipePage />} />
        <Route path="/shoppinglistpage" element={<ShoppingListPage />} />
        <Route path="/createshoppinglistpage" element={<CreateShoppingListPage />} />
        <Route path="/editshoppinglist/:id?" element={<EditShoppingList />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/edituserpage" element={<EditUserPage />} />
      </Routes>
    </Router>
  ); 
  
}

export default App;
