
import { setSize,auto_data,ctx } from './lib';

export class Czas 
{ 
    x:number = 0;
    y:number = 0;
    color1:string = 'rgb(232,32,0)';
    color2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    enabled:boolean = false;
    font_size:number = 0;
    time:string = "0g:0m:0s";
  
    //constructor 
    constructor(x:number,y:number,fsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(32,232,0)')
    { 
       this.font_size = fsize; 
       this.x = x;
       this.y = y;
       this.color1 = col1;
       this.color2 = col2; 
       this.Update(this.x,this.y);
    }
    
    Show()
    {
      this.visible = true;
    }

    Hide()
    {
      this.visible = false;
    }

    Update(x:number,y:number)
    {
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;
      this.x = x;
      this.y = y;
    }

    SetPos(x:number,y:number)
    {
      this.x = x;
      this.y = y;
    }

    draw()
    { 

      if(this.visible == false) return;

      // czas procesuw
      this.time = auto_data.CzasGodz + "g:" + auto_data.CzasMin + "m:" + auto_data.CzasSek + "s" + " ⏱️";
        
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.textAlign = 'left';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.strokeText(this.time,this.x,this.y);
      ctx.lineWidth = 2;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText(this.time,this.x,this.y);
      ctx.shadowBlur = 0;
     
    }
    
    
 }
