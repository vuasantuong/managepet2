'use strict';
function saveToStorage(key,value){
  localStorage.setItem(key,value);
}

function getFromStorage(key,defaultval){
  return localStorage.getItem(key) ?? defaultval;
}

