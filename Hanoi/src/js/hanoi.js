window.onload = () =>{
    class Hanoi {
            constructor( id ) {
                this.id = id;
                this.count = 0;
                this.inputCount = 1;
                this.startCheck = true;
            }
            getVisual(totalValue='',moveData='') {
                const [boxData,move1,move2] = [...moveData];
                let hanoiA='',hanoiB='',hanoiC = '';
                let title = '',btn='',count='',scrollUp='',moveText='';
                let left = 44;
                let width = 120;
                let height = 56;
                let [a] = [totalValue]; 
                if (totalValue !== '') {
                    a.forEach(v=>{
                        if (v.checkId === 'hanoiAStack') {
                            for(let i=v.data.length-1; i>=0; i--){
                                hanoiA += v.data[i].outerHTML;
                            }
                        } else if (v.checkId === 'hanoiBStack') {
                            for(let i=v.data.length-1; i>=0; i--){
                                hanoiB += v.data[i].outerHTML;
                            }
                        } else if (v.checkId === 'hanoiCStack') {
                            for(let i=v.data.length-1; i>=0; i--){
                                hanoiC += v.data[i].outerHTML;
                            }
                        }
                    });
                }
                if(this.count === 0){
                    left = 45;
                    hanoiA = `<div class="one box">1</div>`;
                    title = `
                    <header>
                        <h2 class="title">
                            <span class="H">H</span>
                            <span class="A">A</span>
                            <span class="N">N</span>
                            <span class="O">O</span>
                            <span class="I">I</span>
                            <span class="T">T</span>
                            <span class="OO">O</span>
                            <span class="W">W</span> 
                            <span class="E">E</span>
                            <span class="R">R</span>
                        </h2>
                    </header>
                    `;
                    btn = `
                    <footer class="downFrame">
                        <div id="totalInput" class="totalInput">
                            <button class="Btn minus" data-value="minus"><i class="xi-minus Btn" data-value="minus"></i></button>
                            <input id="startInput" class="startInput" type="text" value="1" max="7" min="1" disabled="disabled">
                            <button class="Btn plus" data-value="plus"><i class="xi-plus Btn" data-value="plus"></i></button>
                        </div>
                        <div class="totalStartResetBtn">
                            <button id="start" class="Btn start">START</button>
                            <button id="reset" class="Btn reset">RESET</button>
                        </div>
                    </footer>
                    `;
                }else{
                count = `<div class="count" style="margin-top: 2rem";>${this.count}</div>`;
                moveText = `<p class="moveData"><span class="num">${boxData}</span>
                    <span class="text">번이</span>
                    <span class="location">${move1}</span>
                    <span class="text">에서</span> 
                    <span class="location">${move2}</span>
                    <span class="text">로 이동하였습니다.</span></p>`;
                if(this.count === 1){
                    scrollUp = `<div class="scrollUp Btn upBtn"><i class="xi-caret-up Btn upBtn" style="font-size: 5rem";></i></div>`;
                }
                width = 80;
                height = 52;
                }
                //  hanoiC += value1.outerHTML;
                let htmlString = `
                <div id="totalFrame" class="totalFrame">
                    ${title}
                    <main id="hanoiFrame" class="hanoiFrame" style="height:${height}rem">
                        ${count}
                        <div class="hanoi">
                            <div class="suportA" style="left:${left}%"></div>
                            <div id="hanoiA" class="hanoiA">${hanoiA}
                            <span class="A">A</span>
                            </div>
                        </div>
                        <div class="hanoi">
                            <div class="suportB" style="left:${left}%"></div>
                            <div id="hanoiB" class="hanoiB">${hanoiB}
                            <span class="B">B</span>
                            </div>
                            
                        </div>
                        <div class="hanoi">
                            <div class="suportC" style="left:${left}%"></div>
                            <div id="hanoiC" class="hanoiC">${hanoiC}
                            <span class="C">C</span>
                            </div>
                        </div>
                        <div style="position: fixed;">
                        ${scrollUp}
                        </div>
                    </main>
                    <div style="width: 860px; margin: auto;">
                        ${moveText}
                    </div>
                    ${btn}
                </div>
                `;
                return htmlString;
            }
            start() {
                class Stack {
                    constructor( id ) {
                        this.id = id;
                        this.storage = [];
                    }
                    pushItem(v) {
                        this.storage.push(v);
                    }
                    popItem() {
                        return this.storage.pop();
                    }
                }
                const hanoiAStack = new Stack("hanoiAStack"); //A
                const hanoiBStack = new Stack("hanoiBStack"); //B
                const hanoiCStack = new Stack("hanoiCStack"); //C
                const boxLength = document.querySelectorAll(".box");
                for(let i=boxLength.length-1; i>=0; i--){
                    hanoiAStack.pushItem(boxLength[i]);
                }
                let hanoiValue = boxLength.length; //
                const hanoi = (num,hanoiA,hanoiC,hanoiB) =>{
                    if(num === 1){
                        let v1 = hanoiA.popItem();
                        hanoiC.pushItem(v1);
                        this.count++;
                        //console.log(v1);
                        this.checkCount++;
                        let totalData1 = [
                            {checkId:hanoiA.id,data:hanoiA.storage},
                            {checkId:hanoiB.id,data:hanoiB.storage},
                            {checkId:hanoiC.id,data:hanoiC.storage}
                        ];
                        const [...moveData1] = [v1.textContent,hanoiA.id.substring(5,6),hanoiC.id.substring(5,6)];
                        this.htmlVisual("totalFrame",this.getVisual(totalData1,moveData1));
                        // console.log(`${v1.textContent}을 ${hanoiA.id}에서 ${hanoiC.id}로 이동`);
                        return;
                    }else{
                        hanoi(num-1,hanoiA,hanoiB,hanoiC);
                        let v2 = hanoiA.popItem();
                        hanoiC.pushItem(v2);
                        this.count++;
                        this.checkCount++;
                        let totalData2 = [
                            {checkId:hanoiA.id,data:hanoiA.storage},
                            {checkId:hanoiB.id,data:hanoiB.storage},
                            {checkId:hanoiC.id,data:hanoiC.storage}
                        ];
                        const [...moveData2] = [v2.textContent,hanoiA.id.substring(5,6),hanoiC.id.substring(5,6)];
                        this.htmlVisual("totalFrame",this.getVisual(totalData2,moveData2));
                        // console.log(`${v2}을 ${hanoiA.id}에서 ${hanoiC.id}로 이동`);
                        hanoi(num-1,hanoiB,hanoiC,hanoiA);
                    }
                }
                hanoi(hanoiValue,hanoiAStack,hanoiCStack,hanoiBStack);

            }
            reset(dom) {
            this.count = 0;
            document.getElementById("totalFrame").innerHTML = '';
            this.htmlVisual("totalFrame",this.getVisual());
            }
            popUp(){
                document.getElementById("hanoiFrame").innerHTML += `<div class="popUp";>RESET 버튼을 눌러주세요</div>`;
                document.body.classList.add("quake");
                setTimeout(()=>{
                    document.body.classList.remove("quake");
                    const element = document.querySelector(".popUp");
                    element.remove();
                },1000);
                console.log("RESET 버튼을 눌러주세요");
            }
            eventHandler() {
                const [click,input,startInput,totalInput] = ["click","input","startInput","totalInput"];
                const totalBtn = document.querySelectorAll(".Btn");

                document.getElementById(totalInput).addEventListener(click,(e)=>{
                    switch(e.target.dataset.value){
                        case "minus":{
                            this.inputCount--;
                            this.inputCount = this.inputCount <= 0? 1:this.inputCount;
                            document.getElementById(startInput).value = this.inputCount;
                            this.hanoiAVisual("hanoiA",this.inputCount);
                            break;
                        }
                        case "plus":{
                            this.inputCount++;
                            this.inputCount = this.inputCount > 6? 1:this.inputCount;
                            document.getElementById(startInput).value = this.inputCount;
                            this.hanoiAVisual("hanoiA",this.inputCount);
                            break;
                        }
                    }
                });

                totalBtn.forEach(v=>{
                    v.addEventListener(click,(e)=>{
                        const upBtn = e.target.className.match(/\w+$/g)[0];
                        switch(upBtn){
                            case upBtn: 
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth' // 부드럽게 스클롤
                                });
                            break;
                        };
                        switch(e.target.id){
                            case "start": {
                                if(this.startCheck){
                                    this.start(); 
                                    this.startCheck = false;
                                    window.scrollTo({
                                        top: document.body.scrollHeight,
                                        behavior: 'smooth' // 부드럽게 스크롤
                                    });
                                    // const totalInput = document.querySelectorAll(".startInput");
                                    // totalInput.forEach(v=>{ //입력 못하게 하는 란
                                    //     v.readOnly = true;
                                    // });
                                // }else{
                                //     this.popupVisual();
                                // 
                                }else{
                                    this.popUp();
                                }
                                break;
                            }
                            case "reset": { 
                                this.reset(); 
                                this.inputCount = 1;
                                this.startCheck = true;
                                break;   
                            }
                        }
                    });
                });
                document.getElementById(startInput).addEventListener(input,(e)=>{
                    if(e.target.value < 7 && e.target.value >= 1){
                        this.hanoiAVisual("hanoiA",e.target.value);
                    }else{
                        e.target.value = document.getElementById('startInput').value = 1;
                        this.hanoiAVisual("hanoiA",e.target.value);
                    }
                });
            }
            hanoiAVisual(dom,value) { // 블록 화면 출력
                let rgbData = ''
                document.getElementById(dom).innerHTML = ''
                for(let i=0; i<value; i++){ // 단계별 색갈 설정
                    i===0 && (rgbData = `255,165,0`);
                    i===1 && (rgbData = `243,201,177`);
                    i===2 && (rgbData = `249,49,49`);
                    i===3 && (rgbData = `0,139,139`);
                    i===4 && (rgbData = `221,160,221`);
                    i===5 && (rgbData = `160,218,193`);
                    document.getElementById(dom).innerHTML += `
                    <div id=box_${i} class="box"
                    style="
                    width: ${(i+2)*10}%;
                    height: 5rem;
                    border-radius: 1rem;
                    line-height: 5rem;
                    font-size: 2rem;
                    color: white;
                    text-shadow: 0 0 10px black;
                    z-index:10;
                    background-color: rgb(${rgbData});
                    "
                    >${i+1}</div><span class="A">A</span>
                    `;
                    //a.remove();
                }
            }
            htmlVisual(dom,output) {
                document.getElementById(dom).innerHTML += output;
                this.eventHandler();
            }
            run() {
                this.htmlVisual("totalFrame",this.getVisual());
            }
        }

        const hanoiProject = new Hanoi("hanoiProject");
        hanoiProject.run(); 
}
