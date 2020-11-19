
const { Router } = require('express');
// import all routers;
const routesUser = require('./user')


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use('/', routesUser);

module.exports = router;