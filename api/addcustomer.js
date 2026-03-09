module.exports = async function (context, req) {

const name = req.body.name;

context.res = {
status: 200,
body: "Hello " + name
};

};
