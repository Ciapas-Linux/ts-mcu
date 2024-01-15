/* function DrawBox(x:number, y:number, w:number, h:number, color = 'rgb(232,32,0)')
{
    ctx.save();
    ctx.scale(canvas.width/deviceWidth, canvas.height/deviceHeight);
    ctx.font='20px Arial';
    ctx.fillStyle = 'purple';
    ctx.fillRect(0,0,deviceWidth, deviceHeight);
    ctx.fillStyle = 'red';
    ctx.fillText('we are on a '+ canvas.width + ' X ' + canvas.height + ' canvas ', 30,30);
    ctx.fillStyle = 'blue';
    ctx.fillRect(30, 100, 200, 80);
    ctx.restore();
}
 */





/* // finds the distance between points
export function DistanceBeetwenPoints(x1:number,y1:number,x2:number,y2:number)
{
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
 */
/* function InsideRect(x:number , y:number, rect:any)
{
	return x > rect.x && x < rect.x + rect.width && y < rect.y + rect.height && y > rect.y
}

function InsideCircle(x:number , y:number, cir:any)
{
	return x > cir.x - cir.rad && x < cir.x + cir.rad && y < cir.y + cir.rad && y > cir.y
}


 // description Check if a pt is in, on or outside of a circle.
 // param {[float]} pt The point to test. An array of two floats - x and y coordinates.
 // param {[float]} center The circle center. An array of two floats - x and y coordinates.
 // param {float} r The circle radius.
 // returns {-1 | 0 | 1} -1 if the point is inside, 0 if it is on and 1 if it is outside the circle.
 function ptInCircle(px:number,py:number,cx:number,cy:number,r:number)
 {
  const lhs = Math.pow(cx - px, 2) + Math.pow(cy - py, 2);
  const rhs = Math.pow(r, 2);
  return lhs < rhs ? -1 : (lhs === rhs ? 0 : 1);
}
 */


/* function DrawHeart(x:number, y:number)
{
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fill();
} */

/* function legacyFileOpen()
{
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = function () {
      input.files![0].arrayBuffer().then(function (arrayBuffer)
      {
          console.log(new TextDecoder().decode(arrayBuffer));
      });
  }
  input.click();
} */


/* function DrawMorda()
{
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
} */

/* function randomInt(max:number,min:number)
{
  let minV = Math.ceil(min);
  let maxV = Math.floor(max);
  return Math.floor(Math.random() * (maxV-minV+1))+minV;
} */

/* function RandomColor()
{
  let r = randomInt(0,255);
  let g = randomInt(0,255);
  let b = randomInt(0,255);
  let a = 255;
  //let colorString = 'rgb('+r+','+g+','+b+')';
  return [r,g,b,a];
} */



/* export function Build_XML()
{
  save_XML =  "<?xmlconfig>";
	save_XML += "<sTempAlarmuGlowica>" + "</sTempAlarmuGlowica>";
	save_XML += "<sTempAlarmuBeczka>" +  "</sTempAlarmuBeczka>";
	
	var input = auto_data_save.HisterezaG_close;
	if(input < 0.1 || input > 2) input = 0.3;
  save_XML += "<sHisterezaT_close>" + input.toString +  "</sHisterezaT_close>";	
    
    
  input = auto_data_save.HisterezaG_open;
  if(input < 0 || input > 5) input = 0.5;
  save_XML += "<sHisterezaT_open>" + input.toString + "</sHisterezaT_open>";
    
  input = auto_data_save.TempTermostat_start
  if(input < 0 || input > 120) input = 40;
  save_XML += "<sTempTermostat_start>" + input.toString + "</sTempTermostat_start>";
    
  input = auto_data_save.TempTermostat_stop;
  if(input < 0 || input > 120) input = 60;
  save_XML += "<sTempTermostat_stop>" + input.toString  + "</sTempTermostat_stop>";

  save_XML += "<sMocGrzaniaG1>" + auto_data_save.MocGrzaniaG1.toString + "</sMocGrzaniaG1>";
  save_XML += "<sMocGrzaniaG2>" + auto_data_save.MocGrzaniaG2.toString  + "</sMocGrzaniaG2>";
  save_XML += "<sMocGrzaniaG3>" + auto_data_save.MocGrzaniaG3.toString  + "</sMocGrzaniaG3>";
     
 

}
 */








/* function bytesToString(bytes:number[])
{
  var chars = [];
  for(var i = 0, n = bytes.length; i < n;)
  {
      //chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
  }
  return String.fromCharCode.apply(null, chars);
}

function stringToBytes(str:string)
{
  var bytes:number[] = [];
  for(var i = 0, n = str.length; i < n; i++)
  {
      var char:number = str.charCodeAt(i);
      //bytes.push(char >>> 8, char & 0xFF);
      bytes.push(char);
  }
  return bytes;
} */








// let txt_height2 = MeasureTextHeight(ctx.font, this.font_size);
    


/* export function EncryptDecrypt(textToEncrypt:String)
{
  key = 48;
  StringBuilder inSb = new StringBuilder(textToEncrypt);
  StringBuilder outSb = new StringBuilder(textToEncrypt.length());
  char c;
  for (int i = 0; i < textToEncrypt.length(); i++)
   {
      c = inSb.charAt(i);
      c = (char)(c ^ key);
      outSb.append(c);
   }
   return outSb.toString();
} */




/* function EncryptString(str:string)
{
  var bytes_ar = stringToBytes(str);
  var str_out:string = "";
  for(var i:number = 0; i < bytes_ar.length;i++)
  {
    bytes_ar[i] = bytes_ar[i] * 2;
    const char = String.fromCharCode(bytes_ar[i]);
    str_out += char;
  }
return str_out;
}

function DecryptString(str:string)
{
  var bytes_ar = stringToBytes(str);
  var str_out:string = "";
  for(var i:number = 0; i < bytes_ar.length;i++)
  {
    bytes_ar[i] = bytes_ar[i] / 2;
    const char = String.fromCharCode(bytes_ar[i]);
    str_out += char;
  }
return str_out;
} */






  // console.log("posx: " + posx);
  // console.log("posy: " + posy);






/* function GetCanvasAtResoution(newWidth:number)
  {
    if (canvas.width != newWidth)
    {
       var scaleMultiplier = newWidth / canvas.width;
       var objects = canvas.getObjects();
       for (var i in objects) {
                    objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
                    objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
                    objects[i].left = objects[i].left * scaleMultiplier;
                    objects[i].top = objects[i].top * scaleMultiplier;
                    objects[i].setCoords();
                }

                canvas.setWidth(canvas.getWidth() * scaleMultiplier);
                canvas.setHeight(canvas.getHeight() * scaleMultiplier);
                canvas.renderAll();
                canvas.calcOffset();
            }
 return canvas.toDataURL();
} */
 

/* function setPixel(imageData, pixelData) {
  var index = (pixelData.x + pixelData.y * imageData.width) * 4;
    imageData.data[index+0] = pixelData.r;
    imageData.data[index+1] = pixelData.g;
    imageData.data[index+2] = pixelData.b;
    imageData.data[index+3] = pixelData.a;
}

element = document.getElementById("qrCode");
c = element.getContext("2d");

pixcelSize = 4;
width = element.width;
height = element.height;


imageData = c.createImageData(width, height);

for (i = 0; i < 1000; i++) {
  x = Math.random() * width / pixcelSize | 0; // |0 to Int32
  y = Math.random() * height / pixcelSize| 0;

  for(j=0;j < pixcelSize; j++){
    for(k=0;k < pixcelSize; k++){
     setPixel( imageData, {
         x: x * pixcelSize + j,  
         y: y * pixcelSize + k,
         r: 0 | 0,
         g: 0 | 0,
         b: 0 * 256 | 0,
         a: 255 // 255 opaque
       });
      }
  }
} 

c.putImageData(imageData, 0, 0);

*/

/* enum TestStatus {
  Available,     // 0
  Ready,         // 1
  Started,       // 2
}

class Test {
  status: TestStatus
}

var test = new Test();
test.status = TestStatus.Available;  */



   //DrawColumnImg();
  /*  console.log("cx: " + col_img_x + " " + "cy: " + col_img_y + " " + "cw: " + col_img_w); 
   let imgData = ctx.getImageData(col_img_x,
                                  col_img_y,
                                  col_img_w,
                                  col_img_h);
   let row:number = 0; 
   let col:number = 0; 
   let found:boolean = false; 

   for (row = col_img_x; row < col_img_h; row++)
   {
    for (col = col_img_y; col < col_img_w; col++)
    {
    //find current pixel
    let index = (col + (row * imgData.width)) * 4;
    //separate into color values
    let r = imgData.data[index];
    let g = imgData.data[index + 1];
    let b = imgData.data[index + 2];
    let a = imgData.data[index + 3];
    
    if (r == 4 &&  g == 63 && b == 19)
    {
        //console.log("zielony");
        fnd_x = row;
        fnd_y = col
        found = true;
        break;
    }


    console.log("fx: " + fnd_x + " " + "fy: " + fnd_y); 
  

    //console.log("zielony");
    //return new values to data
    //imgData.data[index] = 100;
    //imgData.data[index+1] = g;
    //imgData.data[index+2] = b;
    //imgData.data[index+3] = a;
    } 

    if(found == true) break;

   } */

/* 
   const canvas = document.querySelector( "canvas" );
const ctx = canvas.getContext( "2d" );

ctx.font = "50px Arial";
// the text position
const x = 50, y = 50;
// the text to draw
const str = "Hello yyyqqqppp";
// the characters to find
const chars_to_find = [ "o", "y", "p" ];

ctx.strokeStyle = "red";

// get the index of every characters we're interested in
const chars_indice = [];
for ( let i = 0; i < str.length; i++ ) {
  if ( chars_to_find.includes( str[ i ] ) ) {
    chars_indice.push( i );
  }
}
//iterate through the characters list
for ( let i = 0; i < chars_indice.length; i++ ) {
  const previous_text = str.substring( 0, chars_indice[ i ] );
  const previous_text_width = ctx.measureText( previous_text ).width;
  const char = str.substring( chars_indice[ i ], chars_indice[ i ] + 1 );
  const char_bbox = getTextBBox( ctx, char );

  const left = previous_text_width + char_bbox.left;
  const { top, width, height } = char_bbox;
  const half_line = ctx.lineWidth / 2;
  // draw the rect
  ctx.strokeRect( left + x - half_line, top + y - half_line, width + ctx.lineWidth, height + ctx.lineWidth);
}
// draw our text
ctx.fillText( str, x, y );

function getTextBBox( ctx, text ) {
  const metrics = ctx.measureText( text );
  const left = metrics.actualBoundingBoxLeft * -1;
  const top = metrics.actualBoundingBoxAscent * -1;
  const right = metrics.actualBoundingBoxRight;
  const bottom = metrics.actualBoundingBoxDescent;
  // actualBoundinBox... excludes white spaces
  const width = text.trim() === text ? right - left : metrics.width;
  const height = bottom - top;
  return { left, top, right, bottom, width, height };
} */
