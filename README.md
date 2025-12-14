# Weather App

A beautiful, modern Vue 3 application built with TypeScript that displays weather information from OpenWeatherMap API. Track weather for multiple locations with an elegant, responsive interface.

## ✨ Features

- 🌍 **Multi-Location Support**: Add and track weather for multiple cities simultaneously
- 🎨 **Beautiful UI**: Modern gradient designs with weather-themed color schemes
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- 🌡️ **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- 💾 **Persistent Storage**: Locations and preferences saved in localStorage
- ⚡ **Real-time Weather Data**: Current weather conditions, temperature, humidity, and wind speed
- 🎭 **Dynamic Themes**: Card colors adapt based on weather conditions
- ✨ **Smooth Animations**: Elegant transitions when adding/removing locations
- 🔒 **Error Handling**: User-friendly error messages for better UX
- 🚀 **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Technology Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Modern styling with gradients and animations

## 📋 Prerequisites

- Node.js 18+ and npm
- OpenWeatherMap API key (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JCDHorse/weather-app.git
cd weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

1. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

3. Open `.env` and add your API key:

```env
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── WeatherCard.vue      # Individual weather card component
│   ├── LocationInput.vue    # Search input for adding locations
│   └── WeatherList.vue      # Grid layout for weather cards
├── composables/
│   └── useWeather.ts        # Weather state management and logic
├── types/
│   └── weather.ts           # TypeScript type definitions
├── services/
│   └── weatherApi.ts        # API service for weather data
├── App.vue                  # Main application component
├── main.ts                  # Application entry point
└── style.css                # Global styles
```

## 🎯 Usage

1. **Add a Location**: Enter a city name in the search bar and press Enter or click the + button
2. **View Weather**: See current weather data displayed in beautiful cards
3. **Toggle Temperature**: Click the °C/°F button to switch between units
4. **Remove Location**: Click the × button on any weather card to remove it
5. **Auto-Save**: Your locations and preferences are automatically saved

## 🎨 Features in Detail

### Weather Cards
- Display location name and country
- Current temperature with feels-like value
- Weather condition with icon
- Humidity percentage
- Wind speed in km/h
- Color-coded based on weather conditions (sunny, cloudy, rainy, etc.)
- Smooth hover effects and animations

### Location Management
- Real-time city search
- Duplicate detection
- Persistent storage using localStorage
- Easy removal with animated transitions

### User Experience
- Loading indicators during API calls
- Comprehensive error handling
- Empty state guidance
- Responsive grid layout
- Keyboard accessibility (Enter to add location)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key | Yes |

## 🌐 API Reference

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):
- **Endpoint**: Current Weather Data
- **Units**: Metric (Celsius, km/h)
- **Data**: Temperature, humidity, wind speed, weather conditions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from OpenWeatherMap
- Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/)

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Enjoy tracking weather around the world! ⛅🌍**

