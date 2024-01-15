

import { SuperText } from './SuperText';
import { CheckBox } from './CheckBox';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,wrapText,ctx,deviceWidth,deviceHeight,ScreenSize,ScreenOrientation,DrawText,MeasureTextHeight } from './lib';

// ETAP 3 STABILIZACJA: settings-->
export class Et3 
{ 
    visible:boolean = false;
    font_size:number = 0;

    //ModulMocyR_cb:CheckBox;
    Grzalka1_cb:CheckBox;
    Grzalka2_cb:CheckBox;
    Grzalka3_cb:CheckBox;
    
    CzasStabilizacji:SuperText;
    Grzalka1:SuperText;
    ClickedOptionNumber:number = 0; // 3 options
    
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

        this.input.style.visibility = 'hidden'; 
        this.input.type = 'number';
        this.input.inputMode = 'decimal';
        this.input.pattern = '[0-9.]+';
        this.input.step = 'any';
        this.input.id = "sraka_6e";
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
        this.input.onkeydown = this.handleEnter.bind(this);
        this.input.oninput = this.handleInput.bind(this);
        document.body.appendChild(this.input);
        this.input.addEventListener("focusout", this.handleFocus.bind(this));
      
       
       this.CzasStabilizacji = new SuperText("Czas stabilizacji:",deviceWidth/8,deviceHeight/4,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasStabilizacji.value_type = " min ⏱️";
       this.CzasStabilizacji.Show();

       this.Grzalka1 = new SuperText("Grzałka 1:",deviceWidth/8,this.CzasStabilizacji.y + this.CzasStabilizacji.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.Grzalka1.value_type = " % ♨️";
       this.Grzalka1.Show();

       //this.ModulMocyR_cb = new CheckBox("Moduł mocy regulowany",deviceWidth/8,this.Grzalka1.y + this.Grzalka1.height*2,30,30,15,'rgb(214,214,200)');
       //this.ModulMocyR_cb.Show();

       this.Grzalka1_cb = new CheckBox("Grzałka I",deviceWidth/8,this.Grzalka1.y + this.Grzalka1.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka1_cb.Show();

       this.Grzalka2_cb = new CheckBox("Grzałka II",deviceWidth/8,this.Grzalka1_cb.y + this.Grzalka1_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka2_cb.Show();

       this.Grzalka3_cb = new CheckBox("Grzałka III",deviceWidth/8,this.Grzalka2_cb.y + this.Grzalka2_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka3_cb.Show();
       
       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      // super texts:
      this.CzasStabilizacji.update(deviceWidth/13,deviceHeight/6);
      this.Grzalka1.update(deviceWidth/13,this.CzasStabilizacji.y + this.CzasStabilizacji.height*1.8);
      
      // check boxes:
      this.Grzalka1_cb.update(deviceWidth/13,this.Grzalka1.y + this.Grzalka1.height*1.4,30,30);
      this.Grzalka2_cb.update(deviceWidth/13,this.Grzalka1_cb.y + this.Grzalka1_cb.height*1.4,30,30);
      this.Grzalka3_cb.update(deviceWidth/13,this.Grzalka2_cb.y + this.Grzalka2_cb.height*1.4,30,30);
          
  
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
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("ETAP 3",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("ETAP 3",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("stabilizacja kolumny",deviceWidth/2,deviceHeight/35 + fheight);


      // super text:
      this.CzasStabilizacji.draw();
      this.Grzalka1.draw();
     
      //check boxes:
      this.Grzalka1_cb.draw();
      this.Grzalka2_cb.draw();  
      this.Grzalka3_cb.draw();    

      // OPISY:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      ctx.font = 'bold '+ this.font_size*0.8 + 'pt Arial';
      var txt_height = this.font_size;
      var text1:string = "Wybierz czas pasujący do twojego zbiornika.";
      var endwt_y = descriptionText("Czas [0-600min] Czas stabilizacji kolumny 🛈",text1,this.Grzalka3_cb.x,this.Grzalka3_cb.y + this.Grzalka3_cb.height*1.5,deviceWidth/1.5,txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      //var text2:string = "Jeżeli posiadasz regulowany moduł mocy to zaznacz a jeżeli nie to zostaw puste pole.";
      //endwt_y = descriptionText("Moduł mocy regulowany:",text2,this.Grzalka3_cb.x ,endwt_y + txt_height*1.5,deviceWidth/1.5, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      var text3:string = "[0-100 %] Płynna regulacja mocy PWM.";
      descriptionText("Grzałka 1:",text3,this.Grzalka3_cb.x ,endwt_y + txt_height*1.5,deviceWidth/1.5, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      descriptionText("I-II-III:","Możesz zaznaczyć ile grzałek ma być włączone podczas tego etapu.",this.Grzalka3_cb.x ,endwt_y + txt_height*4.5,deviceWidth/1.5, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     

      ctx.shadowBlur = 0;
     
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.CzasStabilizacji.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(x, y);
        this.input.title = "Czas stabilizacji";
        this.input.placeholder = "min";
        return "";
      }

      if(this.Grzalka1.clicked(x,y)) // super text
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(x, y);
        this.input.title = "Grzałka 1";
        this.input.placeholder = "00000";
        return "";
      }

     
      if(this.Grzalka1_cb.clicked(x,y))  // checkbox
      {
          play_key();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.Grzalka1_cb.Status() == true )
          {
            this.Grzalka1_cb.Off();
          }else
          {
            this.Grzalka1_cb.On();
          }

          SendCommand("#gStb_G1:" + this.Grzalka1_cb.Status());

          this.Grzalka1_cb.draw();

          return "CHKBOX1";
      }

      if(this.Grzalka2_cb.clicked(x,y))
      {
          play_key();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.Grzalka2_cb.Status() == true )
          {
            this.Grzalka2_cb.Off();
          }else
          {
            this.Grzalka2_cb.On();
          }
          SendCommand("#gStb_G2:" + this.Grzalka2_cb.Status());
          this.Grzalka2_cb.draw();
          return "CHKBOX1";
      }

      if(this.Grzalka3_cb.clicked(x,y))
      {
          play_key();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.Grzalka3_cb.Status() == true )
          {
            this.Grzalka3_cb.Off();
          }else
          {
            this.Grzalka3_cb.On();
          }
          SendCommand("#gStb_G3:" + this.Grzalka3_cb.Status());
          this.Grzalka3_cb.draw();
          return "CHKBOX1";
      }
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.CzasStabilizacji.hoover(x,y)      == true ||
           this.Grzalka1.hoover(x,y)   == true ||
           this.Grzalka1_cb.hoover(x,y) == true ||
           this.Grzalka2_cb.hoover(x,y)  == true ||
           this.Grzalka3_cb.hoover(x,y)  == true )
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
           this.SwitchOption();
           drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
           this.input.style.visibility = 'hidden';
           this.input.value = "";
           canvas.focus();
           UpdateCanvas(false); 
       }
    }

    SwitchOption()
    {
      switch(this.ClickedOptionNumber)
      {
          case 1: // CzasStabilizacji
          {
               this.CzasStabilizacji.value = parseFloat(this.input.value);
               if(this.CzasStabilizacji.value > 600)
               {
                    this.CzasStabilizacji.value = 0;
               }else
               {
                SendCommand("#CzasStb:" + this.CzasStabilizacji.value);
               }
          }
          break; 

          case 2: // Grzalka1
          {
               this.Grzalka1.value = parseFloat(this.input.value);
               if(this.Grzalka1.value > 100)
               {
                this.Grzalka1.value = 0;
               }else
               {
                //#gStb_G1pwm:
                SendCommand("#gStb_G1pwm:" + this.Grzalka1.value);
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
