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
            console.log('//333/////')
            console.log(rule)
            computeStyle(rule, element);
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
/**
 * 根据匹配到的rule计算css
 * @param {规则} rule 
 * @param {元素} element 
 */
function computeStyle(rule, element) {
    for (let declaration of rule.declarations) {
        if (element.computeStyle) {
            element.computeStyle[declaration.property] = declaration.value;
        } else {
            element.computeStyle = {};
            element.computeStyle[declaration.property] = declaration.value;
        }
    }
}

