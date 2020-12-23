import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as poisData from "./data/poi.json";
import ReactTooltip from "react-tooltip";
import './App.css';



function App() {

  //Holds the value of settings for the start of the map.
  const [viewport, setViewport] = useState({
    latitude: 43.532426,
    longitude: -80.225328,
    width: "100vw",
    height: "100vh",
    zoom: 16.33
  })







  const [selectedPOI, setSelectedPOI] = useState(null);

  return (

    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoia3NhZGlrb3QiLCJhIjoiY2tmd3V2Yno1MTZraDJ2cXE2ZmxhNGJnYSJ9.1Pn6sycqaEonXsL2854n-A"}
        mapStyle='mapbox://styles/ksadikot/ckgtn9yq72y2919pg3pur140x'
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {poisData.features.map((poi) => (
          <Marker
            key={poi.properties.POI_id}
            latitude={poi.geometry.coordinates[0]}
            longitude={poi.geometry.coordinates[1]}
          >

            <button className="icon-btn" onClick={(e) => {
              e.preventDefault();
              setSelectedPOI(poi);
            }}>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </button>

          </Marker>
        ))}

        {selectedPOI && (
          <Popup
            latitude={selectedPOI.geometry.coordinates[0]}
            longitude={selectedPOI.geometry.coordinates[1]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setSelectedPOI(null);
            }}
          >
            <div className="popupContent" >
              <h3 style={{ color: "grey" }}>{selectedPOI.properties.name}</h3>

              <div className="popupIcons">
                <div className="popupIcon">
                  <button className="icon-btn" data-tip data-for="vidTip" onClick={() => window.open(selectedPOI.properties.video)}

                  >
                    <i className="fa fa-video-camera" aria-hidden="true" style={{ color: "red" }}></i>
                  </button>

                  <ReactTooltip id="vidTip" place="top" effect="solid">
                    Watch more!
                  </ReactTooltip>
                </div>
                <div className="popupIcon">
                  <button className="icon-btn" data-tip data-for="infoTip" onClick={() => window.open(selectedPOI.properties.info)}>
                    <i className="fa fa-info-circle" aria-hidden="true" style={{ color: "blue" }}></i>
                  </button>

                  <ReactTooltip id="infoTip" place="top" effect="solid">
                    Learn more!
                  </ReactTooltip>
                </div>


                <div className="popupIcon">
                  <button className="icon-btn" data-tip data-for="viewTip" onClick={() => window.open(selectedPOI.properties.view)} >
                    <i className="fa fa-eye" aria-hidden="true" style={{ color: "green" }}></i>
                  </button>

                  <ReactTooltip id="viewTip" place="top" effect="solid">
                    360 view!
                  </ReactTooltip>
                </div>
              </div>

            </div>
          </Popup>
        )}
      </ReactMapGL>

    </div>
  );
}

export default App;
