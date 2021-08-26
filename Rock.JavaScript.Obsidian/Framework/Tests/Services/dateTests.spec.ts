import assert = require("assert");
import { formatAspDate } from "@Obsidian/Services/date";

describe("formatAspDate Suite", () => {
    it("Short Date", () => {
        const date = new Date(2021, 4 - 1, 7);

        assert.equal(formatAspDate(date, "M-dd-yyyy"), "4-07-2021");
    });

    it("Long Date", () => {
        const date = new Date(2021, 4 - 1, 7);

        assert.equal(formatAspDate(date, "MMMM d, yyyy"), "April 7, 2021");
    });

    /*
     * Seconds: s
     */
    it('Seconds under 10 produces single digit with "s"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:30:09"), "%s"), "9");
    });

    it('Seconds over 10 produces double digit with "s"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:30:14"), "%s"), "14");
    });

    /*
     * Seconds: ss
     */
    it('Seconds under 10 produces double digits with "ss"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:30:09"), "ss"), "09");
    });

    it('Seconds over 10 produces double digits with "ss"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:30:14"), "ss"), "14");
    });

    /*
     * Minutes: m
     */
    it('Minutes under 10 produces single digit with "m"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:09:00"), "%m"), "9");
    });

    it('Minutes over 10 produces double digit with "m"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:14:00"), "%m"), "14");
    });

    /*
     * Minutes: mm
     */
    it('Minutes under 10 produces double digits with "mm"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:09:00"), "mm"), "09");
    });

    it('Minutes over 10 produces double digits with "mm"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:14:00"), "mm"), "14");
    });

    /*
     * Hours: h
     */
    it('Hours under 10 produces single digit with "h"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T09:00:00"), "%h"), "9");
    });

    it('Hours over 10 produces double digit with "h"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T11:00:00"), "%h"), "11");
    });

    it('Hours over 12 and under 20 produces single digit with "h"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T14:00:00"), "%h"), "2");
    });

    it('Hours over 20 produces double digit with "h"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T22:00:00"), "%h"), "10");
    });

    /*
     * Hours: hh
     */
    it('Hours under 10 produces double digits with "hh"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T09:00:00"), "hh"), "09");
    });

    it('Hours over 10 produces double digits with "hh"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T11:00:00"), "hh"), "11");
    });

    it('Hours over 12 and under 20 produces double digits with "hh"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T14:00:00"), "hh"), "02");
    });

    it('Hours over 20 produces double digit with "hh"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T22:00:00"), "hh"), "10");
    });

    /*
     * Hours: H
     */
    it('Hours under 10 produces single digit with "H"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T09:00:00"), "%H"), "9");
    });

    it('Hours over 10 produces double digit with "H"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T11:00:00"), "%H"), "11");
    });

    it('Hours over 12 produces double digit with "H"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T14:00:00"), "%H"), "14");
    });

    /*
     * Hours: HH
     */
    it('Hours under 10 produces double digit with "HH"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T09:00:00"), "HH"), "09");
    });

    it('Hours over 10 produces double digit with "HH"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T11:00:00"), "HH"), "11");
    });

    it('Hours over 12 produces double digit with "HH"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T14:00:00"), "HH"), "14");
    });

    /*
     * Milliseconds
     */
    it("Millisecond Values", () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "%f"), "6");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.05"), "%f"), "0");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "ff"), "61");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.005"), "ff"), "00");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "fff"), "617");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.0005"), "fff"), "000");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175000"), "ffff"), "6170");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.00005"), "ffff"), "0000");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175400"), "fffff"), "61700");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.000005"), "fffff"), "00000");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175420"), "ffffff"), "617000");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.0000005"), "ffffff"), "000000");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175425"), "fffffff"), "6170000");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.0001150"), "fffffff"), "0000000");
    });

    it("Millisecond Optional Values", () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "%F"), "6");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.05"), "%F"), "");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "FF"), "61");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.005"), "FF"), "");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "FFF"), "617");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.0005"), "FFF"), "");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175000"), "FFFF"), "6170");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.00005"), "FFFF"), "");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175400"), "FFFFF"), "61700");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.000005"), "FFFFF"), "");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175420"), "FFFFFF"), "617000");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.0000005"), "FFFFFF"), "");

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6175425"), "FFFFFFF"), "6170000");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.0001150"), "FFFFFFF"), "");
    });

    /*
     * Days: d
     */
    it('Days under 10 produces single digit with "d"', () => {
        assert.equal(formatAspDate(new Date("2009-06-04T09:00:00"), "%d"), "4");
    });

    it('Days over 10 produces double digit with "d"', () => {
        assert.equal(formatAspDate(new Date("2009-06-14T09:00:00"), "%d"), "14");
    });

    /*
     * Days: dd
     */
    it('Days under 10 produces double digit with "dd"', () => {
        assert.equal(formatAspDate(new Date("2009-06-04T09:00:00"), "dd"), "04");
    });

    it('Days over 10 produces double digit with "dd"', () => {
        assert.equal(formatAspDate(new Date("2009-06-14T09:00:00"), "dd"), "14");
    });

    /*
     * Days: ddd
     */
    it('Days produces abbreviated name with "ddd"', () => {
        assert.equal(formatAspDate(new Date("2009-06-12T09:00:00"), "ddd"), "Fri");
    });

    /*
     * Days: dddd
     */
    it('Days produces full name with "dddd"', () => {
        assert.equal(formatAspDate(new Date("2009-06-12T09:00:00"), "dddd"), "Friday");
    });

    /*
     * Months: M
     */
    it('Months under 10 produces single digit with "M"', () => {
        assert.equal(formatAspDate(new Date("2009-06-04T09:00:00"), "%M"), "6");
    });

    it('Months over 10 produces double digit with "M"', () => {
        assert.equal(formatAspDate(new Date("2009-11-14T09:00:00"), "%M"), "11");
    });

    /*
     * Months: MM
     */
    it('Months under 10 produces double digit with "MM"', () => {
        assert.equal(formatAspDate(new Date("2009-06-04T09:00:00"), "MM"), "06");
    });

    it('Months over 10 produces double digit with "MM"', () => {
        assert.equal(formatAspDate(new Date("2009-11-14T09:00:00"), "MM"), "11");
    });

    /*
     * Months: MMM
     */
    it('Months produces abbreviated name with "MMM"', () => {
        assert.equal(formatAspDate(new Date("2009-06-12T09:00:00"), "MMM"), "Jun");
    });

    /*
     * Months: MMMM
     */
    it('Months produces full name with "MMMM"', () => {
        assert.equal(formatAspDate(new Date("2009-06-12T09:00:00"), "MMMM"), "June");
    });

    /*
     * Years: y
     */
    it('Years produces expected values with "y"', () => {
        assert.equal(formatAspDate(new Date("0001-01-01T00:00:00"), "%y"), "1");
        assert.equal(formatAspDate(new Date("0900-01-01T00:00:00"), "%y"), "0");
        assert.equal(formatAspDate(new Date("1900-01-01T00:00:00"), "%y"), "0");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30"), "%y"), "9");
        assert.equal(formatAspDate(new Date("2019-06-15T13:45:30"), "%y"), "19");
    });

    /*
     * Years: yy
     */
    it('Years produces expected values with "yy"', () => {
        assert.equal(formatAspDate(new Date("0001-01-01T00:00:00"), "yy"), "01");
        assert.equal(formatAspDate(new Date("0900-01-01T00:00:00"), "yy"), "00");
        assert.equal(formatAspDate(new Date("1900-01-01T00:00:00"), "yy"), "00");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30"), "yy"), "09");
        assert.equal(formatAspDate(new Date("2019-06-15T13:45:30"), "yy"), "19");
    });

    /*
     * Years: yyy
     */
    it('Years produces expected values with "yyy"', () => {
        assert.equal(formatAspDate(new Date("0001-01-01T00:00:00"), "yyy"), "001");
        assert.equal(formatAspDate(new Date("0900-01-01T00:00:00"), "yyy"), "900");
        assert.equal(formatAspDate(new Date("1900-01-01T00:00:00"), "yyy"), "1900");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30"), "yyy"), "2009");
        assert.equal(formatAspDate(new Date("2019-06-15T13:45:30"), "yyy"), "2019");
    });

    /*
     * Years: yyyy
     */
    it('Years produces expected values with "yyyy"', () => {
        assert.equal(formatAspDate(new Date("0001-01-01T00:00:00"), "yyyy"), "0001");
        assert.equal(formatAspDate(new Date("0900-01-01T00:00:00"), "yyyy"), "0900");
        assert.equal(formatAspDate(new Date("1900-01-01T00:00:00"), "yyyy"), "1900");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30"), "yyyy"), "2009");
        assert.equal(formatAspDate(new Date("2019-06-15T13:45:30"), "yyyy"), "2019");
    });

    /*
     * Years: yyyyy
     */
    it('Years produces expected values with "yyyyy"', () => {
        assert.equal(formatAspDate(new Date("0001-01-01T00:00:00"), "yyyyy"), "00001");
        assert.equal(formatAspDate(new Date("0900-01-01T00:00:00"), "yyyyy"), "00900");
        assert.equal(formatAspDate(new Date("1900-01-01T00:00:00"), "yyyyy"), "01900");
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30"), "yyyyy"), "02009");
        assert.equal(formatAspDate(new Date("2019-06-15T13:45:30"), "yyyyy"), "02019");
    });

    /*
     * Period: g
     */
    it('Year > 0 produces "A.D." with "g"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "%g"), "A.D.");
    });

    it('Year < 0 produces "B.C." with "g"', () => {
        assert.equal(formatAspDate(new Date(-4, 6, 15), "%g"), "B.C.");
    });

    /*
     * Period: gg
     */
    it('Year > 0 produces "A.D." with "gg"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "gg"), "A.D.");
    });

    it('Year < 0 produces "B.C." with "gg"', () => {
        assert.equal(formatAspDate(new Date(-4, 6, 15), "gg"), "B.C.");
    });

    /*
     * Time Zone: K
     */
    it('TimeZone produces local time zone with "K"', () => {
        const offset = new Date().getTimezoneOffset();
        const offsetHour = Math.floor(offset / 60);
        const offsetMinute = offset % 60;
        const expected = `${offset > 0 ? "-" : "+"}${offsetHour < 10 ? "0" : ""}${offsetHour}:${offsetMinute < 10 ? "0" : ""}${offsetMinute}`;

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "%K"), expected);
    });

    /*
     * Time Zone: z
     */
    it('TimeZone produces local time zone with "z"', () => {
        const offset = new Date().getTimezoneOffset();
        const offsetHour = Math.floor(offset / 60);
        const expected = `${offset > 0 ? "-" : "+"}${offsetHour}`;

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "%z"), expected);
    });

    /*
     * Time Zone: zz
     */
    it('TimeZone produces local time zone with "zz"', () => {
        const offset = new Date().getTimezoneOffset();
        const offsetHour = Math.floor(offset / 60);
        const expected = `${offset > 0 ? "-" : "+"}${offsetHour < 10 ? "0" : ""}${offsetHour}`;

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "zz"), expected);
    });

    /*
     * Time Zone: zzz
     */
    it('TimeZone produces local time zone with "K"', () => {
        const offset = new Date().getTimezoneOffset();
        const offsetHour = Math.floor(offset / 60);
        const offsetMinute = offset % 60;
        const expected = `${offset > 0 ? "-" : "+"}${offsetHour < 10 ? "0" : ""}${offsetHour}:${offsetMinute < 10 ? "0" : ""}${offsetMinute}`;

        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "zzz"), expected);
    });

    /*
     * Date Separator: /
     */
    it('Date Separator produces US slash with "/"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "M/d/yy"), "6/15/09");
    });

    /*
     * Time Separator: :
     */
    it('Time Separator produces US colon with ":"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "h:m"), "1:45");
    });

    /*
     * Escape sequence: \
     */
    it('Escape sequence produced literal character with "\\"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "h:\\m"), "1:m");
    });

    /*
     * Escape sequence: '
     */
    it('Escape sequence produced literal character with "\'"', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), "h'h:m'"), "1h:m");
    });

    /*
     * Escape sequence: "
     */
    it('Escape sequence produced literal character with \'"\'', () => {
        assert.equal(formatAspDate(new Date("2009-06-15T13:45:30.6170000"), 'h"h:m"'), "1h:m");
    });

    /*
     * Standard date format: F
     */
    it('Standard date format "F" produces expected value', () => {
        const date = new Date(2008, 4-1, 10, 6, 30, 0);

        assert.equal(formatAspDate(date, "F"), "Thursday, April 10, 2008 6:30:00 AM");
    });
});
