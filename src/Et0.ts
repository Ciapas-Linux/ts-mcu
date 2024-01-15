// USTAWIENIA PODSTAWOWE
import { SuperText } from './SuperText';
import { Button } from './Button';
import { CheckBox } from './CheckBox';
import { descriptionText,UpdateCanvas,SendCommand,setSize,DrawCircle,play_key,play_alert,play_button,drawText,ctx,deviceWidth,deviceHeight, canvas } from './lib';

// ETAP 0 BASIC: settings--> ⏱️
export class Et0 
{ 
    visible:boolean = false;
    font_size:number = 0;

    // supertexty
    AlarmZbiornik:SuperText;
    AlarmGlowica:SuperText;

    st_G1:SuperText;
    st_G2:SuperText;
    st_G3:SuperText;
    
    ModulMocyR_cb:CheckBox;
    CzujnikZalania_cb:CheckBox;
    WZal_st:SuperText;
  
    //button
    KorektaTdnia:Button;
     
    ClickedOptionNumber:number = 0; // 2 options
    
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;
       this.input.style.visibility = 'hidden';
       this.input.type = 'number';
       this.input.inputMode = 'decimal';
       this.input.pattern = '[0-9.]+';
       this.input.id = "srka_0";
       this.input.style.boxShadow = "0px 0px 20px blue";
       this.input.style.textShadow = '3px 3px 4px #262626';
       this.input.style.color = 'rgb(0, 0, 0)';
       this.input.style.caretColor = 'rgb(200, 0, 0)';
       this.input.style.position = 'fixed';
       this.input.style.padding = '10px';
       this.input.style.font = 'bold '+ this.font_size*1.5 + 'pt Arial';
       this.input.style.width = '40%';
       this.input.style.border =  '3px solid var(--input-border)';
       this.input.style.borderRadius =  '5px';
       this.input.style.backgroundColor =  '#888';
       this.input.style.zIndex = '1000';
       this.input.style.left = 25 + 'px';
       this.input.style.top = 25 + 'px';
       this.input.value = "";
       this.input.maxLength = 6;
       this.input.min = '0';
       this.input.max = '150';
       this.input.title = "";
       this.input.onkeydown = this.handleEnter.bind(this);
       this.input.oninput = this.handleInput.bind(this);
       document.body.appendChild(this.input);
       this.input.addEventListener("focusout", this.handleFocus.bind(this));
 

       this.KorektaTdnia = new Button("KOREKTA.TD",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(200,55,44)');
       this.KorektaTdnia.Show();

       this.AlarmZbiornik = new SuperText("Alarm Zbiornik:",this.KorektaTdnia.x,this.KorektaTdnia.y,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.AlarmZbiornik.value_type = "   0-120 °C 🌡️";
       this.AlarmZbiornik.Show();

       this.AlarmGlowica = new SuperText("Alarm Głowica:",this.AlarmZbiornik.x,this.AlarmZbiornik.y + this.AlarmZbiornik.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.AlarmGlowica.value_type = "   0-120 °C 🌡️";
       this.AlarmGlowica.Show();

       this.st_G1 = new SuperText("G1:",this.AlarmGlowica.x,this.AlarmGlowica.y + this.AlarmGlowica.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.st_G1.value_type = " w";
       this.st_G1.Show();

       this.st_G2 = new SuperText("G2:",this.st_G1.x,this.st_G1.y + this.st_G1.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.st_G2.value_type = " w";
       this.st_G2.Show();

       this.st_G3 = new SuperText("G3:",this.st_G2.x,this.st_G2.y + this.st_G2.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.st_G3.value_type = " w";
       this.st_G3.Show();

       this.ModulMocyR_cb = new CheckBox("Moduł mocy regulowany",this.st_G3.x,this.st_G3.y + this.st_G3.height*2,30,30,15,'rgb(214,214,200)');
       this.ModulMocyR_cb.Show();

       this.CzujnikZalania_cb = new CheckBox("Czujnik zalania",this.st_G3.x,this.st_G3.y + this.st_G3.height*2,30,30,15,'rgb(214,214,200)');
       this.CzujnikZalania_cb.Show();

       this.WZal_st = new SuperText("Wartość zalania:",this.CzujnikZalania_cb.x,this.CzujnikZalania_cb.y + this.CzujnikZalania_cb.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.WZal_st.value_type = "";
       this.WZal_st.Show();
       
       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.KorektaTdnia.update(deviceWidth/13 ,deviceHeight/7,this.KorektaTdnia.width,this.KorektaTdnia.height,this.KorektaTdnia.radius);
      this.AlarmZbiornik.update(this.KorektaTdnia.x,this.KorektaTdnia.y + this.KorektaTdnia.height*1.3);
      this.AlarmGlowica.update(this.AlarmZbiornik.x,this.AlarmZbiornik.y + this.AlarmZbiornik.height*1.7);
      this.st_G1.update(this.AlarmGlowica.x,this.AlarmGlowica.y + this.AlarmGlowica.height*1.6);
      this.st_G2.update(this.st_G1.x,this.st_G1.y + this.st_G1.height*1.6);
      this.st_G3.update(this.st_G2.x,this.st_G2.y + this.st_G2.height*1.6);
      this.ModulMocyR_cb.update(this.st_G3.x,this.st_G3.y + this.st_G3.height*1.6,25,25);
      this.CzujnikZalania_cb.update(this.ModulMocyR_cb.x,this.ModulMocyR_cb.y + this.ModulMocyR_cb.height*1.6,25,25);
      this.WZal_st.update(this.CzujnikZalania_cb.x,this.CzujnikZalania_cb.y + this.CzujnikZalania_cb.height*1.6);
     
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
      
      ctx.font = 'bold '+ this.font_size*1.8 + 'pt Arial';
      let fheight = (this.font_size*2)*1.2;  
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("USTAWIENIA ⚙️",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("USTAWIENIA ⚙️",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("podstawowe 😼",deviceWidth/2,deviceHeight/35 + fheight);


      this.KorektaTdnia.draw();
      this.AlarmZbiornik.draw();
      this.AlarmGlowica.draw();
      this.st_G1.draw();
      this.st_G2.draw();
      this.st_G3.draw();
      this.ModulMocyR_cb.draw();
      this.CzujnikZalania_cb.draw();
      this.WZal_st.draw();

      // OPIS
      ctx.font = 'bold '+ this.font_size*0.8 + 'pt Arial';
      var txt_height = this.font_size*0.9;
      var text:string = "Podstawowe ustawienia sterownika. KOREKTA.TD powoduje ponowne ustalenie temperatury dnia, można ustawić alarmy temperatury, moc grzałek jakie posiadamy, oraz czy mamy moduł mocy regulowany, a także czy jest czujnik zalania.";
      //wrapText(text,this.TempKolumna.x,this.TempKolumna.y + this.TempKolumna.height*2,deviceWidth/2,txt_height);
      descriptionText("UWAGA (!)",text,this.WZal_st.x ,this.WZal_st.y + txt_height * 2.5 ,deviceWidth/1.35,txt_height*1.30,'#0078FF','rgb(200,170,170)');

      ctx.shadowBlur = 0;
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;

            
      if(this.KorektaTdnia.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        SendCommand("#tmpdnia#");
        return "tmpdnia";
      }

      if(this.AlarmZbiornik.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(x, y);
        this.input.title = "Alarm na zbiorniku:";
        this.input.placeholder = "00.0";

        return "";
      }

      if(this.WZal_st.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 6;
        this.addInput(x, y);
        this.input.title = "Wartość zalania:";
        this.input.placeholder = "000";

        return "";
      }

      if(this.AlarmGlowica.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(x, y);
        this.input.title = "Alarm na głowicy:";
        this.input.placeholder = "00.0";
       
        return "";
      }

      if(this.st_G1.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 3;
        this.addInput(x, y);
        this.input.title = "Moc grzałki 1:";
        this.input.placeholder = "00000";

       
        return "";
      }

      if(this.st_G2.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 4;
        this.addInput(x, y);
        this.input.title = "Moc grzałki 2:";
        this.input.placeholder = "00000";
        return "";
      }

      if(this.st_G3.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 5;
        this.addInput(x, y);
        this.input.title = "Moc grzałki 3:";
        this.input.placeholder = "00000";
        return "";
      }

      if(this.ModulMocyR_cb.clicked(x,y))  // checkbox
      {
          play_key();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.ModulMocyR_cb.Status() == true )
          {
            this.ModulMocyR_cb.Off();
          }else
          {
            this.ModulMocyR_cb.On();
          }

          SendCommand("#ModReg:" + this.ModulMocyR_cb.Status());

          this.ModulMocyR_cb.draw();

          return "CHKBOX1";
      }

      if(this.CzujnikZalania_cb.clicked(x,y))  // checkbox
      {
          play_key();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.CzujnikZalania_cb.Status() == true )
          {
            this.CzujnikZalania_cb.Off();
          }else
          {
            this.CzujnikZalania_cb.On();
          }

          SendCommand("#CzujZal:" + this.CzujnikZalania_cb.Status());
          this.CzujnikZalania_cb.draw();

          return "CHKBOX1";
      }
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

         if(this.KorektaTdnia.hoover(x,y) == true ||
           this.AlarmZbiornik.hoover(x,y)  == true ||
           this.st_G1.hoover(x,y)  == true ||
           this.st_G2.hoover(x,y)  == true ||
           this.st_G3.hoover(x,y)  == true ||
           this.AlarmGlowica.hoover(x,y) == true ||
           this.ModulMocyR_cb.hoover(x,y) == true ||
           this.ModulMocyR_cb.hoover(x,y) == true ||
           this.WZal_st.hoover(x,y) == true 
          )
        {
           document.body.style.cursor = 'pointer';
        }else
        {
           document.body.style.cursor = 'default';
        }

        this.AlarmZbiornik.OnMouseMove(x,y);
      
    }
    
   
    handleInput(e:any)
    {
      //this.input.value = this.input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
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
           drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
           canvas.focus();
           this.input.value = "";
           this.input.style.visibility = 'hidden';
           UpdateCanvas(false);
       }
    }

    SwitchOption()
    {
      switch(this.ClickedOptionNumber)
      {
          case 1: 
          {
               this.AlarmZbiornik.value = parseFloat(this.input.value);
               if(this.AlarmZbiornik.value > 120 || isNaN(this.AlarmZbiornik.value) == true)
               {
                  this.AlarmZbiornik.value = 0.0;
               }else
               {
                 SendCommand("#alarmZB:" + this.AlarmZbiornik.value);
               }

          }
          break; 

          case 2: 
          {
               this.AlarmGlowica.value = parseFloat(this.input.value);
               if(this.AlarmGlowica.value > 120 || isNaN(this.AlarmGlowica.value) == true)
               {
                  this.AlarmGlowica.value = 0.0;
               }else
               {
                  SendCommand("#alarmGLO:" + this.AlarmGlowica.value);
               }
          }
          break; 

          case 3: 
          {
               this.st_G1.value = parseInt(this.input.value);
               if(this.st_G1.value > 15000 || isNaN(this.st_G1.value) == true)
               {
                  this.st_G1.value = 0;
               }else
               {
                  SendCommand("#G1val:" + this.st_G1.value);
               }
          }
          break; 

          case 4: 
          {
               this.st_G2.value = parseInt(this.input.value);
               if(this.st_G2.value > 15000 || isNaN(this.st_G2.value) == true)
               {
                  this.st_G2.value = 0;
               }else
               {
                  SendCommand("#G2val:" + this.st_G2.value);
               }
          }
          break; 

          case 5: 
          {
               this.st_G3.value = parseInt(this.input.value);
               if(this.st_G3.value > 15000 || isNaN(this.st_G3.value) == true)
               {
                  this.st_G3.value = 0;
               }else
               {
                  SendCommand("#G3val:" + this.st_G3.value);
               }
          }
          break; 

          case 6: 
          {
               this.WZal_st.value = parseInt(this.input.value);
               if(this.WZal_st.value > 1200 || isNaN(this.WZal_st.value) == true)
               {
                  this.WZal_st.value = 0;
               }else
               {
                  SendCommand("#WZalvalue:" + this.WZal_st.value);
               }
          }
          break; 
      }
      this.ClickedOptionNumber = 0; 
    }

    addInput(x:number, y:number)
    {
        this.input.style.visibility = 'visible';
        this.input.focus();
    }   

       
 }
