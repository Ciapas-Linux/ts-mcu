
import { canvas,ctx,DrawRoundedBox,deviceWidth,deviceHeight,ScreenSize,ScreenOrientation,DrawText,MeasureTextHeight } from './lib';

export class Button 
{ 
    str_button_name:string = "";
    width:number = 0;
    height:number = 0;
    x:number = 0;
    y:number = 0;
    font_size:number = 25;
    radius:number = 10;
    color:string = 'rgb(232,32,0)';
    visible:boolean = false;

  
    //constructor 
    constructor(name:string,x:number,y:number,width:number,height:number,fontsize:number,col = 'rgb(232,32,0)')
    { 
       this.str_button_name = name;
       this.width =  width;
       this.height = height;
       this.x = x;
       this.y = y;
       this.font_size = fontsize;
       this.color = col; 
   
    }

    update(x:number,y:number,w:number,h:number)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        if(ScreenSize == "extralarge" && ScreenOrientation == "landscape")
        {
           this.font_size = 35;
        }
        if(ScreenSize == "large" && ScreenOrientation == "landscape")
        {
          this.font_size = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "portrait")
        {
          this.font_size = 25;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "landscape")
        {
          this.font_size = 25;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "ipad")
        {
          this.font_size = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "unknown")
        {
          this.font_size = 23; 
        }
        if(ScreenSize == "small" && ScreenOrientation == "portrait")
        {
          this.font_size = 17;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "portrait")
        {
            this.font_size = 15;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "unknown")
        {
            this.font_size = 17;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "unknown")
        {
            this.font_size = 10;
        }
        if(ScreenSize == "extral_w_slim" && ScreenOrientation == "landscape")
        {
          this.font_size = 20;
        } 

    }
    
    Inside(x:number , y:number)
    {
	    return x > this.x && x < this.x + this.width && y < this.y + this.height && y > this.y;
    }

    Show()
    {
         this.visible = true;
    }

    Hide()
    {
         this.visible = false;
    }

    draw()
    { 

      if(this.visible == false) return;

      this.update(this.x,this.y,this.width,this.height);
       
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      DrawRoundedBox(ctx,this.x,this.y,this.width,this.height, 20,'#164400');
      DrawRoundedBox(ctx,this.x + 1, this.y + 1, this.width - 6, this.height - 6, 20,'#0a2300');     
            
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.textAlign = 'center'; 

      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText(this.str_button_name,this.x + this.width/2,this.y + this.height/2);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText(this.str_button_name,this.x + this.width/2,this.y + this.height/2);
      ctx.textAlign = 'left';   

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

    }

    clicked(x:number,y:number)
    {
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
      if(this.Inside(x , y) == true)
      {
           return true;
      }else
      {
        return false;
      }

    }
    
    
 }
