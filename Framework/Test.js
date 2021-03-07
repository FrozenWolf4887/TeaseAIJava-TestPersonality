const Test = {
    startTimeMillisOfTestTimer: 0,

    logName: function(testName) {
        TestLog.logTest(testName);
    },

    verifyEqual: function(expected, actual) {
        if (typeof expected != typeof actual) {
            return this.fail(`Mismatched type. Expected '${typeof expected}', but got '${typeof actual}'`);
        } else {
            if (expected === actual) {
                return this.pass(`Matched value of '${expected}' as type ${typeof expected}`);
            } else {
                return this.fail(`Value mismatch. Expected '${expected}, but got '${actual}' as type ${typeof expected}`);
            }
        }
    },

    verifyMatch: function(expectedRegex, actual) {
        if (typeof actual != 'string') {
            return this.fail(`Mismatched type. Expected 'string', but got '${typeof actual}'`);
        } else {
            if (actual.match(expectedRegex) != null) {
                return this.pass(`Matched value of '${actual}' against pattern '${expectedRegex}`);
            } else {
                return this.fail(`Value mismatch. Expected pattern '${expectedRegex}, but got '${actual}'`);
            }
        }
    },

    verifySame: function(expected, actual) {
        if (typeof expected != 'object') {
            return this.fail("Test error. Expected type must be of 'object'");
        } else {
            if (typeof actual != 'object') {
                return this.fail(`Mismatched type. Expected 'object', but got '${typeof actual}'`);
            } else {
                if (expected === actual) {
                    return this.pass(`Matched objects with value of '${expected}'`);
                } else {
                    return this.fail(`Object mismatch. Value of expected object is '${expected}' and actual is '${actual}'`);
                }
            }
        }
    },

    verifyTrue: function(flag) {
        return this.verifyEqual(true, flag);
    },

    verifyFalse: function(flag) {
        return this.verifyEqual(false, flag);
    },

    verifyNull: function(obj) {
        if (obj == null) {
            return this.pass('Object is null');
        } else {
            return this.fail('Object is not null');
        }
    },

    verifyNotNull: function(obj) {
        if (obj != null) {
            return this.pass('Object is not null');
        } else {
            return this.fail('Object is null');
        }
    },

    verifyType: function(expectedType, actualObj) {
        if (typeof expectedType === 'string') {
            if (expectedType !== typeof actualObj) {
                return this.fail(`Mismatched type. Expected '${expectedType}', but got '${typeof actualObj}'`);
            } else {
                return this.pass(`Type is '${expectedType}'`);
            }
        } else {
            if (!(actualObj instanceof expectedType)) {
                return this.fail(`Mismatched type. Expected '${expectedType}', but got '${typeof actualObj}'`);
            } else {
                return this.pass(`Type is '${expectedType}'`);
            }
        }
    },

    assertNotNull: function(obj) {
        if (!this.verifyNotNull(obj)) {
            TestRunner.abortTest();
        }
        return true;
    },

    assertType: function(expectedType, actualObj) {
        if (!this.verifyType(expectedType, actualObj)) {
            TestRunner.abortTest();
        }
        return true;
    },

    resetTimer: function() {
        this.startTimeMillisOfTestTimer = new Date().getTime();
    },

    verifyElapsedMillisLessThan: function(maxExpectedMillis) {
        const elapsedTimeMillis = new Date().getTime() - this.startTimeMillisOfTestTimer;
        if (elapsedTimeMillis <= maxExpectedMillis) {
            return this.pass(`Elapsed time of ${elapsedTimeMillis}ms is within limit of ${maxExpectedMillis}ms`);
        } else {
            return this.fail(`Elapsed time of ${elapsedTimeMillis}ms is beyond acceptable range ${maxExpectedMillis}ms`);
        }
    },

    verifyElapsedMillisBetween: function(minExpectedMillis, maxExpectedMillis) {
        const elapsedTimeMillis = new Date().getTime() - this.startTimeMillisOfTestTimer;
        if ((elapsedTimeMillis >= minExpectedMillis) && (elapsedTimeMillis <= maxExpectedMillis)) {
            return this.pass(`Elapsed time of ${elapsedTimeMillis}ms is within range ${minExpectedMillis}-${maxExpectedMillis}ms`);
        } else {
            return this.fail(`Elapsed time of ${elapsedTimeMillis}ms is out of range ${minExpectedMillis}-${maxExpectedMillis}ms`);
        }
    },

    verifyElapsedMillisWithin: function(expectedMillis, toleranceMillis) {
        const elapsedTimeMillis = new Date().getTime() - this.startTimeMillisOfTestTimer;
        const minExpectedMillis = expectedMillis - toleranceMillis;
        const maxExpectedMillis = expectedMillis + toleranceMillis;
        if ((elapsedTimeMillis >= minExpectedMillis) && (elapsedTimeMillis <= maxExpectedMillis)) {
            return this.pass(`Elapsed time of ${elapsedTimeMillis}ms is within tolerance of ${expectedMillis}ms +/- ${toleranceMillis}ms`);
        } else {
            return this.fail(`Elapsed time of ${elapsedTimeMillis}ms is out of tolerance range ${minExpectedMillis}-${maxExpectedMillis}ms`);
        }
    },

    pass: function(message) {
        TestRunner.recordPass();
        TestLog.logPass(message);
        return true;
    },

    fail: function(message) {
        TestRunner.recordFail();
        TestLog.logFail(message);
        return false;
    }
}
