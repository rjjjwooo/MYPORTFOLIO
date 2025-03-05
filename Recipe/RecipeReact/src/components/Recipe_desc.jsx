import React from "react";
// import test2jpg from '../image/test2.png';
const Recipe_desc = (props)=>{
    const explanation = props.value.recipeData.설명;
    return (
        <div className="foodexplanationFrame">
            <div className="TeamLogo">
                <img src="img/ico_logo@96.png" />
                <div className="TeamTitle">
                    <p className="title">요리랑</p>
                    <p className="subTitle">요리에 반하다</p>
                </div>
            </div>
            <div className="FoodDescriptionFrame">
                <p className="FoodDescription">
                    {explanation}
                    {/* 이스라엘 샐러드는 토마토, 오이, 양파, 파프리카 등을 잘게 잘라 만드는 샐러드예요. 드레싱도 레몬즙과 올리브오일, 소금, 후춧가루만 있으면 정말 간단하게 만들 수 있답니다! 
                    이스라엘에서는 빵 속에 넣어 먹기도 하고 가정의 아침식사에서는 필수적인 샐러드라고해요~! 다이어트에도 좋고 간단하고 건강한 아침식사로도 추천드려요~! */}
                </p>
            </div>
        </div>
    );
}

export default Recipe_desc;