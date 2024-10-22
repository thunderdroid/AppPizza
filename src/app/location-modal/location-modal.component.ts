import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent {
  selectedSegment: string = 'delivery';
  searchQuery: string = '';
  suggestions: any[] = [];

  constructor(private modalController: ModalController) {}

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async getCurrentLocation() {
    if (this.isWebPlatform()) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            this.reverseGeocode(lat, lng);

            // Agregar un ítem para la ubicación actual
            this.suggestions.unshift({ description: 'Ubicación actual', lat, lng });
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          }
        );
      } else {
        console.error('Geolocalización no soportada en este navegador.');
      }
    } else {
      // Capacitor Geolocation para dispositivos móviles
      const permission = await Geolocation.requestPermissions();

      if (permission.location === 'granted') {
        const coordinates = await Geolocation.getCurrentPosition();
        const lat = coordinates.coords.latitude;
        const lng = coordinates.coords.longitude;

        this.reverseGeocode(lat, lng);

        // Agregar un ítem para la ubicación actual
        this.suggestions.unshift({ description: 'Ubicación actual', lat, lng });
      } else {
        console.error('Permisos de ubicación no concedidos');
      }
    }
  }

  reverseGeocode(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        this.searchQuery = results[0].formatted_address;
        console.log('Dirección actual:', this.searchQuery);
      } else {
        console.error('Geocodificación inversa fallida:', status);
      }
    });
  }

  searchAddress() {
    if (this.searchQuery.length < 3) {
      this.suggestions = [];
      return;
    }

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: this.searchQuery, componentRestrictions: { country: 'cl' } },
      (predictions: any[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          console.log('Predictions:', predictions);
          this.suggestions = predictions;
        } else {
          console.error('Error al obtener sugerencias:', status);
          this.suggestions = [];
        }
      }
    );
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.description;
    this.suggestions = [];
  }

  isWebPlatform(): boolean {
    return !((window as any).Capacitor && (window as any).Capacitor.isNativePlatform());
  }
}
