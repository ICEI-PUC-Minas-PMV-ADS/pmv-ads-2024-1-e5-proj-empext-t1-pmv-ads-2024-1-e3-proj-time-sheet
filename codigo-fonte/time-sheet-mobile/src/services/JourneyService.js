import { parseToDate, calculateTimeDiference } from "../common/utils";

export function calculateJourneyStats(userTotalTime, workJourneys) {

    var days = workJourneys.length;
    var totalMinutes = 0;
    var certificates = 0;

    workJourneys.forEach(function (item) {

        if (item.journeyType == 1) {

            certificates++;

        } else {
            const startTime = parseToDate(item.startTime, item.date);
            const startLunchTime = parseToDate(item.startLunchTime, item.date);

            const timeBeforeLunch = calculateTimeDiference(startLunchTime, startTime);

            const endLunchTime = parseToDate(item.endLunchTime, item.date);
            const endTime = parseToDate(item.endTime, item.date);

            const timeAfterLunch = calculateTimeDiference(endTime, endLunchTime);

            var hours = timeBeforeLunch.hours + timeAfterLunch.hours;
            var minutes = timeBeforeLunch.minutes = timeAfterLunch.minutes;

            totalMinutes += (hours * 60);
            totalMinutes += minutes;
        }
    });

    var expectWorkTime = ((days - certificates) * userTotalTime) * 60;
    var extraTime = Math.max(totalMinutes - expectWorkTime, 0);
    var extraTimeHours = Math.floor(extraTime / 60);
    var extraTimeMinutes = extraTime % 60;

    var workTime = totalMinutes - extraTime;
    var workTimeHours = Math.floor(workTime / 60);
    var workTimeMinutes = workTime % 60;

    var totalTimeHours = Math.floor(totalMinutes / 60);
    var totalTimeMinutes = totalMinutes % 60;

    return {
        days: days,
        certificates: certificates,
        workTime: `${workTimeHours.toString().padStart(2, "0")}:${workTimeMinutes.toString().padStart(2, "0")}`,
        extraTime: `${extraTimeHours.toString().padStart(2, "0")}:${extraTimeMinutes.toString().padStart(2, "0")}`,
        totalTime: `${totalTimeHours.toString().padStart(2, "0")}:${totalTimeMinutes.toString().padStart(2, "0")}`
    }
}