const css = require('./CssParser.js')
const EOF = Symbol('EOF')  // END OF FILE
let currentToken = null
let currentAttr = null

let domTree = [{ type: 'document', children: [] }];
let currentTextNode = null;


function emit(token) {
    let top = domTree[domTree.length - 1];

    if (token.type === 'startString') {
        let element =
        {
            type: 'element',
            attributes: [],
            children: []
        }
        element.tagName = token.tagName
        for (let o in token) {
            if (o != 'type' && o != 'tagName') {
                element.attributes.push({ name: o, value: token[o] })
            }
        }
        element.parent = { tagName: top.tagName, attributes: top.attributes,parent:top.parent };
        css.computeCss(element)
        top.children.push(element);

        if (!token.isSelfClosing) {
            domTree.push(element)
        }
        currentTextNode = null;
    } else if (token.type === 'endTag') {
        currentTextNode = null;
        if (top.tagName != token.tagName) {
            throw new Error('Tag start are error');
        } else {
            if (top.tagName === 'style') {
                css.addCSSRules(top.children[0].content)
            }
            domTree.pop();
        }
    }
    else if (token.type === 'text') {
        if (currentTextNode == null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        emit({ type: 'EOF' })
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c === '!') {
        return markupOpen;
    } else if (/^[a-zA-Z]$/.test(c)) {
        currentToken = {
            type: 'startString',
            tagName: ''
        }
        return tagName(c)
    } else {
        throw Error('标签错误')
    }
}
function endTagOpen(c) {
    if (/^[a-zA-Z]$/.test(c)) {
        currentToken = { type: 'endTag', tagName: '' }
        return tagName(c)
    } else if (c === '>') {
        return data
    } else if (c === 'EOF') {

    } else {

    }
}
function tagName(c) {
    if (/^[\t\f\n ]$/.test(c)) {
        return beforeAttributeName;
    }
    else if (c === "/") {
        return selfCloseStartTag;
    } else if (c === '>') {
        emit(currentToken)
        return data
    } else if (/^[a-zA-Z]$/.test(c)) {
        currentToken.tagName += c.toLowerCase()
        return tagName
    } else if (c === EOF) {
        throw Error('标签错误')
    } else {
        return tagName;
    }
}
/**
 * 开始属性标签
 * @param {} c 
 */
function beforeAttributeName(c) {
    if (/^[\t\f\n ]$/.test(c)) {
        return beforeAttributeName
    } else if (c === '>' || c === '/' || c === 'EOF') {
        return afterAttibuteName(c)
    } else if (c === '=') {
        return beforeAttributeName
    } else {
        currentAttr = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}
/**
 * 
 * @param {属性标签} c 
 */
function attributeName(c) {
    if (/^[\t\f\n ]$/.test(c) || c === "/" || c === '>' || c === 'EOF') {
        return afterAttibuteName(c)
    } else if (c === '=') {
        return beforeAttributeValue
    }
    else if (c === '\U0000') {

    } else if (c === "\"" || c === '\'' || c === '<') {

    } else {
        currentAttr.name += c
        return attributeName
    }
}
function afterAttibuteName(c) {
    if (/^[\t\f\n ]$/.test(c)) {
        return afterAttibuteName
    }
    else if (c === '/') {
        return selfCloseStartTag;
    }
    else if (c === '=') {
        return beforeAttributeValue
    }
    else if (c === '>') {
        emit(currentToken);
        return data
    } else if (c === 'EOF') {
        currentToken = {
            type: 'endTag',
            content: ''
        }
        emit(currentToken)
        return data
    } else {
        currentAttr = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }

}

function beforeAttributeValue(c) {
    if (/^[\t\f\n ]$/.test(c)) {
        return beforeAttributeValue(c)
    } else if (c === '\"') {
        return doubleQuoteAtrributeValue
    } else if (c === '\'') {
        return singeQuoteAttributeValue
    } else if (c === '>') {
        return data
    } else {
        return unQuoteAtrributeValue(c)
    }
}

function doubleQuoteAtrributeValue(c) {
    if (c === '\"') {
        return afterAttributeValue
    } else if (c === '$') {

    } else if (c === '\u0000') {

    } else if (c === 'EOF') {

    } else {
        currentAttr.value += c
        return doubleQuoteAtrributeValue
    }
}
function singeQuoteAttributeValue(c) {
    if (c === '\'') {
        return afterAttributeValue
    } else if (c === '$') {

    } else if (c === '\u0000') {

    } else if (c === 'EOF') {

    } else {
        currentAttr.value += c
        return singeQuoteAttributeValue
    }
}
function unQuoteAtrributeValue(c) {
    if (/^[\t\f\n ]$/.test(c)) {
        currentToken[currentAttr.name] = currentAttr.value
        return beforeAttributeName
    } else if (c === '&') {

    } else if (c === '>') {
        currentToken[currentAttr.name] = currentAttr.value
        emit(currentToken);
        return data;
    }
    else if (c === '\u0000') {

    } else if (c === '\"' || c === '\'' || c === '<' || c === '=' || c === '`') {

    } else if (c === "EOF") {

    } else {
        currentAttr.value += c;
        return unQuoteAtrributeValue
    }
}
function afterAttributeValue(c) {
    if (/^[\t\f\n ]$/.test(c)) {
        return beforeAttributeName
    } else if (c === '/') {
        currentToken[currentAttr.name] = currentAttr.value
        return selfCloseStartTag
    } else if (c === '>') {
        currentToken[currentAttr.name] = currentAttr.value
        emit(currentToken);
        return data
    } else if (c === 'EOF') {
        emit(EOF)
        emit(currentToken);
    } else {
        return beforeAttributeName(c)
    }
}


/**
 * 
 * @param {自封闭标签}} c 
 */
function selfCloseStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data
    } else if (c === "EOF") {

    } else {
        return beforeAttributeName(c);
    }
}
function markupOpen(c) {

}


module.exports.parserHTML = function parserHTML(html) {
    // console.log(html)

    let state = data;

    for (let c of html) {
        if (state) {
            state = state(c)
        }
    }
    state = state(EOF)
    return domTree[0];
}