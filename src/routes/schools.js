const express = require('express');
const router = new express.Router();
const { createSchool, getSchools, getSchoolById, updateSchool, deleteSchool, } = require('../controllers/schoolController.js');

// Schools Create APIs
router.post('', (req, res) => {
    createSchool(req, res);
})

// Schools Get by User ID API
router.get('', (req, res) => {
    getSchools(req, res);
});

// Schools Get by School ID API
router.get('/:id', (req, res) => {
    getSchoolById(req, res);
});

// Schools Update API
router.patch('/:id', (req, res) => {
    updateSchool(req, res);
})

// Schools Delete API
router.delete('/:id', (req, res) => {
    deleteSchool(req, res);
})

module.exports = router;