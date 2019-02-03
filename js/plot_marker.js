
function makePlotMarker(position, mapId, title, id){
    var thisMarker = new google.maps.Marker({
        position: position,
        map: mapId,
        title: title,
        id: id,
    })

    thisMarker.addListener('click', onPlotMarkerClick);
    return this;
}

function onPlotMarkerClick(){
    console.log('Plot marker ' + this.id + ' clicked');
    console.log(this);
}