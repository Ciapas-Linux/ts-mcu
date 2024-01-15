
import { ButtonCircle } from './ButtonCircle';
import { wrapText,DrawRoundedBox,DrawCircle,setSize,play_button, ctx, deviceWidth, deviceHeight, ScreenSize, ScreenOrientation, DrawText, MeasureTextHeight } from './lib';


export class TextList
{ 
    x:number = 0;
    y:number = 0;
    width:number = 0;
    height:number = 0;
    radius:number = 10;
    color1:string = 'rgb(232,32,0)';
    color2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    font_size:number = 0;
    curr_element:number = 0;
   
    // Okrągłe przyciski
    BtOK:ButtonCircle;
    BtNO:ButtonCircle;
   
    trigger:any;
      
     
    //constructor 
    constructor(rad:number,fsize:number)
    { 
       this.font_size = fsize; 
       this.radius = rad;
        
       //center message background box
       this.x = deviceWidth/10;
       this.y = deviceHeight/10;
       this.width = deviceWidth - (deviceWidth/10)*2;
       this.height = deviceHeight - (deviceHeight/10)*2;
  
       // BUTTON OK
       let btRadius = 30;
       this.BtOK = new ButtonCircle("Tak",3,btRadius,this.x + this.width - btRadius*1.5,this.y + this.height - btRadius*1.5,15,'rgb(214,14,0)','rgb(70,2,0)');
       this.BtOK.Show();
       
       // BUTTON NO
       this.BtNO = new ButtonCircle("Nie",3,btRadius,this.x + btRadius*1.5,this.y + this.height - btRadius*1.5,15,'rgb(214,14,0)','rgb(70,2,0)');
       this.BtNO.Show();

       this.update();
   
    }
    
    percentage(num:number, per:number){return (num/100)*per;}
    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.BtOK.hoover(x,y) == true||this.BtNO.hoover(x,y) == true) 
        {
                document.body.style.cursor = 'pointer';
        }else
        {
                document.body.style.cursor = 'default';
        }  
    }

    OnClick(x:number,y:number)
    {
        if(this.visible == false) return "";

        if(this.BtOK.clicked(x,y))
        {
          play_button();
		  DrawCircle(x,y,3,8,'#FFF200','red');
          //this.trigger();
          this.Hide();
          return "TAK";
        }

        if(this.BtNO.clicked(x,y))
        {
          play_button();
		  DrawCircle(x,y,3,8,'#FFF200','red');
          return "NIE";
        }
      return "";  
    }

    drawBackground()
    { 
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(ctx,this.x - 2,this.y - 2,this.width + 2,this.height + 2, 20,'#ffffff');
        DrawRoundedBox(ctx,this.x,this.y,this.width - 2,this.height - 2, 20,'#aa0000');
       
        ctx.textBaseline = 'middle'  
        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.textAlign = 'left'; 

        let txt_height = MeasureTextHeight(ctx.font, this.font_size);
       
        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("PLIKI:",this.x + 20 ,this.y + txt_height);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("PLIKI:",this.x + 20,this.y + txt_height);
              
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    draw()
    { 

      if(this.visible == false) return;

      this.drawBackground();
      this.BtOK.draw();
      this.BtNO.draw();
              
    }

    clicked(x:number,y:number)
    {
      if(this.visible == false) return false;

      return true;

    }

    update()
    {
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

    }

      
 }
