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

        

    }

    let MarkerArray=[
        {location: {lat: 41.7151, lng: 44.8271}},
        {location: {lat: 42.2662, lng: 42.7180}},
        {location: {lat: 41.6168, lng: 41.6367}},
        {location: {lat: 42.3420, lng: 43.4106}},
    ];

    for(let i=0; i<MarkerArray.length; i++){
        addmarker(MarkerArray[i])
    }

}