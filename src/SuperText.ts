
//import { InputBox } from './InputBox';
import { UpdateCanvas, setSize,DrawRoundedRect,isPointInRectangle, getTextBBox,ctx,deviceWidth,deviceHeight,ScreenSize,ScreenOrientation,DrawText,MeasureTextHeight } from './lib';

export class SuperText 
{ 
    str_text:string = "";
    value:number = 0;
    value_txt:string = "";
    value_type:string = "";
    x:number = 0;
    y:number = 0;
    width:number = 0;
    height:number = 0;
    color_on_1:string = 'rgb(255,32,0)';
    color_on_2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    font_size:number = 0;
    hover:boolean = false;

    //InputBox
    //ib_InputBox:InputBox;

  
    //constructor 
    constructor(name:string,x:number,y:number,fsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(200,255,0)')
    { 
       this.str_text = name;
       this.font_size = fsize; 
       this.x = x;
       this.y = y;
       this.color_on_1 = col1;
       this.color_on_2 = col2;

       //ctx.font = 'bold '+ this.font_size + 'pt Arial';
       //this.height = MeasureTextHeight(ctx.font, this.font_size);
       //this.width = ctx.measureText(this.str_text).width;

       // InputBox
       //this.ib_InputBox = new InputBox("","",10,15,'rgb(11,214,0)','rgb(22,92,3)');
       //this.ib_InputBox.Hide(); 
                    
       this.update(this.x,this.y);

    }

    SetText(txt:string)
    {
      this.str_text = txt;
      var tbbox = getTextBBox(this.str_text);
      this.width = tbbox.width;
      this.height = tbbox.height;
    }

    update(x:number,y:number)
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;
           
      ctx.font = 'bold '+ this.font_size + 'pt Arial';

      var tbbox = getTextBBox(this.str_text);
      this.width = tbbox.width + 10;
      this.height = tbbox.height + 10;

      //this.height = MeasureTextHeight(ctx.font, this.font_size);
      //this.height = (this.font_size) * 1.3;
      //this.width = ctx.measureText(this.str_text).width; 
      
      this.x = x;
      this.y = y;
    }
    
    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    draw():void
    { 

      if(this.visible == false) return;

      this.update(this.x,this.y);

      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.textAlign = 'left'; 
      ctx.textBaseline = "top"; 
      
      if(this.hover == true)
      {
        ctx.fillStyle = 'rgb(255,32,0)';
        ctx.fillText(this.str_text,this.x,this.y);
      }else
      {
        ctx.fillStyle = this.color_on_1;
        ctx.fillText(this.str_text,this.x,this.y);
      }
      
      ctx.fillStyle = this.color_on_2;

      if(this.value_txt != "")
      {
        ctx.fillText(this.value_txt,this.x + this.width + this.height/2,this.y);
      }else
      {
        if(Number.isInteger(Number(this.value)) == false)
        {
          // floating number
          ctx.fillText(this.value.toFixed(1) + this.value_type,this.x + this.width + this.height/2,this.y);
        }else
        {
          // min/sek
          if(this.value_type == "m/s ⏱️")
          {
            var min = Math.floor(this.value / 60);
            var sek = this.value - min * 60;
            ctx.fillText(min.toString() + "/" + sek.toString() + "  " + this.value_type,this.x + this.width + this.height/2,this.y);
          }else
          {
            // integer number
            ctx.fillText(this.value.toString(10) + this.value_type,this.x + this.width + this.height/2,this.y);
          }
        }
      }

     
      // debuging Box
      // ctx.beginPath();
      // ctx.rect(this.x - 5, this.y - 5, this.width, this.height);
      // ctx.stroke();

      DrawRoundedRect(this.x - 5, this.y - 5, this.width, this.height + 5,7,'rgb(0,255,0)');

      ctx.shadowColor = "black";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      //this.ib_InputBox.draw();  

    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;
        //this.ib_InputBox.OnMouseMove(x,y)
    }

    clicked(x:number,y:number)
    {
      if(this.visible == false) return false;
      var rect={x:this.x - 5, y:this.y - 5, width:this.width, height:this.height}
      
      if(isPointInRectangle(x,y,rect) ) //this.Inside(x , y) == true
      {
        //this.ib_InputBox.Show();
        //UpdateCanvas(true);
        return true;
      }else
      {
       return false;
      }
    }

    Inside(x:number , y:number)
    {
	    return x > this.x && x < this.x + this.width && y < this.y + this.height && y > this.y;
    }
    
    hoover(x:number,y:number)
    {
      if(this.visible == false) return false;
      var rect={x:this.x - 5, y:this.y - 5, width:this.width, height:this.height}
      if(isPointInRectangle(x,y,rect) ) //this.Inside(x , y) == true
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
