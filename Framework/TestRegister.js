const TestRegister = {
    mapOfTestSuiteNamesToListOfTestFunctions: {},

    addTestSuite: function(suiteName, listOfTestFunctions) {
        this.mapOfTestSuiteNamesToListOfTestFunctions[suiteName] = listOfTestFunctions;
    },

    getListOfTestSuiteNames: function() {
        return Object.keys(this.mapOfTestSuiteNamesToListOfTestFunctions);
    },

    tryGetListOfFunctionsForTestSuite: function(suiteName) {
        return this.mapOfTestSuiteNamesToListOfTestFunctions[suiteName];
    }
}
