import { Level } from "./models"
export const LEVELS: Level[] = [
    {
        name: "Geolocation",
        route: "/levels/geolocation",
        bonusTime_sec: 10 * 60,
    },
    {
        name: "Distanz",
        route: "/levels/distance",
        bonusTime_sec: 10 * 60,
    },
    {
        name: "QR",
        route: "/levels/qr",
        bonusTime_sec: 60,
    },
    {
        name: "Sensor",
        route: "/levels/sensor",
        bonusTime_sec: 10,
    },
    {
        name: "Geräte Status",
        route: "/levels/device-status",
        bonusTime_sec: 50,
    },
    {
        name: "WLAN",
        route: "/levels/wlan",
        bonusTime_sec: 40,
    },
]