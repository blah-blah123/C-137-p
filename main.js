status1= "";
input_text= "";
objects= [];

function preload() {
}

function setup() {
    canvas = createCanvas(200, 200);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.hide();
    video.size(200,200);
}
function start(){
    objectDetector = ml5.objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    input_text= document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1= true;
}


function draw() {
    image(video, 0, 0, 200, 200);
    if (status1 != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status: Objects detected";
            console.log(objects.length);
            fill("#ffff00");
            percentage = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + percentage + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#ffff00");
            rect (objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if (objects[i].label== input_text){
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("object_is_found").innerHTML= input_text + "Found!";
                var synth= window.speechSynthesis;
                var utterThis= new SpeechSynthesisUtterance(input_text + "Found!");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_is_found").innerHTML= input_text + "Not Found!"; 
            }
        }
    }

}



function gotResults(results, error) {
if (error) {
    console.log(error);
}
console.log(results);
objects = results;
}