import jobsModel from "../models/jobsModel.js";

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
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,

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
    const job = await jobsModel
}