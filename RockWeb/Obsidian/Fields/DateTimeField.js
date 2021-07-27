System.register(["vue", "./Index", "../Elements/DateTimePicker", "../Services/Number", "../Services/Date", "../Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var vue_1, Index_1, DateTimePicker_1, Number_1, Date_1, Boolean_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DateTimePicker_1_1) {
                DateTimePicker_1 = DateTimePicker_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Date_1_1) {
                Date_1 = Date_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = 'FE95430C-322D-4B67-9C77-DFD1D4408725';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["DateTimeFormat"] = "format";
                ConfigurationValueKey["DisplayAsElapsedTime"] = "displayDiff";
                ConfigurationValueKey["DisplayCurrentOption"] = "displayCurrentOption";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            ;
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'DateTimeField',
                components: {
                    DateTimePicker: DateTimePicker_1.default
                },
                props: Index_1.getFieldTypeProps(),
                setup: function () {
                    return {
                        http: vue_1.inject('http')
                    };
                },
                data: function () {
                    return {
                        internalValue: '',
                        formattedString: ''
                    };
                },
                methods: {
                    syncModelValue: function () {
                        var _a;
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        this.internalValue = (_a = this.modelValue) !== null && _a !== void 0 ? _a : '';
                                        return [4, this.fetchAndSetFormattedValue()];
                                    case 1:
                                        _b.sent();
                                        return [2];
                                }
                            });
                        });
                    },
                    fetchAndSetFormattedValue: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var parts, diff, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this.isCurrentDateValue) return [3, 1];
                                        parts = this.internalValue.split(':');
                                        diff = parts.length === 2 ? Number_1.toNumber(parts[1]) : 0;
                                        if (diff === 1) {
                                            this.formattedString = 'Current Date plus 1 minute';
                                        }
                                        else if (diff > 0) {
                                            this.formattedString = "Current Date plus " + diff + " minutes";
                                        }
                                        else if (diff === -1) {
                                            this.formattedString = 'Current Date minus 1 minute';
                                        }
                                        else if (diff < 0) {
                                            this.formattedString = "Current Date minus " + Math.abs(diff) + " minutes";
                                        }
                                        else {
                                            this.formattedString = 'Current Date';
                                        }
                                        return [3, 4];
                                    case 1:
                                        if (!this.asDate) return [3, 3];
                                        _a = this;
                                        return [4, this.getFormattedDateString(this.asDate, this.dateFormatTemplate)];
                                    case 2:
                                        _a.formattedString = _b.sent();
                                        return [3, 4];
                                    case 3:
                                        this.formattedString = '';
                                        _b.label = 4;
                                    case 4: return [2];
                                }
                            });
                        });
                    },
                    getFormattedDateString: function (value, format) {
                        return __awaiter(this, void 0, void 0, function () {
                            var get, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        get = this.http.get;
                                        return [4, get('/api/Utility/FormatDate', { value: value, format: format })];
                                    case 1:
                                        result = _a.sent();
                                        return [2, result.data || "" + value];
                                }
                            });
                        });
                    },
                },
                computed: {
                    isCurrentDateValue: function () {
                        return this.internalValue.indexOf('CURRENT') === 0;
                    },
                    asDate: function () {
                        var ms = Date.parse(this.internalValue);
                        if (isNaN(ms)) {
                            return null;
                        }
                        return new Date(ms);
                    },
                    dateFormatTemplate: function () {
                        var formatConfig = this.configurationValues[ConfigurationValueKey.DateTimeFormat];
                        return (formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.Value) || 'MM/dd/yyyy';
                    },
                    elapsedString: function () {
                        var dateValue = this.asDate;
                        if (this.isCurrentDateValue || !dateValue) {
                            return '';
                        }
                        var formatConfig = this.configurationValues[ConfigurationValueKey.DisplayAsElapsedTime];
                        var displayDiff = Boolean_1.asBoolean(formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.Value);
                        if (!displayDiff) {
                            return '';
                        }
                        return Date_1.asElapsedString(dateValue);
                    },
                    configAttributes: function () {
                        var attributes = {};
                        var displayCurrentConfig = this.configurationValues[ConfigurationValueKey.DisplayCurrentOption];
                        if (displayCurrentConfig === null || displayCurrentConfig === void 0 ? void 0 : displayCurrentConfig.Value) {
                            var displayCurrent = Boolean_1.asBoolean(displayCurrentConfig.Value);
                            attributes.displayCurrentOption = displayCurrent;
                            attributes.isCurrentDateOffset = displayCurrent;
                        }
                        return attributes;
                    }
                },
                watch: {
                    internalValue: function () {
                        var _a;
                        if (this.internalValue !== this.modelValue) {
                            var d1 = Date.parse(this.internalValue);
                            var d2 = Date.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : '');
                            if (isNaN(d1) || isNaN(d2) || d1 !== d2) {
                                this.$emit('update:modelValue', this.internalValue);
                            }
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, this.syncModelValue()];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        }
                    },
                    dateFormatTemplate: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.fetchAndSetFormattedValue()];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        });
                    }
                },
                template: "\n<DateTimePicker v-if=\"isEditMode\" v-model=\"internalValue\" v-bind=\"configAttributes\" />\n<span v-else>\n    {{ formattedString }}\n    <template v-if=\"elapsedString\">\n        ({{ elapsedString }})\n    </template>\n</span>"
            })));
        }
    };
});
//# sourceMappingURL=DateTimeField.js.map