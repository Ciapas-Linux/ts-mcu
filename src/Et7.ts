// ODB. GONU
import { SuperText } from './SuperText';
import { CheckBox } from './CheckBox';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,ctx,deviceWidth,deviceHeight} from './lib';

// ETAP 7 GON: settings-->
export class Et7 
{ 
    visible:boolean = false;
    font_size:number = 0;

    // supertexty
    CzasZakonczeniaZKROK:SuperText;
    HisterezaG_open:SuperText;
    HisterezaG_close:SuperText;
    Grzalka1:SuperText;

    Bufor80_st:SuperText;
    Bufor60_st:SuperText;
    Bufor40_st:SuperText;
    
     
    // checkboxy
    Grzalka1_cb:CheckBox;
    Grzalka2_cb:CheckBox;
    Grzalka3_cb:CheckBox;
    Bufor_cb:CheckBox;

    ClickedOptionNumber:number = 0; // 5 options
    
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

        this.input.style.visibility = 'hidden'; 
        this.input.type = 'number';
        this.input.inputMode = 'decimal';
        this.input.pattern = '[0-9.]+';
        this.input.step = 'any';
        this.input.id = "sraka_10i";
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
       
       
       this.CzasZakonczeniaZKROK = new SuperText("Zakończenie kroku:",deviceWidth/8,deviceHeight/8,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasZakonczeniaZKROK.value_type = " min ⏱️";
       this.CzasZakonczeniaZKROK.Show();

       this.HisterezaG_open = new SuperText("Hist.otwarcia:",deviceWidth/8,this.CzasZakonczeniaZKROK.y + this.CzasZakonczeniaZKROK.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.HisterezaG_open.value_type = " °C 🌡️";
       this.HisterezaG_open.Show();

       this.HisterezaG_close = new SuperText("Hist.zamknięcia:",deviceWidth/8,this.HisterezaG_open.y + this.HisterezaG_open.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.HisterezaG_close.value_type = " °C 🌡️";
       this.HisterezaG_close.Show();

       this.Grzalka1 = new SuperText("Grzałka 1:",deviceWidth/8,this.HisterezaG_close.y + this.HisterezaG_close.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.Grzalka1.value_type = " % ♨️";
       this.Grzalka1.Show();

       this.Grzalka1_cb = new CheckBox("Grzałka I",deviceWidth/8,this.Grzalka1.y + this.Grzalka1.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka1_cb.Show();

       this.Grzalka2_cb = new CheckBox("Grzałka II",deviceWidth/8,this.Grzalka1_cb.y + this.Grzalka1_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka2_cb.Show();

       this.Grzalka3_cb = new CheckBox("Grzałka III",deviceWidth/8,this.Grzalka2_cb.y + this.Grzalka2_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka3_cb.Show();

       this.Bufor_cb = new CheckBox("Bufor",deviceWidth/8,this.Grzalka3_cb.y + this.Grzalka3_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Bufor_cb.Show();

       this.Bufor80_st = new SuperText("Temp.Bufor 80%:",deviceWidth/8,this.Bufor_cb.y + this.Bufor_cb.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.Bufor80_st.value_type = " °C 🌡️";
       this.Bufor80_st.Show();

       this.Bufor60_st = new SuperText("Temp.Bufor 60%:",deviceWidth/8,this.Bufor80_st.y + this.Bufor80_st.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.Bufor60_st.value_type = " °C 🌡️";
       this.Bufor60_st.Show();

       this.Bufor40_st = new SuperText("Temp.Bufor 40%:",deviceWidth/8,this.Bufor60_st.y + this.Bufor60_st.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.Bufor40_st.value_type = " °C 🌡️";
       this.Bufor40_st.Show();
       
       this.update();
      
    }

    update()
    { 
    
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.CzasZakonczeniaZKROK.update(deviceWidth/13,deviceHeight/8);
      this.HisterezaG_open.update(deviceWidth/13,this.CzasZakonczeniaZKROK.y + this.CzasZakonczeniaZKROK.height*1.6);
      this.HisterezaG_close.update(deviceWidth/13,this.HisterezaG_open.y + this.HisterezaG_open.height*1.6);
      this.Grzalka1.update(deviceWidth/13,this.HisterezaG_close.y + this.HisterezaG_close.height*1.6);
      this.Grzalka1_cb.update(deviceWidth/13,this.Grzalka1.y + this.Grzalka1.height*1.4,30,30);
      this.Grzalka2_cb.update(deviceWidth/13,this.Grzalka1_cb.y + this.Grzalka1_cb.height*1.3,30,30);
      this.Grzalka3_cb.update(deviceWidth/13,this.Grzalka2_cb.y + this.Grzalka2_cb.height*1.3,30,30);
      this.Bufor_cb.update(deviceWidth/13,this.Grzalka3_cb.y + this.Grzalka3_cb.height*1.3,30,30);
      this.Bufor80_st.update(deviceWidth/13,this.Bufor_cb.y + this.Bufor_cb.height*1.6);
      this.Bufor60_st.update(deviceWidth/13,this.Bufor80_st.y + this.Bufor80_st.height*1.6);
      this.Bufor40_st.update(deviceWidth/13,this.Bufor60_st.y + this.Bufor60_st.height*1.6);


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
      let fheight = (this.font_size*2)*1.2;  
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("7 Odbiór destylatu❤️",deviceWidth/2,fheight/2);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("7 Odbiór destylatu❤️",deviceWidth/2,fheight/2);

      this.CzasZakonczeniaZKROK.draw();
      this.HisterezaG_open.draw();
      this.HisterezaG_close.draw();
      this.Grzalka1.draw();
      this.Grzalka1_cb.draw();
      this.Grzalka2_cb.draw();
      this.Grzalka3_cb.draw();
      this.Bufor_cb.draw();
      this.Bufor80_st.draw();
      this.Bufor60_st.draw();
      this.Bufor40_st.draw();
  

      // OPISY:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      ctx.font = 'bold '+ this.font_size/1.5 + 'pt Arial';
      var txt_height = this.font_size/1.3;
      //var text1:string = "[1-60 min] Jeżeli po tym czasie nie ustabilizuje się kolumna to odbiór destylatu zostanie przerwany i przejdzie do następnego etapu.";
      //var endwt_y = descriptionText("Zakończenie kroku:",text1,this.Bufor_cb.x,this.Bufor_cb.y + this.Bufor_cb.height*1.5,deviceWidth/1.2,txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      //var text2:string = "[0,1-2,0°C] Jeżeli temperatura na kolumnie wzrośnie o temperaturę dnia + histerezę to otworzy się po przekroczeniu temperatury dnia + histereza otwarcia.";
      //endwt_y = descriptionText("Hist.otw. EZ kolumny:",text2,this.Bufor_cb.x ,endwt_y + txt_height*1.5,deviceWidth/1.2, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      //var text3:string = "[0,1-2,0°C] Po przekroczeniu temperatury dnia + histereza EZ kolumny się zamknie i przejdzie do odbioru krokowego.";
      //endwt_y = descriptionText("Hist.zamkn. EZ kolumny:",text3,this.Bufor_cb.x ,endwt_y + txt_height*1.5,deviceWidth/1.2, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
    
      ctx.shadowBlur = 0;
     
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.CzasZakonczeniaZKROK.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(x, y);
        this.input.title = "Czas zakończenia:";
        this.input.placeholder = "min";
        return "";
      }

      if(this.HisterezaG_open.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(x, y);
        this.input.title = "Hist. otwarcia:";
        this.input.placeholder = "00.0";
        return "";
      }

      if(this.HisterezaG_close.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 3;
        this.addInput(x, y);
        this.input.title = "Hist. zamknięcia:";
        this.input.placeholder = "00.0";
        return "";
      }

      if(this.Grzalka1.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 4;
        this.addInput(x, y);
        this.input.title = "Grzałka 1:";
        this.input.placeholder = "00000";
        return "";
      }

      if(this.Grzalka1_cb.clicked(x,y))
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
          SendCommand("#gGon_G1:" + this.Grzalka1_cb.Status());
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
          SendCommand("#gGon_G2:" + this.Grzalka2_cb.Status());
          this.Grzalka2_cb.draw();
          return "CHKBOX2";
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
          SendCommand("#gGon_G3:" + this.Grzalka3_cb.Status());
          this.Grzalka3_cb.draw();
          return "CHKBOX3";
      }

      if(this.Bufor_cb.clicked(x,y))
      {
          play_key();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.Bufor_cb.Status() == true )
          {
            this.Bufor_cb.Off();
          }else
          {
            this.Bufor_cb.On();
          }
          SendCommand("#gBufor:" + this.Bufor_cb.Status());
          this.Bufor_cb.draw();
          return "BUFOR";
      }

      if(this.Bufor80_st.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 5;
        this.addInput(x, y);
        this.input.title = "T.Bufor 80%:";
        this.input.placeholder = "00.0";
        return "";
      }

      if(this.Bufor60_st.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 6;
        this.addInput(x, y);
        this.input.title = "T.Bufor 60%:";
        this.input.placeholder = "00.0";
        return "";
      }

      if(this.Bufor40_st.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 7;
        this.addInput(x, y);
        this.input.title = "T.Bufor 40%:";
        this.input.placeholder = "00.0";
        return "";
      }

    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.CzasZakonczeniaZKROK.hoover(x,y)      == true ||
           this.HisterezaG_open.hoover(x,y)   == true ||
           this.HisterezaG_close.hoover(x,y) == true ||
           this.Grzalka1.hoover(x,y)  == true ||
           this.Grzalka1_cb.hoover(x,y)  == true ||
           this.Grzalka2_cb.hoover(x,y)  == true ||
           this.Grzalka3_cb.hoover(x,y)  == true ||
           this.Bufor_cb.hoover(x,y)  == true ||
           this.Bufor80_st.hoover(x,y)  == true ||
           this.Bufor60_st.hoover(x,y)  == true ||
           this.Bufor40_st.hoover(x,y)  == true  )
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
                case 1: // Czas zakończenia etapu krokowego
                {
                     this.CzasZakonczeniaZKROK.value = parseFloat(this.input.value);
                     if(this.CzasZakonczeniaZKROK.value > 60)
                     {
                        this.CzasZakonczeniaZKROK.value = 0;
                     }else
                     {
                      SendCommand("#gCzas_ZAKG:" + this.CzasZakonczeniaZKROK.value);
                     }
                }
                break; 

                case 2: // Histereza otwarcia zaworu kolumny.
                {
                     this.HisterezaG_open.value = parseFloat(this.input.value);
                     if(this.HisterezaG_open.value > 2.0)
                     {
                        this.HisterezaG_open.value = 0.0;
                     }else
                     {
                      SendCommand("#gHisG_open:" + this.HisterezaG_open.value);
                     }
                }
                break; 

                case 3: // Histereza zamknięcia zaworu kolumny.
                {
                     this.HisterezaG_close.value = parseFloat(this.input.value);
                     if(this.HisterezaG_close.value > 2.0)
                     {
                        this.HisterezaG_close.value = 0.0;
                     }else
                     {
                      SendCommand("#gHisG_close:" + this.HisterezaG_close.value);
                     }
                }
                break; 

                case 4: //Grzalka1
                {
                     this.Grzalka1.value = parseFloat(this.input.value);
                     if(this.Grzalka1.value > 100)
                     {
                      this.Grzalka1.value = 0;
                     }else
                     {
                      SendCommand("#gGon_G1pwm:" + this.Grzalka1.value);
                     }
                }
                break;
                
                case 5: //bufor 80%
                {
                     this.Bufor80_st.value = parseFloat(this.input.value);
                     if(this.Bufor80_st.value > 100)
                     {
                      this.Bufor80_st.value = 0;
                     }else
                     {
                      SendCommand("#TBufor80:" + this.Bufor80_st.value);
                     }
                }
                break; 

                case 6: //bufor 60%
                {
                     this.Bufor60_st.value = parseFloat(this.input.value);
                     if(this.Bufor60_st.value > 100)
                     {
                      this.Bufor60_st.value = 0;
                     }else
                     {
                      SendCommand("#TBufor60:" + this.Bufor60_st.value);
                     }
                }
                break;
                
                case 7: //bufor 40%
                {
                     this.Bufor40_st.value = parseFloat(this.input.value);
                     if(this.Bufor40_st.value > 100)
                     {
                      this.Bufor40_st.value = 0;
                     }else
                     {
                      SendCommand("#TBufor40:" + this.Bufor40_st.value);
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
