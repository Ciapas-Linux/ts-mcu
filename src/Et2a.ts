

import { SuperText } from './SuperText';
import { options_screen, SendCommand, UpdateCanvas,canvas,setSize,descriptionText,DrawCircle,play_alert,play_key,drawText,ctx,deviceWidth,deviceHeight } from './lib';


// ETAP 2 ZALEWANIE A: settings-->
export class Et2a 
{ 
    visible:boolean = false;
    font_size:number = 0;

    //CzujnikCisnienia:CheckBox;
    
    CzasZalaniaA:SuperText;
    PrzerwaZalaniaA:SuperText;
    //CisnienieZalaniaA:SuperText;
    ClickedOptionNumber:number = 0; // 3 options
    
    input = document.createElement('input');

    
    constructor(fsize:number)
    { 
       this.font_size = fsize;

       this.input.style.visibility = 'hidden';
       this.input.type = 'tel';
       this.input.inputMode = 'decimal';
       //this.input.pattern = '[0-9/]+';
       this.input.id = "sraka_3b";
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
       this.input.addEventListener("focusout",this.handleFocus.bind(this));
       
       
       this.CzasZalaniaA = new SuperText("Czas zalania:",deviceWidth/6,deviceHeight/4,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CzasZalaniaA.value_type = "m/s ⏱️";
       this.CzasZalaniaA.Show();

       this.PrzerwaZalaniaA = new SuperText("Przerwa po zalaniu:",deviceWidth/6,this.CzasZalaniaA.y + this.CzasZalaniaA.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.PrzerwaZalaniaA.value_type = "m/s ⏱️";
       this.PrzerwaZalaniaA.Show();

       /* this.CisnienieZalaniaA = new SuperText("Ciśnienie zalania:",deviceWidth/6,this.PrzerwaZalaniaA.y + this.CzasZalaniaA.height*2,25,'rgb(44,214,255)','rgb(200,255,44)');
       this.CisnienieZalaniaA.value_type = " Kpa";
       this.CisnienieZalaniaA.Show();

       this.CzujnikCisnienia = new CheckBox("Czujnik ciśnienia",deviceWidth/6,this.CisnienieZalaniaA.y + this.CzasZalaniaA.height*2,30,30,15,'rgb(214,214,200)');
       this.CzujnikCisnienia.Show(); */
       
       this.update();

       
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;
      
      this.CzasZalaniaA.update(deviceWidth/13,deviceHeight/8);
      this.PrzerwaZalaniaA.update(deviceWidth/13,this.CzasZalaniaA.y + this.CzasZalaniaA.height*2);
      /* this.CisnienieZalaniaA.update(deviceWidth/13,this.PrzerwaZalaniaA.y + this.CzasZalaniaA.height*1.8);
      this.CzujnikCisnienia.update(deviceWidth/13,this.CisnienieZalaniaA.y + this.CzasZalaniaA.height*1.6,30,30);
   */
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
      ctx.strokeText("2 ZALEWANIE A ⛲",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("2 ZALEWANIE A ⛲",deviceWidth/2,deviceHeight/35);

      // super text:
      this.CzasZalaniaA.draw();
      this.PrzerwaZalaniaA.draw();
      //this.CisnienieZalaniaA.draw();

      //check boxes:
      //this.CzujnikCisnienia.draw();  

      // OPISY:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      ctx.font = 'bold '+ this.font_size*0.8 + 'pt Arial';
      var txt_height = this.font_size;
      var text1:string = "[0-60 min/sek] Po tym czasie zalewanie zostanie przerwane.";
      var endwt_y = descriptionText("Czas zalania A:",text1,this.PrzerwaZalaniaA.x,this.PrzerwaZalaniaA.y + this.PrzerwaZalaniaA.height*1.8,deviceWidth/1.2,txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      var text2:string = "[0-60 min/sek] Wszystkie grzałki są wyłączone na wybrany czas, co spowoduje ustąpienie zalania.";
      endwt_y = descriptionText("Przerwa po zalaniu A:",text2,this.PrzerwaZalaniaA.x ,endwt_y + txt_height*2,deviceWidth/1.2, txt_height*1.3,'#0078FF','rgb(200,200,0)');
     
      //ctx.fillStyle = '#ff0000';
      var text3:string = "";
      if(options_screen.basic_set.CzujnikZalania_cb.Status() == true)
      {
        text3 = "Obecnie w ustawieniach podstawowych zaznaczono użycie czujnika zalania, więc po wykryciu zalania grzałki zostaną wyłączone co spowoduje ustąpienie zalania ! Aby zmiany zadziałały konfigurację trzeba zpaisac do pamięci sterownika.";
        descriptionText("UWAGA CZUJNIK ZALANIA:",text3,this.PrzerwaZalaniaA.x ,endwt_y + txt_height*3,deviceWidth/1.2, txt_height*1.3,'#ffffFF','rgb(200,0,0)');
      }else
      {
        text3 = "Obecnie w ustawieniach podstawowych nie zaznaczono użycia czujnika zalania, więc zalewanie będzie prowadzone na czas !";
        descriptionText("UWAGA CZUJNIK ZALANIA:",text3,this.PrzerwaZalaniaA.x ,endwt_y + txt_height*3,deviceWidth/1.2, txt_height*1.3,'#ffffFF','rgb(200,0,0)');
      }
     

      ctx.shadowBlur = 0;
      
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
      if(this.CzasZalaniaA.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 1;
        this.addInput(x, y);
        this.input.title = "Czas zalania A:";
        this.input.placeholder = "min/sek";
        return "";
      }

      if(this.PrzerwaZalaniaA.clicked(x,y))
      {
        play_key();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 2;
        this.addInput(x, y);
        this.input.title = "Przerwa zalania A:";
        this.input.placeholder = "min/sek";
        return "";
      }

      /* if(this.CisnienieZalaniaA.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.ClickedOptionNumber = 3;
        this.addInput(x, y);
        this.input.title = "Ciśnienie zalania A:";
        this.input.placeholder = "00000";
        return "";
      } */

      /* if(this.CzujnikCisnienia.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.CzujnikCisnienia.Status() == true )
          {
            this.CzujnikCisnienia.Off();
          }else
          {
            this.CzujnikCisnienia.On();
          }
          this.CzujnikCisnienia.draw();
          return "CHKBOX1";
        } */
      
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.CzasZalaniaA.hoover(x,y)      == true ||
           this.PrzerwaZalaniaA.hoover(x,y)   == true 
           //this.CisnienieZalaniaA.hoover(x,y) == true ||
           //this.CzujnikCisnienia.hoover(x,y)  == true
          )
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
          case 1: // CzasZalaniaA
          {
            let RegEx = new RegExp('^[0-9]+/[0-9]');
            console.log(this.input.value);
            if( RegEx.test(this.input.value) == true )
            { 
               var str_tmp:string = this.input.value;
               var index = str_tmp.indexOf( "/" );
               var min:number = parseInt(str_tmp.substring(0,index));
               var sek:number = parseInt(str_tmp.substring(index + 1)); 
               if(min <= 60 == true && sek <= 59 == true)
               {
                this.CzasZalaniaA.value = (min*60)+sek;
                SendCommand("#CzasZalA:" + this.CzasZalaniaA.value);  
                //let res = (min*60)+sek;
                //console.log("CzasZalaniaA:" + res.toString());
               }
            }else{
              console.log("regex!!!!");
            } 
          }
          break; 

          case 2: // PrzerwaZalaniaA
          {
            let RegEx = new RegExp('^[0-9]+/[0-9]');
            if( RegEx.test(this.input.value) == true )
            { 
               var str_tmp:string = this.input.value;
               var index = str_tmp.indexOf( "/" );
               var min:number = parseInt(str_tmp.substring(0,index));
               var sek:number = parseInt(str_tmp.substring(index + 1)); 
               if(min <= 60 == true && sek <= 59 == true)
               {
                this.PrzerwaZalaniaA.value = (min*60)+sek;
                SendCommand("#PrzerwaZalA:" + this.PrzerwaZalaniaA.value);  
                //console.log("PrzerwaZalaniaA:" + (min*60)+sek);
               }
            }
          }
          break; 

         /*  case 3: // CisnienieZalaniaA
          {
               //this.CisnienieZalaniaA.value = parseInt(this.input.value);
               //if(this.CisnienieZalaniaA.value > 2000)
               // this.CisnienieZalaniaA.value = 0;
          }
          break;  */
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
