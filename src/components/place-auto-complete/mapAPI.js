export const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&region=VN&language=vi`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
};
export const GetGeocode = async (geocoderRequest) => {
  if (!geocoderRequest.address || geocoderRequest.address.length < 1) {
    return null;
  }
  try {
    let geocoder = new window.google.maps.Geocoder();
    const result = await geocoder.geocode({
      address: geocoderRequest.address,
    });
    if (!result || !result.results) {
      return null;
    }
    const location = result.results[0]?.geometry?.location;
    if (location) {
      return {
        lat: location.lat(),
        lng: location.lng(),
      };
    }
    return null;
  } catch (err) {
    alert("Geocode was not successful for the following reason: " + err);
    return null;
  }
};
export const GetCoordinatesFromAddress = async (address) => {
  return await GetGeocode({
    address: address,
  });
};
