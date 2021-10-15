!
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("$GP")) : "function" == typeof define && define.amd ? define(["$GP"], t) : "object" == typeof exports ? exports["2711/input@1.0.2index"] = t(require("$GP")) : e["2711/input@1.0.2index"] = t(e.$GP)
} ("undefined" != typeof self ? self: this,
function(e) {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t),
            o.l = !0,
            o.exports
        }
        var n = {};
        return t.m = e,
        t.c = n,
        t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        },
        t.n = function(e) {
            var n = e && e.__esModule ?
            function() {
                return e.
            default
            }:
            function() {
                return e
            };
            return t.d(n, "a", n),
            n
        },
        t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        t.p = "https://tggoss.oss-cn-hangzhou.aliyuncs.com/tggoss/2711/input/1.0.2/",
        t(t.s = 6)
    } ([function(e, t) {
        function n(e, t) {
            var n = e[1] || "",
            o = e[3];
            if (!o) return n;
            if (t && "function" == typeof btoa) {
                var a = r(o);
                return [n].concat(o.sources.map(function(e) {
                    return "/*# sourceURL=" + o.sourceRoot + e + " */"
                })).concat([a]).join("\n")
            }
            return [n].join("\n")
        }
        function r(e) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */"
        }
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map(function(t) {
                    var r = n(t, e);
                    return t[2] ? "@media " + t[2] + "{" + r + "}": r
                }).join("")
            },
            t.i = function(e, n) {
                "string" == typeof e && (e = [[null, e, ""]]);
                for (var r = {},
                o = 0; o < this.length; o++) {
                    var a = this[o][0];
                    "number" == typeof a && (r[a] = !0)
                }
                for (o = 0; o < e.length; o++) {
                    var i = e[o];
                    "number" == typeof i[0] && r[i[0]] || (n && !i[2] ? i[2] = n: n && (i[2] = "(" + i[2] + ") and (" + n + ")"), t.push(i))
                }
            },
            t
        }
    },
    function(e, t, n) {
        "use strict";
        function r(e, t, n, r) {
            v = n,
            _ = r || {};
            var a = Object(c.a)(e, t);
            return o(a),
            function(t) {
                for (var n = [], r = 0; r < a.length; r++) {
                    var i = a[r],
                    u = d[i.id];
                    u.refs--,
                    n.push(u)
                }
                t ? (a = Object(c.a)(e, t), o(a)) : a = [];
                for (var r = 0; r < n.length; r++) {
                    var u = n[r];
                    if (0 === u.refs) {
                        for (var s = 0; s < u.parts.length; s++) u.parts[s]();
                        delete d[u.id]
                    }
                }
            }
        }
        function o(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                r = d[n.id];
                if (r) {
                    r.refs++;
                    for (var o = 0; o < r.parts.length; o++) r.parts[o](n.parts[o]);
                    for (; o < n.parts.length; o++) r.parts.push(i(n.parts[o]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                } else {
                    for (var a = [], o = 0; o < n.parts.length; o++) a.push(i(n.parts[o]));
                    d[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }
        function a() {
            var e = document.createElement("style");
            return e.type = "text/css",
            p.appendChild(e),
            e
        }
        function i(e) {
            var t, n, r = document.querySelector("style[" + y + '~="' + e.id + '"]');
            if (r) {
                if (v) return m;
                r.parentNode.removeChild(r)
            }
            if (b) {
                var o = h++;
                r = f || (f = a()),
                t = u.bind(null, r, o, !1),
                n = u.bind(null, r, o, !0)
            } else r = a(),
            t = s.bind(null, r),
            n = function() {
                r.parentNode.removeChild(r)
            };
            return t(e),
            function(r) {
                if (r) {
                    if (r.css === e.css && r.media === e.media && r.sourceMap === e.sourceMap) return;
                    t(e = r)
                } else n()
            }
        }
        function u(e, t, n, r) {
            var o = n ? "": r.css;
            if (e.styleSheet) e.styleSheet.cssText = x(t, o);
            else {
                var a = document.createTextNode(o),
                i = e.childNodes;
                i[t] && e.removeChild(i[t]),
                i.length ? e.insertBefore(a, i[t]) : e.appendChild(a)
            }
        }
        function s(e, t) {
            var n = t.css,
            r = t.media,
            o = t.sourceMap;
            if (r && e.setAttribute("media", r), _.ssrId && e.setAttribute(y, t.id), o && (n += "\n/*# sourceURL=" + o.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.
    default = r;
        var c = n(2),
        l = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !l) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var d = {},
        p = l && (document.head || document.getElementsByTagName("head")[0]),
        f = null,
        h = 0,
        v = !1,
        m = function() {},
        _ = null,
        y = "data-vue-ssr-id",
        b = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),
        x = function() {
            var e = [];
            return function(t, n) {
                return e[t] = n,
                e.filter(Boolean).join("\n")
            }
        } ()
    },
    function(e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n = [], r = {},
            o = 0; o < t.length; o++) {
                var a = t[o],
                i = a[0],
                u = a[1],
                s = a[2],
                c = a[3],
                l = {
                    id: e + ":" + o,
                    css: u,
                    media: s,
                    sourceMap: c
                };
                r[i] ? r[i].parts.push(l) : n.push(r[i] = {
                    id: i,
                    parts: [l]
                })
            }
            return n
        }
        t.a = r
    },
    function(e, t, n) {
        "use strict";
        function r(e, t, n, r, o, a, i, u) {
            e = e || {};
            var s = typeof e.
        default;
            "object" !== s && "function" !== s || (e = e.
        default);
            var c = "function" == typeof e ? e.options: e;
            t && (c.render = t, c.staticRenderFns = n, c._compiled = !0),
            r && (c.functional = !0),
            a && (c._scopeId = a);
            var l;
            if (i ? (l = function(e) {
                e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext,
                e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__),
                o && o.call(this, e),
                e && e._registeredComponents && e._registeredComponents.add(i)
            },
            c._ssrRegister = l) : o && (l = u ?
            function() {
                o.call(this, this.$root.$options.shadowRoot)
            }: o), l) if (c.functional) {
                c._injectStyles = l;
                var d = c.render;
                c.render = function(e, t) {
                    return l.call(t),
                    d(e, t)
                }
            } else {
                var p = c.beforeCreate;
                c.beforeCreate = p ? [].concat(p, l) : [l]
            }
            return {
                exports: e,
                options: c
            }
        }
        t.a = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(9);
        t.
    default = {
            mixins: [r.VueExtend.mixin],
            name: "input",
            label: "杈撳叆妗�",
            style: {
                width: "200px",
                height: "40px"
            },
            props: {
                text: {
                    type: [String, Number],
                default:
                    "",
                    editer: {
                        type: "text",
                        label: "榛樿鍊�"
                    }
                },
                placeholder: {
                    type: [String, Number],
                default:
                    "璇疯緭鍏ユ枃鏈�",
                    editer: {
                        type: "text",
                        label: "鍗犱綅绗�",
                        desc: "鎻愮ず鐢ㄦ埛杈撳叆妗嗙殑浣滅敤"
                    }
                },
                type: {
                    type: String,
                default:
                    "text",
                    editer: {
                        label: "绫诲瀷",
                        type: "enum",
                        defaultList: {
                            text: "鏂囨湰",
                            tel: "鏁板€�",
                            password: "瀵嗙爜",
                            checkbox: "澶嶉€夋"
                        }
                    }
                },
                readonly: {
                    type: Boolean,
                default:
                    !1,
                    editer: {
                        label: "鍙"
                    }
                },
                maxlength: {
                    type: Number,
                default:
                    -1,
                    editer: {
                        label: "鏈€澶у瓧绗︽暟"
                    }
                }
            },
            data: function() {
                return {
                    value: ""
                }
            },
            watch: {
                text: function() {
                    this.value = this.scopeGet("text")
                }
            },
            computed: {},
            editerMethods: {},
            methods: {
                getValue: function() {
                    return this.value
                },
                setValue: function(e) {
                    this.value = e
                }
            }
        }
    },
    ,
    function(e, t, n) {
        "use strict";
        function r(e) {
            n(7)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(4),
        a = n.n(o);
        for (var i in o)"default" !== i &&
        function(e) {
            n.d(t, e,
            function() {
                return o[e]
            })
        } (i);
        var u = n(10),
        s = n(3),
        c = r,
        l = Object(s.a)(a.a, u.a, u.b, !1, c, "data-v-ca1a7d7a", null);
        t.
    default = l.exports
    },
    function(e, t, n) {
        var r = n(8);
        "string" == typeof r && (r = [[e.i, r, ""]]),
        r.locals && (e.exports = r.locals);
        var o = n(1).
    default;
        o("6d818db0", r, !0, {})
    },
    function(e, t, n) {
        t = e.exports = n(0)(!1),
        t.push([e.i, ".component[data-v-ca1a7d7a]{width:100%;height:100%;outline:none;border:none;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.component.checkbox[data-v-ca1a7d7a]{width:auto;height:auto;-webkit-appearance:checkbox;-moz-appearance:checkbox;appearance:checkbox}", ""])
    },
    function(t, n) {
        t.exports = e
    },
    function(e, t, n) {
        "use strict";
        n.d(t, "a",
        function() {
            return r
        }),
        n.d(t, "b",
        function() {
            return o
        });
        var r = function() {
            var e = this,
            t = e.$createElement,
            n = e._self._c || t;
            return n("div", {
                staticClass: "component"
            },
            ["checkbox" === e.type ? n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.value,
                    expression: "value"
                }],
                staticClass: "component",
                class: {
                    checkbox: "checkbox" == e.type
                },
                attrs: {
                    readonly: e.readonly,
                    maxlength: e.maxlength,
                    placeholder: e.placeholder,
                    type: "checkbox"
                },
                domProps: {
                    checked: Array.isArray(e.value) ? e._i(e.value, null) > -1 : e.value
                },
                on: {
                    change: function(t) {
                        var n = e.value,
                        r = t.target,
                        o = !!r.checked;
                        if (Array.isArray(n)) {
                            var a = e._i(n, null);
                            r.checked ? a < 0 && (e.value = n.concat([null])) : a > -1 && (e.value = n.slice(0, a).concat(n.slice(a + 1)))
                        } else e.value = o
                    }
                }
            }) : "radio" === e.type ? n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.value,
                    expression: "value"
                }],
                staticClass: "component",
                class: {
                    checkbox: "checkbox" == e.type
                },
                attrs: {
                    readonly: e.readonly,
                    maxlength: e.maxlength,
                    placeholder: e.placeholder,
                    type: "radio"
                },
                domProps: {
                    checked: e._q(e.value, null)
                },
                on: {
                    change: function(t) {
                        e.value = null
                    }
                }
            }) : n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.value,
                    expression: "value"
                }],
                staticClass: "component",
                class: {
                    checkbox: "checkbox" == e.type
                },
                attrs: {
                    readonly: e.readonly,
                    maxlength: e.maxlength,
                    placeholder: e.placeholder,
                    type: e.type
                },
                domProps: {
                    value: e.value
                },
                on: {
                    input: function(t) {
                        t.target.composing || (e.value = t.target.value)
                    }
                }
            })])
        },
        o = []
    }])
});