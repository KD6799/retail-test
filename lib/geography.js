function isValidBounds(bounds) {
    return bounds &&
        Number.isFinite(bounds.min_lat) && Number.isFinite(bounds.max_lat) &&
        Number.isFinite(bounds.min_lng) && Number.isFinite(bounds.max_lng) &&
        bounds.min_lat >= -90 && bounds.max_lat <= 90 &&
        bounds.min_lng >= -180 && bounds.max_lng <= 180 &&
        bounds.min_lat < bounds.max_lat && bounds.min_lng < bounds.max_lng;
}

function isWithinBounds(latitude, longitude, bounds) {
    return Number.isFinite(latitude) && Number.isFinite(longitude) &&
        latitude >= bounds.min_lat && latitude <= bounds.max_lat &&
        longitude >= bounds.min_lng && longitude <= bounds.max_lng;
}

function generateGrid(bounds, spacingKm, centerLat) {
    const latDegPerKm = 1 / 110.574;
    const lngDegPerKm = 1 / (111.320 * Math.cos(centerLat * Math.PI / 180));
    const latStep = spacingKm * latDegPerKm;
    const lngStep = spacingKm * lngDegPerKm;
    const grid = [];

    for (let lat = bounds.min_lat; lat <= bounds.max_lat; lat += latStep) {
        for (let lng = bounds.min_lng; lng <= bounds.max_lng; lng += lngStep) {
            grid.push({ lat, lng });
        }
    }
    return grid;
}

module.exports = { generateGrid, isValidBounds, isWithinBounds };
