module.exports = {
  'GET /api/user': (req, res) => {
    return res.json({ id: 1, username: 'kenny', sex: 6 });
  },
  'GET /test/obj': (req, res) => {
    return res.json({a:1, b:2, c:3});
  },
  'GET /test/arr': (req, res) => {
    return setTimeout(()=>res.json([1,2,3]), 3000);
  },
  'GET /test/arr/deep': (req, res) => {
    return res.json({list:[1,2,3]});
  },
}