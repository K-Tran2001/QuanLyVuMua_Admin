import React, { useEffect, useRef } from "react";
import _ from "lodash";
import { loadGoogleMapScript } from "./mapAPI";
import Input from "../form/input/InputField";

const PlaceAutocomplete = (props) => {
  const centerDefault = { lat: 10.958707525394423, lng: 106.89836112597757 };
  const placeInputRef = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    loadGoogleMapScript(() => {
      initPlaceAPI();
      if (props?.hasGoogleMaps) {
        initGoogleMap();
      }
    });
  }, []);
  useEffect(() => {
    if (props.currentMarker && props.isLoadLatLng) {
      if (!windowMap || !windowMarker) {
        initPlaceAPI();
        if (props?.hasGoogleMaps) {
          initGoogleMap();
        }
      }
    }
  }, [props.currentMarker, props.isLoadLatLng]);
  let windowMap = undefined;
  let windowMarker = undefined;

  async function initGoogleMap() {
    const mapOptions = {
      center: {
        lat:
          props.currentMarker?.lat && props.currentMarker?.lat !== 0
            ? props.currentMarker.lat
            : centerDefault.lat,
        lng:
          props.currentMarker?.lng && props.currentMarker?.lng !== 0
            ? props.currentMarker.lng
            : centerDefault.lng,
      },
      zoom: 17,
    };
    var map = new window.google.maps.Map(mapRef.current, mapOptions);
    if (props.currentMarker) {
      const markerOptions = {
        map: map,
        position: { ...mapOptions.center },
      };
      windowMarker = new window.google.maps.Marker(markerOptions);
    }
    windowMap = map;
  }

  async function moveToMarker(location) {
    var center = new window.google.maps.LatLng(location.lat, location.lng);
    windowMap.panTo(center);
    if (!_.isEmpty(center) && center.lat() !== 0 && center.lng() !== 0) {
      const markerOptions = {
        map: windowMap,
        position: center,
      };
      windowMarker?.setMap(null);
      windowMarker = new window.google.maps.Marker(markerOptions);
    }
  }

  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(
      placeInputRef.current,
      {
        types: ["establishment", "geocode"],
        strictBounds: false,
        fields: ["formatted_address", "geometry"],
      }
    );
    new window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      async function () {
        if (!props?.disabled) {
          let place = autocomplete.getPlace();
          localStorage.setItem("@PlaceAddress", JSON.stringify(place));
          if (place?.geometry?.location) {
            const location = place?.geometry?.location;
            moveToMarker({
              lat: location.lat(),
              lng: location.lng(),
            });
          }
          if (props.onCallback) props?.onCallback(place);
        }
      }
    );
  };
  return (
    <>
      {props?.disableInputSearch == null && (
        <Input
          ref={placeInputRef}
          placeholder="Nhập địa chỉ"
          width="100%"
          defaultValue={props.value}
          onChange={props.onChange}
          disabled={props?.disabled}
          className="mb-4"
        />
      )}
      {props?.hasGoogleMaps && (
        <div
          ref={mapRef}
          id="map"
          style={{
            width: "auto",
            height: 400,
            position: "relative",
            overflow: "hidden",
            borderRadius: "3px",
            border: "1px #dbe0e4 solid",
            boxShadow:
              "inset 0 0 0 1px rgba(67, 90, 111, 0.3), inset 0 1px 2px rgba(67, 90, 111, 0.14)",
          }}
        ></div>
      )}
    </>
  );
};
export default PlaceAutocomplete;
