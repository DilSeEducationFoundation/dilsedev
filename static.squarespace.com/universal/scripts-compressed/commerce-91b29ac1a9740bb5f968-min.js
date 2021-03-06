webpackJsonp([22], {
    0: function(k, l, c) {
        c(3301);
        c(1398);
        c(1401);
        c(1400);
        c(1399);
        c(2342);
        c(1368);
        c(1072);
        c(841);
        c(2494);
        c(448);
        c(2343);
        c(3392);
        c(3291);
        c(2704);
        c(3293);
        c(1374);
        c(3295);
        c(1777);
        c(2708);
        c(3292);
        c(2705);
        c(2710);
        c(1748);
        c(1752);
        c(1798);
        c(1397);
        c(1234);
        c(1233);
        c(3294);
        c(1710);
        c(721);
        c(1792);
        c(3290);
        c(1392);
        c(1793);
        c(1780);
        c(1799);
        c(2706);
        c(3428);
        c(3296);
        c(2707);
        c(2711);
        c(3430);
        c(3509);
        c(2723);
        c(2724);
        c(3304);
        c(2709);
        c(2712);
        c(1776);
        c(1381);
        c(3425);
        c(2718);
        c(2719);
        c(3521);
        c(3485);
        c(3483);
        c(2720);
        c(1226);
        c(3522)
    },
    448: function(k, l) {
        YUI.add("model", function(c, f) {
            function b() {
                b.superclass.constructor.apply(this, arguments)
            }
            var g = YUI.namespace("Env.Model"),
                a = c.Lang,
                h = c.Array,
                d = c.Object,
                e = "error";
            c.Model = c.extend(b, c.Base, {
                idAttribute: "id",
                _allowAdHocAttrs: !0,
                _isYUIModel: !0,
                initializer: function(a) {
                    this.changed = {};
                    this.lastChange = {};
                    this.lists = []
                },
                destroy: function(a, d) {
                    var e = this;
                    "function" === typeof a && (d = a, a = null);
                    e.onceAfter("destroy", function() {
                        function b(c) {
                            c || h.each(e.lists.concat(), function(b) {
                                b.remove(e,
                                    a)
                            });
                            d && d.apply(null, arguments)
                        }
                        a && (a.remove || a["delete"]) ? e.sync("delete", a, b) : b()
                    });
                    return b.superclass.destroy.call(e)
                },
                generateClientId: function() {
                    g.lastId || (g.lastId = 0);
                    return this.constructor.NAME + "_" + (g.lastId += 1)
                },
                getAsHTML: function(b) {
                    b = this.get(b);
                    return c.Escape.html(a.isValue(b) ? String(b) : "")
                },
                getAsURL: function(b) {
                    b = this.get(b);
                    return encodeURIComponent(a.isValue(b) ? String(b) : "")
                },
                isModified: function() {
                    return this.isNew() || !d.isEmpty(this.changed)
                },
                isNew: function() {
                    return !a.isValue(this.get("id"))
                },
                load: function(a, b) {
                    var d = this;
                    "function" === typeof a && (b = a, a = {});
                    a || (a = {});
                    d.sync("read", a, function(c, h) {
                        var g = {
                                options: a,
                                response: h
                            },
                            f;
                        c ? (g.error = c, g.src = "load", d.fire(e, g)) : (d._loadEvent || (d._loadEvent = d.publish("load", {
                            preventable: !1
                        })), f = g.parsed = d._parse(h), d.setAttrs(f, a), d.changed = {}, d.fire("load", g));
                        b && b.apply(null, arguments)
                    });
                    return d
                },
                parse: function(a) {
                    if ("string" === typeof a) try {
                        return c.JSON.parse(a)
                    } catch (b) {
                        return this.fire(e, {
                            error: b,
                            response: a,
                            src: "parse"
                        }), null
                    }
                    return a
                },
                save: function(a,
                    b) {
                    var d = this;
                    "function" === typeof a && (b = a, a = {});
                    a || (a = {});
                    d._validate(d.toJSON(), function(c) {
                        c ? b && b.call(null, c) : d.sync(d.isNew() ? "create" : "update", a, function(c, h) {
                            var g = {
                                    options: a,
                                    response: h
                                },
                                f;
                            c ? (g.error = c, g.src = "save", d.fire(e, g)) : (d._saveEvent || (d._saveEvent = d.publish("save", {
                                preventable: !1
                            })), h && (f = g.parsed = d._parse(h), d.setAttrs(f, a)), d.changed = {}, d.fire("save", g));
                            b && b.apply(null, arguments)
                        })
                    });
                    return d
                },
                set: function(a, b, d) {
                    var e = {};
                    e[a] = b;
                    return this.setAttrs(e, d)
                },
                setAttrs: function(a, b) {
                    var e =
                        this.idAttribute,
                        h, g, f, v;
                    b = c.merge(b);
                    v = b._transaction = {};
                    "id" !== e && (a = c.merge(a), d.owns(a, e) ? a.id = a[e] : d.owns(a, "id") && (a[e] = a.id));
                    for (g in a) d.owns(a, g) && this._setAttr(g, a[g], b);
                    if (!d.isEmpty(v)) {
                        e = this.changed;
                        f = this.lastChange = {};
                        for (g in v) d.owns(v, g) && (h = v[g], e[g] = h.newVal, f[g] = {
                            newVal: h.newVal,
                            prevVal: h.prevVal,
                            src: h.src || null
                        });
                        b.silent || (this._changeEvent || (this._changeEvent = this.publish("change", {
                            preventable: !1
                        })), b.changed = f, this.fire("change", b))
                    }
                    return this
                },
                sync: function() {
                    var a = h(arguments,
                        0, !0).pop();
                    "function" === typeof a && a()
                },
                toJSON: function() {
                    var a = this.getAttrs();
                    delete a.clientId;
                    delete a.destroyed;
                    delete a.initialized;
                    "id" !== this.idAttribute && delete a.id;
                    return a
                },
                undo: function(a, b) {
                    var e = this.lastChange,
                        c = this.idAttribute,
                        g = {},
                        f;
                    a || (a = d.keys(e));
                    h.each(a, function(a) {
                        d.owns(e, a) && (a = a === c ? "id" : a, f = !0, g[a] = e[a].prevVal)
                    });
                    return f ? this.setAttrs(g, b) : this
                },
                validate: function(a, b) {
                    b && b()
                },
                addAttr: function(d, e, c) {
                    var h = this.idAttribute,
                        g;
                    h && d === h && (h = this._isLazyAttr("id") || this._getAttrCfg("id"),
                        g = e.value === e.defaultValue ? null : e.value, a.isValue(g) || (g = h.value === h.defaultValue ? null : h.value, a.isValue(g) || (g = a.isValue(e.defaultValue) ? e.defaultValue : h.defaultValue)), e.value = g, h.value !== g && (h.value = g, this._isLazyAttr("id") ? this._state.add("id", "lazy", h) : this._state.add("id", "value", g)));
                    return b.superclass.addAttr.apply(this, arguments)
                },
                _parse: function(a) {
                    return this.parse(a)
                },
                _validate: function(b, d) {
                    function h(g) {
                        a.isValue(g) ? (c.fire(e, {
                            attributes: b,
                            error: g,
                            src: "validate"
                        }), d(g)) : d()
                    }
                    var c = this;
                    1 === c.validate.length ? h(c.validate(b, h)) : c.validate(b, h)
                },
                _setAttrVal: function(a, d, e, h, c, g) {
                    var f = b.superclass._setAttrVal.apply(this, arguments),
                        u = c && c._transaction,
                        y = g && g.initializing;
                    f && (u && !y) && (u[a] = {
                        newVal: this.get(a),
                        prevVal: e,
                        src: c.src || null
                    });
                    return f
                }
            }, {
                NAME: "model",
                ATTRS: {
                    clientId: {
                        valueFn: "generateClientId",
                        readOnly: !0
                    },
                    id: {
                        value: null
                    }
                }
            })
        }, "3.17.2", {
            requires: ["base-build", "escape", "json-parse"]
        })
    },
    488: function(k, l) {
        k.exports = {
            AF: "Afghanistan",
            AL: "Albania",
            DZ: "Algeria",
            AS: "American Samoa",
            AD: "Andorra",
            AO: "Angola",
            AI: "Anguilla",
            AQ: "Antarctica",
            AG: "Antigua and Barbuda",
            AR: "Argentina",
            AM: "Armenia",
            AW: "Aruba",
            AU: "Australia",
            AT: "Austria",
            AX: "Aland Islands",
            AZ: "Azerbaijan",
            BS: "Bahamas",
            BH: "Bahrain",
            BD: "Bangladesh",
            BB: "Barbados",
            BY: "Belarus",
            BE: "Belgium",
            BZ: "Belize",
            BJ: "Benin",
            BM: "Bermuda",
            BT: "Bhutan",
            BO: "Bolivia",
            BA: "Bosnia and Herzegovina",
            BW: "Botswana",
            BV: "Bouvet Island",
            BR: "Brazil",
            IO: "British Indian Ocean Territory",
            BN: "Brunei Darussalam",
            BG: "Bulgaria",
            BF: "Burkina Faso",
            BI: "Burundi",
            KH: "Cambodia",
            CA: "Canada",
            CI: "Cote d'Ivoire",
            CM: "Cameroon",
            CV: "Cape Verde",
            KY: "Cayman Islands",
            CF: "Central African Republic",
            TD: "Chad",
            CL: "Chile",
            CN: "China",
            CX: "Christmas Island",
            CC: "Cocos (Keeling) Islands",
            CO: "Colombia",
            KM: "Comoros",
            CG: "Congo",
            CD: "Congo, Democratic Republic",
            CK: "Cook Islands",
            CR: "Costa Rica",
            HR: "Croatia",
            CY: "Cyprus",
            CZ: "Czech Republic",
            DK: "Denmark",
            DJ: "Djibouti",
            DM: "Dominica",
            DO: "Dominican Republic",
            TL: "Timor-Leste",
            EC: "Ecuador",
            EG: "Egypt",
            SV: "El Salvador",
            GQ: "Equatorial Guinea",
            ER: "Eritrea",
            EE: "Estonia",
            ET: "Ethiopia",
            FK: "Falkland Islands (Malvinas)",
            FO: "Faroe Islands",
            FJ: "Fiji",
            FI: "Finland",
            FR: "France",
            GF: "French Guiana",
            PF: "French Polynesia",
            TF: "French Southern Territories",
            GA: "Gabon",
            GM: "Gambia",
            GE: "Georgia",
            DE: "Germany",
            GH: "Ghana",
            GI: "Gibraltar",
            GR: "Greece",
            GL: "Greenland",
            GD: "Grenada",
            GG: "Guernsey",
            GP: "Guadeloupe",
            GU: "Guam",
            GT: "Guatemala",
            GN: "Guinea",
            GW: "Guinea-Bissau",
            GY: "Guyana",
            HT: "Haiti",
            HM: "Heard and McDonald Islands",
            HN: "Honduras",
            HK: "Hong Kong",
            HU: "Hungary",
            IS: "Iceland",
            IN: "India",
            ID: "Indonesia",
            IQ: "Iraq",
            IE: "Ireland",
            IM: "Isle of Man",
            IL: "Israel",
            IT: "Italy",
            JM: "Jamaica",
            JP: "Japan",
            JE: "Jersey",
            JO: "Jordan",
            KZ: "Kazakhstan",
            KE: "Kenya",
            KI: "Kiribati",
            KP: "Korea (the Democratic People's Republic of)",
            KR: "Korea (the Republic of)",
            XK: "Kosovo",
            KW: "Kuwait",
            KG: "Kyrgyzstan",
            LA: "Laos",
            LV: "Latvia",
            LB: "Lebanon",
            LS: "Lesotho",
            LR: "Liberia",
            LY: "Libya",
            LI: "Liechtenstein",
            LT: "Lithuania",
            LU: "Luxembourg",
            MO: "Macau",
            MK: "Macedonia",
            MG: "Madagascar",
            MW: "Malawi",
            MY: "Malaysia",
            MV: "Maldives",
            ML: "Mali",
            MT: "Malta",
            MH: "Marshall Islands",
            MQ: "Martinique",
            MR: "Mauritania",
            MU: "Mauritius",
            YT: "Mayotte",
            MX: "Mexico",
            FM: "Micronesia",
            MD: "Moldova",
            MC: "Monaco",
            MN: "Mongolia",
            ME: "Montenegro",
            MS: "Montserrat",
            MA: "Morocco",
            MZ: "Mozambique",
            NA: "Namibia",
            NR: "Nauru",
            NP: "Nepal",
            NL: "Netherlands",
            AN: "Netherlands Antilles",
            NC: "New Caledonia",
            NZ: "New Zealand",
            NI: "Nicaragua",
            NE: "Niger",
            NG: "Nigeria",
            NU: "Niue",
            NF: "Norfolk Island",
            MP: "Northern Mariana Islands",
            NO: "Norway",
            OM: "Oman",
            PK: "Pakistan",
            PW: "Palau",
            PA: "Panama",
            PG: "Papua New Guinea",
            PS: "Palestine, State of",
            PY: "Paraguay",
            PE: "Peru",
            PH: "Philippines",
            PN: "Pitcairn",
            PL: "Poland",
            PT: "Portugal",
            PR: "Puerto Rico",
            QA: "Qatar",
            RE: "Reunion",
            RO: "Romania",
            RU: "Russian Federation",
            RW: "Rwanda",
            GS: "South Georgia and the South Sandwich Islands",
            BL: "Saint Barthelemy",
            KN: "Saint Kitts and Nevis",
            LC: "Saint Lucia",
            VC: "Saint Vincent and the Grenadines",
            WS: "Samoa",
            SM: "San Marino",
            ST: "Sao Tome and Principe",
            SA: "Saudi Arabia",
            SN: "Senegal",
            RS: "Serbia",
            SC: "Seychelles",
            SL: "Sierra Leone",
            SG: "Singapore",
            SK: "Slovakia",
            SI: "Slovenia",
            SB: "Solomon Islands",
            SO: "Somalia",
            ZA: "South Africa",
            ES: "Spain",
            LK: "Sri Lanka",
            SH: "Saint Helena",
            PM: "Saint Pierre and Miquelon",
            SR: "Suriname",
            SJ: "Svalbard and Jan Mayen Islands",
            SZ: "Swaziland",
            SE: "Sweden",
            CH: "Switzerland",
            TW: "Taiwan",
            TJ: "Tajikistan",
            TZ: "Tanzania",
            TH: "Thailand",
            TG: "Togo",
            TK: "Tokelau",
            TO: "Tonga",
            TT: "Trinidad and Tobago",
            TN: "Tunisia",
            TR: "Turkey",
            TM: "Turkmenistan",
            TC: "Turks and Caicos Islands",
            TV: "Tuvalu",
            UG: "Uganda",
            UA: "Ukraine",
            AE: "United Arab Emirates",
            GB: "United Kingdom",
            US: "United States",
            UM: "United States Minor Outlying Islands",
            UY: "Uruguay",
            UZ: "Uzbekistan",
            VU: "Vanuatu",
            VA: "Vatican City State (Holy See)",
            VE: "Venezuela",
            VN: "Vietnam",
            VG: "Virgin Islands (British)",
            VI: "Virgin Islands (U.S.)",
            WF: "Wallis and Futuna Islands",
            EH: "Western Sahara",
            YE: "Yemen",
            ZM: "Zambia",
            ZW: "Zimbabwe"
        }
    },
    504: function(k, l) {
        k.exports = {
            LIVE: 1,
            TEST_MODE: 2,
            NOT_CONNECTED: 3
        }
    },
    721: function(k, l) {
        YUI.add("squarespace-dialog-check-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["dialog-check.html"] = b(function(b, a, h, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    h = this.merge(h, b.helpers);
                    e = e || {};
                    var c, f = this.escapeExpression;
                    b = '<div class="check-element ';
                    if ((d = h["if"].call(a, a.data, {
                            hash: {},
                            inverse: this.noop,
                            fn: this.program(1, function(a, b) {
                                return "active"
                            }, e),
                            data: e
                        })) || 0 === d) b += d;
                    b += '">\n  ';
                    if ((c = h["if"].call(a, (d = a.strings, null == d || !1 === d ? d : d.title), {
                            hash: {},
                            inverse: this.noop,
                            fn: this.program(3, function(a, b) {
                                var d, e;
                                return d = "" + ('\n    <div class="title">' +
                                    f((e = (e = a.strings, null == e || !1 === e ? e : e.title), "function" === typeof e ? e.apply(a) : e)) + "</div>\n  ")
                            }, e),
                            data: e
                        })) || 0 === c) b += c;
                    b += "\n  ";
                    if ((c = h["if"].call(a, (d = a.strings, null == d || !1 === d ? d : d.description), {
                            hash: {},
                            inverse: this.noop,
                            fn: this.program(5, function(a, b) {
                                var d, e, c;
                                d = '\n    <div class="description">';
                                if ((c = (e = (e = a.strings, null == e || !1 === e ? e : e.description), "function" === typeof e ? e.apply(a) : e)) || 0 === c) d += c;
                                return d + "</div>\n  "
                            }, e),
                            data: e
                        })) || 0 === c) b += c;
                    return b + "\n</div>\n"
                })
            })();
            c.Handlebars.registerPartial("dialog-check.html".replace("/",
                "."), f.templates["dialog-check.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    841: function(k, l) {
        YUI.add("datatype-date-format", function(c, f) {
            var b = function(a, b, d) {
                    "undefined" === typeof d && (d = 10);
                    for (b += ""; parseInt(a, 10) < d && 1 < d; d /= 10) a = b + a;
                    return a.toString()
                },
                g = {
                    formats: {
                        a: function(a, b) {
                            return b.a[a.getDay()]
                        },
                        A: function(a, b) {
                            return b.A[a.getDay()]
                        },
                        b: function(a, b) {
                            return b.b[a.getMonth()]
                        },
                        B: function(a, b) {
                            return b.B[a.getMonth()]
                        },
                        C: function(a) {
                            return b(parseInt(a.getFullYear() / 100, 10), 0)
                        },
                        d: ["getDate",
                            "0"
                        ],
                        e: ["getDate", " "],
                        g: function(a) {
                            return b(parseInt(g.formats.G(a) % 100, 10), 0)
                        },
                        G: function(a) {
                            var b = a.getFullYear(),
                                d = parseInt(g.formats.V(a), 10);
                            a = parseInt(g.formats.W(a), 10);
                            a > d ? b++ : 0 === a && 52 <= d && b--;
                            return b
                        },
                        H: ["getHours", "0"],
                        I: function(a) {
                            a = a.getHours() % 12;
                            return b(0 === a ? 12 : a, 0)
                        },
                        j: function(a) {
                            var c = new Date("" + a.getFullYear() + "/1/1 GMT");
                            a = new Date("" + a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate() + " GMT") - c;
                            a = parseInt(a / 6E4 / 60 / 24, 10) + 1;
                            return b(a, 0, 100)
                        },
                        k: ["getHours", " "],
                        l: function(a) {
                            a =
                                a.getHours() % 12;
                            return b(0 === a ? 12 : a, " ")
                        },
                        m: function(a) {
                            return b(a.getMonth() + 1, 0)
                        },
                        M: ["getMinutes", "0"],
                        p: function(a, b) {
                            return b.p[12 <= a.getHours() ? 1 : 0]
                        },
                        P: function(a, b) {
                            return b.P[12 <= a.getHours() ? 1 : 0]
                        },
                        s: function(a, b) {
                            return parseInt(a.getTime() / 1E3, 10)
                        },
                        S: ["getSeconds", "0"],
                        u: function(a) {
                            a = a.getDay();
                            return 0 === a ? 7 : a
                        },
                        U: function(a) {
                            var c = parseInt(g.formats.j(a), 10);
                            a = 6 - a.getDay();
                            c = parseInt((c + a) / 7, 10);
                            return b(c, 0)
                        },
                        V: function(a) {
                            var c = parseInt(g.formats.W(a), 10),
                                d = (new Date("" + a.getFullYear() +
                                    "/1/1")).getDay(),
                                c = c + (4 < d || 1 >= d ? 0 : 1);
                            53 === c && 4 > (new Date("" + a.getFullYear() + "/12/31")).getDay() ? c = 1 : 0 === c && (c = g.formats.V(new Date("" + (a.getFullYear() - 1) + "/12/31")));
                            return b(c, 0)
                        },
                        w: "getDay",
                        W: function(a) {
                            var c = parseInt(g.formats.j(a), 10);
                            a = 7 - g.formats.u(a);
                            c = parseInt((c + a) / 7, 10);
                            return b(c, 0, 10)
                        },
                        y: function(a) {
                            return b(a.getFullYear() % 100, 0)
                        },
                        Y: "getFullYear",
                        z: function(a) {
                            a = a.getTimezoneOffset();
                            var c = b(parseInt(Math.abs(a / 60), 10), 0),
                                d = b(Math.abs(a % 60), 0);
                            return (0 < a ? "-" : "+") + c + d
                        },
                        Z: function(a) {
                            var b =
                                a.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2").replace(/[a-z ]/g, "");
                            4 < b.length && (b = g.formats.z(a));
                            return b
                        },
                        "%": function(a) {
                            return "%"
                        }
                    },
                    aggregates: {
                        c: "locale",
                        D: "%m/%d/%y",
                        F: "%Y-%m-%d",
                        h: "%b",
                        n: "\n",
                        r: "%I:%M:%S %p",
                        R: "%H:%M",
                        t: "\t",
                        T: "%H:%M:%S",
                        x: "locale",
                        X: "locale"
                    },
                    format: function(a, h) {
                        h = h || {};
                        if (!c.Lang.isDate(a)) return c.Lang.isValue(a) ? a : "";
                        var d, e;
                        d = h.format || "%Y-%m-%d";
                        e = c.Intl.get("datatype-date-format");
                        for (var q = function(a, b) {
                                var d = g.aggregates[b];
                                return "locale" ===
                                    d ? e[b] : d
                            }, f = function(d, h) {
                                var q = g.formats[h];
                                switch (c.Lang.type(q)) {
                                    case "string":
                                        return a[q]();
                                    case "function":
                                        return q.call(a, a, e);
                                    case "array":
                                        if ("string" === c.Lang.type(q[0])) return b(a[q[0]](), q[1]);
                                    default:
                                        return h
                                }
                            }; d.match(/%[cDFhnrRtTxX]/);) d = d.replace(/%([cDFhnrRtTxX])/g, q);
                        d = d.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, f);
                        q = f = void 0;
                        return d
                    }
                };
            c.mix(c.namespace("Date"), g);
            c.namespace("DataType");
            c.DataType.Date = c.Date
        }, "3.17.2", {
            lang: "ar ar-JO ca ca-ES da da-DK de de-AT de-DE el el-GR en en-AU en-CA en-GB en-IE en-IN en-JO en-MY en-NZ en-PH en-SG en-US es es-AR es-BO es-CL es-CO es-EC es-ES es-MX es-PE es-PY es-US es-UY es-VE fi fi-FI fr fr-BE fr-CA fr-FR hi hi-IN hu id id-ID it it-IT ja ja-JP ko ko-KR ms ms-MY nb nb-NO nl nl-BE nl-NL pl pl-PL pt pt-BR ro ro-RO ru ru-RU sv sv-SE th th-TH tr tr-TR vi vi-VN zh-Hans zh-Hans-CN zh-Hant zh-Hant-HK zh-Hant-TW".split(" ")
        })
    },
    1072: function(k, l) {
        YUI.add("squarespace-json-template", function(c) {
                function f(a) {
                    return a.replace(/([\{\}\(\)\[\]\|\^\$\-\+\?])/g, "\\$1")
                }

                function b(a, b) {
                    var d = s[a + b];
                    void 0 === d && (d = "(" + f(a) + "\\S.*?" + f(b) + "\n?)", d = RegExp(d, "g"));
                    return d
                }

                function g(a, b) {
                    var d = [{
                        context: a,
                        index: -1
                    }];
                    return {
                        PushSection: function(a) {
                            if (void 0 === a || null === a) return null;
                            a = "@" == a ? d[d.length - 1].context : d[d.length - 1].context[a] || null;
                            d.push({
                                context: a,
                                index: -1
                            });
                            return a
                        },
                        Pop: function() {
                            d.pop()
                        },
                        next: function() {
                            var a = d[d.length -
                                1]; - 1 == a.index && (a = {
                                context: null,
                                index: 0
                            }, d.push(a));
                            var b = d[d.length - 2].context;
                            if (a.index == b.length) d.pop();
                            else return a.context = b[a.index++], !0
                        },
                        _Undefined: function(a) {
                            return void 0 === b ? null : b
                        },
                        _LookUpStack: function(a) {
                            for (var b = d.length - 1;;) {
                                var e = d[b];
                                if ("@index" == a) {
                                    if (-1 != e.index) return e.index
                                } else if (e = e.context, "object" === typeof e && (e = e[a], void 0 !== e)) return e;
                                b--;
                                if (-1 >= b) return this._Undefined(a)
                            }
                        },
                        get: function(a) {
                            if ("@" == a) return d[d.length - 1].context;
                            var b = a.split("."),
                                e = this._LookUpStack(b[0]);
                            if (1 < b.length)
                                for (var c = 1; c < b.length; c++) {
                                    if (null === e) return "[JSONT: Can't resolve '" + a + "'.]";
                                    e = e[b[c]];
                                    if (void 0 === e) return this._Undefined(b[c])
                                }
                            return e
                        }
                    }
                }

                function a(a, b, d) {
                    for (var e = 0; e < a.length; e++) {
                        var c = a[e];
                        if ("string" == typeof c) d(c);
                        else(0, c[0])(c[1], b, d)
                    }
                }

                function h(a, b, d) {
                    var e;
                    e = b.get(a.name);
                    for (var c = 0; c < a.formatters.length; c++) {
                        var h = a.formatters[c];
                        e = (0, h[0])(e, b, h[1])
                    }
                    d(e)
                }

                function d(b, d, e) {
                    var c = d.PushSection(b.section_name),
                        h = !1;
                    c && (h = !0);
                    c && 0 === c.length && (h = !1);
                    h ? (a(b.Statements(),
                        d, e), d.Pop()) : (d.Pop(), a(b.Statements("or"), d, e))
                }

                function e(b, d, e) {
                    for (var c = d.get("@"), h = 0; h < b.clauses.length; h++) {
                        var g = b.clauses[h],
                            q = g[1];
                        if ((0, g[0][0])(c, d, g[0][1])) {
                            a(q, d, e);
                            break
                        }
                    }
                }

                function q(b, d, e) {
                    var c = d.PushSection(b.section_name);
                    if (c && 0 < c.length) {
                        var c = c.length - 1,
                            h = b.Statements();
                        b = b.Statements("alternate");
                        for (var g = 0; void 0 !== d.next(); g++) a(h, d, e), g != c && a(b, d, e)
                    } else a(b.Statements("or"), d, e);
                    d.Pop()
                }

                function r(a, g) {
                    function f(a) {
                        if (a.startsWith(m)) {
                            var b = g.partials[a.substr(m.length)];
                            if (b) return [function(a, d, e) {
                                return c.JSONTemplate.evaluateJsonTemplate(b, a)
                            }, null];
                            throw {
                                name: "BadPartialInclude",
                                message: a.substr(m) + " is not a valid partial. Remember, loops are not supported (a partial include cannot be included inside itself)."
                            };
                        }
                        var d = u.lookup(a);
                        if (!d[0]) throw {
                            name: "BadFormatter",
                            message: a + " is not a valid formatter"
                        };
                        return d
                    }

                    function r(a) {
                        var b = s.lookup(a);
                        if (!b[0]) throw {
                            name: "BadPredicate",
                            message: a + " is not a valid predicate"
                        };
                        return b
                    }
                    var u = new v([p(c.JSONTemplate.DEFAULT_FORMATTERS),
                            n(c.JSONTemplate.DEFAULT_PREFIX_FORMATTERS)
                        ]),
                        s = v([p(c.JSONTemplate.DEFAULT_PREDICATES), n(c.JSONTemplate.DEFAULT_PARAMETRIC_PREDICATES)]),
                        H = g.format_char || "|";
                    if (":" != H && "|" != H) throw {
                        name: "ConfigurationError",
                        message: "Only format characters : and | are accepted"
                    };
                    var C = g.meta || "{}",
                        D = C.length;
                    if (1 == D % 2) throw {
                        name: "ConfigurationError",
                        message: C + " has an odd number of metacharacters"
                    };
                    for (var I = C.substring(0, D / 2), C = C.substring(D / 2, D), D = b(I, C), x = y({}), A = [x], J = I.length, w, t, G = 0;;) {
                        w = D.exec(a);
                        if (null ===
                            w) break;
                        else t = w[0];
                        w.index > G && (G = a.slice(G, w.index), x.Append(G));
                        G = D.lastIndex;
                        w = !1;
                        "\n" == t.slice(-1) && (t = t.slice(null, -1), w = !0);
                        t = t.slice(J, -J);
                        if ("#" != t.charAt(0)) {
                            if ("." == t.charAt(0)) {
                                t = t.substring(1, t.length);
                                var z = {
                                    "meta-left": I,
                                    "meta-right": C,
                                    space: " ",
                                    tab: "\t",
                                    newline: "\n"
                                }[t];
                                if (void 0 !== z) {
                                    x.Append(z);
                                    continue
                                }
                                if (z = t.match(L)) {
                                    t = z[3];
                                    z[1] ? (w = q, t = E({
                                        section_name: t
                                    })) : (w = d, t = y({
                                        section_name: t
                                    }));
                                    x.Append([w, t]);
                                    A.push(t);
                                    x = t;
                                    continue
                                }
                                var B;
                                if (z = t.match(k)) {
                                    w = (B = z[1]) ? r(B) : null;
                                    x.NewOrClause(w);
                                    continue
                                }
                                var z = !1,
                                    F = t.match(l);
                                if (F) {
                                    if (B = F[1], z = !0, -1 == B.indexOf("?")) {
                                        w = [function(a) {
                                            return function(b, d) {
                                                var e, c, h;
                                                if (-1 !== a.indexOf(" || ")) {
                                                    e = a.split("||");
                                                    for (h = 0; h < e.length; h++)
                                                        if (c = e[h].trim(), d.get(c)) return !0;
                                                    return !1
                                                }
                                                if (-1 !== a.indexOf(" && ")) {
                                                    e = a.split(" && ");
                                                    for (h = 0; h < e.length; h++)
                                                        if (c = e[h].trim(), !d.get(c)) return !1;
                                                    return !0
                                                }
                                                return d.get(a)
                                            }
                                        }(B), null];
                                        t = K();
                                        t.NewOrClause(w);
                                        x.Append([e, t]);
                                        A.push(t);
                                        x = t;
                                        continue
                                    }
                                } else if ("?" == t.charAt(t.length - 1) || "?" == t.split(" ")[0].charAt(t.split(" ")[0].length -
                                        1)) B = t, z = !0;
                                if (z) {
                                    w = B ? r(B) : null;
                                    t = K();
                                    t.NewOrClause(w);
                                    x.Append([e, t]);
                                    A.push(t);
                                    x = t;
                                    continue
                                }
                                if ("alternates with" == t) {
                                    x.AlternatesWith();
                                    continue
                                }
                                if ("end" == t) {
                                    A.pop();
                                    if (0 < A.length) x = A[A.length - 1];
                                    else throw {
                                        name: "TemplateSyntaxError",
                                        message: "Got too many {end} statements"
                                    };
                                    continue
                                }
                            }
                            F = t.split(H);
                            if (1 == F.length) z = [f("str")];
                            else {
                                z = [];
                                for (t = 1; t < F.length; t++) z.push(f(F[t]));
                                t = F[0]
                            }
                            x.Append([h, {
                                name: t,
                                formatters: z
                            }]);
                            w && x.Append("\n")
                        }
                    }
                    x.Append(a.slice(G));
                    if (1 !== A.length) throw {
                        name: "TemplateSyntaxError",
                        message: "Got too few {end} statements."
                    };
                    return x
                }
                c.namespace("JSONTemplate");
                var m = "apply ",
                    s = {};
                c.JSONTemplate.DEFAULT_FORMATTERS = c.Squarespace.TEMPLATE_FORMATTERS;
                c.JSONTemplate.DEFAULT_PREFIX_FORMATTERS = [].concat(c.Squarespace.TEMPLATE_PREFIX_FORMATTERS, [{
                    name: "pluralize",
                    func: function(a, b, d) {
                        switch (d.length) {
                            case 0:
                                b = "";
                                d = "s";
                                break;
                            case 1:
                                b = "";
                                d = d[0];
                                break;
                            case 2:
                                b = d[0];
                                d = d[1];
                                break;
                            default:
                                throw {
                                    name: "EvaluationError",
                                    message: "pluralize got too many args"
                                };
                        }
                        return 1 == a ? b : d
                    }
                }, {
                    name: "encode-space",
                    func: function(a, b, d) {
                        return a.replace(/\s/g, "&nbsp;")
                    }
                }, {
                    name: "truncate",
                    func: function(a, b, d) {
                        b = d[0] || 100;
                        d = d[1] || "...";
                        a && a.length > b && (a = a.substring(0, b), a = a.replace(/\w+$/, ""), a += d);
                        return a
                    }
                }, {
                    name: "date",
                    func: function(a, b, d) {
                        var e = 0,
                            e = (new Date(a)).getTimezoneOffset();
                        if (!c.Lang.isNumber(a)) return "Invalid date.";
                        if ("undefined" !== typeof TimezoneJS) {
                            var h;
                            try {
                                h = new TimezoneJS.Date(a, b.get("website.timeZone"))
                            } catch (g) {
                                return "Invalid Timezone"
                            }
                            e = (isNaN(h.getTimezoneOffset()) ? 0 : h.getTimezoneOffset()) -
                                e
                        } else b = -parseInt(b.get("website.timeZoneOffset"), 10) / 6E4, h = (new Date).getTimezoneOffset(), e = b - h;
                        a = new Date(a - 6E4 * e);
                        d = d.join(" ");
                        return c.DataType.Date.format(a, {
                            format: d
                        })
                    }
                }, {
                    name: "image",
                    func: function(a, b, d) {
                        var e;
                        a.mediaFocalPoint && (e = a.mediaFocalPoint.x + "," + a.mediaFocalPoint.y);
                        return '<img class="' + (d[0] ? d[0] : "thumb-image") + '" ' + (a.title ? 'alt="' + c.Squarespace.Escaping.escapeForHtmlTag(a.title) + '" ' : "") + ' data-image="' + a.assetUrl + '" data-image-dimensions="' + a.originalSize + '" data-image-focal-point="' +
                            e + '"/>'
                    }
                }, {
                    name: "timesince",
                    func: function(a, b, d) {
                        if (!c.Lang.isNumber(a)) return "Invalid date.";
                        d.join(" ");
                        return '<span class="timesince" data-date="' + a + '">' + c.Squarespace.DateUtils.humanizeDate(a) + "</span>"
                    }
                }, {
                    name: "resizedHeightForWidth",
                    func: function(a, b, d) {
                        b = a.split("x");
                        if (2 != b.length) return "Invalid source parameter.  Pass in 'originalSize'.";
                        a = parseInt(b[0], 10);
                        b = parseInt(b[1], 10);
                        d = parseInt(d[0], 10) / a;
                        return parseInt(b * d, 10)
                    }
                }, {
                    name: "resizedWidthForHeight",
                    func: function(a, b, d) {
                        b = a.split("x");
                        if (2 != b.length) return "Invalid source parameter.  Pass in 'originalSize'.";
                        a = parseInt(b[0], 10);
                        b = parseInt(b[1], 10);
                        d = parseInt(d[0], 10) / b;
                        return parseInt(a * d, 10)
                    }
                }, {
                    name: "squarespaceThumbnailForWidth",
                    func: function(a, b, d) {
                        return c.Squarespace.Rendering.getSquarespaceSizeForWidth(parseInt(d[0], 10))
                    }
                }, {
                    name: "squarespaceThumbnailForHeight",
                    func: function(a, b, d) {
                        b = a.split("x");
                        if (2 != b.length) return "Invalid source parameter.  Pass in 'originalSize'.";
                        a = parseInt(b[0], 10);
                        b = parseInt(b[1], 10);
                        d = parseInt(d[0],
                            10) / b;
                        d = parseInt(a * d, 10);
                        return c.Squarespace.Rendering.getSquarespaceSizeForWidth(d)
                    }
                }, {
                    name: "cycle",
                    func: function(a, b, d) {
                        return d[(a - 1) % d.length]
                    }
                }]);
                var p = function(a) {
                        return {
                            lookup: function(b) {
                                return [a[b] || null, null]
                            }
                        }
                    },
                    n = function(a) {
                        return {
                            lookup: function(b) {
                                for (var d = 0; d < a.length; d++) {
                                    var e = a[d].name,
                                        c = a[d].func;
                                    if (b.slice(0, e.length) == e) return d = b.charAt(e.length), b = "" === d ? [] : b.split(d).slice(1), [c, b]
                                }
                                return [null, null]
                            }
                        }
                    },
                    v = function(a) {
                        return {
                            lookup: function(b) {
                                for (var d = 0; d < a.length; d++) {
                                    var e =
                                        a[d].lookup(b);
                                    if (e[0]) return e
                                }
                                return [null, null]
                            }
                        }
                    },
                    u = function(a) {
                        var b = {
                            current_clause: [],
                            Append: function(a) {
                                b.current_clause.push(a)
                            },
                            AlternatesWith: function() {
                                throw {
                                    name: "TemplateSyntaxError",
                                    message: "{.alternates with} can only appear with in {.repeated section ...}"
                                };
                            },
                            NewOrClause: function(a) {
                                throw {
                                    name: "NotImplemented"
                                };
                            }
                        };
                        return b
                    },
                    y = function(a) {
                        var b = u(a);
                        b.statements = {
                            "default": b.current_clause
                        };
                        b.section_name = a.section_name;
                        b.Statements = function(a) {
                            return b.statements[a || "default"] || []
                        };
                        b.NewOrClause = function(a) {
                            if (a) throw {
                                name: "TemplateSyntaxError",
                                message: "{.or} clause only takes a predicate inside predicate blocks"
                            };
                            b.current_clause = [];
                            b.statements.or = b.current_clause
                        };
                        return b
                    },
                    E = function(a) {
                        var b = y(a);
                        b.AlternatesWith = function() {
                            b.current_clause = [];
                            b.statements.alternate = b.current_clause
                        };
                        return b
                    },
                    K = function(a) {
                        var b = u(a);
                        b.clauses = [];
                        b.NewOrClause = function(a) {
                            a = a || [function(a) {
                                return !0
                            }, null];
                            b.current_clause = [];
                            b.clauses.push([a, b.current_clause])
                        };
                        return b
                    },
                    L = /(repeated)?\s*(section)\s+(\S+)?/,
                    k = /^or(?:[\s\-]+(.+))?/,
                    l = /^if(?:[\s\-]+(.+))?/;
                c.JSONTemplate.Template = Class.create({
                    initialize: function(a, b, d) {
                        a = this.removeMultilineComments(a);
                        this._options = b || {};
                        this._program = r(a, this._options)
                    },
                    removeMultilineComments: function(a) {
                        for (var b = a.search("{##"), d; 0 <= b;) d = a.substr(b), a = a.substr(0, b) + d.substr(d.search("##}") + 3), b = a.search("{##");
                        return a
                    },
                    render: function(b, d) {
                        var e = g(b, this._options.undefined_str);
                        a(this._program.Statements(), e, d)
                    },
                    expand: function(a) {
                        var b = [];
                        this.render(a, function(a) {
                            b.push(a)
                        });
                        return b.join("")
                    }
                });
                c.JSONTemplate.DEFAULT_PREDICATES = c.Squarespace.TEMPLATE_PREDICATES;
                c.JSONTemplate.DEFAULT_PARAMETRIC_PREDICATES = c.Squarespace.TEMPLATE_PARAMETRIC_PREDICATES;
                c.JSONTemplate.evaluateJsonTemplate = function(a, b, d) {
                    return "string" != typeof a ? "JSON Template Error: Processing failed because no input was provided. (type: " + typeof a + ", template: " + JSON.stringify(a) + ", dictionary: " + JSON.stringify(b) + ", partials: " + JSON.stringify(d) + ")" : (new c.JSONTemplate.Template(a, {
                        partials: d
                    })).expand(b)
                }
            },
            "1.0", {
                requires: "datatype-date-format json squarespace-common squarespace-date-utils squarespace-escaping-utils squarespace-rendering squarespace-template-helpers squarespace-util".split(" ")
            })
    },
    1226: function(k, l, c) {
        var f = c(131);
        YUI.add("squarespace-product-utils", function(b) {
            b.Squarespace.ProductUtils = {
                getProductAveragePrice: function(c) {
                    c = c.get("structuredContent");
                    if (c.get("productType") === f.DIGITAL) return c.get("priceCents");
                    c = c.get("variants");
                    return b.Array.reduce(c, 0, function(a, b) {
                        return a +
                            (b.onSale ? b.salePrice : b.price)
                    }) / c.length
                },
                getProductEffectiveStock: function(c) {
                    c = c.get("structuredContent");
                    if (c.get("productType") === f.DIGITAL) return Number.MAX_VALUE;
                    c = c.get("variants");
                    var a = 0;
                    b.Array.some(c, function(b) {
                        if (b.unlimited) return a = Number.MAX_VALUE, !0;
                        a += b.qtyInStock
                    });
                    return a
                },
                initializeVariantDropdowns: function() {
                    b.all(".product-variants[data-variants]").each(function(c) {
                        var a = JSON.parse(c.getAttribute("data-variants")),
                            h = c.all("select"),
                            d = c.siblings(".product-price").item(0),
                            e;
                        d && (e = d.getHTML());
                        b.Squarespace.ProductUtils._checkVariantStockAndPrice(c, a, h, d, e);
                        h.detach("change");
                        h.each(function(q) {
                            q.after("change", function(q) {
                                b.Squarespace.ProductUtils._checkVariantStockAndPrice(c, a, h, d, e)
                            }, this)
                        }, this)
                    }, this)
                },
                _checkVariantStockAndPrice: function(c, a, h, d, e) {
                    c.removeAttribute("data-unselected-options");
                    c.removeAttribute("data-selected-variant");
                    c.removeAttribute("data-variant-in-stock");
                    var q = c.one(".variant-out-of-stock");
                    q && q.remove();
                    var f = [],
                        q = null,
                        m = !1,
                        s = {};
                    h.each(function(a) {
                        var b =
                            a.get("value"),
                            d = a.getAttribute("data-variant-option-name");
                        0 === a.get("selectedIndex") ? f.push(d) : s[d] = b
                    }, this);
                    if (0 === f.length) {
                        for (h = 0; h < a.length; h++) {
                            e = a[h];
                            var p = !0,
                                n;
                            for (n in s)
                                if (s[n] != e.attributes[n]) {
                                    p = !1;
                                    break
                                }
                            if (p) {
                                q = e;
                                if (e.unlimited || 0 < e.qtyInStock) m = !0;
                                break
                            }
                        }!q && d ? d.set("text", "Unavailable") : d && (d.empty(), q.onSale ? (d.setHTML(b.Squarespace.Commerce.moneyString(q.salePrice)), d.append(b.Node.create('<span> </span><span class="original-price">' + b.Squarespace.Commerce.moneyString(q.price) +
                            "</span>"))) : d.setHTML(b.Squarespace.Commerce.moneyString(q.price)));
                        q && !m && c.append(b.Node.create('<div class="variant-out-of-stock">Out of stock.</div>'))
                    } else d && d.getHTML() !== e && d.empty().setHTML(e);
                    c.setAttribute("data-unselected-options", JSON.stringify(f));
                    q && c.setAttribute("data-selected-variant", JSON.stringify(q));
                    m && c.setAttribute("data-variant-in-stock", m)
                }
            }
        }, "1.0", {
            requires: ["base", "node", "squarespace-commerce-utils"]
        })
    },
    1233: function(k, l) {
        YUI.add("text-data-wordbreak", function(c, f) {
                c.namespace("Text.Data").WordBreak = {
                    aletter: "[A-Za-z\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f3\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u24b6-\u24e9\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005\u303b\u303c\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790\ua791\ua7a0-\ua7a9\ua7fa-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
                    midnumlet: "['\\.\u2018\u2019\u2024\ufe52\uff07\uff0e]",
                    midletter: "[:\u00b7\u00b7\u05f4\u2027\ufe13\ufe55\uff1a]",
                    midnum: "[,;;\u0589\u060c\u060d\u066c\u07f8\u2044\ufe10\ufe14\ufe50\ufe54\uff0c\uff1b]",
                    numeric: "[0-9\u0660-\u0669\u066b\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9]",
                    cr: "\\r",
                    lf: "\\n",
                    newline: "[\x0B\f\u0085\u2028\u2029]",
                    extend: "[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f\u109a-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b6-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u192b\u1930-\u193b\u19b0-\u19c0\u19c8\u19c9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f\u1b00-\u1b04\u1b34-\u1b44\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1baa\u1be6-\u1bf3\u1c24-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe3-\uabea\uabec\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]",
                    format: "[\u00ad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200e\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]",
                    katakana: "[\u3031-\u3035\u309b\u309c\u30a0-\u30fa\u30fc-\u30ff\u31f0-\u31ff\u32d0-\u32fe\u3300-\u3357\uff66-\uff9d]",
                    extendnumlet: "[_\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f]",
                    punctuation: "[!-#%-*,-\\/:;?@\\[-\\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u3008\u3009\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30\u2e31\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]"
                }
            },
            "3.17.2", {
                requires: ["yui-base"]
            })
    },
    1234: function(k, l) {
        YUI.add("text-wordbreak", function(c, f) {
            var b = c.Text,
                g = b.Data.WordBreak,
                a = [RegExp(g.aletter), RegExp(g.midnumlet), RegExp(g.midletter), RegExp(g.midnum), RegExp(g.numeric), RegExp(g.cr), RegExp(g.lf), RegExp(g.newline), RegExp(g.extend), RegExp(g.format), RegExp(g.katakana), RegExp(g.extendnumlet)],
                h = RegExp("^" + g.punctuation + "$"),
                d = /\s/,
                e = {
                    getWords: function(a, b) {
                        var c = 0,
                            g = e._classify(a),
                            f = g.length,
                            n = [],
                            v = [],
                            u, y, E;
                        b || (b = {});
                        b.ignoreCase && (a = a.toLowerCase());
                        y = b.includePunctuation;
                        for (E = b.includeWhitespace; c < f; ++c) u = a.charAt(c), n.push(u), e._isWordBoundary(g, c) && ((n = n.join("")) && ((E || !d.test(n)) && (y || !h.test(n))) && v.push(n), n = []);
                        return v
                    },
                    getUniqueWords: function(a, b) {
                        return c.Array.unique(e.getWords(a, b))
                    },
                    isWordBoundary: function(a, b) {
                        return e._isWordBoundary(e._classify(a), b)
                    },
                    _classify: function(b) {
                        for (var d, e = [], c = 0, h, g, f = b.length, u = a.length, y; c < f; ++c) {
                            d = b.charAt(c);
                            y = 12;
                            for (h = 0; h < u; ++h)
                                if ((g = a[h]) && g.test(d)) {
                                    y = h;
                                    break
                                }
                            e.push(y)
                        }
                        return e
                    },
                    _isWordBoundary: function(a,
                        b) {
                        var d, e = a[b],
                            c = a[b + 1],
                            h;
                        if (0 > b || b > a.length - 1 && 0 !== b || 0 === e && 0 === c) return !1;
                        h = a[b + 2];
                        if (0 === e && (2 === c || 1 === c) && 0 === h) return !1;
                        d = a[b - 1];
                        return (2 === e || 1 === e) && 0 === c && 0 === d || (4 === e || 0 === e) && (4 === c || 0 === c) || (3 === e || 1 === e) && 4 === c && 4 === d || 4 === e && (3 === c || 1 === c) && 4 === h || (8 === e || 9 === e || 8 === d || 9 === d || 8 === c || 9 === c) || 5 === e && 6 === c ? !1 : 7 === e || 5 === e || 6 === e || 7 === c || 5 === c || 6 === c ? !0 : 10 === e && 10 === c || 11 === c && (0 === e || 4 === e || 10 === e || 11 === e) || 11 === e && (0 === c || 4 === c || 10 === c) ? !1 : !0
                    }
                };
            b.WordBreak = e
        }, "3.17.2", {
            requires: ["array-extras",
                "text-data-wordbreak"
            ]
        })
    },
    1368: function(k, l, c) {
        var f = c(1);
        YUI.add("squarespace-async-form", function(b) {
            b.namespace("Squarespace.Widgets");
            var c = b.Squarespace.Widgets.AsyncForm = b.Base.create("AsyncForm", b.Squarespace.Widgets.SSWidget, [], {
                initializer: function() {
                    this._typeGetterMap = {
                        date: this._getMultiFieldVal,
                        name: this._getMultiFieldVal,
                        time: this._getMultiFieldVal,
                        address: this._getMultiFieldVal,
                        checkbox: this._getOptionFieldVal,
                        likert: this._getLikertFieldVal,
                        radio: this._getRadioFieldVal,
                        select: this._getSelectVal,
                        phone: this._getPhoneFieldVal
                    };
                    this._typeSetterMap = {
                        date: this._setMultiFieldVal,
                        name: this._setMultiFieldVal,
                        time: this._setMultiFieldVal,
                        address: this._setMultiFieldVal,
                        checkbox: this._setOptionFieldVal,
                        likert: this._setLikertFieldVal,
                        radio: this._setRadioFieldVal,
                        select: this._setSelectVal,
                        phone: this._setPhoneFieldVal
                    };
                    this._defaultGetter = this._getSingleFieldVal;
                    this._defaultSetter = this._setSingleFieldVal
                },
                renderUI: function() {
                    c.superclass.renderUI.call(this);
                    var a = this.get("form"),
                        h = a.fields;
                    b.Lang.isString(h[0]) &&
                        (h = b.Array.map(h, b.JSON.parse));
                    var h = {
                            showTitle: this.get("showTitle"),
                            preventSubmit: this.get("preventDefaultSubmit") || this.get("preventAllSubmits"),
                            hideSubmitButton: this.get("hideSubmitButton"),
                            formId: a.id,
                            formName: this.get("formName"),
                            formFields: h,
                            formSubmitButtonText: this.get("formSubmitButtonText"),
                            formSubmissionMessage: a.parsedSubmissionMessage,
                            formSubmissionHTML: a.submissionHTML
                        },
                        a = this.get("contentBox"),
                        d = this.get("formTemplate").html,
                        h = b.JSONTemplate.evaluateJsonTemplate(d, h);
                    a.append(h);
                    this._formEl = a.one("form");
                    this._setFormData()
                },
                bindUI: function() {
                    this._formEl.on("submit", function(a) {
                            if (this.get("preventDefaultSubmit") && !this.get("preventAllSubmits")) {
                                this._clearErrors();
                                var c = this._validateForm(),
                                    d = c.errors;
                                0 < d.length ? this._renderErrors(d) : this.fetchValidatedFormSubmission(this.get("form").id, b.bind(function() {
                                    this.fire("submission", {
                                        data: c.data
                                    })
                                }, this), b.bind(function(a) {
                                    var d = [];
                                    b.Object.each(a.errors, function(a, b) {
                                        d.push({
                                            fieldId: b,
                                            message: a
                                        })
                                    });
                                    this._renderErrors(d)
                                }, this))
                            }
                            a.halt()
                        },
                        this);
                    this.after("formDataChange", this._setFormData, this)
                },
                setStateSaving: function() {
                    var a = this.get("contentBox");
                    a.addClass("saving");
                    a.one('input[type="submit"]').set("value", "Saving...")
                },
                setStateEditing: function() {
                    var a = this.get("contentBox"),
                        b = this.get("formSubmitButtonText");
                    a.one('input[type="submit"]').set("value", b);
                    a.removeClass("saving")
                },
                getLocalValidationErrors: function() {
                    return this._validateForm().errors
                },
                fetchValidatedFormSubmission: function(a, c, d) {
                    b.Data.post({
                        url: "/api/rest/forms/validate/" +
                            a,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(this.getFormData()),
                        success: c,
                        failure: d
                    })
                },
                getFormData: function() {
                    return this._validateForm().data
                },
                _renderErrors: function(a) {
                    b.Array.each(a, function(a) {
                        this.get("contentBox").one("#" + a.fieldId).one(".title").insert('<div class="field-error">' + a.message + "</div>", "before")
                    }, this)
                },
                _clearErrors: function() {
                    this.get("contentBox").all(".field-error").remove(!0)
                },
                _validateForm: function() {
                    var a = {},
                        b = [];
                    this._formEl.all(".form-item").each(function(d) {
                        var e =
                            d.getAttribute("id");
                        if (d = this._getFieldData(d)) {
                            var c = d.error;
                            c && b.push({
                                fieldId: e,
                                message: c
                            });
                            a[e] = d.data
                        }
                    }, this);
                    return {
                        data: a,
                        errors: b
                    }
                },
                _getFieldData: function(a) {
                    var c = a.get("className").split(" "),
                        d = null,
                        e, g = !1;
                    b.Array.each(c, function(a) {
                        b.Object.hasKey(this._typeGetterMap, a) ? (d = a, e = this._typeGetterMap[d]) : "section" === a && (g = !0)
                    }, this);
                    if (!g) return null === d && (e = this._defaultGetter), e.call(this, a)
                },
                _getSingleFieldVal: function(a) {
                    var c = a.one(".field-element");
                    if (c) {
                        var d = c.get("value"),
                            e, d = !b.Lang.isValue(d) ||
                            "" === d;
                        a.hasClass("required") && d && (e = "Required");
                        return {
                            data: c.get("value"),
                            error: e
                        }
                    }
                    return null
                },
                _getMultiFieldVal: function(a) {
                    var c = [],
                        d, e = !1;
                    a.all(".field-element").each(function(a) {
                        var d = a.get("value");
                        b.Lang.isValue(d) && "" !== d && (e = !0);
                        c.push(a.get("value"))
                    });
                    a.hasClass("required") && !e && (d = "Required");
                    return {
                        data: c,
                        error: d
                    }
                },
                _getOptionFieldVal: function(a) {
                    var b = [],
                        d;
                    a.all("input").each(function(a) {
                        a.get("checked") && b.push(a.get("value"))
                    }, this);
                    a.hasClass("required") && 0 === b.length && (d = "Required");
                    return {
                        data: b,
                        error: d
                    }
                },
                _getLikertFieldVal: function(a) {
                    var c = {};
                    a.all(".item").each(function(a) {
                        var e;
                        a.all("input").each(function(a) {
                            a.get("checked") && (e = a.get("value"))
                        });
                        b.Lang.isValue(e) && (c[a.getAttribute("data-question")] = e)
                    });
                    return {
                        data: c,
                        error: void 0
                    }
                },
                _getRadioFieldVal: function(a) {
                    var c, d;
                    a.all("input").each(function(a) {
                        a.get("checked") && (c = a.get("value"))
                    }, this);
                    a.hasClass("required") && !b.Lang.isValue(c) && (d = "Required");
                    return {
                        data: c,
                        error: d
                    }
                },
                _getSelectVal: function(a) {
                    var c = a.one("select").get("value"),
                        d, e = !b.Lang.isValue(c) || "" === c;
                    a.hasClass("required") && e && (d = "Required");
                    return {
                        data: c,
                        error: d
                    }
                },
                _getPhoneFieldVal: function(a) {
                    a = this._getMultiFieldVal(a);
                    var b = a.data;
                    b && 3 === b.length && b.unshift("");
                    return a
                },
                _setFormData: function() {
                    var a = this.get("formData");
                    null !== a && this._formEl.all(".form-item").each(function(c) {
                        var d = a[c.getAttribute("id")];
                        if (d) {
                            var e = d.value,
                                d = b.Lang.isValue(e) ? e : d.values || [];
                            this._setFieldData(c, d)
                        }
                    }, this)
                },
                _setFieldData: function(a, c) {
                    var d = a.get("className").split(" "),
                        e =
                        null,
                        g, f;
                    b.Array.each(d, function(d) {
                        b.Object.hasKey(this._typeSetterMap, d) ? (e = d, g = this._typeSetterMap[e]) : "section" === d && (f = !0);
                        if (!f) return null === e && (g = this._defaultSetter), g.call(this, a, c)
                    }, this)
                },
                _setSingleFieldVal: function(a, b) {
                    var d = a.one(".field-element");
                    if (d) return d.set("value", b)
                },
                _setMultiFieldVal: function(a, b) {
                    a.all(".field-element").each(function(a) {
                        a.set("value", b[a.getData("title")])
                    })
                },
                _setOptionFieldVal: function(a, b) {
                    a.all("input").each(function(a) {
                        -1 !== b.indexOf(a.get("value")) &&
                            a.setAttribute("checked", "checked")
                    }, this)
                },
                _setLikertFieldVal: function(a, c) {
                    a.all(".item").each(function(a) {
                        var e = a.getAttribute("data-question"),
                            e = c[e];
                        b.Lang.isValue(e) && "" !== e && (e = parseInt(e, 10) + 2, a.all("input").item(e).setAttribute("checked", "checked"))
                    })
                },
                _setRadioFieldVal: function(a, b) {
                    a.all("input").each(function(a) {
                        a.get("value") === b && a.setAttribute("checked", "checked")
                    }, this)
                },
                _setSelectVal: function(a, b) {
                    a.one("select").set("value", b)
                },
                _setPhoneFieldVal: function(a, b) {
                    3 === a.all(".field").size() &&
                        4 === b.length && b.shift();
                    this._setMultiFieldVal(a, b)
                }
            }, {
                CSS_PREFIX: "sqs-async-form",
                ATTRS: {
                    form: {
                        value: {
                            fields: []
                        },
                        validator: b.Lang.isValue
                    },
                    formTemplate: {
                        value: null
                    },
                    hideSubmitButton: {
                        value: !1
                    },
                    formSubmitButtonText: {
                        value: f("Add to Cart")
                    },
                    formName: {
                        value: f("My Form Name")
                    },
                    formData: {
                        value: null
                    },
                    showTitle: {
                        value: !0
                    },
                    preventDefaultSubmit: {
                        value: !0
                    },
                    preventAllSubmits: {
                        value: !1
                    }
                }
            })
        }, "1.0", {
            requires: ["base", "json", "node", "squarespace-json-template", "squarespace-ss-widget"]
        })
    },
    1374: function(k, l) {
        YUI.add("squarespace-email-utils",
            function(c) {
                c.namespace("Squarespace");
                var f = c.Squarespace.EmailUtils = {
                    VALID_EMAIL_REGEX: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                    isValid: function(b) {
                        return 3 > b.length || 256 < b.length ? !1 : f.VALID_EMAIL_REGEX.test(b)
                    }
                }
            }, "1.0", {
                requires: []
            })
    },
    1381: function(k, l) {
        YUI.add("squarespace-plugin-numeric-formatter", function(c) {
            c.namespace("Squarespace.Plugin");
            var f = function() {
                var b = [];
                [9, 13, 8, 46, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 229].forEach(function(c) {
                    b[c] = !0
                });
                return b
            }();
            c.Squarespace.Plugin.NumericFormatter = c.Base.create("numericFormatter", c.Plugin.Base, [], {
                initializer: function() {
                    c.Lang.isNumber(Number(this.get("host").get("value"))) ? this.set("data", Number(this.get("host").get("value"))) : this.set("data", 0);
                    this.set("displayString", this._format(this.get("data")));
                    this._bindUI();
                    this._syncUI()
                },
                _format: function(b) {
                    return this.get("displayFormatter")(b)
                },
                _syncUI: function() {
                    var b = this.get("data"),
                        g = this.get("displayString");
                    this.get("hasFocus") ? this.get("host").set("value",
                        0 < b ? g : "") : (g = "", c.Lang.isNull(this.get("prefixUnit")) || (g += this.get("prefixUnit")), g += this._format(b), c.Lang.isNull(this.get("postfixUnit")) || (g += " " + this.get("postfixUnit")), this.get("host").set("value", g))
                },
                _bindUI: function() {
                    var b = this.get("host");
                    this.on("displayStringChange", this._syncUI, this);
                    b.on("valuechange", this._onValueChange, this);
                    b.on("keydown", this._onKeyDown, this);
                    b.on("focus", this._onFocus, this);
                    b.on("blur", this._onBlur, this)
                },
                _onFocus: function() {
                    this.set("hasFocus", !0);
                    this._syncUI();
                    setTimeout(c.bind(function() {
                        this.get("host").select()
                    }, this), 0)
                },
                _onBlur: function() {
                    this.set("hasFocus", !1);
                    this.set("displayString", this._format(this.get("data")))
                },
                _onKeyDown: function(b) {
                    if (b.shiftKey || !f[b.keyCode])
                        if (!((110 === b.keyCode || 190 === b.keyCode) && -1 === this.get("host").get("value").indexOf(".")) && !isFinite(Number(String.fromCharCode(b.keyCode)))) b.stopPropagation(), b.preventDefault()
                },
                _onValueChange: function() {
                    var b = this.get("host").get("value"),
                        b = this._transformToData(b);
                    this.set("data",
                        b)
                },
                _displayFormatter: function(b) {
                    return b
                },
                _transformToData: function(b) {
                    var g;
                    c.Lang.isUndefined(this.get("prefixUnit")) || (g = String(b).replace(RegExp(this.get("prefixUnit"))));
                    c.Lang.isUndefined(this.get("postfixUnit")) || (g = String(b).replace(RegExp(this.get("postfixUnit"))));
                    return Number(g)
                }
            }, {
                NS: "numericFormatterPlugin",
                ATTRS: {
                    hasFocus: {
                        value: !1
                    },
                    data: {
                        value: null
                    },
                    displayString: {
                        value: null
                    },
                    prefixUnit: {
                        value: null
                    },
                    postfixUnit: {
                        value: null
                    },
                    displayFormatter: {
                        value: function(b) {
                            return b
                        }
                    }
                }
            })
        }, "1.0", {
            requires: ["plugin", "squarespace-util"]
        })
    },
    1392: function(k, l) {
        YUI.add("autocomplete-sources", function(c, f) {
            var b = c.AutoCompleteBase,
                g = c.Lang,
                a = "_sourceSuccess",
                h = "maxResults";
            c.mix(b.prototype, {
                _YQL_SOURCE_REGEX: /^(?:select|set|use)\s+/i,
                _beforeCreateObjectSource: function(a) {
                    return a instanceof c.Node && "select" === a.get("nodeName").toLowerCase() ? this._createSelectSource(a) : c.JSONPRequest && a instanceof c.JSONPRequest ? this._createJSONPSource(a) : this._createObjectSource(a)
                },
                _createIOSource: function(b) {
                    function e(e) {
                        var h =
                            e.request;
                        if (g._cache && h in g._cache) g[a](g._cache[h], e);
                        else f && f.isInProgress() && f.abort(), f = c.io(g._getXHRUrl(b, e), {
                            on: {
                                success: function(b, d) {
                                    var q;
                                    try {
                                        q = c.JSON.parse(d.responseText)
                                    } catch (f) {
                                        c.error("JSON parse error", f)
                                    }
                                    q && (g._cache && (g._cache[h] = q), g[a](q, e))
                                }
                            }
                        })
                    }
                    var h = {
                            type: "io"
                        },
                        g = this,
                        f, s, p;
                    h.sendRequest = function(a) {
                        s = a;
                        p || (p = !0, c.use("io-base", "json-parse", function() {
                            h.sendRequest = e;
                            e(s)
                        }))
                    };
                    return h
                },
                _createJSONPSource: function(b) {
                    function e(c) {
                        var e = c.request,
                            h = c.query;
                        if (g._cache && e in
                            g._cache) g[a](g._cache[e], c);
                        else b._config.on.success = function(b) {
                            g._cache && (g._cache[e] = b);
                            g[a](b, c)
                        }, b.send(h)
                    }
                    var h = {
                            type: "jsonp"
                        },
                        g = this,
                        f, s;
                    h.sendRequest = function(a) {
                        f = a;
                        s || (s = !0, c.use("jsonp", function() {
                            b instanceof c.JSONPRequest || (b = new c.JSONPRequest(b, {
                                format: c.bind(g._jsonpFormatter, g)
                            }));
                            h.sendRequest = e;
                            e(f)
                        }))
                    };
                    return h
                },
                _createSelectSource: function(b) {
                    var c = this;
                    return {
                        type: "select",
                        sendRequest: function(h) {
                            var g = [];
                            b.get("options").each(function(a) {
                                g.push({
                                    html: a.get("innerHTML"),
                                    index: a.get("index"),
                                    node: a,
                                    selected: a.get("selected"),
                                    text: a.get("text"),
                                    value: a.get("value")
                                })
                            });
                            c[a](g, h)
                        }
                    }
                },
                _createStringSource: function(a) {
                    return this._YQL_SOURCE_REGEX.test(a) ? this._createYQLSource(a) : -1 !== a.indexOf("{callback}") ? this._createJSONPSource(a) : this._createIOSource(a)
                },
                _createYQLSource: function(b) {
                    function e(e) {
                        var f = e.query,
                            r = q.get("yqlEnv"),
                            m = q.get(h),
                            s;
                        s = g.sub(b, {
                            maxResults: 0 < m ? m : 1E3,
                            request: e.request,
                            query: f
                        });
                        if (q._cache && s in q._cache) q[a](q._cache[s], e);
                        else f = function(b) {
                            q._cache && (q._cache[s] =
                                b);
                            q[a](b, e)
                        }, m = {
                            proto: q.get("yqlProtocol")
                        }, p ? (p._callback = f, p._opts = m, p._params.q = s, r && (p._params.env = r)) : p = new c.YQLRequest(s, {
                            on: {
                                success: f
                            },
                            allowCache: !1
                        }, r ? {
                            env: r
                        } : null, m), p.send()
                    }
                    var q = this,
                        f = {
                            type: "yql"
                        },
                        m, s, p;
                    q.get("resultListLocator") || q.set("resultListLocator", q._defaultYQLLocator);
                    f.sendRequest = function(a) {
                        m = a;
                        s || (s = !0, c.use("yql", function() {
                            f.sendRequest = e;
                            e(m)
                        }))
                    };
                    return f
                },
                _defaultYQLLocator: function(a) {
                    (a = a && a.query && a.query.results) && g.isObject(a) ? (a = c.Object.values(a) || [], a = 1 ===
                        a.length ? a[0] : a, g.isArray(a) || (a = [a])) : a = [];
                    return a
                },
                _getXHRUrl: function(a, b) {
                    var c = this.get(h);
                    b.query !== b.request && (a += b.request);
                    return g.sub(a, {
                        maxResults: 0 < c ? c : 1E3,
                        query: encodeURIComponent(b.query)
                    })
                },
                _jsonpFormatter: function(a, b, c) {
                    var f = this.get(h),
                        m = this.get("requestTemplate");
                    m && (a += m(c));
                    return g.sub(a, {
                        callback: b,
                        maxResults: 0 < f ? f : 1E3,
                        query: encodeURIComponent(c)
                    })
                }
            });
            c.mix(b.ATTRS, {
                yqlEnv: {
                    value: null
                },
                yqlProtocol: {
                    value: "http"
                }
            });
            c.mix(b.SOURCE_TYPES, {
                io: "_createIOSource",
                jsonp: "_createJSONPSource",
                object: "_beforeCreateObjectSource",
                select: "_createSelectSource",
                string: "_createStringSource",
                yql: "_createYQLSource"
            }, !0)
        }, "3.17.2", {
            optional: ["io-base", "json-parse", "jsonp", "yql"],
            requires: ["autocomplete-base"]
        })
    },
    1397: function(k, l) {
        YUI.add("highlight-base", function(c, f) {
            var b = c.Array,
                g = c.Escape,
                a = c.Text.WordBreak,
                h = c.Lang.isArray,
                d = {},
                e = {
                    _REGEX: "(&[^;\\s]*)?(%needles)",
                    _REPLACER: function(a, b, d) {
                        return b && !/\s/.test(d) ? a : e._TEMPLATE.replace(/\{s\}/g, d)
                    },
                    _START_REGEX: "^(&[^;\\s]*)?(%needles)",
                    _TEMPLATE: '<b class="' +
                        c.ClassNameManager.getClassName("highlight") + '">{s}</b>',
                    all: function(a, b, c) {
                        var f = [],
                            p, n, v, u, y, E;
                        c || (c = d);
                        p = !1 !== c.escapeHTML;
                        y = c.startsWith ? e._START_REGEX : e._REGEX;
                        E = c.replacer || e._REPLACER;
                        b = h(b) ? b : [b];
                        n = 0;
                        for (v = b.length; n < v; ++n)(u = b[n]) && f.push(g.regex(p ? g.html(u) : u));
                        p && (a = g.html(a));
                        return !f.length ? a : a.replace(RegExp(y.replace("%needles", f.join("|")), c.caseSensitive ? "g" : "gi"), E)
                    },
                    allCase: function(a, b, h) {
                        return e.all(a, b, c.merge(h || d, {
                            caseSensitive: !0
                        }))
                    },
                    start: function(a, b, h) {
                        return e.all(a,
                            b, c.merge(h || d, {
                                startsWith: !0
                            }))
                    },
                    startCase: function(a, b) {
                        return e.start(a, b, {
                            caseSensitive: !0
                        })
                    },
                    words: function(c, f, m) {
                        var s, p, n = e._TEMPLATE;
                        m || (m = d);
                        s = !!m.caseSensitive;
                        f = b.hash(h(f) ? f : a.getUniqueWords(f, {
                            ignoreCase: !s
                        }));
                        p = m.mapper || function(a, b) {
                            return b.hasOwnProperty(s ? a : a.toLowerCase()) ? n.replace(/\{s\}/g, g.html(a)) : g.html(a)
                        };
                        c = a.getWords(c, {
                            includePunctuation: !0,
                            includeWhitespace: !0
                        });
                        return b.map(c, function(a) {
                            return p(a, f)
                        }).join("")
                    },
                    wordsCase: function(a, b) {
                        return e.words(a, b, {
                            caseSensitive: !0
                        })
                    }
                };
            c.Highlight = e
        }, "3.17.2", {
            requires: ["array-extras", "classnamemanager", "escape", "text-wordbreak"]
        })
    },
    1398: function(k, l) {
        YUI.add("overlay", function(c, f) {
            c.Overlay = c.Base.create("overlay", c.Widget, [c.WidgetStdMod, c.WidgetPosition, c.WidgetStack, c.WidgetPositionAlign, c.WidgetPositionConstrain])
        }, "3.17.2", {
            requires: "widget widget-stdmod widget-position widget-position-align widget-stack widget-position-constrain".split(" "),
            skinnable: !0
        })
    },
    1399: function(k, l) {
        YUI.add("widget-position-constrain", function(c,
            f) {
            function b(a) {}
            var g = c.Node,
                a;
            b.ATTRS = {
                constrain: {
                    value: null,
                    setter: "_setConstrain"
                },
                preventOverlap: {
                    value: !1
                }
            };
            a = b._PREVENT_OVERLAP = {
                x: {
                    tltr: 1,
                    blbr: 1,
                    brbl: 1,
                    trtl: 1
                },
                y: {
                    trbr: 1,
                    tlbl: 1,
                    bltl: 1,
                    brtr: 1
                }
            };
            b.prototype = {
                initializer: function() {
                    this._posNode || c.error("WidgetPosition needs to be added to the Widget, before WidgetPositionConstrain is added");
                    c.after(this._bindUIPosConstrained, this, "bindUI")
                },
                getConstrainedXY: function(a, b) {
                    b = b || this.get("constrain");
                    var c = this._getRegion(!0 === b ? null : b),
                        g = this._posNode.get("region");
                    return [this._constrain(a[0], "x", g, c), this._constrain(a[1], "y", g, c)]
                },
                constrain: function(a, b) {
                    var c, g;
                    if (g = b || this.get("constrain")) c = a || this.get("xy"), g = this.getConstrainedXY(c, g), (g[0] !== c[0] || g[1] !== c[1]) && this.set("xy", g, {
                        constrained: !0
                    })
                },
                _setConstrain: function(a) {
                    return !0 === a ? a : g.one(a)
                },
                _constrain: function(a, b, c, g) {
                    if (g) {
                        this.get("preventOverlap") && (a = this._preventOverlap(a, b, c, g));
                        var f = "x" == b;
                        b = f ? g.width : g.height;
                        c = f ? c.width : c.height;
                        var m = f ? g.left : g.top;
                        g = f ? g.right - c : g.bottom - c;
                        if (a < m || a >
                            g) c < b ? a < m ? a = m : a > g && (a = g) : a = m
                    }
                    return a
                },
                _preventOverlap: function(b, d, c, g) {
                    var f = this.get("align"),
                        m = "x" === d,
                        s, p, n, v, u;
                    if (f && f.points && a[d][f.points.join("")]) {
                        if (d = this._getRegion(f.node)) s = m ? c.width : c.height, p = m ? d.left : d.top, n = m ? d.right : d.bottom, v = m ? d.left - g.left : d.top - g.top, u = m ? g.right - d.right : g.bottom - d.bottom;
                        b > p ? u < s && v > s && (b = p - s) : v < s && u > s && (b = n)
                    }
                    return b
                },
                _bindUIPosConstrained: function() {
                    this.after("constrainChange", this._afterConstrainChange);
                    this._enableConstraints(this.get("constrain"))
                },
                _afterConstrainChange: function(a) {
                    this._enableConstraints(a.newVal)
                },
                _enableConstraints: function(a) {
                    a ? (this.constrain(), this._cxyHandle = this._cxyHandle || this.on("constrain|xyChange", this._constrainOnXYChange)) : this._cxyHandle && (this._cxyHandle.detach(), this._cxyHandle = null)
                },
                _constrainOnXYChange: function(a) {
                    a.constrained || (a.newVal = this.getConstrainedXY(a.newVal))
                },
                _getRegion: function(a) {
                    var b;
                    a ? (a = g.one(a)) && (b = a.get("region")) : b = this._posNode.get("viewportRegion");
                    return b
                }
            };
            c.WidgetPositionConstrain = b
        }, "3.17.2", {
            requires: ["widget-position"]
        })
    },
    1400: function(k, l) {
        YUI.add("widget-stack",
            function(c, f) {
                function b(a) {}
                var g = c.Lang,
                    a = c.UA,
                    h = c.Node,
                    d = c.Widget;
                b.ATTRS = {
                    shim: {
                        value: 6 == a.ie
                    },
                    zIndex: {
                        value: 0,
                        setter: "_setZIndex"
                    }
                };
                b.HTML_PARSER = {
                    zIndex: function(a) {
                        return this._parseZIndex(a)
                    }
                };
                b.SHIM_CLASS_NAME = d.getClassName("shim");
                b.STACKED_CLASS_NAME = d.getClassName("stacked");
                b.SHIM_TEMPLATE = '<iframe class="' + b.SHIM_CLASS_NAME + '" frameborder="0" title="Widget Stacking Shim" src="javascript:false" tabindex="-1" role="presentation"></iframe>';
                b.prototype = {
                    initializer: function() {
                        this._stackNode =
                            this.get("boundingBox");
                        this._stackHandles = {};
                        c.after(this._renderUIStack, this, "renderUI");
                        c.after(this._syncUIStack, this, "syncUI");
                        c.after(this._bindUIStack, this, "bindUI")
                    },
                    _syncUIStack: function() {
                        this._uiSetShim(this.get("shim"));
                        this._uiSetZIndex(this.get("zIndex"))
                    },
                    _bindUIStack: function() {
                        this.after("shimChange", this._afterShimChange);
                        this.after("zIndexChange", this._afterZIndexChange)
                    },
                    _renderUIStack: function() {
                        this._stackNode.addClass(b.STACKED_CLASS_NAME)
                    },
                    _parseZIndex: function(a) {
                        a = !a.inDoc() ||
                            "static" === a.getStyle("position") ? "auto" : a.getComputedStyle("zIndex");
                        return "auto" === a ? null : a
                    },
                    _setZIndex: function(a) {
                        g.isString(a) && (a = parseInt(a, 10));
                        g.isNumber(a) || (a = 0);
                        return a
                    },
                    _afterShimChange: function(a) {
                        this._uiSetShim(a.newVal)
                    },
                    _afterZIndexChange: function(a) {
                        this._uiSetZIndex(a.newVal)
                    },
                    _uiSetZIndex: function(a) {
                        this._stackNode.setStyle("zIndex", a)
                    },
                    _uiSetShim: function(b) {
                        b ? (this.get("visible") ? this._renderShim() : this._renderShimDeferred(), 6 == a.ie && this._addShimResizeHandlers()) : this._destroyShim()
                    },
                    _renderShimDeferred: function() {
                        this._stackHandles.shimdeferred = this._stackHandles.shimdeferred || [];
                        this._stackHandles.shimdeferred.push(this.on("visibleChange", function(a) {
                            a.newVal && this._renderShim()
                        }))
                    },
                    _addShimResizeHandlers: function() {
                        this._stackHandles.shimresize = this._stackHandles.shimresize || [];
                        var a = this.sizeShim,
                            b = this._stackHandles.shimresize;
                        b.push(this.after("visibleChange", a));
                        b.push(this.after("widthChange", a));
                        b.push(this.after("heightChange", a));
                        b.push(this.after("contentUpdate", a))
                    },
                    _detachStackHandles: function(a) {
                        a = this._stackHandles[a];
                        var b;
                        if (a && 0 < a.length)
                            for (; b = a.pop();) b.detach()
                    },
                    _renderShim: function() {
                        var a = this._shimNode,
                            b = this._stackNode;
                        a || (a = this._shimNode = this._getShimTemplate(), b.insertBefore(a, b.get("firstChild")), this._detachStackHandles("shimdeferred"), this.sizeShim())
                    },
                    _destroyShim: function() {
                        this._shimNode && (this._shimNode.get("parentNode").removeChild(this._shimNode), this._shimNode = null, this._detachStackHandles("shimdeferred"), this._detachStackHandles("shimresize"))
                    },
                    sizeShim: function() {
                        var b = this._shimNode,
                            c = this._stackNode;
                        b && (6 === a.ie && this.get("visible")) && (b.setStyle("width", c.get("offsetWidth") + "px"), b.setStyle("height", c.get("offsetHeight") + "px"))
                    },
                    _getShimTemplate: function() {
                        return h.create(b.SHIM_TEMPLATE, this._stackNode.get("ownerDocument"))
                    }
                };
                c.WidgetStack = b
            }, "3.17.2", {
                requires: ["base-build", "widget"],
                skinnable: !0
            })
    },
    1401: function(k, l) {
        YUI.add("widget-stdmod", function(c, f) {
            function b(a) {}
            var g = c.Lang,
                a = c.Node,
                h = c.UA,
                d = c.Widget,
                e = c.Widget.UI_SRC;
            b.HEADER =
                "header";
            b.BODY = "body";
            b.FOOTER = "footer";
            b.AFTER = "after";
            b.BEFORE = "before";
            b.REPLACE = "replace";
            var q = b.HEADER,
                r = b.BODY,
                m = b.FOOTER,
                s = q + "Content",
                p = m + "Content",
                n = r + "Content";
            b.ATTRS = {
                headerContent: {
                    value: null
                },
                footerContent: {
                    value: null
                },
                bodyContent: {
                    value: null
                },
                fillHeight: {
                    value: b.BODY,
                    validator: function(a) {
                        return this._validateFillHeight(a)
                    }
                }
            };
            b.HTML_PARSER = {
                headerContent: function(a) {
                    return this._parseStdModHTML(q)
                },
                bodyContent: function(a) {
                    return this._parseStdModHTML(r)
                },
                footerContent: function(a) {
                    return this._parseStdModHTML(m)
                }
            };
            b.SECTION_CLASS_NAMES = {
                header: d.getClassName("hd"),
                body: d.getClassName("bd"),
                footer: d.getClassName("ft")
            };
            b.TEMPLATES = {
                header: '<div class="' + b.SECTION_CLASS_NAMES[q] + '"></div>',
                body: '<div class="' + b.SECTION_CLASS_NAMES[r] + '"></div>',
                footer: '<div class="' + b.SECTION_CLASS_NAMES[m] + '"></div>'
            };
            b.prototype = {
                initializer: function() {
                    this._stdModNode = this.get("contentBox");
                    c.before(this._renderUIStdMod, this, "renderUI");
                    c.before(this._bindUIStdMod, this, "bindUI");
                    c.before(this._syncUIStdMod, this, "syncUI")
                },
                _syncUIStdMod: function() {
                    var a = this._stdModParsed;
                    (!a || !a[s]) && this._uiSetStdMod(q, this.get(s));
                    (!a || !a[n]) && this._uiSetStdMod(r, this.get(n));
                    (!a || !a[p]) && this._uiSetStdMod(m, this.get(p));
                    this._uiSetFillHeight(this.get("fillHeight"))
                },
                _renderUIStdMod: function() {
                    this._stdModNode.addClass(d.getClassName("stdmod"));
                    this._renderStdModSections();
                    this.after("headerContentChange", this._afterHeaderChange);
                    this.after("bodyContentChange", this._afterBodyChange);
                    this.after("footerContentChange", this._afterFooterChange)
                },
                _renderStdModSections: function() {
                    g.isValue(this.get(s)) && this._renderStdMod(q);
                    g.isValue(this.get(n)) && this._renderStdMod(r);
                    g.isValue(this.get(p)) && this._renderStdMod(m)
                },
                _bindUIStdMod: function() {
                    this.after("fillHeightChange", this._afterFillHeightChange);
                    this.after("heightChange", this._fillHeight);
                    this.after("contentUpdate", this._fillHeight)
                },
                _afterHeaderChange: function(a) {
                    a.src !== e && this._uiSetStdMod(q, a.newVal, a.stdModPosition)
                },
                _afterBodyChange: function(a) {
                    a.src !== e && this._uiSetStdMod(r, a.newVal,
                        a.stdModPosition)
                },
                _afterFooterChange: function(a) {
                    a.src !== e && this._uiSetStdMod(m, a.newVal, a.stdModPosition)
                },
                _afterFillHeightChange: function(a) {
                    this._uiSetFillHeight(a.newVal)
                },
                _validateFillHeight: function(a) {
                    return !a || a == b.BODY || a == b.HEADER || a == b.FOOTER
                },
                _uiSetFillHeight: function(a) {
                    a = this.getStdModNode(a);
                    var b = this._currFillNode;
                    b && a !== b && b.setStyle("height", "");
                    a && (this._currFillNode = a);
                    this._fillHeight()
                },
                _fillHeight: function() {
                    if (this.get("fillHeight")) {
                        var a = this.get("height");
                        "" != a && "auto" !=
                            a && this.fillHeight(this.getStdModNode(this.get("fillHeight")))
                    }
                },
                _uiSetStdMod: function(a, b, c) {
                    if (g.isValue(b)) {
                        var d = this.getStdModNode(a, !0);
                        this._addStdModContent(d, b, c);
                        this.set(a + "Content", this._getStdModContent(a), {
                            src: e
                        })
                    } else this._eraseStdMod(a);
                    this.fire("contentUpdate")
                },
                _renderStdMod: function(a) {
                    var b = this.get("contentBox"),
                        c = this._findStdModSection(a);
                    c || (c = this._getStdModTemplate(a));
                    this._insertStdModSection(b, a, c);
                    this[a + "Node"] = c;
                    return this[a + "Node"]
                },
                _eraseStdMod: function(a) {
                    var b =
                        this.getStdModNode(a);
                    b && (b.remove(!0), delete this[a + "Node"])
                },
                _insertStdModSection: function(a, b, c) {
                    var d = a.get("firstChild");
                    b === m || !d ? a.appendChild(c) : b === q ? a.insertBefore(c, d) : (b = this[m + "Node"]) ? a.insertBefore(c, b) : a.appendChild(c)
                },
                _getStdModTemplate: function(c) {
                    return a.create(b.TEMPLATES[c], this._stdModNode.get("ownerDocument"))
                },
                _addStdModContent: function(a, c, d) {
                    switch (d) {
                        case b.BEFORE:
                            d = 0;
                            break;
                        case b.AFTER:
                            d = void 0;
                            break;
                        default:
                            d = b.REPLACE
                    }
                    a.insert(c, d)
                },
                _getPreciseHeight: function(a) {
                    var b =
                        a ? a.get("offsetHeight") : 0;
                    a && a.hasMethod("getBoundingClientRect") && (a = a.invoke("getBoundingClientRect")) && (b = a.bottom - a.top);
                    return b
                },
                _findStdModSection: function(a) {
                    return this.get("contentBox").one("> ." + b.SECTION_CLASS_NAMES[a])
                },
                _parseStdModHTML: function(a) {
                    var b = this._findStdModSection(a);
                    return b ? (this._stdModParsed || (this._stdModParsed = {}, c.before(this._applyStdModParsedConfig, this, "_applyParsedConfig")), this._stdModParsed[a + "Content"] = 1, b.get("innerHTML")) : null
                },
                _applyStdModParsedConfig: function(a,
                    b, c) {
                    if (a = this._stdModParsed) a[s] = !(s in b) && s in a, a[n] = !(n in b) && n in a, a[p] = !(p in b) && p in a
                },
                _getStdModContent: function(a) {
                    return this[a + "Node"] ? this[a + "Node"].get("childNodes") : null
                },
                setStdModContent: function(a, b, c) {
                    this.set(a + "Content", b, {
                        stdModPosition: c
                    })
                },
                getStdModNode: function(a, b) {
                    var c = this[a + "Node"] || null;
                    !c && b && (c = this._renderStdMod(a));
                    return c
                },
                fillHeight: function(a) {
                    if (a) {
                        var b = this.get("contentBox"),
                            c = [this.headerNode, this.bodyNode, this.footerNode],
                            d, e = 0;
                        d = 0;
                        for (var f = !1, q = 0, r =
                                c.length; q < r; q++)(d = c[q]) && (d !== a ? e += this._getPreciseHeight(d) : f = !0);
                        f && ((h.ie || h.opera) && a.set("offsetHeight", 0), b = b.get("offsetHeight") - parseInt(b.getComputedStyle("paddingTop"), 10) - parseInt(b.getComputedStyle("paddingBottom"), 10) - parseInt(b.getComputedStyle("borderBottomWidth"), 10) - parseInt(b.getComputedStyle("borderTopWidth"), 10), g.isNumber(b) && (d = b - e, 0 <= d && a.set("offsetHeight", d)))
                    }
                }
            };
            c.WidgetStdMod = b
        }, "3.17.2", {
            requires: ["base-build", "widget"]
        })
    },
    1710: function(k, l) {
        YUI.add("squarespace-basic-check",
            function(c) {
                var f = function(b) {
                    return function(a) {
                        a.halt();
                        b.call(this, a)
                    }
                };
                c.namespace("Squarespace.Widgets");
                var b = c.Squarespace.Widgets.BasicCheck = c.Base.create("basicCheck", c.Squarespace.Widgets.DataWidget, [], {
                    bindUI: function() {
                        b.superclass.bindUI.call(this);
                        this.get("boundingBox").on("click", f(this._toggleActive), this)
                    },
                    renderUI: function() {
                        var b = this.get("contentBox");
                        c.Lang.isValue(this.get("title")) && b.append('<div class="title">' + this.get("title") + "</div>");
                        var a = c.Node.create('<div class="check-element"></div>');
                        b.append(a);
                        c.Lang.isValue(this.get("label")) && a.append('<div class="label">' + this.get("label") + "</div>")
                    },
                    syncUI: function() {
                        b.superclass.syncUI.call(this);
                        this.get("contentBox").one(".check-element").toggleClass("active", this.get("data"))
                    },
                    _toggleActive: function() {
                        this.set("data", !this.get("data"))
                    }
                }, {
                    CSS_PREFIX: "sqs-basic-check",
                    ATTRS: {
                        data: {
                            value: !1,
                            validator: c.Lang.isBoolean
                        },
                        name: {
                            value: null
                        },
                        title: {
                            value: null
                        },
                        label: {
                            value: null
                        }
                    }
                })
            }, "1.0", {
                requires: ["base", "squarespace-dialog-check-template",
                    "squarespace-widgets-data-widget"
                ]
            })
    },
    1748: function(k, l, c) {
        var f = c(1),
            b = c(488),
            g = c(173);
        YUI.add("squarespace-localities", function(a) {
            var c = {
                "": {
                    title: f("Not Specified"),
                    empty: !0
                }
            };
            a.namespace("Squarespace");
            a.Squarespace.Localities = {
                COUNTRY_OPTIONS: a.merge(c, g(b, function(a) {
                    return {
                        title: a
                    }
                })),
                STATE_OPTIONS: {
                    AL: {
                        title: f("Alabama")
                    },
                    AK: {
                        title: f("Alaska")
                    },
                    AZ: {
                        title: f("Arizona")
                    },
                    AR: {
                        title: f("Arkansas")
                    },
                    CA: {
                        title: f("California")
                    },
                    CO: {
                        title: f("Colorado")
                    },
                    CT: {
                        title: f("Connecticut")
                    },
                    DE: {
                        title: f("Delaware")
                    },
                    FL: {
                        title: f("Florida")
                    },
                    GA: {
                        title: f("Georgia")
                    },
                    HI: {
                        title: f("Hawaii")
                    },
                    ID: {
                        title: f("Idaho")
                    },
                    IL: {
                        title: f("Illinois")
                    },
                    IN: {
                        title: f("Indiana")
                    },
                    IA: {
                        title: f("Iowa")
                    },
                    KS: {
                        title: f("Kansas")
                    },
                    KY: {
                        title: f("Kentucky")
                    },
                    LA: {
                        title: f("Louisiana")
                    },
                    ME: {
                        title: f("Maine")
                    },
                    MD: {
                        title: f("Maryland")
                    },
                    MA: {
                        title: f("Massachusetts")
                    },
                    MI: {
                        title: f("Michigan")
                    },
                    MN: {
                        title: f("Minnesota")
                    },
                    MS: {
                        title: f("Mississippi")
                    },
                    MO: {
                        title: f("Missouri")
                    },
                    MT: {
                        title: f("Montana")
                    },
                    NE: {
                        title: f("Nebraska")
                    },
                    NV: {
                        title: f("Nevada")
                    },
                    NH: {
                        title: f("New Hampshire")
                    },
                    NJ: {
                        title: f("New Jersey")
                    },
                    NM: {
                        title: f("New Mexico")
                    },
                    NY: {
                        title: f("New York")
                    },
                    NC: {
                        title: f("North Carolina")
                    },
                    ND: {
                        title: f("North Dakota")
                    },
                    OH: {
                        title: f("Ohio")
                    },
                    OK: {
                        title: f("Oklahoma")
                    },
                    OR: {
                        title: f("Oregon")
                    },
                    PA: {
                        title: f("Pennsylvania")
                    },
                    RI: {
                        title: f("Rhode Island")
                    },
                    SC: {
                        title: f("South Carolina")
                    },
                    SD: {
                        title: f("South Dakota")
                    },
                    TN: {
                        title: f("Tennessee")
                    },
                    TX: {
                        title: f("Texas")
                    },
                    UT: {
                        title: f("Utah")
                    },
                    VT: {
                        title: f("Vermont")
                    },
                    VA: {
                        title: f("Virginia")
                    },
                    WA: {
                        title: f("Washington")
                    },
                    DC: {
                        title: f("Washington, District of Columbia")
                    },
                    WV: {
                        title: f("West Virginia")
                    },
                    WI: {
                        title: f("Wisconsin")
                    },
                    WY: {
                        title: f("Wyoming")
                    },
                    AA: {
                        title: f("Armed Forces Europe")
                    },
                    AE: {
                        title: f("Armed Forces Americas")
                    },
                    AP: {
                        title: f("Armed Forces Pacific")
                    }
                }
            };
            a.Squarespace.Localities.COUNTRIES_TO_STATES = {
                US: a.Squarespace.Localities.STATE_OPTIONS,
                CA: {
                    ON: {
                        title: f("Ontario")
                    },
                    QC: {
                        title: f("Quebec")
                    },
                    NS: {
                        title: f("Nova Scotia")
                    },
                    NB: {
                        title: f("New Brunswick")
                    },
                    MB: {
                        title: f("Manitoba")
                    },
                    BC: {
                        title: f("British Columbia")
                    },
                    PE: {
                        title: f("Prince Edward Island")
                    },
                    SK: {
                        title: f("Saskatchewan")
                    },
                    AB: {
                        title: f("Alberta")
                    },
                    NL: {
                        title: f("Newfoundland and Labrador")
                    },
                    NT: {
                        title: f("Northwest Territories")
                    },
                    YT: {
                        title: f("Yukon")
                    },
                    NU: {
                        title: f("Nunavut")
                    }
                }
            };
            a.Squarespace.Localities.countryCodeFromName = function(b) {
                for (var c in a.Squarespace.Localities.COUNTRY_OPTIONS)
                    if (a.Squarespace.Localities.COUNTRY_OPTIONS[c].title === b) return c
            };
            var d = function(b) {
                    return a.Array.reduce(a.Object.keys(b).sort(), [], function(a, c) {
                        a.push({
                            label: b[c].title,
                            value: c
                        });
                        return a
                    })
                },
                e = function(a) {
                    return a.sort(function(a, b) {
                        return a.label <
                            b.label ? -1 : 1
                    })
                };
            a.Squarespace.Localities.getAllCountryNames = function() {
                var b = [];
                a.Object.each(a.Squarespace.Localities.COUNTRY_OPTIONS, function(a) {
                    a.empty || b.push(a.title)
                });
                return b
            };
            a.Squarespace.Localities.getNewCountryOptions = function() {
                return e(d(a.Squarespace.Localities.COUNTRY_OPTIONS))
            };
            a.Squarespace.Localities.getNewStateOptionsForCountry = function(b) {
                return e(d(a.Squarespace.Localities.COUNTRIES_TO_STATES[b]))
            };
            a.Squarespace.Localities.getAmericentricSortedCountryOptions = function() {
                var b =
                    a.Array.filter(a.Squarespace.Localities.getNewCountryOptions(), function(a) {
                        return "" !== a.value
                    });
                b.sort(function(a, b) {
                    return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
                });
                return b
            }
        }, "1.0", {
            requires: []
        })
    },
    1752: function(k, l, c) {
        var f = c(1265);
        YUI.add("squarespace-mixins-google-places-autocomplete", function(b) {
                b.namespace("Squarespace.Mixins");
                var c = {
                        POSTAL_CODE: "postal_code",
                        COUNTRY: "country",
                        LOCALITY: "locality",
                        ROUTE: "route",
                        STREET_NUMBER: "street_number",
                        STREET_ADDRESS: "street_address",
                        ADMIN_LEVEL_1: "administrative_area_level_1",
                        SUBLOCALITY: "sublocality",
                        POSTAL_TOWN: "postal_town",
                        NEIGHBORHOOD: "neighborhood"
                    },
                    a = b.Object.values(c),
                    h = b.Squarespace.Localities.COUNTRY_OPTIONS,
                    d = ["geocode"];
                b.Squarespace.Mixins.GooglePlacesAutocomplete = b.Base.create("GooglePlacesAutocomplete", b.Base, [], {
                    initializer: function() {
                        this.publish("placeDetails");
                        b.Do.after(this._afterRenderUI, this, "renderUI", this);
                        b.Do.after(this._afterBindUI, this, "bindUI", this);
                        this.after("render", this._enableBrowserAutoComplete, this);
                        this.setAttrs({
                            source: b.bind(this._accessAutocompleteService,
                                this),
                            enableCache: !1,
                            resultTextLocator: "description",
                            resultFilters: this._filterResults,
                            resultFormatter: this._formatResults,
                            minQueryLength: 3
                        })
                    },
                    _afterRenderUI: function() {
                        var a = this.get("contentBox");
                        a.addClass("sqs-google-places-autocomplete-mixin");
                        a.one(".sqs-scroll-ac-scroll-container").append('<div class="google-required-elements"><div class="google-attributions"></div><div class="powered-by-google"></div></div>')
                    },
                    _afterBindUI: function() {
                        this.before("select", this._getDetailsForPrediction, this);
                        this.on("placeDetails", this._fillWithAddressLine1, this);
                        this._inputNode.on("focus", function() {
                            this._inputNode.setAttribute("autocomplete", "off");
                            this._inputIsFocused = !0
                        }, this);
                        this._inputNode.on("blur", function() {
                            this._inputNode.setAttribute("autocomplete", "on");
                            this._inputIsFocused = !1
                        }, this)
                    },
                    _enableBrowserAutoComplete: function() {
                        this._inputNode.setAttribute("autocomplete", "on")
                    },
                    _getDetailsForPrediction: function(a) {
                        a.halt();
                        var c = a.result.raw;
                        this._accessPlaceDetailsService(c, function(a, d) {
                            if (d ===
                                b.config.win.google.maps.places.PlacesServiceStatus.OK) {
                                var e = this._extractPlaceComponents(a),
                                    e = this._buildLocationPayload(e, c);
                                this.fire("placeDetails", {
                                    place: e
                                })
                            } else console.warn("Error communicating with Google Places API")
                        })
                    },
                    _extractPlaceComponents: function(d) {
                        return b.Array.reduce(d.address_components, {}, function(d, e) {
                            var f = b.Array.find(e.types, function(c) {
                                return -1 !== b.Array.indexOf(a, c)
                            });
                            d[f] = f ? f === c.ADMIN_LEVEL_1 ? e.short_name : f === c.COUNTRY ? h[e.short_name].title : e.long_name : "";
                            return d
                        })
                    },
                    _buildLocationPayload: function(a, d) {
                        var h = b.Object.getValue(a, "street_number") || "",
                            f = b.Object.getValue(a, "route") || "",
                            s = b.Object.getValue(a, "country") || "",
                            p = b.Object.getValue(a, "locality") || "",
                            n = b.Object.getValue(a, "sublocality") || "",
                            k = b.Object.getValue(a, "neighborhood") || "",
                            n = [b.Object.getValue(a, "postal_town") || "", p, n, k],
                            p = b.Array.find(n, function(a) {
                                return b.Array.find(d.terms, function(b) {
                                    return b.value === a
                                })
                            }) || p,
                            h = this._getPreferredStreetNumber(f, h),
                            n = b.Object.getValue(a, c.ADMIN_LEVEL_1) || "",
                            k = b.Object.getValue(a, c.POSTAL_CODE) || "",
                            u = b.Array.filter([p, n, k], function(a) {
                                return !!a
                            }).join(", ").trim();
                        return {
                            address: (h + " " + f).trim(),
                            country: s,
                            city: p,
                            state: n,
                            zip: k,
                            fullLocality: u
                        }
                    },
                    _getPreferredStreetNumber: function(a, b) {
                        var c = this.get("query"),
                            d = a.split(" ")[0],
                            d = c.toLowerCase().indexOf(d.toLowerCase()),
                            c = c.substring(0, d).trim();
                        return c.length > b.length ? c : b
                    },
                    _accessAutocompleteService: function(a, c) {
                        this._autocompleteService ? this._performAutoComplete(a, c) : f().then(b.bind(function(b) {
                            this._initAutocompleteService(b);
                            this._performAutoComplete(a, c)
                        }, this))
                    },
                    _initAutocompleteService: function(a) {
                        this._autocompleteService = new a.places.AutocompleteService
                    },
                    _performAutoComplete: function(a, c) {
                        var g = {
                                input: a,
                                types: d
                            },
                            h = b.bind(function() {
                                this._inputIsFocused && c.apply(this, arguments)
                            }, this);
                        this._autocompleteService.getPlacePredictions(g, h)
                    },
                    _accessPlaceDetailsService: function(a, c) {
                        this._placeDetailsService ? this._getPlaceDetails(a, c) : f().then(b.bind(function(b) {
                                this._initPlaceDetailsService(b);
                                this._getPlaceDetails(a, c)
                            },
                            this))
                    },
                    _initPlaceDetailsService: function(a) {
                        this._placeDetailsService = new a.places.PlacesService(this.get("contentBox").one(".google-attributions"))
                    },
                    _getPlaceDetails: function(a, c) {
                        this._placeDetailsService.getDetails(a, b.bind(c, this))
                    },
                    _formatResults: function(a, c) {
                        return b.Array.map(c, function(a) {
                            var c = a.raw.terms,
                                d = a.raw.matched_substrings,
                                e = -1 !== b.Array.indexOf(a.raw.types, "street_address"),
                                g = c[0].offset + c[0].value.length,
                                c = c[1].offset + c[1].value.length,
                                h = e ? c : g;
                            return b.Array.map(a.text.split(""),
                                function(b, c) {
                                    var e = ["google-ac-character"];
                                    this._indexWithinMatchedSubstring(c, d) && e.push("google-ac-matched-character");
                                    e = '<span class="' + e.join(" ").trim() + '">' + b + "</span>";
                                    return 0 === c ? '<div class="google-ac-address">' + e : c === h ? e + "</div>" : c === h + 1 ? '<div class="google-ac-trailing">' + e : c === a.text.length ? e + "</div>" : e
                                }, this).join("")
                        }, this)
                    },
                    _indexWithinMatchedSubstring: function(a, c) {
                        return b.Array.some(c, function(b) {
                            return a >= b.offset && a < b.offset + b.length
                        })
                    },
                    _filterResults: function(a, c) {
                        return b.Array.filter(c,
                            function(a) {
                                return this._predictionHasRouteComponent(a.raw) && this._predictionContainsCountryInList(a.raw)
                            }, this)
                    },
                    _predictionContainsCountryInList: function(a) {
                        var c = this.get("countriesAllowed");
                        return !b.Lang.isArray(c) || 0 === c.length ? !0 : b.Array.find(c, function(b) {
                            return -1 !== a.description.indexOf(b)
                        })
                    },
                    _predictionHasRouteComponent: function(a) {
                        return -1 !== b.Array.indexOf(a.types, c.ROUTE) || -1 !== b.Array.indexOf(a.types, c.STREET_ADDRESS)
                    }
                }, {
                    ATTRS: {
                        countriesAllowed: {
                            validator: b.Squarespace.AttrValidators.isNullOrArray
                        }
                    }
                })
            },
            "1.0", {
                requires: "autocomplete-highlighters base event-custom squarespace-attr-validators squarespace-localities squarespace-util".split(" ")
            })
    },
    1776: function(k, l) {
        YUI.add("squarespace-plugin-money-formatter", function(c) {
            c.namespace("Squarespace.Plugin");
            c.Squarespace.Plugin.MoneyFormatter = c.Base.create("moneyFormatter", c.Squarespace.Plugin.NumericFormatter, [], {
                _transformToData: function(c) {
                    return Number(this.convertToCents(c))
                },
                convertToCents: function(c) {
                    c = String(c).replace(/[^\d\.]/g, "");
                    if ("" ===
                        c) return 0;
                    c = c.split(".");
                    var b = c[0];
                    1 < c.length && (b += "." + c[1].substr(0, 2));
                    return Math.round(100 * parseFloat(b, 10))
                }
            }, {
                NS: "moneyFormatterPlugin",
                ATTRS: {
                    prefixUnit: {
                        valueFn: function() {
                            return c.Squarespace.Commerce.currencySymbol()
                        }
                    },
                    displayFormatter: {
                        value: c.Squarespace.Commerce.moneyFormat
                    }
                }
            })
        }, "1.0", {
            requires: ["plugin", "squarespace-commerce-utils", "squarespace-plugin-numeric-formatter", "squarespace-util"]
        })
    },
    1777: function(k, l) {
        YUI.add("squarespace-plugin-pulsewarn", function(c) {
            c.namespace("Squarespace.Plugin");
            c.Squarespace.Plugin.PulseWarn = c.Base.create("pulseWarn", c.Plugin.Base, [], {
                initializer: function(f) {
                    this.config = f;
                    this.set("color", f.color);
                    this.set("useClass", f.useClass);
                    this.set("targetClass", f.targetClass);
                    this.set("iterations", f.iterations);
                    this.get("host").addClass("pulse-warnable");
                    c.Lang.isUndefined(f.interval) || this.set("interval", f.interval);
                    this._timer = null
                },
                destructor: function() {
                    this._timer && (this._timer.cancel(), this._timer = null)
                },
                warn: function() {
                    var f = this.get("host"),
                        b = this.get("iterations"),
                        g = f.getStyle("backgroundColor"),
                        a = this.get("color");
                    c.Lang.isNull(this._timer) || (this._timer.cancel(), this._timer = null);
                    if (this.get("useClass")) {
                        var h = this.get("targetClass"),
                            g = this.get("interval");
                        this.fire("start");
                        f.addClass(h);
                        this._timer = c.later(g, this, function() {
                            0 === b ? (f.removeClass(h), this.fire("stop"), this._timer.cancel(), this._timer = null) : (f.hasClass(h) ? f.removeClass(h) : f.addClass(h), b--)
                        }, {}, !0)
                    } else {
                        var d = new c.Anim({
                                node: f,
                                to: {
                                    backgroundColor: a,
                                    opacity: 0.8
                                },
                                easing: this.get("easingUp"),
                                duration: this.get("duration")
                            }),
                            e = new c.Anim({
                                node: f,
                                to: {
                                    backgroundColor: g,
                                    opacity: 1
                                },
                                easing: this.get("easingDown"),
                                duration: this.get("duration")
                            });
                        d.on("end", function() {
                            0 < b && e.run();
                            b--
                        });
                        e.on("end", function() {
                            0 < b ? d.run() : this.fire("stop")
                        }, this);
                        this.fire("start");
                        d.run()
                    }
                }
            }, {
                NS: "pulseWarn",
                ATTRS: {
                    useClass: {
                        value: !1
                    },
                    iterations: {
                        value: 3
                    },
                    color: {
                        value: "#c1b12e"
                    },
                    interval: {
                        value: 2E3
                    },
                    duration: {
                        value: 0.7
                    },
                    easingUp: {
                        value: c.Easing.easeInSine
                    },
                    easingDown: {
                        value: c.Easing.easeOutSine
                    }
                }
            })
        }, "1.0", {
            requires: ["anim",
                "base", "plugin"
            ]
        })
    },
    1780: function(k, l) {
        YUI.add("squarespace-scrolling-auto-complete-list", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.ScrollingAutoCompleteList = c.Base.create("ScrollingAutoCompleteList", c.AutoCompleteList, [], {
                initializer: function() {
                    this.publish("keyboardContinue");
                    this.publish("listMouseUp");
                    this.publish("listMouseDown")
                },
                renderUI: function() {
                    f.superclass.renderUI.call(this);
                    var b = this._scrollNode = c.Node.create('<div class="' + this.getClassName() + '-scroll-container"></div>');
                    this.get("listNode").wrap(b);
                    b.hide();
                    (b = this.get("className")) && this.get("contentBox").addClass(b)
                },
                bindUI: function() {
                    f.superclass.bindUI.call(this);
                    var b = this._scrollNode,
                        c = this.get("inputNode");
                    this.after("activeItemChange", function(a) {
                        a.newVal && this._scrollToActiveItem()
                    }, this);
                    this.on("results", function(a) {
                        0 < a.results.length ? b.show() : b.hide()
                    }, this);
                    this.on(["select", "clear"], function() {
                        b.hide()
                    });
                    this.get("boundingBox").on(["focusoutside", "clickoutside"], function(a) {
                        b.hide()
                    });
                    c.on("keydown",
                        function(a) {
                            switch (a.keyCode) {
                                case 13:
                                    this.selectItem();
                                    this.fire("keyboardContinue");
                                    break;
                                case 9:
                                    this.get("activeItem") && (this.selectItem(), this.fire("keyboardContinue"));
                                    break;
                                case 27:
                                    this.hide();
                                    break;
                                case 38:
                                    this._activatePrevItem();
                                    break;
                                case 40:
                                    this._activateNextItem()
                            }
                        }, this);
                    this._listNode.delegate("mouseup", function(a) {
                        this.fire("listMouseUp");
                        a.preventDefault()
                    }, this._SELECTOR_ITEM, this);
                    this._listNode.delegate("mousedown", function(a) {
                        this.fire("listMouseDown")
                    }, this._SELECTOR_ITEM, this)
                },
                _activateNextItem: function() {
                    f.superclass._activateNextItem.call(this);
                    c.Lang.isNull(this.get("activeItem")) && this.set("activeItem", this._getFirstItemNode())
                },
                _activatePrevItem: function() {
                    f.superclass._activatePrevItem.call(this);
                    c.Lang.isNull(this.get("activeItem")) && this.set("activeItem", this._getLastItemNode())
                },
                _scrollToActiveItem: function() {
                    this.get("activeItem").scrollIntoView();
                    var b = this._scrollNode,
                        c = b.get("scrollTop"),
                        a = b.one("li:first-child").get("offsetHeight");
                    b.set("scrollTop", a * Math.round(c /
                        a))
                }
            }, {
                CSS_PREFIX: "sqs-scroll-ac",
                ATTRS: {
                    className: {
                        validator: c.Squarespace.AttrValidators.isNullOrString
                    }
                }
            })
        }, "1.0", {
            requires: ["autocomplete", "base", "event-outside", "lang/autocomplete-list", "squarespace-attr-validators"]
        })
    },
    1792: function(k, l) {
        YUI.add("squarespace-widgets-data-widget", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.DataWidget = c.Base.create("dataWidget", c.Squarespace.Widgets.SSWidget, [], {
                initializer: function(b) {
                    b.dataState || (this.getProperty("ASYNC_DATA") ?
                        this.set("dataState", this.getProperty("DATA_STATES").INITIALIZED) : this.set("dataState", this.getProperty("DATA_STATES").LOADED))
                },
                renderUI: function() {
                    f.superclass.renderUI.call(this);
                    this._updateDataStateClassName()
                },
                bindUI: function() {
                    f.superclass.bindUI.call(this);
                    var b = this.get("id");
                    this.after(b + "|dataChange", function(b) {
                        b.noSyncUI || this.syncUI()
                    }, this);
                    this.after(b + "|dataStateChange", this._updateDataStateClassName, this)
                },
                _updateDataStateClassName: function() {
                    var b = this.get("boundingBox"),
                        g = this.get("dataState");
                    c.Object.each(this.getProperty("DATA_STATES"), function(a) {
                        b.removeClass("data-state-" + a)
                    });
                    b.addClass("data-state-" + g)
                },
                setLoadingState: function() {
                    return this.set("dataState", this.getProperty("DATA_STATES").LOADING)
                },
                setLoadedState: function() {
                    return this.set("dataState", this.getProperty("DATA_STATES").LOADED)
                },
                setLoadFailedState: function() {
                    return this.set("dataState", this.getProperty("DATA_STATES").LOAD_FAILED)
                },
                loadedSuccessfully: function() {
                    return this.get("dataState") === this.getProperty("DATA_STATES").LOADED
                },
                isLoading: function() {
                    return this.get("dataState") === this.getProperty("DATA_STATES").LOADING
                },
                loadFailed: function() {
                    return this.get("dataState") === this.getProperty("DATA_STATES").LOAD_FAILED
                }
            }, {
                CSS_PREFIX: "sqs-data-widget",
                ASYNC_DATA: !1,
                DATA_STATES: {
                    INITIALIZED: "initialized",
                    LOADING: "loading",
                    LOADED: "loaded",
                    LOAD_FAILED: "load-failed"
                },
                ATTRS: {
                    data: {
                        value: null,
                        validator: function(b) {
                            return c.Lang.isUndefined(b) ? (console.warn(this.name + ": Will not set data to undefined."), !1) : !0
                        }
                    },
                    dataState: {
                        valueFn: function() {
                            return this.getProperty("DATA_STATES").INITIALIZED
                        }
                    },
                    preventRenderTemplate: {
                        value: !1,
                        validator: c.Squarespace.AttrValidators.isBoolean
                    }
                }
            })
        }, "1.0", {
            requires: ["base", "node", "squarespace-attr-validators", "squarespace-ss-widget", "widget"]
        })
    },
    1793: function(k, l) {
        YUI.add("squarespace-widgets-google-places-autocomplete", function(c) {
                c.namespace("Squarespace.Widgets");
                c.Squarespace.Widgets.GooglePlacesAutocomplete = c.Base.create("GooglePlacesAutoCompleteWidget", c.Squarespace.Widgets.ScrollingAutoCompleteList, [c.Squarespace.Mixins.GooglePlacesAutocomplete], {}, {
                    CSS_PREFIX: c.Squarespace.Widgets.ScrollingAutoCompleteList.CSS_PREFIX
                })
            },
            "1.0", {
                requires: ["base", "squarespace-mixins-google-places-autocomplete", "squarespace-scrolling-auto-complete-list"]
            })
    },
    1798: function(k, l) {
        YUI.add("autocomplete-highlighters", function(c, f) {
            var b = c.Array,
                g = c.Highlight,
                a = c.mix(c.namespace("AutoCompleteHighlighters"), {
                    charMatch: function(a, c, e) {
                        var f = b.unique((e ? a : a.toLowerCase()).split(""));
                        return b.map(c, function(a) {
                            return g.all(a.text, f, {
                                caseSensitive: e
                            })
                        })
                    },
                    charMatchCase: function(b, c) {
                        return a.charMatch(b, c, !0)
                    },
                    phraseMatch: function(a, c, e) {
                        return b.map(c,
                            function(b) {
                                return g.all(b.text, [a], {
                                    caseSensitive: e
                                })
                            })
                    },
                    phraseMatchCase: function(b, c) {
                        return a.phraseMatch(b, c, !0)
                    },
                    startsWith: function(a, c, e) {
                        return b.map(c, function(b) {
                            return g.all(b.text, [a], {
                                caseSensitive: e,
                                startsWith: !0
                            })
                        })
                    },
                    startsWithCase: function(b, c) {
                        return a.startsWith(b, c, !0)
                    },
                    subWordMatch: function(a, d, e) {
                        var f = c.Text.WordBreak.getUniqueWords(a, {
                            ignoreCase: !e
                        });
                        return b.map(d, function(a) {
                            return g.all(a.text, f, {
                                caseSensitive: e
                            })
                        })
                    },
                    subWordMatchCase: function(b, c) {
                        return a.subWordMatch(b,
                            c, !0)
                    },
                    wordMatch: function(a, c, e) {
                        return b.map(c, function(b) {
                            return g.words(b.text, a, {
                                caseSensitive: e
                            })
                        })
                    },
                    wordMatchCase: function(b, c) {
                        return a.wordMatch(b, c, !0)
                    }
                })
        }, "3.17.2", {
            requires: ["array-extras", "highlight-base"]
        })
    },
    1799: function(k, l) {
        YUI.add("lang/autocomplete-list", function(c) {
            c.Intl.add("autocomplete-list", "", {
                item_selected: "{item} selected.",
                items_available: "Suggestions are available. Use the up and down arrow keys to select suggestions."
            })
        }, "3.17.2")
    },
    2342: function(k, l, c) {
        var f = c(271);
        YUI.add("squarespace-cart-utils",
            function(b) {
                var c, a, h;
                b.namespace("Squarespace.CartUtils");
                b.Squarespace.CartUtils = {
                    initializeAddToCartButtons: function() {
                        var a = b.Squarespace.Commerce.isExpressCheckout(),
                            e = !1;
                        b.all(".sqs-add-to-cart-button").each(function(c) {
                            var g = c.one(".sqs-add-to-cart-button-inner");
                            g.plug(b.Squarespace.Animations.Scalable, {
                                duration: 0.2
                            });
                            a && "Add To Cart" === c.getData("original-label") && (g.setContent("Purchase"), c.setData("original-label", "Purchase"));
                            c.hasClass("use-form") && (e = !0)
                        }, this);
                        e && !h && b.Squarespace.CartUtils._getAdditionalFieldsFormTemplateSchema(function(a) {
                            h =
                                a
                        }, this);
                        c || (c = b.one("body").delegate("click", b.Squarespace.CartUtils._addCartEntry, ".sqs-add-to-cart-button", this))
                    },
                    _addCartEntry: function(a) {
                        var c = a.currentTarget;
                        if (!c.get("parentNode").hasClass("cart-added")) {
                            var g = function(a) {
                                new b.Squarespace.Widgets.Alert({
                                    "strings.title": "Unable to " + (b.Squarespace.Commerce.isExpressCheckout() ? "Purchase" : "Add") + " Item",
                                    "strings.message": a
                                })
                            };
                            a = function(a) {
                                var b = "Please select the ",
                                    c = a.length;
                                if (1 == c) b += a[0] + " option.";
                                else if (2 == c) b += a[0] + " and " + a[1] + " options.";
                                else
                                    for (var d = 0; d < c; d++) b = d == c - 1 ? b + ("and " + a[d] + " options.") : b + (a[d] + ", ");
                                return b
                            };
                            var h = c.getAttribute("data-item-id"),
                                f, s, p = b.one(c.get("parentNode").siblings(".product-variants").item(0));
                            if (b.Lang.isValue(p)) {
                                var n = JSON.parse(p.getAttribute("data-unselected-options")),
                                    k = n.length,
                                    u = p.getAttribute("data-selected-variant"),
                                    p = p.getAttribute("data-variant-in-stock"),
                                    u = u ? JSON.parse(u) : null,
                                    p = p ? !0 : !1;
                                if (0 < k) {
                                    g(a(n));
                                    return
                                }
                                if (u)
                                    if (p) f = u;
                                    else {
                                        g("Sorry, we do not have enough of that item available.");
                                        return
                                    }
                                else {
                                    g("Sorry, that item variant is unavailable. Please select another variant.");
                                    return
                                }
                            }
                            if (a = c.get("parentNode").siblings(".product-quantity-input").item(0))
                                if (s = b.one(a).one("input").get("value"), !b.Lang.isNumber(Number(s))) {
                                    g("Quantity must be a number.");
                                    return
                                }
                            c.hasClass("use-form") ? this._verifyItemInStock({
                                itemId: h,
                                variant: f,
                                inStockCb: b.bind(function() {
                                        b.Squarespace.CartUtils._openAdditionalFieldsForm(c, function(a) {
                                            b.Squarespace.CartUtils._goToCheckoutOrAddToCart(c, h, f, s, a, g)
                                        }, this)
                                    },
                                    this),
                                outOfStockCb: function() {
                                    g("Sorry, we do not have enough of that item available.")
                                }
                            }) : b.Squarespace.CartUtils._goToCheckoutOrAddToCart(c, h, f, s, null, g)
                        }
                    },
                    _verifyItemInStock: function(a) {
                        var c = b.Squarespace.Singletons.ShoppingCart;
                        b.Data.get({
                            url: b.Squarespace.API_ROOT + "commerce/inventory/stock/",
                            data: {
                                itemId: a.itemId
                            },
                            success: function(g) {
                                b.Array.some(g.results, function(b) {
                                    return b.unlimited ? !0 : b.qtyInStock > c.totalForItem(a.itemId, a.variant)
                                }) ? a.inStockCb() : a.outOfStockCb()
                            }
                        })
                    },
                    _goToCheckoutOrAddToCart: function(a,
                        c, g, h, f, s) {
                        b.Squarespace.CartUtils._setButtonStateAdding(a);
                        if (b.Lang.isValue(h) && 0 !== h % 1) s("Quantity must be a whole number"), b.Squarespace.CartUtils._setButtonStateIdle(a);
                        else {
                            var p = b.Squarespace.Commerce.isExpressCheckout();
                            b.Squarespace.Singletons.ShoppingCart.addEntry(c, g, h, f, p, function(c) {
                                a.one(".sqs-add-to-cart-button-inner");
                                c ? (s(c), b.later(1E3, this, function() {
                                        b.Squarespace.CartUtils._setButtonStateIdle(a)
                                    })) : b.Squarespace.Commerce.isExpressCheckout() ? b.Squarespace.Commerce.goToCheckoutPage() :
                                    b.later(1E3, this, function() {
                                        b.Lang.isNull(a._node) || (b.Squarespace.CartUtils._setButtonStateAdded(a), b.later(2E3, this, function() {
                                            b.Squarespace.CartUtils._setButtonStateIdle(a)
                                        }))
                                    })
                            }, this)
                        }
                    },
                    _setButtonStateAdding: function(a) {
                        var c = a.one(".sqs-add-to-cart-button-inner");
                        c.once("hidden", function() {
                            c.empty();
                            a.addClass("cart-adding");
                            (new b.Squarespace.Spinner({
                                size: 20,
                                color: "light",
                                render: c
                            })).spin();
                            c.append('<div class="status-text">Adding...</div>');
                            c.show()
                        }, this);
                        c.hide()
                    },
                    _setButtonStateAdded: function(a) {
                        var b =
                            a.one(".sqs-add-to-cart-button-inner");
                        b.empty();
                        a.addClass("cart-added");
                        b.append('<div class="status-text">Added!</div>')
                    },
                    _setButtonStateIdle: function(a) {
                        var b = a.one(".sqs-add-to-cart-button-inner");
                        b.once("hidden", function() {
                            b.empty();
                            a.removeClass("cart-adding");
                            a.removeClass("cart-added");
                            b.setContent(a.getData("original-label"));
                            b.show()
                        }, this);
                        b.hide()
                    },
                    _openAdditionalFieldsForm: function(c, e, g) {
                        a || (a = new b.Squarespace.Widgets.ModalLightbox({
                            render: b.one("body")
                        }));
                        var f = b.JSON.parse(c.getData("form")),
                            m = new b.Squarespace.Widgets.AsyncForm({
                                form: f,
                                formTemplate: h,
                                formSubmitButtonText: c.getData("original-label"),
                                formName: f.name,
                                showTitle: !0
                            });
                        m.on("submission", function(b) {
                            e && e.call(g || this, b.data);
                            a.close()
                        }, this);
                        a.set("content", m);
                        a.once("close", function() {
                            m.destroy()
                        }, this);
                        a.open()
                    },
                    _getAdditionalFieldsFormTemplateSchema: function(a, c) {
                        b.Data.get({
                            url: "/api/template/GetTemplateSchema",
                            data: {
                                componentType: "widget",
                                type: f.FORM
                            },
                            success: function(b) {
                                a.call(c || this, b)
                            }
                        }, this)
                    }
                }
            }, "1.0", {
                requires: "base json node squarespace-animations squarespace-async-form squarespace-commerce-utils squarespace-modal-lightbox squarespace-models-shopping-cart squarespace-spinner squarespace-widgets-alert".split(" ")
            })
    },
    2343: function(k, l, c) {
        c(131);
        var f = c(92);
        YUI.add("squarespace-commerce-analytics", function(b) {
            var c = new b.Base.create("commerceTrack", b.Base, [], {
                _reportSafelyForCart: function(a, b) {
                    null != b ? this._reportSafely(a, {
                        cartId: b.get("id"),
                        websiteId: b.get("websiteId")
                    }) : this._reportSafely(a)
                },
                _reportSafely: function(a, c) {
                    try {
                        b.Squarespace.Analytics.trackInternal(a, c)
                    } catch (d) {
                        console.error(d)
                    }
                },
                itemViewed: function(a) {
                    this.fire("commerce-item-viewed", a)
                },
                itemAdded: function(a) {
                    this.fire("commerce-item-added", a)
                },
                itemRemoved: function(a) {
                    this.fire("commerce-item-removed", a)
                },
                itemModified: function(a) {
                    this.fire("commerce-item-modified", a)
                },
                checkoutStarted: function(a) {
                    this._reportSafelyForCart("commerce_checkout_started", a);
                    this.fire("commerce-checkout-started", a)
                },
                checkoutConfirmed: function(a) {
                    this._reportSafely("commerce_checkout_order_confirmed", {
                        orderId: a.id,
                        cartId: a.purchasedCartId,
                        testMode: a.testMode,
                        websiteId: a.websiteId
                    });
                    this.fire("commerce-checkout-confirmed", a)
                },
                checkoutEmailEntered: function(a) {
                    this._reportSafelyForCart("commerce_checkout_email_entered",
                        a)
                },
                checkoutContactShippingCompleted: function(a) {
                    this._reportSafelyForCart("commerce_checkout_contact_shipping_completed", a)
                },
                checkoutDeliveryOptionsCompleted: function(a) {
                    this._reportSafelyForCart("commerce_checkout_delivery_options_completed", a)
                },
                checkoutCustomFormCompleted: function(a) {
                    this._reportSafelyForCart("commerce_checkout_custom_form_completed", a)
                },
                checkoutCouponRedeemed: function(a) {
                    this._reportSafelyForCart("commerce_checkout_coupon_redeemed", a)
                },
                contributionConfirmed: function(a) {}
            }, {
                ATTRS: {}
            });
            b.namespace("Squarespace");
            b.Squarespace.CommerceAnalytics = new c;
            c = b.Base.create("commerceAnalytics", b.Base, [], {
                initializer: function() {
                    this._events = [b.Squarespace.CommerceAnalytics.on("commerce-item-viewed", this._getProtectedTracker("onItemViewed"), this), b.Squarespace.CommerceAnalytics.on("commerce-item-added", this._getProtectedTracker("onItemAdded"), this), b.Squarespace.CommerceAnalytics.on("commerce-item-removed", this._getProtectedTracker("onItemRemoved"), this), b.Squarespace.CommerceAnalytics.on("commerce-item-modified",
                        this._getProtectedTracker("onItemModified"), this), b.Squarespace.CommerceAnalytics.on("commerce-checkout-started", this._getProtectedTracker("onCheckoutStarted"), this), b.Squarespace.CommerceAnalytics.on("commerce-checkout-confirmed", this._getProtectedTracker("onCheckoutConfirmed"), this), b.Squarespace.CommerceAnalytics.on("commerce-contribution-confirmed", this._getProtectedTracker("onContributionConfirmed"), this)];
                    this._setCartMode()
                },
                destructor: function() {
                    b.Array.invoke(this._events, "detach")
                },
                _setCartMode: function() {
                    this.cartMode =
                        b.Object.getValue(Static, ["SQUARESPACE_CONTEXT", "websiteSettings", "storeSettings", "testModeOn"]) ? "test" : "live"
                },
                _getProtectedTracker: function(a) {
                    return function(b) {
                        try {
                            this[a].call(this, b)
                        } catch (c) {}
                    }
                },
                onItemViewed: function(a) {},
                onItemAdded: function(a) {},
                onItemRemoved: function(a) {},
                onItemModified: function(a) {},
                onCheckoutStarted: function(a) {},
                onCheckoutConfirmed: function(a) {},
                onContributionConfirmed: function(a) {}
            }, {
                ATTRS: {}
            });
            new(b.Base.create("commerceAnalyticsGoogle", c, [], {
                onCheckoutConfirmed: function(a) {
                    if (_gaq) {
                        var c =
                            a.billingDetails.customer.address;
                        _gaq.push(["_addTrans", a.id, "", a.subtotal.value / 100, a.taxTotal.value / 100, a.shippingTotal.value / 100, c.city, c.region, c.country]);
                        b.each(a.items, function(b) {
                            _gaq.push(["_addItem", a.id, b.sku || "digital", b.productName, "", b.unitPrice.value / 100, b.quantity])
                        });
                        _gaq.push(["_trackTrans"])
                    }
                }
            }, {
                ATTRS: {}
            }));
            b.Object.getValue(Static, ["SQUARESPACE_CONTEXT", "item", "recordType"]) === f.STORE_ITEM && b.Squarespace.CommerceAnalytics.itemViewed(Static.SQUARESPACE_CONTEXT.item)
        }, "1.0", {
            requires: ["array-invoke",
                "base", "event-custom", "node", "squarespace-util"
            ]
        })
    },
    2494: function(k, l, c) {
        var f = c(1);
        YUI.add("squarespace-models-shopping-cart", function(b) {
            b.namespace("Squarespace.Models");
            b.namespace("Squarespace.Singletons");
            var c = b.Squarespace.Models.ShoppingCart = b.Base.create("shoppingCart", b.Model, [], {
                initializer: function() {
                    this.publish("item-added", {
                        emitFacade: !0
                    });
                    this.publish("loaded", {
                        emitFacade: !0
                    });
                    this.publish("recalculate-start", {
                        emitFacade: !0
                    });
                    this.publish("recalculate-end", {
                        emitFacade: !0
                    });
                    this._isRecalculating =
                        this._readInProgress = !1;
                    this.on("recalculate-start", function() {
                        this._isRecalculating = !0
                    }, this);
                    this.on("recalculate-end", function() {
                        this._isRecalculating = !1
                    }, this)
                },
                toJSON: function() {
                    var a = c.superclass.toJSON.call(this),
                        h = a.created;
                    b.Lang.isNull(h) || (a.created = h.getTime());
                    return a
                },
                sync: function(a, b, c) {
                    switch (a) {
                        case "read":
                            this._read(b, c)
                    }
                },
                load: function(a, c, d) {
                    "function" === typeof a && (c = a, a = {});
                    this._readinProgress ? this.after("load", c, d) : b.Model.prototype.load.call(this, a, c ? b.bind(c, d || this) : null)
                },
                isRecalculating: function() {
                    return this._isRecalculating
                },
                hasEntry: function(a, c) {
                    return b.Array.reduce(this.get("entries"), !1, function(d, e) {
                        return b.Lang.isValue(c) ? d || e.itemId == a && c.sku == e.chosenVariant.sku : d || e.itemId == a
                    })
                },
                addEntry: function(a, c, d, e, g, r, m) {
                    b.Data.post({
                        url: "/api/commerce/shopping-cart/entries" + (g ? "?isExpress=true" : ""),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: b.JSON.stringify({
                            itemId: a,
                            sku: b.Lang.isValue(c) ? c.sku : null,
                            quantity: d,
                            additionalFields: b.JSON.stringify(e)
                        }),
                        success: function(a) {
                            b.Squarespace.CommerceAnalytics.itemAdded(a);
                            this.setAttrs(a.shoppingCart);
                            this.fire("item-added");
                            b.Lang.isFunction(r) && r.call(m || this, null, a.newlyAdded)
                        },
                        failure: function(a) {
                            a.crumbFail && (b.Squarespace.Utils.areCookiesEnabled() ? a.error = f("Your session has expired. Please reload the page and try again.") : a.error = f("Please enable cookies in your browser, reload the page, and try again."));
                            b.Lang.isFunction(r) && r.call(m || this, a.message, null)
                        }
                    }, this)
                },
                updateFormSubmission: function(a, c, d, e) {
                    var g = a.chosenVariant;
                    this.fire("recalculate-start");
                    b.Data.put({
                            headers: {
                                "Content-Type": "application/json"
                            },
                            url: b.Lang.sub("/api/commerce/shopping-cart/entries/{entryId}/additionalFields", {
                                entryId: a.id
                            }),
                            data: b.JSON.stringify({
                                itemId: a.itemId,
                                sku: b.Lang.isValue(g) ? g.sku : null,
                                additionalFields: b.JSON.stringify(c)
                            }),
                            success: function(a) {
                                this.fire("recalculate-end");
                                this.setAttrs(a.shoppingCart);
                                b.Lang.isFunction(d) && d.call(e || this, null, a.updatedEntry)
                            },
                            failure: function(a) {
                                this.fire("recalculate-end");
                                b.Lang.isFunction(d) && d.call(e || this, a.message, null)
                            }
                        },
                        this)
                },
                updateQuantity: function(a, c, d, e) {
                    var g = a.chosenVariant;
                    this.fire("recalculate-start");
                    b.Data.put({
                        headers: {
                            "Content-Type": "application/json"
                        },
                        url: b.Lang.sub("/api/commerce/shopping-cart/entries/{entryId}", {
                            entryId: a.id
                        }),
                        data: b.JSON.stringify({
                            itemId: a.itemId,
                            sku: b.Lang.isValue(g) ? g.sku : null,
                            quantity: c
                        }),
                        success: function(a) {
                            this.fire("recalculate-end");
                            0 === c ? b.Squarespace.CommerceAnalytics.itemRemoved(a) : b.Squarespace.CommerceAnalytics.itemModified(a);
                            this.setAttrs(a.shoppingCart);
                            b.Lang.isFunction(d) &&
                                d.call(e || this, null, a.updatedEntry)
                        },
                        failure: function(a) {
                            this.fire("recalculate-end");
                            b.Lang.isFunction(d) && d.call(e || this, a.message, null)
                        }
                    }, this)
                },
                updateShippingLocation: function(a, c, d) {
                    this.fire("recalculate-start");
                    b.Data.put({
                            url: "/api/commerce/shopping-cart/shipping-location",
                            data: a,
                            success: function(a) {
                                this.fire("recalculate-end");
                                this.setAttrs(a);
                                b.Lang.isFunction(c) && c.call(d || this, null)
                            },
                            failure: function(a) {
                                this.fire("recalculate-end");
                                b.Lang.isFunction(c) && c.call(d || this, a.message, null)
                            }
                        },
                        this)
                },
                updateShippingMethod: function(a, c, d) {
                    this.fire("recalculate-start");
                    b.Data.put({
                        url: "/api/commerce/shopping-cart/selected-shipping-option",
                        data: {
                            shippingOptionKey: a
                        },
                        success: function(a) {
                            this.fire("recalculate-end");
                            this.setAttrs(a);
                            b.Lang.isFunction(c) && c.call(d || this, null)
                        },
                        failure: function(a) {
                            this.fire("recalculate-end");
                            b.Lang.isFunction(c) && c.call(d || this, a.message, null)
                        }
                    }, this)
                },
                addCoupon: function(a, c, d) {
                    b.Data.post({
                        url: "/api/commerce/shopping-cart/coupons",
                        data: {
                            promoCode: a
                        },
                        success: function(a) {
                            this.setAttrs(a);
                            b.Lang.isFunction(c) && c.call(d || this, null)
                        },
                        failure: function(a) {
                            b.Lang.isFunction(c) && c.call(d || this, a.message, null)
                        }
                    }, this)
                },
                removeCoupon: function(a, c, d) {
                    b.Data.del({
                        url: "/api/commerce/shopping-cart/coupons/" + a,
                        success: function(a) {
                            this.setAttrs(a);
                            b.Lang.isFunction(c) && c.call(d || this, null)
                        },
                        failure: function(a) {
                            b.Lang.isFunction(c) && c.call(d || this, a.message, null)
                        }
                    }, this)
                },
                updateCustomerInfo: function(a) {
                    b.Data.put({
                        url: "/api/commerce/shopping-cart/customer",
                        data: {
                            email: a
                        },
                        success: this.setAttrs.bind(this),
                        failure: function(a) {
                            console.warn("An error happened when adding the customer info: ", a)
                        }
                    }, this)
                },
                totalForItem: function(a, c) {
                    var d = b.Lang.isValue(c);
                    return b.Array.reduce(this.get("entries"), 0, function(b, g) {
                        return g.item.id === a && (!d || d && g.chosenVariant.sku === c.sku) ? b + g.quantity : b
                    })
                },
                hasShippingOptions: function() {
                    var a = this.get("shippingOptions");
                    return b.Lang.isArray(a) && 0 < a.length
                },
                hasShippingCountry: function() {
                    return b.Lang.isString(this.get("shippingLocation").country)
                },
                _read: function(a, c) {
                    this._readInProgress = !0;
                    this.fire("loading");
                    b.Data.get({
                        url: "/api/commerce/shopping-cart",
                        data: {
                            mock: a.mock ? "true" : "false"
                        },
                        success: function(a) {
                            this.fire("loaded");
                            this._readInProgress = !1;
                            c(null, a)
                        },
                        failure: function(a) {
                            this.fire("loaded");
                            this._readInProgress = !1;
                            c(a.message, null)
                        }
                    }, this)
                }
            }, {
                ATTRS: {
                    id: {
                        validator: b.Lang.isString
                    },
                    websiteId: {
                        validator: b.Lang.isString
                    },
                    orderId: {
                        validator: b.Lang.isString
                    },
                    created: {
                        getter: function(a) {
                            return b.Lang.isValue(a) ? new Date(a) : null
                        },
                        setter: function(a) {
                            return b.Lang.isDate(a) ? a.getTime() :
                                a
                        },
                        validator: b.Lang.isNumber
                    },
                    isPurchased: {
                        value: !1,
                        validator: b.Lang.isBoolean
                    },
                    entries: {
                        value: [],
                        validator: b.Lang.isArray
                    },
                    shippingOptions: {
                        value: [],
                        validator: b.Lang.isArray
                    },
                    selectedShippingOption: {
                        validator: b.Lang.isObject
                    },
                    shippingLocation: {
                        validator: b.Lang.isObject
                    },
                    applicableTaxRules: {
                        value: [],
                        validator: b.Lang.isArray
                    },
                    coupons: {
                        value: [],
                        validator: b.Lang.isArray
                    },
                    validCoupons: {
                        value: [],
                        validator: b.Lang.isArray
                    },
                    invalidCoupons: {
                        value: [],
                        validator: b.Lang.isArray
                    },
                    subtotalCents: {
                        validator: b.Lang.isNumber,
                        value: 0
                    },
                    taxCents: {
                        validator: b.Lang.isNumber,
                        value: 0
                    },
                    shippingCostCents: {
                        validator: b.Lang.isNumber,
                        value: 0
                    },
                    discountCents: {
                        validator: b.Lang.isNumber,
                        value: 0
                    },
                    grandTotalCents: {
                        validator: b.Lang.isNumber,
                        value: 0
                    },
                    totalQuantity: {
                        validator: b.Lang.isNumber,
                        value: 0
                    },
                    hasDigital: {
                        validator: b.Lang.isBoolean,
                        value: !1
                    },
                    purelyDigital: {
                        validator: b.Lang.isBoolean,
                        value: !1
                    },
                    requiresShipping: {
                        validator: b.Lang.isBoolean,
                        value: !1
                    }
                }
            });
            b.Squarespace.Singletons.ShoppingCart = new c
        }, "1.0", {
            requires: ["base", "model", "squarespace-commerce-analytics",
                "squarespace-commerce-utils", "squarespace-util"
            ]
        })
    },
    2704: function(k, l) {
        YUI.add("squarespace-checkout-form-contact-info-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["checkout-form-contact-info.html"] = b(function(b, a, c, d, e) {
                    function f(a, b) {
                        return 'checked="checked"'
                    }
                    this.compilerInfo = [4, ">= 1.0.0"];
                    c = this.merge(c, b.helpers);
                    e = e || {};
                    var r, m = this;
                    b = '<div class="title">Contact Info <a class="edit-button">edit</a>\n</div>\n\n<fieldset>\n\n  <div id="contact-info">\n\n    \x3c!-- Email Address --\x3e\n    <div id="email" data-label="Email Address" class="field email required">\n      <label>Email Address</label>\n      <input name="email" class="field-element required" placeholder="Email"\n          x-autocompletetype="email" type="email" spellcheck="false" maxlength="50" type="email" />\n    </div>\n\n    <div id="phone" data-label="Phone Number" class="field phone">\n      <label>Phone Number</label>\n      <input name="phone" class="field-element" placeholder="Phone Number"\n          x-autocompletetype="phone" spellcheck="false" maxlength="20" type="tel" />\n    </div>\n\n  </div> \x3c!-- end #shipping-address --\x3e\n\n  ';
                    if ((a = c["if"].call(a, (r = a.optionalFields, null == r || !1 === r ? r : r.showMailingList), {
                            hash: {},
                            inverse: m.noop,
                            fn: m.program(1, function(a, b) {
                                    var d, e;
                                    d = '\n    \x3c!-- Mailchimp (optional) --\x3e\n    <div class="join-mailing-list field">\n      <input type="checkbox" name="joinMailingList" class="field-element" ';
                                    if ((e = c["if"].call(a, a.enableMailingListOptInByDefault, {
                                            hash: {},
                                            inverse: m.noop,
                                            fn: m.program(2, f, b),
                                            data: b
                                        })) || 0 === e) d += e;
                                    return d + ' value="true"></input> <label class="mailing-list-opt-in" for="joinMailingList">Join our mailing list</label>\n    </div>\n  '
                                },
                                e),
                            data: e
                        })) || 0 === a) b += a;
                    return b + '\n\n\n  \x3c!-- Continue --\x3e\n  <div class = "btn-container">\n    <div class="button continue-button">Continue</div>\n  </div>\n\n </fieldset>\n'
                })
            })();
            c.Handlebars.registerPartial("checkout-form-contact-info.html".replace("/", "."), f.templates["checkout-form-contact-info.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2705: function(k, l) {
        YUI.add("squarespace-checkout-form-custom-form-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates =
                    f.templates || {})["checkout-form-custom-form.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    this.merge(c, b.helpers);
                    var f;
                    b = this.escapeExpression;
                    return a = "" + ('<div class="title">' + b((f = (f = a.strings, null == f || !1 === f ? f : f.name), "function" === typeof f ? f.apply(a) : f)) + '<a class="edit-button">edit</a></div>\n\n<fieldset>\n\n  <div class="custom-form">\n  </div>\n\n  \x3c!-- Continue --\x3e\n  <div class="btn-container">\n    <div class="button continue-button">Continue</div>\n  </div>\n\n</fieldset>\n')
                })
            })();
            c.Handlebars.registerPartial("checkout-form-custom-form.html".replace("/", "."), f.templates["checkout-form-custom-form.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2706: function(k, l) {
        YUI.add("squarespace-checkout-form-payment-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["checkout-form-payment.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    c = this.merge(c, b.helpers);
                    e = e || {};
                    var f, r = this.escapeExpression,
                        m = c.helperMissing;
                    b = '<div class="title">\n  <a class="edit-button">edit</a>\n\n  <div class="cards">\n    <img class="card-discover" src="https://static.squarespace.com/universal/images-v6/checkout/discover.png" />\n    <img class="card-mastercard" src="https://static.squarespace.com/universal/images-v6/checkout/mastercard.png" />\n    <img class="card-visa" src="https://static.squarespace.com/universal/images-v6/checkout/visa.png" />\n    <img class="card-americanexpress" src="https://static.squarespace.com/universal/images-v6/checkout/americanexpress.png" />\n  </div>\n\n  Billing\n</div>\n\n<fieldset>\n\n  <div class="subtitle">Billing Address</div>\n\n  \x3c!-- bill to shipping --\x3e\n  ';
                    if ((d = c["if"].call(a, a.requiresShipping, {
                            hash: {},
                            inverse: this.noop,
                            fn: this.program(1, function(a, b) {
                                return '\n    <div class="bill-to-shipping">\n      <label>\n        <input name="billToShipping" class="field-element" type="checkbox" value="true"/>\n        Use Shipping Address\n      </label>\n    </div>\n  '
                            }, e),
                            data: e
                        })) || 0 === d) b += d;
                    f = {
                        hash: {
                            "short": "true"
                        },
                        data: e
                    };
                    b = b + '\n\n  \x3c!-- Billing Information --\x3e\n  <div id="billing-address">\n\n    \x3c!-- First Name --\x3e\n    <div id="billing-first-name" data-label="First Name" class="field first-name required">\n      <label>First Name</label>\n      <input name="billingFirstName" class="field-element" placeholder="First Name"\n          x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" />\n    </div>\n\n\n    \x3c!-- Last Name --\x3e\n    <div id="billing-last-name" data-label="Last Name" class="field last-name required">\n      <label>Last Name</label>\n      <input name="billingLastName" class="field-element" placeholder="Last Name"\n          x-autocompletetype="surname"a type="text" spellcheck="false" maxlength="30" />\n    </div>\n\n\n    \x3c!-- Billing Address 1 --\x3e\n    <div id="billing-address-1" data-label="Address Line 1" class="field required">\n      <label>Address Line 1</label>\n      <input name="billingAddress1" class="field-element address-line1"\n          placeholder="Address Line 1" x-autocompletetype="address-line1" type="text" spellcheck="false" maxlength="50" />\n    </div>\n\n\n    \x3c!-- Billing Address 2 --\x3e\n    <div id="billing-address-2" data-label="Address Line 2" class="field">\n      <label>Address Line 2</label>\n      <input name="billingAddress2" class="field-element address-line2"\n          placeholder="Address Line 2" type="text" x-autocompletetype="address-line2" spellcheck="false" maxlength="50" />\n    </div>\n\n\n    \x3c!-- Country --\x3e\n    <div id="billing-country" data-label="Country" class="field country required">\n      <label>Country</label>\n      <select name="billingCountry" class="field-element" x-autocompletetype="country-name">\n      </select>\n    </div>\n\n\n    \x3c!-- City --\x3e\n    <div id="billing-city" data-label="City" class="field city required">\n      <label>City</label>\n      <input name="billingCity" class="field-element" placeholder="City" type="text"\n          spellcheck="false" maxlength="30" />\n    </div>\n\n\n    \x3c!-- State/Province --\x3e\n    <div id="billing-state" data-label="State/Province" class="field state required">\n      <label>State/Province</label>\n      <select name="billingState" class="field-element" x-autocompletetype="state">\n      </select>\n    </div>\n\n\n    \x3c!-- Zip Code --\x3e\n    <div id="billing-zip" data-label="Zip Code" class="field zip required">\n      <label>Zip / Postal</label>\n      <input name="billingZip" class="field-element" placeholder="Zip / Postal" type="text"\n          spellcheck="false" maxlength="10" />\n    </div>\n\n  </div>\n\n  <div class="subtitle">Secure Payment</div>\n\n  \x3c!--\n    Credit Card Fields\n    NOTA BENE: These INPUTs are left without \'name\' because we ABSOLUTELY must NOT\n    transmit these values to our own servers.\n  --\x3e\n  <div id="credit-card">\n\n    \x3c!-- Name --\x3e\n    <input name="cardHolderName" type="hidden" />\n\n    \x3c!-- Card Number --\x3e\n    <div id="card-number" data-label="Card Number" class="field required">\n      <label>Card Number</label>\n\n      <input class="field-element" size="20"\n          autocomplete="off" placeholder="Card Number" value="" />\n    </div>\n\n    \x3c!-- Expiry/CVC --\x3e\n    <div id="expiry-cvc">\n\n      \x3c!-- Expiry Month --\x3e\n      <div id="card-expiry-month" data-label="Exp. Mo." class="field">\n        <label>Exp. Mo.</label>\n        <select class="field-element" value="04" >\n          ' +
                        (r((d = c["month-options"] || a["month-options"], d ? d.call(a, f) : m.call(a, "month-options", f))) + '\n        </select>\n      </div>\n\n      \x3c!-- Expiry Year --\x3e\n      <div id="card-expiry-year" data-label="Exp. Yr." class="field">\n        <label>Exp. Yr.</label>\n        <select class="field-element" value="2015" >\n          ');
                    (f = c["year-options"]) ? f = f.call(a, {
                        hash: {},
                        data: e
                    }): (f = a["year-options"], f = "function" === typeof f ? f.apply(a) : f);
                    b += r(f) + '\n        </select>\n      </div>\n\n      \x3c!-- CVC --\x3e\n      <div id="cvc" data-label="CVC" class="field required">\n        <label>CVC</label>\n        <input class="field-element" size="4" autocomplete="off"\n            placeholder="CVC" value="" />\n      </div>\n\n    </div>\n\n  </div> \x3c!-- end #credit-card --\x3e\n\n\n  \x3c!-- Secure payment conditions --\x3e\n  <div id="comfort">\n    All transactions are secure and encrypted, and we never store your credit card information. Payments are\n    processed through Stripe. Payment information is also governed by\n    <a target="_blank" href="https://stripe.com/privacy">Stripe\'s privacy policy</a>.\n  </div>\n\n\n  \x3c!-- Place Order --\x3e\n  <div id="place-order">\n    <div id="place-order-button" class="button continue-button" value="Place Order" >' +
                        r((d = (d = a.strings, null == d || !1 === d ? d : d.submitText), "function" === typeof d ? d.apply(a) : d)) + '</div>\n\n    <div class="wait-in-queue-message" style="display: none">\n      Due to heavy traffic, your payment will be accepted shortly. Please don\'t hit the "back" button or leave the page.\n    </div>\n\n    \x3c!-- hidden field to convey the Stripe Token so we may submit the charge --\x3e\n    <input name="stripeToken" type="hidden" />\n\n    \x3c!-- optional hidden fields --\x3e\n    ';
                    if ((f = c.each.call(a,
                            a.optionalHiddenFields, {
                                hash: {},
                                inverse: this.noop,
                                fn: this.program(3, function(a, b) {
                                    var c;
                                    return c = "" + ('\n      <input name="' + r("function" === typeof a ? a.apply(a) : a) + '" type="hidden" />\n    ')
                                }, e),
                                data: e
                            })) || 0 === f) b += f;
                    return b += "\n\n  </div>\n\n</fieldset>\n"
                })
            })();
            c.Handlebars.registerPartial("checkout-form-payment.html".replace("/", "."), f.templates["checkout-form-payment.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2707: function(k, l) {
        YUI.add("squarespace-checkout-form-shipping-info-template",
            function(c) {
                var f = c.Handlebars;
                (function() {
                    var b = f.template;
                    (f.templates = f.templates || {})["checkout-form-shipping-info.html"] = b(function(b, a, c, d, e) {
                        function f(a, b) {
                            return 'checked="checked"'
                        }
                        this.compilerInfo = [4, ">= 1.0.0"];
                        c = this.merge(c, b.helpers);
                        e = e || {};
                        var r, m = this;
                        b = '<div class="title">\n  Contact &amp; Shipping\n  <a class="edit-button">edit</a>\n</div>\n\n<fieldset>\n\n    <div class="subtitle contact-info-subtitle">Your Email Address</div>\n    \x3c!-- Email Address --\x3e\n    <div id="email" data-label="Email Address" class="field email required">\n      <label>Email Address</label>\n      <input name="email" class="field-element" placeholder="Email"\n          x-autocompletetype="email" type="email" spellcheck="false" maxlength="50" type="email" />\n    </div>\n    <div class="description">Receipts and notifications will be sent to this email address.</div>\n\n    ';
                        if ((a = c["if"].call(a, (r = a.optionalFields, null == r || !1 === r ? r : r.showMailingList), {
                                hash: {},
                                inverse: m.noop,
                                fn: m.program(1, function(a, b) {
                                        var d, e;
                                        d = '\n      \x3c!-- Mailchimp (optional) --\x3e\n      <div class="join-mailing-list">\n        <label>\n          <input type="checkbox" name="joinMailingList" class="field-element" ';
                                        if ((e = c["if"].call(a, a.enableMailingListOptInByDefault, {
                                                hash: {},
                                                inverse: m.noop,
                                                fn: m.program(2, f, b),
                                                data: b
                                            })) || 0 === e) d += e;
                                        return d + ' value="true"></input>\n          Join our mailing list\n        </label>\n      </div>\n    '
                                    },
                                    e),
                                data: e
                            })) || 0 === a) b += a;
                        return b + '\n\n  <div class="subtitle shipping-address-subtitle">Shipping Address</div>\n\n  \x3c!-- Shipping Address --\x3e\n  <div id="shipping-address-wrapper">\n\n    <div class="shipping-fields">\n\n      \x3c!-- First Name --\x3e\n      <div id="shipping-first-name" data-label="First Name" class="field first-name required">\n        <label>First Name</label>\n        <input name="shippingFirstName" class="field-element"\n            placeholder="First Name" x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" />\n      </div>\n\n\n      \x3c!-- Last Name --\x3e\n      <div id="shipping-last-name" data-label="Last Name" class="field last-name required">\n        <label>Last Name</label>\n        <input name="shippingLastName" class="field-element" placeholder="Last Name"\n            x-autocompletetype="surname" type="text" spellcheck="false" maxlength="30" />\n      </div>\n\n\n      \x3c!-- Shipping Address 1 --\x3e\n      <div id="shipping-address-1" data-label="Address Line 1" class="field address required">\n        <label>Address Line 1</label>\n        <input name="shippingAddress1" class="field-element address-line1" type="text"\n            x-autocompletetype="address-line1" placeholder="Street Address 1" spellcheck="false" maxlength="50" />\n      </div>\n\n\n      \x3c!-- Shipping Address 2 --\x3e\n      <div id="shipping-address-2" data-label="Address Line 2" class="field address">\n        <label>Address Line 2</label>\n        <input name="shippingAddress2" class="field-element address-line2" type="text"\n            placeholder="Street Address 2" x-autocompletetype="address-line2" spellcheck="false" maxlength="50" />\n      </div>\n\n\n      \x3c!-- Country --\x3e\n      <div id="shipping-country" data-label="Country" class="field country required">\n        <label>Country</label>\n        <select name="shippingCountry" class="field-element"\n            x-autocompletetype="country-name">\n        </select>\n      </div>\n\n\n      \x3c!-- City --\x3e\n      <div id="shipping-city" data-label="City" class="field city required">\n        <label>City</label>\n        <input name="shippingCity" class="field-element" placeholder="City"\n            x-autocompletetype="city" type="text" spellcheck="false" maxlength="30" />\n      </div>\n\n\n      \x3c!-- State/Province --\x3e\n      <div id="shipping-state" data-label="State/Province" class="field state required">\n        <label>State/Province</label>\n        <select name="shippingState" class="field-element"\n            x-autocompletetype="state">\n        </select>\n      </div>\n\n\n      \x3c!-- Zip Code --\x3e\n      <div id="shipping-zip" data-label="Zip Code" class="field zip required">\n        <label>Zip / Postal</label>\n        <input name="shippingZip" class="field-element"\n            x-autocompletetype="postal-code" placeholder="Zip / Postal" type="text" spellcheck="false" maxlength="10" />\n      </div>\n\n      <div id="phone" data-label="Phone Number" class="field phone">\n        <label>Phone Number</label>\n        <input name="phone" class="field-element" placeholder="Phone Number"\n            x-autocompletetype="phone" spellcheck="false" maxlength="20" type="tel" />\n      </div>\n\n    </div>\n\n\n  </div> \x3c!-- end #shipping-address --\x3e\n\n\n\n  \x3c!-- Continue --\x3e\n  <div class="btn-container">\n    <div class="button continue-button">Continue</div>\n  </div>\n\n</fieldset>\n'
                    })
                })();
                c.Handlebars.registerPartial("checkout-form-shipping-info.html".replace("/", "."), f.templates["checkout-form-shipping-info.html"])
            }, "1.0", {
                requires: ["handlebars-base"]
            })
    },
    2708: function(k, l) {
        YUI.add("squarespace-checkout-saved-contact-info-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["checkout-saved-contact-info.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    c = this.merge(c, b.helpers);
                    e = e || {};
                    var f = this.escapeExpression;
                    b = '<div class="saved-fieldset">\n\n  <div>';
                    (d = c.email) ? d = d.call(a, {
                        hash: {},
                        data: e
                    }): (d = a.email, d = "function" === typeof d ? d.apply(a) : d);
                    b += f(d) + "</div>\n  <div>";
                    (d = c.phone) ? d = d.call(a, {
                        hash: {},
                        data: e
                    }): (d = a.phone, d = "function" === typeof d ? d.apply(a) : d);
                    return b += f(d) + "</div>\n\n</div>\n"
                })
            })();
            c.Handlebars.registerPartial("checkout-saved-contact-info.html".replace("/", "."), f.templates["checkout-saved-contact-info.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2709: function(k, l) {
        YUI.add("squarespace-checkout-saved-contribution-template", function(c) {
            var f =
                c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["checkout-saved-contribution.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    c = this.merge(c, b.helpers);
                    e = e || {};
                    var f = this.escapeExpression;
                    b = '<div class="saved-fieldset">\n\n  You will donate ';
                    (d = c.donationAmount) ? d = d.call(a, {
                        hash: {},
                        data: e
                    }): (d = a.donationAmount, d = "function" === typeof d ? d.apply(a) : d);
                    if (d || 0 === d) b += d;
                    b += " to ";
                    (d = c.title) ? d = d.call(a, {
                        hash: {},
                        data: e
                    }): (d = a.title, d = "function" === typeof d ? d.apply(a) :
                        d);
                    return b += f(d) + "\n\n</div>\n"
                })
            })();
            c.Handlebars.registerPartial("checkout-saved-contribution.html".replace("/", "."), f.templates["checkout-saved-contribution.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2710: function(k, l) {
        YUI.add("squarespace-checkout-saved-custom-form-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["checkout-saved-custom-form.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    c = this.merge(c, b.helpers);
                    e = e || {};
                    b =
                        '<div class="saved-fieldset">\n\n  ';
                    if ((a = c.each.call(a, a.fields, {
                            hash: {},
                            inverse: this.noop,
                            fn: this.program(1, function(a, b) {
                                var c, d;
                                c = "\n  <div>\n    ";
                                if ((d = "function" === typeof a ? a.apply(a) : a) || 0 === d) c += d;
                                return c + "\n  </div> \n  "
                            }, e),
                            data: e
                        })) || 0 === a) b += a;
                    return b + "\n\n</div>\n"
                })
            })();
            c.Handlebars.registerPartial("checkout-saved-custom-form.html".replace("/", "."), f.templates["checkout-saved-custom-form.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2711: function(k, l) {
        YUI.add("squarespace-checkout-saved-shipping-info-template",
            function(c) {
                var f = c.Handlebars;
                (function() {
                    var b = f.template;
                    (f.templates = f.templates || {})["checkout-saved-shipping-info.html"] = b(function(b, a, c, d, e) {
                        function f(a, b) {
                            var d;
                            (d = c.shippingCity) ? d = d.call(a, {
                                hash: {},
                                data: b
                            }): (d = a.shippingCity, d = typeof d === p ? d.apply(a) : d);
                            return n(d)
                        }

                        function r(a, b) {
                            var d, e;
                            d = ",&nbsp;";
                            (e = c.shippingState) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.shippingState, e = typeof e === p ? e.apply(a) : e);
                            return d += n(e)
                        }

                        function m(a, b) {
                            var d, e;
                            d = "&nbsp;&nbsp;";
                            (e = c.shippingZip) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.shippingZip, e = typeof e === p ? e.apply(a) : e);
                            return d += n(e)
                        }
                        this.compilerInfo = [4, ">= 1.0.0"];
                        c = this.merge(c, b.helpers);
                        e = e || {};
                        var s, p = "function",
                            n = this.escapeExpression,
                            k = this;
                        d = c.blockHelperMissing;
                        b = '<div class="saved-fieldset">\n\n  ';
                        s = {
                            hash: {},
                            inverse: k.noop,
                            fn: k.program(1, function(a, b) {
                                var d, e;
                                d = '\n\n    <div class="subtitle">Your Email Address</div>\n    <div>';
                                (e = c.email) ? e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.email, e = typeof e === p ? e.apply(a) : e);
                                d += n(e) + '</div>\n    <br />\n    \n\n    <div class="subtitle">Shipping Address</div>\n    <div>\n      ';
                                (e = c.shippingFirstName) ? e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.shippingFirstName, e = typeof e === p ? e.apply(a) : e);
                                d += n(e) + "&nbsp;";
                                (e = c.shippingLastName) ? e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.shippingLastName, e = typeof e === p ? e.apply(a) : e);
                                d += n(e) + "\n    </div>\n    <div>";
                                (e = c.shippingAddress1) ? e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.shippingAddress1, e = typeof e === p ? e.apply(a) : e);
                                d += n(e) + "</div>\n    <div>";
                                (e = c.shippingAddress2) ? e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.shippingAddress2, e = typeof e === p ? e.apply(a) : e);
                                d += n(e) +
                                    "</div>\n\n    <div>\n      ";
                                if ((e = c["if"].call(a, a.shippingCity, {
                                        hash: {},
                                        inverse: k.noop,
                                        fn: k.program(2, f, b),
                                        data: b
                                    })) || 0 === e) d += e;
                                if ((e = c["if"].call(a, a.shippingState, {
                                        hash: {},
                                        inverse: k.noop,
                                        fn: k.program(4, r, b),
                                        data: b
                                    })) || 0 === e) d += e;
                                if ((e = c["if"].call(a, a.shippingZip, {
                                        hash: {},
                                        inverse: k.noop,
                                        fn: k.program(6, m, b),
                                        data: b
                                    })) || 0 === e) d += e;
                                d += "\n    </div>\n\n    <div>";
                                (e = c.shippingCountry) ? e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.shippingCountry, e = typeof e === p ? e.apply(a) : e);
                                d += n(e) + "</div>\n    <div>";
                                (e = c.phone) ?
                                e = e.call(a, {
                                    hash: {},
                                    data: b
                                }): (e = a.phone, e = typeof e === p ? e.apply(a) : e);
                                return d += n(e) + "</div>\n\n    <br />\n\n  "
                            }, e),
                            data: e
                        };
                        (e = c.requiresShipping) ? e = e.call(a, s): (e = a.requiresShipping, e = typeof e === p ? e.apply(a) : e);
                        c.requiresShipping || (e = d.call(a, e, s));
                        if (e || 0 === e) b += e;
                        return b + "\n\n</div>\n"
                    })
                })();
                c.Handlebars.registerPartial("checkout-saved-shipping-info.html".replace("/", "."), f.templates["checkout-saved-shipping-info.html"])
            }, "1.0", {
                requires: ["handlebars-base"]
            })
    },
    2712: function(k, l) {
        YUI.add("squarespace-contribution-summary-template",
            function(c) {
                var f = c.Handlebars;
                (function() {
                    var b = f.template;
                    (f.templates = f.templates || {})["contribution-summary.html"] = b(function(b, a, c, d, e) {
                        function f(a, b) {
                            var d, e;
                            d = "\n<p>\n  ";
                            (e = c.description) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.description, e = typeof e === n ? e.apply(a) : e);
                            return d += l(e) + "\n</p>\n"
                        }

                        function r(a, b) {
                            var d, e;
                            d = '\n      <div class="suggested-contributions">\n        ';
                            if ((e = c.each.call(a, a.suggestedContributions, {
                                    hash: {},
                                    inverse: u.noop,
                                    fn: u.program(5, m, b),
                                    data: b
                                })) || 0 === e) d += e;
                            return d +
                                '\n\n        <div class="option">\n          <input type="radio" name="contribution" id="other" value="other" />\n          <label for="other">Other \n            &nbsp;<input type="text" placeholder="Enter Other Amount" name="contributionAmount" />\n          </label>\n          <br />\n        </div>\n      </div>\n    '
                        }

                        function m(a, b) {
                            var d, e;
                            d = '\n          <div class="option">\n            <input type="radio" name="contribution" id="';
                            (e = c.amountCents) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.amountCents,
                                e = typeof e === n ? e.apply(a) : e);
                            d += l(e) + '" value="';
                            (e = c.amountCents) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.amountCents, e = typeof e === n ? e.apply(a) : e);
                            d += l(e) + '" />\n            <label for="';
                            (e = c.amountCents) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.amountCents, e = typeof e === n ? e.apply(a) : e);
                            d += l(e) + '"><span class="sqs-money-native">';
                            (e = c.amountDollars) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.amountDollars, e = typeof e === n ? e.apply(a) : e);
                            d += l(e) + "</span>&nbsp;";
                            if ((e = c["if"].call(a, a.label, {
                                    hash: {},
                                    inverse: u.noop,
                                    fn: u.program(6,
                                        k, b),
                                    data: b
                                })) || 0 === e) d += e;
                            return d + "</label><br />\n          </div>\n        "
                        }

                        function k(a, b) {
                            var d, e;
                            d = "(";
                            (e = c.label) ? e = e.call(a, {
                                hash: {},
                                data: b
                            }): (e = a.label, e = typeof e === n ? e.apply(a) : e);
                            return d += l(e) + ")"
                        }

                        function p(a, b) {
                            return '\n    \n      <input type="text" placeholder="Enter Other Amount" name="contributionAmount" /><br />\n    '
                        }
                        this.compilerInfo = [4, ">= 1.0.0"];
                        c = this.merge(c, b.helpers);
                        e = e || {};
                        b = "";
                        var n = "function",
                            l = this.escapeExpression,
                            u = this;
                        if ((a = c["with"].call(a, a.donatePage, {
                                hash: {},
                                inverse: u.noop,
                                fn: u.program(1, function(a, b) {
                                    var d, e;
                                    d = '\n\n<div class="title">Your Contribution<a class="edit-button">edit</a></div>\n\n<fieldset>\n\n';
                                    if ((e = c["if"].call(a, a.description, {
                                            hash: {},
                                            inverse: u.noop,
                                            fn: u.program(2, f, b),
                                            data: b
                                        })) || 0 === e) d += e;
                                    d += '\n\n<div class="choices">\n\n  <div class="title prompt"></div>\n  <div class="contribution-option-list">\n\n    \n    ';
                                    if ((e = c["if"].call(a, a.suggestedContributions, {
                                            hash: {},
                                            inverse: u.program(8, p, b),
                                            fn: u.program(4, r, b),
                                            data: b
                                        })) || 0 === e) d += e;
                                    return d +
                                        '\n\n  </div>\n\n</div>\n\n\n\x3c!-- Continue --\x3e\n<div class="btn-container">\n  <div class="button continue-button">Continue</div>\n</div>\n\n</fieldset>\n'
                                }, e),
                                data: e
                            })) || 0 === a) b += a;
                        return b + "\n"
                    })
                })();
                c.Handlebars.registerPartial("contribution-summary.html".replace("/", "."), f.templates["contribution-summary.html"])
            }, "1.0", {
                requires: ["handlebars-base"]
            })
    },
    2718: function(k, l) {
        YUI.add("squarespace-full-page-shopping-cart-item-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["full-page-shopping-cart-item.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    c = this.merge(c, b.helpers);
                    e = e || {};
                    b = '<tr>\n\n  <td class="item">\n    <div class="item-image"></div>\n  </td>\n\n  <td class="item-desc"></td>\n\n  <td class="quantity">\n    ';
                    if ((a = c["if"].call(a, a.isPhysicalProduct, {
                            hash: {},
                            inverse: this.program(3, function(a, b) {
                                return '\n      <div class="not-applicable">N/A</div>\n    '
                            }, e),
                            fn: this.program(1, function(a, b) {
                                    return '\n      <input />\n      <div class="cooldown">&bull;</div>\n    '
                                },
                                e),
                            data: e
                        })) || 0 === a) b += a;
                    return b + '\n  </td>\n\n  <td class="price"></td>\n\n  <td class="remove">\n    <div class="remove-item">\u00d7</div>\n  </td>\n\n</tr>\n'
                })
            })();
            c.Handlebars.registerPartial("full-page-shopping-cart-item.html".replace("/", "."), f.templates["full-page-shopping-cart-item.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2719: function(k, l) {
        YUI.add("squarespace-full-page-shopping-cart-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["full-page-shopping-cart.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    this.merge(c, b.helpers);
                    return '<div class="loading-spinner"></div>\n\n<h2>Shopping Cart</h2>\n\n<div class="cart-container">\n\n  <table>\n\n    <thead> \n      <tr>\n        <td class="item">Item</td>\n        <td></td>\n        <td class="quantity">Quantity</td>\n        <td class="price">Price</td>\n        <td></td>\n      </tr>\n    </thead>\n\n    <tbody></tbody>\n\n  </table>\n\n  <div class="subtotal">\n    <span class="label">Subtotal</span>\n    <span class="price"></span>\n  </div>\n\n  <div class="checkout">\n    <div class="checkout-button sqs-system-button sqs-editable-button">CHECKOUT</div>\n  </div>\n\n</div>\n\n<div class="empty-message">\n  You have nothing in your shopping cart.&nbsp;\n  <a href="/">Continue Shopping</a>\n</div>\n'
                })
            })();
            c.Handlebars.registerPartial("full-page-shopping-cart.html".replace("/", "."), f.templates["full-page-shopping-cart.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2720: function(k, l) {
        YUI.add("squarespace-pill-shopping-cart-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["pill-shopping-cart.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    this.merge(c, b.helpers);
                    return '<div class="icon"></div>\n\n<div class="details">\n  <span class="total-quantity"></span>\n  <span class="suffix"></span>\n</div>\n\n<span class="subtotal">\n  <span class="price"></span>\n</span>\n'
                })
            })();
            c.Handlebars.registerPartial("pill-shopping-cart.html".replace("/", "."), f.templates["pill-shopping-cart.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    2723: function(k, l) {
        YUI.add("squarespace-shipping-options-list-option-template", function(c) {
                var f = c.Handlebars;
                (function() {
                    var b = f.template;
                    (f.templates = f.templates || {})["shipping-options-list-option.html"] = b(function(b, a, c, d, e) {
                        this.compilerInfo = [4, ">= 1.0.0"];
                        c = this.merge(c, b.helpers);
                        e = e || {};
                        var f = this.escapeExpression,
                            r = c.helperMissing;
                        b = '<div class="shipping-option ';
                        if ((d = c["if"].call(a, a.showAlert, {
                                hash: {},
                                inverse: this.noop,
                                fn: this.program(1, function(a, b) {
                                    return "disabled"
                                }, e),
                                data: e
                            })) || 0 === d) b += d;
                        b += '">\n\n  <div class="option">\n\n    <label class="shipping-option-label">\n\n      <input type="radio" value="';
                        (d = c.id) ? d = d.call(a, {
                            hash: {},
                            data: e
                        }): (d = a.id, d = "function" === typeof d ? d.apply(a) : d);
                        b += f(d) + '" title="';
                        (d = c.name) ? d = d.call(a, {
                            hash: {},
                            data: e
                        }): (d = a.name, d = "function" === typeof d ? d.apply(a) : d);
                        b += f(d) + '" data-computed-cost="';
                        (d = c.computedCost) ? d = d.call(a, {
                            hash: {},
                            data: e
                        }): (d = a.computedCost, d = "function" === typeof d ? d.apply(a) : d);
                        b += f(d) + '"\n          name="selectedShippingOption" ';
                        if ((d = c["if"].call(a, a.showAlert, {
                                hash: {},
                                inverse: this.noop,
                                fn: this.program(3, function(a, b) {
                                    return 'disabled="true"'
                                }, e),
                                data: e
                            })) || 0 === d) b += d;
                        b += ' />\n      <span class="option-name" title="';
                        (d = c.name) ? d = d.call(a, {
                            hash: {},
                            data: e
                        }): (d = a.name, d = "function" === typeof d ? d.apply(a) : d);
                        b += f(d) + '">';
                        (d = c.name) ? d = d.call(a, {
                            hash: {},
                            data: e
                        }): (d = a.name, d = "function" === typeof d ? d.apply(a) :
                            d);
                        b += f(d) + '</span>\n\n      <div class="shipping-failure">\n        <img src="/universal/images-v6/dialog/tiny-alert-inverted.png" />\n      </div>\n\n      <span class="cost">&mdash;&nbsp;<strong>';
                        e = {
                            hash: {},
                            data: e
                        };
                        return b += f((d = c["money-string"] || a["money-string"], d ? d.call(a, a.computedCost, e) : r.call(a, "money-string", a.computedCost, e))) + "</strong></span>\n\n    </label>\n\n  </div>\n\n</div>"
                    })
                })();
                c.Handlebars.registerPartial("shipping-options-list-option.html".replace("/", "."), f.templates["shipping-options-list-option.html"])
            },
            "1.0", {
                requires: ["handlebars-base"]
            })
    },
    2724: function(k, l) {
        YUI.add("squarespace-shipping-options-list-template", function(c) {
            var f = c.Handlebars;
            (function() {
                var b = f.template;
                (f.templates = f.templates || {})["shipping-options-list.html"] = b(function(b, a, c, d, e) {
                    this.compilerInfo = [4, ">= 1.0.0"];
                    this.merge(c, b.helpers);
                    return '<div class="empty-message">\n  You cannot continue checkout because there are no shipping options available.\n</div>\n\n<div class="loading-spinner"></div>\n<div class="options-container"></div>\n'
                })
            })();
            c.Handlebars.registerPartial("shipping-options-list.html".replace("/", "."), f.templates["shipping-options-list.html"])
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    3290: function(k, l, c) {
        var f = c(99);
        YUI.add("squarespace-checkout-form-address", function(b) {
            b.namespace("Squarespace.Widgets");
            var c = b.Squarespace.Localities,
                a = c.COUNTRY_OPTIONS.US,
                h = c.COUNTRY_OPTIONS.CA,
                d = b.Squarespace.Widgets.CheckoutFormAddress = b.Base.create("checkoutFormAddress", b.Squarespace.Widgets.CheckoutFormSection, [], {
                    renderUI: function() {
                        d.superclass.renderUI.call(this);
                        try {
                            f("google_maps_map_api_load_on_site"), this._autoComplete = new b.Squarespace.Widgets.GooglePlacesAutocomplete({
                                inputNode: this.get("contentBox").one("input.address-line1"),
                                render: !0,
                                countriesAllowed: this.get("countriesAllowed")
                            })
                        } catch (a) {
                            console.error(a)
                        }
                    },
                    bindUI: function() {
                        d.superclass.bindUI.call(this);
                        this._bindUseAddressForShippingChange();
                        this._bindZipChange();
                        this._bindCountryChange();
                        this._bindStateChange();
                        try {
                            this._bindGoogleAutoComplete()
                        } catch (a) {
                            console.error(a)
                        }
                    },
                    syncUI: function() {
                        d.superclass.syncUI.call(this);
                        this._populateCountrySelect();
                        this._updateStateFieldForSelectedCountry();
                        this._syncRequiredFieldsForSelectedCountry()
                    },
                    setValues: function(a) {
                        d.superclass.setValues.call(this, a);
                        this.get("useAddressForShipping") && this.fire("shippingLocationChange")
                    },
                    _bindUseAddressForShippingChange: function() {
                        this.after("useAddressForShippingChange", function(a) {
                            !0 === a.newVal && this.fire("shippingLocationChange")
                        }, this)
                    },
                    _bindZipChange: function() {
                        this.get("contentBox").one(".zip input").after("change", function() {
                            this.get("useAddressForShipping") &&
                                this.fire("shippingLocationChange")
                        }, this)
                    },
                    _bindCountryChange: function() {
                        this.get("contentBox").one(".country select").after("change", function() {
                            this.syncUI();
                            this.get("useAddressForShipping") && this.fire("shippingLocationChange")
                        }, this)
                    },
                    _bindStateChange: function() {
                        this.get("contentBox").delegate("change", function() {
                            this.get("useAddressForShipping") && this.fire("shippingLocationChange")
                        }, ".state .field-element", this)
                    },
                    _bindGoogleAutoComplete: function() {
                        this._autoComplete.on("placeDetails", function(a) {
                            f("google_maps_map_api_autocomplete_on_site");
                            this._setSelectedCountry(a.place.country);
                            this.syncUI();
                            this._populateFieldsFromAc(a.place)
                        }, this);
                        this._autoComplete.on(["keyboardContinue", "listMouseUp"], function() {
                            this.get("contentBox").one("input.address-line2").focus()
                        }, this)
                    },
                    _getSelectedCountry: function() {
                        return this.get("contentBox").one(".country select").get("value")
                    },
                    _setSelectedCountry: function(a) {
                        this.get("contentBox").one(".country select").set("value", a)
                    },
                    _getSelectedState: function() {
                        return this.get("contentBox").one(".state select").get("value")
                    },
                    _countryRequiresStateAndZip: function(b) {
                        return b === a.title || b === h.title
                    },
                    _shouldValidateStateZipEnclosure: function() {
                        return this._getSelectedCountry() === a.title
                    },
                    _syncRequiredFieldsForSelectedCountry: function() {
                        this.get("contentBox").all(".state, .zip").toggleClass("required", this._countryRequiresStateAndZip(this._getSelectedCountry()))
                    },
                    _zipFieldIsInvalid: function(b) {
                        var c = /^\d{5}(-\d{4})?$/;
                        return this._getSelectedCountry() === a.title ? !c.test(b.one(".field-element").get("value").trim()) : !1
                    },
                    _emailFieldIsInvalid: function(a) {
                        return !b.Squarespace.EmailUtils.isValid(a.one(".field-element").get("value"))
                    },
                    _validateField: function(a) {
                        var b = d.superclass._validateField.call(this, a);
                        if (b) return b;
                        if (a.hasClass("zip") && this._zipFieldIsInvalid(a) || a.hasClass("email") && this._emailFieldIsInvalid(a)) return {
                            type: this.getProperty("FIELD_ERROR_TYPES").VALIDATION,
                            field: a
                        }
                    },
                    _buildSingleOptionString: function(a) {
                        return '<option value="' + a + '">' + a + "</option>"
                    },
                    _buildOptionString: function(a) {
                        return b.Array.reduce(a, "", function(a, b) {
                            return "Not Specified" === b ? a : a + this._buildSingleOptionString(b)
                        }, this)
                    },
                    _getCountryTitles: function() {
                        var a =
                            b.Array.filter(b.Object.values(c.COUNTRY_OPTIONS), function(a) {
                                return !a.empty
                            });
                        return b.Array.map(a, function(a) {
                            return a.title
                        })
                    },
                    _getStateCodesForSelectedCountry: function() {
                        var a = c.countryCodeFromName(this._getSelectedCountry());
                        if ("" === a || !b.Lang.isValue(a)) a = "US";
                        a = c.COUNTRIES_TO_STATES[a];
                        return b.Lang.isValue(a) ? (a = b.Object.keys(a), a.sort(), a) : []
                    },
                    _fetchAsyncValidatedErrors: function() {
                        var a = this.getLocationForShipping();
                        return !this._shouldValidateStateZipEnclosure() ? b.when([]) : new b.Promise(b.bind(function(c) {
                            b.Data.get({
                                url: b.Squarespace.API_ROOT +
                                    "commerce/shipping/address/validate",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                data: {
                                    state: a.state,
                                    zip: a.zip
                                },
                                success: b.bind(function(a) {
                                    a.stateOwnsZip ? c([]) : c([{
                                        type: this.getProperty("FIELD_ERROR_TYPES").CUSTOM,
                                        message: "ZIP Code does not belong to that State."
                                    }])
                                }, this)
                            })
                        }, this))
                    },
                    _populateCountrySelect: function() {
                        var c = this.get("contentBox").one(".country select"),
                            d = this._getSelectedCountry(),
                            f = this.get("countriesAllowed");
                        c.empty();
                        0 === f.length ? c.setHTML(this._buildSingleOptionString(a.title)) :
                            (c.setHTML(this._buildOptionString(f)), -1 !== b.Array.indexOf(f, d) ? c.set("value", d) : -1 !== b.Array.indexOf(f, a.title) ? c.set("value", a.title) : c.set("value", f[0]))
                    },
                    _updateStateFieldForSelectedCountry: function(a) {
                        var d = this.get("contentBox").one(".state .field-element");
                        a = b.Lang.isValue(a) ? c.countryCodeFromName(a) : c.countryCodeFromName(this._getSelectedCountry());
                        var f;
                        c.COUNTRIES_TO_STATES[a] ? d.test("select") || (f = b.Node.create('<select class="field-element state required" name="' + d.getAttribute("name") +
                            '"></select>')) : d.test("input") || (f = b.Node.create('<input class="field-element state" placeholder="State" name="' + d.getAttribute("name") + '" />'));
                        f && (f.plug(b.Squarespace.Plugin.PulseWarn, {
                            iterations: 1,
                            useClass: !0,
                            targetClass: "warn",
                            interval: 1300
                        }), d.replace(f), d = f);
                        if (d.test("select")) {
                            f = this._getSelectedState();
                            a = this._getStateCodesForSelectedCountry();
                            d.empty();
                            var h = this._buildSingleOptionString("") + this._buildOptionString(a);
                            d.setHTML(h); - 1 !== b.Array.indexOf(a, f) && d.set("value", f)
                        }
                    }
                }, {
                    CSS_PREFIX: "sqs-checkout-form-address",
                    ATTRS: {
                        strings: {
                            value: null
                        },
                        countriesAllowed: {
                            value: []
                        },
                        getCountriesAllowed: {
                            value: function() {}
                        },
                        useAddressForShipping: {
                            value: !1
                        }
                    }
                })
        }, "1.0", {
            requires: "autocomplete base cookie node squarespace-checkout-form-section squarespace-email-utils squarespace-localities squarespace-plugin-pulsewarn squarespace-util squarespace-widgets-google-places-autocomplete".split(" ")
        })
    },
    3291: function(k, l) {
        YUI.add("squarespace-checkout-form-contact-info", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.CheckoutFormContactInfo =
                c.Base.create("checkoutFormContactInfo", c.Squarespace.Widgets.CheckoutFormSection, [c.Squarespace.Widgets.CheckoutFormCustomerInfo], {
                    bindUI: function() {
                        f.superclass.bindUI.call(this);
                        this._bindCustomerInfoEvents();
                        this.on("continue", function() {
                            c.Squarespace.CommerceAnalytics.checkoutContactShippingCompleted(this.get("model"))
                        }, this)
                    },
                    _validateField: function(b) {
                        var g = f.superclass._validateField.apply(this, arguments);
                        if (c.Lang.isObject(g)) return g;
                        g = b.one(".field-element");
                        if ("email" === g.getAttribute("type") &&
                            (g = g.get("value").trim(), !c.Squarespace.EmailUtils.isValid(g))) return {
                            type: this.getProperty("FIELD_ERROR_TYPES").VALIDATION,
                            field: b
                        }
                    }
                }, {
                    CSS_PREFIX: "sqs-checkout-form-contact-info",
                    HANDLEBARS_TEMPLATE: "checkout-form-contact-info.html",
                    HANDLEBARS_SAVED_FIELDSET_TEMPLATE: "checkout-saved-contact-info.html",
                    ATTRS: {
                        optionalFields: {
                            value: {
                                showMailingList: !0
                            }
                        },
                        enableMailingListOptInByDefault: {
                            validator: c.Squarespace.AttrValidators.isBoolean,
                            value: !0
                        },
                        model: {
                            value: null,
                            validator: function(b) {
                                return c.instanceOf(b,
                                    c.Squarespace.Models.ShoppingCart)
                            }
                        }
                    }
                })
        }, "1.0", {
            requires: "base node squarespace-checkout-form-contact-info-template squarespace-checkout-form-customer-info squarespace-checkout-form-section squarespace-checkout-saved-contact-info-template squarespace-email-utils squarespace-models-shopping-cart".split(" ")
        })
    },
    3292: function(k, l, c) {
        var f = c(271);
        YUI.add("squarespace-checkout-form-custom-form", function(b) {
            b.namespace("Squarespace.Widgets");
            var c = b.Squarespace.Widgets.CheckoutCustomForm = b.Base.create("CheckoutCustomForm",
                b.Squarespace.Widgets.CheckoutFormSection, [], {
                    renderUI: function() {
                        c.superclass.renderUI.call(this);
                        var a = this.get("contentBox");
                        b.Data.get({
                            url: "/api/template/GetTemplateSchema",
                            data: {
                                componentType: "widget",
                                type: f.FORM
                            },
                            success: function(c) {
                                this._formWidget = new b.Squarespace.Widgets.AsyncForm({
                                    form: this.get("customForm"),
                                    formTemplate: c,
                                    formSubmitButtonText: "Submit",
                                    hideSubmitButton: !0,
                                    showTitle: !1
                                });
                                this._formWidget.render(a.one(".custom-form"))
                            }
                        }, this)
                    },
                    syncUI: function() {
                        c.superclass.syncUI.call(this);
                        this.get("boundingBox").toggleClass("no-form", 0 === this.get("customForm").fields.length)
                    },
                    bindUI: function() {
                        c.superclass.bindUI.call(this);
                        this.on("continue", function() {
                            b.Squarespace.CommerceAnalytics.checkoutCustomFormCompleted(this.get("model"))
                        }, this)
                    },
                    _renderSavedFieldset: function(a) {
                        var c = this.getProperty("HANDLEBARS_SAVED_FIELDSET_TEMPLATE"),
                            d = this.get("formId");
                        this._formWidget.fetchValidatedFormSubmission(d, b.bind(function(d) {
                            var f = [];
                            b.Object.each(d, function(a, c) {
                                f.push(b.Squarespace.Commerce.summaryFormFieldString(a))
                            });
                            this.get("contentBox").append(b.Squarespace.UITemplates.render(c, {
                                fields: f
                            }));
                            a.call(this)
                        }, this))
                    },
                    _getLocalErrors: function() {
                        return []
                    },
                    _fetchAsyncValidatedErrors: function() {
                        return new b.Promise(b.bind(function(a) {
                            this._formWidget.fetchValidatedFormSubmission(this.get("formId"), function() {
                                a([])
                            }, b.bind(function(c) {
                                var d = b.Array.map(b.Object.keys(c.errors), function(a) {
                                    return {
                                        type: this.getProperty("FIELD_ERROR_TYPES").FORM_FIELD,
                                        fieldId: a,
                                        message: c.errors[a]
                                    }
                                }, this);
                                d.push({
                                    type: this.getProperty("FIELD_ERROR_TYPES").CUSTOM,
                                    message: "Your form has encountered a problem. Please scroll up to review."
                                });
                                d.push({
                                    type: this.getProperty("FIELD_ERROR_TYPES").HEADER,
                                    message: "Your form has encountered a problem. Please scroll down to review."
                                });
                                a(d)
                            }, this))
                        }, this))
                    },
                    getCustomFormSubmission: function() {
                        return b.Lang.isValue(this._formWidget) ? this._formWidget.getFormData() : null
                    }
                }, {
                    CSS_PREFIX: "sqs-checkout-form-custom-form",
                    HANDLEBARS_TEMPLATE: "checkout-form-custom-form.html",
                    HANDLEBARS_SAVED_FIELDSET_TEMPLATE: "checkout-saved-custom-form.html",
                    ATTRS: {
                        "strings.name": {
                            value: "More"
                        },
                        customForm: {
                            value: {
                                fields: []
                            },
                            validator: b.Lang.isValue
                        },
                        formId: {
                            value: null
                        },
                        model: {
                            value: null,
                            validator: function(a) {
                                return b.instanceOf(a, b.Squarespace.Models.ShoppingCart)
                            }
                        }
                    }
                })
        }, "1.0", {
            requires: "base node squarespace-async-form squarespace-checkout-form-custom-form-template squarespace-checkout-form-section squarespace-checkout-saved-custom-form-template squarespace-commerce-utils squarespace-localities squarespace-mixins-google-places-autocomplete squarespace-ui-templates squarespace-util".split(" ")
        })
    },
    3293: function(k, l) {
        YUI.add("squarespace-checkout-form-customer-info", function(c) {
            c.namespace("Squarespace.Widgets");
            c.Squarespace.Widgets.CheckoutFormCustomerInfo = c.Base.create("CheckoutFormCustomerInfo", c.Base, [], {
                _bindCustomerInfoEvents: function() {
                    var c = this.get("contentBox").one('input[name="email"]');
                    c && this._registerEvent(c.on("blur", this._handleEmailBlur, this))
                },
                _handleEmailBlur: function(f) {
                    f = (f = f.target) && f.get("value").trim();
                    if (c.Squarespace.EmailUtils.isValid(f)) {
                        var b = this.get("model");
                        null !== b && (b.updateCustomerInfo(f), c.Squarespace.CommerceAnalytics.checkoutEmailEntered(b))
                    }
                }
            }, {})
        }, "1.0", {
            requires: ["base", "node", "squarespace-email-utils"]
        })
    },
    3294: function(k, l, c) {
        var f = c(504);
        YUI.add("squarespace-checkout-form-payment", function(b) {
            b.namespace("Squarespace.Widgets");
            var c = b.Squarespace.Widgets.CheckoutFormPayment = b.Base.create("checkoutFormPayment", b.Squarespace.Widgets.CheckoutFormAddress, [], {
                initializer: function() {
                    this.get("requiresShipping") || this.set("useAddressForShipping", !0)
                },
                renderUI: function() {
                    c.superclass.renderUI.call(this);
                    var a = this.get("contentBox");
                    this._creditCardInputs = {
                        cardNumber: a.one("#card-number input"),
                        cardExpiryMonth: a.one("#card-expiry-month select"),
                        cardExpiryYear: a.one("#card-expiry-year select"),
                        cvc: a.one("#cvc input")
                    };
                    this._creditCardFields = {
                        cardNumber: a.one("#card-number"),
                        cardExpiryMonth: a.one("#card-expiry-month"),
                        cardExpiryYear: a.one("#card-expiry-year"),
                        cvc: a.one("#cvc")
                    };
                    this._hiddenInputs = {
                        cardHolderName: a.one('input[name="cardHolderName"]'),
                        stripeToken: a.one('input[name="stripeToken"]')
                    };
                    b.Array.each(this.get("optionalHiddenFields"), function(c) {
                        var d = a.one('input[name="' + c + '"]');
                        if (b.Lang.isValue(d)) this._hiddenInputs[c] = d;
                        else throw Error("Optional hidden field input element could not be found.");
                    }, this);
                    "USD" !== this.get("storeCurrencyCode") && a.one(".card-discover").hide();
                    this._toggleLockedFields();
                    this._syncBillingFieldsWithCheckbox()
                },
                bindUI: function() {
                    c.superclass.bindUI.call(this);
                    this.after("inTestModeChange", this._toggleLockedFields,
                        this);
                    this.get("requiresShipping") && this.get("contentBox").one('input[name="billToShipping"]').after("change", this._syncBillingFieldsWithCheckbox, this);
                    this.after("stateChange", this._syncBillingFieldsWithCheckbox, this);
                    this.after("paymentRequiredChange", this.syncUI, this);
                    this._bindLockedToolTip()
                },
                syncUI: function() {
                    c.superclass.syncUI.call(this);
                    this._toggleRequiredFields()
                },
                _syncBillingFieldsWithCheckbox: function() {
                    var a = this.get("contentBox").one("#billing-address");
                    if (this.get("isLinkedToShipping")) {
                        var b =
                            this.get("shippingSection").getValues();
                        this._updateStateFieldForSelectedCountry(b.shippingCountry);
                        this._syncRequiredFieldsForSelectedCountry();
                        this.setValues({
                            billingFirstName: b.shippingFirstName,
                            billingLastName: b.shippingLastName,
                            billingAddress1: b.shippingAddress1,
                            billingAddress2: b.shippingAddress2,
                            billingCity: b.shippingCity,
                            billingState: b.shippingState,
                            billingZip: b.shippingZip,
                            billingCountry: b.shippingCountry
                        });
                        a.toggleClass("locked", !0);
                        a.all("input, select").each(function(a) {
                            a.setAttribute("readonly", !0);
                            a.setAttribute("disabled", "disabled")
                        })
                    } else a.toggleClass("locked", !1), a.all("input, select").each(function(a) {
                        a.removeAttribute("readonly");
                        a.removeAttribute("disabled")
                    }), this.setValues({
                        billingFirstName: "",
                        billingLastName: "",
                        billingAddress1: "",
                        billingAddress2: "",
                        billingCity: "",
                        billingState: "",
                        billingZip: ""
                    })
                },
                setCreditCardValues: function(a) {
                    b.Object.each(a, b.bind(function(a, b) {
                        this._setFieldValue(this._creditCardInputs[b], a)
                    }, this))
                },
                getCreditCardValues: function() {
                    return this._extractValuesFromFields(this._creditCardInputs)
                },
                setHiddenValues: function(a) {
                    b.Object.each(a, b.bind(function(a, b) {
                        this._setFieldValue(this._hiddenInputs[b], a)
                    }, this))
                },
                getValues: function() {
                    var a = c.superclass.getValues.call(this);
                    this._extractValuesFromFields(this._hiddenInputs);
                    if (this.get("isLinkedToShipping")) {
                        var b = this.get("shippingSection").getValues();
                        a.cardHolderName = b.shippingFirstName + " " + b.shippingLastName
                    } else a.cardHolderName = a.billingFirstName + " " + a.billingLastName;
                    return a
                },
                _extractValuesFromFields: function(a) {
                    return b.Array.hash(b.Object.keys(a),
                        b.Array.map(b.Object.values(a), function(a) {
                            return a.get("value")
                        }))
                },
                getLocationForShipping: function() {
                    var a = this.getValues();
                    return {
                        country: a.billingCountry,
                        state: a.billingState,
                        zip: a.billingZip
                    }
                },
                _getSelectedCountry: function() {
                    return this.get("isLinkedToShipping") ? this.get("shippingSection").getValues().shippingCountry : this.getValues().billingCountry
                },
                _onContinue: function() {
                    this.fire("continue")
                },
                _populateFieldsFromAc: function(a) {
                    this.setValues({
                        billingAddress1: a.address,
                        billingCountry: a.country,
                        billingCity: a.city,
                        billingState: a.state,
                        billingZip: a.zip
                    })
                },
                _toggleRequiredFields: function() {
                    var a = this.get("paymentRequired"),
                        b = this._creditCardFields;
                    b.cvc.toggleClass("required", a);
                    b.cardNumber.toggleClass("required", a)
                },
                _toggleLockedFields: function() {
                    var a = this.get("inTestMode"),
                        b = this.get("storeState") === f.NOT_CONNECTED,
                        c = this.get("contentBox"),
                        e = this._creditCardInputs,
                        g = this._creditCardInputs.cardNumber;
                    c.one("#credit-card").toggleClass("locked", a || b);
                    a || b ? (this.setCreditCardValues({
                        cardNumber: "4242424242424242",
                        cardExpiryMonth: "4",
                        cardExpiryYear: (new Date).getFullYear() + 1,
                        cvc: "323"
                    }), g.setAttribute("readonly", !0), e.cardExpiryMonth.setAttribute("disabled", "disabled"), e.cardExpiryYear.setAttribute("disabled", "disabled"), e.cvc.setAttribute("readonly", !0)) : (this.setCreditCardValues({
                        cardNumber: "",
                        cardExpiryMonth: (new Date).getMonth(),
                        cardExpiryYear: (new Date).getFullYear(),
                        cvc: ""
                    }), g.removeAttribute("readonly"), e.cardExpiryMonth.removeAttribute("disabled"), e.cardExpiryYear.removeAttribute("disabled"), e.cvc.removeAttribute("readonly"))
                },
                _bindLockedToolTip: function() {
                    this._creditCardInputs.cardNumber.on("click", function() {
                        var a = this.get("contentBox").one("#credit-card");
                        this.get("inTestMode") && new b.Squarespace.Widgets.Information({
                            "strings.title": "Store Not Live",
                            "strings.message": 'This store has not yet gone live. You may try the checkout process and place a test order. We have prefilled a "Test" credit card number for you.',
                            hideAfterTime: 7E3,
                            position: b.Squarespace.Widgets.Confirmation.ANCHOR.ELEMENT,
                            anchor: a
                        });
                        this.get("storeState") ===
                            f.NOT_CONNECTED && new b.Squarespace.Widgets.Information({
                                "strings.title": "Payments Not Connected",
                                "strings.message": "A payment gateway is not connected. Checkout will be disabled. Please go to Store Settings to connect Stripe.",
                                hideAfterTime: 7E3,
                                position: b.Squarespace.Widgets.Confirmation.ANCHOR.ELEMENT,
                                anchor: a
                            })
                    }, this)
                },
                showQueueExplanation: function() {
                    this.get("contentBox").one(".wait-in-queue-message").show()
                },
                lock: function() {
                    this.get("contentBox").one("#place-order-button").setContent(this.get("strings.pendingText")).set("disabled", !0)
                },
                unlock: function() {
                    this.get("contentBox").one("#place-order-button").setContent(this.get("strings.submitText")).set("disabled", !1)
                }
            }, {
                CSS_PREFIX: "sqs-checkout-form-payment",
                HANDLEBARS_TEMPLATE: "checkout-form-payment.html",
                ATTRS: {
                    strings: {
                        value: {
                            submitText: "Place Order",
                            pendingText: "Placing Order ..."
                        }
                    },
                    optionalHiddenFields: {
                        value: []
                    },
                    isLinkedToShipping: {
                        getter: function() {
                            return this.get("requiresShipping") && this.get("billToShippingAddress")
                        }
                    },
                    billToShippingAddress: {
                        getter: function() {
                            var a = this.get("contentBox").one('input[name="billToShipping"]');
                            return !b.Lang.isValue(a) ? !1 : a.get("checked")
                        }
                    },
                    inTestMode: {
                        validator: b.Squarespace.AttrValidators.isBoolean
                    },
                    storeCurrencyCode: {
                        value: null
                    },
                    storeState: {
                        value: null
                    },
                    shippingSection: {
                        value: null
                    },
                    requiresShipping: {
                        value: !1
                    },
                    paymentRequired: {
                        value: !0
                    }
                }
            })
        }, "1.0", {
            requires: "base node squarespace-attr-validators squarespace-basic-check squarespace-checkout-form-address squarespace-checkout-form-payment-template squarespace-checkout-form-section squarespace-hb-date-options squarespace-widgets-information".split(" ")
        })
    },
    3295: function(k, l) {
        YUI.add("squarespace-checkout-form-section", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.CheckoutFormSection = c.Base.create("checkoutFormSection", c.Squarespace.Widgets.SSWidget, [], {
                initializer: function() {
                    this.publish("continue-clicked", {
                        preventable: !0,
                        defaultFn: this._onContinue
                    })
                },
                renderUI: function() {
                    f.superclass.renderUI.call(this);
                    Modernizr && !Modernizr.input.placeholder && this.get("boundingBox").addClass("show-labels");
                    this.get("contentBox").all(".field-element").plug(c.Squarespace.Plugin.PulseWarn, {
                        iterations: 1,
                        useClass: !0,
                        targetClass: "warn",
                        interval: 1300
                    });
                    switch (this.get("state")) {
                        case "editing":
                            this.setStateEditing();
                            break;
                        case "complete":
                            this.setStateComplete();
                            break;
                        case "incomplete":
                            this.setStateIncomplete()
                    }
                },
                bindUI: function() {
                    f.superclass.bindUI.call(this);
                    if (c.Lang.isValue(this.get("model"))) this.get("model").on("change", this.syncUI, this);
                    var b = this.get("contentBox");
                    b.one(".continue-button").on("click", function() {
                        this.fire("continue-clicked")
                    }, this);
                    b.one(".edit-button").on("click",
                        this._onEdit, this)
                },
                setStateEditing: function() {
                    var b = this.get("boundingBox");
                    this._removeSaved();
                    b.removeClass("complete");
                    b.removeClass("incomplete");
                    b.addClass("editing");
                    this.set("state", "editing");
                    return this
                },
                scrollIntoView: function() {
                    this.get("boundingBox").scrollIntoView(!0)
                },
                setStateComplete: function() {
                    var b = this.get("contentBox").one(".saved-fieldset");
                    b && b.remove(!0);
                    this._renderSavedFieldset(function() {
                        var b = this.get("boundingBox");
                        b.removeClass("editing");
                        b.removeClass("incomplete");
                        b.addClass("complete");
                        this.set("state", "complete")
                    });
                    return this
                },
                _renderSavedFieldset: function(b) {
                    var f = this.getProperty("HANDLEBARS_SAVED_FIELDSET_TEMPLATE");
                    f && this.get("contentBox").append(c.Squarespace.UITemplates.render(f, this.getValues()));
                    c.Lang.isValue(b) && b.call(this)
                },
                setStateIncomplete: function() {
                    var b = this.get("boundingBox");
                    this._removeSaved();
                    this._clearErrors();
                    b.removeClass("editing");
                    b.removeClass("complete");
                    b.addClass("incomplete");
                    this.set("state", "incomplete");
                    return this
                },
                getValues: function() {
                    var b = {};
                    this.get("contentBox").all(".field").each(function(c) {
                        c = c.one(".field-element");
                        var a = c.get("type"),
                            f = c.get("name"),
                            d = null,
                            d = "checkbox" === a ? c.get("checked") : c.get("value").trim();
                        "" === d && (d = null);
                        b[f] = d
                    }, this);
                    return b
                },
                setValues: function(b) {
                    this.get("contentBox").all(".field-element").each(function(f) {
                        var a = f.get("name");
                        c.Object.hasKey(b, a) && this._setFieldValue(f, b[a])
                    }, this)
                },
                _setFieldValue: function(b, f) {
                    if ("select-one" === b.get("type")) {
                        var a = b.one('option[value="' + f + '"]');
                        c.Lang.isValue(a) &&
                            a.set("selected", !0)
                    } else b.set("value", f)
                },
                renderErrors: function(b) {
                    this._clearErrors();
                    var f = [],
                        a = [],
                        h = [],
                        d = [],
                        e = [],
                        q = [];
                    c.Array.each(b, function(b) {
                        var c = this.getProperty("FIELD_ERROR_TYPES"),
                            r = b.type,
                            m = b.field;
                        m && this._renderFieldError(m);
                        r === c.REQUIRED ? f.push(m.getData("label")) : r === c.VALIDATION ? a.push(m.getData("label")) : r === c.STRIPE ? h.push(b.message) : r === c.CUSTOM ? d.push(b.message) : r === c.FORM_FIELD ? e.push(b) : r === c.HEADER && q.push(b)
                    }, this);
                    var r = b = "",
                        m = "",
                        k = "";
                    0 < f.length && (b = c.Array.dedupe(f).join(", ") +
                        " required. ");
                    0 < a.length && (r = c.Array.dedupe(a).join(", ") + " invalid.");
                    0 < h.length && (m = c.Array.dedupe(h).join(". "));
                    0 < d.length && (k = c.Array.dedupe(d).join(". "));
                    b = c.Node.create('<div class="error-summary">' + b + r + m + k + "</div>");
                    this.get("contentBox").one(".button").insert(b, "before");
                    c.Array.each(e, function(a) {
                        c.one("#" + a.fieldId).addClass("error").insert('<div class="form-field-error">' + a.message + "</div>", 0)
                    });
                    c.Array.each(q, function(a) {
                        this.get("contentBox").one(".custom-form").insert('<div class="header-error">' +
                            a.message + "</div>", 0)
                    }, this)
                },
                _onContinue: function() {
                    this.validate().then(c.bind(function(b) {
                        0 < b.length ? this.renderErrors(b) : (this._clearErrors(), this.fire("continue"))
                    }, this))
                },
                _onEdit: function() {
                    this.fire("edit")
                },
                _fetchAsyncValidatedErrors: function() {
                    return new c.Promise(function(b) {
                        b([])
                    })
                },
                _getLocalErrors: function() {
                    var b = [];
                    this.get("contentBox").all(".field").each(function(c) {
                        c.hasClass("required") && (c = this._validateField(c)) && b.push(c)
                    }, this);
                    return b
                },
                validate: function() {
                    var b = this._getLocalErrors();
                    return new c.Promise(c.bind(function(f) {
                        this._fetchAsyncValidatedErrors().then(c.bind(function(a) {
                            a = b.concat(a);
                            f(a)
                        }, this))
                    }, this))
                },
                _validateField: function(b) {
                    var c = b.one(".field-element");
                    c.get("name");
                    if ("" === c.get("value").trim()) return {
                        type: this.getProperty("FIELD_ERROR_TYPES").REQUIRED,
                        field: b
                    }
                },
                _clearErrors: function() {
                    var b = this.get("contentBox");
                    b.all(".error-summary, .form-field-error, .header-error").remove(!0);
                    b.all(".field, .form-item").removeClass("error")
                },
                _renderFieldError: function(b) {
                    var c =
                        b.one(".field-element");
                    c.pulseWarn.warn();
                    b.addClass("error");
                    c.once(["click", "change", "focus"], function() {
                        b.removeClass("error")
                    }, this)
                },
                _removeSaved: function() {
                    var b = this.get("contentBox").one(".saved-fieldset");
                    b && b.remove(!0)
                }
            }, {
                CSS_PREFIX: "sqs-checkout-form-section card",
                FIELD_ERROR_TYPES: {
                    REQUIRED: 1,
                    VALIDATION: 2,
                    STRIPE: 3,
                    CUSTOM: 4,
                    FORM_FIELD: 5,
                    HEADER: 6
                },
                ATTRS: {
                    model: {
                        value: null
                    },
                    state: {
                        value: "incomplete"
                    }
                }
            })
        }, "1.0", {
            requires: "base node squarespace-plugin-pulsewarn squarespace-ss-widget squarespace-ui-templates thirdparty-modernizr".split(" ")
        })
    },
    3296: function(k, l) {
        YUI.add("squarespace-checkout-form-shipping-info", function(c) {
                c.namespace("Squarespace.Widgets");
                var f = c.Squarespace.Widgets.CheckoutFormShippingInfo = c.Base.create("checkoutFormShipping", c.Squarespace.Widgets.CheckoutFormAddress, [c.Squarespace.Widgets.CheckoutFormCustomerInfo], {
                    bindUI: function() {
                        f.superclass.bindUI.call(this);
                        this._bindCustomerInfoEvents();
                        this.on("continue", function() {
                            c.Squarespace.CommerceAnalytics.checkoutContactShippingCompleted(this.get("model"))
                        }, this)
                    },
                    _onContinue: function() {
                        if (this.get("model").isRecalculating()) this.get("model").once("recalculate-end",
                            function() {
                                f.superclass._onContinue.call(this)
                            }, this);
                        f.superclass._onContinue.call(this)
                    },
                    getValues: function() {
                        var b = f.superclass.getValues.call(this);
                        b.requiresShipping = this.get("model").get("requiresShipping");
                        return b
                    },
                    setValues: function(b) {
                        f.superclass.setValues.call(this, b);
                        c.Object.hasKey(b, "selectedShippingOption") && this._shippingOptionsWidget.setSelectedOption(b.selectedShippingOption)
                    },
                    getLocationForShipping: function() {
                        var b = this.getValues();
                        return {
                            country: b.shippingCountry,
                            state: b.shippingState,
                            zip: b.shippingZip
                        }
                    },
                    _populateFieldsFromAc: function(b) {
                        this.setValues({
                            shippingAddress1: b.address,
                            shippingCountry: b.country,
                            shippingCity: b.city,
                            shippingState: b.state,
                            shippingZip: b.zip
                        })
                    }
                }, {
                    CSS_PREFIX: "sqs-checkout-form-shipping-info",
                    HANDLEBARS_TEMPLATE: "checkout-form-shipping-info.html",
                    HANDLEBARS_SAVED_FIELDSET_TEMPLATE: "checkout-saved-shipping-info.html",
                    ATTRS: {
                        useAddressForShipping: {
                            value: !0
                        },
                        optionalFields: {
                            value: {
                                showMailingList: !0
                            }
                        },
                        enableMailingListOptInByDefault: {
                            validator: c.Squarespace.AttrValidators.isBoolean
                        }
                    }
                })
            },
            "1.0", {
                requires: "base node squarespace-checkout-form-address squarespace-checkout-form-customer-info squarespace-checkout-form-shipping-info-template squarespace-checkout-saved-shipping-info-template squarespace-hb-money-string squarespace-models-shopping-cart squarespace-shipping-options-list".split(" ")
            })
    },
    3301: function(k, l) {
        YUI.add("squarespace-commerce", function(c) {
            c.namespace("Squarespace.Commerce");
            var f = c.config.win.Static;
            c.Squarespace.Commerce.initializeCommerce = function() {
                c.Squarespace.ProductUtils.initializeVariantDropdowns();
                c.Squarespace.CartUtils.initializeAddToCartButtons();
                if (!c.Squarespace.Commerce.isExpressCheckout() && !c.Lang.isValue(c.one(".show-cart-page")) && !c.Lang.isValue(c.one(".sqs-custom-cart"))) {
                    var b = c.one(".sqs-cart-dropzone");
                    c.Lang.isNull(b) && (c.Lang.isValue(c.one(".absolute-cart-box")) ? b = c.one(".absolute-cart-box") : (b = c.Node.create('<div class="absolute-cart-box"></div>'), c.one(c.config.doc.body).append(b)));
                    var g = b.one(".sqs-pill-shopping-cart");
                    c.Widget.getByNode(g) || new c.Squarespace.Widgets.PillShoppingCart({
                        model: c.Squarespace.Singletons.ShoppingCart,
                        useLightCart: f.SQUARESPACE_CONTEXT.websiteSettings.storeSettings.useLightCart,
                        render: b
                    })
                }
                c.Lang.isValue(c.one(".sqs-custom-cart")) && c.all(".sqs-custom-cart").each(function(a) {
                    (new c.Squarespace.Widgets.TemplateIntegratedShoppingCart({
                        model: c.Squarespace.Singletons.ShoppingCart,
                        boundingBox: a,
                        srcNode: a
                    })).render()
                });
                c.Lang.isNull(c.Cookie.get("CART")) ? c.all(".sqs-add-to-cart-button-wrapper").setStyle("visibility", "visible") : c.Squarespace.Singletons.ShoppingCart.load(function() {
                    c.all(".sqs-add-to-cart-button-wrapper").setStyle("visibility",
                        "visible")
                }, this);
                c.Lang.isValue(c.one("#sqs-shopping-cart-wrapper")) && new c.Squarespace.Widgets.FullPageShoppingCart({
                    model: c.Squarespace.Singletons.ShoppingCart,
                    linkItems: !0,
                    render: c.one("#sqs-shopping-cart-wrapper")
                })
            };
            c.config.win.Squarespace.onInitialize(c, c.Squarespace.Commerce.initializeCommerce)
        }, "1.0", {
            requires: "event-base-ie overlay squarespace-cart-utils squarespace-donate-form squarespace-full-page-shopping-cart squarespace-models-shopping-cart squarespace-pill-shopping-cart squarespace-product-utils squarespace-template-integrated-shopping-cart".split(" ")
        })
    },
    3304: function(k, l, c) {
        var f = c(1);
        YUI.add("squarespace-contribution-summary", function(b) {
            b.namespace("Squarespace.Widgets");
            var c = b.Squarespace.Widgets.ContributionSummary = b.Base.create("ContributionSummary", b.Squarespace.Widgets.CheckoutFormSection, [], {
                _getHBTemplateContext: function() {
                    var a = c.superclass._getHBTemplateContext.call(this);
                    b.Array.each(a.donatePage.suggestedContributions, function(a) {
                        a.amountDollars = b.Squarespace.Commerce.moneyFormat(a.amountCents)
                    });
                    return a
                },
                bindUI: function() {
                    c.superclass.bindUI.call(this);
                    var a = this.get("contentBox");
                    a.delegate("click", function(b) {
                        "other" == b.target.get("value") && a.one('input[name="contributionAmount"]').select()
                    }, 'input[type="radio"]')
                },
                renderUI: function() {
                    c.superclass.renderUI.call(this);
                    var a = this.get("contentBox");
                    a.one('input[name="contributionAmount"]').plug(b.Squarespace.Plugin.MoneyFormatter);
                    var f = this.get("donatePage").suggestedContributions;
                    b.Lang.isValue(f) && 0 < f.length ? a.one(".prompt").setContent("Select an amount:") : a.one(".prompt").setContent("Enter an amount:")
                },
                _getLocalErrors: function() {
                    var a = c.superclass._getLocalErrors.call(this);
                    return 50 > this.getDonationAmountCents() ? [{
                        type: this.getProperty("FIELD_ERROR_TYPES").CUSTOM,
                        message: f("You must donate at least 0.50")
                    }] : a
                },
                getDonationAmountCents: function() {
                    var a = this.get("contentBox"),
                        c = this.get("donatePage").suggestedContributions;
                    return b.Lang.isValue(c) && 0 < c.length ? (c = this._getCheckedRadio(), !b.Lang.isValue(c) ? 0 : "other" == c.get("value") ? a.one('input[name="contributionAmount"]').moneyFormatterPlugin.get("data") :
                        c.get("value")) : a.one('input[name="contributionAmount"]').moneyFormatterPlugin.get("data")
                },
                _getCheckedRadio: function() {
                    var a;
                    this.get("contentBox").one(".contribution-option-list").all('input[type="radio"]').each(function(b) {
                        b.get("checked") && (a = b)
                    });
                    return a
                },
                getValues: function() {
                    return {
                        donationAmount: b.Squarespace.Commerce.moneyString(this.getDonationAmountCents()),
                        title: this.get("donatePage").title
                    }
                }
            }, {
                CSS_PREFIX: "sqs-contribution-summary",
                HANDLEBARS_TEMPLATE: "contribution-summary.html",
                HANDLEBARS_SAVED_FIELDSET_TEMPLATE: "checkout-saved-contribution.html",
                ATTRS: {
                    strings: {
                        value: {
                            prompt: null
                        }
                    },
                    donatePage: {
                        value: null
                    }
                }
            })
        }, "1.0", {
            requires: "base node squarespace-async-form squarespace-checkout-form-section squarespace-checkout-saved-contribution-template squarespace-commerce-utils squarespace-contribution-summary-template squarespace-hb-money-string squarespace-plugin-money-formatter squarespace-ui-templates".split(" ")
        })
    },
    3392: function(k, l, c) {
        var f = c(1),
            b = c(20),
            g = c(504);
        YUI.add("squarespace-donate-form", function(a) {
            a.namespace("Squarespace.Widgets");
            var c =
                a.Squarespace.Widgets.DonateForm = a.Base.create("DonateForm", a.Squarespace.Widgets.SSWidget, [], {
                    initializer: function() {
                        var b = this.get("donatePage");
                        this._contributionSection = new a.Squarespace.Widgets.ContributionSummary({
                            donatePage: b,
                            state: "editing"
                        });
                        this._contactSection = new a.Squarespace.Widgets.CheckoutFormContactInfo({
                            enableMailingListOptInByDefault: this.get("enableMailingListOptInByDefault"),
                            optionalFields: this.get("optionalFields"),
                            state: "incomplete"
                        });
                        this._customFormSection = new a.Squarespace.Widgets.CheckoutCustomForm({
                            state: "incomplete",
                            customForm: b.customForm,
                            formId: b.customFormId
                        });
                        this._paymentSection = new a.Squarespace.Widgets.CheckoutFormPayment({
                            strings: {
                                submitText: b.buttonLabel,
                                pendingText: f("Submitting ...")
                            },
                            state: "incomplete",
                            optionalHiddenFields: ["donationAmountCents", "donatePageId", "email", "phone", "joinMailingList"],
                            inTestMode: this.get("inTestMode"),
                            countriesAllowed: a.Squarespace.Localities.getAllCountryNames(),
                            storeCurrencyCode: this.get("storeCurrencyCode")
                        });
                        this.formSubmitted = !1
                    },
                    destructor: function() {
                        this._contributionSection.destroy(!0);
                        this._contributionSection = null;
                        this._contactSection.destroy(!0);
                        this._contactSection = null;
                        this._customFormSection.destroy(!0);
                        this._customFormSection = null;
                        this._paymentSection.destroy(!0);
                        this._paymentSection = null
                    },
                    renderUI: function() {
                        c.superclass.renderUI.call(this);
                        var b;
                        b = a.Data.addCrumb("/commerce/submit-donation");
                        b = a.Node.create('<form action="' + b + '" method="POST"></form>');
                        b.append(a.Node.create('<input type="hidden" name="customFormSubmission" />'));
                        this._contributionSection.render(a.one("#summary-wrapper"));
                        this._contactSection.render(a.one("#summary-wrapper"));
                        this._customFormSection.render(a.one("#summary-wrapper"));
                        this._paymentSection.render(b);
                        this._customFormSection.setStateIncomplete();
                        this._paymentSection.setStateIncomplete();
                        this.get("contentBox").append(b)
                    },
                    bindUI: function() {
                        c.superclass.bindUI.call(this);
                        var a = this._contributionSection,
                            b = this._contactSection,
                            f = this._customFormSection,
                            g = this._paymentSection;
                        a.on("continue", function() {
                            a.setStateComplete();
                            b.setStateEditing()
                        });
                        a.on("edit", function() {
                            a.setStateEditing();
                            b.setStateIncomplete();
                            f.setStateIncomplete();
                            g.setStateIncomplete()
                        });
                        b.on("edit", function() {
                            b.setStateEditing();
                            f.setStateIncomplete();
                            g.setStateIncomplete()
                        });
                        b.on("continue", function() {
                            b.setStateComplete();
                            this._hasCustomForm() ? f.setStateEditing() : g.setStateEditing()
                        }, this);
                        f.on("continue", function() {
                            f.setStateComplete();
                            g.setStateEditing()
                        });
                        f.on("edit", function() {
                            f.setStateEditing();
                            g.setStateIncomplete()
                        });
                        g.on("continue", this._submit, this)
                    },
                    lock: function() {
                        var a = this.get("contentBox");
                        this.fire("lock");
                        a.addClass("submitting");
                        this._paymentSection.lock()
                    },
                    unlock: function() {
                        var a = this.get("contentBox");
                        this.fire("unlock");
                        a.removeClass("submitting");
                        this._paymentSection.unlock()
                    },
                    _hasCustomForm: function() {
                        var b = this.get("donatePage").customForm;
                        return !a.Lang.isValue(b) ? !1 : 0 < b.fields.length
                    },
                    _submit: function() {
                        var b = this.get("donatePage"),
                            c = a.bind(function(b) {
                                b = this._paymentSection.getCreditCardValues();
                                var c = this._paymentSection.getValues();
                                Stripe.createToken({
                                    number: b.cardNumber,
                                    cvc: b.cvc,
                                    exp_month: b.cardExpiryMonth,
                                    exp_year: b.cardExpiryYear,
                                    name: c.cardHolderName,
                                    address_line1: c.billingAddress1,
                                    address_line2: c.billingAddress2,
                                    address_state: c.billingState,
                                    address_city: c.billingCity,
                                    address_country: c.billingCountry,
                                    address_zip: c.billingZip
                                }, a.bind(this._stripeResponseHandler, this))
                            }, this);
                        this._validateSubmit().then(a.bind(function(f) {
                            if (f)
                                if (this.lock(), !0 === b.queuedSubmitEnabled) {
                                    var g = new a.Squarespace.TokenQueue;
                                    g.on("estimatedWaitChanged", function() {
                                        this._showCountdown(g.estimatedTime)
                                    }, this);
                                    g.waitInQueue().then(a.bind(c,
                                        this))
                                } else c()
                        }, this))
                    },
                    _validateSubmit: function() {
                        return new a.Promise(a.bind(function(c) {
                            this._contributionSection.validate() || c(!1);
                            this._paymentSection.validate().then(a.bind(function(e) {
                                0 < e.length && (this._paymentSection.renderErrors(e), c(!1));
                                50 > this._contributionSection.getDonationAmountCents() && (new a.Squarespace.Widgets.Alert({
                                        "strings.title": f("Cannot Complete Donation"),
                                        "strings.message": b(f("Your contribution must be at least {sub1}0.50 to continue."), {
                                            sub1: a.Squarespace.Commerce.currencySymbol()
                                        })
                                    }),
                                    c(!1));
                                Static.SQUARESPACE_CONTEXT.websiteSettings.storeSettings.storeState === g.NOT_CONNECTED && (new a.Squarespace.Widgets.Alert({
                                    "strings.title": f("Payments Not Connected"),
                                    "strings.message": f("This site has not connected a payment gateway. Transactions are disabled and you cannot complete this donation.")
                                }), c(!1));
                                c(!0)
                            }, this))
                        }, this))
                    },
                    _stripeResponseHandler: function(a, b) {
                        var c = b.error,
                            f = this.get("contentBox").one("form"),
                            g = this._contributionSection;
                        if (c) this.unlock(), f = this._paymentSection, f.renderErrors([{
                            type: f.getProperty("FIELD_ERROR_TYPES").STRIPE,
                            message: c.message
                        }]);
                        else {
                            var c = this._contactSection.getValues(),
                                h = this._paymentSection.getValues();
                            this._paymentSection.setHiddenValues({
                                stripeToken: b.id,
                                cardHolderName: h.cardHolderName,
                                donationAmountCents: g.getDonationAmountCents(),
                                email: c.email,
                                joinMailingList: c.joinMailingList,
                                phone: c.phone,
                                donatePageId: this.get("donatePage").id
                            });
                            g = this._customFormSection.getCustomFormSubmission();
                            f.one('input[name="customFormSubmission"]').set("value", JSON.stringify(g));
                            this._submitForm()
                        }
                    },
                    _submitForm: function() {
                        var a =
                            this.get("contentBox").one("form");
                        !1 === this.formSubmitted && (this.formSubmitted = !0, a.submit())
                    }
                }, {
                    CSS_PREFIX: "sqs-checkout-form",
                    ATTRS: {
                        countriesAllowed: {
                            value: []
                        },
                        storeCurrencyCode: {
                            value: null
                        },
                        optionalFields: {
                            value: null
                        },
                        donatePage: {
                            value: null
                        },
                        inTestMode: {
                            value: !1
                        },
                        enableMailingListOptInByDefault: {
                            validator: a.Squarespace.AttrValidators.isBoolean,
                            value: !0
                        }
                    }
                })
        }, "1.0", {
            requires: "base node squarespace-attr-validators squarespace-checkout-form-contact-info squarespace-checkout-form-custom-form squarespace-checkout-form-payment squarespace-checkout-form-shipping-info squarespace-commerce-utils squarespace-contribution-summary squarespace-localities squarespace-ss-widget squarespace-ui-base squarespace-util squarespace-widgets-alert".split(" ")
        })
    },
    3425: function(k, l) {
        YUI.add("squarespace-full-page-shopping-cart", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.FullPageShoppingCart = c.Base.create("fullPageShoppingCart", c.Squarespace.Widgets.TableShoppingCart, [], {
                renderUI: function() {
                    f.superclass.renderUI.call(this);
                    this._spinner = new c.Squarespace.Spinner({
                        render: this.get("contentBox").one(".loading-spinner"),
                        size: 50,
                        color: "dark"
                    })
                },
                bindUI: function() {
                    f.superclass.bindUI.call(this);
                    var b = this.get("model");
                    this.get("contentBox").one(".checkout-button").on("click",
                        c.Squarespace.Commerce.goToCheckoutPage, this);
                    b.on("recalculate-start", this._setLoadingState, this);
                    b.on("recalculate-end", this._setLoadedState, this)
                },
                _setLoadingState: function() {
                    var b = this.get("contentBox");
                    b.all("input").setAttribute("disabled", !0);
                    b.addClass("loading-cart")
                },
                _setLoadedState: function() {
                    var b = this.get("contentBox");
                    c.later(350, this, function() {
                        b.all("input").removeAttribute("disabled");
                        b.removeClass("loading-cart")
                    })
                }
            }, {
                CSS_PREFIX: "sqs-fullpage-shopping-cart",
                HANDLEBARS_TEMPLATE: "full-page-shopping-cart.html",
                HANDLEBARS_ITEM_TEMPLATE: "full-page-shopping-cart-item.html"
            })
        }, "1.0", {
            requires: "base cookie node squarespace-commerce-utils squarespace-full-page-shopping-cart-item-template squarespace-full-page-shopping-cart-template squarespace-spinner squarespace-table-shopping-cart".split(" ")
        })
    },
    3428: function(k, l) {
        YUI.add("squarespace-hb-date-options", function(c) {
            c.Handlebars.registerHelper("month-options", function(f) {
                var b = "";
                c.Array.each("January February March April May June July August September October November December".split(" "),
                    function(g, a) {
                        var h = a + 1,
                            d = h.toString();
                        1 === d.length && (d = "0" + d);
                        c.Lang.isUndefined(f.hash["short"]) && (d += " " + g);
                        b += '<option value="' + h + '">' + d + "</option>"
                    });
                return new c.Handlebars.SafeString(b)
            });
            c.Handlebars.registerHelper("year-options", function(f) {
                f = (new Date).getFullYear();
                for (var b = "", g = f; g < f + 10; g++) b += '<option value="' + g + '">' + g + "</option>";
                return new c.Handlebars.SafeString(b)
            }, this)
        }, "1.0", {
            requires: ["handlebars-base"]
        })
    },
    3430: function(k, l) {
        YUI.add("squarespace-hb-money-string", function(c) {
            c.Handlebars.registerHelper("money-string",
                function(f, b) {
                    return new c.Handlebars.SafeString(c.Squarespace.Commerce.moneyString(f))
                })
        }, "1.0", {
            requires: ["handlebars-base", "squarespace-commerce-utils"]
        })
    },
    3483: function(k, l) {
        YUI.add("squarespace-pill-shopping-cart", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.PillShoppingCart = c.Base.create("pillShoppingCart", c.Squarespace.Widgets.SSWidget, [], {
                renderUI: function() {
                    f.superclass.renderUI.call(this);
                    this.get("boundingBox").plug(c.Squarespace.Animations.Scalable, {
                        duration: 0.25
                    });
                    this._hide(!0);
                    this.get("contentBox").addClass(this.get("useLightCart") ? "light" : "dark")
                },
                bindUI: function() {
                    f.superclass.bindUI.call(this);
                    this.get("model").on("change", this.syncUI, this);
                    this.get("contentBox").on("click", function() {
                        c.config.win.location = "/commerce/show-cart"
                    })
                },
                syncUI: function() {
                    f.superclass.syncUI.call(this);
                    var b = this.get("model"),
                        g = b.get("totalQuantity"),
                        a = this.get("contentBox"),
                        h = function() {
                            a.one(".total-quantity").setContent(100 < g ? "100+" : g);
                            a.one(".suffix").setContent(1 === g ? "item" :
                                "items");
                            a.one(".subtotal .price").setContent(c.Squarespace.Commerce.moneyString(b.get("subtotalCents"), !0))
                        };
                    0 < g ? (h(), this._show()) : (this._hide(), h())
                },
                _show: function() {
                    var b = this.get("boundingBox");
                    if (b.hasClass("sqs-scalable-hidden")) b.show();
                    else {
                        var f = c.Easing.easeOutStrong,
                            a = new c.Anim({
                                node: b,
                                to: {
                                    opacity: 0.7
                                },
                                duration: 0.2,
                                easing: f
                            }),
                            h = new c.Anim({
                                node: b,
                                to: {
                                    opacity: 1
                                },
                                duration: 0.5,
                                easing: f
                            });
                        a.on("end", function() {
                            h.run()
                        });
                        a.run()
                    }
                },
                _hide: function(b) {
                    var c = this.get("boundingBox");
                    c.hasClass("sqs-scalable-hidden") ||
                        c.hide(b)
                }
            }, {
                CSS_PREFIX: "sqs-pill-shopping-cart",
                HANDLEBARS_TEMPLATE: "pill-shopping-cart.html",
                ATTRS: {
                    model: {
                        value: null,
                        validator: function(b) {
                            return c.instanceOf(b, c.Squarespace.Models.ShoppingCart)
                        }
                    },
                    useLightCart: {
                        value: !1
                    }
                }
            })
        }, "1.0", {
            requires: "base cookie node squarespace-animations squarespace-commerce-utils squarespace-models-shopping-cart squarespace-pill-shopping-cart-template squarespace-ss-widget".split(" ")
        })
    },
    3485: function(k, l) {
        YUI.add("squarespace-plugin-integer-restrictor", function(c) {
            c.namespace("Squarespace.Plugin");
            c.Squarespace.Plugin.IntegerRestrictor = c.Base.create("integerRestrictor", c.Plugin.Base, [], {
                initializer: function() {
                    this.get("host").on("keydown", function(c) {
                        var b = c.keyCode; - 1 !== [9, 13, 8, 46, 37, 39].indexOf(b) || (48 <= b && 57 >= b || 96 <= b && 105 >= b) || c.halt(!0)
                    }, this)
                }
            }, {
                NS: "integerRestrictorPlugin"
            })
        }, "1.0", {
            requires: ["base", "plugin", "squarespace-ui-base"]
        })
    },
    3509: function(k, l, c) {
        c(1132);
        YUI.add("squarespace-shipping-options-list", function(c) {
            c.namespace("Squarespace.Widgets");
            var b = c.Squarespace.Widgets.ShippingOptionsList =
                c.Base.create("shippingOptionsList", c.Squarespace.Widgets.SSWidget, [], {
                    renderUI: function() {
                        b.superclass.renderUI.call(this);
                        this._spinner = new c.Squarespace.Spinner({
                            render: this.get("contentBox").one(".loading-spinner"),
                            size: 1 < this.get("model").get("shippingOptions").length ? 35 : 15,
                            color: "dark"
                        })
                    },
                    bindUI: function() {
                        b.superclass.bindUI.call(this);
                        var c = this.get("model"),
                            a = this.get("contentBox");
                        c.on("change", this.syncUI, this);
                        c.on("recalculate-start", this._setLoadingState, this);
                        c.on("recalculate-end",
                            this._setLoadedState, this);
                        this.on("shippingCountryChange", this.syncUI, this);
                        a.delegate("click", function(a) {
                            c.updateShippingMethod(a.target.get("value"))
                        }, "input", this)
                    },
                    syncUI: function() {
                        b.superclass.syncUI.call(this);
                        var g = this.get("contentBox"),
                            a = this.get("model"),
                            h = a.get("shippingOptions"),
                            d = (a = a.get("selectedShippingOption")) ? a.key : null,
                            e = g.one(".options-container");
                        g.all(".shipping-option").remove(!0);
                        g.toggleClass("empty", 0 === h.length);
                        c.Array.each(h, function(a, b) {
                            var g = a.key,
                                h = c.Squarespace.UITemplates.renderAsNodeOrDocFrag(this.getProperty("HANDLEBARS_SHIPPING_OPT_TEMPLATE"), {
                                    name: a.name,
                                    id: g,
                                    computedCost: a.computedCost
                                });
                            (d && g === d || !d && 0 === b) && h.one("input").set("checked", !0);
                            e.append(h)
                        }, this)
                    },
                    getSelectedOption: function() {
                        var b = this.get("contentBox").one("input:checked");
                        if (c.Lang.isValue(b) && b.get("disabled")) return null;
                        if (b) return {
                            value: b.get("value"),
                            title: b.get("title"),
                            cost: Number(b.getData("computed-cost"))
                        }
                    },
                    setSelectedOption: function(b) {
                        this.get("contentBox").all("input").each(function(a) {
                            a.set("checked", a.get("value") === b)
                        }, this)
                    },
                    _setLoadingState: function() {
                        var b =
                            this.get("contentBox"),
                            a = 1 < this.get("model").get("shippingOptions").length;
                        this._spinner.set("size", a ? 35 : 15);
                        b.all("input").setAttribute("disabled", !0);
                        b.toggleClass("multiple-options", a);
                        b.addClass("loading-options")
                    },
                    _setLoadedState: function() {
                        c.later(350, this, function() {
                            var b = this.get("contentBox");
                            b.removeClass("loading-options");
                            b.all(".shipping-option").each(function(a) {
                                a.hasClass("disabled") || a.one("input").removeAttribute("disabled")
                            }, this)
                        })
                    }
                }, {
                    CSS_PREFIX: "sqs-shipping-options-list",
                    HANDLEBARS_TEMPLATE: "shipping-options-list.html",
                    HANDLEBARS_SHIPPING_OPT_TEMPLATE: "shipping-options-list-option.html",
                    ATTRS: {
                        model: {
                            value: null,
                            validator: function(b) {
                                return c.instanceOf(b, c.Squarespace.Models.ShoppingCart)
                            }
                        }
                    }
                })
        }, "1.0", {
            requires: "base node squarespace-hb-money-string squarespace-models-shopping-cart squarespace-shipping-options-list-option-template squarespace-shipping-options-list-template squarespace-spinner squarespace-ss-widget squarespace-ui-templates".split(" ")
        })
    },
    3521: function(k, l, c) {
        var f = c(1),
            b = c(131),
            g = c(271);
        YUI.add("squarespace-table-shopping-cart",
            function(a) {
                a.namespace("Squarespace.Widgets");
                var c = a.Squarespace.Widgets.TableShoppingCart = a.Base.create("tableShoppingCart", a.Squarespace.Widgets.SSWidget, [], {
                    initializer: function() {
                        this._getAdditionalFieldsFormTemplateSchema(function(a) {
                            this._additionalFieldsFormTemplate = a
                        }, this);
                        this._additionalFieldsModalLightbox = new a.Squarespace.Widgets.ModalLightbox;
                        this._formWidget = null
                    },
                    destructor: function() {
                        this._additionalFieldsModalLightbox.destroy();
                        this._formWidget && this._formWidget.destroy()
                    },
                    renderUI: function() {
                        c.superclass.renderUI.call(this);
                        this._additionalFieldsModalLightbox.render(a.one("body"))
                    },
                    bindUI: function() {
                        c.superclass.bindUI.call(this);
                        this.get("model").on("change", this.syncUI, this);
                        var b = this.get("contentBox");
                        b.delegate("click", function(a) {
                            b.hasClass("loading-cart") || this._removeEntryRow(a.target.ancestor("tr"))
                        }, ".remove-item", this);
                        b.delegate("click", function(a) {
                            a.target.select()
                        }, ".quantity input", this);
                        var e = 0,
                            f;
                        b.delegate("valuechange", function(b) {
                            var c = b.target.get("parentNode");
                            e += 1300;
                            f && f.stop();
                            c.one("input").setStyle("opacity",
                                0.3);
                            setTimeout(a.bind(function() {
                                f = new a.Anim({
                                    node: c.one("input"),
                                    to: {
                                        opacity: 1
                                    },
                                    easing: a.Easing.easeOutSine,
                                    duration: 0.5
                                });
                                f.run();
                                setTimeout(a.bind(function() {
                                    e -= 1300;
                                    0 === e && this._onQuantityChange(b)
                                }, this), 1E3)
                            }, this), 300)
                        }, ".quantity input", this);
                        b.delegate("click", this._onAdditionalFieldsEdit, ".additional-fields", this);
                        this._additionalFieldsModalLightbox.on("close", function() {
                            this._formWidget && this._formWidget.destroy()
                        }, this)
                    },
                    syncUI: function() {
                        c.superclass.syncUI.call(this);
                        var b = this.get("model"),
                            e = this.get("contentBox");
                        e.one(".subtotal .price").setContent(a.Squarespace.Commerce.moneyString(b.get("subtotalCents")));
                        e.one("tbody").empty();
                        0 === b.get("totalQuantity") ? e.addClass("empty") : (e.removeClass("empty"), a.Array.each(b.get("entries"), function(a) {
                            0 < a.quantity && this._appendEntryRow(a)
                        }, this), this._focusedInputItemId && (b = this._getEntryRowByItemId(this._focusedInputItemId)) && b.one(".quantity input").focus());
                        e.all(".cooldown").addClass("hidden")
                    },
                    showError: function(b, c) {
                        new a.Squarespace.Widgets.Alert({
                            "strings.title": b,
                            "strings.message": c
                        })
                    },
                    _appendEntryRow: function(c) {
                        var e = c.item,
                            f = e.items,
                            g = e.structuredContent.productType,
                            h = g === b.PHYSICAL,
                            k = c.chosenVariant,
                            l = a.Lang.isValue(k),
                            n = a.Squarespace.UITemplates.renderAsNodeOrDocFrag(this.getProperty("HANDLEBARS_ITEM_TEMPLATE"), {
                                isPhysicalProduct: h
                            });
                        n.setData("entry", c);
                        n.setAttribute("data-item-id", e.id);
                        l && n.setAttribute("data-chosen-variant-sku", k.sku);
                        e = n.one(".item-image");
                        f = a.Lang.isValue(f) && 0 < f.length ? f[0].assetUrl.replace("http://", "https://") + "?format=100w" :
                            "/universal/images-v6/configuration/no-image.png";
                        e.append('<img src="' + f + '" />');
                        f = n.one(".item-desc");
                        e = this.get("linkItems") ? '<a href="' + c.item.fullUrl + '">' + a.Escape.html(c.item.title) + "</a>" : "<div>" + a.Escape.html(c.item.title) + "</div>";
                        f.append(e);
                        var v;
                        l ? v = '<div class="variant-info">' + a.Squarespace.Commerce.variantFormat(k) + "</div>" : g === b.DIGITAL && (v = '<div class="variant-info">Digital Download</div>');
                        v && f.append(v);
                        c.additionalFields && f.append('<div class="additional-fields"><a>Edit Details</a></div>');
                        g = c.quantity;
                        h && (h = n.one(".quantity input"), h.setAttrs({
                            maxlength: 4,
                            size: String(g).length,
                            value: g
                        }), h.plug(a.Squarespace.Plugin.IntegerRestrictor));
                        n.one(".price").setContent(a.Squarespace.Commerce.moneyString(g * c.purchasePriceCents));
                        this.get("contentBox").one("tbody").append(n)
                    },
                    _removeEntryRow: function(b) {
                        b.plug(a.Squarespace.Animations.Fadeable, {
                            duration: 0.25
                        });
                        b.once("hidden", function() {
                            this._updateEntryQuantity(b.getData("entry"), 0)
                        }, this);
                        b.hide()
                    },
                    _getEntryRowByItemId: function(a) {
                        var b;
                        this.get("contentBox").all("tbody tr").each(function(c) {
                            c.getData("entry").itemId ===
                                a && (b = c)
                        }, this);
                        return b
                    },
                    _onQuantityChange: function(b) {
                        var c = b.target;
                        b = c.get("value");
                        var g = c.ancestor("tr"),
                            h = g.getData("entry"),
                            k = Number(b),
                            l = h.quantity;
                        this._focusedInputItemId = h.itemId;
                        "" === b || k === l || (0 === k ? (b = new a.Squarespace.Widgets.Confirmation({
                            "strings.title": f("Remove Item"),
                            "strings.message": f("You have set this item's quantity to 0. This will remove it from your cart. Would you like to continue?")
                        }), b.on("confirm", function() {
                            this._removeEntryRow(g)
                        }, this), b.on("cancel", function() {
                            c.set("value",
                                l)
                        }, this)) : this._updateEntryQuantity(h, k, l, c))
                    },
                    _onAdditionalFieldsEdit: function(b) {
                        if (this._additionalFieldsFormTemplate && !this.get("contentBox").hasClass("loading-cart")) {
                            var c = b.target.ancestor("tr").getData("entry");
                            b = c.item.structuredContent.additionalFieldsForm;
                            var f = this._formWidget = new a.Squarespace.Widgets.AsyncForm({
                                form: b,
                                formTemplate: this._additionalFieldsFormTemplate,
                                formSubmitButtonText: "Save",
                                formData: a.JSON.parse(c.additionalFields),
                                formName: b.name,
                                showTitle: !0
                            });
                            f.on("submission",
                                function(a) {
                                    f.setStateSaving();
                                    this.get("model").updateFormSubmission(c, a.data, function(a, b) {
                                        f.setStateEditing();
                                        this._additionalFieldsModalLightbox.close()
                                    }, this)
                                }, this);
                            this._additionalFieldsModalLightbox.set("content", f);
                            this._additionalFieldsModalLightbox.open()
                        }
                    },
                    _updateEntryQuantity: function(a, b, c, g) {
                        this.get("model").updateQuantity(a, b, function(a) {
                            a && (this.showError(f("Unable to Update Quantity"), a), g && g.inDoc() && g.set("value", c))
                        }, this)
                    },
                    _getAdditionalFieldsFormTemplateSchema: function(b, c) {
                        a.Data.get({
                            url: "/api/template/GetTemplateSchema",
                            data: {
                                componentType: "widget",
                                type: g.FORM
                            },
                            success: function(a) {
                                b.call(c || this, a)
                            }
                        }, this)
                    }
                }, {
                    ATTRS: {
                        model: {
                            value: null,
                            validator: function(b) {
                                return a.instanceOf(b, a.Squarespace.Models.ShoppingCart)
                            }
                        },
                        linkItems: {
                            value: !1
                        }
                    }
                })
            }, "1.0", {
                requires: "anim base escape node squarespace-animations squarespace-async-form squarespace-commerce-utils squarespace-modal-lightbox squarespace-models-shopping-cart squarespace-plugin-integer-restrictor squarespace-ss-widget squarespace-ui-base squarespace-ui-templates squarespace-widgets-alert squarespace-widgets-confirmation".split(" ")
            })
    },
    3522: function(k, l) {
        YUI.add("squarespace-template-integrated-shopping-cart", function(c) {
            c.namespace("Squarespace.Widgets");
            var f = c.Squarespace.Widgets.TemplateIntegratedShoppingCart = c.Base.create("templateIntegratedShoppingCart", c.Widget, [], {
                bindUI: function() {
                    f.superclass.bindUI.call(this);
                    this.get("model").on("change", this.syncUI, this);
                    this.get("model").after("loaded", this._markInitialized, this)
                },
                syncUI: function() {
                    f.superclass.syncUI.call(this);
                    var b = this.get("quantityEl"),
                        g = this.get("subtotalEl"),
                        a = this.get("model"),
                        h = a.get("totalQuantity"),
                        a = a.get("subtotalCents");
                    c.Lang.isValue(b) && b.setContent(100 < h ? "100+" : h);
                    c.Lang.isValue(g) && g.setContent(c.Squarespace.Commerce.moneyString(a))
                },
                _markInitialized: function() {
                    this.get("boundingBox").addClass("sqs-cart-initialized")
                }
            }, {
                CSS_PREFIX: "sqs-template-integrated-shopping-cart",
                HTML_PARSER: {
                    quantityEl: ".sqs-cart-quantity",
                    subtotalEl: ".sqs-cart-subtotal"
                },
                ATTRS: {
                    quantityEl: {
                        value: null,
                        validator: c.Squarespace.AttrValidators.isNullOrNode,
                        writeOnce: "initOnly"
                    },
                    subtotalEl: {
                        value: null,
                        validator: c.Squarespace.AttrValidators.isNullOrNode,
                        writeOnce: "initOnly"
                    },
                    model: {
                        value: null,
                        validator: function(b) {
                            return c.instanceOf(b, c.Squarespace.Models.ShoppingCart)
                        }
                    }
                }
            })
        }, "1.0", {
            requires: "base node squarespace-attr-validators squarespace-commerce-utils squarespace-models-shopping-cart widget".split(" ")
        })
    }
});