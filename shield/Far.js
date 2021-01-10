var input = [
    "تفعيل الوحش النائم",
    "حماية سكولر الاصدار  السادس",
    "تسطيب الحماية على الايبي ",
    "التحقق من الاتصال",
    "التحقق من السيريال ",
    "تم تفعيل الوحش النائم",
    "درع الحمايه قيد التجهيز",
    "درع الحمايه قيد البرمجه",
    "تحميل حزمة لوكس , هوكس",
    "تحديد مكان الجهاز",
    "تشغيل المساعد الفورس اتش تو ",
    "تشغيل متصدي الاختراق",
    "تحميل المتطلبات",
    "حماية الايميلات من الاختراق",
    "حماية الواتس من الفيروسات",
    "تشغيل الحماية ",
    "تشغيل الحمايه الجديده",
    "تم تثبيت الحمايه ",
    "تشغيل حماية كوربن ",
    "تم تشغيل تصدي الاختراق الاصدار ثلاثه",
    "تم تشغيل الحمايه الحقيقه",
    "تم تغير الايبي لجهاز ايفون اكس ",
    "تم حماية الباخصه من الهجمات ",
    "تم تركيب الوحش النائم",
    "تم تشيكك جهاز ايفون اكس ",
    "تم تركيب الحمايه على جميع الاجهزه",
    "تم تشغيل منع التعقب",
    "جاري فحص الجهاز",
    "تم الفحص بنجاح وجاري تركيب المضاد",
    "تم نسخ جميع ملفات النظام",
    "تم حماية ملفات النظام",
    "تم حماية الملفات الأخرى",
    "جاري تحديث ملفات الكاش",
    "تم حذف ملفات الكاش ",
    "جاري تركيب المضادات",
    "جاري الحماية من السرقه",
    "التحقق من الجهاز قبل التركيب",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "تم التحقق",
    "الرجاء التواصل مع المبرمج سكولر",
    "الرجاء تنظيف الجهاز ",
    "من فضلك ( الباخصه ) تنظيف الجهاز ",
    "حسب اجهزة الباخصه",
    "تم تركيب جميع الحمايات  لـ الباخصه",
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