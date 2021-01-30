const AppError = require('../../utility/errorObject');
const Validator = require('../../services/validation');
const ErrorService = require('../../utility/errorTypes')

module.exports.validate = (req, res, next) => {
    try{
        //create instance of the object
        const dataToValidate = new Validator(req.body)

        //check that it contains the base required fields, i.e rule and data
        const containsBaseRequiredField = dataToValidate.containsRequiredField(req.body, ['rule', 'data'])
        
        if(!containsBaseRequiredField.status){
            throw new AppError('', ErrorService('missingRequiredField', containsBaseRequiredField.data), 400)
        }

        //check that rule object is a valid json object
        const isRuleObject = dataToValidate.isType(req.body.rule, 'object');

        if(!isRuleObject.status){
            throw new AppError('', ErrorService('typeError', 'rule', 'object'), 400)
        }

        //check that data object is of valid type
        const isDataObjectValid = dataToValidate.isValidDataField(req.body.data)

        if(!isDataObjectValid.status){
            throw new AppError('', ErrorService('typeError', 'data', "['object', 'array', 'string']"), 400)

        }

        //check that the rule field contains it's required fields 
        const ruleFieldContainsRequiredFields = dataToValidate.containsRequiredField(req.body.rule, ['condition', 'condition_value', 'field'])

        if(!ruleFieldContainsRequiredFields.status){
            throw new AppError('', ErrorService('missingRequiredField', ruleFieldContainsRequiredFields.data), 400)
        }

        //check if field field is nested
        dataToValidate.isNested(req.body.rule.field)

        //if field is nested, check that it's within the required depth 
        const isAboveNestedDepth = dataToValidate.isAboveNestedDepth();

        if(isAboveNestedDepth.status){
            throw new AppError('', ErrorService('beyondNestedLimit', 'field'), 400)
        }

        //check that field isn't missing in the data payload
        const hasMissingField = dataToValidate.hasMissingField();

        if(!hasMissingField.status){
            throw new AppError('', ErrorService('missingField',hasMissingField.data), 400)
        }

        //check that the condition is a valid condition type 
        const isValidcondition = dataToValidate.isValidcondition(req.body.rule.condition);

        if(!isValidcondition.status){
            throw new AppError('', ErrorService('disallowedOption', req.body.rule.condition,"['eq', 'neq', 'gt', 'gte', 'contains']"), 400)
        }

        //check that the conditon value and the field value are of same type
        const isComparatorSameType = dataToValidate.isComparatorSameType();

        console.log('comparator ', isComparatorSameType)

        if(!isComparatorSameType.status){
            throw new AppError('', ErrorService('disparentComparators', isComparatorSameType.data.data, isComparatorSameType.data.condition), 400)
        }

        //at this point, object has passed all field validation, all that is left is to run the rule against the data
        const isValidObj = dataToValidate.validateObject(req.body);

        res.status(isValidObj.status ? 200 : 400).json({
            status: isValidObj.status ? "success" : "error",
            message: isValidObj.message,
            data: isValidObj.data ? {
                ...isValidObj.data
            } : null
        })
        
    }catch(err){
        next(err);
    }
}

module.exports.getInfo = (req, res, next) => {
    try{
        res.status(200).json({
            message: "My Rule-Validation API",
            status: "success",
            data: {
              name: "Makwe Makuochukwu Kelvin",
              github: "@QuintinMakwe",
              email: "kelvinmakwe@gmail.com",
              mobile: "09075447148",
              twitter: "@quintinmakwe"
            }
          })
    }catch(err){
        next(err);
    }
}