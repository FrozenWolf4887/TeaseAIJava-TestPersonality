// TODO: Missing explicit local files
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

function getListOfTests_showImage() {

    function logUrlFilesDependency() {
        logNote('The following URL fetch tests require the following:');
        logNote("* The URL Files from the 'Resource' directory are copied to 'Images/System/URL Files'");
        logNote(`* Localhost HTTP server running on port 8000 serving files from '${pathToTestImages}'`);
        logNote("    For example, 'python3 -m http.server'");
    }

    const pathToTestImages = 'Personalities/Testing/Resources/Images';
    const pathToDownloadedImages = 'Images/System/Downloaded Images';
    const filenameOfTestPngUrls = 'testing.png.tumblr.com';
    const filenameOfTestJpgUrls = 'testing.jpg.tumblr.com';
    const filenameOfTestGifUrls = 'testing.gif.tumblr.com';

    const File = Java.type('java.io.File');
    const MediaURL = Java.type('me.goddragon.teaseai.api.media.MediaURL');
    const MediaType = Java.type('me.goddragon.teaseai.api.media.MediaType');

    function test_showImage_String_JPEG() {
        logTest('showImage(String) JPEG');
        logNote('This test may fail due to the Java VM initialising the image handling, in which case, run it again');

        resetTimer();
        const fileJpeg1 = showImage(`${pathToTestImages}/testing-image1.jpg`);
        verifyElapsedMillisLessThan(500);
        assertNotNull(fileJpeg1);
        assertType(File, fileJpeg1);
        verifyEqual(`${pathToTestImages}/testing-image1.jpg`, fileJpeg1.getPath());

        resetTimer();
        const fileJpeg2 = showImage(`${pathToTestImages}/testing-image2.jpg`, 3);
        verifyElapsedMillisBetween(3000, 3500);
        assertNotNull(fileJpeg2);
        assertType(File, fileJpeg2);
        verifyEqual(`${pathToTestImages}/testing-image2.jpg`, fileJpeg2.getPath());

        resetTimer();
        const fileJpeg3 = showImage(`${pathToTestImages}/testing-image3.jpg`, 5.8);
        verifyElapsedMillisBetween(5000, 5500);
        assertNotNull(fileJpeg3);
        assertType(File, fileJpeg3);
        verifyEqual(`${pathToTestImages}/testing-image3.jpg`, fileJpeg3.getPath());
    }

    function test_showImage_String_PNG() {
        logTest('showImage(String) PNG');

        resetTimer();
        const filePng4 = showImage(`${pathToTestImages}/testing-image4.png`);
        verifyElapsedMillisLessThan(500);
        assertNotNull(filePng4);
        assertType(File, filePng4);
        verifyEqual(`${pathToTestImages}/testing-image4.png`, filePng4.getPath());

        resetTimer();
        const filePng5 = showImage(`${pathToTestImages}/testing-image5.png`, 3);
        verifyElapsedMillisBetween(3000, 3500);
        assertNotNull(filePng5);
        assertType(File, filePng5);
        verifyEqual(`${pathToTestImages}/testing-image5.png`, filePng5.getPath());

        resetTimer();
        const filePng6 = showImage(`${pathToTestImages}/testing-image6.png`, 5.8);
        verifyElapsedMillisBetween(5000, 5500);
        assertNotNull(filePng6);
        assertType(File, filePng6);
        verifyEqual(`${pathToTestImages}/testing-image6.png`, filePng6.getPath());
    }

    function test_showImage_String_GIF() {
        logTest('showImage(String) GIF');

        resetTimer();
        const fileGif1 = showImage(`${pathToTestImages}/testing-image1.gif`);
        verifyElapsedMillisLessThan(500);
        assertNotNull(fileGif1);
        assertType(File, fileGif1);
        verifyEqual(`${pathToTestImages}/testing-image1.gif`, fileGif1.getPath());

        resetTimer();
        const fileGif2 = showImage(`${pathToTestImages}/testing-image2.gif`, 3);
        verifyElapsedMillisBetween(3000, 3500);
        assertNotNull(fileGif2);
        assertType(File, fileGif2);
        verifyEqual(`${pathToTestImages}/testing-image2.gif`, fileGif2.getPath());

        resetTimer();
        const fileGif3 = showImage(`${pathToTestImages}/testing-image3.gif`, 5.8);
        verifyElapsedMillisBetween(5000, 5500);
        assertNotNull(fileGif3);
        assertType(File, fileGif3);
        verifyEqual(`${pathToTestImages}/testing-image3.gif`, fileGif3.getPath());
    }

    function test_showImage_File_JPEG() {
        logTest('showImage(File) JPEG');

        const fileJpeg1 = new File(`${pathToTestImages}/testing-image1.jpg`);
        const fileJpeg2 = new File(`${pathToTestImages}/testing-image2.jpg`);
        const fileJpeg3 = new File(`${pathToTestImages}/testing-image3.jpg`);

        resetTimer();
        const retFileJpeg1 = showImage(fileJpeg1);
        verifyElapsedMillisLessThan(500);
        assertType(File, retFileJpeg1);
        verifySame(fileJpeg1, retFileJpeg1);

        resetTimer();
        const retFileJpeg2 = showImage(fileJpeg2, 2);
        verifyElapsedMillisBetween(2000, 2500);
        assertType(File, retFileJpeg2);
        verifySame(fileJpeg2, retFileJpeg2);

        resetTimer();
        const retFileJpeg3 = showImage(fileJpeg3, 4.5);
        verifyElapsedMillisBetween(4000, 4500);
        assertType(File, retFileJpeg3);
        verifySame(fileJpeg3, retFileJpeg3);
    }

    function test_showImage_File_PNG() {
        logTest('showImage(File) PNG');

        const filePng4 = new File(`${pathToTestImages}/testing-image4.png`);
        const filePng5 = new File(`${pathToTestImages}/testing-image5.png`);
        const filePng6 = new File(`${pathToTestImages}/testing-image6.png`);

        resetTimer();
        const retFilePng4 = showImage(filePng4);
        verifyElapsedMillisLessThan(500);
        assertType(File, retFilePng4);
        verifySame(filePng4, retFilePng4);

        resetTimer();
        const retFilePng5 = showImage(filePng5, 2);
        verifyElapsedMillisBetween(2000, 2500);
        assertType(File, retFilePng5);
        verifySame(filePng5, retFilePng5);

        resetTimer();
        const retFilePng6 = showImage(filePng6, 4.5);
        verifyElapsedMillisBetween(4000, 4500);
        assertType(File, retFilePng6);
        verifySame(filePng6, retFilePng6);
    }

    function test_showImage_File_GIF() {
        logTest('showImage(File) GIF');

        const fileGif1 = new File(`${pathToTestImages}/testing-image1.gif`);
        const fileGif2 = new File(`${pathToTestImages}/testing-image2.gif`);
        const fileGif3 = new File(`${pathToTestImages}/testing-image3.gif`);

        resetTimer();
        const retFileGif1 = showImage(fileGif1);
        verifyElapsedMillisLessThan(500);
        assertType(File, retFileGif1);
        verifySame(fileGif1, retFileGif1);

        resetTimer();
        const retFileGif2 = showImage(fileGif2, 2);
        verifyElapsedMillisBetween(2000, 2500);
        assertType(File, retFileGif2);
        verifySame(fileGif2, retFileGif2);

        resetTimer();
        const retFileGif3 = showImage(fileGif3, 4.5);
        verifyElapsedMillisBetween(4000, 4500);
        assertType(File, retFileGif3);
        verifySame(fileGif3, retFileGif3);
    }

    function test_showImage_MediaURL_JPG() {
        logTest('showImage(MediaURL) JPG');
        logUrlFilesDependency();

        const mediaJpgUrl = new MediaURL(MediaType.IMAGE, filenameOfTestJpgUrls);

        resetTimer();
        const fileJpg1 = showImage(mediaJpgUrl);
        verifyElapsedMillisLessThan(500);
        assertNotNull(fileJpg1);
        assertType(File, fileJpg1);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.jpg$`, fileJpg1.getPath());

        resetTimer();
        const fileJpg2 = showImage(mediaJpgUrl, 2);
        verifyElapsedMillisBetween(2000, 2500);
        assertNotNull(fileJpg2);
        assertType(File, fileJpg2);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.jpg$`, fileJpg2.getPath());

        resetTimer();
        const fileJpg3 = showImage(mediaJpgUrl, 3.5);
        verifyElapsedMillisBetween(3000, 3500);
        assertNotNull(fileJpg3);
        assertType(File, fileJpg3);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.jpg$`, fileJpg3.getPath());
    }

    function test_showImage_MediaURL_PNG() {
        logTest('showImage(MediaURL) PNG');
        logUrlFilesDependency();

        const mediaPngUrl = new MediaURL(MediaType.IMAGE, filenameOfTestPngUrls);

        resetTimer();
        const urlPng1 = showImage(mediaPngUrl);
        verifyElapsedMillisLessThan(500);
        assertNotNull(urlPng1);
        assertType(File, urlPng1);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.png$`, urlPng1.getPath());

        resetTimer();
        const urlPng2 = showImage(mediaPngUrl, 2);
        verifyElapsedMillisBetween(2000, 2500);
        assertNotNull(urlPng2);
        assertType(File, urlPng2);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.png$`, urlPng2.getPath());

        resetTimer();
        const urlPng3 = showImage(mediaPngUrl, 3.5);
        verifyElapsedMillisBetween(3000, 3500);
        assertNotNull(urlPng3);
        assertType(File, urlPng3);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.png$`, urlPng3.getPath());
    }

    function test_showImage_MediaURL_GIF() {
        logTest('showImage(MediaURL) GIF');
        logUrlFilesDependency();

        const mediaGifUrl = new MediaURL(MediaType.IMAGE, filenameOfTestGifUrls);

        resetTimer();
        const urlGif1 = showImage(mediaGifUrl);
        verifyElapsedMillisLessThan(500);
        assertNotNull(urlGif1);
        assertType(File, urlGif1);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.gif$`, urlGif1.getPath());

        resetTimer();
        const urlGif2 = showImage(mediaGifUrl, 2);
        verifyElapsedMillisBetween(2000, 2500);
        assertNotNull(urlGif2);
        assertType(File, urlGif2);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.gif$`, urlGif2.getPath());

        resetTimer();
        const urlGif3 = showImage(mediaGifUrl, 3.5);
        verifyElapsedMillisBetween(3000, 3500);
        assertNotNull(urlGif3);
        assertType(File, urlGif3);
        verifyMatch(`^${pathToDownloadedImages}/testing-image[1-6]\\.gif$`, urlGif3.getPath());
    }

    function test_showImage_NULL() {
        logTest('showImage(null)');

        resetTimer();
        const file = showImage(null);
        verifyElapsedMillisLessThan(100);
        verifyNull(file);
    }

    function test_showImage_BadCalls() {
        logTest('Bad calls');

        const fileJpeg1 = new File(`${pathToTestImages}/testing-image1.jpg`);
        const mediaJpgUrl = new MediaURL(MediaType.IMAGE, filenameOfTestJpgUrls);

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
        verifyElapsedMillisLessThan(100);
    }

    return [
        test_showImage_String_JPEG,
        test_showImage_String_PNG,
        test_showImage_String_GIF,
        test_showImage_File_JPEG,
        test_showImage_File_PNG,
        test_showImage_File_GIF,
        test_showImage_MediaURL_JPG,
        test_showImage_MediaURL_PNG,
        test_showImage_MediaURL_GIF,
        test_showImage_NULL,
        test_showImage_BadCalls
    ];
}

registerTestSuite('showImage', getListOfTests_showImage());
