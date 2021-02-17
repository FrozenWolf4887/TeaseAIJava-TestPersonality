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

function getListOfTestFunctions_showImage() {

    function logUrlFilesDependency() {
        logNote('The following URL fetch tests require the following:');
        logNote("* The URL Files from the 'Resource' directory are copied to 'Images/System/URL Files'");
        logNote(`* Localhost HTTP server running on port 8000 serving files from '${pathToTestImages}'`);
        logNote("    For example, 'python3 -m http.server'");
    }

    const File = Java.type('java.io.File');
    const MediaURL = Java.type('me.goddragon.teaseai.api.media.MediaURL');
    const MediaType = Java.type('me.goddragon.teaseai.api.media.MediaType');

    const millisToleranceForShowing = 500;
    const millisToleranceForDownloading = 500;

    const pathToTestImages = 'Personalities/Testing/Resources/Images';
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
        logTest('showImage(String) JPEG, explicit, existing');
        logNote('This first test may fail due to the Java VM initialising the image handling, in which case, run it again');

        resetTimer();
        const fileJpeg1 = showImage(pathToJpgImage1);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        assertNotNull(fileJpeg1);
        assertType(File, fileJpeg1);
        verifyEqual(pathToJpgImage1, fileJpeg1.getPath());
    },
    () => {
        logTest('showImage(String, Integer) JPEG, explicit, existing');

        resetTimer();
        const fileJpeg2 = showImage(pathToJpgImage2, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        assertNotNull(fileJpeg2);
        assertType(File, fileJpeg2);
        verifyEqual(pathToJpgImage2, fileJpeg2.getPath());
    },
    () => {
        logTest('showImage(String, Double) JPEG, explicit, existing');

        resetTimer();
        const fileJpeg3 = showImage(pathToJpgImage3, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        assertNotNull(fileJpeg3);
        assertType(File, fileJpeg3);
        verifyEqual(pathToJpgImage3, fileJpeg3.getPath());
    },
    () => {
        logTest('showImage(String) JPEG, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingJpgImage);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String, Integer) JPEG, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingJpgImage, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String, Double) JPEG, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingJpgImage, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String) PNG, explicit, existing');

        resetTimer();
        const filePng4 = showImage(pathToPngImage4);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        assertNotNull(filePng4);
        assertType(File, filePng4);
        verifyEqual(pathToPngImage4, filePng4.getPath());
    },
    () => {
        logTest('showImage(String, Integer) PNG, explicit, existing');

        resetTimer();
        const filePng5 = showImage(pathToPngImage5, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        assertNotNull(filePng5);
        assertType(File, filePng5);
        verifyEqual(pathToPngImage5, filePng5.getPath());
    },
    () => {
        logTest('showImage(String, Double) PNG, explicit, existing');

        resetTimer();
        const filePng6 = showImage(pathToPngImage6, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        assertNotNull(filePng6);
        assertType(File, filePng6);
        verifyEqual(pathToPngImage6, filePng6.getPath());
    },
    () => {
        logTest('showImage(String) PNG, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingPngImage);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String, Integer) PNG, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingPngImage, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String, Double) PNG, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingPngImage, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String) GIF, explicit, existing');

        resetTimer();
        const fileGif1 = showImage(pathToGifImage1);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        assertNotNull(fileGif1);
        assertType(File, fileGif1);
        verifyEqual(pathToGifImage1, fileGif1.getPath());
    },
    () => {
        logTest('showImage(String, Integer) GIF, explicit, existing');

        resetTimer();
        const fileGif2 = showImage(pathToGifImage2, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        assertNotNull(fileGif2);
        assertType(File, fileGif2);
        verifyEqual(pathToGifImage2, fileGif2.getPath());
    },
    () => {
        logTest('showImage(String, Double) GIF, explicit, existing');

        resetTimer();
        const fileGif3 = showImage(pathToGifImage3, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        assertNotNull(fileGif3);
        assertType(File, fileGif3);
        verifyEqual(pathToGifImage3, fileGif3.getPath());
    },
    () => {
        logTest('showImage(String) GIF, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingGifImage);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String, Integer) GIF, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingGifImage, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(String, Double) GIF, explicit, missing');

        resetTimer();
        const file = showImage(pathToMissingGifImage, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        verifyNull(file);
    },
    () => {
        logTest('showImage(File) JPEG, explicit, existing');

        const fileJpeg1 = new File(pathToJpgImage1);

        resetTimer();
        const retFileJpeg1 = showImage(fileJpeg1);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        assertType(File, retFileJpeg1);
        verifySame(fileJpeg1, retFileJpeg1);
    },
    () => {
        logTest('showImage(File, Integer) JPEG, explicit, existing');

        const fileJpeg2 = new File(pathToJpgImage2);

        resetTimer();
        const retFileJpeg2 = showImage(fileJpeg2, 2);
        verifyElapsedMillisBetween(2000, 2000 + millisToleranceForShowing);
        assertType(File, retFileJpeg2);
        verifySame(fileJpeg2, retFileJpeg2);
    },
    () => {
        logTest('showImage(File, Double) JPEG, explicit, existing');

        const fileJpeg3 = new File(pathToJpgImage3);

        resetTimer();
        const retFileJpeg3 = showImage(fileJpeg3, 4.5);
        verifyElapsedMillisBetween(4000, 4500);
        assertType(File, retFileJpeg3);
        verifySame(fileJpeg3, retFileJpeg3);
    },
    () => {
        logTest('showImage(File) JPEG, explicit, missing');

        const fileMissing = new File(pathToMissingJpgImage);

        resetTimer();
        const file = showImage(fileMissing);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File, Integer) JPEG, explicit, missing');

        const fileMissing = new File(pathToMissingJpgImage);

        resetTimer();
        const file = showImage(fileMissing, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File, Double) JPEG, explicit, missing');

        const fileMissing = new File(pathToMissingJpgImage);

        resetTimer();
        const file = showImage(fileMissing, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File) PNG, explicit, existing');

        const filePng4 = new File(pathToPngImage4);

        resetTimer();
        const retFilePng4 = showImage(filePng4);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        assertType(File, retFilePng4);
        verifySame(filePng4, retFilePng4);
    },
    () => {
        logTest('showImage(File, Integer) PNG, explicit, existing');

        const filePng5 = new File(pathToPngImage5);

        resetTimer();
        const retFilePng5 = showImage(filePng5, 2);
        verifyElapsedMillisBetween(2000, 2000 + millisToleranceForShowing);
        assertType(File, retFilePng5);
        verifySame(filePng5, retFilePng5);
    },
    () => {
        logTest('showImage(File, Double) PNG, explicit, existing');

        const filePng6 = new File(pathToPngImage6);

        resetTimer();
        const retFilePng6 = showImage(filePng6, 4.5);
        verifyElapsedMillisBetween(4000, 4500);
        assertType(File, retFilePng6);
        verifySame(filePng6, retFilePng6);
    },
    () => {
        logTest('showImage(File) PNG, explicit, missing');

        const fileMissing = new File(pathToMissingPngImage);

        resetTimer();
        const file = showImage(fileMissing);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File, Integer) PNG, explicit, missing');

        const fileMissing = new File(pathToMissingPngImage);

        resetTimer();
        const file = showImage(fileMissing, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File, Double) PNG, explicit, missing');

        const fileMissing = new File(pathToMissingPngImage);

        resetTimer();
        const file = showImage(fileMissing, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File) GIF, explicit, existing');

        const fileGif1 = new File(pathToGifImage1);

        resetTimer();
        const retFileGif1 = showImage(fileGif1);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        assertType(File, retFileGif1);
        verifySame(fileGif1, retFileGif1);
    },
    () => {
        logTest('showImage(File, Number) GIF, explicit, existing');

        const fileGif2 = new File(pathToGifImage2);

        resetTimer();
        const retFileGif2 = showImage(fileGif2, 2);
        verifyElapsedMillisBetween(2000, 2000 + millisToleranceForShowing);
        assertType(File, retFileGif2);
        verifySame(fileGif2, retFileGif2);
    },
    () => {
        logTest('showImage(File, Double) GIF, explicit, existing');

        const fileGif3 = new File(pathToGifImage3);

        resetTimer();
        const retFileGif3 = showImage(fileGif3, 4.5);
        verifyElapsedMillisBetween(4000, 4500);
        assertType(File, retFileGif3);
        verifySame(fileGif3, retFileGif3);
    },
    () => {
        logTest('showImage(File) GIF, explicit, missing');

        const fileMissing = new File(pathToMissingGifImage);

        resetTimer();
        const file = showImage(fileMissing);
        verifyElapsedMillisLessThan(millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File, Integer) GIF, explicit, missing');

        const fileMissing = new File(pathToMissingGifImage);

        resetTimer();
        const file = showImage(fileMissing, 3);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(File, Double) GIF, explicit, missing');

        const fileMissing = new File(pathToMissingGifImage);

        resetTimer();
        const file = showImage(fileMissing, 5.8);
        verifyElapsedMillisBetween(5000, 5000 + millisToleranceForShowing);
        verifySame(fileMissing, file);
    },
    () => {
        logTest('showImage(MediaURL) JPG, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const fileJpg1 = showImage(mediaJpgUrl);
        verifyElapsedMillisLessThan(millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(fileJpg1);
        assertType(File, fileJpg1);
        verifyMatch(regexPathToDownloadedJpgImages, fileJpg1.getPath());
    },
    () => {
        logTest('showImage(MediaURL, Integer) JPG, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const fileJpg2 = showImage(mediaJpgUrl, 2);
        verifyElapsedMillisBetween(2000, 2000 + millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(fileJpg2);
        assertType(File, fileJpg2);
        verifyMatch(regexPathToDownloadedJpgImages, fileJpg2.getPath());
    },
    () => {
        logTest('showImage(MediaURL, Double) JPG, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const fileJpg3 = showImage(mediaJpgUrl, 3.5);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(fileJpg3);
        assertType(File, fileJpg3);
        verifyMatch(regexPathToDownloadedJpgImages, fileJpg3.getPath());
    },
    () => {
        logTest('showImage(MediaURL) PNG, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const urlPng1 = showImage(mediaPngUrl);
        verifyElapsedMillisLessThan(millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(urlPng1);
        assertType(File, urlPng1);
        verifyMatch(regexPathToDownloadedPngImages, urlPng1.getPath());
    },
    () => {
        logTest('showImage(MediaURL, Integer) PNG, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const urlPng2 = showImage(mediaPngUrl, 2);
        verifyElapsedMillisBetween(2000, 2000 + millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(urlPng2);
        assertType(File, urlPng2);
        verifyMatch(regexPathToDownloadedPngImages, urlPng2.getPath());
    },
    () => {
        logTest('showImage(MediaURL, Double) PNG, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const urlPng3 = showImage(mediaPngUrl, 3.5);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(urlPng3);
        assertType(File, urlPng3);
        verifyMatch(regexPathToDownloadedPngImages, urlPng3.getPath());
    },
    () => {
        logTest('showImage(MediaURL) GIF, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const urlGif1 = showImage(mediaGifUrl);
        verifyElapsedMillisLessThan(millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(urlGif1);
        assertType(File, urlGif1);
        verifyMatch(regexPathToDownloadedGifImages, urlGif1.getPath());
    },
    () => {
        logTest('showImage(MediaURL, Integer) GIF, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const urlGif2 = showImage(mediaGifUrl, 2);
        verifyElapsedMillisBetween(2000, 2000 + millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(urlGif2);
        assertType(File, urlGif2);
        verifyMatch(regexPathToDownloadedGifImages, urlGif2.getPath());
    },
    () => {
        logTest('showImage(MediaURL, Double) GIF, explicit, existing');
        logUrlFilesDependency();

        resetTimer();
        const urlGif3 = showImage(mediaGifUrl, 3.5);
        verifyElapsedMillisBetween(3000, 3000 + millisToleranceForDownloading + millisToleranceForShowing);
        assertNotNull(urlGif3);
        assertType(File, urlGif3);
        verifyMatch(regexPathToDownloadedGifImages, urlGif3.getPath());
    },
    () => {
        logTest('showImage(null)');

        resetTimer();
        const file = showImage(null);
        verifyElapsedMillisLessThan(100);
        verifyNull(file);
    },
    () => {
        logTest('Bad calls');

        const fileJpeg1 = new File(pathToJpgImage1);

        resetTimer();
        const bad1 = showImage();
        verifyNull(bad1);
        const bad2 = showImage(null, 8);
        verifyNull(bad2);
        const bad3 = showImage(2, fileJpeg1);
        verifyNull(bad3);
        const bad4 = showImage(fileJpeg1, 1, 2.2);
        verifyNull(bad4);
        const bad5 = showImage(1, mediaJpgUrl);
        verifyNull(bad5);
        const bad6 = showImage(mediaJpgUrl, 1.1, 2);
        verifyNull(bad6);
        const bad7 = showImage(pathToJpgImage1, pathToJpgImage2);
        verifyNull(bad7);
        verifyElapsedMillisLessThan(100);
    }];

    return listOfTestFunctions;
}

registerTestSuite('showImage', getListOfTestFunctions_showImage());
