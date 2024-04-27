import React from "react";
import { TouchableOpacity } from "react-native";

export default function Fab({ children, onPress, position }) {
    return (
        <TouchableOpacity onPress={onPress} className="p-3 rounded-full bg-primary-400 shadow"
            activeOpacity={.8}
            style={
                position ? {
                    position: "absolute",
                    left: position.left,
                    top: position.top,
                    right: position.right,
                    bottom: position.bottom
                } : {
                    position: "absolute",
                    right: 20,
                    bottom: 20
                }
            }>
            {children}
        </TouchableOpacity>
    );
}