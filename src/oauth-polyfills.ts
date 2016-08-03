export function objectAssign(target, ...args: any[]) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);

    for (var index = 1; index < args.length; index++) {
        var source = args[index];

        if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }

    return target;
}