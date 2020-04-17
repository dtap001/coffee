var crypto = require('crypto');
export class CommonUtil {

    static deepEqual(object, validationTemplate, currentPath?: string): boolean {
        if (currentPath == null || currentPath == undefined) {
            currentPath = "";
        }
        for (let property in validationTemplate) {
            if (object[property] == undefined) {
                throw new Error("Missing property: " + currentPath + "." + property)
            }
            if (object[property] == null) {
                throw new Error("Missing property value for: " + currentPath + "." + property)
            }
            if (typeof object[property] === 'object') {
                CommonUtil.deepEqual(object[property], validationTemplate[property], currentPath + "." + property);
            }
        }
        return true;
    }
    static hash(raw) {

        var hash = crypto.createHash('sha256')
            .update(raw)
            .digest('hex');
        return hash;
    }
}

/*
var findObjectByLabel = function(obj, label) {
    if(obj.label === label) { return obj; }
    for(var i in obj) {
        if(obj.hasOwnProperty(i)){
            var foundLabel = findObjectByLabel(obj[i], label);
            if(foundLabel) { return foundLabel; }
        }
    }
    return null;
};
*/