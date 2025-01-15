export default async function handler(req, res) {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    // Simulate API calls
    // Replace the URLs and keys with real ones
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${city}`);
    if (!response.ok) {
      throw new Error(`WeatherAPI responded with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({ weather: data });
  } catch (error) {
    console.error("Error in weather API:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
