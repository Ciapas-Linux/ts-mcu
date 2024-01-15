
import { ButtonCircle } from './ButtonCircle';
import { DrawRoundedBox,DrawCircle,setSize,play_button, ctx, deviceWidth, deviceHeight,MeasureTextHeight } from './lib';


export class InputBox 
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
    curr_element:number = 0;
    // Okrągłe przyciski
    BtOK:ButtonCircle;
    BtUP:ButtonCircle;
    BtPPlus:ButtonCircle;
    BtDOWN:ButtonCircle;
    value:string = "";
    title:string = "";
      
     
    //constructor 
    constructor(title:string,value:string,rad:number,fsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(32,232,0)')
    { 
       this.font_size = fsize; 
       this.radius = rad;
       this.color1 = col1;
       this.color2 = col2;
       this.value = value;
       this.title = title;
  
       //center message background box
       this.x = deviceWidth/6.5;
       this.y = deviceHeight/3;
       this.width = deviceWidth/1.5;
       this.height = deviceHeight/2;
  
       // OK button
       let btRadius = 30;
       this.BtOK = new ButtonCircle("OK",3,btRadius,this.x + this.width - btRadius,this.y + this.height - btRadius,15,'rgb(214,14,0)','rgb(70,2,0)');
       this.BtOK.Show();

       // UP + Button
       this.BtUP = new ButtonCircle("+",3,btRadius,this.x + this.width - btRadius*7,this.y + btRadius*3,15,'rgb(214,14,0)','rgb(70,2,0)');
       this.BtUP.Show();

       // UP ++ Button
       this.BtPPlus = new ButtonCircle("++",3,btRadius,this.x + this.width - btRadius*4,this.y + btRadius*3,15,'rgb(214,14,0)','rgb(70,2,0)');
       this.BtPPlus.Show();
       
       // DOWN - Button
       this.BtDOWN = new ButtonCircle("-",3,btRadius,this.x + this.width - btRadius*7,this.y + this.height - btRadius*3,15,'rgb(214,14,0)','rgb(70,2,0)');
       this.BtDOWN.Show();

       
       this.UpdateSizes();
   
    }
    
    percentage(num:number, per:number)
    {
      return (num/100)*per;
    }

    Show()
    {
         this.visible = true;
    }

    Hide()
    {
         this.visible = false;
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.BtOK.hoover(x,y) == true ||
        this.BtUP.hoover(x,y) == true ||
        this.BtDOWN.hoover(x,y) == true||
        this.BtPPlus.hoover(x,y) == true) 
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
          return "OK";
        }

        if(this.BtUP.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          return "UP";
        }

        if(this.BtPPlus.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          return "UP+";
        }

        if(this.BtDOWN.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');
          return "DOWN";
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
        let txt_width = ctx.measureText(this.value).width;

        ctx.strokeStyle = '#1a5100';
        ctx.miterLimit = 2;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeText(this.title,this.x + txt_width/2 ,this.y + txt_height);
        ctx.font = 'bold '+ this.font_size*2 + 'pt Arial';
        ctx.strokeText(this.value,this.x + txt_height,this.y + this.height/2);
        ctx.lineWidth = 1;
        ctx.fillStyle = '#3faa0d';
        ctx.font = 'bold '+ this.font_size + 'pt Arial';
        ctx.fillText(this.title,this.x + txt_width/2,this.y + txt_height);
        ctx.font = 'bold '+ this.font_size*2 + 'pt Arial';
        ctx.fillText(this.value,this.x + txt_height,this.y + this.height/2);
     
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    draw()
    { 

      if(this.visible == false) return;

      this.drawBackground();
      this.BtOK.draw();
      this.BtUP.draw();
      this.BtPPlus.draw();
      this.BtDOWN.draw();
              
    }

    clicked(x:number,y:number)
    {
      if(this.visible == false) return false;

      return true;

    }

    UpdateSizes()
    {
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

    }

 }
