
const ReactiveHandler = {
    get(target, prop, receiver) {
        if (prop == 'isReactive') return true
        return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value) {
        return Reflect.set(target, prop, value)
    },
    deleteProperty(target, property) {
        return Reflect.deleteProperty(target, property)
    }
}
function shallowReactive(target) {
    return target && typeof target === 'object' ? new Proxy(target, ReactiveHandler) : target
}

function reactive(target) {
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                target[index] = reactive(item)
            })
        } else {
            Object.keys(target).forEach((key) => {
                target[key] = reactive(key)
            })
        }
    }
    return target
}
const ReadonlyHandler = {
    get(target, prop, receiver) {
        if (prop == '_isReadonly') return true
        return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value) {
        return true
    },
    deleteProperty(target, property) {
        return true
    }
}

function shallowReadonly(target) {
    return target && typeof target === 'object' ? new Proxy(target, ReadonlyHandler) : target
}

function readonly(target) {
    if (target && typeof target === 'object') {
        if (Array.isArray(target)) {
            Array.forEach((item, index) => {
                target[index] = readonly(item)
            })
        } else {
            Object.keys(target).forEach(key => {
                target[key] = readonly(item)
            })
        }
    }
    return target
}

function shallowRef(target) {
    return {
        _value: target,
        // 定义一个 getter    数据劫持
        get() {
            return this._value
        },
        // 定义一个 setter    数据劫持
        set(val) {
            this._value = val
        }
    }
}

function ref(target) {
    target = reactive(target)
    return {
        _isRef: true,
        _value: target,
        // 定义一个 getter    数据劫持
        get() {
            return this._value
        },
        // 定义一个 setter    数据劫持
        set(val) {
            this._value = val
        }
    }

}

function isRef(target) {
    return target && target._isRef
}

function isReactive(target) {
    return target && target._isReactive
}

function isReadonly(target) {
    return target && target._isReadonly
}
function isProxy(target) {
    return isReactive(target) || isReadonly(target)
}