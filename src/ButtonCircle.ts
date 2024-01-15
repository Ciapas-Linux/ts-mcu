
import { setSize,ctx } from './lib';
import { ScreenSize } from './lib';

export class ButtonCircle
{ 
    str_button_name:string = "";
    width:number = 0;
    height:number = 0;
    x:number = 0;
    y:number = 0;
    font_size:number = 25;
    radius:number = 10;
    color1:string = 'rgb(232,32,0)';
    color2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    strokew:number = 3;
    color_switch:boolean = false;
    hover:boolean = false;
  

  
    //constructor 
    constructor(name:string,str:number,rad:number,x:number,y:number,fontsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(232,32,0)')
    { 
       this.str_button_name = name;
       this.x = x;
       this.y = y;
       this.font_size = fontsize;
       this.radius = rad;
       this.color1 = col1;
       this.color2 = col2;
       this.strokew = str;

       this.update(this.x,this.y);
 
    }

    update(x:number,y:number)
    { 
      let {bt_circle_fsize, bt_circle_radius} = setSize();
      this.font_size = bt_circle_fsize;
      this.radius = bt_circle_radius;

      this.x = x;
      this.y = y;
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

      this.update(this.x,this.y);  
              
      ctx.shadowColor = "black";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      // kółko
      ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	    ctx.fillStyle = this.color2;
	    ctx.fill();
	    ctx.lineWidth = this.strokew;
	    ctx.strokeStyle = this.color1;
	    ctx.stroke(); 

           
      //napis
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = "middle";
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText(this.str_button_name,this.x,this.y);
      ctx.lineWidth = 1;
      
      if(this.hover == true)
      {
        ctx.fillStyle = '#ff000d';
      }else
      {
        ctx.fillStyle = '#3faa0d';
      }

      ctx.fillText(this.str_button_name,this.x,this.y);
      ctx.textAlign = 'left';


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
           this.radius += 5;
           setTimeout(() => {
            this.afterClick(this.radius);
        }, 100);
            
        return true;
      }else
      {
        return false;
      }

    }

    afterClick(radius:number)
    {
      this.radius -= 5;
      
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
    
    
 }
