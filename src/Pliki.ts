
import { Button } from './Button';
import { Text } from './Text';
import { auto_data,SendCommand,LoadFileMCU,DeleteFilesMCU,drawText,UpdateCanvas,canvas,SaveNewFileMCU,DrawCircle,play_button,saved_files_list,setSize,ctx,deviceWidth,deviceHeight} from './lib';

// WIFI:
export class Pliki
{ 
    visible:boolean = false;
    font_size:number = 0;

    bNowy:Button;
    bDelete:Button;
    bLoad:Button;
    bSave:Button;

    //bUp:Button;

    bDown:Button;

    // Text objects array:
    Files:Text[] = [];
    files_num:number = 0;

    //FileName:string = "";

   
    input = document.createElement('input');
       
    constructor(fsize:number)
    { 
       this.font_size = fsize;

       this.input.type = 'text';
       this.input.style.visibility = 'hidden'; 
       this.input.inputMode = 'text';
       this.input.id = "sraka_14a";
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
       this.input.addEventListener("focusout", this.handleFocus.bind(this));
       document.body.appendChild(this.input);

       this.bNowy = new Button("NOWY",0,0,deviceWidth/7,40,10,'rgb(180,180,180)');
       this.bNowy.Show();

       this.bDelete = new Button("USUŃ",0,0,deviceWidth/7,40,10,'rgb(180,180,180)');
       this.bDelete.Show();

       this.bLoad = new Button("WGRAJ",0,0,deviceWidth/7,40,10,'rgb(180,180,180)');
       this.bLoad.Show();

       this.bSave = new Button("ZAPISZ",0,0,deviceWidth/7,40,10,'rgb(180,180,180)');
       this.bSave.Show();

       //this.bUp = new Button("↑",0,0,deviceWidth/16,40,10,'rgb(180,180,180)');
       //this.bUp.Show();

       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;
      let fheight = (this.font_size*2)*1.6;

      this.bNowy.update(this.bNowy.width/2.8,
                        deviceHeight - this.bNowy.height * 1.5,
                        this.bNowy.width,
                        fheight,
                        this.bNowy.radius);

      this.bDelete.update(this.bDelete.width*1.6,
                          deviceHeight - this.bDelete.height * 1.5,
                          this.bDelete.width,
                          fheight,
                          this.bDelete.radius); 
                          
      this.bLoad.update(this.bLoad.width*2.8,
                          deviceHeight - this.bLoad.height * 1.5,
                          this.bLoad.width,
                          fheight,
                          this.bLoad.radius);

      this.bSave.update(this.bSave.width*4,
                           deviceHeight - this.bSave.height * 1.5,
                           this.bSave.width,
                           fheight,
                           this.bSave.radius);                          
      
      /* this.bUp.update(this.bLoad.width*4,
                          deviceHeight - this.bUp.height * 1.5,
                          this.bUp.width,
                          fheight,
                          this.bUp.radius);  */                                              

      this.Files.length = 0;
      var str_array = saved_files_list.split(";");
      for(var n = 1; n < str_array.length; n++)
      {
        if(str_array[n] != "")
        { 
          this.Files.push(new Text(str_array[n],deviceWidth/20,
                  deviceHeight/12 + n * fheight,
                  25,'rgb(44,214,255)','rgb(200,255,44)'));
        }
      }

      this.files_num = 0;
      for(var n = 0; n < this.Files.length; n++)
      {
        this.Files[n].Show();
        this.Files[n].draw();
        this.files_num++;
      }

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
      let fheight = this.font_size*1.5;
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("LISTA PLIKÓW 🗂️",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("masz " + this.Files.length + " plików",deviceWidth/2,deviceHeight/35 + fheight);


      for(var n = 0; n < this.Files.length; n++)
      {
       this.Files[n].draw();
      }

     
      this.bNowy.draw();
      this.bDelete.draw();
      this.bLoad.draw();
      this.bSave.draw();
     
      //parametr:
      ctx.fillStyle = '#ffff00';
      ctx.textBaseline = "top"; 
      ctx.textAlign = 'left';
      
      // OPIS
      //ctx.font = 'bold '+ this.font_size*0.9 + 'pt Arial';
      //var txt_height = this.font_size*0.9;
      //var text:string = "Lista zapisanych plików konfiguracji w pamięci sterownika";
      //wrapText(text,this.TempKolumna.x,this.TempKolumna.y + this.TempKolumna.height*2,deviceWidth/2,txt_height);
      //descriptionText("UWAGA (!)",text,this.Klucz.x,this.Klucz.y + this.Klucz.height*1.5,deviceWidth/1.15,txt_height*1.25,'#0078FF','rgb(200,170,170)');
   
      ctx.shadowBlur = 0;
      
    }
    handleFocus()
    {
      if(this.input.style.visibility == 'visible')
      {
        play_button();
        drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
        this.input.style.visibility = 'hidden';
        this.input.value = "";
      }
    }
   
    handleEnter(e:any)
    {
       var keyCode = e.keyCode;
      
       if (keyCode === 13)
       {
           //var FileName:string = this.input.value;
           if(this.input.value.length > 0)
           {
              if(this.Files.length < 10)
              {
                //auto_data_save.FileName = this.input.value;
                SaveNewFileMCU(this.input.value);
              }
           }
           this.input.style.visibility = 'hidden';
           this.input.value = "";
           canvas.focus();
           UpdateCanvas(true);
           //setTimeout(this.GetFileList, 2500);   
       }
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      for(var n = 0; n < this.Files.length; n++)
      {
        if(this.Files[n].clicked(x,y))
        {
          play_button();
          DrawCircle(x,y,3,8,'#FFF200','red');
          if(this.Files[n].selected)
          {
            this.Files[n].selected = false;
          }else
          {
            this.Files[n].selected = true;
          }
          return;
        }
      }

      if(this.bNowy.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        if(this.Files.length > 10) return "";
        this.addInput(20,20);
        this.input.title = "Nazwa pliku";
        this.input.placeholder = "Nazwa pliku";
        return ""; 
      }

      if(this.bLoad.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');

        var file:string = "file_load:";
        var sel_files:number = 0;  
        for(var n = 0; n < this.Files.length; n++)
        {
            if(this.Files[n].selected)
            {
              file += this.Files[n].str_text;
              sel_files++;
            }
        }

        if(sel_files == 1)
        {
          LoadFileMCU(file);
        }

        return ""; 
      }

      if(this.bSave.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        // ResetConfigMCU();

        if(this.Files.length < 10)
        {
              //auto_data_save.FileName = this.input.value;
              //SaveFileMCU(auto_data.FileName);
              //SendCommand("#save_config#");
              return "save_options";
        }

      return ""; 
      }

      if(this.bDelete.clicked(x,y))
      {
          play_button();
				  DrawCircle(x,y,3,8,'#FFF200','red');
          // filenames file1;file2;file3
          var filenames:string = "";  
          for(var n = 0; n < this.Files.length; n++)
          {
            if(this.Files[n].selected)
            {
              filenames += this.Files[n].str_text;
              filenames += ";";
            }
          }
          //filenames.slice(0, -1);
          DeleteFilesMCU(filenames);
          //setTimeout(this.GetFileList, 2500); 

          return "";
      }

      /* if(this.bUp.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        return ""; 
      } */

    }

    GetFileList()
    {
      SendCommand("#filelist#");
      setTimeout(UpdateCanvas, 1500);
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        for(var n = 0; n < this.Files.length; n++)
        {
          if(this.Files[n].hoover(x,y) == true)
          {
              document.body.style.cursor = 'pointer';
              return;
          }else
          {
              document.body.style.cursor = 'default';
          }
        }

        if(this.bNowy.hoover(x,y) == true ||
           this.bDelete.hoover(x,y) == true ||
           this.bLoad.hoover(x,y) == true ||
           this.bSave.hoover(x,y) == true)
           //this.bUp.hoover(x,y) == true)
        {
              document.body.style.cursor = 'pointer';
        }else
        {
              document.body.style.cursor = 'default';
        }
    }

    addInput(x:number, y:number)
    {
      this.input.style.visibility = 'visible';
      this.input.focus(); 
    }   
  
 }
