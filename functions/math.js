const mj = require("mathjax-node");

exports.handler = function(event, context, callback) {
  mj.start();

  const { queryStringParameters } = event;
  const math = queryStringParameters.math;

  if (math) {
    mj.typeset({
      math,
      format: "AsciiMath",
      svg: true,
    }, function (data) {
      if (data.errors) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify(data.errors)
        });
      } else {
        callback(null, {
          statusCode: 200,
          body: data.svg,
          headers: {
            'Content-Type': 'image/svg+xml'
          }
        });
      }
    });
  } else {
    callback(null, {
      statusCode: 500,
      body: "Math is not defined"
    });
  }
};