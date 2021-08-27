System.register([], function (exports_1, context_1) {
    "use strict";
    var List, OrderedList;
    var __moduleName = context_1 && context_1.id;
    function valueComparer(keySelector, descending) {
        return (a, b) => {
            const valueA = keySelector(a);
            const valueB = keySelector(b);
            if (valueA === undefined || valueA === null) {
                if (valueB === undefined || valueB === null) {
                    return 0;
                }
                return !descending ? -1 : 1;
            }
            if (valueB === undefined || valueB === null) {
                return !descending ? 1 : -1;
            }
            if (valueA > valueB) {
                return !descending ? 1 : -1;
            }
            else if (valueA < valueB) {
                return !descending ? -1 : 1;
            }
            else {
                return 0;
            }
        };
    }
    return {
        setters: [],
        execute: function () {
            List = class List {
                constructor(elements) {
                    if (elements === undefined) {
                        this.elements = [];
                    }
                    else {
                        this.elements = [...elements];
                    }
                }
                static fromArrayNoCopy(elements) {
                    const list = new List();
                    list.elements = elements;
                    return list;
                }
                orderBy(keySelector) {
                    const comparer = valueComparer(keySelector, false);
                    return OrderedList.fromArrayNoCopy([...this.elements].sort(comparer));
                }
                orderByDescending(keySelector) {
                    const comparer = valueComparer(keySelector, true);
                    return OrderedList.fromArrayNoCopy([...this.elements].sort(comparer));
                }
                where(predicate) {
                    return new List(this.elements.filter(predicate));
                }
                toArray() {
                    return [...this.elements];
                }
            };
            exports_1("List", List);
            OrderedList = class OrderedList extends List {
                static fromArrayNoCopy(elements) {
                    const list = new OrderedList();
                    list.elements = elements;
                    return list;
                }
                thenBy(keySelector) {
                    return this.orderBy(keySelector);
                }
                thenByDescending(keySelector) {
                    return this.orderByDescending(keySelector);
                }
            };
        }
    };
});
//# sourceMappingURL=linq.js.map