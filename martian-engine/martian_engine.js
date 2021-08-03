let wasm_bindgen;
(function() {
    const __exports = {};
    let wasm;

    const heap = new Array(32).fill(undefined);

    heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
*/
__exports.reset = function() {
    wasm.reset();
};

/**
* @param {JsPosition} pos
*/
__exports.set_position = function(pos) {
    _assertClass(pos, JsPosition);
    var ptr0 = pos.ptr;
    pos.ptr = 0;
    wasm.set_position(ptr0);
};

/**
* @returns {JsPosition}
*/
__exports.get_position = function() {
    var ret = wasm.get_position();
    return JsPosition.__wrap(ret);
};

/**
* @returns {JsBoard}
*/
__exports.get_best_move = function() {
    var ret = wasm.get_best_move();
    return JsBoard.__wrap(ret);
};

/**
* @returns {number}
*/
__exports.get_best_score = function() {
    var ret = wasm.get_best_score();
    return ret;
};

/**
* @returns {number}
*/
__exports.get_p1_score = function() {
    var ret = wasm.get_p1_score();
    return ret;
};

/**
* @returns {number}
*/
__exports.get_p2_score = function() {
    var ret = wasm.get_p2_score();
    return ret;
};

/**
* @param {JsBoard} mov
* @returns {boolean}
*/
__exports.move_is_valid = function(mov) {
    _assertClass(mov, JsBoard);
    var ptr0 = mov.ptr;
    mov.ptr = 0;
    var ret = wasm.move_is_valid(ptr0);
    return ret !== 0;
};

/**
* @param {JsBoard} mov
*/
__exports.do_move = function(mov) {
    _assertClass(mov, JsBoard);
    var ptr0 = mov.ptr;
    mov.ptr = 0;
    wasm.do_move(ptr0);
};

/**
* @param {number} sq1
* @param {number} sq2
* @returns {boolean}
*/
__exports.do_num_move = function(sq1, sq2) {
    var ret = wasm.do_num_move(sq1, sq2);
    return ret !== 0;
};

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {string} mov
* @returns {boolean}
*/
__exports.do_string_move = function(mov) {
    var ptr0 = passStringToWasm0(mov, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.do_string_move(ptr0, len0);
    return ret !== 0;
};

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
* @returns {string}
*/
__exports.get_string_move = function() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.get_string_move(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
    }
};

/**
* @param {number} sq
* @returns {number}
*/
__exports.get_piece_moves = function(sq) {
    var ret = wasm.get_piece_moves(sq);
    return ret;
};

/**
* @param {number} time
* @returns {boolean}
*/
__exports.search = function(time) {
    var ret = wasm.search(time);
    return ret !== 0;
};

function isLikeNone(x) {
    return x === undefined || x === null;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
class JsBoard {

    static __wrap(ptr) {
        const obj = Object.create(JsBoard.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsboard_free(ptr);
    }
    /**
    * @returns {number}
    */
    get upper() {
        var ret = wasm.__wbg_get_jsboard_upper(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set upper(arg0) {
        wasm.__wbg_set_jsboard_upper(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get lower() {
        var ret = wasm.__wbg_get_jsboard_lower(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set lower(arg0) {
        wasm.__wbg_set_jsboard_lower(this.ptr, arg0);
    }
}
__exports.JsBoard = JsBoard;
/**
*/
class JsPosition {

    static __wrap(ptr) {
        const obj = Object.create(JsPosition.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsposition_free(ptr);
    }
    /**
    * @returns {JsBoard}
    */
    get board() {
        var ret = wasm.__wbg_get_jsposition_board(this.ptr);
        return JsBoard.__wrap(ret);
    }
    /**
    * @param {JsBoard} arg0
    */
    set board(arg0) {
        _assertClass(arg0, JsBoard);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_jsposition_board(this.ptr, ptr0);
    }
    /**
    * @returns {JsBoard}
    */
    get prev() {
        var ret = wasm.__wbg_get_jsposition_prev(this.ptr);
        return JsBoard.__wrap(ret);
    }
    /**
    * @param {JsBoard} arg0
    */
    set prev(arg0) {
        _assertClass(arg0, JsBoard);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_jsposition_prev(this.ptr, ptr0);
    }
    /**
    * @returns {boolean}
    */
    get player() {
        var ret = wasm.__wbg_get_jsposition_player(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set player(arg0) {
        wasm.__wbg_set_jsposition_player(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get score() {
        var ret = wasm.__wbg_get_jsposition_score(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set score(arg0) {
        wasm.__wbg_set_jsposition_score(this.ptr, arg0);
    }
}
__exports.JsPosition = JsPosition;

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        let src;
        if (typeof document === 'undefined') {
            src = location.href;
        } else {
            src = document.currentScript.src;
        }
        input = src.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_instanceof_Window_b99429ec408dcb8d = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_performance_b21afb8a0a7e3e9a = function(arg0) {
        var ret = getObject(arg0).performance;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_now_b1c5cb547e270797 = function(arg0) {
        var ret = getObject(arg0).now();
        return ret;
    };
    imports.wbg.__wbg_getRandomValues_98117e9a7e993920 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_64cc7d048f228ca8 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_process_2f24d6544ea7b200 = function(arg0) {
        var ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        var ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_versions_6164651e75405d4a = function(arg0) {
        var ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_4b517d861cbcb3bc = function(arg0) {
        var ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_crypto_98fc271021c7d2ad = function(arg0) {
        var ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_msCrypto_a2cdb043d2bfe57f = function(arg0) {
        var ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_modulerequire_3440a4bcf44437db = function() { return handleError(function (arg0, arg1) {
        var ret = module.require(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newnoargs_68424965d85fcb08 = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_9698e9b9c4668ae0 = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_3df7c33e222cd53b = function() { return handleError(function () {
        var ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_0f90182e6c405ff2 = function() { return handleError(function () {
        var ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_787cfd4f25a35141 = function() { return handleError(function () {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_af2eb7b1369372ed = function() { return handleError(function () {
        var ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_buffer_eb2155f17856c20b = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_0b194abde938d0c6 = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_ff8b26f7b2d7e2fb = function(arg0) {
        var ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_67cdd115b9cb141f = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_newwithlength_a49b32b2030b93c3 = function(arg0) {
        var ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_1bb315d30e0c968c = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        var ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

wasm_bindgen = Object.assign(init, __exports);

})();

var engine = wasm_bindgen;
engine();
