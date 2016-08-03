define(["require", "exports"], function (require, exports) {
    "use strict";
    function objectAssign(target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
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
    exports.objectAssign = objectAssign;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLXBvbHlmaWxscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBLHNCQUE2QixNQUFNO1FBQUUsY0FBYzthQUFkLFdBQWMsQ0FBZCxzQkFBYyxDQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDL0MsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQy9DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV6QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBcEJlLG9CQUFZLGVBb0IzQixDQUFBIiwiZmlsZSI6Im9hdXRoLXBvbHlmaWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBvYmplY3RBc3NpZ24odGFyZ2V0LCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0ID0gT2JqZWN0KHRhcmdldCk7XHJcblxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3NbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
