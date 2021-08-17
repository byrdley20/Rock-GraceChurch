import assert = require('assert');
import { formatAspDate } from '@Obsidian/Services/Date';

describe("Test Suite 3", () => {
    it("Test A", async () => {
        const date = new Date(2021, 4, 7);

        assert.equal('4-07-2021', formatAspDate(date, 'm-dd-yyyy'));
    });
});
