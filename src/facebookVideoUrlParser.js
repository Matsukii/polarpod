module.exports = (url = false) => {
    // ! FREEZED
    let a = "aaa/bbb/ccc";
    let reg = new RegExp('\/[a-z]{1,}\/');
    console.log(reg.exec(a));
};
