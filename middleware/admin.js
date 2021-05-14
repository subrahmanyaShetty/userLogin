
function admin (req,res,next){
  const token=req.header('x-auth-token');
  if(!req.user.isAdmin) return res.status(403).send('access denied.');
    next();

}

module.exports=admin;
