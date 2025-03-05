import React from "react";
import { useState } from "react";
// import Readyjpg from '../image/ingredient.jpg';

const Recipe_ingredient = (props)=>{
    // console.log(props);
    let ingredientImg = props.value.ingredientImg;
    // const title = props.value.title;
    const totalIngredient = props.value.recipeData.기본재료;
    const totalDressing = props.value.recipeData.양념재료;
    //console.log(totalDressing);
    // let [check,setCheck] = useState(true);
    // let [ingredientImg,setIngredientImg] = useState("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAxMTdfNzYg%2FMDAxNjQyNDI3NzYxMTcy.HPwCX-nelB9uskbeeXZqh3zfFJJPIBwD7xWenm9Oohcg.NEoT2aQVv2Pe3sk9w48TtdUwr11UdsxnQ2e5S34Winkg.PNG.reviewcasting%2Fimage.png&type=sc960_832"); //나중에 동적 생성
    let [servings,setServings] = useState('2인분');
    let ingredient = [];
    let dressing = [];
    for(const key in totalIngredient){
        ingredient.push({name:key,quantity:totalIngredient[key]});
    }
    for(const key in totalDressing){
        dressing.push({name:key,quantity:totalDressing[key]});
    }
    const ingredientArray = ingredient.map((v,i)=>
        <p key={i+1}>{v.name}<span>{v.quantity}</span></p>
    );
    const dressingArray = dressing.map((v,i)=>
        <p key={i+1}>{v.name}<span>{v.quantity}</span></p>
    );
    // if(check){
    //     axios.post("http://127.0.0.1:8000/recipeImg/",JSON.stringify({v:title}))
    //     .then(res=>{
    //         setIngredientImg(res.data);
    //         setCheck(false);
    //     }).catch(err=>{console.log("axios 두번째 실행 오류")});
    // }
    return (
        <>
            <h4 className="ingredientTitle">재료</h4>
            <div className="ingredientTotalFrame">
                <div className="ingredientimgFrame">
                    <img src={ingredientImg} />
                    <div className="zoom"><i className="xi-zoom-in"></i>이미지를 누르고 있으면 크게 볼 수 있습니다.</div>
                </div>
                <div className="ingredientTypeFrame">
                    <h4 className="Basicmaterials">기본 재료<span className="servings">{servings}</span></h4> 
                    <div className="totalBasicFrame">
                        {ingredientArray}
                    </div>
                    <div className="DressingIngredients">
                        <h4 className="dressing">양념 재료</h4>
                        <div className="dressingFrame">
                           {dressingArray} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recipe_ingredient;