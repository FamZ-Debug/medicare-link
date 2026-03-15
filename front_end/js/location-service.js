/**
 * MediCare Link Location Service
 * Provides shared GPS, Map, and Geocoding utility functions.
 */

const LocationService = {
    DEFAULT_CENTER: { lat: 13.7563, lng: 100.5018 }, // Bangkok

    /**
     * Get current GPS coordinates
     */
    getCurrentPosition: function () {
        return new Promise((resolve, reject) => {
            if (!('geolocation' in navigator)) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        });
    },

    /**
     * Reverse geocode coordinates to address string using Nominatim
     */
    reverseGeocode: async function (lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            return data.display_name || 'ไม่พบที่อยู่';
        } catch (error) {
            console.error('Geocoding error:', error);
            return 'ระบุที่อยู่ไม่ได้';
        }
    },

    /**
     * Initialize a Leaflet map with standard MediCare Link styling
     */
    initMap: function (elementId, center, options = {}) {
        const map = L.map(elementId, options).setView([center.lat, center.lng], options.zoom || 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        return map;
    },

    /**
     * Create a standard user location marker
     */
    createUserMarker: function (map, position, draggable = false) {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="position: relative;">
                    <div style="width: 40px; height: 40px; background: #14b8a6; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4); border: 3px solid white;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        return L.marker([position.lat, position.lng], {
            icon: customIcon,
            draggable: draggable
        }).addTo(map);
    },

    /**
     * Save location to local storage
     */
    saveToLocal: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * Get location from local storage
     */
    getFromLocal: function (key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
};

// Export to window if not in a module environment
window.LocationService = LocationService;
