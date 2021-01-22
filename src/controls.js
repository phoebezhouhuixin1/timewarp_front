var video = document.getElementById("mainVideo"); // TODO: Why can't i write ths in index.html <script> instead? https://stackoverflow.com/questions/751882/html-javascript-include-file-variable-scope
var timeout;
var controlPane=document.querySelector("#controlPane");

video.addEventListener("pause", () => {
    document.querySelector("#playImage").src="./res/play-w.png";
});

video.addEventListener("play",()=>{
    document.querySelector("#playImage").src="./res/pause-w.png";
});


function playPause(){
    if (video.paused && !video.ended) {
        document.querySelector("#playGrow").src="./res/pause-w.png";
        document.querySelector("#playGrow").className="playAfter";
        setTimeout(()=>{document.querySelector("#playGrow").className="playGrow";},1000);
        video.play();
    }else if(video.ended){
        video.load();
    } else {
        document.querySelector("#playGrow").src="./res/play-w.png";
        document.querySelector("#playGrow").className="playAfter";
        setTimeout(()=>{document.querySelector("#playGrow").className="playGrow";},1000);
        video.pause();
    }
}

function fullscreen(){
    var window=remote.getCurrentWindow();
    window.setFullScreen(window.isFullScreen()?false:true);
    if(window.isFullScreen()){
        document.getElementById('fullSImage').src="./res/close-fullScreen-w.png";
        document.getElementById('titlebar').style.display="none";
        document.getElementById("holder").style.marginTop="0";
    }else{
        document.getElementById('fullSImage').src="./res/fullScreen-w.png";
        document.getElementById('titlebar').style.display="block";
        document.getElementById("holder").style.marginTop="32px";
    }
};

function changeTime(direction,seconds){
    if(direction=='back'){
        document.querySelector("#back5sImage").className="playAfter";
        setTimeout(()=>{document.querySelector("#back5sImage").className="playGrow";},1000);
        video.currentTime-=seconds;
    }else if(direction=='front'){
        document.querySelector("#front5sImage").className="playAfter";
        setTimeout(()=>{document.querySelector("#front5sImage").className="playGrow";},1000);
        video.currentTime+=seconds;
    }
}

function muteVideo(){
    video.muted=video.muted?false:true;
    if(video.muted){
        document.querySelector("#muteImage").src="./res/sound-muted-w.png";
        document.getElementById('rv').value=0;
    }else{
        changeVolume();
    }
}

function changeVolume(){
    //init videovolume
    console.log(volume)
    video.volume= parseFloat(volume);
    localStorage.setItem("volume",volume.toString());
    document.getElementById('rv').value=volume*100;
    if(volume>0.5 && volume<=1){
        document.querySelector("#muteImage").src="./res/sound-full-w.png";
    }else if(volume<=0.5 && volume>0){
        document.querySelector("#muteImage").src="./res/sound-half-w.png"
    }else{
        document.querySelector("#muteImage").src="./res/sound-muted-w.png";
    }
}

document.getElementById('rv').oninput=()=>{
    video.muted=false;
    volume=document.getElementById('rv').value/100;
    changeVolume(); 
}    

//hide controls pane after 3 seconds
window.addEventListener("mousemove",()=>{
    controlPane.style.display="block";
    if(timeout!=undefined){
        clearTimeout(timeout);
    }
    timeout=setTimeout(()=>{
        controlPane.style.display="none";
    },2500)
});

//pause video on single click
video.addEventListener("click",()=>{
    playPause();
});


window.addEventListener("keyup",keyboardHandler);
//setting shortcut keys for control buttons
function keyboardHandler(e){
    if(e.keyCode==32){ //spacebar
        playPause();
    }else if(e.keyCode==37){ //arrow_left
        changeTime('back',5)
    }else if(e.keyCode==39){ //arrow_left
        changeTime('front',5)
    }
}
