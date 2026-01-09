import { useState } from "react";
import "./budget.css";

const data={
    "Beauty and Health":[{title:"Hair and Makeup",cost:0},
        {title:"Prewedding and Pampering",cost:0}
    ],
    "Cake":[
        {title:"Cake and Cutting Fee",cost:0},
        {title:"Puffs",cost:0}
    ],
    "Catering":[
        {title:"Beverage and Bartenders",cost:0},
        {title:"Food and Service",cost:0}
    ]
};

export default function BudgetScreen(){
    const [budgetData,setBudgetData]=useState(data);
    const[expanded,setExpanded]=useState({});

    const handleCostChange=(category,index,value)=>{
        const updated={...budgetData};
        updated[category][index].cost=parseFloat(value)||0;
        setBudgetData(updated);
    };

    const totalSpent=Object.values(budgetData).flat().reduce((sum,item)=>sum+item.cost,0);

    return (
       <div className="buget-container">
        <h1 className="budget-title">Wedding Buget</h1>
        <div className="summary-cards">
            <div className="card-total">Total Budget: ₹120000</div>
            <div className="card-spent">Spent: ₹{totalSpent}</div>
            <div className="card-remaining">Remaing: ₹{120000-totalSpent}</div>
        </div>

        {Object.entries(budgetData).map(([category,items])=>(
            <div key={category} className="category-block">
                <div className="category-header" onClick={()=>to}></div>
            </div>
        ))}

       </div>
       
    );
}