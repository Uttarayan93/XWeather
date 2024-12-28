import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [apiData, setApiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle = {
    height: "50px",
    marginTop: "20px",
    marginRight: "5px",
    width: "200px",
    borderRadius: "3px",
    border: "none",
    fontSize: "20px",
    textAlign: "center",
  };

  const buttonStyle = {
    height: "55px",
    width: "100px",
    marginTop: "20px",
    borderRadius: "3px",
    border: "none",
    backgroundColor: "#38bf26",
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "20px",
    cursor: "pointer",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "white",
    width: "15vw",
    height: "100px",
    textAlign: "center",
  };

  const fetchDetails = (searchCity) => {
    if (!searchCity) {
      alert("Please enter a city name.");
      return;
    }

    // Start loading
    setIsLoading(true);

    const key = "63cbf2dc74ae4aeebe754534242812";
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${searchCity}&aqi=no`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log("API Data:", data);

        if (data.error) {
          alert("Failed to fetch weather data");
          setApiData({});
        } else {
          setApiData(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("API Response Failed:", error);
        alert("Failed to fetch weather data");
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#b9e0fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Search Bar (input) and Button */}
      <div>
        <input
          style={inputStyle}
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchDetails(city)} style={buttonStyle}>
          Search
        </button>
      </div>

      {/* Loading Message (p) */}
      {isLoading && (
        <p style={{ marginTop: "10px", fontSize: "18px" }}>Loading data…</p>
      )}

      {/* Weather Data Cards */}
      {apiData.current && (
        <div
          className="weather-cards"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div className="weather-card" style={cardStyle}>
            <h4>Temperature</h4>
            <p>{apiData.current.temp_c} °C</p>
          </div>

          <div className="weather-card" style={cardStyle}>
            <h4>Humidity</h4>
            <p>{apiData.current.humidity} %</p>
          </div>

          <div className="weather-card" style={cardStyle}>
            <h4>Condition</h4>
            <p>{apiData.current.condition.text}</p>
          </div>

          <div className="weather-card" style={cardStyle}>
            <h4>Wind Speed</h4>
            <p>{apiData.current.gust_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
