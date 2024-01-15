
import { setSize,ctx,DrawRoundedBox,ScreenSize,ScreenOrientation } from './lib';

export class CheckBox 
{ 
    str_name:string = "";
    width:number = 0;
    height:number = 0;
    x:number = 0;
    y:number = 0;
    font_size:number = 25;
    radius:number = 10;
    color:string = 'rgb(232,32,0)';
    visible:boolean = false;
    enabled:boolean = false;

  
    //constructor 
    constructor(name:string,x:number,y:number,width:number,height:number,fontsize:number,col = 'rgb(232,32,0)')
    { 
       this.str_name = name;
       this.width =  width;
       this.height = height;
       this.x = x;
       this.y = y;
       this.font_size = fontsize;
       this.color = col; 

       this.update(this.x,this.y,this.width,this.height);
    }

    update(x:number,y:number,w:number,h:number)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        let {font_size, diode_radius} = setSize();
        this.font_size = font_size;
    }
    
    Inside(x:number , y:number)
    {
	    return x > this.x && x < this.x + this.width && y < this.y + this.height && y > this.y;
    }

    Show(){this.visible = true;}
    Hide(){this.visible = false;}
    On(){this.enabled = true;}
    Off(){this.enabled = false;}

    Status()
    {
      if(this.enabled == true)
      {
        return true;
      }else
      {
        return false;
      }
    }

    draw()
    { 

      if(this.visible == false) return;

      this.update(this.x,this.y,this.width,this.height);
       
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      DrawRoundedBox(ctx,this.x,this.y,this.width,this.height, this.width/3,'#434343');
      DrawRoundedBox(ctx,this.x + 5, this.y + 5, this.width - 10, this.height - 10, this.width/3,'#686767');     
      
      if(this.enabled == true)
      {
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/4, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#FF1E00';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#5B0B00';
        ctx.stroke();
      }

      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.textAlign = 'left'; 
      ctx.textBaseline = "middle";
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText(this.str_name,this.x + this.width*1.2,this.y + this.height/2);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText(this.str_name,this.x + this.width*1.2,this.y + this.height/2);
           
      ctx.shadowBlur = 0;
     
    }

    clicked(x:number,y:number)
    {
      if(this.visible == false) return false;
      if( this.Inside(x , y) == true)
      {
        return true;
      }else
      {
        return false;
      }
    }

    hoover(x:number,y:number)
    {
      if(this.visible == false) return false;
      if(this.Inside(x , y) == true)
      {
        return true;
      }else
      {
        return false;
      }
    }
    
    
 }
