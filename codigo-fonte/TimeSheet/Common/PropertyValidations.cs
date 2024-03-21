﻿namespace TimeSheet.Common {
    public static class PropertyValidations {
        public static void Normalize(ref string property) {
            if (property is not null) {
                property = property.Trim();
            }
        }
        public static bool IsBlank(string property) {
            return string.IsNullOrEmpty(property);
        }
        public static bool HasMinLength(string property, int minLength) {
            return property.Length >= minLength;
        }
        public static bool HasMaxLength(string property, int maxLength) {
            return property.Length <= maxLength;
        }
    }
}
