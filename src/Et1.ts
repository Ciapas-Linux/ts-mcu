

import { SuperText } from './SuperText';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,wrapText,ctx,deviceWidth,deviceHeight,ScreenSize,ScreenOrientation,DrawText,MeasureTextHeight } from './lib';

// ETAP 1 ROZGRZEWANIE: settings
export class Et1 
{ 
    visible:boolean = false;
    font_size:number = 0;
    TempKolumna:SuperText;
      
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

       this.input.style.visibility = 'hidden';  
       this.input.type = 'number';
       this.input.inputMode = 'decimal';
       this.input.pattern = '[0-9.]+';
       this.input.step = 'any';
       this.input.id = "raka_2a";
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
       

       this.TempKolumna = new SuperText("Temp.Kolumny (10p):",deviceWidth/9,deviceHeight/6,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.TempKolumna.value_type = " ℃ 🌡️";
       this.TempKolumna.Show();
       
       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.TempKolumna.update(deviceWidth/13,deviceHeight/6);
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
      
      ctx.font = 'bold '+ this.font_size*1.3 + 'pt Arial';
      ctx.textAlign = 'center'; 

      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("1 ROZGRZEWANIE 😈",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("1 ROZGRZEWANIE 😈",deviceWidth/2,deviceHeight/35);

      // super text:
      this.TempKolumna.draw();

      //parametr:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      
      // OPIS
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      var txt_height = this.font_size;
      var text:string = "[1 – 100 °C] po przekroczeniu powyższej temperatury otwiera się zawór woda i sterownik przechodzi do następnego etapu 2 czyli do zalewania.";
      //wrapText(text,this.TempKolumna.x,this.TempKolumna.y + this.TempKolumna.height*2,deviceWidth/2,txt_height);
     
      descriptionText("Temperatura kolumny:",text,this.TempKolumna.x,this.TempKolumna.y + this.TempKolumna.height*2,deviceWidth/1.2,txt_height*1.5,'#0078FF','rgb(200,200,0)');
    

      ctx.shadowBlur = 0;
     
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.TempKolumna.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.addInput(x, y);
        this.input.title = "Temp.Kolumna:";
        this.input.placeholder = "00.0";
        return "";
      }

     
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.TempKolumna.hoover(x,y) == true)
        {
            document.body.style.cursor = 'pointer';
        }else
        {
            document.body.style.cursor = 'default';
        }
      
    }
    
   
    handleInput(e:any)
    {
      //this.input.value = this.input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
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
           this.TempKolumna.value = parseFloat(this.input.value);
           if(this.TempKolumna.value > 100)
           {
            this.TempKolumna.value = 0.0;
           }else
           {
              SendCommand("#TmpSRgz:" + this.TempKolumna.value);
           }

           //this.input.blur();
           canvas.focus(); 
           drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
           //this.input.remove();
           this.input.style.visibility = 'hidden';  
           this.input.value = "";
           UpdateCanvas(true);
           
           //document.body.removeChild(this.input);
           //setTimeout(this.draw.bind(this),500);
       }
    }

    handleFocus()
    {
      if(this.input.style.visibility == 'visible')
      {
        play_key();
        this.TempKolumna.value = parseFloat(this.input.value);
        if(this.TempKolumna.value > 100)
          this.TempKolumna.value = 0.0;
        drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
        this.input.style.visibility = 'hidden';    
        this.input.value = "";
      }
    }

    addInput(x:number, y:number)
    {
      this.input.style.visibility = 'visible';
      this.input.focus();
    }   

       
 }
