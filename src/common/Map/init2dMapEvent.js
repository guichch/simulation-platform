import { Lmap } from "./init2dMap"

export default (map) => {
    Lmap.on('mousemove', e => {
        let _longitude = "";
        let _latitude = "";
        if (e.latlng.lat < 0) {
            _latitude = -e.latlng.lat.toFixed(4) + "°S"
        } else if (e.latlng.lat > 0) {
            _latitude = e.latlng.lat.toFixed(4) + "°N"
        } else {
            _latitude = e.latlng.lat.toFixed(4) + "°"
        }

        if (e.latlng.lng < 0) {
            _longitude = -e.latlng.lng.toFixed(4) + "°W"
        } else if (e.latlng.lng > 0) {
            _longitude = e.latlng.lng.toFixed(4) + "°E"
        } else {
            _longitude = e.latlng.lng.toFixed(4) + "°"
        }
        map.$store.commit({
            type: 'SET_FOOT_STATUS',
            showstatus: true,
            longitude: _longitude,
            latitude: _latitude,
            height: 0
        })
    })
}