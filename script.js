        // JavaScript to toggle the sidebar
        const menuToggle = document.getElementById("menu-toggle");
        const sidebar = document.getElementById("sidebar");
        const closeSidebar = document.getElementById("close-sidebar");

        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("hidden");
        });

        closeSidebar.addEventListener("click", () => {
            sidebar.classList.add("hidden");
        });

    // Inisialisasi peta
 document.addEventListener("DOMContentLoaded", function () {
        var map = L.map('map', {
                center: [-6.1173421,120.4664315],
                zoom: 18,
                minZoom: 12,
                maxZoom: 20
            });

            
// Lapisan Peta OSM
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Lapisan Peta Satelit
const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 19,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
});



// Menambahkan kontrol layer
const baseMaps = {
  "default":map,
  "Satelit": satelliteLayer,
   "OSM":osmLayer,
};


        // Menambahkan kontrol untuk mengganti mode peta
        L.control.layers(baseMaps).addTo(map);





        // Gaya untuk layer GeoJSON
        const defaultStyle = {
            color: "#f0f0f0",
            weight: 1.5,
            opacity: 0.8,
            fillColor: "#45F450",
            fillOpacity: 1,
        };

        const mesjidIcon = L.icon({
            iconUrl: 'mesjid1.png',
            iconColor: "#350",
            iconSize: [25, 25],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
        });

        // Ikon untuk sekolah
        const sekolahIcon = L.icon({
            iconUrl: 'sekolah1.png',
            iconColor: "#000",
            iconSize: [25, 25],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
        });

        // Memuat semua GeoJSON, agar langsung tampil tanpa harus diklik
        loadGeoJSON("./sekolah.geojson", sekolahIcon);
        loadGeoJSON("./Mesjid.geojson", mesjidIcon);

        const geojsonFiles = [
    { 
        url: "./BentengUtara.geojson", 
        style: { color: "#f0f0f0", weight: 1.5, opacity: 0.8, fillColor: "rgba(255, 200, 0, 0.8)", fillOpacity: 0.5 } 
    },
    { 
        url: "./BentengPusat.geojson", 
        style: { color: "#f0f0f0", weight: 1.5, opacity: 0.8, fillColor: "rgba(255, 165, 0, 0.8)", fillOpacity: 0.5 } 
    },
    { 
        url: "./BentengSelatan.geojson", 
        style: { color: "#f0f0f0", weight: 1.5, opacity: 0.8, fillColor: "rgba(178, 125, 11, 0.9)", fillOpacity: 0.5 } 
    },
    { 
        url: "./jalanBentengku.geojson", 
        style: { color: "#333", weight: 3, opacity: 1 } 
    }
];


        geojsonFiles.forEach((file) => {
            fetch(file.url)
                .then((response) => response.json())
                .then((geojsonData) => {
                    L.geoJSON(geojsonData, {
                        style: file.style,
                        onEachFeature: function (feature, layer) {
                            // Pastikan fitur memiliki obj properties 'nama'
                            if (feature.properties && feature.properties.nama) {
                                layer.bindPopup(`${feature.properties.nama}`);
                            } else {
                                console.warn('Fitur tidak memiliki properti "nama":', feature);
                            }
                        }
                    }).addTo(map);
                })
                .catch((error) => console.error(`Error loading GeoJSON from ${file.url}:`, error));
        });

      

       
const umkmData = {
  name: "Simbiosa",
  rating: "4.2",
  reviews: [
   
  ],
  category: "cofe coffee",
  buka: "Buka pukul 08:00 am · Tutup pukul 22:00 pm🔻",
  alamat: "Jl. Jend. Ahmad Yani No.12, Benteng, Kec. Benteng, Kab. Kepulauan Selayar, Sulawesi Selatan",
  coords: [-6.1173421,120.4664315],
  imageUrl: "./simbiosa1.jpg",
 
};

       const marker = L.marker(umkmData.coords).addTo(map);

// Membuat konten HTML untuk popup
const reviewHTML = umkmData.reviews.map(review => `
    <div class="review">
        <h3>${review.name}</h3>
        <span class="stars">${review.stars}</span>
        <p class="review-date">${review.date}</p>
        <p>${review.text}</p>
    </div>
`).join("");

// Menambahkan konten popup
marker.bindPopup(`
    <div class="popup-container">
        <div class="popup-header">${umkmData.name}</div>
        <div class="popup-rating">⭐ ${umkmData.rating} <span>(${umkmData.reviews.length})</span></div>
        <div class="popup-category">${umkmData.category}</div>
        <img src="${umkmData.imageUrl}" alt="${umkmData.name}" class="popup-image" />
        <div class="popup-address"><i class="fas fa-map-marker-alt"></i> ${umkmData.alamat}</div>
        <div class="popup-hours"><i class="fas fa-clock"></i> <span>${umkmData.buka}</span></div>
        <div class="popup-contact"><i class="fas fa-phone-alt"></i> ${umkmData.phone}</div>
        <br>
        <h1>Ulasan Pengguna</h1>
        <div>${reviewHTML}</div>
    </div>
`);

        // Fungsi untuk memuat GeoJSON
        function loadGeoJSON(url, icon) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(geojsonData => {
                    L.geoJSON(geojsonData, {
                        onEachFeature: function (feature, layer) {
                            if (feature.properties && feature.properties.nama) {
                                layer.bindPopup(`${feature.properties.nama}`);
                            }
                        },
                        pointToLayer: function (feature, latlng) {
                            return L.marker(latlng, { icon: icon });
                        }
                    }).addTo(map);
                })
                .catch(error => console.error(`Error loading ${url} GeoJSON:`, error));
        }
    });