// neural network visualization created by Pascal Guyon on top of Daniel Shiffman's neural network toy library

var inputsNumber= 2;
var hiddenNumber =4;
var outputsNumber= 1;
var autoTrainingNumber=10000;
var trainingCounter=0;
var manualTraining= false;
var autoTraining= false;
var data;
var guess=0;

let nn;
var button;
var buttonStart;
var buttonNext;
var steps = 0;
var manualTrainingSteps =0;

var inputsDrawing=[];
var hiddenDrawing=[];
var outputsDrawing=[];
var connectionih=[];
var connectionho=[];
var errors;
var errorsArray=[];
var illuminate =false;

var atc; //html counter auto training
var mtc;
//weights variables
var i1h1;
var i1h2;
var i1h3;
var i1h4;
var i2h1;
var i2h2;
var i2h3;
var i2h4;
var biash1;
var biash2;
var biash3;
var biash4;
var h1o;
var h2o;
var h3o;
var h4o;
var biaso;

var w = 800;
var h = 600;

let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
];

//SETUP==================================================================
function setup() {
  createCanvas(w, h);
  nn = new NeuralNetwork(inputsNumber, hiddenNumber, outputsNumber);
  nn.setLearningRate(0.1);
  setupNn();
  handleBelowCanvas();
}

function draw() {
  background(0);
  drawingNn();
  drawLegend();
  textSteps();
  displayAutoTrainingDone();
  if (manualTraining){
      displayErrorsManualTraining();
  }else{ // auto training
    displayErrors();
  }
  animationForAutoTraining();
}

function setupNn(){
    for (var i=0; i<inputsNumber; i++){
      inputsDrawing[i]=new InputsDrawing(w/4, 240+i*100, 255, 255, 255);
    }
    for (var j=0; j<hiddenNumber; j++){
      hiddenDrawing[j]= new HiddenDrawing(w/2, 140+j*100, 255, 255, 255);
    }
    for (var k=0; k<outputsNumber; k++){
      outputsDrawing[k]= new OutputsDrawing(w*3/4, h/2+k*100, 255, 255, 255);
    }
    for (var l=0; l<inputsNumber; l++){
      for (var m=0; m<hiddenNumber; m++){
          connectionih.push(new Connectionih(inputsDrawing[l].x,inputsDrawing[l].y,hiddenDrawing[m].x, hiddenDrawing[m].y, 255, 255, 255 ));
      }
    }
    for (var n=0; n<hiddenNumber; n++){
      for (var o=0; o<outputsNumber; o++){
          connectionho.push(new Connectionho(hiddenDrawing[n].x,hiddenDrawing[n].y,outputsDrawing[o].x, outputsDrawing[o].y, 255, 255, 255));
      }
    }
}

function drawingNn(){
  for (var j=0; j<inputsNumber; j++){
    inputsDrawing[j].show();
  }
  for (var k=0; k<hiddenNumber; k++){
    hiddenDrawing[k].show();
  }
  for (var l=0; l<outputsNumber; l++){
    outputsDrawing[l].show();
  }
  for (var m=0; m<connectionih.length; m++){
    connectionih[m].show();
  }
  for (var n=0; n<connectionho.length; n++){
    connectionho[n].show();
  }
};

function drawLegend(){
  textSize(20);
  noStroke();
  fill(255, 255, 255);
  var h = 30;
  text('INPUTS', w/4-35, h);
  text('HIDDEN LAYER', w/2-75, h);
  text('OUTPUTS', w*3/4-50, h);
  fill(0, 255, 0);
  if (manualTrainingSteps>1 && manualTrainingSteps<5){
    text('Feeding forward ->', 10, height/2);
  }else if(manualTrainingSteps==6){
    text('<- Backpropagation', width-200, height/2-100);
  }
}

function textSteps(){
  var textHeight= h*1/7;
  var textx= 10;
  if (manualTrainingSteps==1){
     fill(0, 255, 0);
     textSize(20);
     text("Step: random initialization of the weights", textx, textHeight);
  }else if (manualTrainingSteps==2){ // inputs
     fill(0, 255, 0);
     textSize(20);
     text("Step: start of a training cyle, feeding inputs", textx, textHeight);
     fill(0, 0, 0);
     text(data.inputs[0], inputsDrawing[0].x-20, inputsDrawing[0].y+5);
     text(data.inputs[1], inputsDrawing[1].x-20, inputsDrawing[1].y+5);
   }else if (manualTrainingSteps==3){
      fill(0, 255, 0);
      textSize(20);
      text("Step: calculating the weighted sum of inputs + going through activation function", textx, textHeight);
      fill(0, 0, 0);
      text(data.inputs[0], inputsDrawing[0].x-20, inputsDrawing[0].y+5);
      text(data.inputs[1], inputsDrawing[1].x-20, inputsDrawing[1].y+5);
    }else if (manualTrainingSteps==4){
       fill(0, 255, 0);
       textSize(20);
       text("Step: outputing a guess", textx, textHeight);
       fill(0, 0, 0);
       text(data.inputs[0], inputsDrawing[0].x-20, inputsDrawing[0].y+5);
       text(data.inputs[1], inputsDrawing[1].x-20, inputsDrawing[1].y+5);
       text(guess.toFixed(2), outputsDrawing[0].x-20, outputsDrawing[0].y+5);
       fill(255,0, 0);
       text("The correct answer was: " + data.outputs, 500, 400);
     }else if (manualTrainingSteps==5){
        fill(0, 255, 0);
        textSize(20);
        text("Step: computing the error (right answer vs guess)", textx, textHeight);
        fill(0, 0, 0);
        text(data.inputs[0], inputsDrawing[0].x-20, inputsDrawing[0].y+5);
        text(data.inputs[1], inputsDrawing[1].x-20, inputsDrawing[1].y+5);
        text(guess.toFixed(2), outputsDrawing[0].x-20, outputsDrawing[0].y+5);
        fill(255,0, 0);
        text("The correct answer was: " + data.outputs, 500, 400);
      }else if (manualTrainingSteps==6){
         fill(0, 255, 0);
         textSize(20);
         text("Step: adjusting the weights then starting a new cycle!", textx, textHeight);
       }

}

function displayErrors(){
  for ( var p=0; p< errorsArray.length; p++){
      stroke(255, 0, 0);
      line(p*w/autoTrainingNumber, height,p*w/autoTrainingNumber, height-errorsArray[p]*150 );
      fill(255, 0, 0);
      textSize(25);
      noStroke();
    text("Errors magnitude over time", 10, h*4/5-20);
  }
}

function displayErrorsManualTraining(){
  for ( var p=0; p< errorsArray.length; p++){
      stroke(255, 0, 0);
      strokeWeight(6);
      line(p*w/100, height,p*w/100, height-errorsArray[p]*150 );
      fill(255, 0, 0);
      textSize(25);
      noStroke();
      text("Errors magnitude over time", 10, h*4/5);
  }
}

function startManualTraining(){ //steps:
  manualTraining =true;
  if (manualTrainingSteps <6){
    manualTrainingSteps++;
  }else{
    manualTrainingSteps=2;
  };
  // console.log(manualTrainingSteps);

  if (manualTrainingSteps==1){//init weights
    //reset nn
    trainingCounter=0;
    autoTraining=false;
    errorsArray = [];
    nn = new NeuralNetwork(inputsNumber, hiddenNumber, outputsNumber);
    resetNnColors();
    atc.html(0);
    getHtmlWeights();

    for( var i=0; i<inputsNumber*hiddenNumber;i++){
      connectionih[i].r=0;
      connectionih[i].g=255;
      connectionih[i].b=0;
    }
    for( var i=0; i<hiddenNumber*outputsNumber;i++){
      connectionho[i].r=0;
      connectionho[i].g=255;
      connectionho[i].b=0;
    }
 }else if(manualTrainingSteps==2){ //inputs
   data = random(training_data);
   nn.train(data.inputs, data.outputs);

    for( var i=0; i<inputsNumber*hiddenNumber;i++){
      connectionih[i].r=255;
      connectionih[i].g=255;
      connectionih[i].b=255;
    }
    for( var i=0; i<hiddenNumber*outputsNumber;i++){
      connectionho[i].r=255;
      connectionho[i].g=255;
      connectionho[i].b=255;
    }
    for ( var j=0; j< inputsNumber; j++){
      inputsDrawing[j].r=0;
      inputsDrawing[j].g=255;
      inputsDrawing[j].b=0;
    }
  }else if(manualTrainingSteps==3){//enters hidden layer
    for( var i=0; i<inputsNumber*hiddenNumber;i++){
      connectionih[i].r=0;
      connectionih[i].g=255;
      connectionih[i].b=0;
    }
    for ( var i=0; i< hiddenNumber; i++){
      hiddenDrawing[i].r=0;
      hiddenDrawing[i].g=255;
      hiddenDrawing[i].b=0;
    }
  }
    else if(manualTrainingSteps==4){//output guess
      for ( var i=0; i< outputsNumber; i++){
        outputsDrawing[i].r=0;
        outputsDrawing[i].g=255;
        outputsDrawing[i].b=0;
      }
      for( var i=0; i<hiddenNumber*outputsNumber;i++){
        connectionho[i].r=0;
        connectionho[i].g=255;
        connectionho[i].b=0;
      }
  }else if(manualTrainingSteps==5){//display error in this step
    errorsArray.push( errors);
    console.log(errorsArray);
    trainingCounter++;
    mtc.html(trainingCounter);
  }else if ( manualTrainingSteps==6){//weights update, back propagation
    console.log(errorsArray);

    getHtmlWeights();

    for ( var i=0; i< outputsNumber; i++){
      outputsDrawing[i].r=255;
      outputsDrawing[i].g=255;
      outputsDrawing[i].b=255;
    }
    for ( var i=0; i< hiddenNumber; i++){
      hiddenDrawing[i].r=255;
      hiddenDrawing[i].g=255;
      hiddenDrawing[i].b=255;
    }
    for ( var j=0; j< inputsNumber; j++){
      inputsDrawing[j].r=255;
      inputsDrawing[j].g=255;
      inputsDrawing[j].b=255;
    }
    for( var i=0; i<inputsNumber*hiddenNumber;i++){
      connectionih[i].r=0;
      connectionih[i].g=255;
      connectionih[i].b=0;
    }
    for( var i=0; i<hiddenNumber*outputsNumber;i++){
      connectionho[i].r=0;
      connectionho[i].g=255;
      connectionho[i].b=0;
    }
  }
}

function preAutoTraining(){
  autoTraining=true;
  manualTraining=false;
  mtc.html(0);
  manualTrainingSteps=0;
  trainingCounter=0;
  errorsArray = [];
  resetWeightsNumbers()
  setTimeout(function(){startAutoTraining();}, 1000);

}

function startAutoTraining(){
  resetNnColors();
  nn = new NeuralNetwork(inputsNumber, hiddenNumber, outputsNumber);
  nn.setLearningRate(0.1);
  for (let a = 0; a < autoTrainingNumber; a++) {
    trainingCounter++;
    // console.log(trainingCounter);
    let data = random(training_data);
    nn.train(data.inputs, data.outputs);
    fill(0,255,0);
    atc.html(trainingCounter);
    getHtmlWeights();
  }
}

function displayAutoTrainingDone(){
  if (trainingCounter == 10000){
    fill(0,255,0);
    textSize(30);
    text("Training Done!", 10, h*1/6);
  }
}

function resetNnColors(){
  for( var i=0; i<inputsNumber*hiddenNumber;i++){
    connectionih[i].r=255;
    connectionih[i].g=255;
    connectionih[i].b=255;
  }
  for( var i=0; i<hiddenNumber*outputsNumber;i++){
    connectionho[i].r=255;
    connectionho[i].g=255;
    connectionho[i].b=255;
  }
  for ( var i=0; i< outputsNumber; i++){
    outputsDrawing[i].r=255;
    outputsDrawing[i].g=255;
    outputsDrawing[i].b=255;
  }
  for ( var j=0; j< inputsNumber; j++){
    inputsDrawing[j].r=255;
    inputsDrawing[j].g=255;
    inputsDrawing[j].b=255;
  }
  for ( var i=0; i< hiddenNumber; i++){
    hiddenDrawing[i].r=255;
    hiddenDrawing[i].g=255;
    hiddenDrawing[i].b=255;
  }
}

function handleBelowCanvas(){
  createP('');
  buttonStart=createButton('Start Auto Training');
  buttonStart.mousePressed(preAutoTraining);
  createElement("span",' Auto Training Counter:');
  atc = createElement('span', trainingCounter);
  createP('');
  buttonNext = createButton('Step By Step Training');
  buttonNext.mousePressed(startManualTraining);
  createElement('span',' Hit the button, see what happens and repeat! Manual Training Counter:');
  mtc = createElement('span', trainingCounter);
  createP('');

  createElement('span','Weight input 1 to hidden 1: ');
  i1h1 = createElement('span', '');   i1h1.style('color', '#00FF00');
  createP('');
  createElement('span','Weight input 1 to hidden 2: ');
  i1h2 = createElement('span', '');   i1h2.style('color', '#00FF00');
  createP('');
  createElement('span','Weight input 1 to hidden 3: ');
  i1h3 = createElement('span', '');   i1h3.style('color', '#00FF00');
  createP('');
  createElement('span','Weight input 1 to hidden 4: ');
  i1h4 = createElement('span', '');   i1h4.style('color', '#00FF00');
  createP('');

  createElement('span','Weight input 2 to hidden 1: ');
  i2h1 = createElement('span', '');   i2h1.style('color', '#00FF00');
  createP('');
  createElement('span','Weight input 2 to hidden 2: ');
  i2h2 = createElement('span', ''); i2h2.style('color', '#00FF00');
  createP('');
  createElement('span','Weight input 2 to hidden 3: ');
  i2h3 = createElement('span', ''); i2h3.style('color', '#00FF00');
  createP('');
  createElement('span','Weight input 2 to hidden 4: ');
  i2h4 = createElement('span', ''); i2h4.style('color', '#00FF00');
  createP('');

  createElement('span','Bias hidden 1: ');
  biash1 = createElement('span', ''); biash1.style('color', '#00FF00');
  createP('');
  createElement('span','Bias hidden 2: ');
  biash2 = createElement('span', ''); biash2.style('color', '#00FF00');
  createP('');
  createElement('span','Bias hidden 3: ');
  biash3 = createElement('span', ''); biash3.style('color', '#00FF00');
  createP('');
  createElement('span','Bias hidden 4: ');
  biash4 = createElement('span', ''); biash4.style('color', '#00FF00');
  createP('');

  createElement('span','Weight hidden 1 to output: ');
  h1o = createElement('span', ''); h1o.style('color', '#00FF00');
  createP('');
  createElement('span','Weight hidden 2 to output: ');
  h2o = createElement('span', ''); h2o.style('color', '#00FF00');
  createP('');
  createElement('span','Weight hidden 3 to output: ');
  h3o = createElement('span', ''); h3o.style('color', '#00FF00');
  createP('');
  createElement('span','Weight hidden 4 to output: ');
  h4o = createElement('span', ''); h4o.style('color', '#00FF00');
  createP('');

  createElement('span','Bias output: ');
  biaso = createElement('span', ''); biaso.style('color', '#00FF00');
  createP('');
}

function christmasParty(){
  for( var i=0; i<inputsNumber*hiddenNumber;i++){
    connectionih[i].r=random(0,255);
    connectionih[i].g=random(0,255);
    connectionih[i].b=random(0,255);
  }
  for( var i=0; i<hiddenNumber*outputsNumber;i++){
    connectionho[i].r=random(0,255);
    connectionho[i].g=random(0,255);
    connectionho[i].b=random(0,255);
  }
  for ( var i=0; i< outputsNumber; i++){
    outputsDrawing[i].r=random(0,255);
    outputsDrawing[i].g=random(0,255);
    outputsDrawing[i].b=random(0,255);
  }
  for ( var j=0; j< inputsNumber; j++){
    inputsDrawing[j].r=random(0,255);
    inputsDrawing[j].g=random(0,255);
    inputsDrawing[j].b=random(0,255);
  }
  for ( var i=0; i< hiddenNumber; i++){
    hiddenDrawing[i].r=random(0,255);
    hiddenDrawing[i].g=random(0,255);
    hiddenDrawing[i].b=random(0,255);
  }
}

function animationForAutoTraining(){
  if (autoTraining==true && trainingCounter !=10000 && manualTraining==false){
    christmasParty();
    if(trainingCounter!= 10000){
      fill(0,255,0);
      textSize(30);
      text("Training...", 10, h*1/6);
    }
  }
}

function resetWeightsNumbers(){
  i1h1.html('');
  i1h2.html('');
  i1h3.html('');
  i1h4.html('');

  i2h1.html('');
  i2h2.html('');
  i2h3.html('');
  i2h4.html('');

  biash1.html('');
  biash2.html('');
  biash3.html('');
  biash4.html('');

  h1o.html('');
  h2o.html('');
  h3o.html('');
  h4o.html('');

  biaso.html('');
}

function getHtmlWeights(){
  i1h1.html(nn.weights_ih.toArray()[0]);
  i1h2.html(nn.weights_ih.toArray()[1]);
  i1h3.html(nn.weights_ih.toArray()[2]);
  i1h4.html(nn.weights_ih.toArray()[3]);

  i2h1.html(nn.weights_ih.toArray()[4]);
  i2h2.html(nn.weights_ih.toArray()[5]);
  i2h3.html(nn.weights_ih.toArray()[6]);
  i2h4.html(nn.weights_ih.toArray()[7]);

  biash1.html(nn.bias_h.toArray()[0]);
  biash2.html(nn.bias_h.toArray()[1]);
  biash3.html(nn.bias_h.toArray()[2]);
  biash4.html(nn.bias_h.toArray()[3]);

  h1o.html(nn.weights_ho.toArray()[0]);
  h2o.html(nn.weights_ho.toArray()[1]);
  h3o.html(nn.weights_ho.toArray()[2]);
  h4o.html(nn.weights_ho.toArray()[3]);

  biaso.html(nn.bias_h.toArray()[0]);
}
