module.exports = (pLength) => {
    let keyListAlpha="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        keyListInt="1234567890",
        keyListSpec="_-",
        password='';
    let len = Math.ceil(pLength/2);
    len = len - 1;
    let lenSpec = pLength-2*len;

    for (let i=0;i<len;i++) {
        password+=keyListAlpha.charAt(Math.floor(Math.random()*keyListAlpha.length));
        password+=keyListInt.charAt(Math.floor(Math.random()*keyListInt.length));
    }

    for (let i=0;i<lenSpec;i++)
        password+=keyListSpec.charAt(Math.floor(Math.random()*keyListSpec.length));

    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');

    return password;
}