import { SuperText } from './SuperText';
import { UpdateCanvas,randomNumber,auto_data,canvas,setSize,DrawCircle,play_alert,play_button,drawText,wrapText,ctx,deviceWidth,deviceHeight,ScreenSize,ScreenOrientation,DrawText,MeasureTextHeight } from './lib';

export class Graph 
{ 
    visible:boolean = false;
    font_size:number = 0;

    
    padding = 10;  
    tickSize = 10;  
    font = "12pt Calibri";
    fontHeight = 12;
    
    minX = 0;  
    minY = 0;  
    maxX = 140;  
    maxY = 130;  
    unitsPerTickX = 10;  
    unitsPerTickY = 10;  
    
    rangeX = this.maxX - this.minY;  
    rangeY = this.maxY - this.minY;  
    numXTicks = Math.round(this.rangeX / this.unitsPerTickX);  
    numYTicks = Math.round(this.rangeY / this.unitsPerTickY);  
    x = 70;  
    y = 100;
    width = deviceWidth/1.1;  
    height = deviceHeight/1.5;  
    scaleX = this.width / this.rangeX;  
    scaleY = this.height / this.rangeY;

  
    data = [{x: 0,y: 0.0}];
    data_counter:number = 0;
    data_index:number = 0;  
  
         
    input = document.createElement('input');
     
    constructor(fsize:number)
    { 
       this.data.pop(); 
       setInterval(() => {this.update_data();},1000);
       this.update();
    }

    drawXAxis()
    {  
        var context = ctx;  
        context.save();  
        context.beginPath();  
        context.moveTo(this.x, this.y + this.height);  
        context.lineTo(this.x + this.width, this.y + this.height);  
        context.strokeStyle = "#555";  
        context.lineWidth = 2;  
        context.stroke();  

        // draw tick marks  
        for (var n = 0; n < this.data.length; n++)
        {  
            context.beginPath();  
            context.moveTo((n + 1) * this.width / this.data.length + this.x, this.y + this.height);  
            context.lineTo((n + 1) * this.width / this.data.length + this.x, this.y + this.height - this.tickSize);  
            context.stroke();  
        }  

        /* // draw labels  
        context.font = this.font;  
        context.fillStyle = "#00ff00";  
        context.textAlign = "center";  
        context.textBaseline = "middle";  

        for (var n = 0; n < this.numXTicks; n++)
        {  
            var label = Math.round((n + 1) * this.maxX / this.numXTicks);  
            context.save();  
            context.translate((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height + this.padding);  
            context.fillText(label.toString(), 0, 0);  
            context.restore();  
        }   */
        context.restore();  
    }  

    drawYAxis()
    {  
        var context = ctx;  
        context.save();  
        context.save();  
        context.beginPath();  
        context.moveTo(this.x, this.y);  
        context.lineTo(this.x, this.y + this.height);  
        context.strokeStyle = "#555";  
        context.lineWidth = 2;  
        context.stroke();  
        context.restore();  

        // draw tick marks
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";  
        ctx.strokeStyle = "green";  
        for (var n = 0; n < this.numYTicks; n++)
        {  
            context.beginPath();  
            context.moveTo(this.x, n * this.height / this.numYTicks + this.y);  
            context.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y);  
            context.stroke();  
        }  

        // draw values  
        context.font = "15pt Arial";  
        context.fillStyle = "#00ff00";  
        context.textAlign = "right";  
        context.textBaseline = "middle";  

        for (var n = 0; n < this.numYTicks; n++)
        {  
            var value = Math.round(this.maxY - n * this.maxY / this.numYTicks);  
            context.save();  
            context.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);  
            context.fillText(value.toString(), 0, 0);  
            context.restore();  
        }  
        context.restore();  
    }  

    transformContext()
    {  
        var context = ctx;  

        // move context to center of canvas  
        context.translate(this.x, this.y + this.height);  

        // invert the y scale so that that increments  
        // as you move upwards  
        context.scale(1, -1);  
    };  

    drawLine(data:any, color:string, width:number)
    {  

        if(this.data_index > this.x + this.width )
        {
            this.data_index = 0;
            return;
        } 

        var context = ctx;  
        context.save();  
        this.transformContext();  
        context.lineWidth = width;  
        context.strokeStyle = color;  
        context.fillStyle = color;  
        context.beginPath();  
        context.moveTo(data[0].x * this.scaleX, data[0].y * this.scaleY);  

        for (var n = 0; n < data.length; n++)
        {  
            var point = data[n];  

            // draw segment  
            context.lineTo(point.x * this.scaleX, point.y * this.scaleY);  
            context.stroke();  
            context.closePath();  
            
            //Point
            context.beginPath();  
            context.arc(point.x * this.scaleX, 0 * this.scaleY, 1, 0, 2 * Math.PI, false);  
            context.fill();  
            context.closePath();
            
           
            // position for next segment  
            context.beginPath();  
            context.moveTo(point.x * this.scaleX, point.y * this.scaleY);  
        }  
        context.restore(); 
        
        this.data_index++;
    }  


    update_data()
    { 

       this.data.push( { x: this.data_counter, y: randomNumber(50,60)});
       //this.data.push( { x: this.counter, y: parseFloat(auto_data.TempKolumna)});
       this.data_counter += 1; 

       //if(this.counter >= this.width)
       //this.counter = 0;


       //this.temps.push(randomNumber(0,50));
       //play_button();
       UpdateCanvas(true);
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;
    }
    
    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    rect(x:number,y:number,w:number,h:number)
    {
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.closePath();
        ctx.fill();
    }

    draw()
    { 
      if(this.visible == false) return;
      
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.font = 'bold '+ this.font_size*1.3 + 'pt Arial';
      let fheight = (this.font_size*1.3)*1.2;  
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#000000';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("WYKRESY",deviceWidth/2,deviceHeight/35);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("WYKRESY",deviceWidth/2,deviceHeight/35);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("temperatur względem czasu:",deviceWidth/2,deviceHeight/35 + fheight);
       
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillStyle = '#000000';
      this.rect(this.x,this.y,this.width,this.height);
      
      this.drawYAxis();
      //this.drawXAxis();
      this.drawLine(this.data, '#FF5000', 2);

      ctx.fillStyle = '#FF0000';
      ctx.fillText("+",this.x + this.width,deviceHeight/2);
      

    }

    Onclick(x:number,y:number)
    {
      if(this.visible == false) return false;
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;
    }
   
    handleInput(e:any)
    {
        this.input.value = this.input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }

    handleEnter(e:any)
    {
       var keyCode = e.keyCode;
       //const isNumber = isFinite(e.key);
       const whitelist = ['Backspace','Delete','ArrowDown','ArrowUp','ArrowRight','ArrowLeft'];
       const whitelistKey = whitelist.includes(e.key);

       if (keyCode === 13) // user hit enter
       {
           play_button();

           setTimeout(play_alert, 500);
           drawText(this.input.value, deviceWidth/2,deviceHeight/2,this.font_size*7);
           this.input.blur();
           canvas.focus();  
           document.body.removeChild(this.input);
           //setTimeout(this.draw.bind(this),500);
       }
    }

    addInput(x:number, y:number)
    {
        this.input.type = 'tel';
        this.input.inputMode = 'numeric';
        this.input.id = "sraka_13l";
        this.input.style.boxShadow = "0px 0px 20px blue";
        this.input.style.textShadow = '3px 3px 4px #262626';
        this.input.style.color = 'rgb(0, 0, 0)';
        this.input.style.caretColor = 'rgb(200, 0, 0)';
        this.input.style.position = 'fixed';
        this.input.style.padding = '10px';
        this.input.style.font = 'bold '+ this.font_size*1.5 + 'pt Arial';
        this.input.style.width = '20%';
        this.input.style.border =  '5px solid var(--input-border)';
        this.input.style.borderRadius =  '5px';
        this.input.style.backgroundColor = '#888';
        this.input.style.zIndex = '1000';
        this.input.style.left = (x - 4) + 'px';
        this.input.style.top = (y - 4) + 'px';
        this.input.value = "";
        this.input.onkeydown = this.handleEnter.bind(this);
        this.input.oninput = this.handleInput.bind(this);
        document.body.appendChild(this.input);
        this.input.focus();
    }   

 }
