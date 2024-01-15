

import { SuperText } from './SuperText';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,wrapText,ctx,deviceWidth,deviceHeight,ScreenSize,ScreenOrientation,DrawText,MeasureTextHeight } from './lib';

// ETAP 1 TERMOSTATA: settings
export class Et0t 
{ 
    visible:boolean = false;
    font_size:number = 0;
    TermostatStop:SuperText;
    TermostatStart:SuperText;
    ClickedOptionNumber:number = 0; // 2 options
      
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

       this.input.style.visibility = 'hidden';
       this.input.type = 'number';
       this.input.inputMode = 'decimal';
       this.input.pattern = '[0-9.]+';
       this.input.step = 'any';
       this.input.id = "sraka_1";
       this.input.style.boxShadow = "0px 0px 20px blue";
       this.input.style.textShadow = '3px 3px 4px #262626';
       this.input.style.color = 'rgb(0, 0, 0)';
       this.input.style.caretColor = 'rgb(200, 0, 0)';
       this.input.style.position = 'fixed';
       this.input.style.padding = '10px';
       this.input.style.font = 'bold '+ this.font_size*1.5 + 'pt Arial';
       this.input.style.width = '40%';
       this.input.style.border =  '5px solid var(--input-border)';
       this.input.style.borderRadius =  '5px';
       this.input.style.backgroundColor = '#888';
       this.input.style.zIndex = '1000';
       this.input.style.left = 25 + 'px';
       this.input.style.top = 25 + 'px';
       this.input.value = "";
       this.input.onkeydown = this.handleEnter.bind(this);
       this.input.oninput = this.handleInput.bind(this);
       document.body.appendChild(this.input);
       this.input.addEventListener("focusout",this.handleFocus.bind(this));
     

       this.TermostatStop = new SuperText("Termostat Stop:",deviceWidth/6,deviceHeight/4,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.TermostatStop.value_type = " ℃ 🌡️";
       this.TermostatStop.Show();

       this.TermostatStart = new SuperText("Termostat Start:",this.TermostatStop.x,this.TermostatStop.y + this.TermostatStop.height,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.TermostatStart.value_type = " ℃ 🌡️";
       this.TermostatStart.Show();

       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.TermostatStop.update(deviceWidth/13,deviceHeight/6);
      this.TermostatStart.update(this.TermostatStop.x,this.TermostatStop.y + this.TermostatStop.height*2);
    }
    
    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    draw()
    { 
      if(this.visible == false) return;
      
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.font = 'bold '+ this.font_size*1.2 + 'pt Arial';
      ctx.textAlign = 'center'; 

      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("TERMOSTAT 🌡️",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("TERMOSTAT 🌡️",deviceWidth/2,deviceHeight/35);

      // super text:
      this.TermostatStop.draw();
      this.TermostatStart.draw();

      //parametr:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      
      // OPIS
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      var txt_height = this.font_size;
      var text:string = "[1–100°C] Kiedy temperatura na kolumnie przekroczy zadaną temperaturę wyłączy się grzanie zbiornika.";
      var endwt_y = descriptionText("Termostat stop grzanie:",text,this.TermostatStart.x,this.TermostatStart.y + this.TermostatStart.height*2,deviceWidth/1.2,txt_height*1.5,'#0078FF','rgb(200,200,0)');
    
      var text2:string = "[1–100°C] Kiedy temperatura na kolumnie spadnie poniżej zadanej temperatury to ponownie załączy się grzanie zbiornika.";
      descriptionText("Termostat start grzanie:",text2,this.TermostatStop.x,endwt_y + txt_height*2.5,deviceWidth/1.5,txt_height*1.2,'#0078FF','rgb(200,200,0)');
      

      ctx.shadowBlur = 0;
     

    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.TermostatStop.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(x, y);
        this.input.title = "Termostat stop";
        this.input.placeholder = "00.0";
        return "";
      }
      if(this.TermostatStart.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(x, y);
        this.input.title = "Termostat start";
        this.input.placeholder = "00.0";
        return "";
      }

    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.TermostatStop.hoover(x,y) == true ||
           this.TermostatStart.hoover(x,y) == true)
        {
            document.body.style.cursor = 'pointer';
        }else
        {
            document.body.style.cursor = 'default';
        }
      
    }
    
   
    handleInput(e:any)
    {
        //this.input.value = this.input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        //this.input.value = this.input.value.replace(/[^0-9]/g, '').replace(/(\*)\./g, '$1');
        // var val = this.input.value;
        // if(isNaN(Number(val)) == true)
        // {
        //   this.input.value = '123';
        // } 

        // console.log(this.input.value);

    }

    SwitchOption()
    {
      switch(this.ClickedOptionNumber)
            {
                case 1: 
                {
                  this.TermostatStop.value = parseFloat(this.input.value);
                  if(this.TermostatStop.value > 100 || isNaN(this.TermostatStop.value) == true)
                  {
                         this.TermostatStop.value = 0.0;
                  }else
                  {
                     SendCommand("#TerStop:" + this.TermostatStop.value);
                  }
                }
                break; 

                case 2: 
                {
                  this.TermostatStart.value = parseFloat(this.input.value);
                  if(this.TermostatStart.value > 100 || isNaN(this.TermostatStart.value) == true)
                  {
                        this.TermostatStart.value = 0.0;
                  }else
                  {
                    SendCommand("#TerStart:" + this.TermostatStart.value); 
                  }
                }
                break; 

            }
      this.ClickedOptionNumber = 0; 
    }

    handleFocus()
    {
      if(this.input.style.visibility == 'visible')
      {
        play_key();
        this.SwitchOption();
        drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
        this.input.value = "";
        this.input.style.visibility = 'hidden';
      }
    }


    handleEnter(e:any)
    {
       var keyCode = e.keyCode;
       //const isNumber = isFinite(e.key);
       //const whitelist = ['Backspace','Delete','ArrowDown','ArrowUp','ArrowRight','ArrowLeft'];
       //const whitelistKey = whitelist.includes(e.key);

       if (keyCode === 13) // user hit enter
       {
           play_key();

           setTimeout(play_alert, 1000);
           this.SwitchOption();
           window.removeEventListener("focusout", this.handleFocus.bind(this));
           drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
           canvas.focus(); 
           //document.body.removeChild(this.input);
           //var elem = document.getElementById("sraka_1");
           //elem.parentElement.removeChild(elem);
           this.input.style.visibility = 'hidden';
           this.input.value = ""; 
           UpdateCanvas(false);
           //this.input.remove();
           //setTimeout(this.draw.bind(this),500);
       }
    }

    addInput(x:number, y:number)
    {
      this.input.style.visibility = 'visible';
      this.input.focus();
    }   

       
 }
