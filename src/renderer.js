const ipc = require("electron").ipcRenderer;
const path = require("path")
const uploadButton = document.getElementById("upload");
const predictButton = document.getElementById("predict");
uploadButton.addEventListener("click", function(event){
    ipc.send("open-file-dialog");
})
predictButton.addEventListener("click", function(event){
    ipc.send("detect-objects");
})
ipc.on("selected-file", function (event, vidpath) {
    console.log("Full path: " + vidpath);
    loadVideo(vidpath);
})
function loadVideo(vidpath) {
    if (path.extname(vidpath) == ".mp4" || path.extname(vidpath) == '.mp3' || path.extname(vidpath) == '.gif' || path.extname(vidpath) == '.wmv' || path.extname(vidpath) == '.flv' || path.extname(vidpath) == '.mov' || path.extname(vidpath) == '.MOV' || path.extname(vidpath) == '.mkv' || path.extname(vidpath) == '.avi' || path.extname(vidpath) == '.mpg' || path.extname(vidpath) == '.MPG') {
        document.title=path.basename(vidpath) + " - Media Player";
        document.querySelector('#headTitle').innerHTML = path.basename(vidpath) + " - Media Player";
        document.getElementById("mainVideo").src=vidpath;
    }
}
