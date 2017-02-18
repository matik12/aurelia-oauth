export function objectAssign(target, source) {
    if (target == null || source == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);

    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }

    return target;
}