let countOfChecks = 0;
let countOfFailures = 0;
let mapOfTestSuiteNamesToFunctions = {};

const colourOfTestSuite = 'BROWN';
const colourOfTest = 'BLUE';
const colourOfPass = 'GREEN';
const colourOfFail = 'RED';

function registerTestSuite(suiteName, testFunction) {
    mapOfTestSuiteNamesToFunctions[suiteName] = testFunction;
}

function getListOfTestSuiteNames() {
    return Object.keys(mapOfTestSuiteNamesToFunctions);
}

function runTestSuiteByName(suiteName) {
    const testFunction = mapOfTestSuiteNamesToFunctions[suiteName];
    if (testFunction != null) {
        logTestSuite(suiteName);
        testFunction();
    }
}

function log(message) {
    sendMessage(message, 0 ,false);
}

function logTestSuite(suiteName) {
    log(`<fs=20><b><u><c=${colourOfTestSuite}>Test Suite</c>: ${suiteName}</u></b></fs>`);
}

function logTest(testTitle) {
    log(`<c=${colourOfTest}>Test</c>: <u>${testTitle}</u>`);
}

function logFail(message) {
    log(`<c=${colourOfFail}><b>FAIL</b></c>: ${message}`);
    ++countOfFailures;
}

function logPass(message) {
    log(`<c=${colourOfPass}>PASS</c>: ${message}`);
}

function logResults() {
    if (countOfFailures == 0) {
        log(`<c=${colourOfTest}>Tested ${countOfChecks} checks</c>, <c=${colourOfPass}>ALL PASSED</c>`);
    } else {
        log(`<c=${colourOfTest}>Tested ${countOfChecks} checks</c>, <c=${colourOfFail}><b>${countOfFailures} FAILURES</b></c>`);
    }
}

function verifyEqual(expected, actual) {
    ++countOfChecks;
    if (typeof expected != typeof actual) {
        logFail("Mismatched type. Expected '" + typeof expected + "', but got '" + typeof actual + "'");
    } else {
        if (expected === actual) {
            logPass(`Matched value of '${expected}'`);
        } else {
            logFail(`Value mismatch. Expected '${expected}, but got '${actual}'`);
        }
    }
}

function verifyTrue(flag) {
    verifyEqual(true, flag);
}

function verifyFalse(flag) {
    verifyEqual(false, flag);
}

function verifyNull(obj) {
    ++countOfChecks;
    if (obj == null) {
        logPass('Object is null');
    } else {
        logFail('Object is not null');
    }
}

function verifyNotNull(obj) {
    ++countOfChecks;
    if (obj != null) {
        logPass('Object is not null');
    } else {
        logFail('Object is null');
    }
}

function verifyType(expectedType, actualObj) {
    ++countOfChecks;
    if (expectedType !== typeof actualObj) {
        logFail("Mismatched type. Expected '" + expectedType + "', but got '" + typeof actualObj + "'");
    } else {
        logPass(`Type is '${expectedType}'`);
    }
}
