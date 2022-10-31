const containerPopup=document.querySelector('.container-poppup');
let addContainer=document.querySelector('.add-container');
const errorPopup=document.querySelector('.error-popup');


let popupArray= [];

let inputsArray=[];

let inputTarget='';

function initMap(){

    var options={
        center: {lat: 42.3154, lng: 43.3569},
        zoom: 8,
        mapId: "715a3683b7b7bf8a"
      }
    
    map = new google.maps.Map(document.getElementById('map'), options);

    const svgIcon={
        url: './Img/images.png',
        anchor: new google.maps.Point(17, 54),
        scaledSize: new google.maps.Size(35, 35),
    }

    function addmarker(property){

        const marker = new google.maps.Marker({
            position: property.location,
            map: map,
            icon: svgIcon
        })

        marker.addListener('click',()=>{

            containerPopup.innerHTML=`
            <div class="modal-dialog container-child" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title">${property.info.title}</h3>
                <button type="button" class="close close-btn " data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body image-city">
              <img src=${property.info.image} alt=${property.info.title} />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary add-btn">Add</button>
                <button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        `
            containerPopup.classList.add('visible');

            const closeBtn=document.querySelectorAll('.close-btn');
            const addBtn=document.querySelector('.add-btn');

            closeBtn.forEach(close=>{
              close.addEventListener('click',()=>{
                containerPopup.classList.remove('visible');
              })
            })

            addBtn.addEventListener('click',()=>{

              let propertyfinder=popupArray.find(item=> item.title === property.info.title);
              
                if(!propertyfinder){
                  popupArray.push(property.info);
                } else{
                  errorPopup.classList.add('appear');
                }



               

                updateCart();
                       
             containerPopup.classList.remove('visible');
              
            })

            

       
     })

    }

   

    let MarkerArray=[
        {location: {lat: 41.7151, lng: 44.8271},info: {id: 1,image: './Img/tbilisi.jpg',title: 'Tbilisi'}},
        {location: {lat: 42.2662, lng: 42.7180},info: {id: 2,image: './Img/kutaisi.jpg',title: 'Kutaisi'}},
        {location: {lat: 41.6168, lng: 41.6367},info: {id: 3, image: './Img/batumi.jpg',title: 'Batumi'}},
        {location: {lat: 42.3420, lng: 43.4106},info: {id: 4, image: './Img/sachkhere.jpg',title: 'Sachkhere'}},
    ];

    for(let i=0; i<MarkerArray.length; i++){
        addmarker(MarkerArray[i])
    }


}



function removeClass(products){
  popupArray=popupArray.filter(item=>item.id!==products);
  updateCart();
}





function updateCart(){
  addContainer.innerHTML=" ";
  popupArray.forEach((product)=>{
    
    addContainer.innerHTML+=`
    <div class="add-box">
    <div class="box-remove-btn">
       <button class='remove-box'  onclick="removeClass(${product.id})">
           <span><i class="fas fa-times"></i></span>
       </button>
    </div>

    <div class="title">
       <h1>${product.title}</h1>
    </div>

    <div class="input">
    
    </div>

    <div class="image">
       <img src=${product.image} alt="" />
    </div>
   
    </div>
    `;

    localStorage.setItem('INPUTBOX',JSON.stringify(inputsArray));

    inputsDate();

   })

   

   

}

let counter=0;

function inputsDate(){
  let input=document.createElement('input');
  input.setAttribute("type", "date");
 


 let inpuTS= document.querySelectorAll('.input');
 for(let i=0; i<inpuTS.length;i++){
  inpuTS[i].appendChild(input);
 }
 numberInputs();
}

let onChangeinput =function(event){
  //inputTarget=new Date (event.target.value);
 
  inputTarget=event.target.value;
  
}

let inputboxes=localStorage.getItem('INPUTBOX') || [];



function numberInputs(){
  
  let inputNumber=document.querySelectorAll('input');

if(!inputsArray.includes(inputTarget)){
  inputsArray.push(inputTarget);
}

let InputTargetDate =new Date(inputTarget)
let year = InputTargetDate.getFullYear();
let month = InputTargetDate.getMonth()+1;
let day = InputTargetDate.getDate()+1;
if(month <10){
  month='0'+month
}

if(day <10){
  day='0'+day
}

let fullDate = year+'-'+month+'-'+day

 

  for(let i=0;i<inputNumber.length;i++){
    
    if(i==0){
      inputNumber[i].setAttribute('min','2022-02-09');
      inputNumber[i].addEventListener('input',onChangeinput);
      inputNumber[i].value= inputsArray[i+1];
    }
    else{

      inputNumber[i].addEventListener('input',onChangeinput);
      inputNumber[i].setAttribute('min', fullDate);
      inputNumber[i].value= inputsArray [i+1];

    }

   
      
    }
   
  
    
    

}



document.querySelector('.error-close').addEventListener('click',()=>{
  errorPopup.classList.remove('appear');
})

