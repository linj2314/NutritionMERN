import { useNavigate } from "react-router-dom";
import {useData} from "C:/Users/linj2/Documents/MERN/client/src/DataContext.js";

export default function DisplayFood() {
  const {currentList} = useData();
  const navigate = useNavigate();
    function NutrientTotals() {
        return (
          <div id="nutrienttotal">
          <p style={{ paddingLeft: 700 }}><b>Totals:</b></p>
          <p id="calorietotal" style={{ paddingLeft: 40 }} />
          <p id="proteintotal" style={{ paddingLeft: 50 }} />
          <p id="carbtotal" style={{ paddingLeft: 50 }} />
          <p id="fattotal" style={{ paddingLeft: 50 }} />
        </div>
        );
    }
    
    function FoodTable({foodArray}) {
        const foodRows = foodArray.map(food => {return getRows(food)});
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
      
    function getRows(food) {
        return (
          <tr>
            <td>{food.name}</td>
            <td>{food.calories}</td>
            <td>{food.protein}</td>
            <td>{food.carbs}</td>
            <td>{food.fats}</td>
          </tr>
        )
    }

    return(
        <>
            <button onClick={() => navigate("/addFood")}>Add Foods</button>

            <FoodTable foodArray = {currentList}/>
  
            <NutrientTotals />

            <p id="note" style={{ paddingLeft: 700, visibility: "hidden" }}>
                <b>Note: all quantities displayed are in grams</b>
            </p>
        </>
    );
}