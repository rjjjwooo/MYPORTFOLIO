import React, { useRef } from 'react';
import { useState, useEffect} from 'react';
import recipe_list_Data from '../json/recipe_list_Data.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main_catalog(props) {
    // console.log(props.data.style.display="block");
    const recipeMainImg = [];
    let [changeImg,setChangeImg] = useState(null);
    const navigate = useNavigate();
    let [keyCheck,setKeyCheck] = useState(null);
    let [totalData,setTotalData] = useState(null);
    useEffect(()=>{
        if(keyCheck){
            axios.post("http://kkms4001.iptime.org:45031/recipe/",JSON.stringify({v:keyCheck}))
            .then(res=>{
                console.log(totalData);
                const [img,title,Explanation,Level,Time,IngreFood,RecipeFood] = [...totalData];
                console.log(img,Explanation,title,Time,Level,IngreFood,RecipeFood);
                navigate("/recipe",{state:{
                    img:img,
                    title:title,
                    sub: Explanation,
                    recipeData: res.data,
                    level: Level,
                    time: Time,
                    ingredientImg: IngreFood,
                    recipeImg: RecipeFood
                }});
            })
            .catch(err=>{console.log("ERROR")});
        }
    },[keyCheck]);
    if(!(keyCheck)){
        while(recipeMainImg.length !== 4){
            const random = Math.floor(Math.random() * recipe_list_Data.length);
            if(!(recipeMainImg.includes(recipe_list_Data[random]))){
                recipeMainImg.push(recipe_list_Data[random]);
            }
        }
        changeImg = recipeMainImg.map(v=>v);
    }

    const htmlString = changeImg.map((data,i)=>{
        return <div key={i+1} className={"catalog"+(i+1)} onClick={()=>{
            setKeyCheck(data.food_name);
            setChangeImg(changeImg);
            setTotalData([
                data.food_image,
                data.food_name,
                data.food_description,
                data.cook_level,
                data.cook_time,
                data.food_ingredient_image,
                data.food_recipe_image
            ]);
            props.data.style.display="block";
            // document.querySelector(".loading").style.display="block";
        }} onMouseEnter={()=>{

        }}>
            {/* <a href='/'> */}
                <img src={data.food_image} alt="요리 이미지"></img>
            {/* </a> */}
        <span className={'toolTip_'+i+1 + ' pc'}>{data.food_name}</span>
        <span className={'toolTip_'+i+1 + ' mobile'}>{data.food_name}</span>
        </div>
    });
    return (
        <section>
            <div className="section_header">
                <h2>RECIPES FOR YOU</h2>
                <h3>요리랑의 추천 레시피를 둘러보세요.</h3>
            </div>
            <div className="catalog_area">
                {htmlString}
            </div>
        </section>
    )
}
export default Main_catalog;