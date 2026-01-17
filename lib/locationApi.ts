import * as Location from "expo-location";

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string | null;
  region: string | null;
  country: string | null;
  formattedAddress: string;
}

export interface LocationResult {
  data: LocationData | null;
  error: string | null;
}

/**
 * Request location permissions from the user
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
};

/**
 * Get the user's current location with address
 */
export const getCurrentLocation = async (): Promise<LocationResult> => {
  try {
    // Request permission first
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return {
        data: null,
        error: "Location permission denied",
      };
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;

    // Reverse geocode to get address
    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const city = address?.city || address?.subregion || null;
    const region = address?.region || null;
    const country = address?.country || null;

    // Format the address string
    const addressParts = [city, region, country].filter(Boolean);
    const formattedAddress = addressParts.join(", ") || "Unknown location";

    return {
      data: {
        latitude,
        longitude,
        city,
        region,
        country,
        formattedAddress,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error getting location:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to get location",
    };
  }
};

/**
 * Get only coordinates (faster, no reverse geocoding)
 */
export const getCoordinates = async (): Promise<{
  data: { latitude: number; longitude: number } | null;
  error: string | null;
}> => {
  try {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return {
        data: null,
        error: "Location permission denied",
      };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      data: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to get coordinates",
    };
  }
};
