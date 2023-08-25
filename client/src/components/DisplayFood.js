import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useData} from "C:/Users/techn/OneDrive/Documents/mern/client/src/DataContext.js";
import React from "react";

export default function DisplayFood() {
  const {currentList, setCurrentList} = useData();
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const navigate = useNavigate();

  function updateTotals() {
    let temp = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    }
    for (let i of currentList) {
      temp.calories += i.calories;
      temp.protein += i.protein;
      temp.fats += i.fats;
      temp.carbs += i.carbs;
    }
    setTotals(temp);
  }

  useEffect(() => {
    updateTotals();
  }, [])

  function NutrientTotals() {
      return (
        <div id="nutrienttotal" style={{display: "flex"}}>
          <p style={{ paddingLeft: "30%" }}><b>Totals:</b></p>
          <p id="calorietotal" style={{ paddingLeft: "5%" }}>Calories: {Math.round(totals.calories * 100) / 100}</p>
          <p id="proteintotal" style={{ paddingLeft: "5%" }}>Protein: {Math.round(totals.protein * 100) / 100}</p>
          <p id="carbtotal" style={{ paddingLeft: "5%" }}>Carbs: {Math.round(totals.carbs * 100) / 100}</p>
          <p id="fattotal" style={{ paddingLeft: "5%" }}>Fats: {Math.round(totals.fats * 100) / 100}</p>
        </div>
      );
  }
    
    function FoodTable({foodArray}) {
        let i = -1;
        const foodRows = foodArray.map(food => {i++; return getRows(food, i)});
          return (
            <table style={{paddingLeft: "18 %", paddingTop: "3%", width: "80%", textAlign: "center"}}>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbohydrates</th>
                <th>Fats</th>
              </tr>
              {foodRows}
            </table>
          );
    }
      
    function getRows(food, i) {
        return (
          <tr>
            <td>{food.name}</td>
            <td>{food.calories}</td>
            <td>{food.protein}</td>
            <td>{food.carbs}</td>
            <td>{food.fats}</td>
            <td><DeleteButton index={i} /></td>
          </tr>
        )
    }

    function DeleteButton(index) {
      return(
        <button onClick={() => {
        console.log(index);
        let temp = currentList;
        temp.splice(index, 1);
        setCurrentList(temp);
        navigate("/");
        updateTotals();
        }}>Delete Item</button>
      )
    }

    return(
        <>
            <button onClick={() => navigate("/addFood")}>Add Foods</button>

            <NutrientTotals />

            <FoodTable foodArray = {currentList}/>

            <p id="note" style={{ paddingLeft: "35%", paddingTop: "5%"}}>
                <b>Note: all quantities displayed are in grams</b>
            </p>
        </>
    );
}