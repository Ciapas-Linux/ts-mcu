
import { AutoData } from './AutoData';
import { MainScreen } from './MainScreen';
import { Options } from './Options';
import { MessageBox } from './MessageBox';
import { MessageBoxTimeOut } from './MessageBoxTimeOut';
import fileDialog from 'file-dialog'

//import Chart from 'chart.js'
import Load from 'audio-loader';
import Play from 'audio-play';

//compression str...
//var usx = require("unishox2.siara.cc/unishox2.js");


export const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Data byte64 encoded
var sound_bt_over = {
    "audio":"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"
  };
  
var sound_alert = {
    "audio":"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"
  };

let StatusTXT:string = "";
let TxtStatus:string = "";
let draw_status = false;
//let TXTmessage:string = "<?xml version='1.0' encoding='UTF-8'?><datafeeder><tempkolumna>17.4</tempkolumna><tempbeczka>16.9</tempbeczka><tempglowica>17.3</tempglowica><sTempModWoda>0.0</sTempModWoda><sTempModBufor>0.0</sTempModBufor><sTempModWolny>0.0</sTempModWolny><sTempStopRozgrzewania>80.5</sTempStopRozgrzewania><sTempStopPogonu>99.0</sTempStopPogonu><tempdnia>0.0</tempdnia><sTempAlarmuBeczka>105.0</sTempAlarmuBeczka><sTempAlarmuGlowica>70.0</sTempAlarmuGlowica><sCzasProcesuGodz>0</sCzasProcesuGodz><sCzasProcesuMin>0</sCzasProcesuMin><sCzasProcesuSek>0</sCzasProcesuSek><sZaworGonu>OFF</sZaworGonu><sZaworWoda>OFF</sZaworWoda><sZaworPlukanie_OLM_m>OFF</sZaworPlukanie_OLM_m><sZaworGlowica_m>OFF</sZaworGlowica_m><sZaworPrzedgon_m>OFF</sZaworPrzedgon_m><Start>false</Start><sSSID>brak</sSSID><sPASS>brak</sPASS><sWIFI_MODE>0</sWIFI_MODE><sHisterezaT_close>1.00</sHisterezaT_close><sHisterezaT_open>0.50</sHisterezaT_open><sWIFI_SIGNAL>-58</sWIFI_SIGNAL><sESP_MILLIS>1</sESP_MILLIS><sStart>Stop</sStart><sStatus>OK</sStatus><sPower1>OFF</sPower1><sPower2>OFF</sPower2><sPower3>OFF</sPower3><sMocGrzaniaG1>1500</sMocGrzaniaG1><sMocGrzaniaG2>2000</sMocGrzaniaG2><sMocGrzaniaG3>2500</sMocGrzaniaG3><sTermostat>OFF</sTermostat><sTempTermostat_stop>72.0</sTempTermostat_stop><sTempTermostat_start>70.0</sTempTermostat_start><sCzasZakonczeniaGon>20</sCzasZakonczeniaGon><sHeat_K1>1</sHeat_K1><sHeat_g1_k1>1</sHeat_g1_k1><sHeat_g2_k1>0</sHeat_g2_k1><sHeat_g3_k1>0</sHeat_g3_k1><sHeat_K2>1</sHeat_K2><sHeat_g1_k2>1</sHeat_g1_k2><sHeat_g2_k2>1</sHeat_g2_k2><sHeat_g3_k2>0</sHeat_g3_k2><sHeat_K3>1</sHeat_K3><sHeat_g1_k3>1</sHeat_g1_k3><sHeat_g2_k3>1</sHeat_g2_k3><sHeat_g3_k3>1</sHeat_g3_k3><sEtap>0</sEtap><sAktZalanie>0</sAktZalanie><sPresureBMP>0</sPresureBMP><sCisnienieZalania_1>680.8</sCisnienieZalania_1><sCisnienieZalania_2>776.5</sCisnienieZalania_2><sCisnienieZalania_3>982.9</sCisnienieZalania_3><sPrzerwaZalania_1>300</sPrzerwaZalania_1><sPrzerwaZalania_2>300</sPrzerwaZalania_2><sPrzerwaZalania_3>300</sPrzerwaZalania_3><sCzasZalania_1>480</sCzasZalania_1><sCzasZalania_2>300</sCzasZalania_2><sCzasZalania_3>180</sCzasZalania_3><sCzasStabilizacji>900</sCzasStabilizacji><sCzasStabilizacjiPrzedgonu>300</sCzasStabilizacjiPrzedgonu><sCzasPlukanieOLM>300</sCzasPlukanieOLM><sCzasChlodzeniaGlow>300</sCzasChlodzeniaGlow><sCyklePrzedgonu>10</sCyklePrzedgonu><sCzasOtwarciaZPrzedgonu>5</sCzasOtwarciaZPrzedgonu><sCzasZamknieciaZPrzedgonu>5</sCzasZamknieciaZPrzedgonu><sAutomat_Status>10</sAutomat_Status><sModule>OFF</sModule></datafeeder>"
let TXTmessage:string = "esp8266;16.7;16.2;16.7;0.0;0.0;0.0;80.0;99.0;0.0;105.0;70.0;0;0;0;OFF;OFF;OFF;OFF;OFF;YnJhawAAIUA=;YnJhawAAIUA=;0;-65;1.00;0.50;1;OK;OFF;OFF;OFF;1500;2000;2500;OFF;72.0;70.0;20;1;1;0;0;1;1;1;0;1;1;1;1;0;0;0;788;877;993;300;300;300;480;300;180;900;300;300;300;5;5;5;10;0;OFF";


//Wifi
let connection:any;
let reconnect_cntr = 0;
let attempts = 1;
let gESP_MILLIS = 10;
let gLAST_ESP_MILLIS = 0;
var online = false;

//Screen
export var ScreenOrientation:string = "--";
export var ScreenSize:string = "--";
export let deviceWidth = window.innerWidth; 
export let deviceHeight = window.innerHeight;
var ScreenName:string = "columna";
let mobile = false;

// blink
let BlinkDiode = false;


// Status
let Automat_Status:number = 0;

// Mouse
let MousePos = { x:0, y:0 };
export type TextValue = number | string


// sterownik
// #define EZ_WODA      P2  
// #define EZ_GON       P5   //  kolumna
// moduł
// #define EZ_GLOWICA   100  //  głowica  pogon
// #define EZ_PRZEDGON  101  //  głowica przedgon
// #define EZ_PLUK_OLM  102  //  kolumna


// Sterownik
let Etap = 0;
let AUTO_start = false;
let error = false;


// Alarmy
export let AlarmTZ = false;
export let AlarmTG = false;
export let AlarmTZG = false;

// termostat
let termostat = false;
let TxtTermostat:string = "";


// Main data struct
export var auto_data:AutoData;
export var auto_data_save:AutoData;


// Menu Screen
//export var menu_screen:Menu;
// Main screen column view
var main_screen:MainScreen;
// rozgrzewanie options  view
var options_screen:Options;
// messageBox
var MsgBox:MessageBox;
// messagebox based on time events
var MsgBoxTout:MessageBoxTimeOut;

export var save_XML:string = "";

var BlinkWifi:boolean = false;

function MainLoop()
{
        // random data for testing
        /* let rnd1:number = randomNumber(0,135);
        let rnd2:number = randomNumber(0,135);
        let rnd3:number = randomNumber(0,135);
        let rnd4:number = randomNumber(0,135);
        let rnd5:number = randomNumber(0,135);
        let rnd6:number = randomNumber(0,135);
        auto_data.TempModBufor = rnd1.toPrecision(4);
        auto_data.TempBeczka = rnd2.toPrecision(4);
        auto_data.TempGlowica = rnd3.toPrecision(4);
        auto_data.TempKolumna = rnd4.toPrecision(4);
        auto_data.TempModWoda =  rnd5.toPrecision(4);
        auto_data.TempModWolny = rnd6.toPrecision(4); */
}

export function Init()
{
  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;
  canvas.style.width = deviceWidth + "px";
  canvas.style.height = deviceHeight + "px";
  canvas.width = deviceWidth;
  canvas.height = deviceHeight;

  ScreenOrientation = GetOrientation();
  ScreenSize = DetectScreenSize();

  const txt_size = `Width: ${deviceWidth},Height: ${deviceHeight}`;
  console.log("Startup screen size:");
  console.log(txt_size);
  console.log(ScreenOrientation);
 
  if(mobile == true)
  {
    console.log("mobile device");
  }else{
    console.log("not mobile device");
  }

  // automata data structure
  auto_data = new AutoData;
  auto_data_save = new AutoData;

  document.body.style.cursor = 'default';

  // column screen
  main_screen = new MainScreen(0,0,10,'rgb(11,214,0)','rgb(22,92,3)');
  main_screen.Hide();
    
  // options manager screen
  options_screen = new Options(15);
  options_screen.Hide();

  // MsgBox OK
  MsgBox = new MessageBox("dupa jasio !!!",10,15,'rgb(11,214,0)','rgb(22,92,3)');
  MsgBox.Hide();

  // MsgBox time based
  MsgBoxTout = new MessageBoxTimeOut("dupas",10,15,'rgb(11,214,0)','rgb(22,92,3)');
  MsgBoxTout.Hide();

 
  canvas.addEventListener('click', on_click);
  canvas.addEventListener('mousemove',on_mousemove);	 
  canvas.addEventListener("touchstart", on_touch);

  window.addEventListener('resize',on_UpdateSize);
  window.addEventListener('orientationchange', on_UpdateSize);
  window.addEventListener("visibilitychange", on_VisibilityChange);

  // ctx.imageSmoothingEnabled = false
  // screen.orientation.unlock();

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
   mobile = true;
   }else
  {
    mobile = false;
  }

  DataUpdate2();
  ClearCanvas();
  Intro();

  //setTimeout(setupWebSocket,500); 
  //setInterval(NetCheckConnection, 5000);
  
  setTimeout(Loading, 100);
  
  //setInterval(MainLoop, 1000);

  console.log("Sterowanie Destylatorem v2.0");
 
 
  
  // var dupa:string = EncryptString(TXTmessage);
  // console.log(dupa);
  // var dupa:string = DecryptString(dupa);
  // console.log(dupa);
  // var ass:string = str_compress("a huj ciii w dupasa!");
  // console.log(ass);
 
    
}

function str_compress(message:string)
{
  let compressedString = ""
  let messageArray = message.split("")
  for (let i = 0; i < messageArray.length; i++){
    let count = 1
    let currentLetter = messageArray[i]
    while (i < messageArray.length - 1 && messageArray[i] === messageArray[i + 1]){
      count++
      i++
    }
    if (count === 1){
      compressedString += currentLetter
    } else {
      compressedString += currentLetter + count
    }
  }
  return compressedString
}

function EncryptString(str:string)
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
}

function Loading()
{
  if(main_screen.img_loaded == true)
  {
    setTimeout(function() {Load('data:audio/mpeg;base64, '+ sound_bt_over["audio"]).then(Play);}, 700);
    main_screen.Show();
    //main_screen.draw();
    UpdateCanvas(false);
  }else
  {
    setTimeout(Loading, 100);
    console.log("Loading.....");
  }
}

function Intro()
{
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgb(202,205,255)';
  ctx.font = `${22}px Arial`;
  ctx.fillText("Sterowanie Destylatorem v2.0",deviceWidth/2,deviceHeight/2.2);
  ctx.fillText("L-O-A-D-I-N-G",deviceWidth/2,deviceHeight/2);
  ctx.textAlign = 'left';
}

// MAIN CLICK EVENT
function on_click(ev:any)
{
  let rect:DOMRect = canvas.getBoundingClientRect();
	MousePos.x = ev.clientX - rect.left;
	MousePos.y = ev.clientY - rect.top;


  if(MsgBox.visible == true)
  {
    let result = MsgBox.OnClick(MousePos.x,MousePos.y);
    if(result == "OK")
    {
      MsgBox.Hide();
      UpdateCanvas(true);
    }
    return;
  }

  if(MsgBoxTout.visible == true)
  {
   return;
  }

  switch(ScreenName)
  {
      case "columna":
      {
        let result = main_screen.OnClick(MousePos.x,MousePos.y);

        if(result == "options")
        {
          main_screen.Hide();
          options_screen.Show();
          ScreenName = "options";
          UpdateCanvas(true);
        }
  
        // click Man button and show askbox
        if(result == "man")
        {
          MsgBox.Show();
          setTimeout(play_alert, 1000);
          UpdateCanvas(true);
          return;
        }
        
        if(result == "start")
        {
          MsgBoxTout.Show("a co to jest?",4000);
          setTimeout(play_alert, 1000);
          UpdateCanvas(true);
          return;
        }

        if(result == "stop")
        {
          UploadFile();
          //legacyFileOpen();
          //MsgBoxTout.Show("a co to jest?",4000);
          //setTimeout(play_alert, 1000);
          UpdateCanvas(true);
          return;
        }
      }
      break;
      
      case "options":
      {
        let result = options_screen.OnClick(MousePos.x,MousePos.y);   
     
        if(result == "OK")
        {
          options_screen.Hide();
          main_screen.Show();
          ScreenName = "columna";
          UpdateCanvas(true);
        }
       
      }
      break;

       
  }
  
}

function legacyFileOpen()
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
}

function UploadFile()
{
  fileDialog()
    .then(file => {
        const data = new FormData();
        data.append('file', file[0]);
        //data.append('imageName', 'flower');

        console.log("wysyłanie pliku:"+ file[0]);

        var xhr = new XMLHttpRequest();
 
        xhr.upload.onprogress = function(e)
        {
            var percentComplete = (e.loaded / e.total) * 100;
            //progressBar.value = percentComplete;
        };
 
        xhr.onload = function()
        {
            if (xhr.status == 200)
            {
                alert("Sukces! Wysłano plik!");
            } else {
                alert("Błąd! Wysłanie pliku nie powiodło się!");
            }
        };

        xhr.onerror = function()
        {
            alert("Błąd! Nie można połączyć się ze sterownikiem!");
        };
     
        //progressBar.value = 0;
        xhr.open("POST", "/dupa", true);
        xhr.setRequestHeader("Content-Type", file[0].type);
        xhr.send(file[0]);

        // Post to server
        /* fetch('/dupa', {
            method: 'POST',
            body: data
        }); */
    });
 


  /* const onClick = async () => {
    // open file select dialog and waiting user selection then return FileList object.
    const fileList = await fileDialog()
  } */
}

function on_mousemove(evt:any)
{
  let rect:DOMRect  = canvas.getBoundingClientRect();
	let MouseX  = evt.clientX - rect.left;
	let MouseY  = evt.clientY - rect.top;

  if(MsgBox.visible == true)
  {
    MsgBox.OnMouseMove(MouseX,MouseY);
  return;
  }

  switch(ScreenName)
  {
      case "columna":
      {
        main_screen.OnMouseMove(MouseX,MouseY);
      }
      break;
      
      case "options":
      {
        options_screen.OnMouseMove(MouseX,MouseY);
      }
      break;
     
  }
}

function InsideRect(x:number , y:number, rect:any)
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

function GetTouchPos(canvasDom:any, touchEvent:any)
{
  let rect = canvasDom.getBoundingClientRect();
  return  {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

function on_touch(ev:any)
{
  MousePos = GetTouchPos(canvas, ev);
	var touch = ev.touches[0];
	var mouseEvent = new MouseEvent("mousedown", {clientX: touch.clientX, clientY: touch.clientY });
  canvas.dispatchEvent(mouseEvent);
}

function on_VisibilityChange()
{
  if (document.hidden)
  {
    //do whatever you want
    console.log("Hidden");
  }
  else {
    //do whatever you want
    console.log("SHOWN");
  }
}

function DrawBox(x:number, y:number, w:number, h:number, color = 'rgb(232,32,0)')
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

function DrawHeart(x:number, y:number)
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
}

function DrawInfoBox(x:number, y:number)
{
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();
}

export function DrawCircle(x:number,y:number,line:number,radius:number,color1 = 'rgb(255,242,0)',color2 = 'rgb(255,2,0)')
{
	  
}

export function DrawRoundedBox(x:number, y:number, w:number, h:number, r:number,color = 'rgb(232,32,0)')
{
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.fill();        
 }

 export function DrawRoundedRect(x:number, y:number, width:number, height:number, radius:number,color = 'rgb(232,32,0)')
 {
        ctx.fillStyle = color; 
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
}

export function UpdateCanvas(once:boolean)
{
  //DataUpdate();

  switch(ScreenName)
  {
      case "columna":
      {
        main_screen.draw();
      }
      break;
      
      case "options":
      {
        options_screen.draw();
      }
      break;
      
  }

   DrawInfo();
   MsgBox.draw();
   MsgBoxTout.draw(); 

   
  if(once == false) setTimeout(UpdateCanvas,500,once);
}

// finds the distance between points
export function DistanceBeetwenPoints(x1:number,y1:number,x2:number,y2:number)
{
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

export function DrawText(textv: string,
                tx:number,
                ty: number,
                fontSize: number,
                color = 'rgb(32,32,0)')
{
    ctx.textBaseline = 'middle'  
    ctx.fillStyle = color
    ctx.font = `${fontSize}px Arial`
    ctx.fillText(textv,tx,ty)
}

function DrawInfo()
{
 // DrawCircle(deviceWidth/4,deviceHeight/4,5,20,'#FFF200','red');

  let str_info = "SW: "
  str_info += deviceWidth
  str_info += "  SH: "
  str_info += deviceHeight

  let txt_height = MeasureTextHeight(ctx.font, 16);
  let txt_width = ctx.measureText("S").width; 

  DrawText(str_info,deviceWidth/2,deviceHeight/2,16,'rgb(255,255,255)')
  DrawText("Or: " + ScreenOrientation,deviceWidth/2,deviceHeight/2 + txt_height,16,'rgb(255,255,255)')
  DrawText("Size: " + ScreenSize,deviceWidth/2,deviceHeight/2 + txt_height*2,16,'rgb(255,255,255)')
  DrawText("sN: " + ScreenName,deviceWidth/2,deviceHeight/2 + txt_height*3,16,'rgb(255,255,255)')
  
  
  
  //DrawRoundedRect(500, 400, 120, 120, 5);
  
  //DrawBox(456, 334, 56, 77, 'rgb(232,32,0)');

  //DrawMorda();

}

function DrawMorda()
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
}

function on_UpdateSize()
{
  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;
  canvas.style.width = deviceWidth + "px";
  canvas.style.height = deviceHeight + "px";
  canvas.width = deviceWidth;
  canvas.height = deviceHeight;

  ScreenOrientation = GetOrientation();
  ScreenSize = DetectScreenSize();

  const text = `Width: ${deviceWidth},Height: ${deviceHeight}`;
  console.log("Resize screen:");
  console.log(text);
  console.log(ScreenOrientation);
 
  if(mobile == true)
  {
    console.log("mobile dev");
  }else{
    console.log("not mobile dev");
  }

  main_screen.resize();
  options_screen.resize();
 
  UpdateCanvas(true); // call only once
}

export function ClearCanvas()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function GetOrientation()
{
  if(canvas.height > canvas.width + (canvas.width/2))
  {
    return "portrait";
  }	
	
  if (canvas.width > canvas.height + (canvas.height/2))
  {
	  return "landscape";
  } 
  
  if (canvas.width == 810 && canvas.height == 1080)
 {
	  return "ipad";
  } 
  
   if (canvas.width == 820 && canvas.height == 1180)
 {
	  return "ipad";
  } 
  
   if (canvas.width == 768 && canvas.height == 1024)
  {
		  return "ipad";
  } 
  
   return 'unknown';
}

export function DetectScreenSize()
{

      if(canvas.width <= 350)
      {
          return "sextrasmall";
      }	

        /* Extra small devices (phones, 600px and down) */
      //@media only screen and (max-width: 600px) {...}
      if(canvas.width < 600)
      {
          return "extrasmall";
      }	

      /* Small devices (portrait tablets and large phones, 600px and up) */
      //@media only screen and (min-width: 600px) {...}
      if(canvas.width >= 600 && canvas.width <= 768)
      {
          return "small";
      }	

      /* Medium devices (landscape tablets, 768px and up) */
      //@media only screen and (min-width: 768px) {...}
      if(canvas.width >= 768 && canvas.width <= 992)
      {
          return "medium";
      }	

      /* Large devices (laptops/desktops, 992px and up) */
      //@media only screen and (min-width: 992px) {...}
      if(canvas.width >= 992 && canvas.width <= 1200)
      {
          /* Extra large devices and slim szeroki i cienki ekran */
          if(canvas.width > canvas.height*3)
          {
              return "extral_w_slim";
          }	
          return "large";
      }	

      /* Extra large devices (large laptops and desktops, 1200px and up) */
      //@media only screen and (min-width: 1200px) {...} 
      if(canvas.width > 1200 )
      {
          return "extralarge";
      }	

      return "undefined";
}

export function play_button()
{

  Load('data:audio/mpeg;base64, '+ sound_bt_over["audio"]).then(Play);

  /* audio2.pause();
	audio2.loop = false;
  audio2.volume = 1.0;
		let promise = audio2.play();
	if (promise)
	{
		 promise.catch(function(error) { console.error(error);
		 });
	} */
}

export function play_alert()
{
  Load('data:audio/mpeg;base64, '+ sound_alert["audio"]).then(Play);
}

function setupWebSocket()
{
  // port był 81 a na nowej biblio 3000
connection = new WebSocket('ws://'+location.hostname+':81/', ['arduino']);
//connection.binaryType = 'arraybuffer';
//const connection = new WebSocket('ws://'+location.hostname+':8080');
connection.onopen = function()
{
  reconnect_cntr++;
  connection.send('Connect ' + new Date());
  console.log('I succesfull connected to ws esp server ...');
  attempts = 1;
  online = true;
  main_screen.DiodeWifi.On(); 
};
connection.onerror = function(error:any)
{
	online = false;
	console.log('WebSocket Error: ', error);
	connection.close();
  main_screen.DiodeWifi.Off(); 
	
};
connection.onclose = function(error:any)
{
	online = false;
  main_screen.DiodeWifi.Off(); 
  console.log('connection closed ...', error);
  console.log('I try reconect to ws esp server...');
  setupWebSocket();
};
connection.onmessage = function(msg:any)
{

  var data = msg.data;
  var dv = new DataView(data);
  var dt1 = dv.getFloat32(0);
  console.log(dt1);

 //TXTmessage = msg.data;
 //TXTmessage = usx.unishox2_decompress_simple(msg.data,msg.length);
 //console.log(TXTmessage);
 DataUpdate2();
};
}

function Grzanie()
{
	if(connection != null)
	{
		connection.send("Gxxx");
		DrawStatusLine("Włączono grzałkę");
		play_button();
	}
}

function DrawStatusLine(status:any)
{
	draw_status = true;
	StatusTXT = status;
	setTimeout(function(){ draw_status = false; }, 3000);
}

export function MeasureTextHeight(fontFamily:any, fontSize:number) 
{
    let text = document.createElement('span');
    text.style.fontFamily = fontFamily;
    text.style.fontSize = fontSize + "px";
    text.textContent = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    document.body.appendChild(text);
    let result = text.getBoundingClientRect().height;
    document.body.removeChild(text);
    return result;
}

function DataUpdate2()
{
		if(TXTmessage.startsWith("esp8266;") == true)
		{
			  
         let txt_arr = TXTmessage.split(';');

         auto_data.TempKolumna = txt_arr[1];
			   auto_data.TempBeczka  = txt_arr[2];
			   auto_data.TempGlowica = txt_arr[3];

			   auto_data.TempModWoda  = txt_arr[4];
			   auto_data.TempModBufor = txt_arr[5];
			   auto_data.TempModWolny = txt_arr[6];	

         auto_data.TempStopRozgrzewania = parseFloat(txt_arr[7]);
         auto_data.TempStopPogonu = parseFloat(txt_arr[8]);
         auto_data.TempDnia = txt_arr[9];

         auto_data.TempAlarmuBeczka = txt_arr[10];
         auto_data.TempAlarmuGlowica = txt_arr[11];

         auto_data.CzasGodz = parseInt(txt_arr[12],10);
         auto_data.CzasMin  = parseInt(txt_arr[13],10);
         auto_data.CzasSek  = parseInt(txt_arr[14],10);

         auto_data.ZaworGonu = txt_arr[15];
         auto_data.ZaworWoda = txt_arr[16];
         
         auto_data.ZaworPlukanie_OLM_m = txt_arr[17];
         auto_data.ZaworGlowica_m = txt_arr[18];
         auto_data.ZaworPrzedgon_m = txt_arr[19];

         auto_data.WIFI_SSID = txt_arr[20];
         auto_data.WIFI_PASS = txt_arr[21];
         auto_data.WIFI_MODE = parseInt(txt_arr[22],10);
         auto_data.WIFI_RSSI = parseInt(txt_arr[23],10);


         auto_data.HisterezaT_close = parseFloat(txt_arr[24]);
         auto_data.HisterezaT_open = parseFloat(txt_arr[25]);
         
         auto_data.ESP_CNTR = parseInt(txt_arr[26],10);
         auto_data.Status = txt_arr[27];

         // POWER G1  ON OFF booleany
         if(txt_arr[28] == "ON")
         {
          auto_data.G1 = true;
          main_screen.DiodeG1.On();
         }else
         {
          auto_data.G1 = false;
          main_screen.DiodeG1.Off();
         }

         // G2
         if(txt_arr[29] == "ON")
         {
          auto_data.G2 = true;
          main_screen.DiodeG2.On();
         }else
         {
          auto_data.G2 = false;
          main_screen.DiodeG2.Off();
         }

         // G3
         if(txt_arr[30] == "ON")
         {
          auto_data.G3 = true;
          main_screen.DiodeG3.On();
         }else
         {
          auto_data.G3 = false;
          main_screen.DiodeG3.Off();
         }
        

         // WATT G1 G2 G3:
         auto_data.MocGrzaniaG1 = parseInt(txt_arr[31],10);
         auto_data.MocGrzaniaG2 = parseInt(txt_arr[32],10);
         auto_data.MocGrzaniaG3 = parseInt(txt_arr[33],10);


         // TERMOSTAT:
         auto_data.Termostat_status = txt_arr[34];
         auto_data.TempTermostat_stop = parseFloat(txt_arr[35]);
         auto_data.TempTermostat_start = parseFloat(txt_arr[36]);
         

         auto_data.CzasZakonczeniaGon = parseInt(txt_arr[37],10);


         auto_data.Heat_K1 = txt_arr[38];
         auto_data.Heat_g1_k1 = txt_arr[39];
         auto_data.Heat_g2_k1 = txt_arr[40];
         auto_data.Heat_g3_k1 = txt_arr[41];

         auto_data.Heat_K2 = txt_arr[41];
         auto_data.Heat_g1_k2 = txt_arr[42];
         auto_data.Heat_g2_k2 = txt_arr[43];
         auto_data.Heat_g3_k2 = txt_arr[44];

         auto_data.Heat_K2 = txt_arr[45];
         auto_data.Heat_g1_k3 = txt_arr[46];
         auto_data.Heat_g2_k3 = txt_arr[47];
         auto_data.Heat_g3_k3 = txt_arr[48];

         auto_data.ETAP = parseInt(txt_arr[49],10);

         auto_data.AktZalanie = parseInt(txt_arr[50],10);

         auto_data.PresureBMP = parseInt(txt_arr[51],10);

         auto_data.CisnienieZalania_1 = parseInt(txt_arr[52],10);
         auto_data.CisnienieZalania_2 = parseInt(txt_arr[53],10);
         auto_data.CisnienieZalania_3 = parseInt(txt_arr[54],10);

         auto_data.PrzerwaZalania_1 = parseInt(txt_arr[55],10);
         auto_data.PrzerwaZalania_2 = parseInt(txt_arr[56],10);
         auto_data.PrzerwaZalania_3 = parseInt(txt_arr[57],10);

         auto_data.CzasZalania_1 = parseInt(txt_arr[58],10);
         auto_data.CzasZalania_2 = parseInt(txt_arr[59],10);
         auto_data.CzasZalania_3 = parseInt(txt_arr[60],10);
         
         auto_data.CzasStabilizacji = parseInt(txt_arr[61],10);
         auto_data.CzasStabilizacjiPrzedgonu = parseInt(txt_arr[62],10);
         auto_data.CzasPlukanieOLM = parseInt(txt_arr[63],10);

         auto_data.CzasChlodzeniaGlow = parseInt(txt_arr[64],10);
         auto_data.CyklePrzedgonu = parseInt(txt_arr[65],10);

         auto_data.CzasOtwarciaZPrzedgonu = parseInt(txt_arr[66],10);
         auto_data.CzasZamknieciaZPrzedgonu = parseInt(txt_arr[67],10);

         auto_data.AutoimataStatus = txt_arr[68];

         auto_data.ZaworGonCntr = parseInt(txt_arr[69],10);

         // MODULE bool
         if(txt_arr[70] == "ON")
         {
          auto_data.MODULE = true;
         }else
         {
          auto_data.MODULE = false;
         }
         
       	 // Z-GON			 
     	   if(auto_data.ZaworGonu == "ON")
         {
            main_screen.DiodeZGonu.On();
         }else
         {
            main_screen.DiodeZGonu.Off();
         }
         
         // Z-WODA
     	   if(auto_data.ZaworWoda == "ON")
         {
            main_screen.DiodeZWoda.On();
         }else
         {
            main_screen.DiodeZWoda.Off();
         }

         // Z-OLM
         if(auto_data.ZaworPlukanie_OLM_m == "ON")
         {
            main_screen.DiodeZPlukOlm.On();
         }else
         {
            main_screen.DiodeZPlukOlm.Off();
         }

         // Z-POGON
         if(auto_data.ZaworGlowica_m == "ON")
         {
            main_screen.DiodeZPogon.On();
         }else
         {
            main_screen.DiodeZPogon.Off();
         }
         
         // Z-PRZEDGON
         if(auto_data.ZaworPrzedgon_m == "ON")
         {
            main_screen.DiodeZPrzedgon.On();
         }else
         {
            main_screen.DiodeZPrzedgon.Off();
         }

      		
				if( BlinkDiode == true)
			  {
				 BlinkDiode = false;
			  }else
			  {
				 BlinkDiode = true;
			  }
				
				
        //gESP_MILLIS = parseInt(xmlDoc.getElementsByTagName('sESP_MILLIS')[0].childNodes[0].nodeValue);
				//TxtStatus = xmlDoc.getElementsByTagName('sStatus')[0].childNodes[0].nodeValue;
				//TxtTermostat = xmlDoc.getElementsByTagName("sTermostat")[0].childNodes[0].nodeValue;
			
        UpdateStatus();
  
    }// not xml data

    	
}


function DataUpdate()
{
		if(TXTmessage.startsWith("<?xml") == true)
		{
			   var parser = new DOMParser();
         var xmlDoc:any;
			   if (window.DOMParser)
			   {
					xmlDoc = parser.parseFromString(TXTmessage, "text/xml");
			   }
				else
			   {
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = false;
					xmlDoc.loadXML(TXTmessage);
			   }
         
				 Automat_Status = parseInt(xmlDoc.getElementsByTagName("sAutomat_Status")[0].childNodes[0].nodeValue);

			   auto_data.TempKolumna = xmlDoc.getElementsByTagName("tempkolumna")[0].childNodes[0].nodeValue;
			   auto_data.TempBeczka  = xmlDoc.getElementsByTagName("tempbeczka")[0].childNodes[0].nodeValue;
			   auto_data.TempGlowica = xmlDoc.getElementsByTagName("tempglowica")[0].childNodes[0].nodeValue;

			   auto_data.TempModWoda =  xmlDoc.getElementsByTagName("sTempModWoda")[0].childNodes[0].nodeValue;
			   auto_data.TempModBufor  = xmlDoc.getElementsByTagName("sTempModBufor")[0].childNodes[0].nodeValue;
			   auto_data.TempModWolny = xmlDoc.getElementsByTagName("sTempModWolny")[0].childNodes[0].nodeValue;	

			   auto_data.TempDnia = xmlDoc.getElementsByTagName('tempdnia')[0].childNodes[0].nodeValue;
				 auto_data.TempStopRozgrzewania = xmlDoc.getElementsByTagName('sTempStopRozgrzewania')[0].childNodes[0].nodeValue;
         
         auto_data.CisnienieZalania_1 = xmlDoc.getElementsByTagName('sCisnienieZalania_1')[0].childNodes[0].nodeValue;
         auto_data.CisnienieZalania_2 = xmlDoc.getElementsByTagName('sCisnienieZalania_2')[0].childNodes[0].nodeValue;
         auto_data.CisnienieZalania_3 = xmlDoc.getElementsByTagName('sCisnienieZalania_3')[0].childNodes[0].nodeValue;
         
         auto_data.PrzerwaZalania_1 = xmlDoc.getElementsByTagName('sPrzerwaZalania_1')[0].childNodes[0].nodeValue;
         auto_data.PrzerwaZalania_2 = xmlDoc.getElementsByTagName('sPrzerwaZalania_2')[0].childNodes[0].nodeValue;
         auto_data.PrzerwaZalania_3 = xmlDoc.getElementsByTagName('sPrzerwaZalania_3')[0].childNodes[0].nodeValue;
 
         auto_data.CzasZalania_1 = xmlDoc.getElementsByTagName('sCzasZalania_1')[0].childNodes[0].nodeValue;
         auto_data.CzasZalania_2 = xmlDoc.getElementsByTagName('sCzasZalania_2')[0].childNodes[0].nodeValue;
         auto_data.CzasZalania_3 = xmlDoc.getElementsByTagName('sCzasZalania_3')[0].childNodes[0].nodeValue;
        
         auto_data.AktZalanie = xmlDoc.getElementsByTagName('sAktZalanie')[0].childNodes[0].nodeValue;
        
         auto_data.MODULE = xmlDoc.getElementsByTagName('sModule')[0].childNodes[0].nodeValue;
        
			   auto_data.ZaworGonu = xmlDoc.getElementsByTagName('sZaworGonu')[0].childNodes[0].nodeValue;
			   if(auto_data.ZaworGonu == "ON")
         {
            main_screen.DiodeZGonu.On();
         }else
         {
            main_screen.DiodeZGonu.Off();
         }
         
         auto_data.ZaworWoda = xmlDoc.getElementsByTagName('sZaworWoda')[0].childNodes[0].nodeValue;
			   if(auto_data.ZaworWoda == "ON")
         {
            main_screen.DiodeZWoda.On();
         }else
         {
            main_screen.DiodeZWoda.Off();
         }

         auto_data.ZaworPlukanie_OLM_m = xmlDoc.getElementsByTagName('sZaworPlukanie_OLM_m')[0].childNodes[0].nodeValue;
			   if(auto_data.ZaworPlukanie_OLM_m == "ON")
         {
            main_screen.DiodeZPlukOlm.On();
         }else
         {
            main_screen.DiodeZPlukOlm.Off();
         }

         // pogon
         auto_data.ZaworGlowica_m = xmlDoc.getElementsByTagName('sZaworGlowica_m')[0].childNodes[0].nodeValue;
			   if(auto_data.ZaworGlowica_m == "ON")
         {
            main_screen.DiodeZPogon.On();
         }else
         {
            main_screen.DiodeZPogon.Off();
         }
         
         auto_data.ZaworPrzedgon_m = xmlDoc.getElementsByTagName('sZaworPrzedgon_m')[0].childNodes[0].nodeValue;
			   if(auto_data.ZaworPrzedgon_m == "ON")
         {
            main_screen.DiodeZPrzedgon.On();
         }else
         {
            main_screen.DiodeZPrzedgon.Off();
         }

         //Ciśnienie
         auto_data.PresureBMP = xmlDoc.getElementsByTagName('sPresureBMP')[0].childNodes[0].nodeValue;

        // MOC PERZOKA
				if(xmlDoc.getElementsByTagName("sPower1")[0].childNodes[0].nodeValue == "ON")
				{
				  auto_data.G1 = true;
          main_screen.DiodeG1.On();
          auto_data.MocGrzaniaG1 = parseInt(xmlDoc.getElementsByTagName("sMocGrzaniaG1")[0].childNodes[0].nodeValue);
				}else
				{
					auto_data.G1 = false;
          main_screen.DiodeG1.Off();
					auto_data.MocGrzaniaG1 = 0;
				}
						   
				if(xmlDoc.getElementsByTagName("sPower2")[0].childNodes[0].nodeValue == "ON")
				{
           auto_data.G2 = true;
           main_screen.DiodeG2.On();
				   auto_data.MocGrzaniaG2 = parseInt(xmlDoc.getElementsByTagName("sMocGrzaniaG2")[0].childNodes[0].nodeValue);
				}else
				{
					auto_data.G2 = false;
          main_screen.DiodeG2.Off();
					auto_data.MocGrzaniaG2 = 0;
				}
				   
				if(xmlDoc.getElementsByTagName("sPower3")[0].childNodes[0].nodeValue == "ON")
				{
					auto_data.G3 = true;
          main_screen.DiodeG3.On();
					auto_data.MocGrzaniaG3 = parseInt(xmlDoc.getElementsByTagName("sMocGrzaniaG3")[0].childNodes[0].nodeValue);
				}else
				{
					auto_data.G3 = false;
          main_screen.DiodeG3.Off();
					auto_data.MocGrzaniaG3 = 0;
				}
				
				
				if( BlinkDiode == true)
			  {
				 BlinkDiode = false;
			  }else
			  {
				 BlinkDiode = true;
			  }
				
				// CZAS RABOCZYJ - CZAS ROBOTY - WORK TIME 
				auto_data.CzasGodz = xmlDoc.getElementsByTagName('sCzasProcesuGodz')[0].childNodes[0].nodeValue;
				auto_data.CzasMin = xmlDoc.getElementsByTagName('sCzasProcesuMin')[0].childNodes[0].nodeValue;
				auto_data.CzasSek = xmlDoc.getElementsByTagName('sCzasProcesuSek')[0].childNodes[0].nodeValue;         
			
        if(xmlDoc.getElementsByTagName('sStart')[0].childNodes[0].nodeValue == "Start")
				{
				    AUTO_start = true;
            main_screen.DiodeStart.On();
				}else
				{
				    AUTO_start = false;
            main_screen.DiodeStart.Off()
				}
				 
				gESP_MILLIS = parseInt(xmlDoc.getElementsByTagName('sESP_MILLIS')[0].childNodes[0].nodeValue);
				TxtStatus = xmlDoc.getElementsByTagName('sStatus')[0].childNodes[0].nodeValue;
				TxtTermostat = xmlDoc.getElementsByTagName("sTermostat")[0].childNodes[0].nodeValue;
				Etap = parseInt(xmlDoc.getElementsByTagName('sEtap')[0].childNodes[0].nodeValue);
		
        UpdateStatus();
  
    }// not xml data

    	
}

function UpdateStatus()
{
 
	AlarmTZ  = false;
	AlarmTG  = false;
	AlarmTZG = false;
		
	 if(draw_status == false)
	 {
			 
			 switch(TxtStatus)
			 {
				case "Awaria DS":
		      main_screen.UpdateStatus("Awaria czujnika temperatury 😲");
					error = true;
					play_button(); 
				break;
				
				case "Alarm T.ZG":
					main_screen.UpdateStatus("Alarm temp. zbiornik i głowica 😲");
					error = true;
					 play_button();
					AlarmTZG = true;
				break;
				
				case "Alarm TZ":
				  main_screen.UpdateStatus("Alarm temp. zbiornik 😲");
					error = true;
					 play_button();
					AlarmTZ = true;
				break;
				
				case "Alarm TG":
				  main_screen.UpdateStatus("Alarm temp. głowica 😲");
					error = true;
					play_button();
					AlarmTG = true;
				break;
				
				case "OK":
					if(online == true)
						{
								if(termostat == false)
								{
									if( AUTO_start == false)
									{
									  main_screen.UpdateStatus("OK 😃");
										error = false;
									}else
									{
									  main_screen.UpdateStatus("Tryb automatyczny włączony 😃");
										error = false;
									}
							}else
							{
								  main_screen.UpdateStatus("Termostat właczony 😃");
									error = false;
							}
							
						}else
						{
						  main_screen.UpdateStatus("Brak połączenia ze sterownikiem😲");
							//play_button();
						}	
					
				break;
				
				case "KONIEC":
					main_screen.UpdateStatus("KONIEC 😁");
					play_button();
				break;
				
				default: 
					
				break;
			}
	
      }else
      {
				main_screen.UpdateStatus(StatusTXT);
		  }
}

function randomNumber(min:number, max:number)
{ 
  return Math.random() * (max - min) + min;
}

function randomInt(max:number,min:number)
{
  let minV = Math.ceil(min);
  let maxV = Math.floor(max);
  return Math.floor(Math.random() * (maxV-minV+1))+minV;
}

function RandomColor()
{
  let r = randomInt(0,255);
  let g = randomInt(0,255);
  let b = randomInt(0,255);
  let a = 255;
  //let colorString = 'rgb('+r+','+g+','+b+')';
  return [r,g,b,a];
}


function BlinkDiodes()
{
  if(BlinkWifi == true)
  {
    BlinkWifi = false;
    main_screen.DiodeWifi.Off();

  }else
  {
    BlinkWifi = true;
    main_screen.DiodeWifi.On();
  }
}

function NetCheckConnection()
{
   if(gESP_MILLIS > gLAST_ESP_MILLIS)
   {
      online = true;
      main_screen.DiodeWifi.On(); 
   }else
   {
      online = false;
      //DiodeWifi.Off();
      setTimeout(BlinkDiodes, 500); 
      setupWebSocket();
   }
  gLAST_ESP_MILLIS = gESP_MILLIS;
 }

export function percentage(num:number, per:number)
{
  return (num/100)*per;
}

export function wrapText(text:string, x:number, y:number, maxWidth:number, lineHeight:number)
{
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++)
  {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0)
    {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else
    {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export function getTextBBox(text:string)
{
  const metrics = ctx.measureText( text );
  const left = metrics.actualBoundingBoxLeft * -1;
  const top = metrics.actualBoundingBoxAscent * -1;
  const right = metrics.actualBoundingBoxRight;
  const bottom = metrics.actualBoundingBoxDescent;
  // actualBoundinBox... excludes white spaces
  const width = text.trim() === text ? right - left : metrics.width;
  const height = bottom - top;
  return { left, top, right, bottom, width, height };
}

export function isPointInRectangle(x:number,y:number,rect:any)
{
  return(x>rect.x && x<rect.x+rect.width && y>rect.y && y<rect.y+rect.height);
}

export function Build_XML()
{
  save_XML =  "<?xmlconfig>";
	save_XML += "<sTempAlarmuGlowica>" + "</sTempAlarmuGlowica>";
	save_XML += "<sTempAlarmuBeczka>" +  "</sTempAlarmuBeczka>";
	
	var input = auto_data_save.HisterezaT_close;
	if(input < 0.1 || input > 2) input = 0.3;
  save_XML += "<sHisterezaT_close>" + input.toString +  "</sHisterezaT_close>";	
    
    
  input = auto_data_save.HisterezaT_open;
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

export function drawText(txt:string, x:number, y:number, fsize:number)
{
        ctx.fillStyle = 'rgb(255,5,55)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = 'bold '+ fsize + 'pt Arial';
        ctx.fillText(txt, x, y);
}    

function bytesToString(bytes:number[])
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
}

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