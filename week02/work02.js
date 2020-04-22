// 验证二进制,十六进制,8进制
function testNumber(strNumber) {
    const reg = /^0[bB][01]+$|^0[xX][0-9a-fA-F]+$|^0[oO][0-7]+$|^([-+]?\d+)(\.)?(\d+)?$|^([-+]?\d+)(\.)?(\d+)?([eE])?(\d+)$/
    strNumber = strNumber.trim()
    return reg.test(strNumber)
}
//UTF-8编码
function utf8_Encoding(str) {
    let utf8_str = ''
    for (let i = 0; i < str.length; i++) {
        //一个字节
        if (str.codePointAt(i) <= 0x0000007F) {
            const bytes = '0' + str.codePointAt(i).toString(2)
            utf8_str += parseInt(bytes, 2).toString(16) + ' ';
        } else if (str.codePointAt(i) <= 0X000007FF) {//2个字节 110
            const bytes = str.codePointAt(i).toString(2)
            let ss = utf8_EncodingHelper(bytes, 2)
            let sss = '110' + PrefixInteger(bytes.substring(0, bytes.length - 6), 5)
            let ssssss = sss + ss;
            utf8_str += parseInt(ssssss, 2).toString(16).toUpperCase() + ' ';

        } else if (str.codePointAt(i) <= 0x0000FFFF)//3个字节  1110
        {
            const bytes = str.codePointAt(i).toString(2)
            let ss = utf8_EncodingHelper(bytes, 3)
            let sss = '1110' + PrefixInteger(bytes.substring(0, bytes.length - 12), 4)
            let ssssss = sss + ss;
            utf8_str += parseInt(ssssss, 2).toString(16).toUpperCase() + ' ';

        } else {
            const bytes = str.codePointAt(i).toString(2)
            let ss = utf8_EncodingHelper(bytes, 2)
            let sss = '11110' + PrefixInteger(bytes.substring(0, bytes.length - 18), 3)
            let ssssss = sss + ss;
            utf8_str += parseInt(ssssss, 2).toString(16).toUpperCase() + ' ';
        }
    }
    return utf8_str;
}
function utf8_EncodingHelper(byteStr, num) {
    str = ''
    for (let i = 0; i < num - 1; i++) {
        str = '10' + byteStr.substr(byteStr.length - (i + 1) * 6, 6) + str;
    }
    return str;
}
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

// UTF-8编码解法2 （位操作，没有进行16进制转换）
function unicode2Utf_8(str) {
    var utf8Arr = []
    for (let i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i)
        if (code <= 0x007F) {//一个字节
            utf8Arr.push(code)
        } else if (code <= 0X000007FF) {//2个字节
            utf8Arr.push(0b11000000 | 0b11111 & (code >> 6))
            utf8Arr.push(0b10000000 | 0b111111 & code)
        } else if (code <= 0x0000FFFF)//3个字节
        {
            utf8Arr.push(0b11100000 | 0b1111 & (code >> 12))
            utf8Arr.push(0b10000000 | (0b111111) & (code >> 6))
            utf8Arr.push(0b10000000 | (0b111111) & (code))
        } else {
            utf8Arr.push(0b11110000 | 0b111 & (code >> 18))
            utf8Arr.push(0b10000000 | (0b111111) & (code >> 12))
            utf8Arr.push(0b10000000 | (0b111111) & (code >> 6))
            utf8Arr.push(0b10000000 | (0b111111) & (code))
        }
    }
    return utf8Arr;
}