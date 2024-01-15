// STABILIZACJA PRZEDGONU
import { SuperText } from './SuperText';
import { CheckBox } from './CheckBox';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,ctx,deviceWidth,deviceHeight} from './lib';

// ETAP 5 : settings
export class Et5 
{ 
    visible:boolean = false;
    font_size:number = 0;
    CzasStabilizacji:SuperText;
     
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

        this.input.style.visibility = 'hidden'; 
        this.input.type = 'number';
        this.input.inputMode = 'decimal';
        this.input.pattern = '[0-9.]+';
        this.input.step = 'any';
        this.input.id = "sraka_8g";
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
       
       this.CzasStabilizacji = new SuperText("Czas stabilizacji:",deviceWidth/8,deviceHeight/4,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasStabilizacji.value_type = " min ⏱️";
       this.CzasStabilizacji.Show();
       
       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.CzasStabilizacji.update(deviceWidth/13,deviceHeight/4);
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
      let fheight = (this.font_size*1.2)*1.2;
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("5 STABILIZACJA",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("5 STABILIZACJA",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("po odb.frakcji lekkich",deviceWidth/2,deviceHeight/35 + fheight);

      // super text:
      this.CzasStabilizacji.draw();

      //parametr:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      
      // OPIS
      //ctx.font = 'bold '+ this.font_size + 'pt Arial';
      var txt_height = this.font_size;
      var text:string = "[0-60 min] Stabilizacja kolumny z mocą odbioru destylatu z etapu 7, a następnie ustalenie temperatury dnia czyli odczyt temperatury na kolumnie po stabilizacji kolumny.";
      descriptionText("Czas stabilizacji:",text,this.CzasStabilizacji.x,this.CzasStabilizacji.y + this.CzasStabilizacji.height*2,deviceWidth/1.3,txt_height*1.5,'#0078FF','rgb(200,200,0)');
    
      ctx.shadowBlur = 0;
     

    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.CzasStabilizacji.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.addInput(x, y);
        this.input.title = "Czas stabilizacji";
        this.input.placeholder = "min";
        return "";
      }
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.CzasStabilizacji.hoover(x,y) == true)
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
           this.CzasStabilizacji.value = parseFloat(this.input.value);
           if(this.CzasStabilizacji.value > 60)
           {
            this.CzasStabilizacji.value = 0;
           }else
           {
            SendCommand("#gCzas_StbPrzg:" + this.CzasStabilizacji.value);
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
        this.CzasStabilizacji.value = parseFloat(this.input.value);
        if(this.CzasStabilizacji.value > 60)
        this.CzasStabilizacji.value = 0;
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
