
import { AutoData } from './AutoData';
import { MainScreen } from './MainScreen';
import { Options } from './Options';
import { MessageBox } from './MessageBox';
import { MessageBoxTimeOut } from './MessageBoxTimeOut';
import { MessageBoxYN } from './MessageBoxYN';

//import Chart from 'chart.js/auto';
//import Chart from 'chart.js'
//import Load from 'audio-loader';
//import Play from 'audio-play';

export const canvas = document.getElementById('Canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export var sndalert = new Audio("data:audio/mp3;base64,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");
export var sndbutton = new Audio("data:audio/mp3;base64,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B+j3b+OhSyERmG18dLVg/T////+hcqXUKAIAJl6wfiLAwgLe3/CzJsp1BI3Yg0cjiMrgMvroERI8KAU/HT3RzgPl2T9gmiw06yOVR/9amD9X/+Z/0MKM369XojGnM5qf/9v////6sKovLvUKAACahnLfjaAwptRbQtdTqA3vqgq/OeY9BeBQsgVjvjY1zqAQBSV/qDQt//swxPgACX0baeaoVSEVMay804qRtHNNf+7nGsJiutX/U//6f/9FfQ0xm//3/////yIbEhGYqF6nxaA3I/+gSJoo3uBAk+ghD7KOEOzVBySaSDHFB9S7tQBYaUv5ZutAbau1V3L//ZlY++YT/mf/d//863HG////////SFQiIl0JAAAHdFgs7sIyej/8hIJ6lTo8kH0iAf851d2V//tAxPKAB+zDZeK08gEyMa08hRdNGKK3H4+1tY/2/zNkRD6WdV8Wim/0KtgFd8Kfp05R/0FC6g6O////UD4QAAARCx2XQwBhXHLP3m8mkitJJjML0R9AvCbNWk1FXJ6PU7Wusnn39OpoJ0Y0UHWfp/91UjKlmRpb7Jf///+2susi3//f////+gP4ckeR9QcAAIiFfRtOEDA/8DJ9Gj7xunwKRWExPZTdJztwJWRyMnmkrkbA6J//+0DE/QAKeZFj4r1RIUqyK/xVqZzWSW1Ek7/kZK/6nP/yVFK/tfzm/////qjv////////LEAgAAAelf0xpIDBa1LKWlBFs9DhidqWAuaYz1aVZR37J5hv/NBo2utU/0Y5i5R//zf/dv/rznVVVUO////////IhsJA4qocAAbyxEQggYZqtNYhQXnuh8LrzANaw+XlWlY0DX/z/844IieqzWU//0x9////3b//v+3///////0NEv/7MMT6AglhjWHigULpKzIsPHWfTFUwQAAARLT/I4QBmv/zUWonyk48otZQZ/CK3BmNomaaLaLh1Bp/wXvaEhf/Q8H+67MJDf3ZTDAKD//6/////Xsyv//s3////7oIwpJG1QgAK2pUUwABr/0P27RoNsH2ghJhnBOtmvT4gQhbzr2hTjv81BVA81bIyO3/JnNJjv///2//9066f//7QMTygAicz1vmpLwBPrIrfCA0ZP6r////+riWFwLBcHAAAGdp9lDAAw//6o32tG10sR6LTjj5qPmphuVM5UEX9uyhklN/qN/5hV/9DViQn/6//T//688wxW//t///2/5o+EARC0sqFAAFzeLbQAGTo15k1XnPA8Xrmgl0Mr1AmCPq19TP/FYSaXui/9Hxw//9P////+1////////qePicu4YAArusYeX/8n3ngMWza8bBd0Cr//swxPiACRmLV+C9TMkRsiu8IChkZMJWcvqAk1rUb7f58RAQMm2TL/6qyMR//r/+///r3X///////+aNAVGWAAAABXqfY4gAN1Sj0AUSMcZFcvegk9j7HcMB3020Ob/cKIBP17N/as4mN////f//r9izf/+/////6Hk7ZhgABV2VlgADPvJzj6CFMY1YUA6tEBwti0IiRncB4WvT//swxPUAB5WNU6EA4wkuMit8FZ3sbQV2/syADh/REnTf970ZP//////6vR3v//f////+UKg2h4OE1QAAA5JYygABV5kzArFmQ6XL+BkthUdm+Igx/bS39IXBAz7sb/0MoSb//////6dbF0///////9CYEgSFJECySV2E3UB1W1I35t8o8iesHgs/f3Fc7/YRw42s8///Qhf///////tAxPQACJGRS6KhUoEasir8F54U//zZv//b/////YYiuTuqAAAAZljUAAF66zJz3GQN+cjQULJlDe6IbY6egfvnR2J/00iRCaltFTJNJf6omNv/7////9foQN////////HReAgSFAkdrhsh1gaDOg+D/cfABxNRRiDSil9Qkkf0vcTgXHqf3CY79V/9smv///6f//93O////////HwPHCBeAABeONAADtODFfSUNA6p1lQFEZX/+yDE/oBHRZFRoIDjAPeyKbQVnggmlJzZVckxbpJqYzKKJ9cxC4mK1+7rMQzl913XRV/70y4///////o0Oaueb//v////+giHMEvHuXAAAABZsNtNq5AAAAAAJ6qoNfhh1OWquQ2aUQlWBZ6G3fYZFVmFYtqPbV2d//////0/3fqq//swxPkAB52NWeAFTGkSMik0EChgTEFNRTMuMTAwqqqqqqqqqqqqqqoARCAB5St//KUpW//+Upf5S1KUv//Qxjf///////////////5jAQEKTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sgxPuCR4mRSaAo7QDPsim0AKnAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7MMT5gkhZkUWgNO/A7DIo9AUd6Kqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7IMT+AAmZkT9UBoAAzhOrNwBQAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xDE6gPFAY043AEACAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==");
export var sndkeys = new Audio("data:audio/mp3;base64,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");


sndalert.volume = 1.0;
sndbutton.volume = 1.0; 
//sndbutton.played

let TXTmessage:string = "esp8266;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0;0;0;OFF;OFF;OFF;OFF;YnVidTE=;cHJvbG9uZ2F0dW0yMDIx;0;-0;0.0;0.0;0;OK;OFF;OFF;OFF;0;0;0;OFF;0.0;0.0;0;0;0;0;0;0;0;1;1;1;1;1;1;1;1;5;1;1;1;1;10;0;OFF;0;0;1;0;0;0;1;1;0;0;1;1;1;0;0;0;0;0;0;0;0;0;0;0;brak;0;0;0;0;";

// Wifi
export var connection:any;
let LAST_ESP_CNTR = 0;
var online = false;

// Screen
export var ScreenOrientation:string = "--";
export var ScreenSize:string = "--";
export let deviceWidth = window.innerWidth; 
export let deviceHeight = window.innerHeight;

var ScreenName:string = "columna";

let mobile = false;

// blink
let BlinkDiode = false;

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
//let error = false;


// Alarmy
export let AlarmTZ = false;
export let AlarmTG = false;
export let AlarmTZG = false;

export var Alarm_Zalania:boolean = false; 

// termostat
//let termostat = false;


// Main data struct
export var auto_data:AutoData;
//export var auto_data_save:AutoData; // auto data for save configuration


// Main screen column view
var main_screen:MainScreen;

// rozgrzewanie options  view
export var options_screen:Options;

// messageBox
var MsgBox:MessageBox;

// messagebox based on time events
var MsgBoxTout:MessageBoxTimeOut;

// messagebox based on buttons Yen No
export var MsgBoxYN:MessageBoxYN;

export var wifi_scan:string = "";
//export var saved_files_list:string = "file_list;file1;file2.dat;file3;";
export var saved_files_list:string = "";

var app_hidden:boolean = false;



export function Init()
{
  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;
  canvas.style.width = deviceWidth + "px";
  canvas.style.height = deviceHeight + "px";
  canvas.width = deviceWidth;
  canvas.height = deviceHeight;

  //screen.orientation.lock('default');
  

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
  //auto_data_save = new AutoData;

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

  // MsgBox YN
  MsgBoxYN = new MessageBoxYN("dupas",10,15,'rgb(11,214,0)','rgb(22,92,3)');
  MsgBoxYN.Hide();
 
  canvas.addEventListener('click', on_click);
  //canvas.addEventListener('dblclick', on_dblclick);

  canvas.addEventListener('mousemove',on_mousemove);	 
  canvas.addEventListener("touchstart", on_touch);
  //canvas.addEventListener("wheel", on_scroll);

  window.addEventListener('resize',on_UpdateSize);
  window.addEventListener('orientationchange', on_UpdateSize);
  window.addEventListener("visibilitychange", on_VisibilityChange);
  window.addEventListener("focus", Browser_focus, false);
  window.addEventListener("blur", Browser_blur, false);
  
  document.addEventListener('keydown', checkKeyDown, false);


  // ctx.imageSmoothingEnabled = false
  // screen.orientation.unlock();

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
  {
    mobile = true;
   }else
  {
    mobile = false;
  }

  DataUpdate();
  ClearCanvas();
  Intro();

  setTimeout(setupWebSocket,500); 
  setInterval(NetCheckConnection, 10000);
  setTimeout(Loading, 100);
  //setInterval(MainLoop, 10000);

  //console.log("Sterowanie Destylatorem v2.2.7");

  //MsgBoxTout.Show("a co to jest?",4000);
     
}

function Browser_blur()
{
  //console.log("Browser blur");
}

function Browser_focus()
{
  //console.log("Browser focus");
}

function Loading()
{
  if(main_screen.img_loaded == true)
  {
    //setTimeout(function() {play_button();}, 700);
    //setTimeout(function() {audio_button.play();}, 700);
       
    main_screen.Show();
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
  ctx.fillText("Sterowanie Destylatorem v2.3.5",deviceWidth/2,deviceHeight/2.2);
  ctx.fillText("L-O-A-D-I-N-G",deviceWidth/2,deviceHeight/2);
  ctx.textAlign = 'left';
}

/* function on_dblclick()
{
  play_button();
  DrawCircle(MousePos.x,MousePos.y,3,10,'#FFF200','red');
} */

function checkKeyDown()
{
  play_key();
}


//----------------------- MAIN CLICK EVENT
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

  if(MsgBoxYN.visible == true)
  {
    let result = MsgBoxYN.OnClick(MousePos.x,MousePos.y);
    if(result == "TAK")
    {
      MsgBoxYN.Hide();
      UpdateCanvas(true);
      //console.log("mboxYN TAK");
    }else if(result == "NIE")
    {
      MsgBoxYN.Hide();
      UpdateCanvas(true);
      //console.log("mboxYN NIE");
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
          //options_screen.draw();
          UpdateCanvas(false);
        }
  
        // MANUAL MODE:
        if(result == "man")
        {
          if(auto_data.AutomataStatus == "12")
          {
            MsgBoxYN.message = "Jesteś w trybie manualnym, czy na pewno chcesz wyjść z trybu manualnego ???";
          }else
          {
            MsgBoxYN.message = "Czy na pewno chcesz włączyć tryb manualny ???";
          }

          MsgBoxYN.trigger = ()=>{
            SendCommand("#manual#");
            //setTimeout(play_alert, 1000);
          };
          MsgBoxYN.Show();
          UpdateCanvas(true); // call once
          return;
        }
        
        // START AUTOMATA:
        if(result == "start")
        {
          var status:number = Number(auto_data.AutomataStatus);
          if(status < 10)
          {
            MsgBoxYN.message = "Aktualnie sterownik pracuje w trybie automatycznym destylowanie trwa !!!";
          }else if(status >= 10)
          {
            MsgBoxYN.message = "Czy chcesz włączyć tryb AUTO i rozpocząć destylację ? 😻";
          }
          
          //MsgBoxTout.Show("a co to jest?",4000);
          //setTimeout(play_alert, 1000);
          
          MsgBoxYN.trigger = ()=>{
            SendCommand("#autostart#");
            //setTimeout(play_alert, 1000);
          };
          MsgBoxYN.Show(); 
          UpdateCanvas(false); // call once  
          //AlarmZalania(); // testy 

        return;
        }

        // STOP AUTOMATA: 
        if(result == "stop")
        {
          var status:number = Number(auto_data.AutomataStatus);
          if(status < 10)
          {
            MsgBoxYN.message = "Aktualnie sterownik pracuje w trybie AUTO automatycznym czy chcesz to zatrzymać ?";
          }else if(status >= 10)
          {
            MsgBoxYN.message = "Obecnie sterownik odpoczywa ! nie robi nic ! 😻";
          }

          // MsgBoxYN.message = "Czy na pewno chcesz zatrzymać destylowanie 😻 ? ";
          MsgBoxYN.trigger = () =>{
            SendCommand("#autostop#");
            //setTimeout(play_alert, 1000);
          };
          MsgBoxYN.Show();
                  
          //UploadFile();
          //legacyFileOpen();
          //MsgBoxTout.Show("a co to jest?",4000);
          //setTimeout(play_alert, 1000);
          UpdateCanvas(false); // call once
          return;
        }
      }
      break;
      
      //--------------- OPTIONS SCREEN:
      case "options":
      {
        let result = options_screen.OnClick(MousePos.x,MousePos.y);   
     
        if(result == "OK") //back to main screen
        {
          options_screen.Hide();
          main_screen.Show();
          ScreenName = "columna";
          //main_screen.draw();
          UpdateCanvas(true); //call once
        }

        if(result == "save_options")
        {
          MsgBoxYN.message = "Jesteś pewny że chcesz nadpisać plik? 😻";
          MsgBoxYN.trigger = () =>{
            //var json_data = "data_save:" + JSON.stringify(auto_data_save);
            SendCommand("#save_config#");
            // console.log("data_save:" +  json_data);
            //setTimeout(play_alert, 1000);
          };
          MsgBoxYN.Show();
          UpdateCanvas(true); //call once
        } 

        
        if(result == "update")
        {
          MsgBoxYN.message = "Jesteś pewny 😻?";
          MsgBoxYN.trigger = () =>{
            window.open("/upload.htm","");
            //setTimeout(play_alert, 1000);
          };
          MsgBoxYN.Show(); 
          UpdateCanvas(true); //call once
        }

        if(result == "save_file")
        {
          //setTimeout(play_alert, 1000);
          UpdateCanvas(true); //call once
        }

        if(result == "get_file_list")
        {
          SendCommand("#filelist#");
          //setTimeout(play_alert, 1000);
          UpdateCanvas(true); //call once
        }
      }
      break;
  }
}

export function SaveNewFileMCU(filename:string)
{
    //auto_data_save.FileName = filename;
    MsgBoxYN.message = "Jesteś pewny że chcesz zapisać " + filename +" ?😻";
    MsgBoxYN.trigger = () =>{
      //options_screen.update_options();
      //var json_data = "file_data:" + JSON.stringify(auto_data_save);
      //var json_data = "file_save:" + filename;
      SendCommand("#new_config:" + filename);
      // console.log("file_save:" +  json_data);
      //setTimeout(play_alert, 1000);
      //auto_data_save.FileName = "";
    };
    MsgBoxYN.Show();
    UpdateCanvas(true); //call once
}

export function DeleteFilesMCU(files:string)
{
    MsgBoxYN.message = "Czy skasować wybrane pliki ? 😻";
    MsgBoxYN.trigger = () =>{
      var filenames_data = "file_dele:" + files;
      SendCommand(filenames_data);
      // console.log("file_save:" +  json_data);
      //setTimeout(play_alert, 1000);
    };
    MsgBoxYN.Show();
    UpdateCanvas(true); //call once
}

export function LoadFileMCU(file:string)
{
    MsgBoxYN.message = "Wgrać ten plik ?😻";
    MsgBoxYN.trigger = () =>{
      SendCommand(file);
      // console.log("file_save:" +  json_data);
      //setTimeout(play_alert, 1000);
      //setTimeout(options_screen.Show, 2000);

    };
    MsgBoxYN.Show();
    UpdateCanvas(true); //call once
}

export function ResetConfigMCU()
{
    MsgBoxYN.message = "Przywrócić ustawienia fabryczne ?😻";
    MsgBoxYN.trigger = () =>{
      SendCommand("#resetmem#");
      //setTimeout(play_alert, 1000);
    };
    MsgBoxYN.Show();
    UpdateCanvas(true); //call once
}




/* 
 export function UploadFile()
{
  fileDialog()
    .then(file => {
        const data = new FormData();
        data.append('file', file[0]);
        //data.append('imageName', 'flower');

        console.log("send file:" + file[0].name.toString);
        console.log("tye:" + file[0].type.toString);
        console.log("size:" + file[0].size.toString);

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
        xhr.open("POST", "/upload", true);
        //xhr.setRequestHeader("Content-Type", file[0].type);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(file[0]);
    });
  
} 
 */


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

  if(MsgBoxYN.visible == true)
  {
    MsgBoxYN.OnMouseMove(MouseX,MouseY);
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
    app_hidden = true;
    //play_button();
  }else
  {
    app_hidden = false;
    //play_button();
  }
}

/* function DrawInfoBox(x:number, y:number)
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
} */


export function SendCommand(cmd:string)
{
      if(connection.readyState == WebSocket.OPEN)
      {
          connection.send(cmd);
      }else
      {
          console.log("error! websocket");
      } 
}

export function DrawCircle(x:number,y:number,line:number,radius:number,color1 = 'rgb(255,242,0)',color2 = 'rgb(255,2,0)')
{
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color2;
        ctx.fill();
        ctx.lineWidth = line;
        ctx.strokeStyle = color1;
        ctx.stroke();
}

export function DrawRoundedBox(ctx:CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number,color = 'rgb(232,32,0)')
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
        ctx.strokeStyle = color; 
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
}

export async function UpdateCanvas(once:boolean)
{
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
   //DrawInfo();
   MsgBox.draw();
   MsgBoxTout.draw();
   MsgBoxYN.draw();  
   
   //if(once == false)
   //{
   //  setTimeout(UpdateCanvas,400,once);
   //}
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
  options_screen.update();
 
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
  //Load('data:audio/mpeg;base64, '+ sound_bt_over["audio"]).then(Play);
  sndbutton.currentTime = 0;
  sndbutton.play();
  //beep.play();
}

export function play_key()
{
  //Load('data:audio/mpeg;base64, '+ sound_bt_over["audio"]).then(Play);
  sndkeys.currentTime = 0;
  sndkeys.play();
  //beep.play();
}

export function play_alert()
{
  //Load('data:audio/mpeg;base64, '+ sound_alert["audio"]).then(Play);
  sndalert.currentTime = 0;
  sndalert.play();
} 

function setupWebSocket()
{
connection = new WebSocket('ws://'+location.hostname+':81/', ['arduino']);
connection.onopen = function()
{
  connection.send('Connect ' + new Date());
  console.log('I succesfull connected to ws esp server ...');
  online = true;
  main_screen.DiodeWifi.On();
  UpdateCanvas(true);  
};
connection.onerror = function(error:any)
{
	online = false;
	console.log('WebSocket Error: ', error);
};
connection.onclose = function(error:any)
{
	online = false;
  main_screen.DiodeWifi.Off(); 
  console.log('connection closed ...', error);
};
connection.onmessage = function(msg:any)
{
 TXTmessage = msg.data;
 DataUpdate();
};
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

function AlarmZalania()
{
   let etap:string = "";
   switch(auto_data.AutomataStatus)
   {
            case "0": // termostat
              etap = "termostatu";
            break;
            
            case "1": //ROZ-GRZANIE ℃
              etap = "rozgrzewania";
            break;

            case "2": // ZALEWANIE
              etap = "zalewania";
            break;

            case "3": // STAB
              etap = "stabilizacji";
            break;

            case "4": // PRZEDG
              etap = "przedgonu";
            break;

            case "5": // STB-PRZDGN
              etap = "stabilizacji przedgonu";
            break;

            case "6": // P.OLM
              etap = "płukania olm";
            break;

            case "7": // DESTYLAT
              etap = "odbioru destylatu";
            break;

            case "8": // POZOSTAŁE
              etap = "odbioru destylatów pozostałych";
            break;

            case "9": // CHLODZENIE G.
              etap = "chłodzenia głowicy";
            break;

            case "10": // NIC NIE ROBIE
              etap = "nic nie robienia";
            break;

            case "11": // KONIEC
              etap = "koniec";
            break;

            case "12": // PAUZA
              etap = "zatrzymania w trybie pauza";
            break;

   }

          Alarm_Zalania = true;

          MsgBox.message = "Alarm zalania, destylowanie zatrzymano ! na etapie " + etap + " więc zmniejsz moc grzania w ustawieniach sterownika i uruchom destylację od nowa !!!";
          MsgBox.trigger = () => {
            SendCommand("#al.zal.ok#");
          };
          MsgBox.Show();
          UpdateCanvas(true); // call once  
}

function DataUpdate()
{
    if(app_hidden == true) return;

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
         
         auto_data.WIFI_SSID = txt_arr[19];
         auto_data.WIFI_PASS = txt_arr[20];
         auto_data.WIFI_MODE = parseInt(txt_arr[21],10);
         auto_data.WIFI_RSSI = parseInt(txt_arr[22],10);

         auto_data.HisterezaG_close = parseFloat(txt_arr[23]);
         auto_data.HisterezaG_open = parseFloat(txt_arr[24]);
         
         auto_data.ESP_CNTR = parseInt(txt_arr[25],10);
         auto_data.Status = txt_arr[26];

         // POWER G1  ON OFF booleany
         if(txt_arr[27] == "ON")
         {
          auto_data.G1 = true;
          main_screen.DiodeG1.On();
         }else
         {
          auto_data.G1 = false;
          main_screen.DiodeG1.Off();
         }

         // G2
         if(txt_arr[28] == "ON")
         {
          auto_data.G2 = true;
          main_screen.DiodeG2.On();
         }else
         {
          auto_data.G2 = false;
          main_screen.DiodeG2.Off();
         }

         // G3
         if(txt_arr[29] == "ON")
         {
          auto_data.G3 = true;
          main_screen.DiodeG3.On();
         }else
         {
          auto_data.G3 = false;
          main_screen.DiodeG3.Off();
         }
        
         // WATT G1 G2 G3:
         auto_data.MocGrzaniaG1 = parseInt(txt_arr[30],10);
         auto_data.MocGrzaniaG2 = parseInt(txt_arr[31],10);
         auto_data.MocGrzaniaG3 = parseInt(txt_arr[32],10);

         // TERMOSTAT:
         auto_data.Termostat_status = txt_arr[33];
         auto_data.TempTermostat_stop = parseFloat(txt_arr[34]);
         auto_data.TempTermostat_start = parseFloat(txt_arr[35]);

         auto_data.CzasZakonczeniaGon = parseInt(txt_arr[36],10);

         auto_data.ETAP = parseInt(txt_arr[37],10);

         auto_data.AktZalanie = parseInt(txt_arr[38],10);

         auto_data.PresureBMP = parseInt(txt_arr[39],10);

         auto_data.CisnienieZalania_1 = parseInt(txt_arr[40],10);
         auto_data.CisnienieZalania_2 = parseInt(txt_arr[41],10);
         auto_data.CisnienieZalania_3 = parseInt(txt_arr[42],10);

         auto_data.PrzerwaZalania_1 = parseInt(txt_arr[43],10);
         auto_data.PrzerwaZalania_2 = parseInt(txt_arr[44],10);
         auto_data.PrzerwaZalania_3 = parseInt(txt_arr[45],10);

         auto_data.CzasZalania_1 = parseInt(txt_arr[46],10);
         auto_data.CzasZalania_2 = parseInt(txt_arr[47],10);
         auto_data.CzasZalania_3 = parseInt(txt_arr[48],10);
         
         auto_data.CzasStabilizacji = parseInt(txt_arr[49],10);
         auto_data.CzasStabilizacjiPrzedgonu = parseInt(txt_arr[50],10);
         auto_data.CzasPlukanieOLM = parseInt(txt_arr[51],10);

         auto_data.CzasChlodzeniaGlow = parseInt(txt_arr[52],10);
         auto_data.CyklePrzedgonu = parseInt(txt_arr[53],10);

         auto_data.CzasOtwarciaZPrzedgonu = parseInt(txt_arr[54],10);
         auto_data.CzasZamknieciaZPrzedgonu = parseInt(txt_arr[55],10);

         auto_data.AutomataStatus = txt_arr[56];

         auto_data.ZaworGonCntr = parseInt(txt_arr[57],10);

         // MODULE active flag
         if(txt_arr[58] == "ON")
         {
          auto_data.MODULE = true;
          main_screen.DiodeModule.On();
         }else if(txt_arr[58] == "OFF")
         {
          auto_data.MODULE = false;
          main_screen.DiodeModule.Off();
         }

         // Moduł mocy regulowany:
         if(txt_arr[59] == "1")
         {
          auto_data.PWR_MOD = true;
         }else if(txt_arr[59] == "0")
         {
          auto_data.PWR_MOD = false;
         }


         // STABILIZACJA:
         auto_data.Stb_G1pwm = parseInt(txt_arr[60],10);

         // G1
         if(txt_arr[61] == "1")
         {
          auto_data.Stb_G1 = true;
         }else if(txt_arr[61] == "0")
         {
          auto_data.Stb_G1 = false;
         }

         // G2
         if(txt_arr[62] == "1")
         {
          auto_data.Stb_G2 = true;
         }else if(txt_arr[62] == "0")
         {
          auto_data.Stb_G2 = false;
         }

         // G3
         if(txt_arr[63] == "1")
         {
          auto_data.Stb_G3 = true;
         }else if(txt_arr[63] == "0")
         {
          auto_data.Stb_G3 = false;
         }

         // przedgon data:
         auto_data.Przg_G1pwm = parseInt(txt_arr[64],10);

         // G1
         if(txt_arr[65] == "1")
         {
          auto_data.Przg_G1 = true;
         }else if(txt_arr[65] == "0")
         {
          auto_data.Przg_G1 = false;
         }

         // G2
         if(txt_arr[66] == "1")
         {
          auto_data.Przg_G2 = true;
         }else if(txt_arr[66] == "0")
         {
          auto_data.Przg_G2 = false;
         }

         // G3
         if(txt_arr[67] == "1")
         {
          auto_data.Przg_G3 = true;
         }else if(txt_arr[67] == "0")
         {
          auto_data.Przg_G3 = false;
         }

         
         // GON data:
         auto_data.Gon_G1pwm = parseInt(txt_arr[68],10);

         // G1
         if(txt_arr[69] == "1")
         {
          auto_data.Gon_G1 = true;
         }else if(txt_arr[69] == "0")
         {
          auto_data.Gon_G1 = false;
         }

         // G2
         if(txt_arr[70] == "1")
         {
          auto_data.Gon_G2 = true;
         }else if(txt_arr[70] == "0")
         {
          auto_data.Gon_G2 = false;
         }

         // G3
         if(txt_arr[71] == "1")
         {
          auto_data.Gon_G3 = true;
         }else if(txt_arr[71] == "0")
         {
          auto_data.Gon_G3 = false;
         }

         // przerwa w zalaniu: 0 lub 1 jako string
         auto_data.PrzerwaWzalaniu = txt_arr[72];

         // zawór krok:
         auto_data.Krok = parseInt(txt_arr[73]);

         // Analogowy z modułu
         auto_data.AnalogSensorValue = parseInt(txt_arr[74]);

         //Bufor:
         auto_data.TBufor80 = parseFloat(txt_arr[75]);
         auto_data.TBufor60 = parseFloat(txt_arr[76]);
         auto_data.TBufor40 = parseFloat(txt_arr[77]);

         // BUFOR CB
         if(txt_arr[78] == "1")
         {
          auto_data.Bufor = true;
          main_screen.DiodeBufor.On();
         }else if(txt_arr[78] == "0")
         {
          auto_data.Bufor = false;
          main_screen.DiodeBufor.Off();
         }

         // ESP memory:
         auto_data.ESP_memory = parseFloat(txt_arr[79]);

         // Automatic start time:
         //auto_data.StartTime = parseFloat(txt_arr[80]);
         auto_data.CzasGodzA = parseFloat(txt_arr[80]);
         auto_data.CzasMinA = parseFloat(txt_arr[81]);
         auto_data.CzasSekA = parseFloat(txt_arr[82]);

         // Config file name:
         auto_data.FileName = txt_arr[83];

         // Czujnik zalania:
         if(txt_arr[84] == "1")
         {
          auto_data.CzujnikZalania = true;
         }else if(txt_arr[84] == "0")
         {
          auto_data.CzujnikZalania = false;
         }

         // wartość zalania:
         auto_data.WartoscZalania = parseInt(txt_arr[85]);

         // Ciśnienie dnia:
         auto_data.CisnienieDnia = txt_arr[86];

         //Alarm zalania
         /* if(txt_arr[87] == "1")
         {
           if(auto_data.AlarmZalania == true)
           {
            
           }else
           {
            auto_data.AlarmZalania = true;
            AlarmZalania();
           }
         }else if(txt_arr[87] == "0")
         {
            auto_data.AlarmZalania = false;
         } */
          

         // PARAM.END -=************************************************
         // ************************************************************
         // ************************************************************ 
         // ************************************************************ 
         // ************************************************************ 
         // ************************************************************ 
         // ************************************************************  
         // PARAM.END -=************************************************
         
         
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

         // Z-GLOWICA
         if(auto_data.ZaworGlowica_m == "ON")
         {
            main_screen.DiodeZGlowica.On();
         }else
         {
            main_screen.DiodeZGlowica.Off();
         }

      		
				if( BlinkDiode == true)
			  {
				 BlinkDiode = false;
			  }else
			  {
				 BlinkDiode = true;
			  }
				
				
        UpdateStatus();
        UpdateCanvas(false);

        //console.log("got MCU txt database");

        /* if(Alarm_Zalania == true)
        {
           play_alert(); 
        } */

        return;
  
    }// not xml data ####################### !!!!
     // not xml data ####################### !!!!
     // not xml data ####################### !!!!

    if(TXTmessage == "#al_zal_start#")
    {
      if(Alarm_Zalania == false)
      {
        AlarmZalania();
      }
      
      //UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#al_zal_stop#")
    {
      MsgBoxTout.Show("Alarm zalania anulowano !",3000);
      //setTimeout(play_alert, 1000);
      Alarm_Zalania = false;
      UpdateCanvas(true); // call once
      return;
    } 

    if(TXTmessage == "#confsaveok#")
    {
      MsgBoxTout.Show("Sterownik zapisał!",4000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#starton#")
    {
      MsgBoxTout.Show("START AUTO 😊",4000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#startoff#")
    {
      MsgBoxTout.Show("STOP AUTO 😲",4000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#zalewanie_start#")
    {
      MsgBoxTout.Show("ZALEWANIE 😕",4000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#stab_start#")
    {
      MsgBoxTout.Show("STABILIZACJA 😊",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#przedg_start#")
    {
      MsgBoxTout.Show("PRZEDGON 😲",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#stb_przg_start#")
    {
      MsgBoxTout.Show("STB.PRZEDGONU 😃",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#olm_start#")
    {
      MsgBoxTout.Show("PŁUKANIE OLM 😃",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#gon_start#")
    {
      MsgBoxTout.Show("ODB. DESTYLATU 😊",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#pogon_start#")
    {
      MsgBoxTout.Show("POZOSTAŁE 😡",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#chlodz_start#")
    {
      MsgBoxTout.Show("CHŁODZENIE 😛",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#auto_end#")
    {
      MsgBoxTout.Show("ZAKOŃCZONO 😻",5000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#filesaveok#")
    {
      MsgBoxTout.Show("Sterownik zapisał plik!",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#modulewifion#")
    {
      MsgBoxTout.Show("Włączono wifi modułu!",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#confsaveerror#")
    {
      MsgBoxTout.Show("Błąd zapisu spróbuj ponownie!",4000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage == "#tmpdnia#")
    {
      MsgBoxTout.Show("Ustalono temp. Dnia !",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
      return;
    }

    if(TXTmessage.startsWith("#wifiscan#") == true)
		{
      wifi_scan = TXTmessage;

      // #wifiscan#:bubu1:-50:AUTO
      // console.log(TXTmessage);
      return;
    }

    // TERMOSTAT:
    if(TXTmessage.startsWith("#starttermo#") == true)
		{
      MsgBoxTout.Show("Termostat Sart!",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
     return;
    }

    if(TXTmessage.startsWith("#stoptermo#") == true)
		{
      MsgBoxTout.Show("Termostat Stop!",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
     return;
    }

    // ZAWORKI:
    if(TXTmessage.startsWith("#ezgon#") == true)
		{
     
     return;
    }

    // EPROM RESET:
    if(TXTmessage.startsWith("#epromreset#") == true)
		{
      MsgBoxTout.Show("Reset Pamięci!",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
     return;
    }

    // GET FILES LIST FROM MCU:
    if(TXTmessage.startsWith("file_list;") == true)
		{
      if(TXTmessage != "file_list;")
      {
        saved_files_list = TXTmessage;
        options_screen.Pliki.update();
      }else
      {
        saved_files_list = "";
        options_screen.Pliki.update();
      }

      UpdateCanvas(true); // call once
     return;
    }
    
    // Loaded config file to memory
    if(TXTmessage.startsWith("#confloadok#") == true)
		{
      MsgBoxTout.Show("Wgrano plik!",3000);
      //setTimeout(play_alert, 1000);
      //setTimeout(options_screen.Show , 2000);
      setTimeout(()=>{ options_screen.Show },2000);

      //setTimeout(this.methodName.bind(this), milliseconds);
      UpdateCanvas(true); // call once
     return;
    }

    // Loaded config file error!
    if(TXTmessage.startsWith("#confloaderror#") == true)
		{
      MsgBoxTout.Show("Nie wgrano pliku!",3000);
      //setTimeout(play_alert, 1000);
      UpdateCanvas(true); // call once
     return;
    }
 
}

function UpdateStatus()
{
  AlarmTZ  = false;
	AlarmTG  = false;
	AlarmTZG = false;

  switch(auto_data.AutomataStatus)
	{
				case "0":
		      main_screen.UpdateStatus("Termostat 😡 " +
          auto_data.TempTermostat_start + 
          "-" + 
          auto_data.TempTermostat_stop + " ℃");
				break;
				
				case "1": //GRZANIE ℃
					main_screen.UpdateStatus("Rozgrzewanie: " + auto_data.TempStopRozgrzewania + "℃ 😲");
				break;

        case "2": // ZALEWANIE
          {
            let stat:string = "";
            var min:number = 0;
            var sek:number = 0;
            if(auto_data.PrzerwaWzalaniu == "1")
            {
              switch(auto_data.AktZalanie)
              {
                  case 1:
                    min =  Math.floor(auto_data.PrzerwaZalania_1 / 60);
                    sek =  auto_data.PrzerwaZalania_1 - min * 60;
                    stat = "Zalewanie: " + "przerwa I " + min + " min" + " " + sek + " sek" + " 😃";
                  break;

                  case 2:
                    min =  Math.floor(auto_data.PrzerwaZalania_2 / 60);
                    sek =  auto_data.PrzerwaZalania_2 - min * 60;
                    stat = "Zalewanie: " + "przerwa II " + min + " min" + " " + sek + " sek" + " 😃";
                  break;

                  case 3:
                    min =  Math.floor(auto_data.PrzerwaZalania_3 / 60);
                    sek =  auto_data.PrzerwaZalania_3 - min * 60;
                    stat = "Zalewanie: " + "przerwa III " + min + " min" + " " + sek + " sek" + " 😃";
                  break;

                  case 4:
                    stat = "Zalewanie: "  +  "-> 😃";
                  break;
              }

            }else if (auto_data.PrzerwaWzalaniu == "0")
            {
              switch(auto_data.AktZalanie)
              {
                  case 1:
                    min =  Math.floor(auto_data.CzasZalania_1 / 60);
                    sek =  auto_data.CzasZalania_1 - min * 60;
                    stat = "Zalewanie: " + "I " + min + " min" + " " + sek + " sek" + " 😃";
                  break;

                  case 2:
                    min =  Math.floor(auto_data.CzasZalania_2 / 60);
                    sek =  auto_data.CzasZalania_2 - min * 60;
                    stat = "Zalewanie: " + "II " + min + " min" + " " + sek + " sek" + " 😃";
                  break;

                  case 3:
                    min =  Math.floor(auto_data.CzasZalania_3 / 60);
                    sek =  auto_data.CzasZalania_3 - min * 60;
                    stat = "Zalewanie: " + "III " + min + " min" + " " + sek + " sek" + " 😃";
                  break;

                  case 4:
                    stat = "Zalewanie: "  +  "-> 😃";
                  break;
              }

            }
					  main_screen.UpdateStatus(stat);
          }
				break;

        case "3":
					main_screen.UpdateStatus("Stabilizacja: " +  auto_data.CzasStabilizacji + " min 😅");
  			break;

        case "4":
					main_screen.UpdateStatus("Odb.frakcji lekkich: 😃 " + auto_data.CyklePrzedgonu + " cykl");
				break;

        case "5":
					main_screen.UpdateStatus("Stab.po odbiorze frakcji lekkich: " + auto_data.CzasStabilizacjiPrzedgonu + " min 😃");
				break;

        case "6":
					main_screen.UpdateStatus("Płukanie OLM: 😃 " + auto_data.CzasPlukanieOLM + " sek");
				break;

        case "7":
					main_screen.UpdateStatus("Odbiór destylatu 😊 Krok: " + (auto_data.Krok));
				break;

        case "8":
					main_screen.UpdateStatus("Destylaty pozostałe: 😃 " + auto_data.TempStopPogonu + " ℃");
				break;

        case "9":
					main_screen.UpdateStatus("Chłodzenie głowicy: 😃 " + auto_data.CzasChlodzeniaGlow + " min");
				break;

        case "10":
					main_screen.UpdateStatus("Nic nie robię    😕");
				break;

        case "11":
					main_screen.UpdateStatus("KONIEC !       😻");
				break;

        case "12":
					main_screen.UpdateStatus("PAUZA  !      😴");
				break;

  }

  switch(auto_data.Status)
	{
				case "Awaria DS":
		      main_screen.UpdateStatus("Awaria czujnika temperatury 😲");
					//play_button(); 
				break;
				
				case "Alarm T.ZG":
					main_screen.UpdateStatus("Alarm temp. zbiornik i głowica 😡");
	  			play_alert();
					AlarmTZG = true;
				break;
				
				case "Alarm TZ":
				  main_screen.UpdateStatus("Alarm temp. zbiornik 😲");
					play_alert();
					AlarmTZ = true;
				break;
				
				case "Alarm TG":
				  main_screen.UpdateStatus("Alarm temp. głowica 😲");
					play_alert();
					AlarmTG = true;
				break;
  }

  if(online == false)
  {
    main_screen.UpdateStatus("Brak połączenia! 😩");
  }

  if(auto_data.PWR_MOD == true && (auto_data.AutomataStatus == "3"
     || auto_data.AutomataStatus == "4"
     || auto_data.AutomataStatus == "5"
     || auto_data.AutomataStatus == "6"
     || auto_data.AutomataStatus == "7"
     || auto_data.AutomataStatus == "8") 
     )
  {
    main_screen.DiodeG1.BlinkOn();
  }else
  {
    main_screen.DiodeG1.BlinkOff();
  }

}

function NetCheckConnection()
{
  if(app_hidden == true) return; 

  if(auto_data.ESP_CNTR > LAST_ESP_CNTR)
  {
     online = true;
     main_screen.DiodeWifi.On();
  }else
  {
     online = false;
     main_screen.DiodeWifi.Off();
     UpdateStatus();
     setupWebSocket();
     UpdateCanvas(true);
  }
  LAST_ESP_CNTR = auto_data.ESP_CNTR;
 }

export function wrapText(text:string, x:number, y:number, maxWidth:number, lineHeight:number,color = 'rgb(200,200,200)')
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
  return y;
} 

export function descriptionText(text_name:string,text:string, x:number, y:number, maxWidth:number, lineHeight:number,color1 = 'rgb(200,0,0)',color2 = 'rgb(200,200,200)')
{
  var words = text.split(' ');
  var line = '';

  ctx.fillStyle = color1;
  ctx.fillText(text_name, x, y);

  y += lineHeight; 

  ctx.fillStyle = color2;
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
  return y;
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

export function drawText(txt:string, x:number, y:number, fsize:number)
{
        ctx.fillStyle = 'rgb(255,5,55)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = 'bold '+ fsize + 'pt Arial';
        ctx.fillText(txt, x, y);
}    

export function setSize()
{
      let font_size:number = 0;
      let button_font_size:number = 0;
      let diode_radius:number = 0;
      let diode_fsize:number = 0;
      let bt_circle_radius:number = 0
      let bt_circle_fsize:number = 0     

      // LANDSCAPE
      if(ScreenSize == "extralarge" && ScreenOrientation == "landscape")
      {
        diode_fsize = 12;
        font_size = 17;
        diode_radius = 13;
        button_font_size = 16;
        bt_circle_radius = 33;
        bt_circle_fsize = 15;    
      }
      if(ScreenSize == "large" && ScreenOrientation == "landscape")
      {
        diode_fsize = 10;
        font_size = 16;
        diode_radius = 10;
        button_font_size = 15;
        bt_circle_radius = 28;
        bt_circle_fsize = 14; 
      }
      if(ScreenSize == "medium" && ScreenOrientation == "landscape")
      {
        diode_fsize = 12;
        font_size = 11;
        diode_radius = 11;
        button_font_size = 14;
        bt_circle_radius = 22;
        bt_circle_fsize = 13; 
      }
      if(ScreenSize == "small" && ScreenOrientation == "landscape")
      {
        diode_fsize = 12;
        font_size = 14;
        diode_radius = 13;
        button_font_size = 13;
        bt_circle_radius = 23;
        bt_circle_fsize = 12; 
      }
      if(ScreenSize == "extrasmall" && ScreenOrientation == "landscape")
      {
        diode_fsize = 8;
        font_size = 12;
        diode_radius = 11;
        button_font_size = 12;
        bt_circle_radius = 22;
        bt_circle_fsize = 11; 
      }
      if(ScreenSize == "sextrasmall" && ScreenOrientation == "landscape")
      {
        diode_fsize = 6;
        font_size = 12;
        diode_radius = 8;
        button_font_size = 10;
        bt_circle_radius = 20;
        bt_circle_fsize = 10; 
      }
      if(ScreenSize == "extral_w_slim" && ScreenOrientation == "landscape")
      {
        diode_fsize = 6;
        font_size = 12;
        diode_radius = 8;
        button_font_size = 10;
        bt_circle_radius = 20;
        bt_circle_fsize = 8; 
      }

      // PORTRAIT
      if(ScreenSize == "extralarge" && ScreenOrientation == "portrait")
      {
        diode_fsize = 15;
        font_size = 18;
        diode_radius = 17;
        button_font_size = 16;
        bt_circle_radius = 30;
        bt_circle_fsize = 15; 
      }
      if(ScreenSize == "large" && ScreenOrientation == "portrait")
      {
        diode_fsize = 15;
        font_size = 16;
        diode_radius = 16;
        button_font_size = 15;
        bt_circle_radius = 28;
        bt_circle_fsize = 14; 
      }
      if(ScreenSize == "medium" && ScreenOrientation == "portrait")
      {
        diode_fsize = 15;
        font_size = 16;
        diode_radius = 15;
        button_font_size = 13;
        bt_circle_radius = 26;
        bt_circle_fsize = 13; 
      }
      if(ScreenSize == "small" && ScreenOrientation == "portrait")
      {
        diode_fsize = 12;
        font_size = 15;
        diode_radius = 14;
        button_font_size = 11;
        bt_circle_radius = 24;
        bt_circle_fsize = 12; 
      }
      if(ScreenSize == "extrasmall" && ScreenOrientation == "portrait")
      {
        diode_fsize = 8;
        font_size = 13;
        diode_radius = 11;
        button_font_size = 7;
        bt_circle_radius = 22;
        bt_circle_fsize = 11; 
      }
      if(ScreenSize == "sextrasmall" && ScreenOrientation == "portrait")
      {
        diode_fsize = 5;
        font_size = 10;
        diode_radius = 8;
        button_font_size = 8;
        bt_circle_radius = 18;
        bt_circle_fsize = 8; 
      }

      // IPAD 
      if(ScreenSize == "extralarge" && ScreenOrientation == "ipad")
      {
        diode_fsize = 15;
        font_size = 20;
        diode_radius = 17;
        button_font_size = 16;
        bt_circle_radius = 30;
        bt_circle_fsize = 15; 
      }
      if(ScreenSize == "large" && ScreenOrientation == "ipad")
      {
        diode_fsize = 15;
        font_size = 18;
        diode_radius = 16;
        button_font_size = 15;
        bt_circle_radius = 28;
        bt_circle_fsize = 14; 
      }
      if(ScreenSize == "medium" && ScreenOrientation == "ipad")
      {
        diode_fsize = 13;
        font_size = 17;
        diode_radius = 15;
        button_font_size = 14;
        bt_circle_radius = 26;
        bt_circle_fsize = 13; 
      }
      if(ScreenSize == "small" && ScreenOrientation == "ipad")
      {
        diode_fsize = 12;
        font_size = 15;
        diode_radius = 14;
        button_font_size = 13;
        bt_circle_radius = 24;
        bt_circle_fsize = 12; 
      }
      if(ScreenSize == "extrasmall" && ScreenOrientation == "ipad")
      {
        diode_fsize = 11;
        font_size = 13;
        diode_radius = 13;
        button_font_size = 12;
        bt_circle_radius = 22;
        bt_circle_fsize = 11; 
      }
      if(ScreenSize == "sextrasmall" && ScreenOrientation == "ipad")
      {
        diode_fsize = 10;
        font_size = 12;
        diode_radius = 12;
        button_font_size = 11;
        bt_circle_radius = 20;
        bt_circle_fsize = 10; 
      }
      
      // UNKNOWN
      if(ScreenSize == "extralarge" && ScreenOrientation == "unknown")
      {
        diode_fsize = 15;
        font_size = 20;
        diode_radius = 17;
        button_font_size = 16;
        bt_circle_radius = 30;
        bt_circle_fsize = 15; 
      }
      if(ScreenSize == "large" && ScreenOrientation == "unknown")
      {
        diode_fsize = 14;
        font_size = 18;
        diode_radius = 16;
        button_font_size = 15;
        bt_circle_radius = 28;
        bt_circle_fsize = 14; 
      }
      if(ScreenSize == "medium" && ScreenOrientation == "unknown")
      {
        diode_fsize = 13;
        font_size = 18;
        diode_radius = 15;
        button_font_size = 14;
        bt_circle_radius = 26;
        bt_circle_fsize = 13; 
      }
      if(ScreenSize == "small" && ScreenOrientation == "unknown")
      {
        diode_fsize = 12;
        font_size = 12;
        diode_radius = 14;
        button_font_size = 13;
        bt_circle_radius = 24;
        bt_circle_fsize = 12; 
      }
      if(ScreenSize == "extrasmall" && ScreenOrientation == "unknown")
      {
        diode_fsize = 10;
        font_size = 10;
        diode_radius = 11;
        button_font_size = 12;
        bt_circle_radius = 22;
        bt_circle_fsize = 11; 
      }
      if(ScreenSize == "sextrasmall" && ScreenOrientation == "unknown")
      {
        diode_fsize = 5;
        font_size = 8;
        diode_radius = 6;
        button_font_size = 6;
        bt_circle_radius = 14;
        bt_circle_fsize = 8; 
      }

      return {diode_fsize, 
              font_size,
              button_font_size,
              diode_radius,
              bt_circle_radius,
              bt_circle_fsize}
 
}

/* export function GetTextHeight(cntx:CanvasRenderingContext2D)
{
  var height = parseInt(cntx.font) * 1.2; 
  return height;
} */
