import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "block": {
        "height": 100,
        "width": 100,
        "display": "inline-block"
    },
    "red": {
        "backgroundColor": "#FF0000"
    },
    "blue": {
        "backgroundColor": "#0000FF"
    },
    "yellow": {
        "backgroundColor": "#E2BE22"
    },
    "green": {
        "backgroundColor": "#008800"
    }
});