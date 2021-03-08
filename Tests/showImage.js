// TODO: Random local files (*.jpg)
// TODO: Missing local random files
// TODO: Undecodeable local files
// TODO: Explicit http:// files
// TODO: Explicit https:// files
// TODO: Missing http:// files
// TODO: Missing https:// files
// TODO: Missing MediaURL host file
// TODO: Missing file reference from MediaURL file
// TODO: Undecodeable file reference from MediaURL file

{
    function logUrlFilesDependency() {
        TestLog.logNote('The following URL fetch tests require the following:');
        TestLog.logNote("* The URL Files from the 'Resource' directory are copied to 'Images/System/URL Files'");
        TestLog.logNote(`* Localhost HTTP server running on port 8000 serving files from '${pathToTestResources}'`);
        TestLog.logNote("    For example, 'python3 -m http.server'");
    }

    const File = Java.type('java.io.File');
    const MediaURL = Java.type('me.goddragon.teaseai.api.media.MediaURL');
    const MediaType = Java.type('me.goddragon.teaseai.api.media.MediaType');

    const millisToleranceForShowing = 500;
    const millisToleranceForDownloading = 500;

    const pathToTestResources = 'Personalities/Testing/Resources';
    const pathToTestImages = `${pathToTestResources}/Images`;
    const pathToDownloadedImages = 'Images/System/Downloaded Images';
    const regexPathToDownloadedJpgImages = `^${pathToDownloadedImages}/testing-image[1-6]\\.jpg$`;
    const regexPathToDownloadedPngImages = `^${pathToDownloadedImages}/testing-image[1-6]\\.png$`;
    const regexPathToDownloadedGifImages = `^${pathToDownloadedImages}/testing-image[1-6]\\.gif$`;

    const filenameOfTestPngUrls = 'testing.png.tumblr.com';
    const filenameOfTestJpgUrls = 'testing.jpg.tumblr.com';
    const filenameOfTestGifUrls = 'testing.gif.tumblr.com';

    const pathToJpgImage1 = `${pathToTestImages}/testing-image1.jpg`;
    const pathToJpgImage2 = `${pathToTestImages}/testing-image2.jpg`;
    const pathToJpgImage3 = `${pathToTestImages}/testing-image3.jpg`;
    const pathToPngImage4 = `${pathToTestImages}/testing-image4.png`;
    const pathToPngImage5 = `${pathToTestImages}/testing-image5.png`;
    const pathToPngImage6 = `${pathToTestImages}/testing-image6.png`;
    const pathToGifImage1 = `${pathToTestImages}/testing-image1.gif`;
    const pathToGifImage2 = `${pathToTestImages}/testing-image2.gif`;
    const pathToGifImage3 = `${pathToTestImages}/testing-image3.gif`;

    const mediaJpgUrl = new MediaURL(MediaType.IMAGE, filenameOfTestJpgUrls);
    const mediaPngUrl = new MediaURL(MediaType.IMAGE, filenameOfTestPngUrls);
    const mediaGifUrl = new MediaURL(MediaType.IMAGE, filenameOfTestGifUrls);

    const pathToMissingJpgImage = `${pathToTestImages}/testing-missing.jpg`;
    const pathToMissingPngImage = `${pathToTestImages}/testing-missing.png`;
    const pathToMissingGifImage = `${pathToTestImages}/testing-missing.gif`;

    const listOfTestFunctions = [
    () => {
        Test.logName('showImage(...): Preparation - Delete downloaded test images');

        [1, 2, 3, 4, 5, 6].forEach(index => {
            ['png', 'jpg', 'gif'].forEach(extension => {
                const filePath = `${pathToDownloadedImages}/testing-image${index}.${extension}`;
                const file = new File(filePath);
                if (file.exists()) {
                    if (file.delete()) {
                        TestLog.logNote(`Removed downloaded file '${filePath}'`);
                    } else {
                        Test.fail(`Unable to remove downloaded file '${filePath}'`);
                    }
                }
            });
        });
    },
    () => {
        Test.logName('showImage(String) JPEG, explicit, existing');
        TestLog.logNote('This first test may fail due to the Java VM initialising the image handling, in which case, run it again');

        Test.resetTimer();
        const fileJpeg1 = showImage(pathToJpgImage1);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.assertNotNull(fileJpeg1);
        Test.assertType(File, fileJpeg1);
        Test.verifyEqual(pathToJpgImage1, fileJpeg1.getPath());
    },
    () => {
        Test.logName('showImage(String, Integer) JPEG, explicit, existing');

        Test.resetTimer();
        const fileJpeg2 = showImage(pathToJpgImage2, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.assertNotNull(fileJpeg2);
        Test.assertType(File, fileJpeg2);
        Test.verifyEqual(pathToJpgImage2, fileJpeg2.getPath());
    },
    () => {
        Test.logName('showImage(String, Double) JPEG, explicit, existing');

        Test.resetTimer();
        const fileJpeg3 = showImage(pathToJpgImage3, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.assertNotNull(fileJpeg3);
        Test.assertType(File, fileJpeg3);
        Test.verifyEqual(pathToJpgImage3, fileJpeg3.getPath());
    },
    () => {
        Test.logName('showImage(String) JPEG, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingJpgImage);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String, Integer) JPEG, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingJpgImage, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String, Double) JPEG, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingJpgImage, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String) PNG, explicit, existing');

        Test.resetTimer();
        const filePng4 = showImage(pathToPngImage4);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.assertNotNull(filePng4);
        Test.assertType(File, filePng4);
        Test.verifyEqual(pathToPngImage4, filePng4.getPath());
    },
    () => {
        Test.logName('showImage(String, Integer) PNG, explicit, existing');

        Test.resetTimer();
        const filePng5 = showImage(pathToPngImage5, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.assertNotNull(filePng5);
        Test.assertType(File, filePng5);
        Test.verifyEqual(pathToPngImage5, filePng5.getPath());
    },
    () => {
        Test.logName('showImage(String, Double) PNG, explicit, existing');

        Test.resetTimer();
        const filePng6 = showImage(pathToPngImage6, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.assertNotNull(filePng6);
        Test.assertType(File, filePng6);
        Test.verifyEqual(pathToPngImage6, filePng6.getPath());
    },
    () => {
        Test.logName('showImage(String) PNG, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingPngImage);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String, Integer) PNG, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingPngImage, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String, Double) PNG, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingPngImage, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String) GIF, explicit, existing');

        Test.resetTimer();
        const fileGif1 = showImage(pathToGifImage1);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.assertNotNull(fileGif1);
        Test.assertType(File, fileGif1);
        Test.verifyEqual(pathToGifImage1, fileGif1.getPath());
    },
    () => {
        Test.logName('showImage(String, Integer) GIF, explicit, existing');

        Test.resetTimer();
        const fileGif2 = showImage(pathToGifImage2, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.assertNotNull(fileGif2);
        Test.assertType(File, fileGif2);
        Test.verifyEqual(pathToGifImage2, fileGif2.getPath());
    },
    () => {
        Test.logName('showImage(String, Double) GIF, explicit, existing');

        Test.resetTimer();
        const fileGif3 = showImage(pathToGifImage3, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.assertNotNull(fileGif3);
        Test.assertType(File, fileGif3);
        Test.verifyEqual(pathToGifImage3, fileGif3.getPath());
    },
    () => {
        Test.logName('showImage(String) GIF, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingGifImage);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String, Integer) GIF, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingGifImage, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(String, Double) GIF, explicit, missing');

        Test.resetTimer();
        const file = showImage(pathToMissingGifImage, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('showImage(File) JPEG, explicit, existing');

        const fileJpeg1 = new File(pathToJpgImage1);

        Test.resetTimer();
        const retFileJpeg1 = showImage(fileJpeg1);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.assertType(File, retFileJpeg1);
        Test.verifySame(fileJpeg1, retFileJpeg1);
    },
    () => {
        Test.logName('showImage(File, Integer) JPEG, explicit, existing');

        const fileJpeg2 = new File(pathToJpgImage2);

        Test.resetTimer();
        const retFileJpeg2 = showImage(fileJpeg2, 2);
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForShowing);
        Test.assertType(File, retFileJpeg2);
        Test.verifySame(fileJpeg2, retFileJpeg2);
    },
    () => {
        Test.logName('showImage(File, Double) JPEG, explicit, existing');

        const fileJpeg3 = new File(pathToJpgImage3);

        Test.resetTimer();
        const retFileJpeg3 = showImage(fileJpeg3, 4.5);
        Test.verifyElapsedMillisBetween(4000, 4500);
        Test.assertType(File, retFileJpeg3);
        Test.verifySame(fileJpeg3, retFileJpeg3);
    },
    () => {
        Test.logName('showImage(File) JPEG, explicit, missing');

        const fileMissing = new File(pathToMissingJpgImage);

        Test.resetTimer();
        const file = showImage(fileMissing);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File, Integer) JPEG, explicit, missing');

        const fileMissing = new File(pathToMissingJpgImage);

        Test.resetTimer();
        const file = showImage(fileMissing, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File, Double) JPEG, explicit, missing');

        const fileMissing = new File(pathToMissingJpgImage);

        Test.resetTimer();
        const file = showImage(fileMissing, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File) PNG, explicit, existing');

        const filePng4 = new File(pathToPngImage4);

        Test.resetTimer();
        const retFilePng4 = showImage(filePng4);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.assertType(File, retFilePng4);
        Test.verifySame(filePng4, retFilePng4);
    },
    () => {
        Test.logName('showImage(File, Integer) PNG, explicit, existing');

        const filePng5 = new File(pathToPngImage5);

        Test.resetTimer();
        const retFilePng5 = showImage(filePng5, 2);
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForShowing);
        Test.assertType(File, retFilePng5);
        Test.verifySame(filePng5, retFilePng5);
    },
    () => {
        Test.logName('showImage(File, Double) PNG, explicit, existing');

        const filePng6 = new File(pathToPngImage6);

        Test.resetTimer();
        const retFilePng6 = showImage(filePng6, 4.5);
        Test.verifyElapsedMillisBetween(4000, 4500);
        Test.assertType(File, retFilePng6);
        Test.verifySame(filePng6, retFilePng6);
    },
    () => {
        Test.logName('showImage(File) PNG, explicit, missing');

        const fileMissing = new File(pathToMissingPngImage);

        Test.resetTimer();
        const file = showImage(fileMissing);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File, Integer) PNG, explicit, missing');

        const fileMissing = new File(pathToMissingPngImage);

        Test.resetTimer();
        const file = showImage(fileMissing, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File, Double) PNG, explicit, missing');

        const fileMissing = new File(pathToMissingPngImage);

        Test.resetTimer();
        const file = showImage(fileMissing, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File) GIF, explicit, existing');

        const fileGif1 = new File(pathToGifImage1);

        Test.resetTimer();
        const retFileGif1 = showImage(fileGif1);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.assertType(File, retFileGif1);
        Test.verifySame(fileGif1, retFileGif1);
    },
    () => {
        Test.logName('showImage(File, Number) GIF, explicit, existing');

        const fileGif2 = new File(pathToGifImage2);

        Test.resetTimer();
        const retFileGif2 = showImage(fileGif2, 2);
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForShowing);
        Test.assertType(File, retFileGif2);
        Test.verifySame(fileGif2, retFileGif2);
    },
    () => {
        Test.logName('showImage(File, Double) GIF, explicit, existing');

        const fileGif3 = new File(pathToGifImage3);

        Test.resetTimer();
        const retFileGif3 = showImage(fileGif3, 4.5);
        Test.verifyElapsedMillisBetween(4000, 4500);
        Test.assertType(File, retFileGif3);
        Test.verifySame(fileGif3, retFileGif3);
    },
    () => {
        Test.logName('showImage(File) GIF, explicit, missing');

        const fileMissing = new File(pathToMissingGifImage);

        Test.resetTimer();
        const file = showImage(fileMissing);
        Test.verifyElapsedMillisLessThan(millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File, Integer) GIF, explicit, missing');

        const fileMissing = new File(pathToMissingGifImage);

        Test.resetTimer();
        const file = showImage(fileMissing, 3);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(File, Double) GIF, explicit, missing');

        const fileMissing = new File(pathToMissingGifImage);

        Test.resetTimer();
        const file = showImage(fileMissing, 5.8);
        Test.verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        Test.verifySame(fileMissing, file);
    },
    () => {
        Test.logName('showImage(MediaURL) JPG, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const fileJpg1 = showImage(mediaJpgUrl);
        Test.verifyElapsedMillisLessThan(millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(fileJpg1);
        Test.assertType(File, fileJpg1);
        Test.verifyMatch(regexPathToDownloadedJpgImages, fileJpg1.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL, Integer) JPG, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const fileJpg2 = showImage(mediaJpgUrl, 2);
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(fileJpg2);
        Test.assertType(File, fileJpg2);
        Test.verifyMatch(regexPathToDownloadedJpgImages, fileJpg2.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL, Double) JPG, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const fileJpg3 = showImage(mediaJpgUrl, 3.5);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(fileJpg3);
        Test.assertType(File, fileJpg3);
        Test.verifyMatch(regexPathToDownloadedJpgImages, fileJpg3.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL) PNG, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const urlPng1 = showImage(mediaPngUrl);
        Test.verifyElapsedMillisLessThan(millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(urlPng1);
        Test.assertType(File, urlPng1);
        Test.verifyMatch(regexPathToDownloadedPngImages, urlPng1.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL, Integer) PNG, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const urlPng2 = showImage(mediaPngUrl, 2);
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(urlPng2);
        Test.assertType(File, urlPng2);
        Test.verifyMatch(regexPathToDownloadedPngImages, urlPng2.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL, Double) PNG, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const urlPng3 = showImage(mediaPngUrl, 3.5);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(urlPng3);
        Test.assertType(File, urlPng3);
        Test.verifyMatch(regexPathToDownloadedPngImages, urlPng3.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL) GIF, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const urlGif1 = showImage(mediaGifUrl);
        Test.verifyElapsedMillisLessThan(millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(urlGif1);
        Test.assertType(File, urlGif1);
        Test.verifyMatch(regexPathToDownloadedGifImages, urlGif1.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL, Integer) GIF, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const urlGif2 = showImage(mediaGifUrl, 2);
        Test.verifyElapsedMillisBetween(2000, 2000 + millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(urlGif2);
        Test.assertType(File, urlGif2);
        Test.verifyMatch(regexPathToDownloadedGifImages, urlGif2.getPath());
    },
    () => {
        Test.logName('showImage(MediaURL, Double) GIF, explicit, existing');
        logUrlFilesDependency();

        Test.resetTimer();
        const urlGif3 = showImage(mediaGifUrl, 3.5);
        Test.verifyElapsedMillisBetween(3000, 3000 + millisToleranceForDownloading + millisToleranceForShowing);
        Test.assertNotNull(urlGif3);
        Test.assertType(File, urlGif3);
        Test.verifyMatch(regexPathToDownloadedGifImages, urlGif3.getPath());
    },
    () => {
        Test.logName('showImage(null)');

        Test.resetTimer();
        const file = showImage(null);
        Test.verifyElapsedMillisLessThan(100);
        Test.verifyNull(file);
    },
    () => {
        Test.logName('Bad calls');

        const fileJpeg1 = new File(pathToJpgImage1);

        Test.resetTimer();
        const bad1 = showImage();
        Test.verifyNull(bad1);
        const bad2 = showImage(null, 8);
        Test.verifyNull(bad2);
        const bad3 = showImage(2, fileJpeg1);
        Test.verifyNull(bad3);
        const bad4 = showImage(fileJpeg1, 1, 2.2);
        Test.verifyNull(bad4);
        const bad5 = showImage(1, mediaJpgUrl);
        Test.verifyNull(bad5);
        const bad6 = showImage(mediaJpgUrl, 1.1, 2);
        Test.verifyNull(bad6);
        const bad7 = showImage(pathToJpgImage1, pathToJpgImage2);
        Test.verifyNull(bad7);
        Test.verifyElapsedMillisLessThan(100);
    }];

    TestRegister.addTestSuite('showImage', listOfTestFunctions);
}
