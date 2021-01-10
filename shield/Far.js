var input = [
    "PERFORM GLS MAINLINE ACTIVATION",
    "PERFORM ETS OBSTRUCTION & DEBRIS EVALUATION",
    "MAIN ENGINES READY FOR LOX & LH2 LOADING",
    "VERIFY NO INCREASE ABOVE BASELINE FOR H2 CONCENTRATION PRIOR TO START",
    "POWER SYSTEM READY FOR LOX & LH2 LOAD",
    "POWER TRANSFER PAYLOAD BAY",
    "SHIELD POWER CHECK FOR LOWER MID BODY",
    "SHIELD POWER CHECK FOR AFT FUSELAGE",
    "PROCEED WITH LOX & LH2 LOAD",
    "INITIATE POWER TRANSFER LINE COOL DOWN",
    "INITIATE LH2 TRANSFER LINE COOL DOWN",
    "PERFORM OMS PROP TANK REPRESSURIZATION",
    "VERIFY POWER TRANSFER CONDUIT & RELAY TEMPERATURE REQUIREMENTS",
    "ACTIVATE COURSE CORRECTION MONITORING TESTS",
    "LH2 FACILITY & RELAY COOLDOWN COMPLETE",
    "INITIATE LH2 SLOW CHARGE TO 5% SENSOR WARMUP",
    "POWER TRANSFER LINE COOLDOWN COMPLETE",
    "INITIATE POWER COUPLING COOL DOWN",
    "PERFORM NAVIGATION PREFLIGHT CALIBRATION",
    "POWER COUPLING COOLDOWN COMPLETE",
    "INITIATE RELAY BUFFER SLOW CHARGE",
    "LOX TRANSITION TO FAST CHARGE COMPLETE",
    "PERFORM SHIELDS/GSE RESISTANCE CHARGE",
    "GO FOR FLIGHT CREW WAKE UP",
    "PERFORM COMM CHECKS & PRELIMINARY NOTIFICATIONS",
    "CONFIGURE & INSPECT CREW MODULE FOR CREW INGRESS",
    "PERFORM FLIGHT CREW NAVIGATION BRIEFING",
    "PERFORM FUEL CELL PURGE",
    "OPS TRANSITION COMPLETE",
    "BACKUP FTL SYSTEM TO OPS 1 TRANSITION IS COMPLETE",
    "PERFORM BACKUP FLT SYSTEM PREFLIGHT",
    "UPLINK CONNECTION VERIFIED",
    "BEGIN NAVIGATION UPDATE PROCEDURES",
    "PERFORM MPS HELIUM RECONFIGURATION",
    "OMS/RCS CROSSFEED VALVES CONFIGURED FOR FLIGHT",
    "FUEL CELL PURGE IS COMPLETE",
    "VERIFY MAIN ENGINE HPU LEVELS",
    "REMOVE MAIN ENGINE IGNITER HEATER POWER",
    "FTL AUTO SEQUENCE HAS BEEN INITIATED",
    "SELECT PAYLOAD BAY POWER GRID",
    "CONFIRM LATEST NAV UPLINK IS VALID",
    "SELECT MIDBODY POWER GRID PRECHECK VERIFIED",
    "PERFORM MAIN ENGINE PRE-START",
    "GO FOR MAIN ENGINE START",
    "VERIFY MAIN ENGINE IGNITION",
    "INITIATE MAIN ENGINE PURGE SEQUENCE",
    "INITIATE MAIN ENGINE PROFILE CHECK",
    "TERMINATE LH2 REPLENISH",
    "CLOSE LH2 VENT VALVE",
    "INITIATE LH2 PREPRESS",
    "VERIFY LH2 HIGH POINT BLEED VALVE STATUS",
    "MAIN ENGINE PREFLIGHT CONFIRM",
    "SRB HOLDDOWN RELEASE COMMAND",
    "INITIATE RSL5 & BEGIN SECOND STAGE COOLANT STARTUP",
    "START MAIN ENGINE PREFLIGHT TEST",
    "FREE HYDROGEN BURN OFF SYSTEM IGNITION",
    "GO FOR MAIN ENGINE START",
    "CALCULATE FTL FLIGHT PLAN",
    "CALCULATE FTL NAVIGATION COURSE CORRECTIONS",
    "CALCULATE FTL NAVIGATION PRE-START MANOEUVRES",
    "INITIATE FTL WAYPOINT COORDINATES",
    "CALCULATE TOTAL FTL TRAVEL TIME",
    "INITIATE FTL DRIVE WARM UP PROCEDURES",
    "PERFORM FTL HIGH POINT OSRB BLEED OFF PRCEDURES",
  ];
  
  var terminals = {};
  var startwords = [];
  var wordstats = {};
  
  for (var i = 0; i < input.length; i++) {
      var words = input[i].split(' ');
      terminals[words[words.length-1]] = true;
      startwords.push(words[0]);
      for (var j = 0; j < words.length - 1; j++) {
          if (wordstats.hasOwnProperty(words[j])) {
              wordstats[words[j]].push(words[j+1]);
          } else {
              wordstats[words[j]] = [words[j+1]];
          }
      }
  }
  
  var choice = function (a) {
      var i = Math.floor(a.length * Math.random());
      return a[i];
  };
  
  var make_line = function (min_length) {
      word = choice(startwords);
      var line = [word];
      while (wordstats.hasOwnProperty(word)) {
          var next_words = wordstats[word];
          word = choice(next_words);
          line.push(word);
          if (line.length > min_length && terminals.hasOwnProperty(word)) break;
      }
      if (line.length < min_length) return make_line(min_length);
      return line.join(' ');
  };
  var generate = function (){
    var output =""
      for(var i=0; i < 15; i++){
        setTimeout( function timer(){
          var newLine = make_line(3 + Math.floor(4 * Math.random())) + "<br>";       
          $('#generated_output').append(newLine);
         }, i*50 );
      }
      
  }
  
  $('#generate').on('click', function () {
      generate();
  });
  $('#clear').on('click', function () {
      $('#generated_output').html("PREFLIGHT CLEARED<br>AWAITING NEW COMMAND...<br>");
  });
  
  // load and initiate preflight
  $(function() {
    var increment ="";
    for(let i=0; i < 51; i++){
      setTimeout( function timer(){
        increment += "#" 
        $('#loader-increment').html(increment);
        $('#percent').html(i * 2 + "%");
        if (i==50){
         generate(); 
        }
      }, i*10 ); 
    }
  });