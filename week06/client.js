
const net = require('net');

const parser = require('./HtmlParser.js')

const applicationJson = "application/json"
const content_type_form = "appliction/x-www-form-urlencoded"
class Request {
    constructor(options) {
        console.log(options)
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['content-type']) {
            this.headers['content-type'] = content_type_form
        }
        if (this.headers['content-type'] === applicationJson) {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers['content-type'] === content_type_form) {
            this.bodyText = Object.keys(this.body).map(key => `${key}:${encodeURIComponent(this.body[key])}`).join('&')
        }
        this.headers['content-length'] = this.bodyText.length
    }
    open(method, url) {

    }
    send(connecttion) {
        const parser = new ReponseParser()
        return new Promise((resolve, reject) => {
            if (connecttion) {
                connecttion.write(this.toString());
            } else {
                connecttion = net.createConnection({
                    port: this.port,
                    host: this.host
                }, () => {
                    
                    connecttion.write(this.toString())
                })
                connecttion.on('data', (data) => {
                    console.log(data.toString())
                    parser.receive(data.toString())
                    
                    if(parser.isFinished){
                        resolve(parser.reponse)
                    }
                    connecttion.end();
                });
                connecttion.on('end', () => { });
            }
        })
    }
    /**
     *  
     */
    toString() {
        return `${this.method} ${this.path}  HTTP/1.1\r\nhost:${this.host}\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`;
    }

}

class Reponse {

}

class ReponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3
        this.WAITING_HEADER_SPACE_END =4;
        this.WAITING_HEADER_VALUE = 5;
        this.WAITING_HEADER_LINE_END = 6;
        this.WAITING_HEADER_BLOCK_END = 7;
        this.WAITING_BODY = 8;


        this.Current = this.WAITING_STATUS_LINE;
        this.StatusLine = ""
        this.headers = {}
        this.headerName = ""
        this.headerValue = ""
        this.bodyParse = null;
    }
    get isFinished(){
        return this.bodyParse && this.bodyParse.isFinished
    }
    get reponse(){
        this.StatusLine.match(/ HTTP\/1.1 ([0-9]+)([\s\S]+)/);
        return{
            stateCode:RegExp.$1,
            statusText:RegExp.$2,
            headers:this.headers,
            body:this.bodyParse.content
        }
    }

    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char) {
        if (this.Current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.Current = this.WAITING_STATUS_LINE_END
            }
            else {
                this.StatusLine += char
            }
        }
        else if (this.Current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.Current = this.WAITING_HEADER_NAME
            }
        }
        else if (this.Current === this.WAITING_HEADER_NAME) {
            if (char === ":") {
                this.Current = this.WAITING_HEADER_SPACE;
            }
            else if (char === '\r') {
                this.Current = this.WAITING_HEADER_SPACE_END;
            }
            else {
                this.headerName += char;
            }
        }else if(this.Current === this.WAITING_HEADER_SPACE_END){
            if(char==='\n'){
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.Current = this.WAITING_BODY
                    this.bodyParse = new TrunkedParser();
                }
            }
        }
        else if (this.Current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.Current = this.WAITING_HEADER_VALUE
            }
        }
        else if (this.Current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.Current = this.WAITING_HEADER_LINE_END
                this.headers[this.headerName] = this.headerValue
                this.headerName = "";
                this.headerValue = "";
            } else {
                this.headerValue += char
            }
        }
        else if (this.Current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.Current = this.WAITING_HEADER_NAME
            }
        }
         else if (this.Current = this.WAITING_BODY) {
            this.bodyParse.receiveChar(char)
        }
    }
}

class TrunkedParser {
    constructor() {
        this.WAITING_LEHGTH = 0;
        this.WAITING_LEHGTH_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.Current = this.WAITING_LEHGTH;

        this.isFinished = false;
        this.length = 0
        this.content = '';
    }
    receiveChar(char) {

        // console.log(JSON.stringify(char));
    
        if (this.Current === this.WAITING_LEHGTH) {
            console.log(char)
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true
                }
                this.Current = this.WAITING_LEHGTH_END;
            }
            else {
                this.length *= 16;
                this.length += (parseInt(char,16) );
            }
        }
        else if (this.Current === this.WAITING_LEHGTH_END) {
            if (char === '\n') {
                this.Current = this.READING_TRUNK;
            }
        }
        else if (this.Current === this.READING_TRUNK) {
            if (char === '\r') {
                this.Current = this.WAITING_NEW_LINE
            } else {
                this.content += (char)
                this.length--;
                if (this.length === 0) {
                    this.Current = this.WAITING_NEW_LINE
                }
            }
        } 
        else if (this.Current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.Current = this.WAITING_NEW_LINE_END
            }
        } else if (this.Current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.Current = this.WAITING_LEHGTH
            }
        }
    }
}


void async function () {
    let req = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            'X-Foo2': 'customed'
        },
        body: {
            name: 'LIUZF',
            age: 30
        }
    })

    let responst = await req.send();
    console.log(responst)
  let dom =  parser.parserHTML(responst.body)
  console.log(JSON.stringify(dom,null,"   "))
}()
