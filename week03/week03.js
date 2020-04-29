
function convertStringToNumber(numberStr,type=10){

    const chars = numberStr.toUpperCase().split('')
    let i = 0;
    let number =0;
    let reg =/[a-zA-Z]/
    while(i<chars.length && chars[i] !== '.')
    {
        number *= type;
        let char = chars[i];
        if (reg.test(char)) {//处理字母
            if(type <= 10){//10 进制下字母无效
                return NaN
            }else{
                number += charToNumber(char)
            }
        }else{//数字
            number += charToNumber(char)
        }
        i++
    }
    if( chars[i] === '.'){
        if(type> 10){
            return number
        }
        i++;
    }
    let fraction = 1;

    while(i < chars.length){
        fraction *= type;
        number *= type
        let char = chars[i];
        if (reg.test(char)) {//处理字母
            if(type <= 10){//10 进制下字母无效
                return NaN
            }else{
                number += charToNumber(char)
            }
        }else{//数字
            number += charToNumber(char)
        }
        i++
    }
    return number/fraction
}


//字符转数字
function charToNumber(char){
    let reg =/[a-zA-Z]/
    if ( reg.test(char)) {
        return  char.charCodeAt() + 10 - 'A'.charCodeAt();
    }else{
        return char.charCodeAt()-'0'.charCodeAt()
    }
}

//字符串转数字
function convertNumberToString(number,type=10){
    let str = ''
    let intger = number;
    while(intger > 0){
        let ss = intger % type
        if (ss >= 10){
            str = numberToChar(ss)+str
        }else{
            str = (ss+'')+str
        }
        intger = Math.floor(intger/type)
    }
    return str+'';

}
function numberToChar(number){
        return String.fromCharCode(number+55)
}