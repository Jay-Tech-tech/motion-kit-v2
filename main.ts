let Verfolgung = 0
let Aktiv = 0
let Entfernung = 0
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Up), function () {
    Verfolgung = 1
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Up), function () {
    Aktiv = 1
})
basic.forever(function () {
    Entfernung = maqueen.ultrasonic(maqueen.DistanceUnit.Centimeters)
    if (input.pinIsPressed(TouchPin.P1) && input.pinIsPressed(TouchPin.P1)) {
        maqueen.motorStop(maqueen.Motors.All)
        maqueen.writeLED(maqueen.Led.LedAll, maqueen.LedSwitch.LedOff)
    }
    if (Aktiv == 1) {
        if (Entfernung > 3) {
            basic.showIcon(IconNames.ArrowSouth)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
            maqueen.writeLED(maqueen.Led.LedAll, maqueen.LedSwitch.LedOn)
            basic.pause(500)
        }
        basic.showIcon(IconNames.ArrowNorth)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
        basic.pause(500)
    }
    if (Verfolgung == 1) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Dark)) {
        	
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Dark)) {
        	
        }
    }
})
