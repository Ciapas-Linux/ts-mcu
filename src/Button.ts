
import { setSize,ctx,DrawRoundedBox,ScreenSize,descriptionText } from './lib';

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
    hover:boolean = false;
    click:boolean = false;

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

    update(x:number,y:number,w:number,h:number,rad:number)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        let {button_font_size} = setSize();
        this.font_size = button_font_size;
        if(ScreenSize == "sextrasmall")
        {
          this.font_size = 4;
          this.radius = 5;
        }else if(ScreenSize == "extrasmall") 
        {
          this.font_size = 8;
          this.radius = 7;  
        }else if(ScreenSize == "extralarge") 
        {
          this.font_size = 18;
          this.radius = 13;  
        }

    }
    
    Inside(x:number , y:number)
    {
	    return x > this.x && x < this.x + this.width && y < this.y + this.height && y > this.y;
    }

    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    draw()
    { 
      if(this.visible == false) return;
      this.update(this.x,this.y,this.width,this.height,this.radius);
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      DrawRoundedBox(ctx,this.x,this.y,this.width,this.height, this.radius,'#373737');
      DrawRoundedBox(ctx,this.x + 4, this.y + 4, this.width - 9, this.height - 9, this.radius,'#999999');     
                    
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = "middle";
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText(this.str_button_name,this.x + this.width/2,this.y + this.height/2);
      ctx.lineWidth = 1;
      ctx.fillStyle = this.color;
      ctx.fillText(this.str_button_name,this.x + this.width/2,this.y + this.height/2);
      ctx.textAlign = 'left';
      
     /*  var endwt_y = descriptionText("Zak:",this.str_button_name,
                      this.x,
                      this.y,
                      50,
                      this.font_size,
                      '#0078FF',
                      this.color); */
     

      ctx.shadowBlur = 0;
    }

    clicked(x:number,y:number)
    {
      if( this.Inside(x , y) == true)
      {
        this.click = true;
       return true;
      }else
      {
        this.click = false; 
       return false;
      }
    }

    hoover(x:number,y:number)
    {
      if(this.Inside(x , y) == true)
      {
        this.hover = true;
        return true;
      }else
      {
        this.hover = false;
        return false;
      }
    }
   
 }
