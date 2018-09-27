function toggleLinks(event) {
  let usefullLinkList = document.querySelector('.wrapper-usefullLink');

  usefullLinkList.classList.toggle('hide');
};

let btnToggleLinks = document.querySelector('.btn-usefullLink');

btnToggleLinks.addEventListener('click', toggleLinks);

function changeBackground (event) {

  event.target.classList.toggle('day');
  event.target.classList.toggle('night');

  document.body.classList.toggle('day');
  document.body.classList.toggle('night');

  document.querySelector('.today').classList.toggle('day');
  document.querySelector('.today').classList.toggle('night');
}

let btnChangeBackground = document.querySelector('.btn-change-background');

btnChangeBackground.addEventListener('click', changeBackground);

let buttonPreventF5 = document.querySelector('.buttonPreventF5');

function changeBtnPreventF5 (event) {
  buttonPreventF5.classList.toggle('preventF5button');
  if (buttonPreventF5.classList.contains('preventF5button')) {
      buttonPreventF5.innerHTML = '<b>Режим "без обновления" включен</b>'; 
      buttonPreventF5.style.backgroundColor = 'red';
} else {
  buttonPreventF5.innerHTML = 'buttonPreventF5';
  buttonPreventF5.style.backgroundColor = '#ddd';
}
}

buttonPreventF5.addEventListener('click', changeBtnPreventF5);

function preventF5Refresh (event) {
  if (event.code === "F5" && buttonPreventF5.classList.contains('preventF5button')) {
    event.preventDefault();
    buttonPreventF5.style.fontSize = "1.25rem";
    setTimeout(()=>{ buttonPreventF5.style.fontSize = ""}, 1000);
    return;
  }
  if (event.code === "F5") {
    if (!confirm('Хочешь обновить? Уверен?')) event.preventDefault();
  }
  } 

document.addEventListener('keydown', preventF5Refresh);



function createCalendar(src, year, month) {
  if (document.querySelectorAll('table').length > 2) return;
  src.innerHTML = "";

  let table = document.createElement('table');
  table.className = 'cal-table';
  let rowCaption = document.createElement('tr');
  table.appendChild(rowCaption);
  for (let i = 0; i < 7; ++i) {
    let th = document.createElement('th');
    rowCaption.appendChild(th);
    // let day = new Date(2018, 4, 25 + i);
    let day = new Date(2018, 8, 10 + i);
    let dayCal = day.toLocaleString('ru', { weekday: 'short' });
    th.innerHTML = dayCal;

    rowCaption.appendChild(th);
    src.appendChild(table);

  }

  let date = new Date(year, month, 1);
  var firstDay = date.getDay();


  if (firstDay - 1) {
    var zeroRowFirstDate = document.createElement('tr');
    table.appendChild(zeroRowFirstDate);
    if (!firstDay) firstDay = 7;
    for (let i = 1; i < firstDay; ++i) {
      var zeroFirstDate = document.createElement('td');
      zeroFirstDate.innerHTML = '-';
      zeroRowFirstDate.appendChild(zeroFirstDate);
    }

  }


  if (zeroRowFirstDate) {
    for (var i = 1; i <= 8 - firstDay; ++i) {
      let noZeroFirstDate = document.createElement('td');

      noZeroFirstDate.innerHTML = i;
      zeroRowFirstDate.appendChild(noZeroFirstDate)
    }
  }
  var quantityDayInMonth = new Date(year, month + 1, 0).getDate();
  if (firstDay > 1) {
    var quantityOfWeeks = Math.ceil((quantityDayInMonth - (8 - firstDay)) / 7); //  var quantityOfWeeks = Math.ceil((quantityDayInMonth - firstDay) / 7);
  } else quantityOfWeeks = Math.ceil(quantityDayInMonth / 7)


  if (!i) {
    var i = 1;
    firstDay = 8;
  } /*else --i;*/

  for (var y = 1; y <= quantityOfWeeks; ++y) {
    var fullRow = document.createElement('tr');

    var nextDayOfSunday = quantityDayInMonth - 7 * (quantityOfWeeks - 1 - y) - (quantityDayInMonth - (8 - firstDay) - (quantityOfWeeks - 1) * 7);

    // var nextDayOfSunday = quantityDayInMonth - 7*(quantityOfWeeks - 1 - y) - (quantityDayInMonth - firstDay - (quantityOfWeeks - 1) * 7 );
    for (i; i <= nextDayOfSunday; ++i) {
      let fullRowDays = document.createElement('td');

      if (i <= quantityDayInMonth) fullRowDays.innerHTML = i;
      else fullRowDays.innerHTML = '-';
      fullRow.appendChild(fullRowDays)
    }
    table.appendChild(fullRow);
  }

}


let cal = document.getElementsByClassName('cal')[0];
try {
  createCalendar(cal, 2018, new Date().getMonth());
} catch (e) {
  console.log(`${e.message} 
    ${e.stack}`)  
}

let calendar = document.querySelectorAll('table td');
for (let i = 0; i < calendar.length; ++i) {
  if (calendar[i].innerHTML == new Date().getDate()) {
    // calendar[i].innerHTML = '<b>' + calendar[i].innerHTML + '</b>';
    calendar[i].style.border = '1px solid black';
    calendar[i].className = 'today night';
    break;
  }
}

function showDateToday () {
  let now = new Date();
   document.querySelector('.dateToday').innerHTML = now.toLocaleString('ru', {'month': 'long', 'day': 'numeric', 'weekday': 'long'} );

}
showDateToday();

let currentTimeOnScreen = document.querySelector('.currentTimeOnScreen');

function showTimeNow () {
  let now = new Date();
  let hours = now.getHours();
  let minuts = now.getMinutes();
  if (minuts < 10) minuts = '0' + minuts;
  let seconds = now.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  let time = hours + ':' + minuts + ':' + seconds;

  currentTimeOnScreen.innerHTML = time;
}

setTimeout( function restart () {showTimeNow(), setTimeout(restart, 1000)}, 0);

function startTimer (event) {
  let inputThroughHowMuchTime = document.querySelector('.input-through-how-much-time');

  function getReactionTime () {
    let inputThroughHowMuchTime = document.querySelector('.input-through-how-much-time');
    const time = new Date();
    time.setMinutes(+inputThroughHowMuchTime.value + new Date().getMinutes());
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return `${hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
  }

  function changeTitle (time) {
    let title = document.querySelector('title');
    if (time) {
      title.innerHTML = `Таймер на ${time}`;
    } else title.innerHTML = `Таймер не активен`;
  }

  function changeFavicon (fav) {
    let favicon = document.querySelector('[type="image/ico"]');
    favicon.href = fav;
  }

  function showReactionTime (time) {
    let containerReactionTime = document.querySelector('.container-reaction-time');
    let spanReactionTime = document.querySelector('.reaction-time');
    containerReactionTime.classList.add('visible');
    spanReactionTime.innerHTML = time;
  }

  function hideReactionTime () {
    let containerReactionTime = document.querySelector('.container-reaction-time');
    containerReactionTime.classList.remove('visible');
  }

  function reactAfterHowMuchTime () {
    const inputThroughHowMuchTime = document.querySelector('.input-through-how-much-time');
    const timeThroughTimerReact = inputThroughHowMuchTime.value;
    const timeStartedTimer = new Date();

    return function calcStudyTime (e) {
      const inputStudyOrNot = document.getElementById('input-account-as-study');
      if (!inputStudyOrNot.hasAttribute('checked')) return;
      const studyHours = document.querySelector('.study-hours');
      const studyMinutes = document.querySelector('.study-minutes');
      if (typeof e === 'undefined') {
        studyHours.innerHTML =  ((+studyHours.innerHTML + (+timeThroughTimerReact)) / 60).toFixed(2);
        studyMinutes.innerHTML = (+studyMinutes.innerHTML + (+timeThroughTimerReact)).toFixed(1);
      } else if (e.type === 'click') {
        studyHours.innerHTML = (+studyHours.innerHTML + (new Date() - timeStartedTimer) / 1000 / 60 / 60).toFixed(2);
        studyMinutes.innerHTML = (+studyMinutes.innerHTML + (new Date() - timeStartedTimer) / 1000 / 60 ).toFixed(1);
      }
    }
  }
  const calcStudyTime = reactAfterHowMuchTime();
  
/*
  function showGetAttention () {
    // !!!!! loot at this
    // need carefully including in the Promise
    let inputThroughHowMuchTime = document.querySelector('.input-through-how-much-time');
    if (inputThroughHowMuchTime.value < 10) {
      changeFavicon('favicon-yellow.ico');
    } else {
      let timerGetAttention = setTimeout(changeFavicon('favicon-yellow.ico'), (inputThroughHowMuchTime.value-10)*1000);
      return timerGetAttention
    }
  }
*/
  function createAudio () {
    let audio = document.createElement('audio');
    audio.src = 'Alibi.mp3';
    audio.controls = true;
    audio.autoplay = true;
    audio.volume = 0.7;
    const btnNavigation = document.querySelector('.btn-navigation');
    btnNavigation.appendChild(audio);
    // audio.play();
  }

  function deleteAudio () {
    let audio = document.getElementsByTagName('audio')[0];
    if (audio) {
      audio.parentElement.removeChild(audio);
    }
  } 

  function overallProcess () {
    return new Promise ((resolve, reject)=>{
      changeTitle(getReactionTime());
      showReactionTime(getReactionTime());
      const inputThroughHowMuchTime = document.querySelector('.input-through-how-much-time');
      if (inputThroughHowMuchTime.value < 10) {
        changeFavicon('favicon-yellow.ico');
        resolve(inputThroughHowMuchTime.value)
      } else {
        let timerGetAttention = setTimeout(()=> {changeFavicon('favicon-yellow.ico'); resolve(10)}, (inputThroughHowMuchTime.value-10)*1000*60);
        document.getElementsByClassName('container-reaction-time')[0].onclick = function (event) {
          clearTimeout(timerGetAttention);
          changeFavicon('favicon.ico');
          changeTitle();
          hideReactionTime();
          calcStudyTime(event);
          reject('REJECT timerGetAttention');
        }
      }
    })
  }

  overallProcess()
    .then (result=>{
      return new Promise((resolve, reject)=> {

      const timerReacting = setTimeout(()=>{
        createAudio();
        changeFavicon('favicon-red.ico');
        // changeTitle();
        // hideReactionTime();
        calcStudyTime();
        resolve('DONE');
      }, result * 1000 * 60);

      document.getElementsByClassName('container-reaction-time')[0].onclick = function (event) {
        clearTimeout(timerReacting);
        changeFavicon('favicon.ico');
        changeTitle();
        hideReactionTime();
        calcStudyTime(event);
        reject('REJECT timerReacting')
      };
        })
    }
    // ,
    // error=>{
    //   console.log(error);
    //   console.log(new Error());
    //   return false;
    // }
    )
    .then ( result => {
      const timerClosing = setTimeout(()=>{
        deleteAudio();
        const timerOff = confirm(`Таймер сработал в ${document.querySelector('.reaction-time').innerHTML}`);
        if (timerOff) {
          changeTitle();
          hideReactionTime();
          changeFavicon('favicon.ico');
        }
        
      }, 1000 * 30);
      document.getElementsByClassName('container-reaction-time')[0].onclick = function (event) {
        clearTimeout(timerClosing)
        deleteAudio();
        changeTitle();
        hideReactionTime();
        changeFavicon('favicon.ico');
      };
    }
    // ,
    // error => {
    //   console.log(error);
    // }

    )
    .catch(error => {
      console.log(error); // Error: Not Found
    });
}

document.getElementsByClassName('btn-timer')[0].onclick = function () {startTimer();
  return false};
/*
console.log(localStorage);
const q = '[{"description":"Задача по React от Dataart","href":"https://dataart.com.ua/special/zavdannya-pro-korobki-z-fruktami-dlya-perevirki-navichok-react-js/","time":"2018-08-23T08:34:02.605Z","repeatThrough":16,"id":0.0029562639288889248,"className":"fire"},{"description":"Прометеус: Алгоритмы","href":"https://edx.prometheus.org.ua/courses/KPI/Algorithms101/2015_Spring/courseware/544c3761b89e4656b1f24037e6b21394/0e20825c53e34092b649a6649681ce91/?child=first","time":"2018-08-21T08:04:55.425Z","repeatThrough":32,"id":0.034788533065106986,"className":""},{"description":"React.JS на русском","href":"https://learn-reactjs.ru/core/typechecking-with-prop-types","time":"2018-07-28T18:47:35.414Z","repeatThrough":1,"id":0.03556105957350919,"className":"fire"},{"description":"Курс React на Codecademy","href":"https://www.codecademy.com/courses/react-102/lessons/container-presentational-components/exercises/container-presentational-components-intro?action=resume_content_item","time":"2018-08-01T11:19:06.551Z","repeatThrough":16,"id":0.04886337117301354,"className":"fire"},{"description":"Chrome отладчик","href":"https://www.youtube.com/watch?v=C8Z-N0y6Sqo","time":"2018-08-06T09:43:36.786Z","repeatThrough":1,"id":0.19610463395987954,"className":"fire"},{"description":"Промисы (сложный уровень)","href":"https://habr.com/company/mailru/blog/269465/","time":"2018-08-25T12:42:14.312Z","repeatThrough":64,"id":0.20325574937229818,"className":""},{"description":"Sass - расширение CSS","href":"https://sass-scss.ru/guide/","time":"2018-08-20T08:14:39.042Z","repeatThrough":16,"id":0.2343364396692469,"className":"fire"},{"description":"UX/UI","href":"https://habr.com/post/321312/","time":"2018-08-08T11:03:25.666Z","repeatThrough":32,"id":0.27128213895260567,"className":""},{"description":"Объявлять переменные","href":"https://leetcode.com/submissions/detail/167268476/","time":"2018-09-08T13:20:32.916Z","repeatThrough":32,"id":0.3111682223249943,"className":""},{"description":"Redux-saga, яку було створено для спрощення організації “сайд-ефектів”","href":"https://www.google.com.ua/search?client=opera&q=Redux-Saga&sourceid=opera&ie=UTF-8&oe=UTF-8","time":"2018-08-23T08:36:11.065Z","repeatThrough":16,"id":0.31496815098837305,"className":"fire"},{"description":"Регулярные выражения","href":"https://learn.javascript.ru/regular-expressions-javascript","time":"2018-08-08T19:58:59.835Z","repeatThrough":32,"id":0.371004615077853,"className":""},{"description":"Вы не знаете JS: области видимости","href":"https://github.com/azat-io/you-dont-know-js-ru/tree/master/scope%20%26%20closures","time":"2018-07-23T10:43:45.160Z","repeatThrough":64,"id":0.3972499641282412,"className":""},{"description":"Common web layouts","href":"https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Common_web_layouts","time":"2018-08-25T11:39:16.785Z","repeatThrough":1,"id":0.45626924028766247,"className":"fire"},{"description":"Debugging with Visual Studio Code","href":"https://medium.com/@slamflipstrom/debugging-with-visual-studio-code-857904a8a590","time":"2018-08-16T12:10:46.878Z","repeatThrough":1,"id":0.4817140413724137,"className":"fire"},{"description":"Бесплатные онлайн-курсы по программированию","href":"https://dou.ua/lenta/digests/free-online-courses/?from=also","time":"2018-08-25T12:42:18.744Z","repeatThrough":32,"id":0.4862487635668056,"className":""},{"description":"Прописать путь получения работы разработчиком","href":"https://www.facebook.com/primachenkoonline/posts/1659160124138216","time":"2018-08-15T08:09:25.493Z","repeatThrough":2,"id":0.6351073055218848,"className":"fire"},{"description":"Изучить create-react-app","href":"https://dou.ua/lenta/articles/use-create-react-app/","time":"2018-08-16T10:08:03.743Z","repeatThrough":16,"id":0.6404961738267914,"className":"fire"},{"description":"Ключевое слово this (на русском)","href":"https://tproger.ru/translations/javascript-this-keyword/","time":"2018-08-25T13:51:55.235Z","repeatThrough":64,"id":0.6738041786026376,"className":""},{"description":"Git - система контроля версий","href":"https://www.google.com.ua/search?num=30&client=opera&hs=gRn&ei=SAxaW9qHMIyb6ATtspMY&q=git+система+контроля+версий&oq=Git+система&gs_l=psy-ab.3.0.0l2j0i22i30k1l2.4600668.4602523.0.4605871.8.8.0.0.0.0.148.928.0j7.7.0....0...1c.1.64.psy-ab..1.7.924...0i67k1j0i131i67k1.0.fDiaFskEbS8","time":"2018-07-27T08:37:09.508Z","repeatThrough":2,"id":0.7354244452001735,"className":"fire"},{"description":"Memrise","href":"https://www.memrise.com/course/867511/1000-slov-dlia-angliiskogo-srednego-urovnia/garden/speed_review/?source_element=scb&source_screen=eos","time":"2018-09-06T11:00:21.991Z","repeatThrough":64,"id":0.7883797517763127,"className":""},{"description":"Ключевое слово this","href":"https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/#23pitfallthisinaninnerfunction","time":"2018-08-25T12:42:21.551Z","repeatThrough":64,"id":0.8923080277458355,"className":""},{"description":"Вопросы на собеседовании + React","href":"https://vk.com/@maxpfrontend-sobesedovanie","time":"2018-08-08T10:02:16.721Z","repeatThrough":32,"id":0.8986882853403806,"className":""},{"description":"100 часов","href":"https://ain.ua/2018/08/07/vashi-pervye-100-chasov-programmirovaniya","time":"2018-08-08T18:23:31.921Z","repeatThrough":2,"id":0.9023991506321356,"className":"fire"},{"description":"REDUX","href":"https://rajdee.gitbooks.io/redux-in-russian/content/docs/basics/","time":"2018-08-25T12:42:29.240Z","repeatThrough":16,"id":0.9104371108599638,"className":""},{"description":"VS Code Debuging","href":"https://github.com/Microsoft/vscode-recipes","time":"2018-08-06T12:53:52.900Z","repeatThrough":1,"id":0.9169599849544241,"className":"fire"},{"description":"MVC паттерн, архитектура","href":"https://habr.com/post/321050/","time":"2018-08-16T10:07:58.743Z","repeatThrough":16,"id":0.9834373650469614,"className":"fire"},{"description":"Visual Studio Code: док-ия","href":"https://code.visualstudio.com/docs/?dv=win","time":"2018-08-06T09:50:21.249Z","repeatThrough":1,"id":0.98954420336237,"className":"fire"}]';
localStorage.setItem('all', q);
console.log(localStorage);

function createMainReminder () {
  const mainReminder = document.querySelector('.main-reminder');
  const storage = JSON.parse(localStorage.all);

  storage.forEach((obj, index)=>{
    if (obj.description == "Memrise") {
      obj.daily = true;
    } else obj.daily = false;
  });

  let text = JSON.stringify(storage);
  text = text.replace(/(fire)|(className)/g,function (item, i1,i2) {
    if (item == 'fire') {
      return 'red'
    } else return 'alarmLevel'
  })
  localStorage.setItem('all', text);
  return storage
}



console.log(createMainReminder(), 'createMainReminder()');
console.log(localStorage);
*/

function sortRemindersByAlarmLevel () {
  const array = JSON.parse(localStorage.all);
  array.sort((a,b)=>{
    if (a.alarmLevel == '' && b.alarmLevel == 'red') {
      return 1
    } else if (a.alarmLevel == '' && b.alarmLevel == 'yellow') {
      return 1
    } else if (a.alarmLevel == 'yellow' && b.alarmLevel == 'red') {
      return 1
    } else if (a.alarmLevel == 'yellow' && b.alarmLevel == '') {
      return -1
    } else if (a.alarmLevel == 'red' && b.alarmLevel == '') {
      return -1
    } else if (a.alarmLevel == 'red' && b.alarmLevel == 'yellow') {
      return -1
    } else 0
  })
  return array
}

console.log(sortRemindersByAlarmLevel(), 'sortRemindersByAlarmLevel()');

/*
  .parent {
    display: table
  }

  .child {
    display: table-row;
  }

  .young {
    display: table-cell;
  }

*/



// function buildMainReminder (arr) {
//   const mainReminder = document.querySelector('.main-reminder');
//   for (let item of arr) {
//     mainReminder.innerHTML += `<div class="row ${item.id} ${item.alarmLevel}"><div class="description"><a href="${item.href}" class="href" target="_blank">${item.description}</a></div><div class="repeatIn">${new Date(Date.parse(item.time) + item.repeatThrough*1000*60*60*24).toLocaleString("ru", {month: 'short',day: 'numeric'})}</div><div class="done"><button class="btn-done ${item.id}">Повторил</button></div><div class="delete"><button class="btn-delete ${item.id}">Удалить</button></div></div>`
//   }
//   const array = document.querySelectorAll('[class^=row]');
//   for (let item of array) {
//     item.style.display = 'flex';
//     item.style.justifyContent = 'space-around';
//     item.getElementsByClassName('description')[0].style.flexGrow = 1;

//   }
// }

function buildMainReminder (arr) {
  const mainReminder = document.querySelector('.main-reminder');
  for (let item of arr) {
    mainReminder.innerHTML += `<div class="row ${item.id} ${item.alarmLevel}"><div class="description"><a href="${item.href}" class="href" target="_blank">${item.description}</a></div><div class="repeatIn">${new Date(Date.parse(item.time) + item.repeatThrough*1000*60*60*24).toLocaleString("ru", {month: 'short',day: 'numeric'})}</div><div class="done"><button class="btn-done ${item.id}">Повторил</button></div><div class="delete"><button class="btn-delete ${item.id}">Удалить</button></div></div>`
  }
  /*const array = document.querySelectorAll('[class^=row]');
  for (let item of array) {
    item.style.display = 'flex';
    item.style.justifyContent = 'space-around';
    item.getElementsByClassName('description')[0].style.flexGrow = 1;

  }*/
}

buildMainReminder(sortRemindersByAlarmLevel());
setInterval(()=>{buildMainReminder(sortRemindersByAlarmLevel())}, 1000*60*30);
/*
let test = document.querySelector('.test');
function clock (event) {
  let target = event.target;
  console.log(target);
  target.classList.toggle('turn-on');
  if (target.classList.contains('turn-on')) {
    console.log(true);
    setTimeout(function restart () {
      target.className = 'turn-on';
      target.innerHTML -= (-1);
      let stop = setTimeout(restart, 1000);
      target.classList.toggle(stop);
      console.log(stop, 'stop');
    }, 1000);
  } else {
    clearTimeout(target.className.match(/\d+/)[0]);
    console.log(target.className.match(/\d+/), target);
  }
}
test.addEventListener('click', clock);
*/

/*
let promise = new Promise((resolve, reject) => {

 var timerPromise = setTimeout(() => {
    // переведёт промис в состояние fulfilled с результатом "result"
    resolve("result");
  }, 5000);
  let button = document.querySelector('.promise');
  button.addEventListener('click', function (event) {
    alert('STOP');
  clearTimeout(timerPromise);
  reject('event.type');
})
    // reject('event.type');

});

// promise.then навешивает обработчики на успешный результат или ошибку
promise
  .then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
      alert("Fulfilled: " + result); // result - аргумент resolve
    },
    error => {
      // вторая функция - запустится при вызове reject
      alert("Rejected: " + error); // error - аргумент reject
    }
  );
*/
  // let button = document.querySelector('.promise');
  // alert(button.innerHTML);

  // button.addEventListener('click', function (event) {
  //   alert('STOP')});

// if (true) {
//   let q = 10;
// } else {
//   let qq = 12;
// }
// console.log(qq);