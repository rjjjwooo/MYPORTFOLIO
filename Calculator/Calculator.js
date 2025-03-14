class Calculator {
	constructor( id ) {
			this.id = id;
		this.display = '';
		this.html = `
		<div class="totalFrame">
		<div class="mainBox">
				<div class="${this.id}resultArea">0</div>
			<button class="view" id="view">graph</button>
			<div class="range">
				<div class="rangeFrame">
					<input type="range" min="1" max="5" value="2">
					<p><span>F</span><span>4</span><span>3</span><span>2</span><span>0</span></p>
				</div>
			</div>
			<button class="CaBtn" data-value="C">C</button>
			<button class="CaBtn" data-value="(">(</button>
			<button class="CaBtn" data-value=")">)</button>
			<button class="CaBtn" data-value=">"><i class="xi-caret-up xi-rotate-90" data-value=">"></i></button>
			<button class="CaBtn" data-value="7">7</button>
			<button class="CaBtn" data-value="8">8</button>
			<button class="CaBtn" data-value="9">9</button>
			<button class="divide CaBtn" data-value="/">&divide</button>
			<button class="CaBtn" data-value="4">4</button>
			<button class="CaBtn" data-value="5">5</button>
			<button class="CaBtn" data-value="6">6</button>
			<button class="CaBtn" data-value="*"><i class="xi-close" data-value="*"></i></button>
			<button class="CaBtn" data-value="1">1</button>
			<button class="CaBtn" data-value="2">2</button>
			<button class="CaBtn" data-value="3">3</button>
			<button class="CaBtn" data-value="-"><i class="xi-minus" data-value="-"></i></button>
			<button class="CaBtn" data-value="0">0</button>
			<button class="CaBtn" data-value=".">.</button>
			<button class="print CaBtn" data-value="=">=</button>
			<button class="CaBtn" data-value="+"><i class="xi-plus" data-value="+"></i></button>
		</div>
		<div class="${this.id}totalFunctionFrame">
			<div class="equationFrame">
				<div class="functionFrame">
					<div class="oneFunction">
										<h3>y = ax <i class="xi-plus"></i> b </h3>
										<span>a:</span><input id="a1" type="text" placeholder="a"> 
						<span>b:</span><input id="b1" type="text" placeholder="b"> 
						<button id="oneFunction" class="showBtn">Show</button>
								</div>
		<div class="twoFunction">
						<h3>y = ax<sup>2</sup> <i class="xi-plus"></i> bx <i class="xi-plus"></i> c </h3>
							<span>a:</span><input id="a2" type="text" placeholder="a"> 
			<span>b:</span><input id="b2" type="text" placeholder="b"> 
			<span>c:</span><input id="c2" type="text" placeholder="c"> 
			<button id="twoFunction" class="showBtn">Show</button>
					</div>
					<div class="treeFunction">
							<h3>y = ax<sup>3</sup> <i class="xi-plus"></i> bx<sup>2</sup> <i class="xi-plus"></i> cx <i class="xi-plus"></i> d </h3>
							<span>a:</span><input id="a3" type="text" placeholder="a"> 
			<span>b:</span><input id="b3" type="text" placeholder="b"> 
			<span>c:</span><input id="c3" type="text" placeholder="c"> 
			<span>d:</span><input id="d3" type="text" placeholder="d"> 
			<button id="threeFunction" class="showBtn">Show</button>
					</div>
					<div class="circleFunction">
							<h3>(x <i class="xi-minus"></i> a)<sup>2</sup> <i class="xi-plus"></i>  (y <i class="xi-minus"></i> b) 
			<sup>2</sup> <i class="xi-drag-handle"></i> r<sup>2</sup></h3>
							<span>a:</span><input id="a4" type="text" placeholder="a"> 
			<span>b:</span><input id="b4" type="text" placeholder="b"> 
			<span>r:</span><input id="r4" type="text" placeholder="r"> 
			<button id="circleFunction" class="showBtn">Show</button>
					</div>
					</div>
		<div class="canvasFrame">
			<canvas id="${this.id}canvas" class="canvas" width="500" height="500">Not Canvas</canvas>
			<button id="clearbtn" class="clearbtn"><span id="clearbtn">Clear</span></button>
					</div>
		<div class="rotateFrame">
			<div style="width: 200px; height: 66.67px; text-align: center;">
			<button id="up" class="RZbtn"><i class="xi-caret-up" id="up"></i></button>		
		</div>
			<div class="midFrame" style="width: 200px; height: 66.67px;">
			<button id="left" class="RZbtn"><i class="xi-caret-up xi-rotate-270" id="left"></i></button>
			<button id="right" class="RZbtn" style="float: right;"><i class="xi-caret-up xi-rotate-90" id="right"></i></button>
		</div>
			<div class="downFrame" style="width: 200px; height: 66.67px; text-align: center;">
			<button id="down" class="RZbtn"><i class="xi-caret-up xi-rotate-180" id="down"></i></button>
		</div>
		<div class="zoomFrame">
						<button id="zoomIn" class="RZbtn"><i id="zoomIn" class="xi-plus"></i></button>
						<button id="closeIn" class="RZbtn" style="float:right;"><i id="closeIn" class="xi-minus"></i></button>
					</div>
		</div>
		</div>
		</div>
		</div>
		`;
		this.css = 
		`<style>
			.mainBox {
				width: 378px; height: 630px; padding: 27px;
				border: 1px solid gray; border-radius: 10px;
				background-color: #343535;
			}
			.${this.id}resultArea {
				width: 369px; height: 72px;
				background-color: lightskyblue;
				color: white; font-size: 40px; line-height: 80px;
				text-align: right; border-radius: 10px;
				margin-bottom: 15px;
				overflow: hidden;
			}
	.mainBox button[class*="CaBtn"] {
				width: 90px; height: 90px; float: left;
				font-size: 30px; border-radius: 10px; margin: 1.8px;
				background-color: #dbdbdb; transition: 0.5s;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
			}
			button[class*="CaBtn"]:hover {
		transform: scale(1.1);
			}
			.divide { font-size: 40px;}
				button[class*="print"] {
				background-color: lightskyblue;
		   }
	.range {
				/*border: 1px solid red;*/
				 width: 369px;
				height: 45px;
				margin-bottom: 10px;
			}
			.rangeFrame {
				width: 150px;
				height: 45px;
				float: right;
				/*border: 1px solid red;*/
			}
			input {
				width: 150px;
				accent-color: skyblue;
			}
			p {
				display: flex;
				justify-content: space-between;
				color: white;
			}
	   .view {/*함수 열리는 클릭 버튼*/
				width: 60px;
				height: 30px;
				font-size: 20px;
		border-radius: 10px;
		transition: 0.5s;
			}
	.view:hover {
		background-color: #f276f2;
	}
	.equationFrame { /*방정식 Frame*/
		/*border: 1px solid red;*/
		width: 1400px; 
		height: 600px;
		display: flex;
				align-items: center;
		border-radius: 10px;
		background-color: #343535;
		clear: left;
		color: white;
		padding: 20px;
		margin-top: 30px;
	}
	.${this.id}totalFunctionFrame {
		display: none;
	}
	.totalFrame { /*함수랑 계산기 다 담은 Frame*/
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center; /*가로 중앙 쓸려면 width값 필수*/
		/*align-items: center;/* 세로 중앙 먹힐려면 height값 필수*/
		padding: 10px 0; /*반응형때문에 줌 위가 안보여서 줌*/
	}
	.functionFrame { /*함수를 모두 넣은 박스*/
				width: 600px; height: 600px;
				/*border: 1px solid blue;*/
				text-align: left;
		/*transition: 0.2s;*/
			}
	input[type*="text"] {/*함수 입력하는 input들*/
				width: 40px;
				height: 30px;
				   margin: 1px;
		padding: 0 10px;
		font-size: 25px;
				   border-radius: 10px;
		background-color: lightskyblue;
		}
	.showBtn {/*함수그리는 출력 버튼*/
				   width: 80px;
				   height: 30px;
				   border-radius: 5px;
		font-size: 20px;
		margin-left: 20px;
		margin-top: 10px;
		transition: 0.5s;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	}
	div .functionFrame span {
				font-size: 25px;
		color: white;
		padding: 10px;
		margin-top: 10px;
			}
			div .functionFrame div {/*함수를 담은 모든 div*/
				margin: 20px;
			}
			.canvasFrame { /*canvas를 담는 Frame*/
				width: 500px; height: 600px;
				/* border: 1px solid red;*/
			}
	.canvas {/*실제 캔버스*/
				border: 1px solid black;
				margin-top: 50px;
		background-color: #dbdbdb;
			}
	h3 {
		font-size: 33px;	
		font-family: "Dancing Script", cursive;
		  font-optical-sizing: auto;
		  font-weight: <weight>;
		font-style: normal;
		color: white;
		padding: 5px;
	}
	sup {
		font-size: 20px;
		font-family: "Dancing Script", cursive;
				   font-optical-sizing: auto;
				font-weight: <weight>;
				font-style: normal;
	}
	.equationFrame i {
		font-size: 10px;
	}
	.clearbtn {/*클리어 버튼*/
		width: 80px;
		background-color: #f276f2;
		border-radius: 0 0 10px 10px;
		padding: 5px;
		font-size: 20px;
		float: right;
		transform: translate(2px,-6px);
	}
	.clearbtn:hover {
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	}
	.rotateFrame {/*방향키 담은 그릇*/
		width: 200px;
		height: 200px;
		padding: 10px;
			margin: auto;
		/*border: 1px solid red;*/
	}
	.RZbtn {/*방향키 확대 버튼들*/
		width: 66.67px; 
		height: 66.67px;
		border-radius: 50px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	}
	.RZbtn i {
		font-size: 50px;
	}
	.zoomFrame {/*확대 담은 그릇*/
		width: 200px;
		height: 66.67px;
		/*border: 1px solid red;*/
		margin-top: 40px;
	}
	@media(max-width:2010px) {/*너비가 2010이 넘어가면 totalframe을 아래로 내린다.*/
		/*.totalFrame { flex-direction: column;}*/
		}
		</style>
	`;
	}
		initCalculator( targetDom ) {
			targetDom.innerHTML = this.html;
			targetDom.innerHTML += this.css;
		}
		displayData(displayitem) {
		document.querySelector('.'+this.id+'resultArea').innerHTML = displayitem; 
	}
		inputData(targetDom) {/*계산기 영역*/
			class Deck {
				constructor( id ) {
				this.id = id;
				this.storage = [];
					}
			pushItem(item) {
				this.storage.push(item);
			}
			popItem() {
				return this.storage.pop();
			}
			unshiftItem(item){
				this.storage.unshift(item);
			}
			shiftItem(){
				return this.storage.shift();
			}
			length() {
				return this.storage.length;
			}
			}
		const inputClick = new Deck('inputClick');
		let firstItem = '';
		let printItem = '';
		let pointer = '2';
		let clickPoint = '1';
		targetDom.addEventListener(
		'click',
		(clickEvent) => {	
			let e = clickEvent? clickEvent:event;//이벤트 보정코드
			if(
				e.target.dataset.value != null &&
				e.target.dataset.value != "=" &&
				e.target.dataset.value != ">" &&
				e.target.dataset.value != "C" 
			){
				inputClick.pushItem(e.target.dataset.value);
				this.display += e.target.dataset.value;
				this.displayData(this.display);//화면에 표시
				firstItem = inputClick.popItem();
				printItem += firstItem; 
				inputClick.pushItem(firstItem);
				//console.log(inputClick.storage);
			}
		if(e.target.dataset.value === "="){
			if(/[(\.]?(\d{1,5})[\.]?[)]?[+\-\*\/][\*]?[(\.]?(\d{1,5})[\.]?[)]?/.test(printItem) ){
				switch(pointer){
								case '1': {
					//console.log( "1" in pointer );
						const oneValue = eval(printItem);
						const one = /[\d]\./.test(oneValue) ? oneValue.toFixed(16):oneValue;
									this.displayData(one.toLocaleString());
									break;
								}
								case '2':{
						const twoValue = eval(printItem);
						const two =  twoValue.toLocaleString('ko-KR',{ minimumFractionDigits: 4, maximumFractionDigits: 4 });
									this.displayData(two.toLocaleString());
									break;
								}
								case '3':{
						const threeValue = eval(printItem);
									const three = threeValue.toLocaleString('ko-KR',{ minimumFractionDigits: 3, maximumFractionDigits: 3 });
									this.displayData(three.toLocaleString());
									break;
								}
								case '4':{
						const fourValue = eval(printItem);
									const four = fourValue.toLocaleString('ko-KR',{ minimumFractionDigits: 2, maximumFractionDigits: 2 });
									this.displayData(four);
										break;
								}
								case '5':{
						const fiveValue = eval(printItem);
									const five = fiveValue.toFixed(0);
									this.displayData(five.toLocaleString());
									break;
								}
						}
			}else{
				this.display = '';
				this.displayData('제대로 입력해주세요!');
			}
				this.display = '';
				printItem = '';
				inputClick.storage=[];
			}
			if(e.target.dataset.value === ">"){
				this.display = '';
				let print = ''
				inputClick.popItem();
				let length = inputClick.length();
						   for(let i=0; i<length; i++){
								this.display = inputClick.shiftItem();
					inputClick.pushItem(this.display);
					print += this.display;
						   }
								if(length === 0){//길이가 0이면 화면에 기본값으로 0출력
										print = '0';
								}
				this.displayData(print);
			}
			if(e.target.dataset.value === "C"){
				this.displayData('0');//화면 초기화
				this.display = '';
				printItem = '';
				inputClick.storage=[];
			}
			if(e.target.id === 'view'){ // canvas 보이는 곳을 보이게로 변환
				if(clickPoint === '1') {	
										document.querySelector('.'+this.id+'totalFunctionFrame').style.display = "block";
					clickPoint = '0';
				}
				else if(clickPoint === '0') {
					document.querySelector('.'+this.id+'totalFunctionFrame').style.display = "none";
					clickPoint = '1';
				}
							}
		}
		)
		targetDom.addEventListener(
		'change',
		(clickEvent)=>{
			let e = clickEvent? clickEvent:event; //이벤트 보정코드
			pointer = e.target.value;
			//console.log(pointer);
		}
		);
	}
	///////////////////////////////////////////////////canvas//////////////////////////////////////////////////////
canvasData(targetDom){
		class Canvas {
			constructor( id, pen, width, height ) {
				this.id = id;
				this.Pen = pen;
				this.width = width;
				this.height = height;
				this.scale = 10;
			}
			setting(targetDom) {
				const functionValue = {
					a1: '', b1: '', 
					a2: '', b2: '', c2: '', 
					a3: '', b3: '', c3: '', d3: '',
					a4: '', b4: '', r4: '',
					upPoint: 0, rightPorint: 0
				}
				const check = {
					one: false, two: false, three: false, circle: false
				}
				targetDom.addEventListener(
				'input',
				(clickEvent) => {
					let e = clickEvent? clickEvent:event;
					switch(e.target.id){
						case e.target.id: functionValue[e.target.id] = parseFloat(e.target.value);
					}
					console.log(functionValue);
				}
				);
				targetDom.addEventListener(
				'click',
				(clickEvent)=>{
					let e = clickEvent? clickEvent:event;
					switch(e.target.id){
						case "oneFunction": check.one = true; this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); break; //1차 함수 실행
						case "twoFunction": check.two = true; this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); break;// 2차 함수 실행
						case "threeFunction": check.three = true; this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); break;// 3차 함수 실행
						case "circleFunction": check.circle = true; this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint); break; // 원 함수 실행	
					}
					if(e.target.id === "clearbtn"){
						this.Pen.fillStyle = "black";
						check.one = false;
						check.two = false;
						check.three = false;
						check.circle = false;
						for(let key in functionValue){
							functionValue[key] = 0;
						}
						document.getElementById('a1').value = '';
						document.getElementById('a2').value = '';
						document.getElementById('a3').value = '';
						document.getElementById('a4').value = '';
						document.getElementById('b1').value = '';
						document.getElementById('b2').value = '';
						document.getElementById('b3').value = '';
						document.getElementById('b4').value = '';
						document.getElementById('c2').value = '';
						document.getElementById('c3').value = '';
						document.getElementById('d3').value = '';
						document.getElementById('r4').value = '';
						functionValue.upPoint = 0;
						functionValue.rightPoint = 0;
						this.clearBtn(); 

					}
					if(e.target.id === "zoomIn"){
						this.Pen.fillStyle = "black";
						this.scale += 10;
						console.log(this.scale);
						this.Pen.clearRect(0,0,this.width,this.height); // 초기화 시키고 
						this.cross(functionValue.upPoint,functionValue.rightPorint); //크로스 다시 그리기
						this.gradation(functionValue.upPoint,functionValue.rightPorint); // 눈금 다시 그리기
						if( check.one ){ this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); } 
						if( check.two){ this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); }
						if( check.three ){ this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); }
						if( check.circle ){ this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint); }
					}
					if(e.target.id === "closeIn"){
						this.Pen.fillStyle = "black";
						this.scale -= 10;
						if(this.scale < 20) { this.scale = 20;}
						this.Pen.clearRect(0,0,this.width,this.height); // 초기화 시키고 
						this.cross(functionValue.upPoint,functionValue.rightPorint); //크로스 다시 그리기
						this.gradation(functionValue.upPoint,functionValue.rightPorint); // 눈금 다시 그리기
						if( check.one ){ this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); } 
						if( check.two){ this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); }
						if( check.three ){ this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); }
						if( check.circle ){ this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint); }
					}
					if(e.target.id === "up"){//up 그리기
						this.Pen.fillStyle = "black";
						functionValue.upPoint += 10*(this.scale/10);
						this.Pen.clearRect(0,0,this.width,this.height); // 초기화 시키고 
						this.cross(functionValue.upPoint,functionValue.rightPorint); //크로스 다시 그리기
						this.gradation(functionValue.upPoint,functionValue.rightPorint); // 눈금 다시 그리기 
						if( check.one ){ this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); } 
						if( check.two){ this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); }
						if( check.three ){ this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); }
						if( check.circle ){ this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint); }
					}
					if(e.target.id === "down"){//down 그리기
						this.Pen.fillStyle = "black";
						functionValue.upPoint -= 10*(this.scale/10);
						this.Pen.clearRect(0,0,this.width,this.height);
						this.cross(functionValue.upPoint,functionValue.rightPorint);
						this.gradation(functionValue.upPoint,functionValue.rightPorint);
						if( check.one ){ this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); }
						if( check.two){ this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); }
						if( check.three ){ this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); }
						if( check.circle ){ this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint);}
					}
					if(e.target.id === "right"){ //right 그리기
						this.Pen.fillStyle = "black";
						functionValue.rightPorint -= 10*(this.scale/10);
						//functionValue.rightPorint -= 10;
						console.log(functionValue.rightPorint +"right!!!!!!!!!!!");
						this.Pen.clearRect(0,0,this.width,this.height);
						this.cross(functionValue.upPoint,functionValue.rightPorint);
						this.gradation(functionValue.upPoint,functionValue.rightPorint);
						if( check.one ){ this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); }
						if( check.two){ this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); }
						if( check.three ){ this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); }
						if( check.circle ){ this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint);}
					}
					if(e.target.id === "left"){ //left 그리기
						this.Pen.fillStyle = "black";
						functionValue.rightPorint += 10*(this.scale/10);
						//functionValue.rightPorint += 10;
						this.Pen.clearRect(0,0,this.width,this.height);
						this.cross(functionValue.upPoint,functionValue.rightPorint);
						this.gradation(functionValue.upPoint,functionValue.rightPorint);
						if( check.one ){ this.oneFunctionCheak(functionValue.a1,functionValue.b1,functionValue.rightPorint,functionValue.upPoint); }
						if( check.two){ this.twoFunctionCheak(functionValue.a2,functionValue.b2,functionValue.c2,functionValue.rightPorint,functionValue.upPoint); }
						if( check.three ){ this.threeFunctionCheak(functionValue.a3,functionValue.b3,functionValue.c3,functionValue.d3,functionValue.rightPorint,functionValue.upPoint); }
						if( check.circle ){ this.circleFunctionCheak(functionValue.a4,functionValue.b4,functionValue.r4,functionValue.rightPorint,functionValue.upPoint);}
					}

				}
				);
				const cleargo = () =>{
					this.Pen.clearRect(0,0,this.width,this.height);
					this.cross(0,0);
					//this.gradation(0);
				}

			}
			cross(item1, item2) {
				const widthHalf = Number(this.width) / 2;
				const heightHalf = Number(this.height) / 2;
				for(let i=0; i<=this.width; i++){
								this.Pen.fillRect(i,widthHalf+item1,1,1);
							}
							for(let j=0; j<=this.height; j++){
								this.Pen.fillRect(heightHalf + item2,j,1,1);
							}
			}
			gradation(item1,item2) {
				const widthHalf = Number(this.width) / 2;
				const heightHalf = Number(this.height) / 2;
				for(let i=0; i<=(Number(this.width)/this.scale); i++){
				for(let j=-5; j<=5; j++){
					this.Pen.fillRect( (widthHalf + i * this.scale)+item2, heightHalf + item1 - j,1,1 ); //x축 right
					//console.log(`this.Pen.fillRect( ${widthHalf} + ${i} * ${this.scale}, ${heightHalf} + ${item1} - ${j},1,1 )`);
					this.Pen.fillRect( (widthHalf - i * this.scale) +item2, heightHalf + item1 - j,1,1 );
					this.Pen.fillRect( widthHalf + j + item2, (heightHalf - i * this.scale) + item1,1,1 );
					this.Pen.fillRect( widthHalf + j + item2, (heightHalf + i * this.scale) + item1,1,1 );
					}
				}
			}
			drawing(xL,yL,item1,item2) {
				const widthHalf = Number(this.width) / 2;
				const heightHalf = Number(this.height) / 2;
				this.Pen.fillRect( widthHalf + item1 + xL*this.scale, heightHalf + item2 - yL*this.scale, 2,2);
			}
			oneFunctionCheak(a,b,item1,item2) { //1차 함수
				const widthHalf = Number(this.width) / 2;
				this.Pen.fillStyle = "red";
					for(let x=-widthHalf; x<=widthHalf; x=x+Number(1/this.scale)) { 
									const y = a*x + b;
									this.drawing(x,y,item1,item2);
				}                   
			}
			twoFunctionCheak(a,b,c,item1,item2) { //2차 함수
				const widthHalf = Number(this.width) / 2;
				this.Pen.fillStyle = "blue";
				for(let x=-widthHalf; x<=widthHalf; x=x+Number(1/this.scale)) {
									const y = (a*x**2) + b*x + c;
									this.drawing(x,y,item1,item2);
							}
			}
			threeFunctionCheak(a,b,c,d,item1,item2) { // 3차 함수
				const widthHalf = Number(this.width) / 2;
				this.Pen.fillStyle = "green";
				for(let x=-widthHalf; x<=widthHalf; x=x+Number(1/this.scale)) {
					const y = (a*x**3) + (b*x**2) + c*x + d;
					this.drawing(x,y,item1,item2);
				}
			}
			circleFunctionCheak(a,b,r,item1,item2) { // 4차 함수
				this.Pen.fillStyle = "black";
				for(let degree=0; degree<=360; degree=degree+(1/this.scale)) {
					const radian = ( degree * Math.PI ) / 180;
					const cos = (Math.cos( radian ) * r) + Number(a); 
					const sin = (Math.sin( radian ) * r) + Number(b);
					this.drawing(cos, sin,item1,item2);
				}
			}
			clearBtn() {
				this.Pen.clearRect(0, 0, this.width, this.height);
				this.scale = 10;//scale 초기화
				this.cross(0,0);// 크로스 초기화
				this.gradation(0,0);// 눈금 초기화
			}				
			control(targetDom) {
				this.setting(targetDom);
				this.cross(0,0);
				this.gradation(0,0);
			}

		}
	const canvas = new Canvas('canvas',document.getElementById(''+this.id+'canvas').getContext('2d'),document.getElementById(''+this.id+'canvas').getAttribute('width'),
	document.getElementById(''+this.id+'canvas').getAttribute('height'));
	canvas.control(targetDom);				
}
control( targetDom ) {
		this.initCalculator(targetDom);
		this.inputData(targetDom);
		this.displayData(0);
		this.canvasData(targetDom);
		}	
}
class Newpro {
	constructor(id) {
			this.id = id;
	}
	newCreate( targetDom ){
			const Area = {};
			const div = {};
			let newValue = 1;

			targetDom.addEventListener(
			'click',
			()=>{
				const key = `calculator${newValue}`;
				Area[key] = new Calculator(key);
				div[`div${newValue}`] = document.createElement('div');
				document.body.appendChild(div[`div${newValue}`]);
				div[`div${newValue}`].id = `calculator${newValue}`;	
				Area[key].control(document.getElementById(`calculator${newValue}`));
				console.log(Area);
				newValue++;
			}	
			);
	}
	control( targetDom ){
		this.newCreate( targetDom );
	}
	}
	const CalculatorArea = new Newpro('CalculatorArea');
	CalculatorArea.control( document.getElementById('newBtn'));
	const calculator = new Calculator('calculator');
	calculator.control( document.getElementById('calculator'));
	//const test = new Calculator('test');
	//test.control( document.getElementById('test'));:w
	