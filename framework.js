var countOfTests = 0;
var countOfTestFailures = 0;
var countOfTotalChecks = 0;
var countOfTotalCheckFailures = 0;
var mapOfTestSuiteNamesToFunctions = {};
var startTimeMillisOfTestTimer = 0;
var countOfCurrentTestCheckFailures = 0;

const colourOfTestSuite = 'PURPLE';
const colourOfTest = 'BLUE';
const colourOfNote = 'GREY';
const colourOfPass = 'GREEN';
const colourOfFail = 'RED';

const TEST_FAILURE_EXCEPTION = 0xbaad;

function registerTestSuite(suiteName, testFunction) {
    mapOfTestSuiteNamesToFunctions[suiteName] = testFunction;
}

function getListOfTestSuiteNames() {
    return Object.keys(mapOfTestSuiteNamesToFunctions);
}

function runTestSuiteByName(suiteName) {
    const listOfTestFunctions = mapOfTestSuiteNamesToFunctions[suiteName];
    if (listOfTestFunctions != null) {
        logTestSuite(suiteName);
        listOfTestFunctions.forEach(testFunction => {
            runTestFunction(testFunction);
        });
    }
}

function runTestFunction(testFunction) {
    try {
        ++countOfTests;
        countOfCurrentTestCheckFailures = 0;
        testFunction();
        if (countOfCurrentTestCheckFailures > 0) {
            ++countOfTestFailures;
        }
    }
    catch (err) {
        ++countOfTestFailures;
        if (err !== TEST_FAILURE_EXCEPTION) {
            logFail(`Unexpected failure: ${err.message}`);
        }
    }
}

function log(message) {
    const date = new Date();
    const hoursText = ('0' + date.getHours()).slice(-2);
    const minutesText = ('0' + date.getMinutes()).slice(-2);
    const secondsText = ('0' + date.getSeconds()).slice(-2);
    systemMessage(`${hoursText}:${minutesText}:${secondsText}  ${message}`);
}

function logTestSuite(suiteName) {
    log(`<fs=20><b><u><c=${colourOfTestSuite}>Test Suite</c>: ${suiteName}</u></b></fs>`);
}

function logTest(testTitle) {
    log(`<c=${colourOfTest}>Test</c>: <u>${testTitle}</u>`);
}

function logNote(message) {
    log(`<c=${colourOfNote}>Note</c>: ${message}`);
}

function logFail(message) {
    log(`<c=${colourOfFail}><b>FAIL</b></c>: ${message}`);
    ++countOfCurrentTestCheckFailures;
    ++countOfTotalCheckFailures;
    return false;
}

function logPass(message) {
    log(`<c=${colourOfPass}>PASS</c>: ${message}`);
    return true;
}

function logResults() {
    if ((countOfTestFailures == 0) && (countOfTotalCheckFailures == 0)) {
        log(`<c=${colourOfTest}>Ran ${countOfTests} tests comprising ${countOfTotalChecks} checks</c>, <c=${colourOfPass}>ALL PASSED</c>`);
    } else {
        log(`<c=${colourOfTest}>Ran ${countOfTests} tests comprising ${countOfTotalChecks} checks</c>, <c=${colourOfFail}><b>${countOfTestFailures} tests failed from which ${countOfTotalCheckFailures} checks failed</b></c>`);
    }
}

function verifyEqual(expected, actual) {
    ++countOfTotalChecks;
    if (typeof expected != typeof actual) {
        return logFail(`Mismatched type. Expected '${typeof expected}', but got '${typeof actual}'`);
    } else {
        if (expected === actual) {
            return logPass(`Matched value of '${expected}' as type ${typeof expected}`);
        } else {
            return logFail(`Value mismatch. Expected '${expected}, but got '${actual}' as type ${typeof expected}`);
        }
    }
}

function verifyMatch(expectedRegex, actual) {
    ++countOfTotalChecks;
    if (typeof actual != 'string') {
        return logFail(`Mismatched type. Expected 'string', but got '${typeof actual}'`);
    } else {
        if (actual.match(expectedRegex) != null) {
            return logPass(`Matched value of '${actual}' against pattern '${expectedRegex}`);
        } else {
            return logFail(`Value mismatch. Expected pattern '${expectedRegex}, but got '${actual}'`);
        }
    }
}

function verifySame(expected, actual) {
    ++countOfTotalChecks;
    if (typeof expected != 'object') {
        return logFail("Test error. Expected type must be of 'object'");
    } else {
        if (typeof actual != 'object') {
            return logFail(`Mismatched type. Expected 'object', but got '${typeof actual}'`);
        } else {
            if (expected === actual) {
                return logPass(`Matched objects with value of '${expected}'`);
            } else {
                return logFail(`Object mismatch. Value of expected object is '${expected}' and actual is '${actual}'`);
            }
        }
    }
}

function verifyTrue(flag) {
    return verifyEqual(true, flag);
}

function verifyFalse(flag) {
    return verifyEqual(false, flag);
}

function verifyNull(obj) {
    ++countOfTotalChecks;
    if (obj == null) {
        return logPass('Object is null');
    } else {
        return logFail('Object is not null');
    }
}

function verifyNotNull(obj) {
    ++countOfTotalChecks;
    if (obj != null) {
        return logPass('Object is not null');
    } else {
        return logFail('Object is null');
    }
}

function verifyType(expectedType, actualObj) {
    ++countOfTotalChecks;
    if (typeof expectedType === 'string') {
        if (expectedType !== typeof actualObj) {
            return logFail(`Mismatched type. Expected '${expectedType}', but got '${typeof actualObj}'`);
        } else {
            return logPass(`Type is '${expectedType}'`);
        }
    } else {
        if (!(actualObj instanceof expectedType)) {
            return logFail(`Mismatched type. Expected '${expectedType}', but got '${typeof actualObj}'`);
        } else {
            return logPass(`Type is '${expectedType}'`);
        }
    }
}

function assertNotNull(obj) {
    if (!verifyNotNull(obj)) {
        throw TEST_FAILURE_EXCEPTION;
    }
    return true;
}

function assertType(expectedType, actualObj) {
    if (!verifyType(expectedType, actualObj)) {
        throw TEST_FAILURE_EXCEPTION;
    }
    return true;
}

function resetTimer() {
    startTimeMillisOfTestTimer = new Date().getTime();
}

function verifyElapsedMillisLessThan(maxExpectedMillis) {
    const elapsedTimeMillis = new Date().getTime() - startTimeMillisOfTestTimer;
    if (elapsedTimeMillis <= maxExpectedMillis) {
        return logPass(`Elapsed time of ${elapsedTimeMillis}ms is within limit of ${maxExpectedMillis}ms`);
    } else {
        return logFail(`Elapsed time of ${elapsedTimeMillis}ms is beyond acceptable range ${maxExpectedMillis}ms`);
    }
}

function verifyElapsedMillisBetween(minExpectedMillis, maxExpectedMillis) {
    const elapsedTimeMillis = new Date().getTime() - startTimeMillisOfTestTimer;
    if ((elapsedTimeMillis >= minExpectedMillis) && (elapsedTimeMillis <= maxExpectedMillis)) {
        return logPass(`Elapsed time of ${elapsedTimeMillis}ms is within range ${minExpectedMillis}-${maxExpectedMillis}ms`);
    } else {
        return logFail(`Elapsed time of ${elapsedTimeMillis}ms is out of range ${minExpectedMillis}-${maxExpectedMillis}ms`);
    }
}

function verifyElapsedMillisWithin(expectedMillis, toleranceMillis) {
    const elapsedTimeMillis = new Date().getTime() - startTimeMillisOfTestTimer;
    const minExpectedMillis = expectedMillis - toleranceMillis;
    const maxExpectedMillis = expectedMillis + toleranceMillis;
    if ((elapsedTimeMillis >= minExpectedMillis) && (elapsedTimeMillis <= maxExpectedMillis)) {
        return logPass(`Elapsed time of ${elapsedTimeMillis}ms is within tolerance of ${expectedMillis}ms +/- ${toleranceMillis}ms`);
    } else {
        return logFail(`Elapsed time of ${elapsedTimeMillis}ms is out of tolerance range ${minExpectedMillis}-${maxExpectedMillis}ms`);
    }
}
