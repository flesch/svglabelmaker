var express = require('express')
  , pkg = require('./package.json')
  ;

var app = express();

app.get('/:width?/:height?/:bgcolor?/:color?/:label', function(req, res, next){
  var svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="' + (req.params.width || 200) + '" height="' + (req.params.height || 50) + '">',
    '  <g>',
    '    <rect fill="#'+ (req.params.bgcolor || 'CCCCCC') +'" x="0" y="0" rx="6" ry="6" width="' + (req.params.width || 200) + '" height="' + (req.params.height || 50) + '" />',
    '    <text fill="#'+ (req.params.color || '333333') +'" x="50%" y="50%" font-family="\'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif" font-size="18px" font-weight="bold" text-anchor="middle" alignment-baseline="middle">' + (req.params.label.replace(/\+/g, ' ')) + '</text>',
    '  </g>',
    '</svg>'
  ];
  res.set('Content-Type', 'image/svg+xml');
  res.send(svg.join('\n'));
});

app.use(function(req, res, next){
  res.redirect(pkg.homepage);
});

app.listen(process.env.PORT || 9021, function(){
  console.log('--> %s@%s is up and running!', pkg.name, pkg.version);
});
