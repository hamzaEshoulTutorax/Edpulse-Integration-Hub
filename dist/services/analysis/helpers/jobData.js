"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobData = void 0;
const getJobData = async (tcApi, jobId) => {
    const response = await tcApi.get(`services/${jobId}`);
    const jobData = response.data;
    return {
        name: jobData.name,
        description: jobData.description,
        contractor_pay_rate: jobData.dft_contractor_rate,
        client_note: jobData.extra_attrs?.find((attr) => attr.machine_name === "note")?.value || null,
        required_skills: jobData.desired_skills?.map((skill) => ({
            subject: skill.subject.name,
            qual_level: skill.qual_level.name,
        })) || null,
    };
};
exports.getJobData = getJobData;
