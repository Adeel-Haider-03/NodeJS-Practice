const adminAuth = (req,res,next) => {
    console.log('middleware executed');

    const token='xyz1234'

    const isadminAuth = token === 'xyz1234';

    if (isadminAuth) {
        next();
    }
    else {
        res.status(401).send('Not authorized');
    }
}


const userAuth = (req,res,next) => {
    console.log('middleware executed');

    const token='xyz456'

    const isuserAuth = token === 'xyz456';

    if (isuserAuth) {
        next();
    }
    else {
        res.status(401).send('Not authorized');
    }
}

module.exports = {adminAuth,userAuth};