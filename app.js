const containerPopup=document.querySelector('.container-poppup');
let addContainer=document.querySelector('.add-container');
const errorPopup=document.querySelector('.error-popup');


let popupArray=[];

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

                console.log(popupArray)
                
                 let popupArrayMap=popupArray.map(item=>{
                  return(
                  `<div class="add-box">
                  <div class="box-remove-btn">
                     <button class='remove-box' onclick="removeItem(${item.title})">
                         <span><i class="fas fa-times"></i></span>
                     </button>
                  </div>
             
                  <div class="title">
                     <h1>${item.title}</h1>
                  </div>
             
                  <div class="input">
                     <input type="date">
                  </div>
             
                  <div class="image">
                     <img src=${item.image} alt="" />
                  </div>
                 
                  </div>`
                  )
                 })

                 

                  
              addContainer.innerHTML=popupArrayMap;
                       
             containerPopup.classList.remove('visible');
              
            })

            

       
     })

    }

    function removeItem(id){
      popupArray = popupArray.filter(item=>item.title!=id);
    }

    let MarkerArray=[
        {location: {lat: 41.7151, lng: 44.8271},info: {image: './Img/tbilisi.jpg',title: 'Tbilisi'}},
        {location: {lat: 42.2662, lng: 42.7180},info: {image: './Img/kutaisi.jpg',title: 'Kutaisi'}},
        {location: {lat: 41.6168, lng: 41.6367},info: {image: './Img/batumi.jpg',title: 'Batumi'}},
        {location: {lat: 42.3420, lng: 43.4106},info: {image: './Img/sachkhere.jpg',title: 'Sachkhere'}},
    ];

    for(let i=0; i<MarkerArray.length; i++){
        addmarker(MarkerArray[i])
    }


}






document.querySelector('.error-close').addEventListener('click',()=>{
  errorPopup.classList.remove('appear');
})
