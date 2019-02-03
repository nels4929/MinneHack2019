/*
 * farmData.js: Used to grab data from plots.json
 */

function placePlotMarkers() {
  plots.forEach(plot => {
    makePlotMarker(
      { lat: plot.location[0], lng: plot.location[1] },
      map,
      "TODO",
      plot.id
    );
  });
}

var owners = null;
var plants = null;
var plots = null;
var datalogs = null;

function initFarmData() {
  jQuery.ajaxSetup({ async: false });

  $.get(
    "data/owners.json",
    function(data) { owners = data; },
    "json"
  );

  $.get(
    "data/plants.json",
    function(data) { plants = data; },
    "json"
  );

  $.get(
    "data/plots.json",
    function(data) { plots = data; },
    "json"
  );

  $.get(
    "data/datalogs.json",
    function(data) { datalogs = data; },
    "json"
  );

  jQuery.ajaxSetup({ async: true });
}

function getOwner(id) {
  for (i in owners) {
    if (owners[i].id === id) {
      return owners[i];
    }
  }
  return null;
}

function getPlot(id) {
  for (i in plots) {
    if (plots[i].id === id) {
      return plots[i];
    }
  }
  return null;
}

function getPlant(id) {
  for (i in plants) {
    if (plants[i].id === id) {
      return plants[i];
    }
  }
  return null;
}

function getPlotLogs(id) {
  var logs = Array();

  for (i in datalogs) {
    if (datalogs[i].plot === id) {
      logs.push(datalogs[i]);
    }
  }
  return logs;
}

function getOwnerLogs(id) {
  var logs = Array();

  for (i in datalogs) {
    if (datalogs[i].owner === id) {
      logs.push(datalogs[i]);
    }
  }
  return logs;
}
