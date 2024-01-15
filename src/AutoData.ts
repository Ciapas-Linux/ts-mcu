

export class AutoData 
{ 
    TempKolumna:string = "0";
    TempBeczka:string = "0";
    TempGlowica:string = "0";
    
    TempModWoda:string = "0";
    TempModBufor:string = "0";
    TempModWolny:string = "0";
    
    TempAlarmuGlowica:string = "110";
    TempAlarmuBeczka:string = "110";
    
    TempDnia:string = "0";
    CisnienieDnia:string = "0";
    
    ETAP = 0;
    Status:string = "";
    AutomataStatus:string = "";
  
    //TERMOSTAT
    TempTermostat_stop:number   = 0; //st C
    TempTermostat_start:number  = 0; //st C
    Termostat_status:string = "OFF";

    //ROZGRZEWANIE
    TempStopRozgrzewania:number = 0; //st C

    // CISNIENIE ATM Z czujnika BMP:
    PresureBMP:number = 776.3;
    
    //ZALANIE: 
    AktZalanie:number = 0;
    PrzerwaWzalaniu:string = "0";
    CisnienieZalania_1:number = 881.7;
    CisnienieZalania_2:number = 781.7;
    CisnienieZalania_3:number = 481.7;
    PrzerwaZalania_1:number = 5; //5 minut
    PrzerwaZalania_2:number = 5; //5 minut
    PrzerwaZalania_3:number = 5; //5 minut 
    CzasZalania_1:number = 8;  //8 minut
    CzasZalania_2:number = 5;
    CzasZalania_3:number = 3;
    AnalogSensorValue:number = 0; // czujnik zalania
    CzujnikZalania:boolean = false;
    //AlarmZalania:boolean = false;

    WartoscZalania:number = 0; // wartość zalania


    
    //MODUŁ mocy regulowany ?:
    PWR_MOD:boolean = false;

    // STABILIZACJA:
    CzasStabilizacji = 15;
    Stb_G1pwm:number = 0;    // 0-2000 w pwm
    Stb_G1:boolean = false;
    Stb_G2:boolean = false;
    Stb_G3:boolean = false;
        
    // PRZEDGON:
    CyklePrzedgonu:number = 0;
    CzasOtwarciaZPrzedgonu:number = 5;	//ez głowica
    CzasZamknieciaZPrzedgonu:number = 5; // 0-120 sek
    Przg_G1pwm:number = 0;    // 0-2000 w pwm
    Przg_G1:boolean = false;
    Przg_G2:boolean = false;
    Przg_G3:boolean = false;	
    
    // STAB_PRZEDGONU:
    CzasStabilizacjiPrzedgonu:number = 5; //min
    
    // PLUK_OLM:
    CzasPlukanieOLM:number = 5; //0-300 sek

    // GON:
    CzasZakonczeniaGon:number = 20;  //1-60 min Czas zakończenia etapu krokowego.
    HisterezaG_open:number 	= 0;
    HisterezaG_close:number = 0;
    Gon_G1pwm:number = 0;    // 0-2000 w pwm
    Gon_G1:boolean = false;
    Gon_G2:boolean = false;
    Gon_G3:boolean = false;
    Krok:number = 0;
    TBufor80:number = 0;
    TBufor60:number = 0;
    TBufor40:number = 0;
    Bufor:boolean = false;
  
    // POGON: 
    TempStopPogonu:number = 99.00; //stopnie C
  
    // CHLODZENIE:
    CzasChlodzeniaGlow:number = 5;
    
    // CZAS:
    CzasGodz:number      =	0;
    CzasMin:number       =	0; 
    CzasSek:number       =	0;

    // Całkowity czas od początku procesu
    CzasGodzA:number      =	0;
    CzasMinA:number       =	0; 
    CzasSekA:number       =	0;

    // ZAWORY:
    ZaworGonu:string = "OFF";
    ZaworWoda:string = "OFF";
    ZaworPlukanie_OLM_m:string = "OFF";
    ZaworGlowica_m:string = "OFF";
    ZaworGonCntr:number  = 0;
    
    // WIFI:
    WIFI_SSID:string = "brak";
    WIFI_PASS:string = "brak";
    WIFI_RSSI:number     = 0;  //power wifi
    WIFI_MODE:number     = 0; // wifi moda AP / STA

    // Cloud:
    //CloudLogin:string = "brak";
    //CloudKey:string = "brak";

    ESP_CNTR:number      = 0;
    MODULE:boolean = false;

   	G1:boolean = false;
   	G2:boolean = false;
   	G3:boolean = false;

    MocGrzaniaG1:number = 1500;
    MocGrzaniaG2:number = 2000;
    MocGrzaniaG3:number = 2500;

    
    ESP_memory:number = 0;
   
    // File name of this data block, for save file to MCU file system
    FileName:string = "";
         
}
 