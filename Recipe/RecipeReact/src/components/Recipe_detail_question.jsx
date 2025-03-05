import React, { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";

const Recipe_detail_question = (props) => {
    
    let [searchInput,setSearchInput] = useState(null);
    let [gptAnswer,setgptAnswer] = useState(null);
    const [check,setCheck] = useState(null);
    const recipe_textarea = useRef(null);
    const [isListening,setIsListening] = useState(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const audioData = new SpeechRecognition();
    audioData.lang = 'ko-KR'; // 한국어 설정
    audioData.interimResults = true; // 중간 결과도 표시
    audioData.maxAlternatives = 1; // 가능한 결과 중 1개만 사용
    

    useEffect(()=>{
        audioData.onaudiostart = () => {
            console.log("음성 인식이 시작되었습니다.");
            document.querySelector(".footerMic").style.color="#ad0808";
        };
        audioData.onaudioend = () => {
            console.log("음성 인식이 중지되었습니다.");
            document.querySelector(".footerMic").style.color="#75574B";
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
        recipe_textarea.current.value = transcript
        console.log(transcript);
    }

    audioData.onerror = (event) => {
        console.error("오디오 에러 입니다.");
    };

    
    // let [textareaValue,setTextareaValue] = useState(null);
    useEffect(()=>{
        if(check){
            axios.post("http://kkms4001.iptime.org:45031/Recipe_detail_question/",JSON.stringify({v:searchInput}))
            .then(res=>{
                const explanation = res.data.답변;
                setgptAnswer(explanation);
            })
            .catch(err=>{console.log("Recipe_detail_question Search Data Error")})
        }
    },[searchInput])
    return (
        <div className="recipe_detail_question">
            <h4>자세한 요리 방법이 궁금하세요?</h4>
            <p className="desc">레시피의 더 궁금한점이 있다면 물어보세요.<br></br>질문이 구체적일수록 좋아요!</p>
            <div className="input_area">
                <textarea name="v" ref={recipe_textarea} placeholder="본 레시피와 관련된 질문을 입력해주세요." className="recipe_textarea"></textarea>
                <i type="button" className="xi-microphone-o footerMic" onMouseDown={()=>{
                    
                    setIsListening(true);
                }} onMouseUp={()=>{
                    
                    setIsListening(false);
                }}></i>
                <input type="button" value={"검색"} className="search_input" onClick={(e)=>{
                    setCheck(true)
                    setSearchInput(recipe_textarea.current.value);
                    document.getElementById("recipeAnswer").style.display = "block"
                }}></input>
            </div>
            <div id="recipeAnswer" className="answer_area">
                <i className="xi-message"></i>
                <p>{gptAnswer}</p>
            </div>
        </div>
    )
};

export default Recipe_detail_question;

