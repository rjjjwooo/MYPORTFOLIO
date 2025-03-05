import React from 'react';
import { useState, useEffect} from 'react';
import recipe_list_Data from '../json/recipe_list_Data.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// console.log(json_data)
function Ul(props){
    // console.log(props.liData)
    let lis = [];
    const navigate = useNavigate();
    let [keyCheck,setKeyCheck] = useState(null);
    let [keyData,setKeyData] = useState(null);
    let [cookLevel,setCookLevel] = useState(null);
    let [cookTime,setTime] = useState(null);
    let [foodIngredientImg,setFoodIngredientImg] = useState(null);
    let [foodRecipeImg,setFoodRecipeImg] = useState(null);
    useEffect(()=>{
        if(keyCheck){
            axios.post("http://kkms4001.iptime.org:45031/recipe/",JSON.stringify({v:keyCheck}))
            .then(res=>{
                let totalKeyData = null;
                for(let i=0; i<lis.length; i++){
                    if(lis[i].key === String(keyData)){
                        totalKeyData = lis[i].props.children;
                        break;
                    }
                }
                // console.log(res.data);
                //console.log(totalKeyData);
                const [{props:{src}},{props:{children}}] = totalKeyData;
                const [img,Explanation,title,Level,Time,IngreFood,RecipeFood] = [src,children,keyCheck,cookLevel,cookTime,foodIngredientImg,foodRecipeImg];
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

    // console.log(props.liData)
    if(props.liData.length === 0){
        lis.push(
            <li key="food_none" className='food_none'>
                <i className="xi-restaurant"></i>
                <p>찾으시는 요리가 없습니다.</p>
            </li>
        )
    } else {
        props.liData.map((data)=>{
            lis.push(
                <li key={data.food_id} onClick={()=>{
                    setKeyCheck(data.food_name);
                    setKeyData(data.food_id);
                    setCookLevel(data.cook_level);
                    setTime(data.cook_time);
                    setFoodIngredientImg(data.food_ingredient_image);
                    setFoodRecipeImg(data.food_recipe_image);
                    document.querySelector(".loading").style.display="block";
                }}>
                    {/* <a href='/recipe'>  */}
                        <img src={data.food_image} alt="요리 이미지"></img>
                        <div className="desc">{data.food_description}</div>
                        <div className="name">{data.food_name}</div>
                        <div className="bottom">
                            <i className="xi-chart-bar"></i>
                            <span className="level">{data.cook_level}</span>
                            <i className="xi-time"></i>
                            <span className="time">{data.cook_time}</span>
                        </div>
                    {/* </a>  */}
                </li>
            )
        });
    }
    return (
        <ul className="recipe_list">
            {lis}
        </ul>
        
    )
}


function Main_recipe_list(props){
    // 카테고리 버튼 클릭시 컬러 변경하기
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = (index) => {
        setActiveIndex(index); // 클릭된 항목의 인덱스로 상태 업데이트됨
    };

    // 카테고리 버튼 클릭시 모드에 따라 json파일 불러오기
    let liData = null;
    const [mode, setMode] = useState("한식");
    if(mode === "한식"){
        liData = recipe_list_Data.filter((v)=>{if(v.cook_type === "한식"){return v}})
        // console.log(json_data.korean)
    } else if(mode === "양식"){
        liData = recipe_list_Data.filter((v)=>{if(v.cook_type === "양식"){return v}})
    } else if(mode === "일식"){
        liData = recipe_list_Data.filter((v)=>{if(v.cook_type === "일식"){return v}})
    } else if(mode === "중식"){
        liData = recipe_list_Data.filter((v)=>{if(v.cook_type === "중식"){return v}})
    }

    // 체크박스 체크할때마다 체크 배열 만들기
    const [check, setCheck] = useState("");
    const handleChangeCheck = (checked, item) => {
        if (checked) {
          setCheck((prev) => [...prev, item]);
        } else {
          setCheck(check.filter((el) => el !== item));
        }
        // console.log(checked, item);
    };
    // console.log(check)

    // 체크 배열에 따라 일치하는 레벨만 화면에 뿌리기
    // console.log(liData)
    liData = liData.filter((item) => {
        if (check.length === 0) return true; // 체크박스 선택이 없을 경우 모든 데이터 포함
        return check.includes(item.cook_level);
        // return console.log(check)
    });

    // 검색기능
    const [search, setSearch] = useState("");
    // console.log(search)
    liData = liData.filter((item)=>{
        // return console.log(item.food_name.includes(search))
        if(item.food_name.includes(search) === false){ // input값(=search)에 일치하는게 없으면 liData 비우기
            return liData = null
        } else {
            return item.food_name.includes(search)
        }
    })
    // console.log(liData)

    return (
        <div>
            <section>
                <div className="section_header">
                    <h2>OUR RECIPES</h2>
                    <h3>요리랑과 맛있는 음식을 만들어 보세요.</h3>
                </div>
                <div className="category">
                    <ul>
                        {['한식', '양식', '일식', '중식'].map((item, index) => (
                        <li
                            key={index}
                            onClick={event => {
                                handleClick(index)
                                setMode(item);
                            }}
                            className={activeIndex === index ? 'active' : ''}
                        >
                            {item}
                        </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section>
                <div className="fillter_area">
                    <form className="level">
                        <label htmlFor="highLevel">고급</label>
                        <input type="checkbox" id="highLevel" name="high" value="고급" checked={check.includes("고급")} onChange={(e) =>handleChangeCheck(e.target.checked, e.target.value)} />
                        <label htmlFor="mediumLevel">중급</label>
                        <input type="checkbox" id="mediumLevel" name="medium" value="중급" checked={check.includes("중급")} onChange={(e) =>handleChangeCheck(e.target.checked, e.target.value)} />
                        <label htmlFor="lowLevel">초급</label>
                        <input type="checkbox" id="lowLevel" name="low" value="초급" checked={check.includes("초급")} onChange={(e) =>handleChangeCheck(e.target.checked, e.target.value)} />
                        
                    </form>
                    <form className="search">
                        <input type="search" id="d" name="ingredient" placeholder="요리명을 입력하세요." onChange={e => {
                            setSearch(e.target.value);
                        }}
                        onKeyDown={e=>{
                            if (e.key === "Enter") {
                                e.preventDefault(); // 엔터키 입력 방지
                            }
                        }}
                        ></input>
                        <button type='button' className="btn_search" onClick={(e)=>{
                            setSearch(search);
                        }}>검색</button>
                    </form>
                </div>
                <Ul liData={liData}></Ul>
            </section>
        </div>
    )
    
}
export default Main_recipe_list;