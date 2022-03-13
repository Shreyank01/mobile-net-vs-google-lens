function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('Mobilenet' , modelLoaded);
}

function modelLoaded() {
  console.log("Model is loaded");
}

previous_results ='';

function draw() {
  image(video,0,0,300,300);
  classifier.classify(video , gotResult);

  function gotResult(error , results) {
    if(error){
      console.error(error);
    }
    else{
      if(results[0].confidence > 0.5 && previous_results != results[0].label){
        console.log(results);
        previous_results = results[0].label;
        document.getElementById("result_object").innerHTML =  results[0].label;
        document.getElementById("result_accuracy").innerHTML = (results[0].confidence*100).toFixed(2) + "%";
        synth = window.speechSynthesis;
        speak_data = "The object detected is" + results[0].label;
        utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

        
      }
    }
  }
}





