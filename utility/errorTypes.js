const ErrorTypes = {
    missingRequiredField : (field) => {
        return {
            message: `${field} field is required.`,
            status: "error",
            data: null
        }
    },
    typeError: (field, type) => {
        return {
            message: `${field} should be a|an ${type}.`,
            status: "error",
            data: null
        }
    },
    beyondNestedLimit: (field) => {
        return {
            message: `${field} is above allowed depth.`,
            status: "error",
            data: null
        }
    },
    disallowedOption: (field, options) => {
        return {
            message: `${field} is not a valid option, list of options includes ${options}.`,
            status: "error",
            data: null
        }
    },
    missingField: (field) => {
        return {
            message: `field ${field} is missing from data.`,
            status: "error",
            data: null
        }
    },
    disparentComparators: (condition, field) => {
        return {
            message: `${field} and ${condition} should be of same types`,
            status: "error",
            data: null
        }
    }
}

module.exports = (errorType, field, type) => {
    return ErrorTypes[errorType](field, type)

}