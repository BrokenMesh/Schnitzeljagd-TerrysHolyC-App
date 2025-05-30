import { Level } from "./models"
export const LEVELS: Level[] = [
    {
        name: "Geolocation",
        route: "/geolocation",
        bonusTime_sec: 10 * 60,
    },
    {
        name: "Distanz",
        route: "/distance",
        bonusTime_sec: 10 * 60,
    },
    {
        name: "QR",
        route: "/qr",
        bonusTime_sec: 60,
    },
    {
        name: "Sensor",
        route: "/sensor",
        bonusTime_sec: 10,
    },
    {
        name: "Geräte Status",
        route: "/device-status",
        bonusTime_sec: 50,
    },
    {
        name: "WLAN",
        route: "/wlan",
        bonusTime_sec: 40,
    },
]