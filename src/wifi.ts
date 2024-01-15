
import { Button } from './Button';
import { SuperText } from './SuperText';
import { play_button,SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,drawText,ctx,deviceWidth,deviceHeight } from './lib';

// WIFI:
export class wifi 
{ 
    visible:boolean = false;
    font_size:number = 0;
    SSID:SuperText;
    PASS:SuperText;
    bSave:Button;
    ClickedOptionNumber:number = 0; // 2 options
      
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

       this.input.type = 'text';
       this.input.style.visibility = 'hidden'; 
       this.input.inputMode = 'text';
       this.input.id = "sraka_15b";
       this.input.style.boxShadow = "0px 0px 20px blue";
       this.input.style.textShadow = '3px 3px 4px #262626';
       this.input.style.color = 'rgb(0, 0, 0)';
       this.input.style.caretColor = 'rgb(200, 0, 0)';
       this.input.style.position = 'fixed';
       this.input.style.padding = '10px';
       this.input.style.font = 'bold '+ this.font_size*1.5 + 'pt Arial';
       this.input.style.width = '65%';
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
       
       this.SSID = new SuperText("Nazwa: ",deviceWidth/10,deviceHeight/4,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.SSID.value_type = "";
       this.SSID.value_txt = "";
       this.SSID.Show();

       this.PASS = new SuperText("Hasło:  ",deviceWidth/10,deviceHeight/4 + this.SSID.height *1.7 ,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.PASS.value_type = "";
       this.PASS.value_txt = "";
       this.PASS.Show();

       this.bSave = new Button("ZAPISZ",0,0,deviceWidth/7,40,10,'rgb(180,180,180)');
       this.bSave.Show();
       
       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;
      let fheight = (this.font_size*2)*1.6;

      this.bSave.update(this.bSave.width/2.8,
                        deviceHeight - this.bSave.height * 1.5,
                        this.bSave.width,
                        fheight,
                        this.bSave.radius);

      this.SSID.update(deviceWidth/15,deviceHeight/8);
      this.PASS.update(deviceWidth/15,deviceHeight/8 + this.SSID.height*1.7);
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
      
      ctx.font = 'bold '+ this.font_size*2 + 'pt Arial';
      //let fheight = (this.font_size*2)*1.2;
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      //ctx.lineWidth = 3;
      //ctx.strokeText("WIFI",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      //ctx.fillStyle = '#3faa0d';
      //ctx.fillText("WIFI",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("WIFI 📶",deviceWidth/2,deviceHeight/35);


      // super text:
      this.SSID.draw();
      this.PASS.draw();
      this.bSave.draw();

      //parametr:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      
      // OPIS
      ctx.font = 'bold '+ this.font_size*0.9 + 'pt Arial';
      var txt_height = this.font_size*0.9;
      var text:string = "Kliknij na nazwa sieci w ramce i wpisz nazwę swojej sieci wifi, wciśnij enter. Potem kliknij na pole hasło do sieci i wpisz hasło i wciśnij enter, następnie kliknij przycisk zapisz aby zapisać konfigurację. Potem należy zresetowac sterownik i być może połączy się z waszą siecią wifi.Gdy się połączy to adres IP panelu wyświetli się na ekranie lcd sterownika. Jeżeli sterownik nie połączy się z waszą siecią wtedy sam utworzy własną sieć wifi a adres będzie wyświetlony na wyświetlaczu lcd sterownika: 192.168.4.1. Aby skorzystać z panelu sterowania uzyskany z wyświetlacza na sterowniku adres IP, należy wpisać w pasek adresów przeglądarki internetowej np: firefox, opera, internet explorer, chrome po czym wcisnąć enter.";
      //wrapText(text,this.TempKolumna.x,this.TempKolumna.y + this.TempKolumna.height*2,deviceWidth/2,txt_height);
      descriptionText("UWAGA (!)",text,this.PASS.x,this.PASS.y + this.PASS.height*1.5,deviceWidth/1.15,txt_height*1.32,'#0078FF','rgb(200,170,170)');

      ctx.shadowBlur = 0;
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.SSID.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(20,20);
        return "";
      }

      if(this.PASS.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(20,20);
        return "";
      }

      if(this.bSave.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        return "save_options"; 
      }

    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.SSID.hoover(x,y) == true ||
           this.PASS.hoover(x,y) == true ||
           this.bSave.hoover(x,y) == true)
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

    SwitchOption()
    {
      switch(this.ClickedOptionNumber)
      {
           case 1: 
           {
            if(this.input.value != "")
            {
              if(this.input.value.length < 33)
              {
              this.SSID.value_txt = this.input.value;
              SendCommand("#gSSID:" + this.SSID.value_txt);
              }
            }
           }
           break; 

           case 2: 
           {
            if(this.input.value != "")
            {
              if(this.input.value.length < 64)
              {
              this.PASS.value_txt = this.input.value;
              SendCommand("#gPASS:" + this.PASS.value_txt);
              }
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
        play_button();
        this.SwitchOption();
        drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
        this.input.style.visibility = 'hidden';
        this.input.value = "";
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
           play_button();

           setTimeout(play_alert, 500);
           this.SwitchOption();
           //drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*4);
           this.input.style.visibility = 'hidden';
           this.input.value = "";
           canvas.focus();
           //this.draw();
           UpdateCanvas(false); 
       }
    }

    addInput(x:number, y:number)
    {
      this.input.style.visibility = 'visible';
      this.input.focus(); 
    }   

       
 }
