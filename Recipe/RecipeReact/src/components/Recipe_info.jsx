import React from "react";
// import testjpg from '../image/test.jpg';
import { useState, useEffect } from "react";



const Recipe_info = (props) =>{
    let {img,title,sub,level,time} = props.value;
    let star = '';
    if(level === '고급'){
      star = `★ ★ ★`;
    }else if(level === '중급'){
      star = '★ ★ ☆';
    }else if(level === '초급'){
      star = '★ ☆ ☆';
    }
    // console.log(level,time);
    return (
    <>
    <div className="mainFoodimgFrame">
      <img src={img} alt="No Image" />
    </div>
    <div className="foodTitleFrame">
        <h4 className="TitleAdditionalDescription">{sub}</h4>
        <h3 className="foodTitle">{title}</h3>
    </div>
    <div className="difficultyFrame">
        <p className="difficulty">난이도({level})&nbsp;&nbsp;&nbsp;<span>
        <i>{star}</i>
        </span>&nbsp;&nbsp;소요시간&nbsp;&nbsp;<span id="timeTaken">{time}</span></p>
    </div>
    </>
  );
}
export default Recipe_info;