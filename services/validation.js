const AppError = require('../utility/errorObject');


class Validate{
    #isNested = false;
    #validConditions = ['eq', 'neq', 'gt', 'gte', 'contains'];
    #nestedTree = [];
    #validDataTypes = ['object', 'array', 'string']
    #dataType = null

    constructor(object){
        this.content = object;
    }

    isType(obj, type){
        const result =  ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

        if(result !== type) return {status: false, data: result}

        return {status: true, data: null}
    }

    isNested(field){
        const splitByDepth = field.split('.')

        if(splitByDepth.length > 1){
            this.#isNested = true
            this.#nestedTree = [...splitByDepth]
        }

        return 
    }

    isValidcondition(condition){
        const result = this.#validConditions.includes(condition)

        return {status: result, data: null}
    }

    hasMissingField(){
        let data
        if(this.#isNested && this.#dataType == 'object'){
    
            data = this.content.data

            for(let i = 0; i < this.#nestedTree.length; i ++){
                data = data[this.#nestedTree[i]] 
            }

        }else{

            data =  this.content.data[this.content.rule.field]

        }

        if(!data){
            return {status: false , data: this.content.rule.field}
        }else{
            return {status: true, data: this.content.rule.field}
        }
    }

    containsRequiredField(obj, requiredFields){
        if(!Array.isArray(requiredFields)) throw new AppError(`expected an array, got a ${({}).toString.call(requiredFields).match(/\s([a-zA-Z]+)/)[1].toLowerCase()} instead`)

        const objFields = Object.keys(obj)

        for(let i = 0 ; i < requiredFields.length; i++){
            const currentField = requiredFields[i]
            if(!objFields.includes(currentField)) return {status: false , data: currentField}
        }

        return {status: true, data: null}
    }

    isAboveNestedDepth(){
        if(this.#isNested){
            if(this.#nestedTree.length > 3){
                return {status:true , data: null} 
            }
        }
        return {status: false, data: null}
    }

    isValidDataField(dataField){
        const providedDataType = ({}).toString.call(dataField).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

        if(!this.#validDataTypes.includes(providedDataType)) return {status: false, data: null}

        this.#dataType = providedDataType

        return {status: true, data: null} 
    }

    isComparatorSameType(){
        let data
        const validCondition = ['eq','neq', 'gt', 'gte']
        const conditionValue = this.content.rule.condition_value

        if(validCondition.includes(this.content.rule.condition)){
            if(this.#isNested && this.#dataType == 'object'){
        
                data = this.content.data
    
                for(let i = 0; i < this.#nestedTree.length; i ++){
                    data = data[this.#nestedTree[i]] 
                }
    
            }else{
    
                data =  this.content.data[this.content.rule.field]
    
            }

            //check the types or data and condition value and ensure there are same

            const dataType = ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            const conditionType = ({}).toString.call(conditionValue).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

            if(dataType == conditionType){
                return {status: true , data: {data: data, condition: conditionValue}}
            }else{
                return {status: false, data: {data: data, condition: conditionValue}}
            }

        }
    }

    validateObject(obj){
        const condition = obj.rule.condition
        const conditionValue = obj.rule.condition_value
        let data
        let status
    
        if(this.#dataType == 'array' || this.#dataType == 'string'){
    
            data = obj.data[obj.rule.field]
    
        }else{
    
            if(this.#isNested){
    
                data = obj.data
    
                for(let i = 0; i < this.#nestedTree.length; i ++){
                    data = data[this.#nestedTree[i]]
                }
    
            }else{

                data =  obj.data[obj.rule.field]
    
            }
        }
    
        if(condition == 'eq'){
            status =  data == conditionValue;
        }else if(condition == 'neq'){
            status =  data !== conditionValue;
        }else if(condition == 'gt'){
            status =  data > conditionValue;
        }else if(condition == 'gte'){
            status =  data >= conditionValue;
        }else{
            status = data.includes(conditionValue);
        }

        if(!data){
            return {
                status: false,
                data: null,
                message: `field ${obj.rule.field} is missing from data.`
            }
        }else{
            return {
                status,
                data: { 
                    validation: {
                        error: status ? false : true,
                        field: obj.rule.field,
                        field_value: data,
                        condition: condition,
                        condition_value: conditionValue
                    }
                },
                message: `field ${obj.rule.field} ${status ? "successfully validated." : "failed validation."}`
            }
        }  
    }
}

module.exports = Validate