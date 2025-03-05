window.onload = () => {
    let onPlayer = true;
    class MusicPlayer {
        constructor(id) {
        this.id = id;
        this.dbData = null;
        this.playData = [];
        // this.equalizer = new (window.AudioContext || window.webkitAudioContext )();
    }
    getDB(dom) {
            axios.get("/jsonTemplate/music.json")
            .then(res=>{
                this.dbData = res.data;
                this.setting(dom,res.data);
                // this.getFavorites();
            })
            .catch(err=>{console.log("Music Data Get Error")});
    }
    setting(targetDom,dBdata) {
        const canvas = document.querySelector(".canvas");
        const Pen = canvas.getContext("2d");
        let equalizer;
        let analyser;
        let source;
        let bufferLength;
        let dataArray;
        let equalizerCheck = true;
        let equalizerFirstCheck = true;

        const musicArea = {
            playaudio: document.getElementById('start'), //기본 값으로 넣어준 것
            duration: document.getElementById('start').duration,//전체 길이
            currentTime: document.getElementById('start').currentTime,//실시간 타임
            repeat: true, ended: true, endedValue: 0, mouseValue: true, repeatV: true,
            shuffle:true,jsonData: '', heart: false, lis:[], totalMusicArray:[]
        }
        const musicVV = [];
        let oneHeartColor = null;
        const musicArray = dBdata;
        musicArray.forEach(
        (v,i)=>{
        if(i===0){
            // console.log(v);
            // const LyricsDom = `<p id="plyrics" class="plyrics">${v['Lyrics']}</p>`; 
            let parnassusLyrics = '';
            const parnassus = v['Lyrics'].split("<br>").map(v=>v.trim());
            for(let i=0; i<parnassus.length; i=i+3){
                if(parnassus[i] === undefined || parnassus[i+1] === undefined || parnassus[i+2] === undefined) continue; 
                parnassusLyrics += `<p class="interval">${parnassus[i]}<br>${parnassus[i+1]}<br>${parnassus[i+2]}</p>`;
            }
            document.querySelector('.LyricsTitle').innerHTML = `<div class="LyricsImage"><img src="${v.img}" alt="no image"></div>
                    <p class="LyMiniT font" style="margin-left: 1rem">${v.title}<span id="Lysub" class="Mtitle"><br>${v.name}</span></p>
                    <i id="heartCheck사랑이-죄야" class="xi-heart heartCheck사랑이-죄야 nextBackListlyricsHeart" style="color: rgb(230, 216, 216);">
                    </i>
                    `;
            document.getElementById('lyrics').innerHTML = parnassusLyrics;
            document.getElementById('LyricsZoom').innerHTML = parnassusLyrics;
        }
            musicVV.push(v);
        });
        // console.log(musicVV);
    
            
        class Deck {
            constructor(id) {
                this.id = id;
                this.storage = [];
            }
            pushItem( item ) {
                this.storage.push( item );
            }
            popItem() {
                return this.storage.pop();
            }
            unshiftItem( item ) {
                this.storage.unshift( item );
            }
            shiftItem() {
                return this.storage.shift();
            }
        }
        class DoubleLinkedList {
            constructor( id, value ) {
                this.id = id;
                this._priviusPointer = null;
                this._nextPointer = null;
                this.value = value;
            }
            set priviusPointer( priviusItem ) {
                this._priviusPointer = priviusItem;
            }
            get priviusPointer() {
                return this._priviusPointer;
            }
            set nextPointer( nextItem ) {
                this._nextPointer = nextItem;
            }
            get nextPointer() {
                return this._nextPointer = nextItem;
            }
        }
    
        const Dmusic = new Deck('Dmusic');
        const musicValue = musicVV;
        let musicList = [];
        musicValue.forEach( 
        (v,i)=>{
            musicList[i] = new DoubleLinkedList(`Dmusic${i+1}`,v);    
        }
        );
        const musicLength = musicList.length;  //길이 8 
        for(let i=0; i<musicLength; i++){ // 다 연결 해주었다.

                musicList[(i-1 + musicLength)%musicLength].nextPointer = musicList[i];
                musicList[(i+1 + musicLength)%musicLength].priviusPointer = musicList[i];
        }
        // console.log(musicList);
        musicList.forEach( //DoubleLinkedList 한걸 Deck에 넣어주었다.
        (v,i)=>{
            Dmusic.pushItem(v);
            let data = v.value.title.match(/[^()]+/g)[0].trim();
            data = data.replace(/\s/g,"-");
            data = data === '18번'? "TOIL":data;
            data = data === '12월의-기적'? "엑소기적":data;
            this.playData.push(data);
            // console.log(data);
            document.getElementById('bigListFrame').innerHTML += `
            <nav class="smallFrame smallTitle ${data}" id="${v.value.title+i}">
                <img id="${v.value.title+i}" class="songListFrame" src="${v.value.img}">
                <h3 id="${v.value.title+i}" class="totalListTitle font ${data}">${v.value.title}<span id="${v.value.title+i}" class="smallTitle"><br>
            ${v.value.name}</span></h3><i id="heartCheck${data}" class="xi-heart heartCheck heartCheck${data} nextBackListlyricsHeart ${v.value.id} listHeart"></i></nav>`;
        }
        );
        musicArea.totalMusicArray = musicArea.storage;
        targetDom.addEventListener(
        'click',
        (Click)=>{
            let e = Click? Click:event;
            
            if(e.target.classList[4]){
                // console.log(e.target.classList[4]);
                this.listHeart(e.target.classList[4]);
            }
                
            
            //console.log(e.target.id);
            switch(e.target.id) {
                case 'Next': {
                    nextgo(document.getElementById('imgFrame'),
                    document.getElementById('musicTitle'),document.getElementById('musicListFrame'),
                    document.getElementById('lyrics'),document.querySelector('.LyricsTitle'),
                    document.getElementById('LyricsZoom')); 
                    document.getElementById('Stop').style.display = "block";
                    document.getElementById('Play').style.display = "none";
                    break;
                }
                case 'Back': 
                    // console.log("ddd")
                    backgo(document.getElementById('imgFrame'),
                    document.getElementById('musicTitle'),document.getElementById('musicListFrame'),
                    document.getElementById('lyrics'),document.querySelector('.LyricsTitle'),
                    document.getElementById('LyricsZoom')); 
                    document.getElementById('Stop').style.display = "block";
                    document.getElementById('Play').style.display = "none";
                    break;
                case 'Play': { 
                    nplay(); 
                    document.getElementById(e.target.id).style.display = "none"; 
                    document.getElementById('Stop').style.display = "block";
                    break;
                }
                case 'Stop': {
                    nstop();
                    document.getElementById(e.target.id).style.display = "none"; 
                    document.getElementById('Play').style.display = "block";
                    break;
                }
                case 'Repeat': {
                    if(musicArea.repeat){
                        document.getElementById(e.target.id).style.color = "#712e3e";
                        musicArea.ended = true;
                        // totalReplay();
                        musicArea.repeat = false;
                    }else{
                        document.getElementById(e.target.id).style.color = "white";
                        document.getElementById(e.target.id).style.display = "none";
                        document.getElementById('Repeatone').style.display = "block";
                        musicArea.repeatV = false;
                        oneReplay();
                        musicArea.repeat = true;
                    }
                    break;
                }
                case 'Repeatone': {
                    document.getElementById(e.target.id).style.display = "none";
                    document.getElementById('Repeat').style.display = "block";
                    musicArea.repeatV = true;
                    musicArea.playaudio.loop = false;
                    musicArea.ended = true;
                    break;
                }
                // case 'Volume': {
                //     if(musicArea.mouseValue){
                //         document.getElementById('volumeRange').style.display = "block";
                //         musicArea.mouseValue = false;
                //     }else{
                //         document.getElementById('volumeRange').style.display = "none";
                //         musicArea.mouseValue = true;
                //     }
                //     break;
                // }
                case 'shuffle': {
                    if(musicArea.shuffle){
                        shuffle(Dmusic.storage);
                        document.getElementById('shuffle').style = "color: #712e3e;";
                        musicArea.shuffle = false;
                        console.log(Dmusic.storage);
                    }else{
                        document.getElementById('shuffle').style = "color: white;";
                        Dmusic.storage = musicArea.totalMusicArray;
                        console.log(Dmusic.storage);
                        musicArea.lis = [];
                        musicArea.shuffle = true;
                    }
                    break;
                }
                case 'musicList': {
                        document.getElementById('totalMusicList').style = 
                        "height: 100%; transform: translate(0,-100%)";
                        document.getElementById('LyricsZoomIn').style = 
                        "height: 0; transform: translate(0,0);";
                        document.getElementById('FavoritesFrame').style.display = "none"; 
                        document.getElementById('bigListFrame').style.display = 'block';
                    //  document.getElementById('totalMusicList').style.display = "block";
                        break;
                }
                case 'down': {
                        document.getElementById('totalMusicList').style = 
                        "height: 0; transform: translate(0,0rem);";
                        // document.getElementById('FavoritesFrame').style.display = 
                        // "height: 0; transform: translate(0,0);";
                        document.getElementById('FavoritesFrame').style.display = "none";
                        break;
                }
                case 'lyricsBtn': {
                        document.getElementById('LyricsZoomIn').style = 
                        "height: 100%; transform: translate(0,-100%)";
                        
                        break;
                }
                case 'LyricsDown': {
                        document.getElementById('LyricsZoomIn').style = 
                        "height: 0; transform: translate(0,0);";
                        break;
                }
                case 'heart': {
                    if(document.getElementById('heart').classList.contains('red')){
                        Dmusic.storage[0].value.heart = 'false';
                        // console.log(Dmusic.storage);
                    }else{
                        Dmusic.storage[0].value.heart = 'true';
                    }
                    if(e.target.classList.contains('red')){
                        e.target.classList.remove('red');
                    }else{
                        e.target.classList.add('red');
                    }
                        this.getFavorites(); 
                        break;
                }
                case 'cart': {
                    document.getElementById('FavoritesFrame').style.display = "block";
                    document.getElementById('bigListFrame').style.display = 'none';
                    // "height: 100%; transform: translate(0,-53rem);";
                    document.getElementById('FavoritesDown').style.background = '#ffcad4';
                    document.getElementById('cart').style.background = '#ad485b';
                    break;
                }
                case 'FavoritesDown': {
                    document.getElementById('FavoritesFrame').style.display = "none"; 
                    // "height: 0; transform: translate(0,0);";
                    document.getElementById('bigListFrame').style.display = 'block';
                    document.getElementById('FavoritesDown').style.background = '#ad485b';
                    document.getElementById('cart').style.background = '#ffcad4';
                    break;
                }
            }
        }
        );


        

        
        //이퀄라이저
        // const equalizer = new (window.AudioContext || window.webkitAudioContext )();
        // const analyser = equalizer.createAnalyser();
        // const source = equalizer.createMediaElementSource(audio);
        // console.log(analyser);
        // console.log(source);


        const shuffle = (v=[])=>{ //랜덤 재생
            let value = v.map(v=>v);
        if(value.length !== 0){
                for(let i=0; i<Math.floor(Math.random() * value.length+1);i++){
                    value.push(value.shift());
                }
                musicArea.lis.push(value.shift());
                shuffle(value);
        }else{
            musicArea.totalMusicArray = Dmusic.storage.map(v=>v);
            Dmusic.storage = musicArea.lis;
            //console.log(Dmusic.storage);
        }
        }
        document.getElementById('FavoritesSubFrame').addEventListener('click',(e)=>{ //즐겨찾기 노래 플레이
            this.listHeart(e.target.classList[3]);
            if(e.target.id){
                listMusic(e.target.id,document.getElementById('imgFrame'),
                document.getElementById('musicTitle'),document.getElementById('musicListFrame'),
                document.getElementById('lyrics'),document.querySelector('.LyricsTitle'),
                document.getElementById('LyricsZoom'));
                document.getElementById('Stop').style.display = "block";
                document.getElementById('Play').style.display = "none";
                document.getElementById('FavoritesFrame').style.display = 'none';
                document.getElementById("totalMusicList").style = "height: 0; transform: translate(0,0)";
            }
        })

        document.getElementById('bigListFrame').addEventListener(
        'click',
        (e)=>{
            if(!(/^heartCheck/.test(e.target.id))){
                switch(e.target.id){
                    case e.target.id: { 
                        //console.log(e.target.id);
                        // console.log(musicArea[e.target.id]);
                        // musicArea[e.target.id] = e.target.id; //console.log(musicArea); 
                        listMusic(e.target.id,document.getElementById('imgFrame'),
                        document.getElementById('musicTitle'),document.getElementById('musicListFrame'),
                        document.getElementById('lyrics'),document.querySelector('.LyricsTitle'),
                        document.getElementById('LyricsZoom'));
                        document.getElementById('Stop').style.display = "block";
                        document.getElementById('Play').style.display = "none";
                        document.getElementById('totalMusicList').style = 
                        "height: 0; transform: translate(0,0rem);";
                        break;
                    }
                }
            }
        }
        );
        targetDom.addEventListener(
        'input',
        (Click)=>{
            let e = Click? Click:event;
            switch(e.target.id){
            case "musicRange": rangego(e.target.value); ntime(); break;
            // case "volumeRange": volumeRange(e.target.value); break;
            }
        }
        );
        /*
        const musicArea = {
            playaudio: document.getElementById('start'), //기본 값으로 넣어준 것
            duration: document.getElementById('start').duration,//전체 길이
            currentTime: document.getElementById('start').currentTime,//실시간 타임
            repeat: true, ended: true, endedValue: 0, mouseValue: true, repeatV: true,
            jsonData: ''
        }*/
       
       
        const listMusic = (...id) =>{// 리스트 목록에서 화면으로 추가 
            const [ii,Limg,Ltitle,Laudio,lyrics,lyricsTitleImage,lyricsSub] = [...id];
            const totalListTitle = document.querySelectorAll(".totalListTitle");
            // totalListTitle.forEach(v=>v.style.backgroundColor = 'transparent');
            // console.log(ii.match(/\d+$/g));
            let i,name;
            try {
                i = Number(ii.match(/\d+$/g)[0]); // 숫자 예? 고백0
               
            }catch{
                // console.log('하트는 리스트로 가지 않습니다.!');
            }
            
            name = ii.replace(/\d+$/,''); // 고백
            const safeId = CSS.escape(ii);
            // document.querySelector(`h3#${safeId}`).style.background=`${'#494949'}`;
            const next = musicList[i];
            // console.log(next);
            //const next = Dmusic.popItem()._nextPointer;
            // console.log(next);
            //console.log(id);
            // console.log(next);
            document.querySelector(".BackFrame").innerHTML = `<img id="Back" src=${next._priviusPointer.value.img} alt="no Img">`;
            document.querySelector(".NextFrame").innerHTML = `<img id="Next" src=${next._nextPointer.value.img} alt="no Img">`;
            // document.getElementById('volumeRange').style.display = "none"
            
            Limg.innerHTML = `
            <div class="playStropFrame">
                <i id="Play" class="xi-play"></i>
                <i id="Stop" class="xi-pause"></i>
            </div>
            <img src="${next.value.img}">`;
            let parnassusLyrics = '';
            const parnassus = next.value.Lyrics.split("<br>").map(v=>v.trim());
            for(let i=0; i<parnassus.length; i=i+3){
                if(parnassus[i] === undefined || parnassus[i+1] === undefined || parnassus[i+2] === undefined) continue; 
                parnassusLyrics += `<p class="interval">${parnassus[i]}<br>${parnassus[i+1]}<br>${parnassus[i+2]}</p>`;
            }
            // console.log(this.dBdata);
            let check = next.value.title.match(/[^()]+/g)[0].trim().replace(/\s+/g,"-");
            check = check === '18번'? 'TOIL':check;
            check = check === '12월의-기적'? '엑소기적':check;

            Ltitle.innerHTML = `<p>${next.value.title}<br><span class="Mtitle">${next.value.name}<span></p>`;
            Laudio.innerHTML = `<audio id="start" src="${next.value.audio}"></audio>`;
            lyrics.innerHTML = `<p id="plyrics">${next.value.Lyrics}</p>`;
            lyricsTitleImage.innerHTML = `<div class="LyricsImage"><img src="${next.value.img}" alt="no image"></div>
                    <p class="LyMiniT font" style="margin-left: 1rem">${next.value.title}<span id="Lysub" class="Mtitle"><br>${next.value.name}</span></p>
                    <i id="heartCheck${check}" class="xi-heart heartCheck${check} nextBackListlyricsHeart"></i>
                    `;
            this.getFavorites();
            lyricsSub.innerHTML = `<div id="plyrics">${parnassusLyrics}</div>`;
            musicArea.playaudio = document.getElementById('start');
            // onPlayer = true; // 반복 재생 오류 방지
            equalizerCheck = true;
            nplay();
            // equalizerStart(musicArea.playaudio);
            // if(musicArea.ended) totalReplay(); //다음곡 눌러도 켜져있니? 그럼 반복재생시켜
            for(let iter=0; iter<musicLength; iter++){
                if( name === Dmusic.storage[0].value.title ){
                    if(Dmusic.storage[0].value.heart === 'true'){ // 클릭했을 때 하트 눌러져있는지 여부 확인
                        document.getElementById('heart').classList.add('red');
                    }else{
                        document.getElementById('heart').classList.remove('red');
                    }
                    continue;
                }else{
                    Dmusic.pushItem(Dmusic.shiftItem());
                }
            }
            // console.log(Dmusic.storage);
        }
        const nextgo = (...NextItem)=>{ // 다음 사진 및 오디오 재생
            const [nimg,ntitle,naudio,lyrics,lyricsTitleImage,lyricsSub] = [...NextItem];
            const next = Dmusic.storage[1].value;
            //console.log(Dmusic.storage[1].value.heart);
            if(Dmusic.storage[1].value.heart === 'true'){
                document.getElementById('heart').classList.add('red');
            }else{
                document.getElementById('heart').classList.remove('red');
            }
            document.getElementById('heart').addEventListener(
            'click',
            ()=>{
                if(document.getElementById('heart').classList.contains('red')){
                    Dmusic.storage[0].value.heart = 'false';
                }else{
                    Dmusic.storage[0].value.heart = 'true';
                }
            }
            );
            document.querySelector(".BackFrame").innerHTML = `<img id="Back" src=${Dmusic.storage[1]._priviusPointer.value.img} alt="no Img">`; //전 곡 이미지 미리보기
            document.querySelector(".NextFrame").innerHTML = `<img id="Next" src=${Dmusic.storage[1]._nextPointer.value.img} alt="no Img">`; // 다음 곡 이미지 미리보기
            // document.getElementById('volumeRange').style.display = "none"
            nimg.innerHTML = `
            <div class="playStropFrame">
                <i id="Play" class="xi-play"></i>
                <i id="Stop" class="xi-pause"></i>
            </div>
            <img src="${next.img}" alt="no Img">`;
            let check = next.title.match(/[^()]+/g)[0].trim().replace(/\s+/g,"-");
            check = check === '18번'? 'TOIL':check;
            check = check === '12월의-기적'? '엑소기적':check;
            let parnassusLyrics = '';
            const parnassus = next.Lyrics.split("<br>").map(v=>v.trim());
            for(let i=0; i<parnassus.length; i=i+3){
                if(parnassus[i] === undefined || parnassus[i+1] === undefined || parnassus[i+2] === undefined) continue; 
                parnassusLyrics += `<p class="interval">${parnassus[i]}<br>${parnassus[i+1]}<br>${parnassus[i+2]}</p>`;
            }
            ntitle.innerHTML = `<p>${next.title}<br><span class="Mtitle">${next.name}<span></p>`;
            naudio.innerHTML = `<audio id="start" src="${next.audio}"></audio>`;
            lyrics.innerHTML = `<p id="plyrics">${parnassusLyrics}</p>`;
            lyricsTitleImage.innerHTML = `<div class="LyricsImage"><img src="${next.img}" alt="no image"></div>
                    <p class="LyMiniT font" style="margin-left: 1rem">${next.title}<span id="Lysub" class="Mtitle"><br>${next.name}</span></p>
                    <i id="heartCheck${check}" class="xi-heart heartCheck${check} nextBackListlyricsHeart">
                    `;
            this.getFavorites();
            lyricsSub.innerHTML = `<div id="plyrics">${parnassusLyrics}</div>`;
            musicArea.playaudio = document.getElementById('start');
            // onPlayer = true;// 반복 재생 오류 방지
            equalizerCheck = true;
            nplay();// 재생 셋팅
            // equalizerStart(musicArea.playaudio);
            Dmusic.pushItem(Dmusic.shiftItem());
            // if(musicArea.ended) totalReplay(); //다음곡 눌러도 켜져있니? 그럼 반복재생시켜
        };
        const backgo = (...backItem) =>{
            const [nimg,ntitle,naudio,lyrics,lyricsTitleImage,lyricsSub] = [...backItem];
            // console.log(Dmusic.storage);
            if(Dmusic.storage[10].value.heart === 'true'){
                document.getElementById('heart').classList.add('red');
            }else{
                document.getElementById('heart').classList.remove('red');
            }
            document.getElementById('heart').addEventListener(
            'click',
            ()=>{
                if(document.getElementById('heart').classList.contains('red')){
                    Dmusic.storage[0].value.heart = 'false';
                }else{
                    Dmusic.storage[0].value.heart = 'true';
                }
            }
            );
            const back = Dmusic.popItem();
            Dmusic.unshiftItem(back);
            document.querySelector(".NextFrame").innerHTML = `<img id="Next" src=${back._nextPointer.value.img} alt="no Img">`;
            document.querySelector(".BackFrame").innerHTML = `<img id="Back" src=${back._priviusPointer.value.img} alt="no Img">`;
            let check = back.value.title.match(/[^()]+/g)[0].trim().replace(/\s+/g,"-");
            check = check === '18번'? 'TOIL':check;
            check = check === '12월의-기적'? '엑소기적':check;
           
            // console.log(check);
            // document.getElementById('volumeRange').style.display = "none"
            nimg.innerHTML = `
            <div class="playStropFrame">
                <i id="Play" class="xi-play"></i>
                <i id="Stop" class="xi-pause"></i>
            </div>
            <img src="${back.value.img}">`;
            let parnassusLyrics = '';
            let heartStyle = '';
            if(back.value.heart === 'true'){
                heartStyle = 'red';
            }else{
                heartStyle = 'rgb(230 216 216)';
            }
            const parnassus = back.value.Lyrics.split("<br>").map(v=>v.trim());
            // console.log(parnassus);
            for(let i=0; i<parnassus.length; i=i+3){
                if(parnassus[i] === undefined || parnassus[i+1] === undefined || parnassus[i+2] === undefined) continue; 
                parnassusLyrics += `<p class="interval">${parnassus[i]}<br>${parnassus[i+1]}<br>${parnassus[i+2]}</p>`;
            }
            ntitle.innerHTML = `<p>${back.value.title}<br><span class="Mtitle">${back.value.name}</span></p>`;
            naudio.innerHTML = `<audio id="start" src="${back.value.audio}"></audio>`;
            lyrics.innerHTML = `<p id="plyrics" >${parnassusLyrics}</p>`;
            lyricsTitleImage.innerHTML = `<div class="LyricsImage"><img src="${back.value.img}" alt="no image"></div>
                    <p class="LyMiniT font" style="margin-left: 1rem">${back.value.title}<span id="Lysub" class="Mtitle"><br>${back.value.name}</span></p>
                    <i id="heartCheck${check}" class="xi-heart heartCheck${check} nextBackListlyricsHeart" style="color:${heartStyle}">`; 
            this.getFavorites();
            lyricsSub.innerHTML = `<div id="plyrics" >${parnassusLyrics}</div>`;
            musicArea.playaudio = document.getElementById('start'); 
                
            onPlayer = true;// 반복 재생 오류 방지
            nplay();
            // if(musicArea.ended) totalReplay();
        }
        const ntime = ()=>{
            musicArea.playaudio.addEventListener(
            'loadedmetadata',
            ()=>{
                musicArea.duration = musicArea.playaudio.duration || 0;
                const min = Math.floor( musicArea.duration / 60);
                const sec = Math.floor( musicArea.duration % 60);
                const toMin = min.toString().padStart(2,"0");
                const toSec = sec.toString().padStart(2,"0");
                document.getElementById('totalTime').innerHTML = toMin + ":" + toSec
            }
            );
            musicArea.playaudio.addEventListener(
            'timeupdate',
            ()=>{
                document.getElementById('musicRange').max = musicArea.duration; //최대 길이
                //console.log(Number(document.getElementById('musicRange').max));
                const percentage = (musicRange.value / musicRange.max) * 100; // 현재 위치 백분율 계산
                document.getElementById('musicRange').value = musicArea.currentTime; // 실시간 움직임 
                musicRange.style.background = `linear-gradient(to right, #dd4c72 ${percentage}%, white ${percentage}%)`;
                musicArea.currentTime = musicArea.playaudio.currentTime;
                let min = Math.floor( musicArea.currentTime / 60);
                let sec = Math.floor( musicArea.currentTime % 60);
                let toMin = min.toString().padStart(2,"0");
                let toSec = sec.toString().padStart(2,"0");
                document.getElementById('firstTime').innerHTML = toMin + ":" + toSec;
            }
            );
        }
        const totalReplay = () =>{ // 전체 리플레이
            musicArea.playaudio.addEventListener(
            'ended',
            (event)=>{
                
                if(musicArea.ended){
                    nextgo(document.getElementById('imgFrame'),
                    document.getElementById('musicTitle'),document.getElementById('musicListFrame'),
                    document.getElementById('lyrics'),document.querySelector('.LyricsTitle'),
                    document.getElementById('LyricsZoom')); 
                    document.getElementById('Stop').style.display = "block";
                    document.getElementById('Play').style.display = "none"; 
                // musicArea.endedValue++;
                //totalReplay();
                }/*
                if(musicArea.endedValue === Dmusic.storage.length-1){ //맨마지막이 되면 중지
                    musicArea.ended = false;
                }  */
            }
            );
        }
        const oneReplay = () =>{
            musicArea.playaudio.loop = true; //한곡만 재생 반복
            musicArea.ended = false; // 자동 반복 중지
        }
        const rangego = (value) =>{ // 마우스로 끌면 거기서 스타트
            musicArea.playaudio.currentTime = value;
                document.getElementById('musicRange').addEventListener(
                'mouseup', // 마우스 업 했을 때 그게 음악 전체시간이랑 크거나 같으면 다음곡으로 재생
                (e)=>{
                    if(e.target.value >= Math.floor(musicArea.playaudio.duration) && musicArea.repeatV){
                        nextgo(document.getElementById('imgFrame'),
                        document.getElementById('musicTitle'),document.getElementById('musicListFrame'),
                        document.getElementById('lyrics'),document.querySelector('.LyricsTitle'),
                        document.getElementById('LyricsZoom')); 
                        document.getElementById('Stop').style.display = "block";
                        document.getElementById('Play').style.display = "none";
                    }
                }
                );
        }
        // const volumeRange = (value)=>{ //불륨 설정
        //     value =   value / 100;
        //     musicArea.playaudio.volume = value;
        //     document.getElementById('volumeRange').style.background = `linear-gradient(to right, #b37d8b ${value*100}%, white ${value}%)`;
        //     document.getElementById('volumeRange').addEventListener(
        //     'change',
        //     ()=>{
        //         document.getElementById('volumeRange').style.display = "none";
        //         musicArea.mouseValue = true;
        //     }
        //     );
        // }
    // 캔버스 초기화
        const equalizerStart = (data) => {
            if (!equalizer) {
                // AudioContext 초기화
                equalizer = new (window.AudioContext || window.webkitAudioContext)();
                analyser = equalizer.createAnalyser();
                analyser.fftSize = 256;
                bufferLength = analyser.frequencyBinCount; // 데이터 길이
                dataArray = new Uint8Array(bufferLength);
            }

            if (!source || source.mediaElement !== data) {
                // 기존 연결이 있으면 해제
                if (source) {
                    try {
                        source.disconnect();
                    } catch (err) {
                        console.log("Source disconnection error:", err);
                    }
                }

                try {
                    // 새 MediaElementSourceNode 생성
                    source = equalizer.createMediaElementSource(data);
                    source.connect(analyser);
                    analyser.connect(equalizer.destination);

                    // 음악 재생 시 AudioContext 활성화
                    data.addEventListener("play", () => {
                        if (equalizer.state === "suspended") {
                            equalizer.resume();
                        }
                        drawVisualizer();
                    });
                } catch (err) {
                    // console.log("Error in createMediaElementSource:", err);
                }
            } else {
                // console.log("MediaElementSourceNode already exists for this element. Reusing the source.");
            }
        };

        const drawVisualizer = () => {
            Pen.clearRect(0, 0, canvas.width, canvas.height);

            analyser.getByteFrequencyData(dataArray);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            let time = performance.now() / 1000;

            for (let i = 20; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 256) * (canvas.height / 2);
                const waveEffect = Math.sin(time + i * 0.1) * 15;
                barHeight += waveEffect;

                if (barHeight > canvas.height / 2 - 10) barHeight = canvas.height / 2 - 10;
                if (barHeight < 5) barHeight = 5;

                Pen.fillStyle = `rgb(${255 - i }, ${255 - barHeight}, ${200-barHeight})`;
                Pen.fillRect(x, canvas.height / 2 - barHeight, barWidth, barHeight);
                Pen.fillRect(x, canvas.height / 2, barWidth, barHeight);

                x += barWidth + 2;
            }

            requestAnimationFrame(drawVisualizer);
        };

        // 곡 변경 시 호출되는 함수
        // const changeTrack = (newAudioElement) => {
        //     if (equalizer) {
        //         equalizerStart(newAudioElement); // 새로운 곡으로 Equalizer 설정
        //     }
        // };


        // 초기 설정
        if (equalizerFirstCheck) {
            try {
                equalizerStart(musicArea.playaudio);
                drawVisualizer(); // 처음 초기 스타트
                equalizerFirstCheck = false;
            } catch (err) {
                console.log("Error in equalizer initialization:", err);
            }
        }

        //처음 DB 받아서 즐겨찾기 업로드
        this.getFavorites(); 
    
        const playCheck = () =>{
            musicArea.playaudio.addEventListener("playing",(e)=>{
                // console.log(e.target);
                // const playCheck = decodeURI(e.target.src).match(/^au+.+/g);

                this.playData.forEach(v=>{ // 재생 되는거 체크 
                    document.querySelector(`.${v}`).style.background = 'transparent';
                });
                let data = decodeURI(e.target.src).match(/고백|사랑이 죄야|그때가 좋았어|솔직하게 말해서 나|18번|처음이라서|하고 싶던 말|CHANGMO|엑소기적|삐딱하게|시작/g)[0];
                data = data === 'CHANGMO'? '나쁜 X':data;
                data = data === '18번'? 'TOIL':data;
                data = data.replace(/\s/g,"-");
                document.querySelector(`.${data}`).style.background = "#c17c90";
                // console.log(document.querySelector(`.${playCheck}`));
            });
        }
        const nplay = () =>{ //플레이
            musicArea.playaudio.play().catch(error => {
                console.error('재생 오류:', error);
            });
            musicArea.playaudio.play();
            ntime();
            if(onPlayer || equalizerCheck){
                totalReplay();
                equalizerStart(musicArea.playaudio);
                onPlayer = false;
            }
            playCheck();
            
        }
        const nstop = () => { //스탑
            musicArea.playaudio.pause(); 
            equalizerCheck = false;
        } 
    }
    getFavorites() {
        const hartcheck = this.dbData.filter(v=>{
            if(v.heart === 'false'){
                return false;
            }else{
                return true;
            }
        });
        let htmlString = ``;
        hartcheck.forEach(v=>{
            const num = (Number(v.id)-1);
            htmlString += `<nav class="smallFrame smallTitle" id="">
                <img id="" class="songListFrame" src="${v.img}">
                <h3 id="${v.title+num}" class="totalListTitle font">${v.title}<span id="" class="smallTitle"><br>
            ${v.name}</span></h3><i class="xi-heart heartCheck nextBackListlyricsHeart ${v.id} listHeart" style="color:red"></i></nav>`;
        });
        // document.getElementById('cart').classList.remove('add');
        this.favoritesVisual("FavoritesSubFrame",htmlString,hartcheck.length);
        // const hartcheck = data.filter(v=>)
    }
    favoritesVisual(dom,output,hartcheckLength) {
        const heartCheck = this.dbData.filter(v=>{
            if(v.heart === 'true'){
                return true;
            }else{
                let check = v.title.match(/[^()]+/g)[0].trim().replace(/\s+/g,"-");
                check = check === '18번'? 'TOIL':check;
                check = check === '12월의-기적'? '엑소기적':check;
                document.querySelectorAll(`.heartCheck${check}`).forEach(v=>{
                    v.style.color = 'rgb(230 216 216)';
                });
                // document.querySelector(`.heartCheck${check}`).style.color = 'rgb(230 216 216)';
                return false;
            }
        });
        heartCheck.forEach(v=>{
            let check = v.title.match(/[^()]+/g)[0].trim().replace(/\s+/g,"-");
            check = check === '18번'? 'TOIL':check;
            check = check === '12월의-기적'? '엑소기적':check;
            document.querySelectorAll(`.heartCheck${check}`).forEach(v=>{
                    v.style.color = 'red';
            });
            // document.querySelector(`.heartCheck${check}`).style.color = 'red';
        });
        // document.getElementById('cart').classList.add('add');
        document.getElementById(dom).innerHTML = output;
        if(hartcheckLength !== 0){
            document.getElementById('cart').style.color = '#ff0044';
            
        }else if(hartcheckLength === 0){
            document.getElementById('cart').style.color = 'whitesmoke';
        }
    }
    listHeart(listId) {
        if(listId){
            this.dbData.forEach(v=>{
                if(Number(listId) === v.id){
                    if(v.heart === 'false'){
                        v.heart = 'true';
                    }else{
                        v.heart = 'false';
                    }
                    
                }
            });
            this.getFavorites();
        }
    }
    control(targetDom) {
        this.getDB(targetDom);
    }
}


//가사: JSON.parseInt(JSON.stringtify(''));

        

const music = new MusicPlayer('music');
music.control(document.getElementById('MUSIC'));

}