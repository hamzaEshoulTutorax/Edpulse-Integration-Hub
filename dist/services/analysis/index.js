"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeJob = void 0;
const apiKeys_1 = require("../../config/apiKeys");
const aiAnalysis_1 = require("./helpers/aiAnalysis");
const applicantsData_1 = require("./helpers/applicantsData");
const jobData_1 = require("./helpers/jobData");
const analyzeJob = async (jobId, branchId) => {
    const tcApi = (0, apiKeys_1.createTCApiClient)(branchId);
    const jobData = await (0, jobData_1.getJobData)(tcApi, jobId);
    const applicants = await (0, applicantsData_1.getApplicants)(tcApi, jobId);
    const fullApplicantsData = await (0, applicantsData_1.getContractorDetails)(tcApi, applicants);
    return await (0, aiAnalysis_1.analyzeJobMatch)(jobData, fullApplicantsData);
};
exports.analyzeJob = analyzeJob;
