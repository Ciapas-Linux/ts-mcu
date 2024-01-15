
import { ButtonCircle } from './ButtonCircle';
import { SuperText } from './SuperText';
import { drawText,DrawRoundedBox,wrapText, play_alert,play_button,auto_data_save ,auto_data, ctx, DrawCircle, deviceWidth, deviceHeight, ScreenSize, ScreenOrientation } from './lib';
import { CheckBox } from './CheckBox';
import { MessageBox } from './MessageBox';
import { MessageBoxTimeOut } from './MessageBoxTimeOut';
import { Et1 } from './Et1';

export class Options 
{ 
    x:number = 0;
    y:number = 0;
    visible:boolean = false;
    enabled:boolean = false;
    font_size:number = 0;
    curr_element:number = 0;
    opt_num:number = 0;

    // Okrągłe przyciski
    btRadius:number = 15;
    BtOK:ButtonCircle;
    BtLeft:ButtonCircle;
    BtRight:ButtonCircle;
    BtSaveOptions:ButtonCircle;
    BtWifi:ButtonCircle;

    //checkbox
    Chk_box1:CheckBox;

    Description1:SuperText;
    Description2:SuperText;

    input = document.createElement('input');

    current_option:number = 0;
    readonly max_options:number = 5;
    
    MsgBoxTout:MessageBoxTimeOut;
     
    constructor(x:number,y:number,fsize:number)
    { 
        this.font_size = fsize; 
        this.x = x;
        this.y = y;

        this.Description1 = new SuperText("Temp.Kolumny (10p):",deviceWidth/6,deviceHeight/4,25,'rgb(214,214,200)');
        this.Description1.Show();
       
        let distance:number = this.Description1.height*2;
        this.Description2 = new SuperText("Temp.Kolumny (10p):",deviceWidth/6,deviceHeight/4 + distance,25,'rgb(214,214,200)');
        this.Description2.Hide();

        this.Chk_box1 = new CheckBox("Czujnik ciśnienia",deviceWidth/6,deviceHeight/3 + distance*1.5,30,30,5,'rgb(214,214,200)');
        this.Chk_box1.Hide();

        // MSG BOX
        // MsgBox time based
        this.MsgBoxTout = new MessageBoxTimeOut("dupas",10,15,'rgb(11,214,0)','rgb(22,92,3)');
        this.MsgBoxTout.Hide();
  
        
        //OK button
        let btRadius = 30;
        let btX = deviceWidth - btRadius*2;
        let btY = deviceHeight - btRadius*2;
        this.BtOK = new ButtonCircle("OK",3,btRadius,btX,btY,15,'rgb(11,214,0)','rgb(90,92,90)');
        this.BtOK.Show();

        btX = deviceWidth - btRadius*5;
        btY = deviceHeight - btRadius*2;
        this.BtSaveOptions = new ButtonCircle("ZAPIS",3,btRadius,btX,btY,15,'rgb(11,214,0)','rgb(130,2,0)');
        this.BtSaveOptions.Show();

        btX = deviceWidth - btRadius*8;
        btY = deviceHeight - btRadius*2;
        this.BtWifi = new ButtonCircle("WIFI",3,btRadius,btX,btY,15,'rgb(11,214,0)','rgb(0,2,134)');
        this.BtWifi.Show();

         // options left <-  -> right buttons
        btX = this.btRadius*2;
        btY = deviceHeight/2;
        this.BtLeft = new ButtonCircle("<---",3,this.btRadius,btX,btY,10,'rgb(11,214,0)','rgb(22,92,3)');
        btX = deviceWidth - this.btRadius*2;
        btY = deviceHeight/2;
        this.BtRight = new ButtonCircle("--->",3,this.btRadius,btX,btY,10,'rgb(11,214,0)','rgb(22,92,3)');
        
        this.BtRight.Show();
        this.BtLeft.Show();
        
        this.resize();
    }
    
    Show()
    {
         this.visible = true;
         document.body.style.cursor = 'default';

         //copy auto-data to auto-data-save structure
         
         //rozgrzewanie 
         auto_data_save.TempStopRozgrzewania = auto_data.TempStopRozgrzewania;

         //zalewanie
         auto_data_save.CisnienieZalania_1 = auto_data.CisnienieZalania_1;
         auto_data_save.CisnienieZalania_2 = auto_data.CisnienieZalania_2;
         auto_data_save.CisnienieZalania_3 = auto_data.CisnienieZalania_3;
         auto_data_save.PrzerwaZalania_1 = auto_data.PrzerwaZalania_1;
         auto_data_save.PrzerwaZalania_2 = auto_data.PrzerwaZalania_2;
         auto_data_save.PrzerwaZalania_3 = auto_data.PrzerwaZalania_3;
         auto_data_save.CzasZalania_1 = auto_data.CzasZalania_1;
         auto_data_save.CzasZalania_2 = auto_data.CzasZalania_2;
         auto_data_save.CzasZalania_3 = auto_data.CzasZalania_3;  
                 

         auto_data_save.CzasChlodzeniaGlow = auto_data.CzasChlodzeniaGlow;
         auto_data_save.CzasOtwarciaZPrzedgonu = auto_data.CzasOtwarciaZPrzedgonu;
         auto_data_save.CzasPlukanieOLM = auto_data.CzasPlukanieOLM;
         auto_data_save.CzasStabilizacji = auto_data.CzasStabilizacji;
         auto_data_save.CzasStabilizacjiPrzedgonu = auto_data.CzasStabilizacjiPrzedgonu;
         auto_data_save.CzasZakonczeniaGon = auto_data.CzasZakonczeniaGon;
         auto_data_save.HisterezaT_close = auto_data.HisterezaT_close;
         auto_data_save.HisterezaT_open = auto_data.HisterezaT_open;
         auto_data_save.MocGrzaniaG1 = auto_data.MocGrzaniaG1;
         auto_data_save.MocGrzaniaG2 = auto_data.MocGrzaniaG2;
         auto_data_save.MocGrzaniaG3 = auto_data.MocGrzaniaG3;
         
         
         
    }

    Hide()
    {
         this.visible = false;
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.BtOK.hoover(x,y)  ||
           this.BtSaveOptions.hoover(x,y) ||
           this.BtWifi.hoover(x,y) ||
           this.Description1.hoover(x,y) ||
           this.Description2.hoover(x,y) ||
           this.Chk_box1.hoover(x,y) ||
           this.BtRight.hoover(x,y) ||
           this.BtLeft.hoover(x,y))  
        {
            document.body.style.cursor = 'pointer';
        }else
        {
            document.body.style.cursor = 'default';
        }
     }

    //Key handler for input box:
     handleEnter(e:any)
     {
        var keyCode = e.keyCode;
        //const isNumber = isFinite(e.key);
        const whitelist = ['Backspace','Delete','ArrowDown','ArrowUp','ArrowRight','ArrowLeft'];
        const whitelistKey = whitelist.includes(e.key);

        if (keyCode === 13) // user hit enter
        {
            play_button();

            switch(this.current_option)
            {
              case 0: // rozgrzewanie 1 parametr
              {
                setTimeout(play_alert, 500);
                drawText(this.input.value, deviceWidth/2,deviceHeight/3,this.font_size*7);
                auto_data_save.TempStopRozgrzewania = parseFloat(this.input.value);
                this.MsgBoxTout.Show("Wszystkie dostępne grzałki grzeją się pełną mocą!",8000);
               }
              break;
              
              case 1:// zalewanie A 3 parametry
              {

                if(this.opt_num == 0) // ciśnienie
                {
                  auto_data_save.CisnienieZalania_1 = parseFloat(this.input.value);
                }else if(this.opt_num == 1) // przerwa w zalaniu
                {
                  auto_data_save.PrzerwaZalania_1 = parseInt(this.input.value)*60;
                }

                this.opt_num = 0; 
                drawText(this.input.value, deviceWidth/2,deviceHeight/3,this.font_size*7);
              }
              break;
        
              case 2:// Zalewanie B 3 param
              {
               
              }
              break;
            }

            document.body.removeChild(this.input);
        }
    }

    handleInput(e:any)
    {
        this.input.value = this.input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }

    //Function to dynamically add an input box: 
    addInput(x:number, y:number)
    {
        this.input.type = 'tel';
        this.input.inputMode = 'numeric';
        this.input.id = "sraka_1";
        this.input.style.position = 'fixed';
        this.input.style.font = 'bold '+ this.font_size + 'pt Arial';
        this.input.style.width = '50';
        this.input.style.border =  '3px solid var(--input-border)';
        this.input.style.borderRadius =  '5px';
        this.input.style.backgroundColor =  '#888';
        this.input.style.zIndex = '1000';
        this.input.style.left = (x - 4) + 'px';
        this.input.style.top = (y - 4) + 'px';
        this.input.value = "";
        this.input.onkeydown = this.handleEnter.bind(this);
        this.input.oninput = this.handleInput.bind(this);
        document.body.appendChild(this.input);
        this.input.focus();
    }   

    SetSuperTextNames()
    {
        switch(this.current_option)
      {
          case 0: //rozgrzewanie
          {
            this.Description1.SetText("Temp.Kolumny (10p):");
            this.Description2.Hide();    
          }
          break;
          
          case 1://zalewanie A
          {
            this.Description1.SetText("Ciśnienie zalania:");
            this.Description2.SetText("Przerwa w zalewaniu:");
            this.Description2.Show();  
          }
          break;

          case 2://zalewanie B
          {
            this.Description1.SetText("Ciśnienie zalania:");
            this.Description2.SetText("Przerwa w zalewaniu:");
            this.Description2.Show();  
          }
          break;

          case 3://zalewanie C
          {
            this.Description1.SetText("Ciśnienie zalania:");
            this.Description2.SetText("Przerwa w zalewaniu:");
            this.Description2.Show();  
          }
          break;
    
          case 4://stabilizacja
          {
            this.Description1.SetText("dupa");  
          }
          break;

          case 5://przedgon
          {
            this.Description1.SetText("dupa");  
          }
          break;
      }

    }


    OnClick(x:number,y:number)
    {
        if(this.visible == false) return "";

        if(this.Description1.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          this.opt_num = 0;
          this.addInput(x, y);
          return "";
        }

        if(this.Description2.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          this.opt_num = 1;
          this.addInput(x, y);
          return "";
        }

        if(this.BtOK.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          return "OK";
        }

        if(this.BtSaveOptions.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          return "SAVE";
        }

        if(this.BtWifi.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          return "WIFI";
        }

        if(this.Chk_box1.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          if(this.Chk_box1.Status() == true )
          {
            this.Chk_box1.Off();
          }else
          {
            this.Chk_box1.On();
          }
          this.Chk_box1.draw();
          return "CHKBOX1";
        }

        // button << PREV
        if(this.BtLeft.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          if(this.current_option > 0)
          {
            this.current_option--;
            this.SetSuperTextNames();
            this.draw();    
          }
          return "<";
        }

        // button >> NEXT
        if(this.BtRight.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          if(this.current_option < this.max_options)
          {
            this.current_option++;
            this.SetSuperTextNames();
            this.draw();    
          }
          return ">";
        }

    return "";  
    }

    // Włączają się wszystkie grzałki! A wyłączają się po przekroczeniu
    // zadanej temperatury (wyberanej w  menu) Termometr "KOLUMNA". 
    // automata_data->gTempKolumna > automata_data->gTempStopRozgrzewania
    DrawRozgrzewanie()
    { 
        this.resize();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#0049BF');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#00183F');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${14}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);

        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'center'; 

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("ROZGRZEWANIE",this.x + deviceWidth/2,deviceHeight/10);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("ROZGRZEWANIE",this.x + deviceWidth/2,deviceHeight/10);

        //parametr:
        ctx.fillStyle = '#ffff00';
        ctx.textBaseline = "top"; 
        ctx.textAlign = 'left';
        ctx.fillText(auto_data_save.TempStopRozgrzewania.toString() + "  ℃",this.Description1.x + this.Description1.width + this.Description1.height,this.Description1.y);
        ctx.textBaseline = "middle";


        // OPIS
        ctx.font = 'bold '+ this.font_size/2 + 'pt Arial';
        var txt_height = (this.font_size/2) * 1.3;
        var text:string = "UWAGA: po przekroczeniu powyższej temperatury otwiera się zawór woda i sterownik przechodzi do następnego etapu 2 czyli do zalewania.";
        wrapText(text,this.Description1.x,this.Description1.y + this.Description1.height*1.5,deviceWidth/2,txt_height);
        ctx.textAlign = 'center';      

        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    // Zalanie 3x
    // Włączają się wszystkie grzałki na [ON] a wyłączą się po przekroczeniu 
    // wartości ciśnienia (czujnik analogowy) ale w tym samym czasie odlicza zegar i jeżeli mine 8 minut a 
    // ciśnienie nie przekroczy zadanego to przechodzi do przerwy z zalaniu (Wybrany czas w opcjach).
    // dwa parametry do ustawiania:
    // automata_data->gCiscienieZalania
    // automata_data->gPrzerwaZalania
    DrawZalewanieA()
    { 
        this.resize();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#00B900');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#002300');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${14}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);

        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'center'; 

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("ZALEWANIE A",this.x + deviceWidth/2,deviceHeight/12);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("ZALEWANIE A",this.x + deviceWidth/2,deviceHeight/12);

        //parametry:
        ctx.font = 'bold '+ this.Description1.font_size + 'pt Arial';
        ctx.fillStyle = '#ffff00';
        ctx.textBaseline = "top"; 
        ctx.textAlign = 'left';
        ctx.fillText(auto_data_save.CisnienieZalania_1.toString() + "  Pa",this.Description1.x + this.Description1.width + this.Description1.height,this.Description1.y);
        ctx.fillText((auto_data_save.PrzerwaZalania_1/60).toString() + "  min",this.Description2.x + this.Description2.width + this.Description2.height,this.Description2.y);
        
        ctx.font = 'bold '+ this.font_size/2 + 'pt Arial';
        var txt_height = (this.font_size/2) * 1.2;
        var text:string = "UWAGA: tulu bulu bali kuju mase ruby tebi kaku";
        wrapText(text,this.Description2.x,this.Description2.y + this.Description2.height*2,deviceWidth/2,txt_height);
             
        ctx.textAlign = 'center'; 

        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    DrawZalewanieB()
    { 
        this.resize();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#00B900');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#002300');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${14}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);

        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'center'; 

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("ZALEWANIE B",this.x + deviceWidth/2,deviceHeight/10);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("ZALEWANIE B",this.x + deviceWidth/2,deviceHeight/10);

        //parametry:
        ctx.fillStyle = '#ffff00';
        ctx.fillText(auto_data_save.CisnienieZalania_2.toString() + "  Pa",this.Description1.x + this.Description1.width + (this.Description1.height*4),this.Description1.y);
        ctx.fillText((auto_data_save.PrzerwaZalania_2/60).toString() + "  min",this.Description2.x + this.Description2.width + (this.Description2.height*4),this.Description2.y);
        

        ctx.textAlign = 'left';   
        ctx.font = 'bold '+ this.font_size/2 + 'pt Arial';
        var text:string = "UWAGA: tulu bulu bali kuju mase ruby tebi kaku";
        wrapText(text,this.Description2.x,this.Description2.y + this.Description2.height*4,deviceWidth/3,this.Description2.height);
             
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    DrawZalewanieC()
    { 
        this.resize();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#00B900');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#002300');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${14}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);

        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'center'; 

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("ZALEWANIE C",this.x + deviceWidth/2,deviceHeight/10);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("ZALEWANIE C",this.x + deviceWidth/2,deviceHeight/10);

        //parametry:
        ctx.fillStyle = '#ffff00';
        ctx.fillText(auto_data_save.CisnienieZalania_3.toString() + "  Pa",this.Description1.x + this.Description1.width + (this.Description1.height*4),this.Description1.y);
        ctx.fillText((auto_data_save.PrzerwaZalania_3/60).toString() + "  min",this.Description2.x + this.Description2.width + (this.Description2.height*4),this.Description2.y);
        


        ctx.textAlign = 'left';   
        ctx.font = 'bold '+ this.font_size/2 + 'pt Arial';
        var text:string = "UWAGA: tulu bulu bali kuju mase ruby tebi kaku";
        wrapText(text,this.Description2.x,this.Description2.y + this.Description2.height*4,deviceWidth/3,this.Description2.height);
             
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    DrawStabilizacja()
    { 
        this.resize();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#00B900');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#002300');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${14}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);

        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'center'; 

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("STABILIZACJA",this.x + deviceWidth/2,deviceHeight/10);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("STABILIZACJA",this.x + deviceWidth/2,deviceHeight/10);

        ctx.fillStyle = '#ffff00';
        ctx.fillText(auto_data_save.TempStopRozgrzewania.toString() + "  ℃",this.Description1.x + this.Description1.width + (this.Description1.height*4),this.Description1.y);
        
        ctx.textAlign = 'left';   
        ctx.font = 'bold '+ this.font_size/2 + 'pt Arial';
        var text:string = "UWAGA: tulu bulu bali kuju mase ruby tebi kaku";
        wrapText(text,this.Description1.x,this.Description1.y + this.Description1.height*3,deviceWidth/3,this.Description1.height);
             
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    DrawPrzedgon()
    { 
        this.resize();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#00B900');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#002300');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${14}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);

        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'center'; 

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("PRZEDGON",this.x + deviceWidth/2,deviceHeight/10);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("PRZEDGON",this.x + deviceWidth/2,deviceHeight/10);

        ctx.fillStyle = '#ffff00';
        ctx.fillText(auto_data_save.TempStopRozgrzewania.toString() + "  ℃",this.Description1.x + this.Description1.width + (this.Description1.height*4),this.Description1.y);
        
        ctx.textAlign = 'left';   
        ctx.font = 'bold '+ this.font_size/2 + 'pt Arial';
        var text:string = "UWAGA: przedgoni coś idzie";
        wrapText(text,this.Description1.x,this.Description1.y + this.Description1.height*3,deviceWidth/3,this.Description1.height);
             
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    draw()
    { 
      if(this.visible == false) return;

      switch(this.current_option)
      {
          case 0: //rozgrzewanie
          {
            this.DrawRozgrzewanie();
            this.Description1.draw();
          }
          break;
          
          case 1://zalewanie A
          {
            this.DrawZalewanieA();
            this.Description1.draw();
            this.Description2.draw();
            this.Chk_box1.Show();
            this.Chk_box1.draw();
          }
          break;
    
          case 2://Zalewanie B
          {
            this.DrawZalewanieB();
            this.Description1.draw();
            this.Description2.draw();
          }
          break;
          
          case 3://Zalewanie c
          {
            this.DrawZalewanieC();
            this.Description1.draw();
            this.Description2.draw();
          }
          break;

          case 4://stabilizacja
          {
            this.DrawStabilizacja();
            this.Description1.draw();
          }
          break;

          case 5://przedgon
          {
            this.DrawPrzedgon();
            this.Description1.draw();
          }
          break;
      }

     
      this.BtOK.draw();
      this.BtWifi.draw();
      this.BtSaveOptions.draw();
      this.BtLeft.draw();
      this.BtRight.draw();

      this.MsgBoxTout.draw();
              
    }

    resize()
    {
        if(ScreenSize == "extralarge" && ScreenOrientation == "landscape")
        {
            this.font_size = 30;
            this.btRadius = 40;
        }
        if(ScreenSize == "large" && ScreenOrientation == "landscape")
        {
            this.font_size = 30;
            this.btRadius = 30;
        }
        if(ScreenSize == "large" && ScreenOrientation == "unknown")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "portrait")
        {
            this.font_size = 20;
            this.btRadius = 25;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "unknown")
        {
            this.font_size = 20;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "ipad")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "landscape")
        {
            this.font_size = 19;
            this.btRadius = 30;
        }
        if(ScreenSize == "small" && ScreenOrientation == "portrait")
        {
            this.font_size = 17;
            this.btRadius = 20;
        }
        if(ScreenSize == "small" && ScreenOrientation == "unknown")
        {
            this.font_size = 17;
            this.btRadius = 20;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "portrait")
        {
            this.font_size = 15;
            this.btRadius = 19;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "unknown")
        {
            this.font_size = 15;
            this.btRadius = 18;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "landscape")
        {
            this.font_size = 15;
            this.btRadius = 20;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "unknown")
        {
           this.font_size = 12;
           this.btRadius = 17;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "portrait")
        {
            this.font_size = 15;
            this.btRadius = 17;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "landscape")
        {
            this.font_size = 15;
            this.btRadius = 20;
        }
        if(ScreenSize == "extral_w_slim" && ScreenOrientation == "landscape")
        {
          this.font_size = 20;
          this.btRadius = 20;
        }
               
        let btX = this.btRadius*2;
        let btY = deviceHeight/2;
        this.BtLeft.update(btX,btY);
        this.BtLeft.radius = this.btRadius;
        btX = deviceWidth - this.btRadius*2;
        btY = deviceHeight/2;
        this.BtRight.update(btX,btY);
        this.BtRight.radius = this.btRadius;

        
        this.Description1.update(deviceWidth/6,deviceHeight/5);
        let distance:number = this.Description1.height*1.5;
        this.Description2.update(deviceWidth/6,deviceHeight/5 + distance);
       
        this.Chk_box1.update(deviceWidth/6,deviceHeight/3 + distance*1.5,35,35);    
       
        this.BtOK.update(deviceWidth -  this.btRadius*2,deviceHeight -  this.btRadius*2);
               
    }
   
    
 }
