'use strict';

let flag = true;
let isWinner = false;
let field = document.querySelector('.field');
let btn = document.querySelector('.new_game');

function fillField() {
  for (let i = 0; i < 9; i++) {
    let div = document.createElement('div');
    div.className = 'field-items';
    field.append(div);
  }
}

function handlerField(event) {
  let target = event.target;
  if (isWinner) {
    createMessage(`Игра окончена. Для начала новой нажмите кнопку Новая игра`, 'error');/*в чем разница ковычек */
    return;
  }
  if (target.textContent !== '') {
    return;
  }
  target.textContent = flag ? 'X' : 'O';
  flag = !flag;
  horizCheck();
  verticalCheck();
  diagonalCheck();
  diagonal2Check();
  draw();

}

function horizCheck() {
  let items = field.querySelectorAll('.field-items');
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 2; j++) {
      if (items[i * 3 + j].textContent === '') {
        break;
      }
      if (items[i * 3 + j].textContent === items[i * 3 + j + 1].textContent) {
        count++;
      }
    }
    if (count == 2) {
        isWinner = true;
        createMessage(`Пользователь ${!flag ? 'X,': 'O, '} вы молодец, вы победили!`, 'success');
    }
  }
}


function verticalCheck() {
  let items = field.querySelectorAll('.field-items');
  for (let i = 0; i < 3; i++) {
    let count = 0;
    for (let j = 0; j < 2; j++) {
      if (items[j * 3 + i].textContent === '') {
        break;
      }
      if (items[j * 3 + i].textContent === items[j * 3 + i + 3].textContent) {
        count++;
      }
    }
    if (count == 2) {
      isWinner = true;
      createMessage(`Пользователь ${!flag ? 'X,': 'O, '} вы молодец, вы победили!`, 'success');
    }
  }
}


function diagonalCheck() {
    let items = field.querySelectorAll('.field-items');
    let count = 0;
    for (let i = 0; i < 2; i++) {
        if (items[i*4].textContent === '') {
          break;
        }
        if (items[i*4].textContent === items[(i+1)*4].textContent) {
          count++;
        }
    }
    if (count == 2) {
        isWinner = true;
        createMessage(`Пользователь ${!flag ? 'X,': 'O, '} вы молодец, вы победили!`, 'success');
    }
}



function diagonal2Check() {
    let items = field.querySelectorAll('.field-items');
    let count = 0;
    for (let i = 0; i < 2; i++) {
        if (items[i*2+2].textContent === '') {
          break;
        }
        if (items[i*2+2].textContent === items[i*2+4].textContent) {
          count++;
        }
    }
    if (count == 2) {
        isWinner = true;
        createMessage(`Пользователь ${!flag ? 'X,': 'O, '} вы молодец, вы победили!`, 'success');
    }
}

function draw(){
  let items = field.querySelectorAll('.field-items');
  let count=0;
  for (let i=0; i<9;i++){
    if (items[i].textContent!==''){
      count++;
    }
  }
  let mess=document.querySelector('.message')
  if (count===9 && !isWinner){
    createMessage(`Поздравляю! У вас ничья!`, 'playdrow');
  }
  else{
    count=0
  }
}

// function draw(){
//   let items = field.querySelectorAll('.field-items');
//   for (let i=0; i<9;i++){
//     if (items[i].textContent===''){
//       break
//     }
//   }
//   for (let i = 0; i < 3; i++) {
//     let count1 = 0;
//     let count2=0;
//     for (let j = 0; j < 2; j++) {
//       if (items[i * 3 + j].textContent === items[i * 3 + j + 1].textContent) {
//         count1++;
//       }
//       if (items[j * 3 + i].textContent === items[j * 3 + i + 3].textContent) {
//         count2++;
//     }
//   }
//     if (count1 == 2 || count2==2) {
//         isWinner = true;
//     }
//   }
//   for (let i = 0; i < 2; i++) {
//     let count3=0;
//     let count4=0;
//     if (items[i*4].textContent === items[(i+1)*4].textContent) {
//       count3++;
//     }
//     if (items[i*2+2].textContent === items[i*2+4].textContent) {
//       count4++;
//     }
//   }
//   if (count3 == 2 || count4==2) {
//       isWinner = true;
//   }
//   if (isWinner===false){
//     createMessage(`Поздравляю! У вас ничья!`, 'success');
//   }
// }

function clean() {
  let items = field.querySelectorAll('.field-items');
  for (let i = 0; i < items.length; i++) {
    items[i].textContent = '';
  }
  isWinner = false;
  flag = true;
}

function createMessage(textMessage, type) {
    const message = document.querySelector('.message');
    message.textContent = textMessage;
    message.classList.add(type);
    message.classList.toggle('hidden');
    setTimeout(()=>{
        message.classList.toggle('hidden');
        message.classList.toggle(type);
    },1000)
    /*что именно нужно писать в таймер*/
}

field.addEventListener('click', handlerField);
btn.addEventListener('click', clean);

fillField();
