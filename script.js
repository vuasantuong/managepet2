'use strict';

const inp_Name = document.getElementById('input-name');
const inp_ID = document.getElementById('input-id');
const inp_Age = document.getElementById('input-age');
const inp_Type = document.getElementById('input-type');
const inp_Weight = document.getElementById('input-weight');
const inp_Length = document.getElementById('input-length');
const inp_Breed = document.getElementById('input-breed');
const inp_Color = document.getElementById('input-color-1');
const submit_Infor = document.getElementById('submit-btn');
const inp_Vaccinated = document.getElementById("input-vaccinated");
const inp_Dewormed = document.getElementById("input-dewormed");
const inp_Sterilized = document.getElementById("input-sterilized");
const btn_Healthy = document.getElementById('healthy-btn');
const btn_BMI=document.getElementById('BMI-btn');
const btn_sidebar=document.getElementById('sidebar')


btn_sidebar.addEventListener('click',function(){
  btn_sidebar.classList.toggle('active')
})

const storageValue = getFromStorage("petArr");
const petArr = storageValue ? JSON.parse(storageValue) : [];

rendertable(petArr);

submit_Infor.addEventListener('click',function(){
  const data={
    id:inp_ID.value,
    name:inp_Name.value,
    age:parseInt(inp_Age.value),
    type:inp_Type.value,
    weight:parseFloat(inp_Weight.value),
    length:parseFloat(inp_Length.value),
    breed:inp_Breed.value,
    color:inp_Color.value,
    vaccinated:inp_Vaccinated.checked,
    dewormed:inp_Dewormed.checked,
    sterilized:inp_Sterilized.checked,
    BMI:"?",
    dateadd:new Date(),
  };
  const validate = validateData(data)
  if(validate){
    petArr.push(data);
    saveToStorage("petArr",JSON.stringify(petArr));
    clearInput();
    rendertable(petArr);
  }}
  )

function validateData(e){
  let state=true;
  if(!e.id){
    alert('Please select input for ID')
    state=false;}
  if(e.age<1||e.age>15||!e.age){
    alert(' Age must between 1 to 15!');
    state=false;
  }if(e.weight<1||e.weight>15||!e.weight){
    alert('Weight must between 1 to 15!');
    state=false;
  }if(e.length<1||e.length>100||!e.length){
    alert('Length must be between 1 and 100!');
    state=false; 
  }if(e.type==='Select Type'){
    alert('Please select Type!');
    state=false;
  }if(e.breed==='Select Breed'){
    alert('Please select Breed!');
    state=false;
  }

  for(let i=0;i<petArr.length;i++){
    if(e.id===(petArr[i].id)){
      alert('Id must be unique');
      state = false;
      break;
    }
  }  return state 
}


function clearInput(){
  inp_Name.value="";
  inp_ID.value="";
  inp_Age.value="";
  inp_Weight.value="";
  inp_Length.value="";
  inp_Type.value="Select Type";
  inp_Breed.value="Select Breed";
  inp_Vaccinated.checked=false;
  inp_Dewormed.checked=false;
  inp_Sterilized.checked=false;
}

function checkedicon(checkvalue){
  if(checkvalue){
    return '<i class="bi bi-check-circle-fill"></i>'
  }else{
    return '<i class="bi bi-x-circle-fill"></i>'
  }
}

function rendertable(petArr){
  const tableBodyE1 = document.getElementById('tbody')
  tableBodyE1.innerHTML='';
  for(let i = 0 ; i  < petArr.length; i ++){
    const row = document.createElement('tr');
    row.innerHTML=`<td>${petArr[i].id}</td>
                    <td>${petArr[i].name}</td>
                    <td>${petArr[i].age}</td>
                    <td>${petArr[i].type}</td>
                    <td>${petArr[i].weight} kg</td>
                    <td>${petArr[i].length} cm</td>
                    <td>${petArr[i].breed}</td>
                    <td><i class="bi bi-square-fill" style="color:${petArr[i].color}"</i></td>
                    <td>${checkedicon(petArr[i].vaccinated)}</td>
                    <td>${checkedicon(petArr[i].dewormed)}</td>
                    <td>${checkedicon(petArr[i].sterilized)}</td>
                    <td>${petArr[i].dateadd}</td>
                    <td><button class="btn btn-danger" onclick="deletePet('${ petArr[i].id }')">Delete</button></td>
                    `
    tableBodyE1.appendChild(row);
  }
}

function deletePet(petId) {
  const index = petArr.findIndex(data => data.id === petId);

  if (index !== -1) {
    if (confirm('Are you sure you want to delete this pet?')) {
      petArr.splice(index, 1);
      saveToStorage("petArr",JSON.stringify(petArr));
      rendertable(petArr);
    }
  }
}

let healthycheck=true;

btn_Healthy.addEventListener('click',function(){
    if(healthycheck==false){
    const healthyPetArr=petArr.filter(data=>data.vaccinated&&data.dewormed&&data.sterilized)
    rendertable(healthyPetArr)
    btn_Healthy.innerText="Show All Pet"
    healthycheck=true;
    }else{
      rendertable(petArr);
      healthycheck=false;
      btn_Healthy.innerText="Show Healthy Pet";
    }});

function renderBreed(breedArr){
  inp_Breed.innerHTML=''

  breedArr.forEach(function(breed){
    const option  = document.createElement('option');
    option.innerHTML=breed.name;  
    inp_Breed.appendChild(option);
  }); 
};

inp_Type.addEventListener('change',function(){
  const selectedType=this.value;
  const storageBreedArr = getFromStorage('breedArr');
  const breedArr = JSON.parse(storageBreedArr);
  const filteredbreed = breedArr.filter(data=>data.type===selectedType);
  renderBreed(filteredbreed);
});