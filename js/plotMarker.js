function makePlotMarker(position, mapId, title, id) {
  var thisMarker = new google.maps.Marker({
    position: position,
    map: mapId,
    title: title,
    id: id
  });

  thisMarker.addListener("click", onPlotMarkerClick);
  return this;
}

function onPlotMarkerClick() {
  console.log("onPlotMarkerClick id: " + this.id);
  console.log(this);

  var plotInfo = getPlotInfo(this.id);

  // Sort the logs from newest to oldest
  plotInfo.data.sort((a, b) => {
    aDate = new Date(a.date);
    bDate = new Date(b.date);
    return aDate > bDate ? -1 : 1;
  });

  setOverlayFields(plotInfo);

  $("#see-more").click(() => {
    loadSeeMorePage(this.id);
  });
  $("#overlay").show();
}

function getPlotInfo(_plot) {
  var plot = getPlotObject(_plot);

  var plotInfo = {
    id: plot.getID(),
    crop: plot.getPlantName(),
    owner: plot.getOwnerName(),
    data: getPlotLogs(plot.getID())
  };
  return plotInfo;
}

function setOverlayFields(plotInfo) {
  document.getElementById("overlay-crop").innerHTML = plotInfo.crop;
  document.getElementById("overlay-owner").innerHTML = plotInfo.owner;

  for (var i = 0; i < plotInfo.data.length; i++) {
    if ("photos" in plotInfo.data[i].data) {
      document.getElementById("overlay-image").src =
        plotInfo.data[i].data.photos[0];
      break;
    }
  }
  for (var i = 0; i < plotInfo.data.length; i++) {
    if ("weather" in plotInfo.data[i].data) {
      document.getElementById("overlay-data-weather-temp").innerHTML =
        plotInfo.data[i].data.weather.temperature;
      document.getElementById("overlay-data-weather-rain").innerHTML =
        plotInfo.data[i].data.weather.rain;
      document.getElementById("overlay-data-weather-pressure").innerHTML =
        plotInfo.data[i].data.weather.pressure;
      break;
    }
  }

  for (var i = 0; i < plotInfo.data.length; i++) {
    if ("date" in plotInfo.data[i]) {
      var date = new Date(plotInfo.data[i].date);
      console.log(date);
      document.getElementById("date-data").innerHTML = date.toDateString();
      break;
    }
  }

  for (var i = 0; i < plotInfo.data.length; i++) {
    if ("height" in plotInfo.data[i].data) {
      document.getElementById("overlay-data-height").innerHTML =
      plotInfo.data[i].data.height;
      break;
    }
  }
}

function loadSeeMorePage(plotId) {
  window.location.assign("plotdata.html?p=" + plotId);
}
