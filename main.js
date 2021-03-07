run('Framework/TestLog.js');
run('Framework/TestRegister.js');
run('Framework/TestRunner.js');
run('Framework/Test.js');
run('Tests/getVar.js');
run('Tests/setVar.js');
run('Tests/showImage.js');

TestRegister.getListOfTestSuiteNames().forEach(suiteName => {
    TestRunner.runTestSuiteByName(suiteName);
});

TestRunner.logResults();

createInput('Done.');
