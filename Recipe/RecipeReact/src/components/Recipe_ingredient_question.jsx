import React from "react";
import { useState,useRef,useEffect } from "react";
import axios from "axios";

const Recipe_ingredient_question = (props) => {
    //////오디오//////////
    const [isListening,setIsListening] = useState(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const audioData = new SpeechRecognition();
    audioData.lang = 'ko-KR'; // 한국어 설정
    audioData.interimResults = true; // 중간 결과도 표시
    audioData.maxAlternatives = 1; // 가능한 결과 중 1개만 사용

    useEffect(()=>{
        audioData.onaudiostart = () => {
            console.log("음성 인식이 시작되었습니다.");
            document.querySelector(".xi-microphone-o").style.color="#ad0808";
        };
        audioData.onaudioend = () => {
            console.log("음성 인식이 중지되었습니다.");
            document.querySelector(".xi-microphone-o").style.color="#75574B";
        };
        if(isListening){
            audioData.start();
            // console.log(audioData.start());
        }else{
            audioData.stop();
            console.log("HIH");
        }
    },[isListening]);

    audioData.onresult  = (event) =>{
         const transcript = event.results[0][0].transcript;
         console.log(ingredient_input.current.value = transcript);
        console.log(transcript);
    }

    audioData.onerror = (event) => {
        console.error("오디오 에러 입니다.");
    };

    const fixIngredientData = props.value.recipeData.기본재료;
    const totalFixIngredientData = [];
    let [searchInput,setSearchInput] = useState(null);
    let [searchData,setSearchData] = useState(null);
    const [check,setCheck] = useState(null);
    const ingredient_input = useRef(null);
    for(const key in fixIngredientData){
        totalFixIngredientData.push(key);
    }
    // console.log(totalFixIngredientData);
    useEffect(()=>{
        // console.log(searchInput);
        if(check){
            axios.post("http://kkms4001.iptime.org:45031/ingredient_search/",JSON.stringify({v:searchInput}))
            .then(res=>{
                const explanation = res.data.설명;
                let htmlString = [];
                let i =1;
                for(const key in explanation){
                    htmlString.push(<div key={i} style={{ display: 'flex', justifyContent: 'space-around' ,marginBottom: '10px'}}>
                        <p style={{ fontWeight: 'bold', width: '45px'}}>{key}:</p>
                        <p style={{width:'500px'}}>{explanation[key]}</p>
                      </div>);
                    i++;
                }
                console.log(htmlString);
                setSearchData(htmlString);
            })
            .catch(err=>{console.log("Search Data Error")});
        }
    },[searchInput]);
    return (
        <div className="recipe_ingredient_question">
            <h4>좋은 재료는 어떻게 고를까요?!</h4>
            <p className="desc"><span className="desc_point">기본재료</span> 중 궁금한 재료를 입력하세요.<br></br>요리랑이 신선하고 좋은 재료를 고르는 방법을 알려드립니다.</p>
            <div className="input_area">
                <div className="area_top">
                    <span>신선한</span>
                    <span className="input_box">
                        <input name="v" ref={ingredient_input} type="text" placeholder="ex) 양파" className="ingredient_input mic" />
                        <i type="button" className="xi-microphone-o" onMouseDown={()=>{
                            setIsListening(true);
                        }} onMouseUp={()=>{
                            setIsListening(false);
                        }}></i>
                    </span>
                    <span>고르는 방법 알려줘!</span>
                </div>
                <input type="button" value={"검색"} className="search_input" onClick={()=>{
                    setCheck(true);
                    if(totalFixIngredientData.includes(ingredient_input.current.value)){
                        document.getElementById("ingredientAnswer").style.display = "block" // 인영1108
                        setSearchInput(ingredient_input.current.value);
                        setSearchData(<div className="message">잠시만 기다려주세요</div>);
                    }else{
                        document.getElementById("ingredientAnswer").style.display = "block" // 인영1108
                        setSearchData(<div className="message">기본재료를 입력해주세요</div>);
                    }
                }}/>
            </div>
            <div id="ingredientAnswer" className="answer_area">
                <i className="xi-message"></i>
                {searchData}
            </div>
        </div>
    )
};

export default Recipe_ingredient_question;
