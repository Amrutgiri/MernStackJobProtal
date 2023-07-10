import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";
import moment from "moment/moment.js";

// create job
export const createJobsController = async (req, res, next) => {
    const { company, position } = req.body;

    if (!company || !position) {
        next("Please required all fields")
    }
    req.body.createdBy = req.user.userId;

    const job = await jobsModel.create(req.body);

    res.status(201).json({ job });

}
// Get JOB
export const getAllJobsController = async (req, res, next) => {
    const { status, workType, search, sort } = req.query;
    const queryObject = {
        createdBy: req.user.userId
    }
    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (workType && workType !== 'all') {
        queryObject.workType = workType
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }
    let queryResult = jobsModel.find(queryObject);
    //sorting
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt')
    }

    if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt')
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort('position')
    }
    if (sort === 'z-a') {
        queryResult = queryResult.sort('-position')
    }
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    // job count
    const totalJobs = await jobsModel.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);
    const jobs = await queryResult;

    // const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage
    })
}
// UPdate Jobs
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
        next("Please Fill all required Fields");
    }
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
        next(`Job not Found ! id : ${id}`);
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("Your Not Authorized to Update this Job");
        return
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({ updateJob });
};

//delete job
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
        next('Record Nod found');
        return
    }
    await job.deleteOne();
    res.status(200).json({ message: "Job Deleted Successfully" });
}

//job states
export const jobStatesController = async (req, res) => {
    const states = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },

        },
        {
            $group: {
                _id: '$status', count: { $sum: 1 }
            }
        }
    ]);

    const defaultStates = {
        pending: states.pending || 0,
        reject: states.reject || 0,
        interview: states.interview || 0,
    };

    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    monthlyApplication = monthlyApplication.map((item) => {
        const {
            _id: { year, month },
            count,
        } = item;
        const date = moment().month(month - 1).year(year).format("MMM Y");
        return { date, count };
    }).reverse();

    res.status(200).json({ totalJob: states.length, defaultStates, monthlyApplication });
};