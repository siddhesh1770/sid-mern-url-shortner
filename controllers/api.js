const ErrorResponse = require('../utils/errorResponse');
const shortid = require('shortid');
const Url = require('../models/Url');


exports.generateUrl = async (req, res, next) => {
    try {
        let uid = req.body.newUrl.custom;
        if(!uid || uid === '') {
            uid = shortid.generate().replace(/[^a-zA-Z0-9]/g, '').substring(0, 5);
        }
        const newUrl = {    // new url obj
            shortUrl: `${process.env.BASE_URL}/${uid}`,
            redirectUrl: req.body.newUrl.url,
            uid: uid,
            label: req.body.newUrl.label,
            createdBy: req.body.email,
            createdAt: new Date().toISOString(),
        }
        const checkUid = await Url.findOne({uid: uid});
        if(checkUid) {
            return next(new ErrorResponse(`${uid} already exists`, 400));
        }
        const url = await Url.create(newUrl);
        res.status(201).json({
            success: true,
            message: 'Url generated successfully',
            data: newUrl
        })
    } catch (error) {
        console.log(error.message);
        next(new ErrorResponse(error.message, 500));
    }
}

exports.getUrl = async (req, res, next) => {
    try {
        const url = await Url.findOne({uid: req.body.uid});
        if(!url) {
            return next(new ErrorResponse(`${req.body.uid} does not exist`, 400));
        }
        url.visitCount += 1;
        await url.save();
        res.status(200).json({
            success: true,
            message: 'Url found successfully',
            url: url.redirectUrl
        })
    } catch (error) {
        console.log(error.message);
        next(new ErrorResponse(error.message, 500));
    }
}

exports.getAllUrlByEmail = async (req, res, next) => {
    try {
        const {email} = req.body;
        const urls = await Url.find({createdBy: email});
        res.status(200).json({
            success: true,
            data: urls
        })
    } catch (error) {
        console.log(error.message);
        next(new ErrorResponse(error.message, 500));
    }
}
