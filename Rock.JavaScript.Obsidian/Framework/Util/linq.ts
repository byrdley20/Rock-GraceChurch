/**
 * A function that will select a value from the object.
 */
type ValueSelector<T> = (value: T) => string | number | boolean | null | undefined;

/**
 * A function that will perform testing on a value to see if it meets
 * a certain condition and return true or false.
 */
type PredicateFn<T> = (value: T, index: number) => boolean;

/**
 * Compares the values of two objects given the selector function.
 *
 * For the purposes of a compare, null and undefined are always a lower
 * value - unless both values are null or undefined in which case they
 * are considered equal.
 * 
 * @param keySelector The function that will select the value.
 * @param descending True if this comparison should be in descending order.
 */
function valueComparer<T>(keySelector: ValueSelector<T>, descending: boolean): ((a: T, b: T) => number) {
    return (a: T, b: T): number => {
        const valueA = keySelector(a);
        const valueB = keySelector(b);

        // If valueA is null or undefined then it will either be considered
        // lower than or equal to valueB.
        if (valueA === undefined || valueA === null) {
            // If valueB is also null or undefined then they are considered equal.
            if (valueB === undefined || valueB === null) {
                return 0;
            }

            return !descending ? -1 : 1;
        }

        // If valueB is undefined or null (but valueA is not) then it is considered
        // a lower value than valueA.
        if (valueB === undefined || valueB === null) {
            return !descending ? 1 : -1;
        }

        // Perform a normal comparison.
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


/**
 * Provides LINQ style access to an array of elements.
 */
export class List<T> {
    /** The elements being tracked by this list. */
    protected elements: T[];

    // #region Constructors

    /**
     * Creates a new list with the given elements.
     * 
     * @param elements The elements to be made available to LINQ queries.
     */
    constructor(elements?: T[]) {
        if (elements === undefined) {
            this.elements = [];
        }
        else {
            // Copy the array so if the caller makes changes it won't be reflected by us.
            this.elements = [...elements];
        }
    }

    /**
     * Creates a new List from the elements without copying to a new array.
     * 
     * @param elements The elements to initialize the list with.
     * @returns A new list of elements.
     */
    public static fromArrayNoCopy<T>(elements: T[]): List<T> {
        const list = new List<T>();

        list.elements = elements;

        return list;
    }

    // #endregion

    /**
     * Orders the elements of the array and returns a new list of items
     * in that order.
     * 
     * @param keySelector The selector for the key to be ordered by.
     * @returns A new ordered list of elements.
     */
    public orderBy(keySelector: ValueSelector<T>): OrderedList<T> {
        const comparer = valueComparer(keySelector, false);

        return OrderedList.fromArrayNoCopy([...this.elements].sort(comparer));
    }

    /**
     * Orders the elements of the array in descending order and returns a
     * new list of items in that order.
     *
     * @param keySelector The selector for the key to be ordered by.
     * @returns A new ordered list of elements.
     */
    public orderByDescending(keySelector: ValueSelector<T>): OrderedList<T> {
        const comparer = valueComparer(keySelector, true);

        return OrderedList.fromArrayNoCopy([...this.elements].sort(comparer));
    }

    /**
     * 
     * @param predicate The predicate.
     * @returns 
     */
    public where(predicate: PredicateFn<T>): List<T> {
        return new List<T>(this.elements.filter(predicate));
    }

    /**
     * Get the elements of this list as a native array of items.
     *
     * @returns An array of items with all filters applied.
     */
    public toArray(): T[] {
        return [...this.elements];
    }
}

/**
 * A list of items that has ordering already applied.
 */
class OrderedList<T> extends List<T> {
    // #region Constructors

    /**
     * Creates a new OrderedList from the elements without copying to a new array.
     * 
     * @param elements The elements to initialize the list with.
     * @returns A new list of elements.
     */
    public static override fromArrayNoCopy<T>(elements: T[]): OrderedList<T> {
        const list = new OrderedList<T>();

        list.elements = elements;

        return list;
    }

    // #endregion

    /**
     * Orders the elements of the array and returns a new list of items
     * in that order.
     * 
     * @param keySelector The selector for the key to be ordered by.
     * @returns A new ordered list of elements.
     */
    public thenBy(keySelector: ValueSelector<T>): OrderedList<T> {
        return this.orderBy(keySelector);
    }

    /**
     * Orders the elements of the array in descending order and returns a
     * new list of items in that order.
     *
     * @param keySelector The selector for the key to be ordered by.
     * @returns A new ordered list of elements.
     */
    public thenByDescending(keySelector: ValueSelector<T>): OrderedList<T> {
        return this.orderByDescending(keySelector);
    }
}
