
import { setSize,ctx } from './lib';

export class Diode 
{ 
    str_name:string = "";
    x:number = 0;
    y:number = 0;
    width:number = 0;
    height:number = 0;
    radius:number = 10;
    color_1:string = 'rgb(255,32,0)';
    color_2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    enabled:boolean = false;
    blink:boolean = false;
    font_size:number = 0;
    hover:boolean = false;
     
    //constructor 
    constructor(name:string,x:number,y:number,rad:number,fsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(32,232,0)',col3 = 'rgb(152,32,0)',col4 = 'rgb(32,232,0)')
    { 
       this.str_name = name;
       this.font_size = fsize; 
       this.x = x;
       this.y = y;
       this.radius = rad;
       this.width = rad*2;
       this.height = rad*2;
       this.color_1 = col1;
       this.color_2 = col2;
                  
       this.update(this.x,this.y);

    }

    update(x:number,y:number)
    { 
      let {diode_fsize,font_size, diode_radius} = setSize();
      this.font_size = diode_fsize;
      this.radius = diode_radius;

      this.x = x;
      this.y = y;
    }
    
    Show(){this.visible = true;}
    On()
    {
      if(this.blink == false)
        this.enabled = true;
    }
    Off()
    {
      if(this.blink == false)
        this.enabled = false;
    }
    Hide(){this.visible = false;}

    Blink()
    {
      if(this.blink == false) return;

      if(this.enabled == true)
      {
        this.enabled = false;
        setTimeout(this.Blink, 1000);
      }else
      {
        this.enabled = true;
        setTimeout(this.Blink, 1000);
      }
    }

    BlinkOn(){this.blink = true;this.Blink();}
    BlinkOff(){this.blink = false;}

    draw()
    { 

      if(this.visible == false) return;

      ctx.shadowColor = "black";
      ctx.shadowBlur = 6;
      //ctx.shadowOffsetX = 4;
      //ctx.shadowOffsetY = 4;

      if(this.enabled == true)
      {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color_2; //jasny kółko
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color_1; //ciemny obwódka
        ctx.stroke();
       
        ctx.arc(this.x, this.y, this.radius + 4, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
      }else
      {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color_1; //jasny kółko
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color_2; //ciemny obwódka
        ctx.stroke();
       
        ctx.beginPath();   
        ctx.arc(this.x, this.y, this.radius + 5, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
      }

      if(this.hover == true)
      {
        ctx.beginPath();   
        ctx.arc(this.x, this.y, this.radius + 7, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#00FF00';
        ctx.stroke();
      }

      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.strokeText(this.str_name,this.x + this.radius,this.y - this.radius);
      ctx.lineWidth = 2;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText(this.str_name,this.x + this.radius,this.y - this.radius);

     
      ctx.shadowColor = "black";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

    }

    clicked(x:number,y:number)
    {
      if(this.visible == false) return false;
      if(this.ptInCircle(x,y,this.x,this.y,this.radius) == -1)
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

      if(this.ptInCircle(x,y,this.x,this.y,this.radius) == -1)
      {
        this.hover = true;
        return true;
      }else
      {
        this.hover = false;
        return false;
      }
    }

    /**
     * @description Check if a pt is in, on or outside of a circle.
     * @param {[float]} pt The point to test. An array of two floats - x and y coordinates.
     * @param {[float]} center The circle center. An array of two floats - x and y coordinates.
     * @param {float} r The circle radius.
     * @returns {-1 | 0 | 1} -1 if the point is inside, 0 if it is on and 1 if it is outside the circle.
     */
     ptInCircle(px:number,py:number,cx:number,cy:number,r:number)
     {
       const lhs = Math.pow(cx - px, 2) + Math.pow(cy - py, 2);
       const rhs = Math.pow(r, 2);
       return lhs < rhs ? -1 : (lhs === rhs ? 0 : 1);
     }
    
 }
