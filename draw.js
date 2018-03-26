class drawElement {
  constructor(paint, ele) {
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = paint;
    this.context = ele.getContext("2d");
  }
  
  getClickX() {
    return this.clickX;
  }
  
  setClickX(x) {
    this.clickX.push(x);
  }
  
  getClickY() {
    return this.clickY;
  }
  
  setClickY(y) {
    this.clickY.push(y);
  }
  
  getClickDrag() {
    return this.clickX;
  }
  
  setClickDrag(dragging) {
    this.clickDrag.push(dragging);
  }
  
  getPaint() {
    return this.paint;
  }
  
  setPaint(bool) {
    this.paint = bool;
  }
  
}






var elements = $('.empty')
var drawEle = new Array();


for(var i=0; i < elements.length; i++) {
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', '48px');
  canvas.setAttribute('onmousemove','mouse_move(this)');
  canvas.setAttribute('onmousedown','mouse_down(this)');
  canvas.setAttribute('onmouseup','mouse_up(this)');
  canvas.setAttribute('onmouseleave','mouse_leave(this)');
  canvas.setAttribute('height', '48px');
  var num = i+1;
  canvas.setAttribute('id', 'canvas_'+num);
  
  elements[i].appendChild(canvas);
  drawEle[i] = new drawElement(null, canvas);
  if(typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  // break;
  //createCanvas('canvas_'+num)
  //mousemove(id)
  //mousedown(id)
}

// function createCanvas(ele) {
//   div_ele = document.getElementById(ele.id);
//   var temp = parseInt(ele.id.split("_")[1]);
//   canvas = document.createElement('canvas');
//   canvas.setAttribute('width', '48px');
//   canvas.setAttribute('onmousemove','mouse_move(this)');
//   canvas.setAttribute('onmousedown','mouse_down(this)');
//   canvas.setAttribute('onmouseup','mouse_up(this)');
//   canvas.setAttribute('onmouseleave','mouse_leave(this)');
//   canvas.setAttribute('height', '48px');
//   canvas.setAttribute('id', 'canvas_'+temp);
//   div_ele.appendChild(canvas);
//   drawEle[temp-1] = new drawElement(null, canvas);
//   if(typeof G_vmlCanvasManager != 'undefined') {
//     canvas = G_vmlCanvasManager.initElement(canvas);
//   }
// }

function mouse_move(ele) {
  // console.log("ele_id");
  // console.log(ele.id);
  $('#'+ele.id).mousemove(function(e){
    var temp = parseInt(ele.id.split("_")[1]);
    if(drawEle[temp-1].getPaint()){
      addClick(temp, e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw(temp);
    }
  });
}

function mouse_down(ele) {
  $('#'+ele.id).mousedown(function(e){
    var temp = parseInt(ele.id.split("_")[1]);
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    drawEle[temp-1].setPaint(true);
    addClick(temp, e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw(temp);
  });
}

function mouse_up(ele) {
  $('#'+ele.id).mouseup(function(e){
    var temp = parseInt(ele.id.split("_")[1]);
    drawEle[temp-1].setPaint(false);
  });
}

function mouse_leave(ele) {
  $('#'+ele.id).mouseleave(function(e){
    var temp = parseInt(ele.id.split("_")[1]);
    drawEle[temp-1].setPaint(false);
  });
}
// var canvas = document.getElementById(id);
// console.log(canvas)
// var clickX = new Array();
// var clickY = new Array();
// var clickDrag = new Array();
// var paint;


// context = canvas.getContext("2d");

// $('#'+id).mousemove(function(e){
//   if(paint){
//   addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//   redraw();
//   }
// });

// $('#'+id).mousedown(function(e){
//   var mouseX = e.pageX - this.offsetLeft;
//   var mouseY = e.pageY - this.offsetTop;
    
//   paint = true;
//   addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//   redraw();
// });

// $('#'+id).mouseup(function(e){
//   paint = false;
// });

// $('#'+id).mouseleave(function(e){
//   paint = false;
// });

function addClick(id, x, y, dragging)
{
  // console.log(drawEle[id-1]);
  // console.log("ididididiidididididi");
  // console.log(id);
  drawEle[id - 1].setClickX(x);
  drawEle[id - 1].setClickY(y);
  drawEle[id - 1].setClickDrag(dragging);
}

function redraw(id){
  drawEle[id - 1].context.clearRect(0, 0, drawEle[id-1].context.canvas.width, drawEle[id-1].context.canvas.height); // Clears the canvas
  
  drawEle[id - 1].context.strokeStyle = "#000000";
  drawEle[id - 1].context.lineJoin = "round";
  drawEle[id - 1].context.lineWidth = 2;
      
  for(var i=0; i < drawEle[id - 1].clickX.length; i++) {    
  drawEle[id - 1].context.beginPath();
  if(drawEle[id - 1].clickDrag[i] && i){
    drawEle[id - 1].context.moveTo(drawEle[id - 1].clickX[i-1], drawEle[id - 1].clickY[i-1]);
   }else{
     drawEle[id - 1].context.moveTo(drawEle[id - 1].clickX[i]-1, drawEle[id - 1].clickY[i]);
   }
   drawEle[id - 1].context.lineTo(drawEle[id - 1].clickX[i], drawEle[id - 1].clickY[i]);
   drawEle[id - 1].context.closePath();
   drawEle[id - 1].context.stroke();
  }
}


