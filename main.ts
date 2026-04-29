let Aktiv = 0
let Verfolgung = 0
let Entfernung = 0
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Up), function () {
    if (Aktiv == 0) {
        Verfolgung = 1
    }
})
function FunktionAktiv() {
    // 1. MESSUNG: Wir holen uns JETZT den aktuellen Wert
    Entfernung = maqueen.ultrasonic(maqueen.DistanceUnit.Centimeters)
    // 2. ENTSCHEIDUNG: Zuerst das Hindernis prüfen (Gefahr!)
    // Wir prüfen auf > 0, da 0 oft ein Fehlerwert des Sensors ist
    if (Entfernung < 25 && Entfernung > 0) {
        // HINDERNIS GEFUNDEN
        basic.showIcon(IconNames.ArrowNorth)
        // Ausweichen
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
        basic.pause(500)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
        basic.pause(400)
    } else if (Entfernung >= 25) {
        // WEG IST FREI
        basic.showIcon(IconNames.ArrowSouth)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    }
}
function FunktionVerfolgung() {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Dark) && maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Dark)) {
        // Geradeaus
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Dark)) {
        // Nach rechts lenken
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 20)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Dark)) {
        // Nach links lenken
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 20)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Bright) && maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Bright)) {
        // Geradeaus
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    }
}
// 1. EREIGNISSE (Interrupts) - Stehen ganz außen!
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Up), function () {
    if (Verfolgung == 0) {
        Entfernung = maqueen.ultrasonic(maqueen.DistanceUnit.Centimeters)
        Aktiv = 1
    }
})
// STOPP-FUNKTION
function Stop() {
    basic.showIcon(IconNames.No)
    Aktiv = 0
    Verfolgung = 0
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.writeLED(maqueen.Led.LedAll, maqueen.LedSwitch.LedOff)
}
