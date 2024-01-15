
import { ButtonCircle } from './ButtonCircle';
import { UpdateCanvas,SendCommand,DrawRoundedBox,play_button,auto_data, ctx, DrawCircle, deviceWidth, deviceHeight, ScreenSize, ScreenOrientation } from './lib';
import { MessageBoxTimeOut } from './MessageBoxTimeOut';

import { Et0 } from './Et0';
import { Et0t } from './Et0t';
import { Et1 } from './Et1';
import { Et2a } from './Et2a';
import { Et2b } from './Et2b';
import { Et2c } from './Et2c';
import { Et3 } from './Et3';
import { Et4 } from './Et4';
import { Et5 } from './Et5';
import { Et6 } from './Et6';
import { Et7 } from './Et7';
import { Et8 } from './Et8';
import { Et9 } from './Et9';
import { wifi } from './wifi';
import { Update } from './Update';
import { Menu } from './Menu';
// import { Cloud } from './Cloud';
import { Pliki } from './Pliki';


export class Options 
{ 
    visible:boolean = false;
    font_size:number = 0;
       
    // Okrągłe przyciski
    btRadius:number = 15;
    BtOK:ButtonCircle;
    

    // OPTIONS:
    basic_set:Et0;
    termostat:Et0t;
    rozgrzewanie:Et1;
    zalewanieA:Et2a;
    zalewanieB:Et2b;
    zalewanieC:Et2c;
    stabilizacja:Et3;
    przedgon:Et4;
    przedgon_stb:Et5;
    plukanie_olm:Et6;
    odb_gonu:Et7;
    odb_pogonu:Et8;
    chlodzenie:Et9;
    menu:Menu;
    wifi:wifi;
    mupdate:Update;
    //Cloud:Cloud;

    Pliki:Pliki;

    // Graph plots
    //graph:Graph

    current_option:number = 0;
    readonly max_options:number = 17;
    
    MsgBoxTout:MessageBoxTimeOut;
     
    constructor(fsize:number)
    { 
        this.font_size = fsize; 
      
        // MsgBox time based
        this.MsgBoxTout = new MessageBoxTimeOut("dupas",10,15,'rgb(11,214,0)','rgb(22,92,3)');
        this.MsgBoxTout.Hide();

        // COLUMN OPTIONS:
        this.rozgrzewanie = new Et1(10);
        this.rozgrzewanie.Hide();

        this.zalewanieA = new Et2a(10);
        this.zalewanieA.Hide();

        this.zalewanieB = new Et2b(10);
        this.zalewanieB.Hide();

        this.zalewanieC = new Et2c(10);
        this.zalewanieC.Hide();

        this.stabilizacja = new Et3(10);
        this.stabilizacja.Hide();

        this.przedgon = new Et4(10);
        this.przedgon.Hide();

        this.przedgon_stb = new Et5(10);
        this.przedgon_stb.Hide();

        this.plukanie_olm = new Et6(10);
        this.plukanie_olm.Hide();

        this.odb_gonu = new Et7(10);
        this.odb_gonu.Hide();

        this.odb_pogonu = new Et8(10);
        this.odb_pogonu.Hide();

        this.chlodzenie = new Et9(10);
        this.chlodzenie.Hide();

        this.wifi = new wifi(10);
        this.wifi.Hide();

        this.mupdate = new Update(10);
        this.mupdate.Hide();

        this.basic_set = new Et0(10);
        this.basic_set.Hide();

        this.termostat = new Et0t(10);
        this.termostat.Hide();

        //this.Cloud = new Cloud(10);
        //this.Cloud.Hide();

        this.Pliki = new Pliki(10);
        this.Pliki.Hide();

        this.menu = new Menu(10);
        this.menu.Show();

        // OK
        let btRadius = 30;
        let btX = deviceWidth - btRadius*2;
        let btY = deviceHeight - btRadius*2;
        this.BtOK = new ButtonCircle("OK",3,btRadius,btX,btY,15,'rgb(11,214,0)','rgb(90,92,90)');
        this.BtOK.Show();

        this.update();
    }

    /* update_options()
    {
      // alarmy zbiornik i głowica:
      auto_data_save.TempAlarmuBeczka = this.basic_set.AlarmZbiornik.value.toString();
      auto_data_save.TempAlarmuGlowica = this.basic_set.AlarmGlowica.value.toString();

      // termostat:
      auto_data_save.TempTermostat_start = this.termostat.TermostatStart.value;
      auto_data_save.TempTermostat_stop = this.termostat.TermostatStop.value;
               
      // rozgrzewanie 
      auto_data_save.TempStopRozgrzewania = this.rozgrzewanie.TempKolumna.value;  

      // zalewanie
      //auto_data_save.CisnienieZalania_1 = this.zalewanieA.CisnienieZalaniaA.value; 
      //auto_data_save.CisnienieZalania_2 = this.zalewanieB.CisnienieZalaniaB.value;
      //auto_data_save.CisnienieZalania_3 = this.zalewanieC.CisnienieZalaniaC.value;
      auto_data_save.PrzerwaZalania_1 = this.zalewanieA.PrzerwaZalaniaA.value;
      auto_data_save.PrzerwaZalania_2 = this.zalewanieB.PrzerwaZalaniaB.value;
      auto_data_save.PrzerwaZalania_3 = this.zalewanieC.PrzerwaZalaniaC.value;
      auto_data_save.CzasZalania_1 = this.zalewanieA.CzasZalaniaA.value;
      auto_data_save.CzasZalania_2 = this.zalewanieB.CzasZalaniaB.value;
      auto_data_save.CzasZalania_3 = this.zalewanieC.CzasZalaniaC.value;
      auto_data_save.CzujnikZalania = this.basic_set.CzujnikZalania_cb.Status();
      auto_data_save.WartoscZalania = this.basic_set.WZal_st.value;
          
      // Moduł mocy regulowany:
      auto_data_save.PWR_MOD = this.basic_set.ModulMocyR_cb.Status();
     
      // przedgon:
      auto_data_save.CzasOtwarciaZPrzedgonu = this.przedgon.CzasO_EZG.value;
      auto_data_save.CzasZamknieciaZPrzedgonu = this.przedgon.CzasZ_EZG.value;
      auto_data_save.Przg_G1pwm = this.przedgon.Grzalka1.value;
      auto_data_save.CyklePrzedgonu = this.przedgon.CyklePrzedgonu.value;
      auto_data_save.Przg_G1 = this.przedgon.Grzalka1_cb.Status();
      auto_data_save.Przg_G2 = this.przedgon.Grzalka2_cb.Status();
      auto_data_save.Przg_G3 = this.przedgon.Grzalka3_cb.Status();
    
      // Płukanie OLM:
      auto_data_save.CzasPlukanieOLM = this.plukanie_olm.CzasPlukaniaOLM.value;
      
      // stabilizacja:
      auto_data_save.CzasStabilizacji = this.stabilizacja.CzasStabilizacji.value;
      auto_data_save.Stb_G1pwm = this.stabilizacja.Grzalka1.value;
      auto_data_save.Stb_G1 = this.stabilizacja.Grzalka1_cb.Status();
      auto_data_save.Stb_G2 = this.stabilizacja.Grzalka2_cb.Status();
      auto_data_save.Stb_G3 = this.stabilizacja.Grzalka3_cb.Status();

      // stab.przedgonu:
      auto_data_save.CzasStabilizacjiPrzedgonu = this.przedgon_stb.CzasStabilizacji.value; 
      
      // GON:
      auto_data_save.CzasZakonczeniaGon = this.odb_gonu.CzasZakonczeniaZKROK.value;
      auto_data_save.HisterezaG_close = this.odb_gonu.HisterezaG_close.value;
      auto_data_save.HisterezaG_open = this.odb_gonu.HisterezaG_open.value;
      auto_data_save.Gon_G1pwm = this.odb_gonu.Grzalka1.value;
      auto_data_save.Gon_G1 = this.odb_gonu.Grzalka1_cb.Status();
      auto_data_save.Gon_G2 = this.odb_gonu.Grzalka2_cb.Status();
      auto_data_save.Gon_G3 = this.odb_gonu.Grzalka3_cb.Status();
      auto_data_save.TBufor80 = this.odb_gonu.Bufor80_st.value;
      auto_data_save.TBufor60 = this.odb_gonu.Bufor60_st.value;
      auto_data_save.TBufor40 = this.odb_gonu.Bufor40_st.value;
      auto_data_save.Bufor = this.odb_gonu.Bufor_cb.Status();

      // pogony
      auto_data_save.TempStopPogonu = this.odb_pogonu.TempStopPogonu.value;

      // chłodzenie:
      auto_data_save.CzasChlodzeniaGlow = this.chlodzenie.CzasChlodzenia.value;
    

      // power set:
      auto_data_save.MocGrzaniaG1 = this.basic_set.st_G1.value;
      auto_data_save.MocGrzaniaG2 = this.basic_set.st_G2.value;
      auto_data_save.MocGrzaniaG3 = this.basic_set.st_G3.value;

      // wifi  atob(encodedStr);
      auto_data_save.WIFI_SSID = this.wifi.SSID.value_txt; 
      auto_data_save.WIFI_PASS = this.wifi.PASS.value_txt;

      // Cloud data:
      //auto_data_save.CloudLogin = this.Cloud.Login.value_txt; 
      //auto_data_save.CloudKey = this.Cloud.Klucz.value_txt;

      // Config Name:
      //auto_data_save.FileName = this.Pliki.FileName; 
    } */

    Show()
    {
         this.visible = true;
         document.body.style.cursor = 'default';

         // auto_data_save = auto_data;
         // copy auto-data to auto-data-save structure
         //Object.keys(auto_data).forEach(key=>auto_data_save[key]=auto_data[key]);
         
         // alarmy zbiornik i głowica:
         this.basic_set.AlarmZbiornik.value = parseFloat(auto_data.TempAlarmuBeczka);
         this.basic_set.AlarmGlowica.value = parseFloat(auto_data.TempAlarmuGlowica);

         // termostat:
         this.termostat.TermostatStart.value = auto_data.TempTermostat_start;
         this.termostat.TermostatStop.value = auto_data.TempTermostat_stop;
                  
         // rozgrzewanie: 
         this.rozgrzewanie.TempKolumna.value = auto_data.TempStopRozgrzewania; 

         // zalewanie:
         //this.zalewanieA.CisnienieZalaniaA.value = auto_data_save.CisnienieZalania_1;;
         //this.zalewanieB.CisnienieZalaniaB.value = auto_data_save.CisnienieZalania_2;
         //this.zalewanieC.CisnienieZalaniaC.value = auto_data_save.CisnienieZalania_3;
         this.zalewanieA.PrzerwaZalaniaA.value = auto_data.PrzerwaZalania_1;
         this.zalewanieB.PrzerwaZalaniaB.value = auto_data.PrzerwaZalania_2;
         this.zalewanieC.PrzerwaZalaniaC.value = auto_data.PrzerwaZalania_3;
         this.zalewanieA.CzasZalaniaA.value = auto_data.CzasZalania_1;
         this.zalewanieB.CzasZalaniaB.value = auto_data.CzasZalania_2;
         this.zalewanieC.CzasZalaniaC.value = auto_data.CzasZalania_3;
         this.basic_set.WZal_st.value = auto_data.WartoscZalania;
       
         // chłodzenie
         this.chlodzenie.CzasChlodzenia.value = auto_data.CzasChlodzeniaGlow;
         
         // Moduł mocy regulowany:
         if(auto_data.PWR_MOD == true)
         {
          this.basic_set.ModulMocyR_cb.On();
         } else
         {
          this.basic_set.ModulMocyR_cb.Off();
         } //--------------------------------


         // Czujnik zalania
         if(auto_data.CzujnikZalania == true)
         {
          this.basic_set.CzujnikZalania_cb.On();
         } else
         {
          this.basic_set.CzujnikZalania_cb.Off();
         } //--------------------------------

         // przedgon:
         this.przedgon.CyklePrzedgonu.value = auto_data.CyklePrzedgonu;
         this.przedgon.CzasO_EZG.value = auto_data.CzasOtwarciaZPrzedgonu;
         this.przedgon.CzasZ_EZG.value = auto_data.CzasZamknieciaZPrzedgonu;
         this.przedgon.Grzalka1.value = auto_data.Przg_G1pwm;
         
         if(auto_data.Przg_G1 == true)
         {
          this.przedgon.Grzalka1_cb.On();
         } else
         {
          this.przedgon.Grzalka1_cb.Off();
         }

         if(auto_data.Przg_G2 == true)
         {
          this.przedgon.Grzalka2_cb.On();
         } else
         {
          this.przedgon.Grzalka2_cb.Off();
         }

         if(auto_data.Przg_G3 == true)
         {
          this.przedgon.Grzalka3_cb.On();
         } else
         {
          this.przedgon.Grzalka3_cb.Off();
         } // ----------------------------
       
         // Płukanie OLM:
         this.plukanie_olm.CzasPlukaniaOLM.value = auto_data.CzasPlukanieOLM;
         
         // stabilizacja:
         this.stabilizacja.CzasStabilizacji.value = auto_data.CzasStabilizacji;
         this.stabilizacja.Grzalka1.value = auto_data.Stb_G1pwm;
        
         if(auto_data.Stb_G1 == true)
         {
          this.stabilizacja.Grzalka1_cb.On();
         } else
         {
          this.stabilizacja.Grzalka1_cb.Off();
         }

         if(auto_data.Stb_G2 == true)
         {
          this.stabilizacja.Grzalka2_cb.On();
         } else
         {
          this.stabilizacja.Grzalka2_cb.Off();
         }

         if(auto_data.Stb_G3 == true)
         {
          this.stabilizacja.Grzalka3_cb.On();
         } else
         {
          this.stabilizacja.Grzalka3_cb.Off();
         } // --------------------------------
                
         // stab.przedgonu:
         this.przedgon_stb.CzasStabilizacji.value = auto_data.CzasStabilizacjiPrzedgonu;
         
         // POGON:
         this.odb_pogonu.TempStopPogonu.value = auto_data.TempStopPogonu;
         
         // GON:
         this.odb_gonu.CzasZakonczeniaZKROK.value =  auto_data.CzasZakonczeniaGon;
         this.odb_gonu.HisterezaG_close.value = auto_data.HisterezaG_close;
         this.odb_gonu.HisterezaG_open.value = auto_data.HisterezaG_open;
         this.odb_gonu.Grzalka1.value = auto_data.Gon_G1pwm;
         this.odb_gonu.Bufor80_st.value = auto_data.TBufor80;
         this.odb_gonu.Bufor60_st.value = auto_data.TBufor60;
         this.odb_gonu.Bufor40_st.value = auto_data.TBufor40;

         if(auto_data.Bufor == true)
         {
          this.odb_gonu.Bufor_cb.On();
         } else
         {
          this.odb_gonu.Bufor_cb.Off();
         }
        
         if(auto_data.Gon_G1 == true)
         {
          this.odb_gonu.Grzalka1_cb.On();
         } else
         {
          this.odb_gonu.Grzalka1_cb.Off();
         }

         if(auto_data.Gon_G2 == true)
         {
          this.odb_gonu.Grzalka2_cb.On();
         } else
         {
          this.odb_gonu.Grzalka2_cb.Off();
         }

         if(auto_data.Gon_G3 == true)
         {
          this.odb_gonu.Grzalka3_cb.On();
         } else
         {
          this.odb_gonu.Grzalka3_cb.Off();
         } //-----------------------------
         
         // POWER: G1 G2 G3
         this.basic_set.st_G1.value = auto_data.MocGrzaniaG1;
         this.basic_set.st_G2.value = auto_data.MocGrzaniaG2;
         this.basic_set.st_G3.value = auto_data.MocGrzaniaG3;

         // wifi  atob(encodedStr);
         this.wifi.SSID.value_txt = window.atob(auto_data.WIFI_SSID);
         this.wifi.PASS.value_txt = window.atob(auto_data.WIFI_PASS);

         //configuration name
         //this.Pliki.FileName = auto_data_save.FileName;

         // cloud data:
         //this.Cloud.Login.value_txt = auto_data_save.CloudLogin;
         //this.Cloud.Klucz.value_txt = auto_data_save.CloudKey;

         //this.Cloud.Login.value_txt = 
         //Buffer.from(auto_data_save.CloudLogin, 'base64').toString();
    
    }

    Hide(){this.visible = false;}

    OnMouseMove(x:number,y:number)
    {
        if(this.visible == false) return;

        if(this.BtOK.hoover(x,y))  
        {
            document.body.style.cursor = 'pointer';
            return;
        }else
        {
            document.body.style.cursor = 'default';
        }

        this.rozgrzewanie.OnMouseMove(x,y);
        this.zalewanieA.OnMouseMove(x,y);
        this.zalewanieB.OnMouseMove(x,y);
        this.zalewanieC.OnMouseMove(x,y);
        this.stabilizacja.OnMouseMove(x,y);
        this.przedgon.OnMouseMove(x,y);
        this.przedgon_stb.OnMouseMove(x,y);
        this.plukanie_olm.OnMouseMove(x,y);
        this.odb_gonu.OnMouseMove(x,y);
        this.odb_pogonu.OnMouseMove(x,y);
        this.chlodzenie.OnMouseMove(x,y);
        this.wifi.OnMouseMove(x,y);
        this.mupdate.OnMouseMove(x,y);
        this.basic_set.OnMouseMove(x,y);
        this.termostat.OnMouseMove(x,y);
        this.menu.OnMouseMove(x,y);
        //this.Cloud.OnMouseMove(x,y);
        this.Pliki.OnMouseMove(x,y);
    }

    OnClick(x:number,y:number)
    {
        if(this.visible == false) return "";

        this.rozgrzewanie.Onclick(x,y);
        this.zalewanieA.Onclick(x,y);
        this.zalewanieB.Onclick(x,y);
        this.zalewanieC.Onclick(x,y);
        this.stabilizacja.Onclick(x,y);
        this.przedgon.Onclick(x,y);
        this.przedgon_stb.Onclick(x,y);
        this.plukanie_olm.Onclick(x,y);
        this.odb_gonu.Onclick(x,y);
        this.odb_pogonu.Onclick(x,y);
        this.chlodzenie.Onclick(x,y);
        // this.wifi.Onclick(x,y);
        this.basic_set.Onclick(x,y);
        this.termostat.Onclick(x,y);
        //this.Cloud.Onclick(x,y);
        
        if(this.Pliki.Onclick(x,y) == "save_options")
        {
          //this.update_options();
          return "save_options";
        } 

        if(this.wifi.Onclick(x,y) == "save_options")
        {
          //this.update_options();
          return "save_options";
        } 


              
       switch(this.menu.OnClick(x,y))
       {
          case "basic_set": 
          {
            this.basic_set.Show();
            UpdateCanvas(false);
            this.current_option = 1;
            return "";
          }
          break;

          case "termostat": 
          {
            this.termostat.Show();
            UpdateCanvas(false);
            this.current_option = 2;
            return "";
          }
          break;

          case "rozgrzewanie": 
          {
            this.rozgrzewanie.Show();
            UpdateCanvas(false);
            this.current_option = 3;
            return "";
          }
          break;

          case "zalewanieA": 
          {
            this.zalewanieA.Show();
            UpdateCanvas(false);
            this.current_option = 4;
            return "";
          }
          break;

          case "zalewanieB": 
          {
            this.zalewanieB.Show();
            UpdateCanvas(false);
            this.current_option = 5;
            return "";
          }
          break;

          case "zalewanieC": 
          {
            this.zalewanieC.Show();
            UpdateCanvas(false);
            this.current_option = 6;
            return "";
          }
          break;

          case "stabilizacja": 
          {
            this.stabilizacja.Show();
            UpdateCanvas(false);
            this.current_option = 7;
            return "";
          }
          break;

          case "przedgon": 
          {
            this.przedgon.Show();
            UpdateCanvas(false);
            this.current_option = 8;
            return "";
          }
          break;

          case "stb.przedgon": 
          {
            this.przedgon_stb.Show();
            UpdateCanvas(false);
            this.current_option = 9;
            return "";
          }
          break;

          case "polm": 
          {
            this.plukanie_olm.Show();
            UpdateCanvas(false);
            this.current_option = 10;
            return "";
          }
          break;

          case "gon": 
          {
            this.odb_gonu.Show();
            UpdateCanvas(false);
            this.current_option = 11;
            return "";
          }
          break;

          case "pogon": 
          {
            this.odb_pogonu.Show();
            UpdateCanvas(false);
            this.current_option = 12;
            return "";
          }
          break;

          case "chlodz": 
          {
            this.chlodzenie.Show();
            UpdateCanvas(false);
            this.current_option = 13;
            return "";
          }
          break;

          case "wifi": 
          {
            this.wifi.Show();
            UpdateCanvas(false);
            this.current_option = 14;
            SendCommand("#wifiscan#");
            return "";
          }
          break;

          case "save": 
          {
            this.mupdate.Show();
            UpdateCanvas(false);
            this.current_option = 15;
            return "";
          }
          break;

          /* case "cloud": 
          {
            this.Cloud.Show();
            UpdateCanvas(false);
            this.current_option = 16;
            return "";
          }
          break; */

          case "pliki": 
          {
            this.Pliki.Show();
            UpdateCanvas(false);
            this.current_option = 17;
            return "get_file_list";
          }
          break;

          case "home": 
          {
              SendCommand("#elegohome#");
            return "";
          }
          break;

         
        }

       

        if(this.mupdate.Onclick(x,y) == "update")
        {
         return "update";
        }

        if(this.BtOK.clicked(x,y))
        {
          play_button();
		      DrawCircle(x,y,3,8,'#FFF200','red');

          switch(this.current_option)
          {
              case 0: 
              {
                return "OK";
              }
              break;

              case 1: 
              {
                this.basic_set.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                //this.draw();
                this.current_option = 0;
              }
              break;

              case 2: 
              {
                this.termostat.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 3: 
              {
                this.rozgrzewanie.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 4: 
              {
                this.zalewanieA.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 5: 
              {
                this.zalewanieB.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 6: 
              {
                this.zalewanieC.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 7: 
              {
                this.stabilizacja.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 8: 
              {
                this.przedgon.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 9: 
              {
                this.przedgon_stb.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 10: 
              {
                this.plukanie_olm.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 11: 
              {
                this.odb_gonu.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 12: 
              {
                this.odb_pogonu.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 13: 
              {
                this.chlodzenie.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 14: 
              {
                this.wifi.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              case 15: 
              {
                this.mupdate.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

              /* case 16: 
              {
                this.Cloud.Hide();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break; */

              case 17: 
              {
                this.Pliki.Hide();
                //this.Pliki.FileName = auto_data_save.FileName;
                this.Show();
                this.menu.Show();
                UpdateCanvas(false);
                this.current_option = 0;
              }
              break;

            }  

          return "";
        }

    return "";  
    }

    drawBackground()
    {
      ctx.shadowColor = "black";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      DrawRoundedBox(ctx,5,5,deviceWidth - 10,deviceHeight - 5, 20,'#0049BF');
      DrawRoundedBox(ctx,8,8,deviceWidth - 17,deviceHeight - 12, 20,'#00183F');
      ctx.textBaseline = 'top'  
      ctx.shadowBlur = 0;
    }

    draw()
    { 
      if(this.visible == false) return;

      this.drawBackground();

      this.menu.draw();
      this.basic_set.draw();
      this.termostat.draw();
      this.rozgrzewanie.draw();
      this.zalewanieA.draw();
      this.zalewanieB.draw();
      this.zalewanieC.draw();
      this.stabilizacja.draw();
      this.przedgon.draw();
      this.przedgon_stb.draw();
      this.plukanie_olm.draw();
      this.odb_gonu.draw();
      this.odb_pogonu.draw();
      this.wifi.draw();
      this.mupdate.draw();
      this.chlodzenie.draw();
      //this.Cloud.draw();
      this.Pliki.draw();
         
      this.BtOK.draw();
      this.MsgBoxTout.draw();
              
    }

    update()
    {
        // LANDSCAPE
        if(ScreenSize == "extralarge" && ScreenOrientation == "landscape")
        {
            this.font_size = 30;
            this.btRadius = 40;
        }
        if(ScreenSize == "large" && ScreenOrientation == "landscape")
        {
            this.font_size = 30;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "landscape")
        {
            this.font_size = 19;
            this.btRadius = 30;
        }
        if(ScreenSize == "small" && ScreenOrientation == "landscape")
        {
            this.font_size = 16;
            this.btRadius = 20;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "landscape")
        {
            this.font_size = 15;
            this.btRadius = 20;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "landscape")
        {
            this.font_size = 15;
            this.btRadius = 20;
        }
        if(ScreenSize == "extral_w_slim" && ScreenOrientation == "landscape")
        {
          this.font_size = 20;
          this.btRadius = 20;
        }
       

        // PORTRAIT
        if(ScreenSize == "extralarge" && ScreenOrientation == "unknown")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "large" && ScreenOrientation == "unknown")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "portrait")
        {
            this.font_size = 20;
            this.btRadius = 25;
        }
        if(ScreenSize == "small" && ScreenOrientation == "portrait")
        {
            this.font_size = 17;
            this.btRadius = 22;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "portrait")
        {
            this.font_size = 15;
            this.btRadius = 19;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "portrait")
        {
            this.font_size = 15;
            this.btRadius = 19;
        }
     
        // IPAD
        if(ScreenSize == "extralarge" && ScreenOrientation == "ipad")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "large" && ScreenOrientation == "ipad")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "ipad")
        {
            this.font_size = 25;
            this.btRadius = 30;
        }
        if(ScreenSize == "small" && ScreenOrientation == "ipad")
        {
            this.font_size = 20;
            this.btRadius = 27;
        }
        if(ScreenSize == "extrasmall" && ScreenOrientation == "ipad")
        {
            this.font_size = 13;
            this.btRadius = 17;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "ipad")
        {
            this.font_size = 12;
            this.btRadius = 16;
        }

        // UNKNOWN
        if(ScreenSize == "extralarge" && ScreenOrientation == "unknown")
        {
            this.font_size = 22;
            this.btRadius = 30;
        }
        if(ScreenSize == "large" && ScreenOrientation == "unknown")
        {
            this.font_size = 20;
            this.btRadius = 30;
        }
        if(ScreenSize == "medium" && ScreenOrientation == "unknown")
        {
            this.font_size = 20;
            this.btRadius = 30;
        }
        if(ScreenSize == "small" && ScreenOrientation == "unknown")
        {
            this.font_size = 17;
            this.btRadius = 20;
        }  
        if(ScreenSize == "extrasmall" && ScreenOrientation == "unknown")
        {
            this.font_size = 15;
            this.btRadius = 18;
        }
        if(ScreenSize == "sextrasmall" && ScreenOrientation == "unknown")
        {
           this.font_size = 12;
           this.btRadius = 17;
        }
                   
        this.rozgrzewanie.update();
        this.zalewanieA.update();
        this.zalewanieB.update();
        this.zalewanieC.update();
        this.stabilizacja.update();
        this.przedgon.update();
        this.przedgon_stb.update();
        this.odb_gonu.update();
        this.odb_pogonu.update();
        this.chlodzenie.update();
        this.wifi.update();
        this.mupdate.update();
        this.basic_set.update();
        this.termostat.update();
        this.menu.update();
        //this.Cloud.update();
        this.Pliki.update();

        this.BtOK.update(deviceWidth - this.btRadius*1.8,deviceHeight -  this.btRadius*1.8);
             
    }
   
    
 }
