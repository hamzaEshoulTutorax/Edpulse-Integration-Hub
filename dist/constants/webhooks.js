"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBHOOKS_ACTIONS_LIST = void 0;
exports.WEBHOOKS_ACTIONS_LIST = {
    // Service/Job related actions
    CREATED_A_SERVICE: {
        id: 374619,
        name: "CREATED_A_SERVICE",
        subjectTypes: ["Job"],
    },
    EDITED_A_SERVICE: {
        id: 823754,
        name: "EDITED_A_SERVICE",
        subjectTypes: ["Job"],
    },
    DELETED_A_SERVICE: {
        id: 192837,
        name: "DELETED_A_SERVICE",
        subjectTypes: ["Job"],
    },
    CHANGED_SERVICE_STATUS: {
        id: 465901,
        name: "CHANGED_SERVICE_STATUS",
        subjectTypes: ["Job"],
    },
    SENT_SERVICE_NOTIFICATIONS: {
        id: 783254,
        name: "SENT_SERVICE_NOTIFICATIONS",
        subjectTypes: ["Job"],
    },
    ADDED_CONTRACTOR_TO_SERVICE: {
        id: 912345,
        name: "ADDED_CONTRACTOR_TO_SERVICE",
        subjectTypes: ["Job"],
    },
    REMOVED_CONTRACTOR_FROM_SERVICE: {
        id: 548762,
        name: "REMOVED_CONTRACTOR_FROM_SERVICE",
        subjectTypes: ["Tutor"],
    },
    EDITED_CONTRACTOR_ON_SERVICE: {
        id: 621895,
        name: "EDITED_CONTRACTOR_ON_SERVICE",
        subjectTypes: ["Job"],
    },
    ADDED_SR_TO_SERVICE: {
        id: 173254,
        name: "ADDED_SR_TO_SERVICE",
        subjectTypes: ["Job"],
    },
    REMOVED_SR_FROM_SERVICE: {
        id: 298436,
        name: "REMOVED_SR_FROM_SERVICE",
        subjectTypes: ["Student"],
    },
    EDITED_SR_ON_SERVICE: {
        id: 357429,
        name: "EDITED_SR_ON_SERVICE",
        subjectTypes: ["Job"],
    },
    RECOVERED_A_SERVICE: {
        id: 738294,
        name: "RECOVERED_A_SERVICE",
        subjectTypes: ["Job"],
    },
    ADDED_A_LABEL_TO_A_SERVICE: {
        id: 489532,
        name: "ADDED_A_LABEL_TO_A_SERVICE",
        subjectTypes: ["Job"],
    },
    REMOVED_A_LABEL_FROM_A_SERVICE: {
        id: 671294,
        name: "REMOVED_A_LABEL_FROM_A_SERVICE",
        subjectTypes: ["Job"],
    },
    ADDED_DESIRED_SKILL: {
        id: 542897,
        name: "ADDED_DESIRED_SKILL",
        subjectTypes: ["Job"],
    },
    REQUESTED_A_SERVICE: {
        id: 325478,
        name: "REQUESTED_A_SERVICE",
        subjectTypes: ["Job"],
    },
    SENT_SERVICE_CONFIRMATION_CLIENT: {
        id: 845672,
        name: "SENT_SERVICE_CONFIRMATION_CLIENT",
        subjectTypes: ["Job"],
    },
    SENT_SERVICE_CONFIRMATION_CONTRACTOR: {
        id: 952631,
        name: "SENT_SERVICE_CONFIRMATION_CONTRACTOR",
        subjectTypes: ["Job"],
    },
    // Appointment/Lesson related actions
    ADDED_CONTRACTOR_TO_APPOINTMENT: {
        id: 431972,
        name: "ADDED_CONTRACTOR_TO_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    REMOVED_CONTRACTOR_FROM_APPOINTMENT: {
        id: 632945,
        name: "REMOVED_CONTRACTOR_FROM_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    EDITED_CONTRACTOR_ON_APPOINTMENT: {
        id: 527634,
        name: "EDITED_CONTRACTOR_ON_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    ADDED_SR_TO_APPOINTMENT: {
        id: 893245,
        name: "ADDED_SR_TO_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    REMOVED_SR_FROM_APPOINTMENT: {
        id: 742195,
        name: "REMOVED_SR_FROM_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    EDITED_SR_ON_APPOINTMENT: {
        id: 159634,
        name: "EDITED_SR_ON_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    CREATED_AN_APPOINTMENT: {
        id: 237519,
        name: "CREATED_AN_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    CREATED_A_REPEATING_APPOINTMENT: {
        id: 694258,
        name: "CREATED_A_REPEATING_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    EDITED_AN_APPOINTMENT: {
        id: 814592,
        name: "EDITED_AN_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    EDITED_REPEATED_APPOINTMENTS: {
        id: 371845,
        name: "EDITED_REPEATED_APPOINTMENTS",
        subjectTypes: ["Lesson"],
    },
    DELETED_AN_APPOINTMENT: {
        id: 582634,
        name: "DELETED_AN_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    MARKED_AN_APPOINTMENT_AS_COMPLETE: {
        id: 923478,
        name: "MARKED_AN_APPOINTMENT_AS_COMPLETE",
        subjectTypes: ["Lesson"],
    },
    MARKED_AN_APPOINTMENT_AS_CANCELLED: {
        id: 413592,
        name: "MARKED_AN_APPOINTMENT_AS_CANCELLED",
        subjectTypes: ["Lesson"],
    },
    RECOVERED_AN_APPOINTMENT: {
        id: 687234,
        name: "RECOVERED_AN_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    BOOKED_AN_APPOINTMENT: {
        id: 539178,
        name: "BOOKED_AN_APPOINTMENT",
        subjectTypes: ["Lesson"],
    },
    CANCELLED_A_BOOKING: {
        id: 275684,
        name: "CANCELLED_A_BOOKING",
        subjectTypes: ["Lesson"],
    },
    ADDED_APPOINTMENT_REMINDER: {
        id: 729401,
        name: "ADDED_APPOINTMENT_REMINDER",
        subjectTypes: [],
    },
    // Application related actions
    APPLIED_FOR_SERVICE: {
        id: 645892,
        name: "APPLIED_FOR_SERVICE",
        subjectTypes: ["Job Application"],
    },
    EDITED_APPLICATION_FOR_SERVICE: {
        id: 384921,
        name: "EDITED_APPLICATION_FOR_SERVICE",
        subjectTypes: ["Application"],
    },
    WITHDREW_APPLICATION_FOR_SERVICE: {
        id: 729156,
        name: "WITHDREW_APPLICATION_FOR_SERVICE",
        subjectTypes: ["Application"],
    },
    TENDER_WAS_DECLINED: {
        id: 152387,
        name: "TENDER_WAS_DECLINED",
        subjectTypes: ["Application"],
    },
    TENDER_WAS_ACCEPTED: {
        id: 839421,
        name: "TENDER_WAS_ACCEPTED",
        subjectTypes: ["Application"],
    },
    CONTRACTOR_WAS_REQUESTED_FOR_SERVICE: {
        id: 615748,
        name: "CONTRACTOR_WAS_REQUESTED_FOR_SERVICE",
        subjectTypes: ["Application"],
    },
    // Terms related actions
    AGREE_TERMS: {
        id: 472195,
        name: "AGREE_TERMS",
        subjectTypes: ["Tutor", "Affiliate", "Client", "Student"],
    },
    RECORDED_TERMS_CONSENT: {
        id: 598347,
        name: "RECORDED_TERMS_CONSENT",
        subjectTypes: ["Tutor", "Affiliate", "Student", "Client"],
    },
    // Invoice related actions
    RAISED_INVOICE: {
        id: 124857,
        name: "RAISED_INVOICE",
        subjectTypes: ["Invoice"],
    },
    SENT_INVOICE_REMINDER: {
        id: 781634,
        name: "SENT_INVOICE_REMINDER",
        subjectTypes: ["Invoice"],
    },
    CREATED_DEFERRED_PAYMENT: {
        id: 342918,
        name: "CREATED_DEFERRED_PAYMENT",
        subjectTypes: ["Credit Request", "Invoice"],
    },
    VOIDED_INVOICE: {
        id: 862395,
        name: "VOIDED_INVOICE",
        subjectTypes: ["Invoice"],
    },
    MARKED_INVOICE_AS_PAID: {
        id: 917453,
        name: "MARKED_INVOICE_AS_PAID",
        subjectTypes: ["Invoice"],
    },
    CLIENT_PAID_INVOICE: {
        id: 256894,
        name: "CLIENT_PAID_INVOICE",
        subjectTypes: ["Credit Request", "Invoice"],
    },
    ADMIN_PAID_INVOICE: {
        id: 634951,
        name: "ADMIN_PAID_INVOICE",
        subjectTypes: ["Invoice"],
    },
    ADMIN_QUICK_PAY_INVOICE: {
        id: 798326,
        name: "ADMIN_QUICK_PAY_INVOICE",
        subjectTypes: ["Invoice"],
    },
    ACCOUNTING_ITEM_AUTOCHARGED: {
        id: 315782,
        name: "ACCOUNTING_ITEM_AUTOCHARGED",
        subjectTypes: ["Credit Request", "Invoice"],
    },
    CANCELLED_DEFERRED_PAYMENT: {
        id: 684125,
        name: "CANCELLED_DEFERRED_PAYMENT",
        subjectTypes: ["Credit Request", "Invoice"],
    },
    DEFERRED_PAYMENT_FAILED: {
        id: 429875,
        name: "DEFERRED_PAYMENT_FAILED",
        subjectTypes: ["Credit Request", "Invoice"],
    },
    PAYMENT_FAILED: {
        id: 573156,
        name: "PAYMENT_FAILED",
        subjectTypes: ["Credit Request", "Invoice"],
    },
    // Payment Order related actions
    RAISED_PO: {
        id: 463819,
        name: "RAISED_PO",
        subjectTypes: ["Payment Order"],
    },
    RESENT_PO: {
        id: 829314,
        name: "RESENT_PO",
        subjectTypes: ["Payment Order"],
    },
    VOIDED_PO: {
        id: 218796,
        name: "VOIDED_PO",
        subjectTypes: ["Payment Order"],
    },
    MARKED_PO_AS_PAID: {
        id: 657498,
        name: "MARKED_PO_AS_PAID",
        subjectTypes: ["Payment Order"],
    },
    CREATED_PAYOUT: {
        id: 734162,
        name: "CREATED_PAYOUT",
        subjectTypes: ["Payment Order"],
    },
    // Credit Request related actions
    CREATED_PROFORMA_INVOICE: {
        id: 145928,
        name: "CREATED_PROFORMA_INVOICE",
        subjectTypes: ["Credit Request"],
    },
    CREATED_PROFORMA_INVOICE_ITEM: {
        id: 387456,
        name: "CREATED_PROFORMA_INVOICE_ITEM",
        subjectTypes: ["Credit Request"],
    },
    EDIT_PROFORMA_INVOICE: {
        id: 962138,
        name: "EDIT_PROFORMA_INVOICE",
        subjectTypes: ["Credit Request"],
    },
    DELETED_PROFORMA_INVOICE: {
        id: 524876,
        name: "DELETED_PROFORMA_INVOICE",
        subjectTypes: ["Credit Request"],
    },
    MARKED_PROFORMA_INVOICE_AS_PAID: {
        id: 186735,
        name: "MARKED_PROFORMA_INVOICE_AS_PAID",
        subjectTypes: ["Credit Request"],
    },
    RAISED_PROFORMA_INVOICE: {
        id: 869425,
        name: "RAISED_PROFORMA_INVOICE",
        subjectTypes: ["Credit Request"],
    },
    SENT_PROFORMA_INVOICE_REMINDER: {
        id: 732594,
        name: "SENT_PROFORMA_INVOICE_REMINDER",
        subjectTypes: ["Credit Request"],
    },
    CLIENT_PAID_PROFORMA_INVOICE: {
        id: 193785,
        name: "CLIENT_PAID_PROFORMA_INVOICE",
        subjectTypes: ["Credit Request"],
    },
    ADMIN_PAID_PROFORMA_INVOICE: {
        id: 425718,
        name: "ADMIN_PAID_PROFORMA_INVOICE",
        subjectTypes: ["Credit Request"],
    },
    ADMIN_QUICK_PAY_PFI: {
        id: 617829,
        name: "ADMIN_QUICK_PAY_PFI",
        subjectTypes: ["Credit Request"],
    },
    // Ad Hoc Charge related actions
    CREATED_ADHOC_CHARGE: {
        id: 351978,
        name: "CREATED_ADHOC_CHARGE",
        subjectTypes: ["Ad Hoc Charge"],
    },
    EDITED_ADHOC_CHARGE: {
        id: 927453,
        name: "EDITED_ADHOC_CHARGE",
        subjectTypes: ["Ad Hoc Charge"],
    },
    // Client Balance related actions
    BALANCE_ADJUSTMENT: {
        id: 238496,
        name: "BALANCE_ADJUSTMENT",
        subjectTypes: ["Client"],
    },
    CLIENT_TOPPED_UP: {
        id: 564123,
        name: "CLIENT_TOPPED_UP",
        subjectTypes: ["Client"],
    },
    // Profile related actions
    EDITED_OWN_PROFILE: {
        id: 795243,
        name: "EDITED_OWN_PROFILE",
        subjectTypes: ["Tutor", "Affiliate", "Client", "Student"],
    },
    // Agent/Affiliate related actions
    CREATED_AN_AGENT: {
        id: 429316,
        name: "CREATED_AN_AGENT",
        subjectTypes: ["Affiliate"],
    },
    EDITED_AN_AGENT: {
        id: 875641,
        name: "EDITED_AN_AGENT",
        subjectTypes: ["Affiliate"],
    },
    DELETED_AN_AGENT: {
        id: 319574,
        name: "DELETED_AN_AGENT",
        subjectTypes: ["Affiliate"],
    },
    RECOVERED_AN_AGENT: {
        id: 864291,
        name: "RECOVERED_AN_AGENT",
        subjectTypes: ["Affiliate"],
    },
    ADDED_A_CLIENT_TO_AN_AGENT: {
        id: 716492,
        name: "ADDED_A_CLIENT_TO_AN_AGENT",
        subjectTypes: ["Affiliate"],
    },
    // Client related actions
    CREATED_A_CLIENT: {
        id: 531846,
        name: "CREATED_A_CLIENT",
        subjectTypes: ["Client"],
    },
    EDITED_A_CLIENT: {
        id: 985612,
        name: "EDITED_A_CLIENT",
        subjectTypes: ["Client"],
    },
    DELETED_A_CLIENT: {
        id: 374215,
        name: "DELETED_A_CLIENT",
        subjectTypes: ["Client"],
    },
    CHANGED_CLIENT_STATUS: {
        id: 682149,
        name: "CHANGED_CLIENT_STATUS",
        subjectTypes: ["Client"],
    },
    RECOVERED_A_CLIENT: {
        id: 293718,
        name: "RECOVERED_A_CLIENT",
        subjectTypes: ["Client"],
    },
    CHANGED_CLIENTS_AGENT: {
        id: 468152,
        name: "CHANGED_CLIENTS_AGENT",
        subjectTypes: ["Client"],
    },
    CHANGED_CLIENT_ADMIN: {
        id: 751936,
        name: "CHANGED_CLIENT_ADMIN",
        subjectTypes: ["Client"],
    },
    CLIENT_ENQUIRY: {
        id: 619428,
        name: "CLIENT_ENQUIRY",
        subjectTypes: ["Client"],
    },
    CLIENT_SIGN_UP: {
        id: 892354,
        name: "CLIENT_SIGN_UP",
        subjectTypes: ["Client"],
    },
    MOVED_PIPELINE_STAGE: {
        id: 275961,
        name: "MOVED_PIPELINE_STAGE",
        subjectTypes: ["Client"],
    },
    SENT_CLIENT_APT_SCHEDULE: {
        id: 598347,
        name: "SENT_CLIENT_APT_SCHEDULE",
        subjectTypes: ["Client"],
    },
    EDITED_AGENCY_DETAILS: {
        id: 418692,
        name: "EDITED_AGENCY_DETAILS",
        subjectTypes: ["Client"],
    },
    EDITED_PRICE_PLAN: {
        id: 756923,
        name: "EDITED_PRICE_PLAN",
        subjectTypes: ["Client"],
    },
    TERMINATED_AGENCY: {
        id: 293574,
        name: "TERMINATED_AGENCY",
        subjectTypes: ["Client"],
    },
    // Contractor/Tutor related actions
    CREATED_A_CONTRACTOR: {
        id: 629138,
        name: "CREATED_A_CONTRACTOR",
        subjectTypes: ["Tutor"],
    },
    EDITED_A_CONTRACTOR: {
        id: 138756,
        name: "EDITED_A_CONTRACTOR",
        subjectTypes: ["Tutor"],
    },
    DELETED_A_CONTRACTOR: {
        id: 487596,
        name: "DELETED_A_CONTRACTOR",
        subjectTypes: ["Tutor"],
    },
    CHANGED_CONTRACTOR_STATUS: {
        id: 921574,
        name: "CHANGED_CONTRACTOR_STATUS",
        subjectTypes: ["Tutor"],
    },
    INVITED_CONTRACTOR_FOR_INTERVIEW: {
        id: 376851,
        name: "INVITED_CONTRACTOR_FOR_INTERVIEW",
        subjectTypes: ["Tutor"],
    },
    RECOVERED_A_CONTRACTOR: {
        id: 648129,
        name: "RECOVERED_A_CONTRACTOR",
        subjectTypes: ["Tutor"],
    },
    EDITED_SKILLS: {
        id: 519726,
        name: "EDITED_SKILLS",
        subjectTypes: ["Tutor"],
    },
    EDITED_QUALIFICATIONS: {
        id: 847623,
        name: "EDITED_QUALIFICATIONS",
        subjectTypes: ["Tutor"],
    },
    EDITED_AVAILABILITY: {
        id: 195348,
        name: "EDITED_AVAILABILITY",
        subjectTypes: ["Tutor"],
    },
    EDITED_ATTENDED_INSTITUTIONS: {
        id: 643827,
        name: "EDITED_ATTENDED_INSTITUTIONS",
        subjectTypes: ["Tutor"],
    },
    ADDED_CUSTOM_INSTITUTION: {
        id: 127854,
        name: "ADDED_CUSTOM_INSTITUTION",
        subjectTypes: ["Tutor"],
    },
    REQUESTED_A_CONTRACTOR: {
        id: 394578,
        name: "REQUESTED_A_CONTRACTOR",
        subjectTypes: ["Tutor"],
    },
    CONTRACTOR_SIGN_UP: {
        id: 759148,
        name: "CONTRACTOR_SIGN_UP",
        subjectTypes: ["Tutor"],
    },
    CREATED_A_REVIEW: {
        id: 328576,
        name: "CREATED_A_REVIEW",
        subjectTypes: ["Tutor"],
    },
    // Student related actions
    CREATED_A_SR: {
        id: 261947,
        name: "CREATED_A_SR",
        subjectTypes: ["Student"],
    },
    EDITED_A_SR: {
        id: 637912,
        name: "EDITED_A_SR",
        subjectTypes: ["Student"],
    },
    DELETED_A_SR: {
        id: 147538,
        name: "DELETED_A_SR",
        subjectTypes: ["Student"],
    },
    RECOVERED_A_SR: {
        id: 589324,
        name: "RECOVERED_A_SR",
        subjectTypes: ["Student"],
    },
    // Label related actions
    ADDED_A_LABEL_TO_A_USER: {
        id: 751493,
        name: "ADDED_A_LABEL_TO_A_USER",
        subjectTypes: ["Tutor", "Affiliate", "Student", "Client"],
    },
    // Note related actions
    ADDED_A_NOTE: {
        id: 321795,
        name: "ADDED_A_NOTE",
        subjectTypes: ["Note"],
    },
    EDITED_A_NOTE: {
        id: 598427,
        name: "EDITED_A_NOTE",
        subjectTypes: ["Note"],
    },
    DELETED_A_NOTE: {
        id: 149673,
        name: "DELETED_A_NOTE",
        subjectTypes: ["Tutor", "Affiliate", "Client", "Student", "Job", "Lesson"],
    },
    // Task related actions
    CREATED_A_TASK: {
        id: 875312,
        name: "CREATED_A_TASK",
        subjectTypes: ["Task"],
    },
    EDITED_A_TASK: {
        id: 425687,
        name: "EDITED_A_TASK",
        subjectTypes: ["Task"],
    },
    // Report related actions
    EDITED_REPORT: {
        id: 693124,
        name: "EDITED_REPORT",
        subjectTypes: ["Report"],
    },
    APPROVED_A_REPORT: {
        id: 258714,
        name: "APPROVED_A_REPORT",
        subjectTypes: ["Report"],
    },
    CREATED_REPORT: {
        id: 842561,
        name: "CREATED_REPORT",
        subjectTypes: ["Report"],
    },
    // Email related actions
    WELCOME_EMAIL_SENT: {
        id: 246837,
        name: "WELCOME_EMAIL_SENT",
        subjectTypes: ["Tutor", "Affiliate", "Client", "Student"],
    },
    SENT_ONE_OFF_EMAIL: {
        id: 734196,
        name: "SENT_ONE_OFF_EMAIL",
        subjectTypes: ["Tutor", "Affiliate", "Client", "Student"],
    },
    // Payment related actions
    CHANGED_DEFAULT_PAYMENT_CARD: {
        id: 352786,
        name: "CHANGED_DEFAULT_PAYMENT_CARD",
        subjectTypes: ["Client"],
    },
    DELETED_CARD_DETAILS: {
        id: 951428,
        name: "DELETED_CARD_DETAILS",
        subjectTypes: ["Client"],
    },
    SAVED_CARD_DETAILS: {
        id: 487152,
        name: "SAVED_CARD_DETAILS",
        subjectTypes: ["Client"],
    },
    ADDED_BANK_DETAILS: {
        id: 268374,
        name: "ADDED_BANK_DETAILS",
        subjectTypes: ["Tutor", "Client"],
    },
    EDITED_BANK_DETAILS: {
        id: 735914,
        name: "EDITED_BANK_DETAILS",
        subjectTypes: ["Tutor"],
    },
    REMOVED_BANK_DETAILS: {
        id: 196473,
        name: "REMOVED_BANK_DETAILS",
        subjectTypes: ["Tutor", "Affiliate", "Student", "Client"],
    },
    ADDED_GC_CUSTOMER_DATA: {
        id: 653249,
        name: "ADDED_GC_CUSTOMER_DATA",
        subjectTypes: ["Client"],
    },
    REMOVED_GC_CUSTOMER_DATA: {
        id: 914752,
        name: "REMOVED_GC_CUSTOMER_DATA",
        subjectTypes: ["Client"],
    },
    // Review related actions
    REQUESTED_REVIEWS: {
        id: 539476,
        name: "REQUESTED_REVIEWS",
        subjectTypes: ["Client", "Job"],
    },
    REQUESTED_AUTO_REVIEW_FROM: {
        id: 174326,
        name: "REQUESTED_AUTO_REVIEW_FROM",
        subjectTypes: ["Job"],
    },
    // Role related actions
    COPY_ROLE: {
        id: 628475,
        name: "COPY_ROLE",
        subjectTypes: ["Tutor", "Affiliate", "Client", "Student"],
    },
    // Package related actions
    CREATED_A_PACKAGE: {
        id: 394718,
        name: "CREATED_A_PACKAGE",
        subjectTypes: ["Package"],
    },
    EDITED_A_PACKAGE: {
        id: 857632,
        name: "EDITED_A_PACKAGE",
        subjectTypes: ["Package"],
    },
    DELETED_A_PACKAGE: {
        id: 129347,
        name: "DELETED_A_PACKAGE",
        subjectTypes: ["Package"],
    },
    CLIENT_PURCHASED_PACKAGE: {
        id: 642875,
        name: "CLIENT_PURCHASED_PACKAGE",
        subjectTypes: ["Package"],
    },
};
