import React from "react";
import Recipe_info from './Recipe_info';
import Recipe_desc from './Recipe_desc';
import Recipe_ingredient from './Recipe_ingredient';
import Recipe_ingredient_question from './Recipe_ingredient_question';
import Recipe_detail from './Recipe_detail';
import Recipe_detail_question from './Recipe_detail_question';
import Recipe_antelope from './Recipe_antelope';
import { useLocation } from "react-router-dom";
import Recipe_youtube from "./Recipe_youtube";

const Recipe_frame = (props)=>{
    window.scrollTo(0,0);
    //props.loding.current.style.display="none";
    if(props.loading.current){
        props.loading.current.style.display="none";
    }else{
        // console.log("NO");
    }
    // document.querySelector(".loading").style.display="none";
    const location = useLocation();
    const data = location.state;
    // console.log(data);
    return (
        <main className="recipesFrame">
            <div className="foodInformationFrame">
            <Recipe_info value={data}/>
            <Recipe_desc value={data}/>
            <Recipe_ingredient value={data}/>
            <Recipe_ingredient_question value={data}/>
            <Recipe_antelope value={data}/>
            <Recipe_detail value={data}/>
            <Recipe_detail_question value={data}/>
            <Recipe_youtube value={data}/>
            </div>
        </main>
    );
}

export default Recipe_frame;
