import React from "react";

import {Route, Routes} from "react-router-dom";

import _inputFood from "./components/FoodSearchBar";
import _displayFood from "./components/DisplayFood";

export default function App() {
    return (
      <div>
        <Routes>
          <Route exact path ="/" element={<_displayFood />} />
          <Route path ="/addFood" element={<_inputFood />} />
        </Routes>
      </div>
    );
}
  

  
