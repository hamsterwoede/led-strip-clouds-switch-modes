function ClappingClouds () {
    if (input.soundLevel() > Ruisvloer) {
        strip.setBrightness(100 * (input.soundLevel() / (255 - Ruisvloer)))
        isBright = true
    } else {
        strip.setBrightness(0)
        strip.easeBrightness()
        isBright = false
    }
    strip.showColor(neopixel.hsl(KleurWaarde, 255, 50))
}
function Wolk (Lengte: number) {
    if (WolkLengte > 0) {
        strip.setPixelColor(0, neopixel.hsl(200, randint(0, 100), randint(0, 100)))
        strip.show()
        strip.shift(1)
        WolkLengte += -1
    } else {
        WolkAan = false
    }
    basic.pause(5000 / Snelheid)
}
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . # # . .
        . . # . .
        . . # . .
        . . # . .
        . # # # .
        `)
    State = 1
})
input.onPinPressed(TouchPin.P2, function () {
    basic.showLeds(`
        . # # # .
        . . . # .
        . . # # .
        . # . . .
        . # # # .
        `)
    State = 2
})
function RGBLed () {
    if (!(isBright)) {
        strip.setBrightness(100)
        strip.easeBrightness()
    }
    isBright = true
    if (KleurWaarde < 360) {
        KleurWaarde += 1
    } else {
        KleurWaarde = 0
    }
    strip.setPixelColor(0, neopixel.hsl(KleurWaarde, 255, 50))
    strip.show()
    strip.shift(1)
}
input.onButtonPressed(Button.AB, function () {
    basic.showLeds(`
        . # # # .
        . # . # .
        . # . # .
        . # . # .
        . # # # .
        `)
    State = 0
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . # # # .
        . . . # .
        . . # # .
        . # . . .
        . # # # .
        `)
    State = 2
})
input.onPinPressed(TouchPin.P1, function () {
    basic.showLeds(`
        . # # . .
        . . # . .
        . . # . .
        . . # . .
        . # # # .
        `)
    State = 1
})
function BlauweLucht () {
    if (KleurWaarde > 230) {
        RuisFactor = RuisFactor + randint(-5, 0) / RuisSchaal
    } else if (KleurWaarde < 190) {
        RuisFactor = RuisFactor + randint(0, 5) / RuisSchaal
    } else {
        RuisFactor = RuisFactor + randint(-3, 3) / RuisSchaal
    }
    if (randint(0, 10) > 8) {
        strip.setPixelColor(0, neopixel.hsl(200, 255, 50))
    } else {
        strip.setPixelColor(0, neopixel.hsl(Math.round(KleurWaarde + RuisFactor), 255, 50))
    }
    strip.show()
    strip.shift(1)
    basic.pause(5000 / Snelheid)
}
let WolkLengte = 0
let Snelheid = 0
let KleurWaarde = 0
let State = 0
let strip: neopixel.Strip = null
let WolkAan = false
let isBright = false
let RuisSchaal = 0
let RuisFactor = 0
let Ruisvloer = 0
Ruisvloer = 80
RuisFactor = 0
RuisSchaal = 20
isBright = true
WolkAan = false
strip = neopixel.create(DigitalPin.P0, 6, NeoPixelMode.RGB)
State = 0
KleurWaarde = 200
Snelheid = 10
let WolkKans = 40
strip.showColor(neopixel.hsl(KleurWaarde, 255, 50))
basic.showLeds(`
    . # # # .
    . # . # .
    . # . # .
    . # . # .
    . # # # .
    `)
basic.forever(function () {
    if (State == 0) {
        if (WolkAan) {
            Wolk(WolkLengte)
        } else {
            BlauweLucht()
            if (randint(0, WolkKans) > WolkKans - 1) {
                WolkLengte = randint(1, 10)
                WolkAan = true
            }
        }
    } else if (State == 1) {
        ClappingClouds()
    } else {
        RGBLed()
    }
})
