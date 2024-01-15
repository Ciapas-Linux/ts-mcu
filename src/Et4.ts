// PRZEDGONIK
import { SuperText } from './SuperText';
import { CheckBox } from './CheckBox';
import { SendCommand,UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,ctx,deviceWidth,deviceHeight} from './lib';

// ETAP 4 PRZEDGON: settings-->
export class Et4 
{ 
    visible:boolean = false;
    font_size:number = 0;

    // supertexty
    CyklePrzedgonu:SuperText;
    CzasO_EZG:SuperText;
    CzasZ_EZG:SuperText;
    Grzalka1:SuperText;
    
    // checkboxy
    Grzalka1_cb:CheckBox;
    Grzalka2_cb:CheckBox;
    Grzalka3_cb:CheckBox;

    ClickedOptionNumber:number = 0; // 4 options
    
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.font_size = fsize;

       this.input.style.visibility = 'hidden'; 
       this.input.type = 'tel';
       this.input.inputMode = 'decimal';
       //this.input.pattern = '[0-9.]+';
       this.input.step = 'any';
       this.input.id = "sraka_7f";
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
             
       this.CyklePrzedgonu = new SuperText("Cykle przedgonu:",deviceWidth/6,deviceHeight/10,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CyklePrzedgonu.value_type = "";
       this.CyklePrzedgonu.Show();

       this.CzasO_EZG = new SuperText("Czas otw.EZ głowicy:",deviceWidth/6,this.CyklePrzedgonu.y + this.CyklePrzedgonu.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasO_EZG.value_type = "m/s ⏱️";
       this.CzasO_EZG.Show();

       this.CzasZ_EZG = new SuperText("Czas zam.EZ głowicy:",deviceWidth/6,this.CzasO_EZG.y + this.CzasO_EZG.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasZ_EZG.value_type = "m/s ⏱️";
       this.CzasZ_EZG.Show();

       this.Grzalka1 = new SuperText("Grzałka I:",deviceWidth/6,this.CzasZ_EZG.y + this.CzasZ_EZG.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.Grzalka1.value_type = " % ♨️";
       this.Grzalka1.Show();

       this.Grzalka1_cb = new CheckBox("Grzałka I",deviceWidth/8,this.Grzalka1.y + this.Grzalka1.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka1_cb.Show();

       this.Grzalka2_cb = new CheckBox("Grzałka II",deviceWidth/6,this.Grzalka1_cb.y + this.Grzalka1_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka2_cb.Show();

       this.Grzalka3_cb = new CheckBox("Grzałka III",deviceWidth/6,this.Grzalka2_cb.y + this.Grzalka2_cb.height*2,30,30,15,'rgb(214,214,200)');
       this.Grzalka3_cb.Show();
       
       this.update();
      
    }

    update()
    { 
    
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.CyklePrzedgonu.update(deviceWidth/13,deviceHeight/8);
      this.CzasO_EZG.update(deviceWidth/13,this.CyklePrzedgonu.y + this.CyklePrzedgonu.height*1.6);
      this.CzasZ_EZG.update(deviceWidth/13,this.CzasO_EZG.y + this.CzasO_EZG.height*1.6);
      this.Grzalka1.update(deviceWidth/13,this.CzasZ_EZG.y + this.CzasZ_EZG.height*1.6);
      this.Grzalka1_cb.update(deviceWidth/13,this.Grzalka1.y + this.Grzalka1.height*1.4,30,30);
      this.Grzalka2_cb.update(deviceWidth/13,this.Grzalka1_cb.y + this.Grzalka1_cb.height*1.3,30,30);
      this.Grzalka3_cb.update(deviceWidth/13,this.Grzalka2_cb.y + this.Grzalka2_cb.height*1.3,30,30);
      
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
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("4 PRZEDGON 🗑",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("4 PRZEDGON 🗑",deviceWidth/2,deviceHeight/35);

      this.CyklePrzedgonu.draw();
      this.CzasO_EZG.draw();
      this.CzasZ_EZG.draw();
      this.Grzalka1.draw();
      this.Grzalka1_cb.draw();
      this.Grzalka2_cb.draw();
      this.Grzalka3_cb.draw();
  

      // OPISY:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      ctx.font = 'bold '+ this.font_size*0.8 + 'pt Arial';
      var txt_height = this.font_size;
      var text1:string = "[0-10] Ilość zrzuconych jeziorek w głowicy.";
      var endwt_y = descriptionText("Cykle przedgonu:",text1,this.Grzalka3_cb.x,this.Grzalka3_cb.y + this.Grzalka3_cb.height*1.5,deviceWidth/1.1,txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      var text2:string = "[0-600 min/sek] Czas na jaki otworzy się elektrozawór w głowicy.";
      endwt_y = descriptionText("Czas otw.EZ głowicy:",text2,this.Grzalka3_cb.x ,endwt_y + txt_height*1.5,deviceWidth/1.1, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      var text3:string = "[0-120 min/sek] Czas na jaki zamknie się elektrozawór w głowicy.";
      endwt_y = descriptionText("Czas zam.EZ głowicy:",text3,this.Grzalka3_cb.x ,endwt_y + txt_height*1.5,deviceWidth/1.1, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      //var text5:string = "[0-2000W] Płynna regulacja mocy PWM.";
      endwt_y = descriptionText("I-II-III:","Tu możesz wybrać które grzałki mają być włączone w tym etapie.",this.Grzalka3_cb.x ,endwt_y + txt_height*1.5,deviceWidth/2, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     

      ctx.shadowBlur = 0;
      
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.CyklePrzedgonu.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(x, y);
        this.input.title = "Cykle przedgonu";
        this.input.placeholder = "0";
        return "";
      }

      if(this.CzasO_EZG.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(x, y);
        this.input.title = "Czas otwarcia EZ Głowicy:";
        this.input.placeholder = "min/sek";
        return "";
      }

      if(this.CzasZ_EZG.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 3;
        this.addInput(x, y);
        this.input.title = "Czas zamknięcia EZ Głowicy:";
        this.input.placeholder = "min/sek";
        return "";
      }

      if(this.Grzalka1.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 4;
        this.input.title = "Grzałka 1";
        this.input.placeholder = "00000";
        this.addInput(x, y);
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

          SendCommand("#gPrzg_G1:" + this.Grzalka1_cb.Status());

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

          SendCommand("#gPrzg_G2:" + this.Grzalka2_cb.Status());

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
          SendCommand("#gPrzg_G3:" + this.Grzalka3_cb.Status());
          this.Grzalka3_cb.draw();
          return "CHKBOX1";
      }

    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.CyklePrzedgonu.hoover(x,y)      == true ||
           this.CzasO_EZG.hoover(x,y)   == true ||
           this.CzasZ_EZG.hoover(x,y) == true ||
           this.Grzalka1.hoover(x,y)  == true ||
           this.Grzalka1_cb.hoover(x,y)  == true ||
           this.Grzalka2_cb.hoover(x,y)  == true ||
           this.Grzalka3_cb.hoover(x,y)  == true  )
        {
            document.body.style.cursor = 'pointer';
        }else
        {
            document.body.style.cursor = 'default';
        }
      
    }
    
   
    handleInput(e:any)
    {
        this.input.value = this.input.value.replace(/[^0-9./]/g, '').replace(/(\..*)\./g, '$1');
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
          case 1: // CyklePrzedgonu int
          {
               this.CyklePrzedgonu.value = parseInt(this.input.value);
               if(this.CyklePrzedgonu.value > 12)
               {
                this.CyklePrzedgonu.value = 0;
               }else
               {
                SendCommand("#CklPrzg:" + this.CyklePrzedgonu.value);
               }
          }
          break; 

          case 2: // CzasO_EZG min/sek
          {
              // "12/5" 25/45 1/23
               let RegEx = new RegExp('^[0-9]+/[0-9]');
               //let RegEx = new RegExp('^[0-9]+/[0-9]{2,4}$');
               if( RegEx.test(this.input.value) == true )
               { 
                  var str_tmp:string = this.input.value;
                  var index = str_tmp.indexOf( "/" );
                  var min:number = parseInt(str_tmp.substring(0,index));
                  var sek:number = parseInt(str_tmp.substring(index + 1)); 
                  if(min <= 600 == true && sek <= 59 == true)
                  {
                    this.CzasO_EZG.value = (min*60)+sek;
                    SendCommand("#CzasO_EZG:" + this.CzasO_EZG.value);
                  }
               }
          }
          break; 

          case 3: // CzasZ_EZG min/sek
          {
               let RegEx = new RegExp('^[0-9]+/[0-9]');
               if( RegEx.test(this.input.value) == true )
                { 
                  var str_tmp:string = this.input.value;
                  var index = str_tmp.indexOf( "/" );
                  var min:number = parseInt(str_tmp.substring(0,index));
                  var sek:number = parseInt(str_tmp.substring(index + 1)); 
                  if(min <= 120 == true && sek <= 59 == true)
                  {
                    this.CzasZ_EZG.value = (min*60)+sek;
                    SendCommand("#CzasZ_EZG:" + this.CzasZ_EZG.value);
                  }
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
                SendCommand("#gPrzg_G1pwm:" + this.Grzalka1.value);
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
