module.exports = {
  [`GET /api/user`]: (req, res) => {
      console.log('---->', req.params);
      return res.json({
          id: 1,
          username: 'kenny',
          sex: 6
      });
  }
}