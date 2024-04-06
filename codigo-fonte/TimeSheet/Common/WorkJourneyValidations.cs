namespace TimeSheet.Common {
    public static class WorkJourneyValidations {
        public static bool CheckTimeBounds(double value) {
            return value > 0 && value < 24;
        }
        public static bool CheckLunchTimeConsistency(double totalTime, double lunchTime) {
            return lunchTime < totalTime;
        }
    }
}
