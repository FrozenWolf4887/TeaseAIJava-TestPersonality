const TestRunner = {
    countOfTests: 0,
    countOfTestFailures: 0,
    countOfTotalChecks: 0,
    countOfTotalCheckFailures: 0,
    countOfCurrentTestCheckFailures: 0,

    ABORT_TEST_EXCEPTION: 0xbaad,

    runTestSuiteByName: function(suiteName) {
        const listOfTestFunctions = TestRegister.tryGetListOfFunctionsForTestSuite(suiteName);
        if (listOfTestFunctions != null) {
            TestLog.logTestSuite(suiteName);
            for (let i=0; i < listOfTestFunctions.length; ++i) {
                const testFunction = listOfTestFunctions[i];
                this.runTestFunction(testFunction);
            }
        }
    },

    runTestFunction: function(testFunction) {
        try {
            ++this.countOfTests;
            this.countOfCurrentTestCheckFailures = 0;
            testFunction();
            if (this.countOfCurrentTestCheckFailures > 0) {
                ++this.countOfTestFailures;
            }
        }
        catch (err) {
            ++this.countOfTestFailures;
            if (err !== this.ABORT_TEST_EXCEPTION) {
                Test.fail(`Unexpected failure: ${err.message}`);
            }
        }
    },

    recordFail: function() {
        ++this.countOfTotalChecks;
        ++this.countOfCurrentTestCheckFailures;
        ++this.countOfTotalCheckFailures;
    },

    recordPass: function() {
        ++this.countOfTotalChecks;
    },

    abortTest: function() {
        throw this.TEST_FAILURE_EXCEPTION;
    },

    logResults: function() {
        TestLog.logResults(this.countOfTests, this.countOfTotalChecks, this.countOfTestFailures, this.countOfTotalCheckFailures);
    }
}
