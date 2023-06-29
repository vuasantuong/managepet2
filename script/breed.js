'use strict';

const inp_Breed=document.getElementById('input-breed');
const inp_Type=document.getElementById('input-type')
const inp_Submit_Breed=document.getElementById('submit-btn')

const storagebreedvalue=getFromStorage("breedArr");
const breedArr = storagebreedvalue ? JSON.parse(storagebreedvalue):[];

renderBreedTable(breedArr)

inp_Submit_Breed.addEventListener('click',function(){
  const data1 = {
      name:inp_Breed.value,
      type:inp_Type.value,
    };
  const validateInfor = validate1(data1)
  
  if(validateInfor){
    breedArr.push(data1)
    saveToStorage('breedArr',JSON.stringify(breedArr));
    renderBreedTable(breedArr)
    clearInput1();
  }
})

function validate1(e){
  let state=true;
  if(!e.name){
    alert('Please fill in the name of Breed')
    state = false;
  }if(e.type==='Select Type'){
    alert('Please selcet Type')
    state=false;
  }for(let i=0;i<breedArr.length;i++){
    if(e.name===breedArr[i].name&&e.type===breedArr[i].type){
      alert('This kind of pet has been added')
      state=false;  
    }
  }
  return state
}

function renderBreedTable(breedArr){
  const tableBodyE2=document.getElementById('tbody');
  tableBodyE2.innerHTML='';
  for(let i =0;i<breedArr.length;i++){
  const row = document.createElement('tr'); 
  row.innerHTML=`<td>${i+1}</td>
                <td>${breedArr[i].name}</td>
                <td>${breedArr[i].type}</td>
                <td><button class="btn btn-danger" onclick="deleteBreed('${ breedArr[i].name }')">Delete</button></td>`
  tableBodyE2.appendChild(row)
  }}

function clearInput1(){
  inp_Breed.value="";
  inp_Type.value="Select Type"
}



function deleteBreed(breedname){
  const index=breedArr.findIndex(data1=>data1.name===breedname);

  if(index!==-1){
    if(confirm('Are you sure you want to delete this breed?')){
      breedArr.splice(index,1);
      saveToStorage('breedArr',JSON.stringify(breedArr));
      renderBreedTable(breedArr);
    }
  }
}

