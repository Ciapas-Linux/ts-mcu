
import { Button } from './Button';
import { descriptionText,SendCommand,setSize,DrawCircle,play_button,ctx,deviceWidth,deviceHeight } from './lib';

// SAVE:
export class Update
{ 
    visible:boolean = false;
    font_size:number = 0;
  
    //button
    //SaveOptions_bt:Button;
      
    Update_bt:Button;
    Module_bt:Button;
   
    // given file name
    //FileName:string = "";
           
    constructor(fsize:number)
    { 
       this.font_size = fsize;
            
       this.Update_bt = new Button("AKTUALIZACJA ☠",0,0,deviceWidth/3,deviceHeight/8,17,'rgb(200,200,0)');
       this.Update_bt.Show();

       this.Module_bt = new Button("MODUŁ-WIFI ♲",0,0,deviceWidth/3,deviceHeight/8,17,'#00A7FF');
       this.Module_bt.Show();

       this.update();
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      this.Update_bt.update(deviceWidth/2 - this.Update_bt.width/2,deviceHeight/4,this.Update_bt.width,this.Update_bt.height,this.Update_bt.radius);
      this.Module_bt.update(this.Update_bt.x,this.Update_bt.y + this.Update_bt.height + this.font_size,this.Update_bt.width,this.Update_bt.height,this.Module_bt.radius);
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
      ctx.strokeText("AKTUALIZACJA 😼",deviceWidth/2,deviceHeight/30);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("AKTUALIZACJA 😼",deviceWidth/2,deviceHeight/30);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("oraz moduł",deviceWidth/2,deviceHeight/30 + fheight);


      this.Update_bt.draw();
      this.Module_bt.draw();

      // OPIS
      ctx.font = 'bold '+ this.font_size*0.9 + 'pt Arial';
      var txt_height = this.font_size*0.9;
      var text:string = "Tutaj można dokonać aktualizacji oprogramowania sterownika oraz modułu rozszerzeń.";
      //wrapText(text,this.TempKolumna.x,this.TempKolumna.y + this.TempKolumna.height*2,deviceWidth/2,txt_height);
      descriptionText("UWAGA (!)",text,25 ,deviceHeight - txt_height*8,deviceWidth/1.15,txt_height*1.25,'#0078FF','rgb(200,170,170)');
          
           
      ctx.shadowBlur = 0;
     
    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
      
     
      if(this.Update_bt.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        return "update"; 
      }

      if(this.Module_bt.clicked(x,y))
      {
        SendCommand("#modulewifi#");
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        return "module"; 
      }

   
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if( this.Update_bt.hoover(x,y)
            ||this.Module_bt.hoover(x,y)
            )
        {
            document.body.style.cursor = 'pointer';
        }else
        {
            document.body.style.cursor = 'default';
        }
    }
   
 }
