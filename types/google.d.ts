declare namespace google.maps {
  class Map {
    constructor(element: Element, options?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    fitBounds(bounds: LatLngBounds): void;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  class Polyline {
    constructor(options: PolylineOptions);
    setMap(map: Map | null): void;
  }

  class LatLngBounds {
    constructor();
    extend(latLng: LatLng | LatLngLiteral): void;
  }

  interface MapOptions {
    center: LatLng | LatLngLiteral;
    zoom: number;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map: Map;
    title?: string;
    icon?: Symbol;
  }

  interface PolylineOptions {
    path: Array<LatLng | LatLngLiteral>;
    geodesic?: boolean;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    map: Map;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class Symbol {
    constructor(options: SymbolOptions);
  }

  interface SymbolOptions {
    path: SymbolPath;
    fillColor?: string;
    fillOpacity?: number;
    strokeWeight?: number;
    scale?: number;
  }

  enum SymbolPath {
    CIRCLE
  }
}

interface Window {
  google: typeof google;
} 