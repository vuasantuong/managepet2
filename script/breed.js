'use strict';

const inp_Breed=document.getElementById('input-breed');
const inp_Type=document.getElementById('input-type')
const inp_Submit_Breed=document.getElementById('submit-btn')

const storagebreedvalue=getFromStorage("breedArr");
const breedArr = storagebreedvalue ? JSON.parse(storagebreedvalue):[];



inp_Submit_Breed.addEventListener('click',function(){
  const data1 = {
      name:inp_Breed.value,
      type:inp_Type.value,
    };
  const validateInfor = validate2(data1)
  
  if(validateInfor){
    breedArr.push(data1)
    renderBreedTable(breedArr)
  }
})

function validate2(e){
  let state=true;
  if(!e.name){
    alert('Please fill in the name of Breed')
    state = false;
  }if(e.type==='Select Type'){
    alert('Please selcet Type')
    state=false;
  }for(let i=0;i<breedArr.length;i++){
    if(e.name===breedArr[i].name){
      alert('This kind of pet has been added')
      state=false;  
    }
  }
  return state
}

function renderBreedTable(breedArr){
  const tableBody=document.getElementById('tbody');
  tableBody.innerHTML='';
  for(let i =0;i<breedArr.length;i++){
  const row = document.createElement('tr'); 
  row.innerHTML=`<td>${i+1}</td>
                <td>${breedArr[i].name}</td>
                <td>${breedArr[i].type}</td>
                <td><button class="btn btn-danger" onclick="deletebreed('${ breedArr[i].name }')">Delete</button></td>`
  tableBody.appendChild(row)
  }}

