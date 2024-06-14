import React from "react";

export function useSelection() {

    const userSelections = [];

    function removeSelection(userId) {
        if (userSelections.findIndex(item => item.userId === userId) !== -1) {
            userSelections.splice(
                userSelections.findIndex(item => item.userId === userId), 1
            );
        }
    }

    function addSelection(userId, userData) {
        if (userSelections.findIndex(item => item.userId === userId) === -1) {
            userSelections.push({ userId , userData });
        }
    }

    return { removeSelection, addSelection, userSelections };
}