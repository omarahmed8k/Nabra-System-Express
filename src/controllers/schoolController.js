const Schools = require('../models/Schools');

exports.createSchool = (req, res) => {
    const { name_en, name_ar } = req.body;
    const url = req.protocol + '://' + req.get('host');
    const winUrl = url.replace(/\//g, '\\');
    const winLogo = winUrl + '\\public\\uploads\\' + req.file.filename;

    const newSchool = new Schools({
        name_en: name_en,
        name_ar: name_ar,
        logo: winLogo,
    });
    newSchool.save().then(school => {
        res.json({
            success: true,
            school: {
                id: school.id,
                name_en: school.name_en,
                name_ar: school.name_ar,
                logo: school.logo,
            }
        })
    }).catch(err => res.status(400).json({ msg: "Error" }));
}

exports.getSchools = (req, res) => {
    Schools.find().then(schools => res.json(schools)).catch(err => res.status(400).json({ msg: "Error" }));
}

exports.getSchoolById = (req, res) => {
    Schools.findById(req.params.id)
        .then(school => res.json(school))
        .catch(err => res.status(400).json({ msg: "Error" }));
}

exports.updateSchool = (req, res) => {

    const school = Schools.findById(req.params.id);

    const url = req.protocol + '://' + req.get('host') + '\\public\\uploads\\';
    const winUrl = url.replace(/\//g, '\\');
    const winLogo = winUrl + `${ req?.file? req?.file?.filename: "" }`;

    const name_en = req.body.name_en ? req.body.name_en : school.name_en;
    const name_ar = req.body.name_ar ? req.body.name_ar : school.name_ar;
    const logo = req.file ? winLogo : school.logo;

    Schools.findByIdAndUpdate(req.params.id, {
        name_en: name_en,
        name_ar: name_ar,
        logo: logo,
    }, { new: true })
        .then(school => {
            res.json({
                success: true,
                school: {
                    id: school.id,
                    name_en: school.name_en,
                    name_ar: school.name_ar,
                    logo: school.logo,
                }
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));
}

exports.deleteSchool = (req, res) => {
    Schools.findByIdAndDelete(req.params.id)
        .then(school => {
            res.json({
                success: true,
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));
}

