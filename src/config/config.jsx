export default {
  apiUrl: 'https://api.yourdomain.com', // Replace with your actual API URL
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
  defaultRegion: {
    latitude: 9.0222,  // Default to Addis Ababa, Ethiopia
    longitude: 38.7468,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  appName: 'My Truck',
  version: '1.0.0',
  supportEmail: 'support@yourdomain.com',
  supportPhone: '+251XXXXXXXXX',
  // Commission rates
  commissionRates: {
    platform: 0.10, // 10% platform fee
    affiliate: 0.05, // 5% affiliate commission
  },
  // Truck types
  truckTypes: [
    { id: 'small', name: 'Small Truck', capacity: '1-2 tons', image: require('../../assets/images/small-truck.png') },
    { id: 'medium', name: 'Medium Truck', capacity: '3-5 tons', image: require('../../assets/images/medium-truck.png') },
    { id: 'large', name: 'Large Truck', capacity: '6-10 tons', image: require('../../assets/images/large-truck.png') },
  ],
};
