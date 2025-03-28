"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractorDetails = exports.getApplicants = void 0;
const getApplicants = async (tcApi, jobId) => {
    const response = await tcApi.get("tenders", {
        params: { service: jobId },
    });
    return response.data.results
        .filter((tender) => tender.status === "requested" || tender.status === "pending")
        .map((tender) => ({
        contractor_id: tender.contractor.id,
        contractor_application_note: tender.description,
    }));
};
exports.getApplicants = getApplicants;
const getContractorDetails = async (tcApi, applicants) => {
    const contractorsPromises = applicants.map((applicant) => tcApi.get(`contractors/${applicant.contractor_id}`));
    const contractorsResults = await Promise.allSettled(contractorsPromises);
    return applicants.map((application, index) => {
        const rawData = contractorsResults[index].status === "fulfilled"
            ? contractorsResults[index].value.data
            : null;
        return {
            contractor_id: rawData.id,
            first_name: rawData.user.first_name,
            last_name: rawData.user.last_name,
            tutor_rate: rawData.default_rate,
            teaching_experience_hours: rawData.work_done_details.total_paid_hours,
            skills: rawData.skills.map((skill) => ({
                subject: skill.subject,
                qual_level: skill.qual_level,
            })),
            contractor_application_note: application.contractor_application_note,
            gender: rawData.extra_attrs
                ?.find((attr) => attr.machine_name === "contractor_gender")
                ?.value?.trim() || null,
            education_background: rawData.extra_attrs?.find((attr) => attr.machine_name === "contractor_bio")?.value || null,
            teaching_experience_details: rawData.extra_attrs?.find((attr) => attr.machine_name === "contractor_exp")?.value || null,
        };
    });
};
exports.getContractorDetails = getContractorDetails;
