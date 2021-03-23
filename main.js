run('Framework/TestLog.js');
run('Framework/TestRegister.js');
run('Framework/TestRunner.js');
run('Framework/Test.js');

const pathToTestResources = 'Personalities/Testing/Resources';
const pathToTestUrlFiles = `${pathToTestResources}/URL Files`;
const pathToSystemUrlFiles = 'Images/System/URL Files';
const pathToDownloadedImages = 'Images/System/Downloaded Images';
const urlOfTestServer = 'http://localhost:8000';

function logHttpServerDependency() {
    TestLog.logNote('The following media fetch tests require the following:');
    TestLog.logNote(`* Localhost HTTP server running on port 8000 serving files from '${pathToTestResources}'`);
    TestLog.logNote("    For example, 'python3 -m http.server'");
}

function logUrlFilesDependency() {
    TestLog.logNote('The following URL fetch tests require the following:');
    TestLog.logNote(`* The URL Files from the '${pathToTestUrlFiles}' directory are copied to '${pathToSystemUrlFiles}'`);
    TestLog.logNote(`* Localhost HTTP server running on port 8000 serving files from '${pathToTestResources}'`);
    TestLog.logNote("    For example, 'python3 -m http.server'");
}

run('Tests/getVar.js');
run('Tests/setVar.js');
run('Tests/showImage.js');
run('Tests/playAudio.js');
run('Tests/playVideo.js');

TestRegister.getListOfTestSuiteNames().forEach(suiteName => {
    TestRunner.runTestSuiteByName(suiteName);
});

TestRunner.logResults();

createInput('Done.');
