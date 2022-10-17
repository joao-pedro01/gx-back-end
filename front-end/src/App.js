import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from './thema/theme.js';
import Login from './pages/login/indexLogin';
import MainPage from './pages/listaPecas/indexLista';
import Header from './pages/header/indexHeader';
import Menus from './pages/menus/indexMenus';
import CadastroP from './pages/cadastroPecas/indexCadastroP';
import './thema/themeInput.css';


import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

const StyledApp = styled.div``;

const useLocalState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {const storedValue = localStorage.getItem(key); return storedValue === null ? defaultValue : JSON.parse(storedValue);})
  
  useEffect(() => {const listener = (e) => {if (e.storageArea === localStorage && e.key === key) {setValue(JSON.parse(e.newValue));}}; window.addEventListener("storage", listener); return () => {window.removeEventListener("storage", listener);}} , [key])

  const setValueLocalStorage = (newValue) => {
    setValue((currentValue) => {const result = typeof newValue === "function" ? newValue(currentValue) : newValue; localStorage.setItem(key, JSON.stringify(result)); return result;})
  }
 
  return[value, setValueLocalStorage];
};

const App = () => {
  const [theme, setTheme] = useLocalState("theme", "light");
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyle />
      <div className='inputtheme'>
        <input type="checkbox" className='themeinput' onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}/>
        <label className='labelinput'>
          <i></i>
          <div className='ball'></div>
        </label>
      </div>
      <div className="app">
          <Router> {/* Sistema de rotas da pagina */}
            <Routes>
              <Route exact path="/" element={<Login />} />   
              <Route exact path="/pecas" element={<MainPage />} />
              <Route exact path="/testeHeader" element={<Header/>}/>
              <Route exact path="/menu" element={<Menus/>}/>
              <Route exact path="/cadastro/pecas" element={<CadastroP/>}/>
            </Routes>
          </Router>
      </div>
    </ThemeProvider>
  );
  }
  
  export default App;
