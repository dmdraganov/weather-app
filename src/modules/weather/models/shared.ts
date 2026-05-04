/** Represents a temperature value. Extend later with .fahrenheit if needed. */
export interface Temperature {
  celsius: number;
}

export interface Wind {
  speedKph: number;
}

export interface Precipitation {
  rainChance: number;
  snowChance: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
}
