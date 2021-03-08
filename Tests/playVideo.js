// TODO: Missing local random files
// TODO: Missing http:// files
// TODO: Missing https:// files
// TODO: Undecodable http:// files
// TODO: Undecodable https:// files

{
    const pathToTestVideos = `${pathToTestResources}/Videos`;

    const pathToMp4Video1 = `${pathToTestVideos}/video1.mp4`;
    const pathToMp4Video2 = `${pathToTestVideos}/video2.mp4`;
    const pathToMp4Video3 = `${pathToTestVideos}/video3.mp4`;
    const pathToMp4Video4 = `${pathToTestVideos}/video4.mp4`;
    const pathToMp4Video5 = `${pathToTestVideos}/video5.mp4`;
    const pathToMp4Video6 = `${pathToTestVideos}/video6.mp4`;
    const pathToRandomMp4Video = `${pathToTestVideos}/*.mp4`;
    const pathToUnknownFormatVideo = `${pathToTestVideos}/video1.mkv`;
    const pathToMissingMp4Video = `${pathToTestVideos}/ThisDoesNotExist.mp4`;

    const urlOfTestServerVideos = `${urlOfTestServer}/Videos`;

    const urlToMp4Video1 = `${urlOfTestServerVideos}/video1.mp4`;
    const urlToMp4Video2 = `${urlOfTestServerVideos}/video2.mp4`;
    const urlToMp4Video3 = `${urlOfTestServerVideos}/video3.mp4`;
    const urlToMp4Video4 = `${urlOfTestServerVideos}/video4.mp4`;
    const urlToMp4Video5 = `${urlOfTestServerVideos}/video5.mp4`;
    const urlToMp4Video6 = `${urlOfTestServerVideos}/video6.mp4`;

    const millisToleranceForStarting = 500;
    const millisToleranceForServer = 500;

    const listOfTestFunctions = [
    () => {
        Test.logName('isPlayingVideo(), initial state');

        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('stopVideo(), when nothing playing');

        stopVideo();
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, local, existing: Sleep until finished');

        playVideo(pathToMp4Video1);
        Test.verifyTrue(isPlayingVideo());
        sleep(3);
        Test.verifyTrue(isPlayingVideo());
        sleep(2);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, local, existing: Call stopVideo() mid way');

        Test.resetTimer();
        playVideo(pathToMp4Video2);
        Test.verifyTrue(isPlayingVideo());
        sleep(2);
        stopVideo();
        Test.verifyFalse(isPlayingVideo());
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForStarting);
    },
    () => {
        Test.logName('stopVideo(): when nothing playing');

        stopVideo();
        Test.pass('Harmless');
    },
    () => {
        Test.logName('playVideo(String, true) MP4, explicit, local, existing');

        Test.resetTimer();
        playVideo(pathToMp4Video3, true);
        Test.verifyFalse(isPlayingVideo());
        Test.verifyElapsedMillisBetween(3900, 4000 + millisToleranceForStarting);
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, local, existing: Unknown format');

        playVideo(pathToUnknownFormatVideo);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String, true) MP4, explicit, local, existing: Unknown format');

        playVideo(pathToUnknownFormatVideo, true);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, local, missing');

        playVideo(pathToMissingMp4Video);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String, true) MP4, explicit, local, missing');

        playVideo(pathToMissingMp4Video, true);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, local, existing: Call playVideo(String) mid way');

        playVideo(pathToMp4Video4);
        Test.verifyTrue(isPlayingVideo());
        sleep(2);
        playVideo(pathToMp4Video5);
        Test.verifyTrue(isPlayingVideo());
        sleep(5);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, local, existing: Call playVideo(String, true) mid way');

        playVideo(pathToMp4Video4);
        Test.verifyTrue(isPlayingVideo());
        sleep(2);
        Test.resetTimer();
        playVideo(pathToMp4Video6, true);
        Test.verifyFalse(isPlayingVideo());
        Test.verifyElapsedMillisBetween(3900, 4000 + millisToleranceForStarting);
    },
    () => {
        Test.logName('playVideo(String) MP4, random, local, existing: Sleep until finished');

        for (let i=0; i < 3; ++i) {
            playVideo(pathToRandomMp4Video);
            Test.verifyTrue(isPlayingVideo());
            sleep(3);
            Test.verifyTrue(isPlayingVideo());
            sleep(2);
            Test.verifyFalse(isPlayingVideo());
        }
    },
    () => {
        Test.logName('playVideo(String, true) MP4, random, local, existing');

        for (let i=0; i < 3; ++i) {
            Test.resetTimer();
            playVideo(pathToRandomMp4Video, true);
            Test.verifyFalse(isPlayingVideo());
            Test.verifyElapsedMillisBetween(3900, 4000 + millisToleranceForStarting);
        }
    },
    () => {
        Test.logName('playVideo(String) MP4, explicit, remote, existing: Sleep until finished');
        logHttpServerDependency();

        playVideo(urlToMp4Video1);
        Test.verifyTrue(isPlayingVideo());
        sleep(3);
        Test.verifyTrue(isPlayingVideo());
        sleep(2);
        Test.verifyFalse(isPlayingVideo());
    },
    () => {
        Test.logName('playVideo(String, true) MP4, explicit, remote, existing');
        logHttpServerDependency();

        Test.resetTimer();
        playVideo(urlToMp4Video2, true);
        Test.verifyFalse(isPlayingVideo());
        Test.verifyElapsedMillisBetween(3900, 4000 + millisToleranceForStarting + millisToleranceForServer);
    },
    () => {
        Test.logName('Bad calls');

        playVideo();
        playVideo('foo', 1);
        playVideo(true, 'foo');
    }];

    TestRegister.addTestSuite('showVideo', listOfTestFunctions);
}
