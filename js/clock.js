function showTime(showSeconds = true) {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var delay = 30000;
  
  if(h == 0){
      h = 0;
  }
  
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m;
  if (showSeconds) {
    time += ":" + s
    delay = 1000;
  }
  document.querySelectorAll("#DigitalCLOCK").forEach((clock) => clock.innerText = time);
  
  setTimeout(showTime, delay, showSeconds);
}