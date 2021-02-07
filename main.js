run('framework.js');
run('tests/getVar.js');
run('tests/setVar.js');
run('tests/showImage.js');

getListOfTestSuiteNames().forEach(suiteName => {
    runTestSuiteByName(suiteName);
});

logResults();

createInput('Done.');
