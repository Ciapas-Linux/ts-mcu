// USTAWIENIA PODSTAWOWE
import { Button } from './Button';
import { play_button,auto_data,ScreenSize,ScreenOrientation,setSize,DrawCircle,ctx,deviceWidth,deviceHeight} from './lib';

// ETAP 0 BASIC: settings-->
export class Menu 
{ 
    visible:boolean = false;
    font_size:number = 0;
    btRadius:number = 15;

    // I
    bPodstawowe:Button;
    bTermostat:Button;
    bRozgrzewanie:Button;

    // II
    bZalewanieA:Button;
    bZalewanieB:Button;
    bZalewanieC:Button;

    // III
    bStabilizacja:Button;
    bPrzedgon:Button;
    bStb_Przedgon:Button;

    // IV
    bOlm:Button;
    bGon:Button;
    bPogon:Button;

    // V
    bChlodzenie:Button;
    bWifi:Button;
    bZapis:Button;

    // VI
    bCloud:Button;

    bPliki:Button;

    bHome:Button;
   
      
    constructor(fsize:number)
    { 
       this.font_size = fsize;
       
       this.bPodstawowe = new Button("PODSTAWOWE😼",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(180,180,180)');
       this.bPodstawowe.Show();

       this.bTermostat = new Button("TERMOSTAT🌡️",0,0,deviceWidth/4,deviceHeight/8,17,'#FF4900');
       this.bTermostat.Show();

       this.bRozgrzewanie = new Button("ROZGRZEWANIE😈",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(200,200,0)');
       this.bRozgrzewanie.Show();

       // II 
       this.bZalewanieA = new Button("ZALANIE A ⛲",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bZalewanieA.Show();

       this.bZalewanieB = new Button("ZALANIE B ⛲",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bZalewanieB.Show();

       this.bZalewanieC = new Button("ZALANIE C ⛲",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bZalewanieC.Show();

       // III 🛡️
       this.bStabilizacja = new Button("STABILIZACJA",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bStabilizacja.Show();

       this.bPrzedgon = new Button("PRZEDGON 🗑",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bPrzedgon.Show();

       this.bStb_Przedgon = new Button("Stb.PRZEDGON",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bStb_Przedgon.Show();

       // IV
       this.bOlm = new Button("P.OLM 💦",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bOlm.Show();

       this.bGon = new Button("DESTYLAT 💕",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bGon.Show();

       this.bPogon = new Button("POZOSTAŁE🗑",0,0,deviceWidth/4,deviceHeight/8,17,'rgb(0,200,44)');
       this.bPogon.Show();

       // V
       this.bChlodzenie = new Button("CHŁODZENIE❄️",0,0,deviceWidth/4,deviceHeight/8,17,'#ffffff');
       this.bChlodzenie.Show();

       this.bWifi = new Button("WIFI  📶",0,0,deviceWidth/4,deviceHeight/8,17,'#00D2D7');
       this.bWifi.Show();

       this.bZapis = new Button("INNE 😼",0,0,deviceWidth/4,deviceHeight/8,17,'#ffffff');
       this.bZapis.Show();

       // VI - 6
       this.bCloud = new Button("CLOUD 🌐",0,0,deviceWidth/4,deviceHeight/8,17,'#ffffff');
       this.bCloud.Show();

       this.bPliki = new Button("PLIKI 🗂️",0,0,deviceWidth/4,deviceHeight/8,17,'#ffffff');
       this.bPliki.Show();

       this.bHome = new Button("EXIT",0,0,deviceWidth/4,deviceHeight/8,17,'#ffffff');
       this.bHome.Show();
 
       
       this.update();
      
    }

    update()
    { 
      let {font_size, diode_radius} = setSize();
      this.font_size = font_size;

      var posx:number = 50;
      var posy:number = (this.font_size*2)*2.6;
      var bWidth:number = deviceWidth/4;
      var bHeight:number = deviceHeight/10;

      var padding:number = 30;
      if(ScreenSize == "sextrasmall")
      {
        padding = 8;
      }else if(ScreenSize == "extrasmall") 
      {
        padding = 13;  
      }else if(ScreenSize == "large") 
      {
        padding = 15;  
      }else if(ScreenSize == "medium" && ScreenOrientation == "landscape")
      {
        padding = 15;
      }

      

      // ROW I  
      posx =  (deviceWidth/2) - bWidth/2;
      this.bTermostat.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx = posx - bWidth - padding;  
      this.bPodstawowe.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) + bWidth/2 + padding;
      this.bRozgrzewanie.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);

      // ROW II
      posy = posy + bHeight + padding;
      posx =  (deviceWidth/2) - bWidth/2;
      this.bZalewanieB.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx = posx - bWidth - padding;   
      this.bZalewanieA.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) + bWidth/2 + padding;  
      this.bZalewanieC.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);

      // ROW III
      posy = posy + bHeight + padding;
      posx =  (deviceWidth/2) - bWidth/2;
      this.bPrzedgon.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx = posx - bWidth - padding;   
      this.bStabilizacja.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) + bWidth/2 + padding;  
      this.bStb_Przedgon.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius); 
      
      // ROW IV
      posy = posy + bHeight + padding;
      posx =  (deviceWidth/2) - bWidth/2;
      this.bGon.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx = posx - bWidth - padding;   
      this.bOlm.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) + bWidth/2 + padding;  
      this.bPogon.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      
      // ROW V
      posy = posy + bHeight + padding;
      posx =  (deviceWidth/2) - bWidth/2;
      this.bWifi.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx = posx - bWidth - padding;   
      this.bChlodzenie.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) + bWidth/2 + padding;  
      this.bZapis.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius); 

      // ROW VI
      posy = posy + bHeight + padding;
      posx =  (deviceWidth/2) - bWidth/2;
      posx = posx - bWidth - padding;   
      this.bCloud.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) - bWidth/2;
      this.bPliki.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      posx =  (deviceWidth/2) + bWidth/2 + padding;
      this.bHome.update(posx ,posy,bWidth,bHeight,this.bTermostat.radius);
      
        
    }
    
    Show(){this.visible = true;}
    Hide(){this.visible = false;}

    draw()
    { 
      if(this.visible == false) return;
          
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.font = 'bold '+ this.font_size*1.8 + 'pt Arial';
      let fheight = (this.font_size*2)*1.2;  
      ctx.textAlign = 'center'; 
      ctx.strokeStyle = '#1a5100';
      ctx.miterLimit = 2;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeText("USTAWIENIA ⚙️",deviceWidth/2,13);
      ctx.lineWidth = 1;
      ctx.fillStyle = '#3faa0d';
      ctx.fillText("USTAWIENIA ⚙️",deviceWidth/2,13);
      ctx.fillStyle = '#FFB300';
      ctx.font = 'bold '+ this.font_size + 'pt Arial';
      ctx.fillText("Plik: " + auto_data.FileName,deviceWidth/2,fheight*1.5);
    

      this.bPodstawowe.draw();
      this.bTermostat.draw();
      this.bRozgrzewanie.draw();
      this.bZalewanieA.draw();
      this.bZalewanieB.draw();
      this.bZalewanieC.draw();
      this.bStabilizacja.draw();
      this.bPrzedgon.draw();
      this.bStb_Przedgon.draw();
      this.bOlm.draw();
      this.bGon.draw();
      this.bPogon.draw();
      this.bChlodzenie.draw();
      this.bWifi.draw();
      this.bZapis.draw();
      this.bCloud.draw();
      this.bPliki.draw();
      this.bHome.draw();
     
      ctx.shadowBlur = 0;
    }

    OnClick(x:number,y:number)
    {
      if(this.visible == false) return false;

      if(this.bPodstawowe.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "basic_set";
      }

      if(this.bTermostat.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "termostat";
      }

      if(this.bRozgrzewanie.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "rozgrzewanie";
      }

      if(this.bZalewanieA.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "zalewanieA";
      }

      if(this.bZalewanieB.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "zalewanieB";
      }

      if(this.bZalewanieC.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "zalewanieC";
      }

      if(this.bStabilizacja.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "stabilizacja";
      }

      if(this.bPrzedgon.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "przedgon";
      }

      if(this.bStb_Przedgon.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "stb.przedgon";
      }

      if(this.bOlm.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "polm";
      }

      if(this.bGon.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "gon";
      }

      if(this.bPogon.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "pogon";
      }

      if(this.bChlodzenie.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "chlodz";
      }

      if(this.bWifi.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "wifi";
      }

      if(this.bZapis.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "save";
      }

      if(this.bCloud.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        //this.Hide();
        return "cloud";
      }

      if(this.bPliki.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        this.Hide();
        return "pliki";
      }

      if(this.bHome.clicked(x,y))
      {
        play_button();
        DrawCircle(x,y,3,8,'#FFF200','red');
        //location.replace("index.html")
        return "home";
      }

     
    }

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.bPodstawowe.hoover(x,y) == true ||
           this.bTermostat.hoover(x,y) == true ||
           this.bRozgrzewanie.hoover(x,y) == true ||
           this.bZalewanieA.hoover(x,y) == true ||
           this.bZalewanieB.hoover(x,y) == true ||
           this.bZalewanieC.hoover(x,y) == true ||
           this.bStabilizacja.hoover(x,y) == true ||
           this.bPrzedgon.hoover(x,y) == true ||
           this.bStb_Przedgon.hoover(x,y) == true ||
           this.bOlm.hoover(x,y) == true ||
           this.bGon.hoover(x,y) == true ||
           this.bPogon.hoover(x,y) == true ||
           this.bChlodzenie.hoover(x,y) == true ||
           this.bWifi.hoover(x,y) == true ||
           this.bZapis.hoover(x,y) == true  ||
           this.bCloud.hoover(x,y) == true ||
           this.bPliki.hoover(x,y) == true ||
           this.bHome.hoover(x,y) == true  )
        {
           document.body.style.cursor = 'pointer';
        }else
        {
           document.body.style.cursor = 'default';
        }
    }
  
 }
