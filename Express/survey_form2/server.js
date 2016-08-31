'use strict';
// No magic numbers!!!
const PORT_NUMBER = 8000;

var express = require('express');
var bodyparser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/result', function(request, response) {
    response.render('result', request.body);
})

var listener = app.listen(PORT_NUMBER, function() {
    console.log('Listening on port: ' + listener.address().port);
})

var io = require('socket.io').listen(listener);

io.sockets.on('connection', function(socket) {
    socket.on('posting_form', function(data) {
        console.log('posting_form', data);
        var hb = new HTMLBuilder();
        var h1 = hb.html('h1');
        var ul = hb.html('ul');
        var li1 = hb.html('li');
        var li2 = hb.html('li');
        var li3 = hb.html('li');
        var li4 = hb.html('li');
        var li5 = hb.html('li');
        var span1 = hb.html('span');
        var span2 = hb.html('span');
        var span3 = hb.html('span');
        var br = hb.html('br');
        var locations = {
            chi: 'Chicago',
            dal: 'Dallas',
            la: 'Los Angeles',
            sea: 'Seattle',
            sv: 'Silicon Valley',
            dc: 'Washington D.C.'
        };
        var languages = {
            js: 'Javascript',
            py: 'Python',
            ruby: 'Ruby',
            node: 'Node',
            swift: 'Swift',
            oc: 'Objective C'
        };

        h1.appendText('Submitted Information');
        ul.append(li1).append(li2).append(li3).append(li4).append(li5);
        li1.append(span1.appendText('Name:')).appendText(data.name);
        li2.append(span2.appendText('Dojo Location:'))
                .appendText(locations[data.location]);
        li3.append(span3.appendText('Favorite Language:'))
                .appendText(languages[data.language]);
        li4.appendText('Comments:');
        li5.appendText(data.comment.split('\n').join(br.build()));

        socket.emit('updated_message', {message: h1.build() + ul.build()});
        socket.emit('random_number',
                {randomNum: Math.floor(Math.random() * 999) + 1});
    });
});

class HTMLBuilder {
    // This will return an object that will build an HTML string.
    // It creates a tag that you can set the attributes, and inner text/html.

    html(tagName) {
        var htmlSelf = {tagName: tagName, html: [], attrList: []};

        htmlSelf.append = function(html) {
            // Add an inner html to the end of the html array.
            // To be use when building the HTML tag.

            if (html === htmlSelf || typeof html.build !== 'function') {
                return htmlSelf;
            }

            htmlSelf.html.push(html);

            return htmlSelf;
        }

        htmlSelf.appendText = function(text) {
            // Adds text to the end of the html array.
            // To be used later when building the HTML tag.

            htmlSelf.html.push({build: function() {return text;}});

            return htmlSelf;
        }

        htmlSelf.attr = function(name, value) {
            // Store the name and value of the attribute in the attrList array.
            // To be used later when building the HTML tag.

            htmlSelf.attrList.push({name: name, value: value});

            return htmlSelf;
        }

        htmlSelf.build = function() {
            /*
            This function will build valid HTML/XML tags.
            The following is a sample of what is returned:
            {tagName: 'div', html: [], attrList: []} = '<div />'
            {tagName: 'h1', html: ['Hello'],
             attrList: [{name: 'class', 'title'}]} =
            '<h1 class="title">Hello</h1>'
            */

            var innerHTML = [];
            var attrList = [];
            var htmlString = [];

            if (htmlSelf.html.length) {
                innerHTML = _buildInnerContents(htmlSelf);
            }

            if (htmlSelf.attrList.length) {
                attrList = _buildAttr(htmlSelf);
            }

            if (attrList.length) {
                // Build the beginning part of the tag and the attributes.

                htmlString.push('<', htmlSelf.tagName, ' ', attrList.join(' '));
            } else {
                // Build the beginning part of the tag.

                htmlString.push('<', htmlSelf.tagName);
            }

            if (innerHTML.length) {
                // Build the inner contents and the ending tag.

                htmlString.push('>', innerHTML.join(''), '</', htmlSelf.tagName, '>');
            } else {
                // Just end the tag, since there is no children.

                htmlString.push(' />');
            }

            // Create the output string from the array, this should be faster.
            return htmlString.join('');
        }

        var _buildInnerContents = function(htmlSelf) {
            // Build the child elements.

            var innerHTML = [];

            for (var i = 0, item = htmlSelf.html, len = item.length; i < len; i++) {
                innerHTML.push(item[i].build());
            }

            return innerHTML;
        }

        var _buildAttr = function(htmlSelf) {
            // Format the attributes.

            var attrList = [];

            for (var i = 0, item = htmlSelf.attrList, len = item.length; i < len; i++) {
                attrList.push([item[i].name, '="', item[i].value, '"'].join(''));
            }

            return attrList;
        }

        return htmlSelf;
    }
}
