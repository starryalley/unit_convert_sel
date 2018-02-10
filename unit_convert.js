// regexp to match numbers preceding the unit
const number_re = /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?)\s?/;

// the long and huge tables storing the unit's name and how to match
// this specific unit from plain text.
// Note that 'unit' property must match 'convert-units' lib's unit definitions
let tables = [
    // ==== angle ====
    {
        unit: "rad",
        re: /(rad|radians?)$/,
    },
    {
        unit: "deg",
        re: /(deg|degrees?)$/,
    },
    {
        unit: "grad",
        re: /(grad|gradians?)$/,
    },
    {
        unit: "arcmin",
        re: /(arcmin|arcminutes?)$/
    },
    {
        unit: "arcsec",
        re: /(arcsec|arcseconds?)$/,
    },
    // ==== apparent power ====
    {
        unit: "VA",
        re: /(va|volt\-amp|volt\-amperes?)$/,
    },
    {
        unit: "mVA",
        re: /(mva|mvolt\-amp|millivolt\-amperes?)$/,
    },
    {
        unit: "kVA",
        re: /(kva|kvolt\-amp|kilovolt\-amperes?)$/,
    },
    {
        unit: "MVA",
        re: /(mva|mvolt\-amp|megavolt\-amperes?)$/,
    },
    {
        unit: "GVA",
        re: /(gva|gvolt\-amp|gigavolt\-amperes?)$/,
    },
    // ==== area ====
    {
        unit: "mm2",
        re: /(mm2|mm²|sq\smm|square\smillimeters?|square\smillimetres?)$/,
    },
    {
        unit: "cm2",
        re: /(cm2|cm²|sq\scm|square\scentimeters?|square\scentimetres?)$/,
    },
    {
        unit: "m2",
        re: /(m2|m²|sq\sm|square\smeters?|square\smetres?)$/,
    },
    {
        unit: "ha",
        re: /hectares?$/,
    },
    {
        unit: "km2",
        re: /(km2|km²|sq\skm|square\skilometers?|square\skilometres?)$/,
    },
    {
        unit: "in2",
        re: /(in2|in²|sq\sin|square\sinch|square\sinches)$/,
    },
    {
        unit: "yd2",
        re: /(yd2|yd²|sq\syd|square\syards?)$/,
    },
    {
        unit: "ft2",
        re: /(ft2|ft²|sq\sft|square\sfeet|square\sfoot)$/,
    },
    {
        unit: "ac",
        re: /acres?$/,
    },
    {
        unit: "mi2",
        re: /(mi2|mi²|sq\smi|square\smiles?)$/,
    },
    // ==== current ====
    // TODO
    // ==== digital ====
    // TODO
    // ==== each ====
    // TODO
    // ==== energy ====
    {
        unit: "Wh",
        re: /(wh|watt-hours?)$/,
    },
    {
        unit: "mWh",
        re: /(mwh|milliwatt-hours?)$/,
    },
    {
        unit: "kWh",
        re: /(kwh|kilowatt-hours?)$/,
    },
    {
        unit: "MWh",
        re: /(mwh|megawatt-hours?)$/,
    },
    {
        unit: "GWh",
        re: /(gwh|gigawatt-hours?)$/,
    },
    {
        unit: "J",
        re: /(j|joules?)$/,
    },
    {
        unit: "kJ",
        re: /(kj|kilojoules?)$/,
    },
    // ==== frequency ====
    {
        unit: "Hz",
        re: /Hz$/,
    },
    {
        unit: "kHz",
        re: /kHz$/,
    },
    {
        unit: "MHz",
        re: /MHz$/,
    },
    {
        unit: "GHz",
        re: /GHz$/,
    },
    {
        unit: "rpm",
        re: /rpm$/,
    },
    {
        unit: "deg/s",
        re: /deg\/(s|sec)$/,
    },
    {
        unit: "rad/s",
        re: /rad\/(s|sec)$/,
    },
    // ==== illuminance ====
    {
        unit: "lx",
        re: /(lx|lux)$/,
    },
    {
        unit: "ft-cd",
        re: /(ft\-cd|foot-candles?)$/,
    },
    // ==== length ====
    {
        unit: "mm",
        re: /(mm|millimeters?|millimetres?)$/,
    },
    {
        unit: "cm",
        re: /(cm|centimeters?|centimetres?)$/,
    },
    {
        unit: "m",
        re: /(m|meters?|metres?)$/,
    },
    {
        unit: "km",
        re: /(km|kilometers?|kilometres?)$/,
    },
    {
        unit: "in",
        re: /(in|inch|inches)$/,
    },
    {
        unit: "yd",
        re: /(yd|yards?)$/,
    },
    {
        unit: "ft-us",
        re: /(ft[\-\s]us|US\ssurvey\sfoot|US\ssurvey\sfeet)$/,
    },
    {
        unit: "ft",
        re: /(ft|foot|feet)$/,
    },
    {
        unit: "mi",
        re: /(mi|miles?)$/,
    },
    // ==== mass ====
    {
        unit: "mcg",
        re: /micrograms?$/,
    },
    {
        unit: "mg",
        re: /(mg|milligrams?)$/,
    },
    {
        unit: "g",
        re: /(g|grams?)$/,
    },
    {
        unit: "kg",
        re: /(kg|kilograms?)$/,
    },
    {
        unit: "mt",
        re: /(metric\s|)(tonne|ton)s?$/,
    },
    {
        unit: "oz",
        re: /(oz|ounces?)$/,
    },
    {
        unit: "lb",
        re: /(lbs?|pounds?)$/,
    },
    {
        unit: "t",
        re: /(imperial|imp\.?)\s(tonne|ton)s?$/,
    },
    // ==== pace  ====
    // TODO
    // ==== partsPer ====
    // TODO
    // ==== power ====
    // TODO
    // ==== pressure ====
    {
        unit: "Pa",
        re: /(Pa|pascals?)$/,
    },
    {
        unit: "kPa",
        re: /(kPa|kilopascals?)$/,
    },
    {
        unit: "MPa",
        re: /(MPa|megapascals?)$/,
    },
    {
        unit: "hPa",
        re: /(hPa|hectopascals?)$/,
    },
    {
        unit: "bar",
        re: /bars?$/,
    },
    {
        unit: "torr",
        re: /torr$/,
    },
    {
        unit: "psi",
        re: /(psi|pounds?\sper\ssquare\sinch)$/,
    },
    {
        unit: "ksi",
        re: /(ksi|kilopounds?\sper\ssquare\sinch)$/,
    },
    // ==== reactiveEnergy ====
    // TODO
    // ==== reactivePower ====
    // TODO
    // ==== speed ====
    {
        unit: "m/s",
        re: /m\/s$/,
    },
    {
        unit: "km/h",
        re: /(km\/hr?|kph)$/,
    },
    {
        unit: "m/h",
        re: /(m\/hr?|mph)$/,
    },
    {
        unit: "knot",
        re: /(kn|knots?)$/,
    },
    {
        unit: "ft/s",
        re: /ft\/s$/,
    },
    // ==== temperature ====
    {
        unit: "C",
        re: /(°?C|degrees?\sCelsius|degrees?\sC)$/,
    },
    {
        unit: "K",
        re: /(°?K|degrees?\sKelvin|degrees?\sK)$/,
    },
    {
        unit: "F",
        re: /(°?F|degrees?\sFahrenheit|degrees?\sF)$/,
    },
    {
        unit: "R",
        re: /(°?R|degrees?\sRankine|degrees?\sR)$/,
    },
    // ==== time ====
    {
        unit: "ns",
        re: /(ns|nanoseconds?)$/,
    },
    {
        unit: "mu",
        re: /(µs|microseconds?)$/,
    },
    {
        unit: "ms",
        re: /(ms|milliseconds?)$/,
    },
    {
        unit: "s",
        re: /(s|seconds?)$/,
    },
    {
        unit: "min",
        re: /(min|minutes?)$/,
    },
    {
        unit: "h",
        re: /(h|hours?)$/,
    },
    {
        unit: "d",
        re: /(d|days?)$/,
    },
    {
        unit: "week",
        re: /(weeks?)$/,
    },
    {
        unit: "month",
        re: /(months?)$/,
    },
    {
        unit: "year",
        re: /(years?)$/,
    },
    // ==== voltage ====
    // TODO
    // ==== volume ====
    {
        unit: "mm3",
        re: /(mm3|mm³|cu\smm|cubic\smillimeters?|cubic\smillimetres?)$/,
    },
    {
        unit: "cm3",
        re: /(cm3|cm³|c\.?c\.?|cu\scm|cubic\scentimeters?|cubic\scentimetres)$/,
    },
    {
        unit: "ml",
        re: /(ml|milliliters?|millilitres?)$/,
    },
    {
        unit: "cl",
        re: /(cl|centiliters?|centilitres?)$/,
    },
    {
        unit: "dl",
        re: /(dl|deciliters?|decilitres?)$/,
    },
    {
        unit: "l",
        re: /(l|liters?|litres?)$/,
    },
    {
        unit: "kl",
        re: /(kl|kiloliters?|kilolitres?)$/,
    },
    {
        unit: "m3",
        re: /(m3|m³|cu\sm|cubic\smeters?|cubic\smetres)$/,
    },
    {
        unit: "km3",
        re: /(km3|km³|cu\skm|cubic\skilometers?|cubic\skilometres)$/,
    },
    {
        unit: "tsp",
        re: /(tsp|teaspoons?)$/,
    },
    {
        unit: "tbs",
        re: /(tbs|tablespoons?)$/,
    },
    {
        unit: "in3",
        re: /(in3|in³|cu\sin|cubic\sinch|cubic\sinches)$/,
    },
    {
        unit: "fl-oz",
        re: /(fl\.?[\-\s]oz\.?|fluid\sounces?)$/,
    },
    {
        unit: "cup",
        re: /cups?$/,
    },
    {
        unit: "pnt",
        re: /(pnt|pints?)$/,
    },
    {
        unit: "qt",
        re: /(qt|quarts?)$/,
    },
    {
        unit: "gal",
        re: /(gal|gallons?)$/,
    },
    {
        unit: "ft3",
        re: /(ft3|ft³|cu\sft|cubic\sfoot|cubic\sfeet)$/,
    },
    {
        unit: "yd3",
        re: /(yd3|yd³|cu\syd|cubic\syards?)$/,
    },
    // ==== volumeFlowRate ====
    // TODO
];

// given a string such as "1,234 km/h" and converts it to all possible units
// of the same type (for example, converts km/h to other speed units such as mph)
function unit_convert(input_text) {
    const TAG = "[Unit Convert Sel]";
    let res = "";

    console.log(TAG + " selected text: \"" + input_text + "\"");
    tables.forEach((u, index) => {
        // build regular expression by concatenating number with unit's matching re
        if (!('final_re' in u))
            u.final_re = new RegExp(number_re.source + u.re.source, 'i');

        // match with input text
        r = input_text.match(u.final_re);
        if (r != null && r[1] != null) {
            console.log(TAG + " unit:" + u.unit + " matched");
            v = parseFloat(r[1].replace(",", ""));
            conversions = convert().from(u.unit).possibilities();
            console.log(TAG + " possibly conversions: " + conversions);
            conversions.forEach((c) => {
                res = res + "," + convert(v).from(u.unit).to(c).toPrecision(6) + " " + c;
            });
        }
    });

    return res;
}
