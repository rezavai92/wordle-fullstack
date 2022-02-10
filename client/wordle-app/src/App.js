import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import AppBoardComponent from "./components/app-board/app-board.component";
const App = () => {
  return (
    <BrowserRouter>
     
     <Routes>
        <Route path="/" element={<AppBoardComponent />} />
     </Routes>
    </BrowserRouter>
  );
};

export default App;
