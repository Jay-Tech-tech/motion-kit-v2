let Aktiv = 0
let Verfolgung = 0
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Aktiv = 1
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Verfolgung = 1
})
basic.forever(function () {
    if (Aktiv == 1) {
        if (maqueen.ultrasonic(maqueen.DistanceUnit.Centimeters) < 3) {
            basic.showIcon(IconNames.ArrowSouth)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
            maqueen.writeLED(maqueen.Led.LedAll, maqueen.LedSwitch.LedOn)
            basic.pause(1000)
        }
    }
    if (Verfolgung == 1) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Dark)) {
        	
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Dark)) {
        	
        }
    }
})
