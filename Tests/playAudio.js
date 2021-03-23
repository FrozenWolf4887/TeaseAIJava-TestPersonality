// TODO: Missing local random files

{
    const pathToTestAudio = `${pathToTestResources}/Audio`;

    const pathToMp3AudioC4 = `${pathToTestAudio}/testing-c4.mp3`;
    const pathToMp3AudioD4 = `${pathToTestAudio}/testing-d4.mp3`;
    const pathToMp3AudioE4 = `${pathToTestAudio}/testing-e4.mp3`;
    const pathToMp3AudioF4 = `${pathToTestAudio}/testing-f4.mp3`;
    const pathToMp3AudioG4 = `${pathToTestAudio}/testing-g4.mp3`;
    const pathToMp3AudioA4 = `${pathToTestAudio}/testing-a4.mp3`;
    const pathToMp3AudioB4 = `${pathToTestAudio}/testing-b4.mp3`;
    const pathToRandomMp3Audio = `${pathToTestAudio}/*.mp3`;
    const pathToUnknownFormatAudio = `${pathToTestAudio}/testing-c4.ogg`;
    const pathToMissingMp3Audio = `${pathToTestAudio}/ThisDoesNotExist.mp3`;

    const millisToleranceForStarting = 500;

    const listOfTestFunctions = [
    () => {
        Test.logName('stopAudio(), when nothing playing');

        stopAudio();
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playAudio(String) MP3, explicit, existing: Sleep until finished');
        TestLog.logNote('This first test may fail due to the Java VM initialising the audio handling, in which case, run it again');

        Test.resetTimer();
        playAudio(pathToMp3AudioC4);
        Test.verifyElapsedMillisLessThan(millisToleranceForStarting);
        sleep(5);
    },
    () => {
        Test.logName('playAudio(String) MP3, explicit, existing: Call stopAudio(String) mid way');

        playAudio(pathToMp3AudioD4);
        sleep(2);
        stopAudio(pathToMp3AudioD4);
        TestLog.logNote('Audio should have stopped');
        sleep(1);
    },
    () => {
        Test.logName('playAudio(String) MP3, explicit, existing: Call stopAudio(String) of non-playing audio mid way');

        playAudio(pathToMp3AudioE4);
        sleep(2);
        stopAudio(pathToMp3AudioG4);
        TestLog.logNote('Audio should continue until the end');
        sleep(3);
    },
    () => {
        Test.logName('stopAudio(String) MP3, explicit, local: When nothing playing');

        stopAudio(pathToMp3AudioD4);
        Test.pass('Harmless');
    },
    () => {
        Test.logName('stopAudio(): When nothing playing');

        stopAudio();
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playAudio(String, true) MP3, explicit, existing');

        Test.resetTimer();
        playAudio(pathToMp3AudioE4, true);
        Test.verifyElapsedMillisBetween(3900, 4000 + millisToleranceForStarting);
    },
    () => {
        Test.logName('playAudio(String) MP3, explicit, existing: Unknown format');

        playAudio(pathToUnknownFormatAudio);
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playAudio(String, true) OGG, explicit, existing: Unknown format');

        playAudio(pathToUnknownFormatAudio, true);
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playAudio(String) MP3, explicit, missing');

        playAudio(pathToMissingMp3Audio);
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playAudio(String, true) MP3, explicit, missing');

        playAudio(pathToMissingMp3Audio, true);
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playAudio(String) x2, MP3, explicit, existing');

        playAudio(pathToMp3AudioC4);
        sleep(2);
        playAudio(pathToMp3AudioG4);
        TestLog.logNote('Two audio samples should be playing');
        sleep(5);
    },
    () => {
        Test.logName('playAudio(String) x3 MP3, explicit, existing: Call stopAudio(String) on first audio');

        playAudio(pathToMp3AudioF4);
        sleep(0.5);
        playAudio(pathToMp3AudioA4);
        sleep(0.5);
        playAudio(pathToMp3AudioB4);
        TestLog.logNote('Three audio samples should be playing');
        sleep(1);
        stopAudio(pathToMp3AudioF4);
        TestLog.logNote('First audio sample should have stopped');
        sleep(4);
    },
    () => {
        Test.logName('playAudio(String) x3 MP3, explicit, existing: Call stopAudio(String) on second audio');

        playAudio(pathToMp3AudioC4);
        sleep(0.5);
        playAudio(pathToMp3AudioF4);
        sleep(0.5);
        playAudio(pathToMp3AudioB4);
        TestLog.logNote('Three audio samples should be playing');
        sleep(1);
        stopAudio(pathToMp3AudioF4);
        TestLog.logNote('Second audio sample should have stopped');
        sleep(4);
    },
    () => {
        Test.logName('playAudio(String) x3 MP3, explicit, existing: Call stopAudio()');

        playAudio(pathToMp3AudioD4);
        sleep(0.5);
        playAudio(pathToMp3AudioG4);
        sleep(0.5);
        playAudio(pathToMp3AudioB4);
        TestLog.logNote('Three audio samples should be playing');
        sleep(1);
        stopAudio();
        TestLog.logNote('All audio samples should have stopped');
        sleep(1);
    },
    () => {
        Test.logName('playAudio(String) x3 MP3, explicit, existing: Same sample overlapping');
        TestLog.logNote('Overlapping samples can be subject to phase interference and cancellation');

        playAudio(pathToMp3AudioC4);
        sleep(0.5);
        playAudio(pathToMp3AudioC4);
        sleep(0.5);
        playAudio(pathToMp3AudioC4);
        TestLog.logNote('Three identical audio samples should be playing');
        sleep(5);
    },
    () => {
        Test.logName('playAudio(String) x3 MP3, explicit, existing: Same sample overlapping: Call stopAudio(String)');
        TestLog.logNote('Overlapping samples can be subject to phase interference and cancellation');

        playAudio(pathToMp3AudioE4);
        sleep(0.5);
        playAudio(pathToMp3AudioE4);
        sleep(0.5);
        playAudio(pathToMp3AudioE4);
        sleep(0.5);
        TestLog.logNote('Three identical audio samples should be playing');
        sleep(1);
        stopAudio(pathToMp3AudioE4);
        TestLog.logNote('All audio samples should have stopped');
        sleep(1);
    },
    () => {
        Test.logName('playAudio(String) MP3, random, existing');

        for (let i=0; i < 3; ++i) {
            TestLog.logNote('Should be playing some audio');
            playAudio(pathToRandomMp3Audio);
            sleep(5);
        }
    },
    () => {
        Test.logName('playAudio(String, true) MP3, random, existing');

        for (let i=0; i < 3; ++i) {
            TestLog.logNote('Should be playing some audio');
            Test.resetTimer();
            playAudio(pathToRandomMp3Audio, true);
            Test.verifyElapsedMillisBetween(3900, 4000 + millisToleranceForStarting);
        }
    },
    () => {
        Test.logName('Bad calls');

        playAudio();
        playAudio('foo', 1);
        playAudio(true, 'foo');
    }];

    TestRegister.addTestSuite('playAudio', listOfTestFunctions);
}
