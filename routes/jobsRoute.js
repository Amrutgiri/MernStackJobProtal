import express from 'express';
import userAuth from './../middlewares/authMiddleware.js';
import { createJobsController, deleteJobController, getAllJobsController, updateJobController, jobStatesController } from '../controllers/jobsController.js';

const router = express.Router()


// CREATE JOB || POST
router.post('/create-job', userAuth, createJobsController)

// GET JOB || GET
router.get('/get-job', userAuth, getAllJobsController);

// UPDATE JOB || PUT
router.put('/update-job/:id', userAuth, updateJobController);

// DELETE JOB || DELETE

router.delete('/delete-job/:id', userAuth, deleteJobController);

// JOB STATEs || GET

router.get('/job-states', userAuth, jobStatesController);

export default router;