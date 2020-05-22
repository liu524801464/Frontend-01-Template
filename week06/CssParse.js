const Css = require('css')
let rules = [];
module.exports.addCSSRules = function (text) {
    var ast = Css.parse(text)
    rules.push(...ast.stylesheet.rules)
    console.log('///////')
    console.log(rules)
}

module.exports.computeCss = function (element) {
    if (rules.length === 0) { return; }
    element.computeStyle={};
    for (let rule of rules) {
        let isMatch = false;
        let selectors = rule.selectors[0].split(' ').reverse();
        if (!macth(selectors[0], element))//如果最后一个没有匹配，则该条rule结束
        {
            continue;
        }
        let j = 1;
        let vOElement = element.parent;
        while (vOElement && j < selectors.length) {
            if (macth(selectors[j], vOElement) == true) {
                j++
            }
            vOElement = vOElement.parent
        }
        if (j >= selectors.length) //最主要的一句判断是否匹配成功的地方
        {
            isMatch = true;
        }
        if (isMatch) {
            let sp = specifity(rule.selectors[0]);
            let computeStyle = element.computeStyle;
            for(let declaration of rule.declarations){
                if(!computeStyle[declaration.property]){
                    computeStyle[declaration.property]={}
                }
                if(! computeStyle[declaration.property].specificity)
                {
                    computeStyle[declaration.property].value = declaration.value;
                    computeStyle[declaration.property].specificity=sp
                }else if(compare( sp,computeStyle[declaration.property].specificity)>0){
                    computeStyle[declaration.property].value = declaration.value;
                    computeStyle[declaration.property].specificity=sp
                }

            }
        }
    }
}
function macth(selector, element) {
    let vFirstCode = selector.charAt(0)
    if (vFirstCode === '#') {//id 选择器
        let attr = element.attributes.filter(key => key.name === 'id')[0];
        if (attr && '#' + attr.value === selector) {
            return true;
        }
    } else if (vFirstCode === '.') {//class 选择器
        let classAttr = element.attributes.filter(key => key.nane === 'class').split(' ');
        for (let o of classAttr) {
            if ('.' + o === selector) {
                return true;
            }
        }
        return false;
    } else {//标签
        return selector == element.tagName;
    }
    return false;
}


function specifity(selector) {
    let p = [0, 0, 0, 0];
    let selectors = selector.split(' ').reverse();
    for (let o of selectors) {
        if (o.charAt(0) === '#') {
            p[1] += 1
        } else if (o.charAt(0) === '.') {
            p[2] += 1
        } else {
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0];
    } else if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    } else if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}
