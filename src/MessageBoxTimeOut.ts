
//import { Button } from './Button';
//import { Diode } from './Diode';
//import { Czas } from './Czas';
//import { ButtonCircle } from './ButtonCircle';
import { play_button, play_alert,DrawRoundedBox,setSize, ctx, deviceWidth, deviceHeight,MeasureTextHeight } from './lib';


export class MessageBoxTimeOut 
{ 
    x:number = 0;
    y:number = 0;
    width:number = 0;
    height:number = 0;
    radius:number = 10;
    color1:string = 'rgb(232,32,0)';
    color2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    enabled:boolean = false;
    font_size:number = 0;
    message:string = "";
    done:boolean = false;
      
     
    //constructor 
    constructor(msg:string,rad:number,fsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(32,232,0)')
    { 
       this.font_size = fsize; 
       this.radius = rad;
       this.color1 = col1;
       this.color2 = col2;
       this.message = msg;
  
       //center message background box
       this.x = deviceWidth/6.5;
       this.y = deviceHeight/3;
       this.width = deviceWidth/1.5;
       this.height = deviceHeight/2;

       this.UpdateSizes();
  
        
    }
    
    percentage(num:number, per:number)
    {
      return (num/100)*per;
    }

    Show(msg:string,timeout:number)
    {
         this.visible = true;
         this.message = msg;
         this.done = false;

         setTimeout(play_alert, 500);
         setTimeout( () =>{ this.visible = false;
                            this.done = true; }, 2500);
    }

    Hide()
    {
         this.visible = false;
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;
    }

    OnClick(x:number,y:number)
    {
        if(this.visible == false) return "";

        play_button();

      return "";  
    }

    drawBackground()
    { 

        this.UpdateSizes();

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
        let txt_width = ctx.measureText(this.message).width;

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText("UWAGA:",this.x + txt_width/2 ,this.y + txt_height);
        ctx.strokeText(this.message,this.x + txt_height,this.y + this.height/2);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.fillText("UWAGA:",this.x + txt_width/2,this.y + txt_height);
        ctx.fillText(this.message,this.x + txt_height,this.y + this.height/2);
             
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    draw()
    { 
      if(this.visible == false) return;
      this.drawBackground();
    }

    clicked(x:number,y:number)
    {
      if(this.visible == false) return;

      return true;
    }

    UpdateSizes()
    {
        let {font_size, diode_radius} = setSize();
        this.font_size = font_size;

    }

       
 }
