// PŁUKANIE OLM

import { SuperText } from './SuperText';
import { CheckBox } from './CheckBox';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,ctx,deviceWidth,deviceHeight} from './lib';

// ETAP 6 : settings
export class Et6 
{ 
    visible:boolean = false;
    font_size:number = 0;
    CzasPlukaniaOLM:SuperText;
      
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

        this.input.style.visibility = 'hidden'; 
        this.input.type = 'number';
        this.input.inputMode = 'decimal';
        this.input.pattern = '[0-9.]+';
        this.input.step = 'any';
        this.input.id = "sraka_9h";
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
        this.input.addEventListener("focusout", this.handleFocus.bind(this));
       

       this.CzasPlukaniaOLM = new SuperText("Czas Płuknia:",deviceWidth/8,deviceHeight/4,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasPlukaniaOLM.value_type = " sek ⏱️";
       this.CzasPlukaniaOLM.Show();
       
       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.CzasPlukaniaOLM.update(deviceWidth/13,deviceHeight/4);
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
      let fheight = (this.font_size*1.3)*1.2;  
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("ETAP 6 💦",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("ETAP 6 💦",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("Płukanie OLM",deviceWidth/2,deviceHeight/35 + fheight);


      // super text:
      this.CzasPlukaniaOLM.draw();

      //parametr:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      
      // OPIS
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      var txt_height = this.font_size;
      var text:string = "[0-300 sek] Na wybrany czas otworzy się EZ płukanie OLM";
      descriptionText("Czas Płukania:",text,this.CzasPlukaniaOLM.x,this.CzasPlukaniaOLM.y + this.CzasPlukaniaOLM.height*2,deviceWidth/1.3,txt_height*1.5,'#0078FF','rgb(200,200,0)');
    
      ctx.shadowBlur = 0;
     

    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.CzasPlukaniaOLM.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.addInput(x, y);
        this.input.title = "Płukanie OLM:";
        this.input.placeholder = "sek";
        return "";
      }
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.CzasPlukaniaOLM.hoover(x,y) == true)
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
    }

    handleEnter(e:any)
    {
       var keyCode = e.keyCode;
       //const isNumber = isFinite(e.key);
       const whitelist = ['Backspace','Delete','ArrowDown','ArrowUp','ArrowRight','ArrowLeft'];
       const whitelistKey = whitelist.includes(e.key);

       if (keyCode === 13) // user hit enter
       {
           play_key();
           setTimeout(play_alert, 1000);
           if(parseFloat(this.input.value) < 300 )
           {
              this.CzasPlukaniaOLM.value = parseFloat(this.input.value);
              SendCommand("#gCzas_POLM:" + this.CzasPlukaniaOLM.value);
           }
           drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
           this.input.style.visibility = 'hidden';
           this.input.value = "";
           canvas.focus();
           UpdateCanvas(false); 
       }
    }

    handleFocus()
    {
      if(this.input.style.visibility == 'visible')
      {
        play_key();
        if(parseFloat(this.input.value) < 300 )
        this.CzasPlukaniaOLM.value = parseFloat(this.input.value);
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
