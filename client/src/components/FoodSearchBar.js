import React, {useEffect, useState} from "react";
import {useData} from "C:/Users/linj2/Documents/MERN/client/src/DataContext.js";
import { useNavigate } from "react-router-dom";

export default function InputFood() {
    const navigate = useNavigate();
    const {currentList, setCurrentList} = useData();
    const [foodSearchList, updateList] = useState([]);
    const [query, updateQuery] = useState("");
    const [selected, setSelected] = useState({
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    });

    function updateForm(value) {
      return setSelected((prev) => {
        return {...prev, ...value};
      });
    }

    useEffect(() => {
          async function fetchData() {
            const response = await fetch(`http://localhost:5050/record/search?q=${encodeURIComponent(query)}`);
        
            if (!response.ok) {
              const message = `An error has occurred: ${response.statusText}`;
              window.alert(message);
              return;
            }
        
            const record = await response.json();
            if (!record) {
              window.alert(`No Foods Found`);
              return;
            }

            console.log(record);
            updateList(() => record);
          }
        
          fetchData();
    }, [query]);

    async function fetchNutrient(e) {
      let nutritionvalue = {
        name: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      };
      const response = await fetch(`http://localhost:5050/record/${e}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const selecteditem = await response.json();
      nutritionvalue.name = selecteditem.description;
      for (let i of selecteditem.foodNutrients) {
        if (i.nutrient.unitName === "kcal") {
          nutritionvalue.calories = i.amount;
        }
        if (i.nutrient.name === "Protein") {
          nutritionvalue.protein = i.amount;
        }
        if (i.nutrient.name === "Carbohydrate, by difference") {
          nutritionvalue.carbs = i.amount;
        }
        if (i.nutrient.name === "Total lipid (fat)") {
          nutritionvalue.fats = i.amount;
        }
      }
      updateForm(nutritionvalue);
    }

    const Dropdown = React.memo(({items}) => {
      console.log(items);
      const itemsdropdown = items.map(item => <p id={item._id} onClick={(e) => fetchNutrient(e.target.id)}>-{item.description}</p>);
      return(
        <>
          {itemsdropdown}
        </>
      )
    });

    function Title() {
      return <h1 style={{ textAlign: "center", fontSize: "400%" }}>Diet Tracker v1</h1>;
    }


    function EnterAmt() {
      const [multiplier, updateMultiplier] = useState(1);
      return(
        <>
          <input type="text" placeholder="Enter Quanitity (grams)" onChange={e => updateMultiplier(e.target.value)}></input>
          <div>
          <h2>Selected Item:</h2>
          <h3>Name: {selected.name}</h3>
          <h3>Calories: {Math.round((selected.calories  * multiplier/100) * 1000) / 1000}</h3>
          <h3>Protein: {Math.round((selected.protein  * multiplier/100) * 1000) / 1000}</h3>
          <h3>Carbs: {Math.round((selected.carbs  * multiplier/100) * 1000) / 1000}</h3>
          <h3>Fats: {Math.round((selected.fats  * multiplier/100) * 1000) / 1000}</h3>
          </div>
        </>
      )
    }


    return(
      <>
        <Title />

        <div style={{display: "flex"}}>
          <div style={{zIndex: "1"}}>
            <input type="text" placeholder="Search For Foods" onChange={(e) => updateQuery(e.target.value)}></input>
            <Dropdown items={foodSearchList}></Dropdown>
          </div>
          
          <div style={{paddingLeft: "70%", position: "absolute"}}>
              <EnterAmt></EnterAmt>
          </div>

          <button style={{marginLeft: "80%", position: "absolute"}} onClick={() => {
              let temp = currentList;
              temp.push(selected);
              setCurrentList(temp);
              navigate("/")
          }}>Submit</button>
          
        </div>
      </>
    );
}