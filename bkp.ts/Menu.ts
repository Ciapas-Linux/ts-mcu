
import { Button } from './Button';
import { ButtonCircle } from './ButtonCircle';
import { DrawRoundedBox, play_button, ctx, deviceWidth, deviceHeight, ScreenSize, ScreenOrientation, DrawText, MeasureTextHeight } from './lib';

export class Menu 
{ 
    x:number = 0;
    y:number = 0;
    radius:number = 10;
    color1:string = 'rgb(232,32,0)';
    color2:string = 'rgb(32,232,0)';
    visible:boolean = false;
    enabled:boolean = false;
    font_size:number = 0;
    curr_menu:number = 0;
    
    // Menu buttons prostokątne duże
    BtRozgrzewanie:Button;
    BtZalewanie:Button;
    BtStabilizacja:Button;
    BtPrzedgon:Button;
    BtStbPrzedgon:Button;
    BtPlukanieOlm:Button;
    BtGon:Button;
    BtPogon:Button;
    BtChlodzenie:Button;
    BtWifi:Button;

    buttons:Button[] = [];


    BtOK:ButtonCircle;
    BtLeft:ButtonCircle;
    BtRight:ButtonCircle;

    menu_elements: string[] = [ 'rozgrzewanie',
                               'zalewanie',
                               'stabilizacja',
                               'przedgon',
                               'stb.przedgon',
                               'plukanie.olm',
                               'gon',
                               'pogon',
                               'chlodzenie',
                               'wifi'];
   
  
    //constructor 
    constructor(x:number,y:number,rad:number,fsize:number,col1 = 'rgb(232,32,0)',col2 = 'rgb(32,232,0)')
    { 
       this.font_size = fsize; 
       this.x = x;
       this.y = y;
       this.radius = rad;
       this.color1 = col1;
       this.color2 = col2;
       
       let btWidth = deviceWidth/2;
       let btHeight = btWidth/2;
       let btX = deviceWidth/2 - btWidth/2;
       let btY = deviceHeight/4;

       if(ScreenSize == "extral_w_slim" && ScreenOrientation == "landscape")
       {
        btHeight = btWidth/3.2;
       } 


       this.BtRozgrzewanie = new Button("ROZGRZEWANIE",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtZalewanie = new Button("ZALEWANIE",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtStabilizacja = new Button("STABILIZACJA",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtPrzedgon = new Button("PRZEDGON",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtStbPrzedgon = new Button("STB.PRZEDGONU",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtPlukanieOlm = new Button("PŁUKANIE.OLM",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtGon = new Button("ODB.GONU",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtPogon = new Button("POGON",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtChlodzenie = new Button("CHŁODZENIE",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
       this.BtWifi = new Button("WIFI",btX,btY,btWidth,btHeight,10,'rgb(2,202,4)');
    

       this.buttons.push(this.BtRozgrzewanie);
       this.buttons.push(this.BtZalewanie);
       this.buttons.push(this.BtStabilizacja);
       this.buttons.push(this.BtPrzedgon);
       this.buttons.push(this.BtStbPrzedgon);
       this.buttons.push(this.BtPlukanieOlm);
       this.buttons.push(this.BtGon);
       this.buttons.push(this.BtPogon);
       this.buttons.push(this.BtChlodzenie);
       this.buttons.push(this.BtWifi);


       //OK button
       let btRadius = 30;
       btX = deviceWidth - btRadius;
       btY = deviceHeight - btRadius;
       this.BtOK = new ButtonCircle("OK",3,btRadius,btX,btY,15,'rgb(11,214,0)','rgb(90,92,90)');
  
       // options left <-  -> right buttons
       btRadius = 15;
       btX = btRadius*4;
       btY = deviceHeight/2;
       this.BtLeft = new ButtonCircle("<---",3,btRadius,btX,btY,10,'rgb(11,214,0)','rgb(22,92,3)');
       btX = deviceWidth - btRadius*4;
       btY = deviceHeight/2;
       this.BtRight = new ButtonCircle("--->",3,btRadius,btX,btY,10,'rgb(11,214,0)','rgb(22,92,3)');
       
       this.BtZalewanie.Hide();
       this.BtStabilizacja.Hide();
       this.BtPrzedgon.Hide();
       this.BtStbPrzedgon.Hide();
       this.BtPlukanieOlm.Hide();
       this.BtGon.Hide();
       this.BtPogon.Hide();
       this.BtChlodzenie.Hide(); 
       this.BtWifi.Hide(); 

       this.BtRozgrzewanie.Show();
       this.curr_menu = 0;

       this.BtRight.Show();
       this.BtLeft.Show(); 
       this.BtOK.Show(); 

    }
    
    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

         if(this.BtOK.hoover(x,y) == true ||
            this.BtRozgrzewanie.hoover(x,y) == true ||
            this.BtZalewanie.hoover(x,y) == true ||
            this.BtStabilizacja.hoover(x,y) == true ||
            this.BtPrzedgon.hoover(x,y) == true ||
            this.BtStbPrzedgon.hoover(x,y) == true ||
            this.BtPlukanieOlm.hoover(x,y) == true ||
            this.BtGon.hoover(x,y) == true ||
            this.BtPogon.hoover(x,y) == true ||
            this.BtChlodzenie.hoover(x,y) == true ||
            this.BtWifi.hoover(x,y) == true ||
            this.BtRight.hoover(x,y) ||
            this.BtLeft.hoover(x,y)) 
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

        // button ok
        if(this.BtOK.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');
            this.visible = false;
            return "OK";
        }

        // button >> NEXT
        if(this.BtRight.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');
            if(this.curr_menu < this.buttons.length - 1)
            {
                this.buttons[this.curr_menu].Hide();
                this.curr_menu++;
                this.buttons[this.curr_menu].Show();
                this.draw();    
            }
         return ">";
        }

        // button << PREV
        if(this.BtLeft.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');
            if(this.curr_menu > 0)
            {
                this.buttons[this.curr_menu].Hide();
                this.curr_menu--;
                this.buttons[this.curr_menu].Show();
                this.draw();    
            }
         return "<";
        }

        //Check all panel buttons
        if(this.BtRozgrzewanie.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[0];
        }
        if(this.BtZalewanie.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[1];
        }
        if(this.BtStabilizacja.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[2];
        }
        if(this.BtPrzedgon.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[3];
        }
        if(this.BtStbPrzedgon.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[4];
        }
        if(this.BtPlukanieOlm.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[5];
        }
        if(this.BtGon.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[6];
        }
        if(this.BtPogon.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[7];
        }
        if(this.BtChlodzenie.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[8];
        }
        if(this.BtWifi.clicked(x,y))
        {
            play_button();
            this.DrawCircle(x,y,3,8,'#FFF200','red');    
            return this.menu_elements[9];
        }

      return "";  
    }

    drawBackground()
    { 
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      
        DrawRoundedBox(5,5,deviceWidth - 10,deviceHeight - 5, 20,'#00B900');
        DrawRoundedBox(8,8,deviceWidth - 17,deviceHeight - 12, 20,'#002300');
        ctx.textBaseline = 'middle'  
        ctx.fillStyle = 'rgb(202,205,255)';
        ctx.font = `${12}px Arial`
        ctx.fillText("Sterowanie Destylatorem v 2.0",5,5);
      
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    draw()
    { 

      if(this.visible == false) return;

      this.drawBackground();
           
      this.BtRozgrzewanie.draw();
      this.BtZalewanie.draw();
      this.BtStabilizacja.draw();
      this.BtPrzedgon.draw();
      this.BtStbPrzedgon.draw();
      this.BtPlukanieOlm.draw();
      this.BtGon.draw();
      this.BtPogon.draw();
      this.BtChlodzenie.draw();
      
      this.BtLeft.draw();
      this.BtRight.draw();
      this.BtOK.draw();
      
      

    }

    resize()
    {

      let btWidth = deviceWidth/2;
      let btHeight = btWidth/2;
      let bx = deviceWidth/2 - btWidth/2;
      let by = deviceHeight/4;
 
      if(ScreenSize == "extral_w_slim" && ScreenOrientation == "landscape")
      {
        btHeight = btWidth/3.2;
      }   

      this.BtRozgrzewanie.update(bx,by,btWidth,btHeight);
      this.BtZalewanie.update(bx,by,btWidth,btHeight);
      this.BtStabilizacja.update(bx,by,btWidth,btHeight);
      this.BtPrzedgon.update(bx,by,btWidth,btHeight);
      this.BtStbPrzedgon.update(bx,by,btWidth,btHeight);
      this.BtPlukanieOlm.update(bx,by,btWidth,btHeight);
      this.BtGon.update(bx,by,btWidth,btHeight);
      this.BtPogon.update(bx,by,btWidth,btHeight);
      this.BtChlodzenie.update(bx,by,btWidth,btHeight);
      
      let btRadius = 15;
      this.BtLeft.update(btRadius*4,deviceHeight/2);
      this.BtRight.update(deviceWidth - btRadius*4,deviceHeight/2);
      btRadius = 30;
      this.BtOK.update(deviceWidth - btRadius,deviceHeight - btRadius);
    }

    DrawCircle(x:number,y:number,line:number,radius:number,color1 = 'rgb(255,242,0)',color2 = 'rgb(255,2,0)')
    {
	  ctx.beginPath();
	  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	  ctx.fillStyle = color2;
	  ctx.fill();
	  ctx.lineWidth = line;
	  ctx.strokeStyle = color1;
	  ctx.stroke();
    }
    
 }
