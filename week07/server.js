
const http = require('http');
const server = http.createServer(function (req, res) {

    console.log('Request recided');
    console.log(req.headers)
    console.log(req.body)
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('好好学习，天天向上');
    res.end(`<html maaa=a >
    <head>
      <style>
       div
       {
           border: solid 1px black;
        }
      .items{
          height: 100px;
          margin: 5px 0 0 0;
          text-align: center;
          height: 50px;
          vertical-align: baseline;
          width: 110px;
          background-color: rgb(0,0,255);
        }
        .items2{
          background-color: rgb(0,255,0);
        }
        .items6{
          background-color: rgb(200,200,200);
        }

     .box{
        display: inline-flex;
        flexWrap: nowrap;
        width: 300px; 
        flexDirection: row;
        margin-bottom: 50px;
        justifyContent: space-between;
        background-color: rgb(255,0,0);
    }
    </style>
  </head>
  <body>
    <div class="box" id='box'>
        <div class="items" style="flex: 1">1</div>
        <div class="items items2" style="width: 110px;">2</div>
        <div class="items" style="width: 110px;">3</div>
        <div class="items items2" style="width: 110px;">4</div>
        <div class="items items6" style="width: 110px;;flex: 1">5</div>
    </div>
  </body>
  </html>`);
    // res.end(` <img class="items items2"/><img />`)


});

server.listen(8088)
console.log('Server running on port 8000');


let js ={
	"type": "document",
	"children": [{
		"type": "element",
		"attributes": [{
			"name": "maaa",
			"value": "a"
		}],
		"children": [{
				"type": "text",
				"content": "\n    "
			},
			{
				"type": "element",
				"attributes": [],
				"children": [{
						"type": "text",
						"content": "\n      "
					},
					{
						"type": "element",
						"attributes": [],
						"children": [{
							"type": "text",
							"content": "\n    "
						}],
						"tagName": "style",
						"parent": {
							"tagName": "head",
							"attributes": [],
							"parent": {
								"tagName": "html",
								"attributes": [{
									"name": "maaa",
									"value": "a"
								}],
								"parent": {}
							}
						}
					},
					{
						"type": "text",
						"content": "\n  "
					}
				],
				"tagName": "head",
				"parent": {
					"tagName": "html",
					"attributes": [{
						"name": "maaa",
						"value": "a"
					}],
					"parent": {}
				}
			},
			{
				"type": "text",
				"content": "\n  "
			},
			{
				"type": "element",
				"attributes": [],
				"children": [{
						"type": "text",
						"content": "\n    "
					},
					{
						"type": "element",
						"attributes": [{
								"name": "class",
								"value": "box"
							},
							{
								"name": "id",
								"value": "box"
							}
						],
						"children": [{
								"type": "text",
								"content": "\n        "
							},
							{
								"type": "element",
								"attributes": [{
										"name": "class",
										"value": "items"
									},
									{
										"name": "style",
										"value": "flex: 1"
									}
								],
								"children": [{
									"type": "text",
									"content": "1"
								}],
								"tagName": "div",
								"parent": {
									"tagName": "div",
									"attributes": [{
											"name": "class",
											"value": "box"
										},
										{
											"name": "id",
											"value": "box"
										}
									],
									"parent": {
										"tagName": "body",
										"attributes": [],
										"parent": {
											"tagName": "html",
											"attributes": [{
												"name": "maaa",
												"value": "a"
											}],
											"parent": {}
										}
									}
								},
								"computeStyle": {
									"border": {
										"value": "solid 1px black",
										"specificity": [
											0,
											0,
											0,
											1
										]
									},
									"height": {
										"value": "100px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"margin": {
										"value": "5px 0 0 0",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"text-align": {
										"value": "center",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"vertical-align": {
										"value": "baseline",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"width": {
										"value": "110px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"background-color": {
										"value": "rgb(0,0,255)",
										"specificity": [
											0,
											0,
											1,
											0
										]
									}
								},
								"style": {
									"border": "solid 1px black",
									"height": 100,
									"margin": "5px 0 0 0",
									"text-align": "center",
									"vertical-align": "baseline",
									"width": 110,
									"background-color": "rgb(0,0,255)",
									"top": 500,
									"bottom": 600
								},
								"right": null
							},
							{
								"type": "text",
								"content": "\n        "
							},
							{
								"type": "element",
								"attributes": [{
										"name": "class",
										"value": "items"
									},
									{
										"name": "style",
										"value": "width: 110px;"
									}
								],
								"children": [{
									"type": "text",
									"content": "2"
								}],
								"tagName": "div",
								"parent": {
									"tagName": "div",
									"attributes": [{
											"name": "class",
											"value": "box"
										},
										{
											"name": "id",
											"value": "box"
										}
									],
									"parent": {
										"tagName": "body",
										"attributes": [],
										"parent": {
											"tagName": "html",
											"attributes": [{
												"name": "maaa",
												"value": "a"
											}],
											"parent": {}
										}
									}
								},
								"computeStyle": {
									"border": {
										"value": "solid 1px black",
										"specificity": [
											0,
											0,
											0,
											1
										]
									},
									"height": {
										"value": "100px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"margin": {
										"value": "5px 0 0 0",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"text-align": {
										"value": "center",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"vertical-align": {
										"value": "baseline",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"width": {
										"value": "110px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"background-color": {
										"value": "rgb(0,0,255)",
										"specificity": [
											0,
											0,
											1,
											0
										]
									}
								},
								"style": {
									"border": "solid 1px black",
									"height": 100,
									"margin": "5px 0 0 0",
									"text-align": "center",
									"vertical-align": "baseline",
									"width": 110,
									"background-color": "rgb(0,0,255)",
									"top": 500,
									"bottom": 600
								},
								"left": null,
								"right": null
							},
							{
								"type": "text",
								"content": "\n        "
							},
							{
								"type": "element",
								"attributes": [{
										"name": "class",
										"value": "items"
									},
									{
										"name": "style",
										"value": "width: 110px;"
									}
								],
								"children": [{
									"type": "text",
									"content": "3"
								}],
								"tagName": "div",
								"parent": {
									"tagName": "div",
									"attributes": [{
											"name": "class",
											"value": "box"
										},
										{
											"name": "id",
											"value": "box"
										}
									],
									"parent": {
										"tagName": "body",
										"attributes": [],
										"parent": {
											"tagName": "html",
											"attributes": [{
												"name": "maaa",
												"value": "a"
											}],
											"parent": {}
										}
									}
								},
								"computeStyle": {
									"border": {
										"value": "solid 1px black",
										"specificity": [
											0,
											0,
											0,
											1
										]
									},
									"height": {
										"value": "100px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"margin": {
										"value": "5px 0 0 0",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"text-align": {
										"value": "center",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"vertical-align": {
										"value": "baseline",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"width": {
										"value": "110px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"background-color": {
										"value": "rgb(0,0,255)",
										"specificity": [
											0,
											0,
											1,
											0
										]
									}
								},
								"style": {
									"border": "solid 1px black",
									"height": 100,
									"margin": "5px 0 0 0",
									"text-align": "center",
									"vertical-align": "baseline",
									"width": 110,
									"background-color": "rgb(0,0,255)",
									"top": 700,
									"bottom": 800
								},
								"right": null
							},
							{
								"type": "text",
								"content": "\n        "
							},
							{
								"type": "element",
								"attributes": [{
										"name": "class",
										"value": "items"
									},
									{
										"name": "style",
										"value": "width: 110px;"
									}
								],
								"children": [{
									"type": "text",
									"content": "4"
								}],
								"tagName": "div",
								"parent": {
									"tagName": "div",
									"attributes": [{
											"name": "class",
											"value": "box"
										},
										{
											"name": "id",
											"value": "box"
										}
									],
									"parent": {
										"tagName": "body",
										"attributes": [],
										"parent": {
											"tagName": "html",
											"attributes": [{
												"name": "maaa",
												"value": "a"
											}],
											"parent": {}
										}
									}
								},
								"computeStyle": {
									"border": {
										"value": "solid 1px black",
										"specificity": [
											0,
											0,
											0,
											1
										]
									},
									"height": {
										"value": "100px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"margin": {
										"value": "5px 0 0 0",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"text-align": {
										"value": "center",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"vertical-align": {
										"value": "baseline",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"width": {
										"value": "110px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"background-color": {
										"value": "rgb(0,0,255)",
										"specificity": [
											0,
											0,
											1,
											0
										]
									}
								},
								"style": {
									"border": "solid 1px black",
									"height": 100,
									"margin": "5px 0 0 0",
									"text-align": "center",
									"vertical-align": "baseline",
									"width": 110,
									"background-color": "rgb(0,0,255)",
									"top": 700,
									"bottom": 800
								},
								"left": null,
								"right": null
							},
							{
								"type": "text",
								"content": "\n        "
							},
							{
								"type": "element",
								"attributes": [{
										"name": "class",
										"value": "items"
									},
									{
										"name": "style",
										"value": "width: 110px;;flex: 1"
									}
								],
								"children": [{
									"type": "text",
									"content": "5"
								}],
								"tagName": "div",
								"parent": {
									"tagName": "div",
									"attributes": [{
											"name": "class",
											"value": "box"
										},
										{
											"name": "id",
											"value": "box"
										}
									],
									"parent": {
										"tagName": "body",
										"attributes": [],
										"parent": {
											"tagName": "html",
											"attributes": [{
												"name": "maaa",
												"value": "a"
											}],
											"parent": {}
										}
									}
								},
								"computeStyle": {
									"border": {
										"value": "solid 1px black",
										"specificity": [
											0,
											0,
											0,
											1
										]
									},
									"height": {
										"value": "100px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"margin": {
										"value": "5px 0 0 0",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"text-align": {
										"value": "center",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"vertical-align": {
										"value": "baseline",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"width": {
										"value": "110px",
										"specificity": [
											0,
											0,
											1,
											0
										]
									},
									"background-color": {
										"value": "rgb(0,0,255)",
										"specificity": [
											0,
											0,
											1,
											0
										]
									}
								},
								"style": {
									"border": "solid 1px black",
									"height": 100,
									"margin": "5px 0 0 0",
									"text-align": "center",
									"vertical-align": "baseline",
									"width": 110,
									"background-color": "rgb(0,0,255)",
									"top": 900,
									"bottom": 1000
								},
								"right": null
							},
							{
								"type": "text",
								"content": "\n    "
							}
						],
						"tagName": "div",
						"parent": {
							"tagName": "body",
							"attributes": [],
							"parent": {
								"tagName": "html",
								"attributes": [{
									"name": "maaa",
									"value": "a"
								}],
								"parent": {}
							}
						},
						"computeStyle": {
							"border": {
								"value": "solid 1px black",
								"specificity": [
									0,
									0,
									0,
									1
								]
							},
							"display": {
								"value": "inline-flex",
								"specificity": [
									0,
									0,
									1,
									0
								]
							},
							"width": {
								"value": "300px",
								"specificity": [
									0,
									0,
									1,
									0
								]
							},
							"flex-wrap": {
								"value": "wrap",
								"specificity": [
									0,
									0,
									1,
									0
								]
							},
							"flex-direction": {
								"value": "row",
								"specificity": [
									0,
									0,
									1,
									0
								]
							},
							"margin-bottom": {
								"value": "50px",
								"specificity": [
									0,
									0,
									1,
									0
								]
							},
							"background-color": {
								"value": "rgb(255,0,0)",
								"specificity": [
									0,
									0,
									1,
									0
								]
							}
						},
						"style": {
							"border": "solid 1px black",
							"display": "inline-flex",
							"width": 300,
							"flex-wrap": "wrap",
							"flex-direction": "row",
							"margin-bottom": 50,
							"background-color": "rgb(255,0,0)",
							"flexDirection": "row",
							"flexWrap": "wrap-reverse",
							"alignItems": "stretch",
							"alignContent": "stretch",
							"height": 500
						}
					},
					{
						"type": "text",
						"content": "\n  "
					}
				],
				"tagName": "body",
				"parent": {
					"tagName": "html",
					"attributes": [{
						"name": "maaa",
						"value": "a"
					}],
					"parent": {}
				},
				"computeStyle": {},
				"style": {}
			},
			{
				"type": "text",
				"content": "\n  "
			}
		],
		"tagName": "html",
		"parent": {}
	}]
}