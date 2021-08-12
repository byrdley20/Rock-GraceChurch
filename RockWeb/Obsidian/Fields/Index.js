System.register(["../Util/Guid", "./BooleanField", "./ColorField", "./CurrencyField", "./DateField", "./DateTimeField", "./DayOfWeekField", "./DaysOfWeekField", "./DecimalField", "./DecimalRangeField", "./DefinedValueField", "./EmailField", "./GenderField", "./IntegerField", "./IntegerRangeField", "./MemoField", "./MonthDayField", "./PhoneNumberField", "./RatingField", "./SingleSelectField", "./TextField", "./TimeField"], function (exports_1, context_1) {
    "use strict";
    var Guid_1, fieldTypeTable, BooleanField_1, ColorField_1, CurrencyField_1, DateField_1, DateTimeField_1, DayOfWeekField_1, DaysOfWeekField_1, DecimalField_1, DecimalRangeField_1, DefinedValueField_1, EmailField_1, GenderField_1, IntegerField_1, IntegerRangeField_1, MemoField_1, MonthDayField_1, PhoneNumberField_1, RatingField_1, SingleSelectField_1, TextField_1, TimeField_1;
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
        const normalizedGuid = Guid_1.normalize(fieldTypeGuid);
        if (!Guid_1.isValidGuid(fieldTypeGuid) || normalizedGuid === null) {
            throw 'Invalid guid specified when registering field type.';
        }
        if (fieldTypeTable[normalizedGuid] !== undefined) {
            throw 'Invalid attempt to replace existing field type.';
        }
        fieldTypeTable[normalizedGuid] = fieldType;
    }
    exports_1("registerFieldType", registerFieldType);
    function getFieldType(fieldTypeGuid) {
        const normalizedGuid = Guid_1.normalize(fieldTypeGuid);
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
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (BooleanField_1_1) {
                BooleanField_1 = BooleanField_1_1;
            },
            function (ColorField_1_1) {
                ColorField_1 = ColorField_1_1;
            },
            function (CurrencyField_1_1) {
                CurrencyField_1 = CurrencyField_1_1;
            },
            function (DateField_1_1) {
                DateField_1 = DateField_1_1;
            },
            function (DateTimeField_1_1) {
                DateTimeField_1 = DateTimeField_1_1;
            },
            function (DayOfWeekField_1_1) {
                DayOfWeekField_1 = DayOfWeekField_1_1;
            },
            function (DaysOfWeekField_1_1) {
                DaysOfWeekField_1 = DaysOfWeekField_1_1;
            },
            function (DecimalField_1_1) {
                DecimalField_1 = DecimalField_1_1;
            },
            function (DecimalRangeField_1_1) {
                DecimalRangeField_1 = DecimalRangeField_1_1;
            },
            function (DefinedValueField_1_1) {
                DefinedValueField_1 = DefinedValueField_1_1;
            },
            function (EmailField_1_1) {
                EmailField_1 = EmailField_1_1;
            },
            function (GenderField_1_1) {
                GenderField_1 = GenderField_1_1;
            },
            function (IntegerField_1_1) {
                IntegerField_1 = IntegerField_1_1;
            },
            function (IntegerRangeField_1_1) {
                IntegerRangeField_1 = IntegerRangeField_1_1;
            },
            function (MemoField_1_1) {
                MemoField_1 = MemoField_1_1;
            },
            function (MonthDayField_1_1) {
                MonthDayField_1 = MonthDayField_1_1;
            },
            function (PhoneNumberField_1_1) {
                PhoneNumberField_1 = PhoneNumberField_1_1;
            },
            function (RatingField_1_1) {
                RatingField_1 = RatingField_1_1;
            },
            function (SingleSelectField_1_1) {
                SingleSelectField_1 = SingleSelectField_1_1;
            },
            function (TextField_1_1) {
                TextField_1 = TextField_1_1;
            },
            function (TimeField_1_1) {
                TimeField_1 = TimeField_1_1;
            }
        ],
        execute: function () {
            fieldTypeTable = {};
            registerFieldType("1EDAFDED-DFE6-4334-B019-6EECBA89E05A", new BooleanField_1.BooleanFieldType());
            registerFieldType("D747E6AE-C383-4E22-8846-71518E3DD06F", new ColorField_1.ColorFieldType());
            registerFieldType("3EE69CBC-35CE-4496-88CC-8327A447603F", new CurrencyField_1.CurrencyFieldType());
            registerFieldType("6B6AA175-4758-453F-8D83-FCD8044B5F36", new DateField_1.DateFieldType());
            registerFieldType("FE95430C-322D-4B67-9C77-DFD1D4408725", new DateTimeField_1.DateTimeFieldType());
            registerFieldType("7EDFA2DE-FDD3-4AC1-B356-1F5BFC231DAE", new DayOfWeekField_1.DayOfWeekFieldType());
            registerFieldType("08943FF9-F2A8-4DB4-A72A-31938B200C8C", new DaysOfWeekField_1.DaysOfWeekFieldType());
            registerFieldType("C757A554-3009-4214-B05D-CEA2B2EA6B8F", new DecimalField_1.DecimalFieldType());
            registerFieldType("758D9648-573E-4800-B5AF-7CC29F4BE170", new DecimalRangeField_1.DecimalRangeFieldType());
            registerFieldType("59D5A94C-94A0-4630-B80A-BB25697D74C7", new DefinedValueField_1.DefinedValueFieldType());
            registerFieldType("3D045CAE-EA72-4A04-B7BE-7FD1D6214217", new EmailField_1.EmailFieldType());
            registerFieldType("2E28779B-4C76-4142-AE8D-49EA31DDB503", new GenderField_1.GenderFieldType());
            registerFieldType("A75DFC58-7A1B-4799-BF31-451B2BBE38FF", new IntegerField_1.IntegerFieldType());
            registerFieldType("9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4", new IntegerRangeField_1.IntegerRangeFieldType());
            registerFieldType("C28C7BF3-A552-4D77-9408-DEDCF760CED0", new MemoField_1.MemoFieldType());
            registerFieldType("8BED8DD8-8167-4052-B807-A1E72C133611", new MonthDayField_1.MonthDayFieldType());
            registerFieldType("6B1908EC-12A2-463A-A7BD-970CE0FAF097", new PhoneNumberField_1.PhoneNumberFieldType());
            registerFieldType("24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862", new RatingField_1.RatingFieldType());
            registerFieldType("7525C4CB-EE6B-41D4-9B64-A08048D5A5C0", new SingleSelectField_1.SingleSelectFieldType());
            registerFieldType("9C204CD0-1233-41C5-818A-C5DA439445AA", new TextField_1.TextFieldType());
            registerFieldType("2F8F5EC4-57FA-4F6C-AB15-9D6616994580", new TimeField_1.TimeFieldType());
        }
    };
});
//# sourceMappingURL=Index.js.map