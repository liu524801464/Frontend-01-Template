function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }
    for (let key in element.computeStyle) {
        element.style[key] = element.computeStyle[key].value;
        let value = element.style[key];
        if (value.match(/px$/)) {
            element.style[key] = parseInt(value);
        }
        if (value.toString().match(/^[0-9\.]+$/)) {
            element.style[key] = parseInt(value);
        }
    }

    console.log(JSON.stringify(element.style));
    return element.style;
}

function layout(element) {
    if (!element.computeStyle) {
        return;
    }
    let elementStyle = getStyle(element);

    if (element.style.display !== 'inline-flex') { return; }
    let items = element.children.filter(key => key.type === 'element');


    let style = elementStyle;

    ['width', 'height'].forEach(size => {
        if (style[size] === null || style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    //初始化必要参数

    //决定主轴的方向 row | row-reverse | column | column-reverse;
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }

    //主轴的对齐方式  flex-start | flex-end | center | space-between | space-around;
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }

    //交叉轴上如何对齐。 flex-start | flex-end | center | baseline | stretch;
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }

    //多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
    if (!style.alignContent || style.alignContent) {
        style.alignContent = 'stretch'
    }

    let mainSize, maninStart, mainEnd, mainBase, mainSign;//主轴
    let crossSize, crossStart, crossEnd, crossBase, crossSign;//交叉轴，与主轴

    if (style.flexDirection === 'row') {
        mainSize = 'width';
        maninStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
        crossSign = +1;
        crossBase = 0;
    } else if (style.flexDirection === 'row-reverse') {

        mainSize = 'width';
        maninStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
        crossSign = +1;
        crossBase = 0;
    } else if (style.flexDirection === 'column') {

        mainSize = 'height';
        maninStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
        crossSign = +1;
        crossBase = 0;
    } else if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        maninStart = 'bootom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
        crossSign = +1;
        crossBase = 0;
    }

    if (style.flexWrap === 'wrap-reverse') {
        const temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;

        crossSign = -1;
    } else {
        crossSign = +1;
        crossBase = 0;
    }


    let vAutoMainSize = false;
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0;
        for (let item of items) {
            let itemStyle = getStyle(item);
            if (itemStyle[mainSize] != null && itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] += itemStyle[mainSize];
            }
        }
        vAutoMainSize = true;
    }

    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];
    var crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);
        if (itemStyle.flex)// flex item 
        {
            flexLine.push(item)
        } else if (style.flexWrap === 'nowrap') {
            if (!vAutoMainSize) {
                mainSpace -= itemStyle[mainSize];   //有可能造成mainspace < 0   
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] > style[mainSize]
            }
            if (mainSpace < itemStyle[mainSize]) {

                //保存原行上的信息
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                //创建新行
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    if (elementStyle.flexWrap === 'nowrap' && vAutoMainSize) {
        flexLine.crossSpace = (elementStyle[crossSize] !== (void 0)) ? elementStyle[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        let scale = elementStyle[mainSize] / (elementStyle[mainSize] - mainSpace);//缩放比例
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {//css flex item 的主轴方向长度设置为0
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale; //反比例缩放主轴方向长度
            itemStyle[maninStart] = currentMain;
            itemStyle[mainEnd] = currentMain + itemStyle[mainSize] * mainSign;

            currentMain = itemStyle[mainEnd];
        }
    } else {
        flexLines.forEach(line =>//处理每一行
        {
            let mainSpace = line.mainSpace;
            let flexTotal = 0;
            for (let i = 0; i < line.length; i++)//每一行中的每个item
            {
                let item = line[i];
                let itemStyle = getStyle(item);
                if (!item.flex && item.flex !== (void 0)) {
                    flexTotal += items.flex;
                }
            }
            if (flexTotal > 0) {
                let currentBase = mainBase;
                for (let i = 0; i < line.length; i++) {
                    let item = line[i];
                    let itemStyle = getStyle(item);
                    if (!item.flex && item.flex !== (void 0)) {
                        itemStyle[mainSize] += (itemStyle.flex / flexTotal) * line.mainSpace;//分配space到flex item 中去
                    }
                    //重新计算每个item的start end
                    itemStyle[maninStart] = currentBase;
                    itemStyle[mainEnd] = itemStyle[maninStart] + itemStyle[mainSize] * mainSign;
                    currentBase = itemStyle[mainEnd];
                }
            } else {


                //处理主轴移动方向

                if (elementStyle.justifyContent === 'flex-start') {
                    var currentMain = mainBase;
                    var step = 0;
                }
                if (elementStyle.justifyContent === 'flex-end') {
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                }
                if (elementStyle.justifyContent === 'center') {
                    var currentMain = mainSpace * mainSign / 2 + mainBase;
                    var step = 0
                }
                if (elementStyle.justifyContent === 'space-between') {
                    var currentMain = mainBase;
                    var step = mainSpace / (line.length - 1) * mainSign;
                }
                if (elementStyle.justifyContent === 'space-around') {
                    var step = mainSpace / line.length * mainSign;
                    var currentMain = mainBase + step / 2;
                }

                for (let i = 0; i < line.length; i++) {
                    let item = line[i];
                    let itemStyle = getStyle(item);
                    itemStyle[maninStart] = currentMain;
                    itemStyle[mainEnd] = currentMain + itemStyle[mainSize] * mainSign;
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        });
    }

    //处理交叉轴偏离

    var crossSpace;
    if (!elementStyle[crossSize]) {
        crossSpace = 0;
        elementStyle[crossSize] = 0
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] += flexLines[i].crossSpace;
        }
    } else {
        crossSpace = elementStyle[crossSpace];
        for (let line in flexLines) {
            crossSpace -= line.crossSpace;
        }
    }

    if (elementStyle.flexWrap === 'wrap-reverse') {
        crossBase = elementStyle[crossSize];
    } else {
        crossBase = 0;
    }

    var lineSize = elementStyle[crossSize] / flexLines.length;//计算行高

    var step;
    if (elementStyle.alignContent === 'flex-start') {
        crossBase += 0;
        setp = 0;
    } else if (elementStyle.alignContent === 'flex-end') {
        crossBase += crossSize * crossSign;
        step = 0;
    } else if (elementStyle.alignContent === 'center') {
        crossBase += crossSpace / 2 * crossSign;
        step = 0;
    } else if (elementStyle.alignContent === 'space-between') {
        crossBase += 0
        step = crossSpace / (flexLines.length - 1);
    } else if (elementStyle.alignContent === 'space-around') {
        step = crossSpace / (flexLines.length);
        crossBase += step * crossSign / 2;
    } else if (elementStyle.alignContent === 'stretch') {
        step = 0;
        crossBase += 0;
    }

    flexLines.forEach(function (line) {
        var lineCrossSize = style.alignContent === 'stretch' ? line.crossSpace + crossSpace / flexLines.length : line.crossSpace;
        for (let i = 0; i < line.length; i++) {
            let item = line[i];
            let itemStyle = getStyle(item);
            var align = itemStyle.alignSelf || elementStyle.alignItems;

            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }
            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize] * crossSign;
            }
            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossSize] * crossSign;
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] != null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }
        crossBase += crossSign * (lineCrossSize + step);
    });
    console.log(items);
}
module.exports.layout = layout;