TestRegister.addTestSuite('setVar', [() => {
    const uniqueId = setDate().getTimeInMillis();
    const testBoolVarName = 'testBoolVar' + uniqueId
    const testIntVarName = 'testIntVar' + uniqueId
    const testFloatVarName = 'testFloatVar' + uniqueId
    const testStringVarName = 'testStringVar' + uniqueId

    Test.logName('setVar new variable');

    const vBoolCreated = setVar(testBoolVarName, true);
    Test.assertNotNull(vBoolCreated);
    Test.verifyType('boolean', vBoolCreated);
    Test.verifyEqual(true, vBoolCreated);

    const vIntCreated = setVar(testIntVarName, 5);
    Test.assertNotNull(vIntCreated);
    Test.verifyType('number', vIntCreated);
    Test.verifyEqual(5, vIntCreated);

    const vFloatCreated = setVar(testFloatVarName, 6.5);
    Test.assertNotNull(vFloatCreated);
    Test.verifyType('number', vFloatCreated);
    Test.verifyEqual(6.5, vFloatCreated);

    const vStringCreated = setVar(testStringVarName, 'Hello');
    Test.assertNotNull(vStringCreated);
    Test.verifyType('string', vStringCreated);
    Test.verifyEqual('Hello', vStringCreated);

    Test.logName('getVar of set variable');

    const vBoolRetrieved = getVar(testBoolVarName);
    Test.assertNotNull(vBoolRetrieved);
    Test.verifyType('boolean', vBoolRetrieved);
    Test.verifyEqual(true, vBoolRetrieved);

    const vIntRetrieved = getVar(testIntVarName);
    Test.assertNotNull(vIntRetrieved);
    Test.verifyType('number', vIntRetrieved);
    Test.verifyEqual(5, vIntRetrieved);

    const vFloatRetrieved = getVar(testFloatVarName);
    Test.assertNotNull(vFloatRetrieved);
    Test.verifyType('number', vFloatRetrieved);
    Test.verifyEqual(6.5, vFloatRetrieved);

    const vStringRetrieved = getVar(testStringVarName);
    Test.assertNotNull(vStringRetrieved);
    Test.verifyType('string', vStringRetrieved);
    Test.verifyEqual('Hello', vStringRetrieved);

    Test.logName('setVar replace existing variable with same type');

    const vBoolReplaced = setVar(testBoolVarName, false);
    Test.assertNotNull(vBoolReplaced);
    Test.verifyType('boolean', vBoolReplaced);
    Test.verifyEqual(false, vBoolReplaced);

    const vIntReplaced = setVar(testIntVarName, 7);
    Test.assertNotNull(vIntReplaced);
    Test.verifyType('number', vIntReplaced);
    Test.verifyEqual(7, vIntReplaced);

    const vFloatReplaced = setVar(testFloatVarName, 8.5);
    Test.assertNotNull(vFloatReplaced);
    Test.verifyType('number', vFloatReplaced);
    Test.verifyEqual(8.5, vFloatReplaced);

    const vStringReplaced = setVar(testStringVarName, 'World');
    Test.assertNotNull(vStringReplaced);
    Test.verifyType('string', vStringReplaced);
    Test.verifyEqual('World', vStringReplaced);

    Test.logName('getVar of updated variable');

    const vBoolUpdated = getVar(testBoolVarName);
    Test.assertNotNull(vBoolUpdated);
    Test.verifyType('boolean', vBoolUpdated);
    Test.verifyEqual(false, vBoolUpdated);

    const vIntUpdated = getVar(testIntVarName);
    Test.assertNotNull(vIntUpdated);
    Test.verifyType('number', vIntUpdated);
    Test.verifyEqual(7, vIntUpdated);

    const vFloatUpdated = getVar(testFloatVarName);
    Test.assertNotNull(vFloatUpdated);
    Test.verifyType('number', vFloatUpdated);
    Test.verifyEqual(8.5, vFloatUpdated);

    const vStringUpdated = getVar(testStringVarName);
    Test.assertNotNull(vStringUpdated);
    Test.verifyType('string', vStringUpdated);
    Test.verifyEqual('World', vStringUpdated);

    Test.logName('setVar replace existing variable with different type');

    const vIntReplacedWithBool = setVar(testIntVarName, true);
    Test.assertNotNull(vIntReplacedWithBool);
    Test.verifyType('boolean', vIntReplacedWithBool);
    Test.verifyEqual(true, vIntReplacedWithBool);

    const vBoolReplacedWithInt = setVar(testBoolVarName, 11);
    Test.assertNotNull(vBoolReplacedWithInt);
    Test.verifyType('number', vBoolReplacedWithInt);
    Test.verifyEqual(11, vBoolReplacedWithInt);

    const vStringReplacedWithFloat = setVar(testStringVarName, 12.5);
    Test.assertNotNull(vStringReplacedWithFloat);
    Test.verifyType('number', vStringReplacedWithFloat);
    Test.verifyEqual(12.5, vStringReplacedWithFloat);

    const vFloatReplacedWithString = setVar(testFloatVarName, 'Banana');
    Test.assertNotNull(vFloatReplacedWithString);
    Test.verifyType('string', vFloatReplacedWithString);
    Test.verifyEqual('Banana', vFloatReplacedWithString);

    Test.logName('getVar of new variable type');

    const vBoolNewType = getVar(testIntVarName);
    Test.assertNotNull(vBoolNewType);
    Test.verifyType('boolean', vBoolNewType);
    Test.verifyEqual(true, vBoolNewType);

    const vIntNewType = getVar(testBoolVarName);
    Test.assertNotNull(vIntNewType);
    Test.verifyType('number', vIntNewType);
    Test.verifyEqual(11, vIntNewType);

    const vFloatNewType = getVar(testStringVarName);
    Test.assertNotNull(vFloatNewType);
    Test.verifyType('number', vFloatNewType);
    Test.verifyEqual(12.5, vFloatNewType);

    const vStringNewType = getVar(testFloatVarName);
    Test.assertNotNull(vStringNewType);
    Test.verifyType('string', vStringNewType);
    Test.verifyEqual('Banana', vStringNewType);

    Test.logName('Bad calls');

    const bad1 = setVar();
    Test.verifyNull(bad1);
    const bad2 = setVar(null);
    Test.verifyNull(bad2);
    const bad3 = setVar('someVar', 0, 1);
    Test.verifyNull(bad3);
}]);
