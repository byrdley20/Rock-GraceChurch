System.register(["../Util/guid", "./addressField", "./booleanField", "./campusField", "./campusesField", "./colorField", "./currencyField", "./dateField", "./dateRangeField", "./dateTimeField", "./dayOfWeekField", "./daysOfWeekField", "./decimalField", "./decimalRangeField", "./definedValueField", "./definedValueRangeField", "./emailField", "./genderField", "./integerField", "./integerRangeField", "./memoField", "./monthDayField", "./multiSelectField", "./phoneNumberField", "./ratingField", "./singleSelectField", "./ssnField", "./textField", "./timeField"], function (exports_1, context_1) {
    "use strict";
    var guid_1, fieldTypeTable, addressField_1, booleanField_1, campusField_1, campusesField_1, colorField_1, currencyField_1, dateField_1, dateRangeField_1, dateTimeField_1, dayOfWeekField_1, daysOfWeekField_1, decimalField_1, decimalRangeField_1, definedValueField_1, definedValueRangeField_1, emailField_1, genderField_1, integerField_1, integerRangeField_1, memoField_1, monthDayField_1, multiSelectField_1, phoneNumberField_1, ratingField_1, singleSelectField_1, ssnField_1, textField_1, timeField_1;
    var __moduleName = context_1 && context_1.id;
    function getFieldEditorProps() {
        return {
            modelValue: {
                type: String,
                required: true
            },
            configurationValues: {
                type: Object,
                default: () => ({})
            }
        };
    }
    exports_1("getFieldEditorProps", getFieldEditorProps);
    function registerFieldType(fieldTypeGuid, fieldType) {
        const normalizedGuid = guid_1.normalize(fieldTypeGuid);
        if (!guid_1.isValidGuid(fieldTypeGuid) || normalizedGuid === null) {
            throw 'Invalid guid specified when registering field type.';
        }
        if (fieldTypeTable[normalizedGuid] !== undefined) {
            throw 'Invalid attempt to replace existing field type.';
        }
        fieldTypeTable[normalizedGuid] = fieldType;
    }
    exports_1("registerFieldType", registerFieldType);
    function getFieldType(fieldTypeGuid) {
        const normalizedGuid = guid_1.normalize(fieldTypeGuid);
        if (normalizedGuid !== null) {
            const field = fieldTypeTable[normalizedGuid];
            if (field) {
                return field;
            }
        }
        console.error(`Field type "${fieldTypeGuid}" was not found`);
        return null;
    }
    exports_1("getFieldType", getFieldType);
    return {
        setters: [
            function (guid_1_1) {
                guid_1 = guid_1_1;
            },
            function (addressField_1_1) {
                addressField_1 = addressField_1_1;
            },
            function (booleanField_1_1) {
                booleanField_1 = booleanField_1_1;
            },
            function (campusField_1_1) {
                campusField_1 = campusField_1_1;
            },
            function (campusesField_1_1) {
                campusesField_1 = campusesField_1_1;
            },
            function (colorField_1_1) {
                colorField_1 = colorField_1_1;
            },
            function (currencyField_1_1) {
                currencyField_1 = currencyField_1_1;
            },
            function (dateField_1_1) {
                dateField_1 = dateField_1_1;
            },
            function (dateRangeField_1_1) {
                dateRangeField_1 = dateRangeField_1_1;
            },
            function (dateTimeField_1_1) {
                dateTimeField_1 = dateTimeField_1_1;
            },
            function (dayOfWeekField_1_1) {
                dayOfWeekField_1 = dayOfWeekField_1_1;
            },
            function (daysOfWeekField_1_1) {
                daysOfWeekField_1 = daysOfWeekField_1_1;
            },
            function (decimalField_1_1) {
                decimalField_1 = decimalField_1_1;
            },
            function (decimalRangeField_1_1) {
                decimalRangeField_1 = decimalRangeField_1_1;
            },
            function (definedValueField_1_1) {
                definedValueField_1 = definedValueField_1_1;
            },
            function (definedValueRangeField_1_1) {
                definedValueRangeField_1 = definedValueRangeField_1_1;
            },
            function (emailField_1_1) {
                emailField_1 = emailField_1_1;
            },
            function (genderField_1_1) {
                genderField_1 = genderField_1_1;
            },
            function (integerField_1_1) {
                integerField_1 = integerField_1_1;
            },
            function (integerRangeField_1_1) {
                integerRangeField_1 = integerRangeField_1_1;
            },
            function (memoField_1_1) {
                memoField_1 = memoField_1_1;
            },
            function (monthDayField_1_1) {
                monthDayField_1 = monthDayField_1_1;
            },
            function (multiSelectField_1_1) {
                multiSelectField_1 = multiSelectField_1_1;
            },
            function (phoneNumberField_1_1) {
                phoneNumberField_1 = phoneNumberField_1_1;
            },
            function (ratingField_1_1) {
                ratingField_1 = ratingField_1_1;
            },
            function (singleSelectField_1_1) {
                singleSelectField_1 = singleSelectField_1_1;
            },
            function (ssnField_1_1) {
                ssnField_1 = ssnField_1_1;
            },
            function (textField_1_1) {
                textField_1 = textField_1_1;
            },
            function (timeField_1_1) {
                timeField_1 = timeField_1_1;
            }
        ],
        execute: function () {
            fieldTypeTable = {};
            registerFieldType("0A495222-23B7-41D3-82C8-D484CDB75D17", new addressField_1.AddressFieldType());
            registerFieldType("1EDAFDED-DFE6-4334-B019-6EECBA89E05A", new booleanField_1.BooleanFieldType());
            registerFieldType("1B71FEF4-201F-4D53-8C60-2DF21F1985ED", new campusField_1.CampusFieldType());
            registerFieldType("69254F91-C97F-4C2D-9ACB-1683B088097B", new campusesField_1.CampusesFieldType());
            registerFieldType("D747E6AE-C383-4E22-8846-71518E3DD06F", new colorField_1.ColorFieldType());
            registerFieldType("3EE69CBC-35CE-4496-88CC-8327A447603F", new currencyField_1.CurrencyFieldType());
            registerFieldType("6B6AA175-4758-453F-8D83-FCD8044B5F36", new dateField_1.DateFieldType());
            registerFieldType("9C7D431C-875C-4792-9E76-93F3A32BB850", new dateRangeField_1.DateRangeFieldType());
            registerFieldType("FE95430C-322D-4B67-9C77-DFD1D4408725", new dateTimeField_1.DateTimeFieldType());
            registerFieldType("7EDFA2DE-FDD3-4AC1-B356-1F5BFC231DAE", new dayOfWeekField_1.DayOfWeekFieldType());
            registerFieldType("08943FF9-F2A8-4DB4-A72A-31938B200C8C", new daysOfWeekField_1.DaysOfWeekFieldType());
            registerFieldType("C757A554-3009-4214-B05D-CEA2B2EA6B8F", new decimalField_1.DecimalFieldType());
            registerFieldType("758D9648-573E-4800-B5AF-7CC29F4BE170", new decimalRangeField_1.DecimalRangeFieldType());
            registerFieldType("59D5A94C-94A0-4630-B80A-BB25697D74C7", new definedValueField_1.DefinedValueFieldType());
            registerFieldType("B5C07B16-844D-4620-82E3-4CCA8F5FC350", new definedValueRangeField_1.DefinedValueRangeFieldType());
            registerFieldType("3D045CAE-EA72-4A04-B7BE-7FD1D6214217", new emailField_1.EmailFieldType());
            registerFieldType("2E28779B-4C76-4142-AE8D-49EA31DDB503", new genderField_1.GenderFieldType());
            registerFieldType("A75DFC58-7A1B-4799-BF31-451B2BBE38FF", new integerField_1.IntegerFieldType());
            registerFieldType("9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4", new integerRangeField_1.IntegerRangeFieldType());
            registerFieldType("C28C7BF3-A552-4D77-9408-DEDCF760CED0", new memoField_1.MemoFieldType());
            registerFieldType("8BED8DD8-8167-4052-B807-A1E72C133611", new monthDayField_1.MonthDayFieldType());
            registerFieldType("BD0D9B57-2A41-4490-89FF-F01DAB7D4904", new multiSelectField_1.MultiSelectFieldType());
            registerFieldType("6B1908EC-12A2-463A-A7BD-970CE0FAF097", new phoneNumberField_1.PhoneNumberFieldType());
            registerFieldType("24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862", new ratingField_1.RatingFieldType());
            registerFieldType("7525C4CB-EE6B-41D4-9B64-A08048D5A5C0", new singleSelectField_1.SingleSelectFieldType());
            registerFieldType("4722C99A-C078-464A-968F-13AB5E8E318F", new ssnField_1.SSNFieldType());
            registerFieldType("9C204CD0-1233-41C5-818A-C5DA439445AA", new textField_1.TextFieldType());
            registerFieldType("2F8F5EC4-57FA-4F6C-AB15-9D6616994580", new timeField_1.TimeFieldType());
        }
    };
});
//# sourceMappingURL=index.js.map