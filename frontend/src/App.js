import "bootstrap/dist/css/bootstrap.min.css";
import "react-widgets/dist/css/react-widgets.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import MainNav from "./components/MainNav/MainNav";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SnackbarProvider>
          <MainNav />
          <MainContent />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
