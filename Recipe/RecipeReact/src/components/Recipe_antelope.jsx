import React from "react";
import { useState } from "react";



const antelope = (props)=>{
    const allergy = props.value.recipeData['알레르기 성분'];
    const calorie = props.value.recipeData['칼로리'];
    return (
        <>
        <h4 className="antelopeTitle">영양정보</h4>
        <div className="antelopeTotalFrame">
            <p className="calorie">칼로리<span>{calorie}</span></p>
            <p className="allergy">알러지<span>{allergy}</span></p>
        </div>
        </>
    )
}



export default antelope;