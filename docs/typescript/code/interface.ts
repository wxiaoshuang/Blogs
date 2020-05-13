interface ClockConstructor {
    new (hour: number, minute: number);
}
// Class 'Clock' incorrectly implements interface 'ClockConstructor'.   Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'
class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
