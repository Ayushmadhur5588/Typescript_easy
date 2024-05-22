import jwt from "jsonwebtoken";

export const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log(user);
      req.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
