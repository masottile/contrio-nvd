// list of sections provided to users
// does not mean all sections are visible to users initially

// export const defaultSections = {
//     header: 'HEADER',
//     agreement: 'AGREEMENT',
//     compensation: 'COMPENSATION',
//     projectScope: 'PROJECT_SCOPE',
// }

export const defaultSections = {
    header: {
        id: 'HEADER',
        title: 'Header Section',
        allowCustom: false
    },
    work: {
        id: 'WORK',
        title: 'Work Section',
        allowCustom: true
    },
    compensation: {
        id: 'COMPENSATION',
        title: 'Compensation Section',
        allowCustom: false
    },
    // phases: {
    //     id: 'PHASES',
    //     title: 'Project Phases',
    //     allowCustom: true
    // },
    // confidential: {
    //     id: 'CONFIDENTIAL',
    //     title: 'Confidentiality Section',
    //     allowCustom: true
    // },
    // termination: {
    //     id: 'TERMINATION',
    //     title: 'Termination Section',
    //     allowCustom: true
    // },
    // remedy: {
    //     id: 'REMEDY',
    //     title: 'Remedy Section',
    //     allowCustom: true
    // }
}

export const customSections = {

}