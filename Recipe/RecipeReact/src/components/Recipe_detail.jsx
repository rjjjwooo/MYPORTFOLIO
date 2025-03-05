import React from "react";
import { useState } from "react";
import axios from "axios";
// import RecipeDescriptionjpg from '../image/RecipeDescription.jpg';


const Recipe_detail = (props)=>{
    let stepImg = props.value.recipeImg;
    const totalStep = props.value.recipeData.단계;
    let recipe = [];
    let serverSend = [];
    let i = 1;
    // let [onecheck,setOneCheck] = useState(true);
    // let [twocheck,setTwoCheck] = useState(false);
    // let [threecheck,setThreeCheck] = useState(false);
    // let [fourcheck,setFourCheck] = useState(false);
    // let [stepImg,setStepImg] = useState("/img/RecipeDescription.jpg");
    // let [stepTwoImg,setStepTwoImg] = useState("/img/RecipeDescription.jpg");
    // let [stepThreeImg,setStepThreeImg] = useState("/img/RecipeDescription.jpg");
    // let [stepFourImg,setStepFourImg] = useState("/img/RecipeDescription.jpg");
    for(const key in totalStep){
        recipe.push({step:`Step ${i}`,img:"/img/RecipeDescription.jpg",explanation:totalStep[key]});
        serverSend.push(totalStep[key]);//서버로 보내기 위한 1 ~ 4단계 뽑기
        i++;
    }
    // console.log(serverSend);
    // axios.post("http://127.0.0.1:8000/stepImg/",JSON.stringify({v:serverSend}))
    // .then(res=>{
    //     setStepOneImg(res.data);
    //     console.log(res.data);
    // })
    // .catch(err=>{console.log(`StepImg Error`)});
    
    
    
    let recipeArray = recipe.map((v,i)=>{
        return <div key={i+1} className="RecipeDescriptionFrame">
                <div className="RecipeDescriptionimgFrame">
                    <img className={'img_'+i} src={stepImg} />
                </div>
                <div className="RecipeDescriptionTypeFrame">
                    <h4 className="TitleStep">{v.step}</h4> 
                    <div className="step1Explanation">
                        <p>{v.explanation}</p>
                    </div>
                </div>
            </div>
    });
    return (
        <>
          <h4 className="RecipeDescriptionTitle">레시피</h4>
          {recipeArray}
        </>
    );
}


export default Recipe_detail;