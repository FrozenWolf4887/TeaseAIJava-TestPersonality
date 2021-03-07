const TestLog = {
    COLOUR_OF_TIME: 'GREY',
    COLOUR_OF_TESTSUITE: 'PURPLE',
    COLOUR_OF_TEST: 'BLUE',
    COLOUR_OF_NOTE: 'BLACK',
    COLOUR_OF_PASS: 'GREEN',
    COLOUR_OF_FAIL: 'RED',

    log: function(message) {
        const date = new Date();
        const hoursText = ('0' + date.getHours()).slice(-2);
        const minutesText = ('0' + date.getMinutes()).slice(-2);
        const secondsText = ('0' + date.getSeconds()).slice(-2);
        systemMessage(`<c=${this.COLOUR_OF_TIME}>${hoursText}:${minutesText}:${secondsText}</c>  ${message}`);
    },

    logTestSuite: function(suiteName) {
        this.log(`<fs=20><b><u><c=${this.COLOUR_OF_TESTSUITE}>Test Suite</c>: ${suiteName}</u></b></fs>`);
    },

    logTest: function(testTitle) {
        this.log(`<c=${this.COLOUR_OF_TEST}>Test</c>: <u>${testTitle}</u>`);
    },

    logNote: function(message) {
        this.log(`<c=${this.COLOUR_OF_NOTE}>Note</c>: ${message}`);
    },

    logFail: function(message) {
        this.log(`<c=${this.COLOUR_OF_FAIL}><b>FAIL</b></c>: ${message}`);
    },

    logPass: function(message) {
        this.log(`<c=${this.COLOUR_OF_PASS}>PASS</c>: ${message}`);
    },

    logResults: function(countOfTests, countOfTotalChecks, countOfTestFailures, countOfTotalCheckFailures) {
        if ((countOfTestFailures == 0) && (countOfTotalCheckFailures == 0)) {
            this.log(`<c=${this.COLOUR_OF_TEST}>Ran ${countOfTests} tests comprising ${countOfTotalChecks} checks</c>, <c=${this.COLOUR_OF_PASS}>ALL PASSED</c>`);
        } else {
            this.log(`<c=${this.COLOUR_OF_TEST}>Ran ${countOfTests} tests comprising ${countOfTotalChecks} checks</c>, <c=${this.COLOUR_OF_FAIL}><b>${countOfTestFailures} tests failed from which ${countOfTotalCheckFailures} checks failed</b></c>`);
        }
    }
}
