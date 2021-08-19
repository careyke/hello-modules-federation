/******/ (() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    /***/ "./node_modules/add/index.js":
      /*!***********************************!*\
  !*** ./node_modules/add/index.js ***!
  \***********************************/
      /***/ function (module, exports) {
        var __WEBPACK_AMD_DEFINE_FACTORY__,
          __WEBPACK_AMD_DEFINE_ARRAY__,
          __WEBPACK_AMD_DEFINE_RESULT__;
        (function (root, factory) {
          "use strict";

          // AMD
          if (true) {
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
            (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
            (__WEBPACK_AMD_DEFINE_RESULT__ =
              typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
                ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                    exports,
                    __WEBPACK_AMD_DEFINE_ARRAY__
                  )
                : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          }
          // CommonJS
          else {
          }
        })(this, function () {
          "use strict";

          // The minimum machine rounding error
          var Epsilon = Math.pow(2, -53),
            EpsilonReciprocal = 1 / Epsilon,
            /// The smallest positive number that can be represented
            Eta = Math.pow(2, -1074),
            // limitB is a constant used in the transform function
            limitB = 0.5 * EpsilonReciprocal * Eta;

          /**
           * S. M. RUMP, T. OGITA AND S. OISHI
           * http://www.ti3.tu-harburg.de/paper/rump/RuOgOi07I.pdf
           */

          // Page 8
          // x is result, y is error
          // third is so the array is allocated for 4 spaces
          // it speeds up transform
          function fastTwoSum(a, b) {
            var x = a + b,
              q = x - a,
              y = b - q;

            return [x, y, null];
          }

          // Page 12
          // p = q + p'
          // sigma is a power of 2 greater than or equal to |p|
          function extractScalar(sigma, p) {
            var q = sigma + p - sigma,
              pPrime = p - q;

            return [q, pPrime];
          }

          // Page 12
          function extractVector(sigma, p) {
            var tau = 0.0,
              extracted,
              i = 0,
              ii = p.length,
              pPrime = new Array(ii);

            for (; i < ii; ++i) {
              extracted = extractScalar(sigma, p[i]);
              pPrime[i] = extracted[1];
              tau += extracted[0];
            }

            return [tau, pPrime];
          }

          // Finds the immediate power of 2 that is larger than p
          //// in a fast way
          function nextPowerTwo(p) {
            var q = EpsilonReciprocal * p,
              L = Math.abs(q + p - q);

            if (L === 0) return Math.abs(p);

            return L;
          }

          // Helper, gets the maximum of the absolute values of an array
          function maxAbs(arr) {
            var i = 0,
              ii = arr.length,
              best = -1;

            for (; i < ii; ++i) {
              if (Math.abs(arr[i]) > best) {
                best = arr[i];
              }
            }

            return best;
          }

          function transform(p) {
            var mu = maxAbs(p),
              M,
              sigmaPrime,
              tPrime,
              t,
              tau,
              sigma,
              extracted,
              res,
              // Not part of the original paper, here for optimization
              temp,
              bigPow,
              limitA,
              twoToTheM;

            if (mu === 0) {
              return [0, 0, p, 0];
            }

            M = nextPowerTwo(p.length + 2);
            twoToTheM = Math.pow(2, M);
            bigPow = 2 * twoToTheM; // equiv to Math.pow(2, 2 * M), faster
            sigmaPrime = twoToTheM * nextPowerTwo(mu);
            tPrime = 0;

            do {
              t = tPrime;
              sigma = sigmaPrime;
              extracted = extractVector(sigma, p);
              tau = extracted[0];
              tPrime = t + tau;
              p = extracted[1];

              if (tPrime === 0) {
                return transform(p);
              }

              temp = Epsilon * sigma;
              sigmaPrime = twoToTheM * temp;
              limitA = bigPow * temp;
            } while (Math.abs(tPrime) < limitA && sigma > limitB);

            // res already allocated for 4
            res = fastTwoSum(t, tau);
            res[2] = p;

            return res;
          }

          function dumbSum(p) {
            var i,
              ii,
              sum = 0.0;
            for (i = 0, ii = p.length; i < ii; ++i) {
              sum += p[i];
            }
            return sum;
          }

          function accSum(p) {
            // Zero length array, or all values are zeros
            if (p.length === 0 || maxAbs(p) === 0) {
              return 0;
            }

            var tfmd = transform(p);

            return tfmd[0] + (tfmd[1] + dumbSum(tfmd[2]));
          }

          // exports
          accSum.dumbSum = dumbSum;
          accSum.fastTwoSum = fastTwoSum;
          accSum.nextPowerTwo = nextPowerTwo;
          return accSum;
        });

        /***/
      },

    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        const getMath = async () => {
          const math = await __webpack_require__
            .e(/*! import() */ "webpack_container_remote_remoteApp_math")
            .then(
              __webpack_require__.t.bind(
                __webpack_require__,
                /*! remoteApp/math */ "webpack/container/remote/remoteApp/math",
                23
              )
            );
          console.log("remote:", math.addPlus([1, 2]));
        };

        const getLocalAdd = async () => {
          const add = await __webpack_require__
            .e(/*! import() */ "webpack_sharing_consume_default_add_add")
            .then(
              __webpack_require__.t.bind(
                __webpack_require__,
                /*! add */ "webpack/sharing/consume/default/add/add",
                23
              )
            );
          console.log("main:", add.default([1, 2]));
        };

        getMath();
        getLocalAdd();

        /***/
      },

    /***/ "webpack/container/reference/remoteApp":
      /*!******************************************************************!*\
  !*** external "remoteApp@http://localhost:8001/js/remoteApp.js" ***!
  \******************************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var __webpack_error__ = new Error();
        module.exports = new Promise((resolve, reject) => {
          /**
           * 这里remoteApp就是远程应用暴露在window对象中的变量名
           */
          if (typeof remoteApp !== "undefined") return resolve();
          __webpack_require__.l(
            "http://localhost:8001/js/remoteApp.js",
            (event) => {
              if (typeof remoteApp !== "undefined") return resolve();
              var errorType =
                event && (event.type === "load" ? "missing" : event.type);
              var realSrc = event && event.target && event.target.src;
              __webpack_error__.message =
                "Loading script failed.\n(" + errorType + ": " + realSrc + ")";
              __webpack_error__.name = "ScriptExternalLoadError";
              __webpack_error__.type = errorType;
              __webpack_error__.request = realSrc;
              reject(__webpack_error__);
            },
            "remoteApp"
          );
        }).then(() => remoteApp);

        /***/
      },
  };
  /************************************************************************/
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = __webpack_modules__;

  // expose the module cache
  __webpack_require__.c = __webpack_module_cache__;

  /************************************************************************/
  /* webpack/runtime/create fake namespace object */
  (() => {
    var getProto = Object.getPrototypeOf
      ? (obj) => Object.getPrototypeOf(obj)
      : (obj) => obj.__proto__;
    var leafPrototypes;
    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 16: return value when it's Promise-like
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
      if (mode & 1) value = this(value);
      if (mode & 8) return value;
      if (typeof value === "object" && value) {
        if (mode & 4 && value.__esModule) return value;
        if (mode & 16 && typeof value.then === "function") return value;
      }
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      var def = {};
      leafPrototypes = leafPrototypes || [
        null,
        getProto({}),
        getProto([]),
        getProto(getProto),
      ];
      for (
        var current = mode & 2 && value;
        typeof current == "object" && !~leafPrototypes.indexOf(current);
        current = getProto(current)
      ) {
        Object.getOwnPropertyNames(current).forEach(
          (key) => (def[key] = () => value[key])
        );
      }
      def["default"] = () => value;
      __webpack_require__.d(ns, def);
      return ns;
    };
  })();

  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  /* webpack/runtime/ensure chunk */
  (() => {
    __webpack_require__.f = {};
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = (chunkId) => {
      return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          __webpack_require__.f[key](chunkId, promises);
          return promises;
        }, [])
      );
    };
  })();

  /* webpack/runtime/get javascript chunk filename */
  (() => {
    // This function allow to reference async chunks
    __webpack_require__.u = (chunkId) => {
      // return url for filenames based on template
      return (
        "js/" +
        chunkId +
        "_" +
        {
          webpack_container_remote_remoteApp_math: "441fc992",
          webpack_sharing_consume_default_add_add: "6fcba6cf",
        }[chunkId] +
        ".js"
      );
    };
  })();

  /* webpack/runtime/get mini-css chunk filename */
  (() => {
    // This function allow to reference all chunks
    __webpack_require__.miniCssF = (chunkId) => {
      // return url for filenames based on template
      return undefined;
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  /* webpack/runtime/load script */
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "main-app:";
    // loadScript function to load a script via script tag
    /**
     * JSONP的方式来动态加载资源
     * @param {*} url
     * @param {*} done
     * @param {*} key
     * @param {*} chunkId
     * @returns
     */
    __webpack_require__.l = (url, done, key, chunkId) => {
      if (inProgress[url]) {
        inProgress[url].push(done);
        return;
      }
      var script, needAttach;
      if (key !== undefined) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i];
          if (
            s.getAttribute("src") == url ||
            s.getAttribute("data-webpack") == dataWebpackPrefix + key
          ) {
            script = s;
            break;
          }
        }
      }
      if (!script) {
        needAttach = true;
        script = document.createElement("script");

        script.charset = "utf-8";
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        script.setAttribute("data-webpack", dataWebpackPrefix + key);
        script.src = url;
      }
      inProgress[url] = [done];
      var onScriptComplete = (prev, event) => {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach((fn) => fn(event));
        if (prev) return prev(event);
      };
      var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script,
        }),
        120000
      );
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      needAttach && document.head.appendChild(script);
    };
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();

  /* webpack/runtime/remotes loading */
  (() => {
    var chunkMapping = {
      webpack_container_remote_remoteApp_math: [
        "webpack/container/remote/remoteApp/math",
      ],
    };
    var idToExternalAndNameMapping = {
      "webpack/container/remote/remoteApp/math": [
        "default",
        "./math",
        "webpack/container/reference/remoteApp",
      ],
    };
    /**
     * 请求远程应用的入口文件 remoteApp.js
     * @param {*} chunkId
     * @param {*} promises
     */
    __webpack_require__.f.remotes = (chunkId, promises) => {
      if (__webpack_require__.o(chunkMapping, chunkId)) {
        chunkMapping[chunkId].forEach((id) => {
          var getScope = __webpack_require__.R;
          if (!getScope) getScope = [];
          var data = idToExternalAndNameMapping[id];
          if (getScope.indexOf(data) >= 0) return;
          getScope.push(data);
          if (data.p) return promises.push(data.p);
          var onError = (error) => {
            if (!error) error = new Error("Container missing");
            if (typeof error.message === "string")
              error.message +=
                '\nwhile loading "' + data[1] + '" from ' + data[2];
            __webpack_modules__[id] = () => {
              throw error;
            };
            data.p = 0;
          };
          var handleFunction = (fn, arg1, arg2, d, next, first) => {
            try {
              var promise = fn(arg1, arg2);
              if (promise && promise.then) {
                var p = promise.then((result) => next(result, d), onError);
                if (first) promises.push((data.p = p));
                else return p;
              } else {
                return next(promise, d, first);
              }
            } catch (error) {
              onError(error);
            }
          };
          // remoteApp.js请求完成之后，
          // 处理公共依赖模块__webpack_require__.I，将相同的模块注入到远程应用中，来实现后续的公关模块共享
          var onExternal = (external, _, first) =>
            external
              ? handleFunction(
                  __webpack_require__.I,
                  data[0],
                  0,
                  external,
                  onInitialized,
                  first
                )
              : onError();
          // 公共模块处理完成之后，执行远程模块的真正代码 external.get
          var onInitialized = (_, external, first) =>
            handleFunction(
              external.get,
              data[1],
              getScope,
              0,
              onFactory,
              first
            );
          var onFactory = (factory) => {
            data.p = 1;
            __webpack_modules__[id] = (module) => {
              module.exports = factory();
            };
          };
          handleFunction(__webpack_require__, data[2], 0, 0, onExternal, 1);
        });
      }
    };
  })();

  /* webpack/runtime/sharing */
  (() => {
    __webpack_require__.S = {};
    var initPromises = {};
    var initTokens = {};
    /**
     * 处理公共模块
     * @param {*} name
     * @param {*} initScope
     * @returns
     */
    __webpack_require__.I = (name, initScope) => {
      if (!initScope) initScope = [];
      // handling circular init calls
      var initToken = initTokens[name];
      if (!initToken) initToken = initTokens[name] = {};
      if (initScope.indexOf(initToken) >= 0) return;
      initScope.push(initToken);
      // only runs once
      if (initPromises[name]) return initPromises[name];
      // creates a new share scope if needed
      if (!__webpack_require__.o(__webpack_require__.S, name))
        __webpack_require__.S[name] = {};
      // runs all init snippets from all modules reachable
      var scope = __webpack_require__.S[name];
      var warn = (msg) =>
        typeof console !== "undefined" && console.warn && console.warn(msg);
      var uniqueName = "main-app";
      // 存储公共模块，记录入口和版本信息，包括获取方法
      var register = (name, version, factory, eager) => {
        var versions = (scope[name] = scope[name] || {});
        var activeVersion = versions[version];
        if (
          !activeVersion ||
          (!activeVersion.loaded &&
            (!eager != !activeVersion.eager
              ? eager
              : uniqueName > activeVersion.from))
        )
          versions[version] = {
            get: factory,
            from: uniqueName,
            eager: !!eager,
          };
      };
      // 初始化公共依赖，将主应用中的公共依赖信息注入到远程应用中 module.init方法
      var initExternal = (id) => {
        var handleError = (err) =>
          warn("Initialization of sharing external failed: " + err);
        try {
          var module = __webpack_require__(id);
          if (!module) return;
          var initFn = (module) =>
            module &&
            module.init &&
            module.init(__webpack_require__.S[name], initScope);
          if (module.then)
            return promises.push(module.then(initFn, handleError));
          var initResult = initFn(module);
          if (initResult && initResult.then)
            return promises.push(initResult.catch(handleError));
        } catch (err) {
          handleError(err);
        }
      };
      var promises = [];
      switch (name) {
        case "default":
          {
            register(
              "add",
              "2.0.6",
              () => () =>
                __webpack_require__(
                  /*! ./node_modules/add/index.js */ "./node_modules/add/index.js"
                ),
              1
            );
            initExternal("webpack/container/reference/remoteApp");
          }
          break;
      }
      if (!promises.length) return (initPromises[name] = 1);
      return (initPromises[name] = Promise.all(promises).then(
        () => (initPromises[name] = 1)
      ));
    };
  })();

  /* webpack/runtime/publicPath */
  (() => {
    __webpack_require__.p = "./";
  })();

  /* webpack/runtime/consumes */
  (() => {
    var parseVersion = (str) => {
      // see webpack/lib/util/semver.js for original code
      var p = (p) => {
          return p.split(".").map((p) => {
            return +p == p ? +p : p;
          });
        },
        n = /^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),
        r = n[1] ? p(n[1]) : [];
      return (
        n[2] && (r.length++, r.push.apply(r, p(n[2]))),
        n[3] && (r.push([]), r.push.apply(r, p(n[3]))),
        r
      );
    };
    var versionLt = (a, b) => {
      // see webpack/lib/util/semver.js for original code
      (a = parseVersion(a)), (b = parseVersion(b));
      for (var r = 0; ; ) {
        if (r >= a.length) return r < b.length && "u" != (typeof b[r])[0];
        var e = a[r],
          n = (typeof e)[0];
        if (r >= b.length) return "u" == n;
        var t = b[r],
          f = (typeof t)[0];
        if (n != f) return ("o" == n && "n" == f) || "s" == f || "u" == n;
        if ("o" != n && "u" != n && e != t) return e < t;
        r++;
      }
    };
    var rangeToString = (range) => {
      // see webpack/lib/util/semver.js for original code
      var r = range[0],
        n = "";
      if (1 === range.length) return "*";
      if (r + 0.5) {
        n +=
          0 == r
            ? ">="
            : -1 == r
            ? "<"
            : 1 == r
            ? "^"
            : 2 == r
            ? "~"
            : r > 0
            ? "="
            : "!=";
        for (var e = 1, a = 1; a < range.length; a++) {
          e--,
            (n +=
              "u" == (typeof (t = range[a]))[0]
                ? "-"
                : (e > 0 ? "." : "") + ((e = 2), t));
        }
        return n;
      }
      var g = [];
      for (a = 1; a < range.length; a++) {
        var t = range[a];
        g.push(
          0 === t
            ? "not(" + o() + ")"
            : 1 === t
            ? "(" + o() + " || " + o() + ")"
            : 2 === t
            ? g.pop() + " " + g.pop()
            : rangeToString(t)
        );
      }
      return o();
      function o() {
        return g.pop().replace(/^\((.+)\)$/, "$1");
      }
    };
    var satisfy = (range, version) => {
      // see webpack/lib/util/semver.js for original code
      if (0 in range) {
        version = parseVersion(version);
        var e = range[0],
          r = e < 0;
        r && (e = -e - 1);
        for (var n = 0, i = 1, a = !0; ; i++, n++) {
          var f,
            s,
            g = i < range.length ? (typeof range[i])[0] : "";
          if (n >= version.length || "o" == (s = (typeof (f = version[n]))[0]))
            return !a || ("u" == g ? i > e && !r : ("" == g) != r);
          if ("u" == s) {
            if (!a || "u" != g) return !1;
          } else if (a)
            if (g == s)
              if (i <= e) {
                if (f != range[i]) return !1;
              } else {
                if (r ? f > range[i] : f < range[i]) return !1;
                f != range[i] && (a = !1);
              }
            else if ("s" != g && "n" != g) {
              if (r || i <= e) return !1;
              (a = !1), i--;
            } else {
              if (i <= e || s < g != r) return !1;
              a = !1;
            }
          else "s" != g && "n" != g && ((a = !1), i--);
        }
      }
      var t = [],
        o = t.pop.bind(t);
      for (n = 1; n < range.length; n++) {
        var u = range[n];
        t.push(
          1 == u
            ? o() | o()
            : 2 == u
            ? o() & o()
            : u
            ? satisfy(u, version)
            : !o()
        );
      }
      return !!o();
    };
    var ensureExistence = (scopeName, key) => {
      var scope = __webpack_require__.S[scopeName];
      if (!scope || !__webpack_require__.o(scope, key))
        throw new Error(
          "Shared module " + key + " doesn't exist in shared scope " + scopeName
        );
      return scope;
    };
    var findVersion = (scope, key) => {
      var versions = scope[key];
      var key = Object.keys(versions).reduce((a, b) => {
        return !a || versionLt(a, b) ? b : a;
      }, 0);
      return key && versions[key];
    };
    var findSingletonVersionKey = (scope, key) => {
      var versions = scope[key];
      return Object.keys(versions).reduce((a, b) => {
        return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
      }, 0);
    };
    var getInvalidSingletonVersionMessage = (key, version, requiredVersion) => {
      return (
        "Unsatisfied version " +
        version +
        " of shared singleton module " +
        key +
        " (required " +
        rangeToString(requiredVersion) +
        ")"
      );
    };
    var getSingletonVersion = (scope, scopeName, key, requiredVersion) => {
      var version = findSingletonVersionKey(scope, key);
      if (!satisfy(requiredVersion, version))
        typeof console !== "undefined" &&
          console.warn &&
          console.warn(
            getInvalidSingletonVersionMessage(key, version, requiredVersion)
          );
      return get(scope[key][version]);
    };
    var getStrictSingletonVersion = (
      scope,
      scopeName,
      key,
      requiredVersion
    ) => {
      var version = findSingletonVersionKey(scope, key);
      if (!satisfy(requiredVersion, version))
        throw new Error(
          getInvalidSingletonVersionMessage(key, version, requiredVersion)
        );
      return get(scope[key][version]);
    };
    var findValidVersion = (scope, key, requiredVersion) => {
      var versions = scope[key];
      var key = Object.keys(versions).reduce((a, b) => {
        if (!satisfy(requiredVersion, b)) return a;
        return !a || versionLt(a, b) ? b : a;
      }, 0);
      return key && versions[key];
    };
    var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion) => {
      var versions = scope[key];
      return (
        "No satisfying version (" +
        rangeToString(requiredVersion) +
        ") of shared module " +
        key +
        " found in shared scope " +
        scopeName +
        ".\n" +
        "Available versions: " +
        Object.keys(versions)
          .map((key) => {
            return key + " from " + versions[key].from;
          })
          .join(", ")
      );
    };
    var getValidVersion = (scope, scopeName, key, requiredVersion) => {
      var entry = findValidVersion(scope, key, requiredVersion);
      if (entry) return get(entry);
      throw new Error(
        getInvalidVersionMessage(scope, scopeName, key, requiredVersion)
      );
    };
    var warnInvalidVersion = (scope, scopeName, key, requiredVersion) => {
      typeof console !== "undefined" &&
        console.warn &&
        console.warn(
          getInvalidVersionMessage(scope, scopeName, key, requiredVersion)
        );
    };
    var get = (entry) => {
      entry.loaded = 1;
      return entry.get();
    };
    var init = (fn) =>
      function (scopeName, a, b, c) {
        var promise = __webpack_require__.I(scopeName);
        if (promise && promise.then)
          return promise.then(
            fn.bind(fn, scopeName, __webpack_require__.S[scopeName], a, b, c)
          );
        return fn(scopeName, __webpack_require__.S[scopeName], a, b, c);
      };

    var load = /*#__PURE__*/ init((scopeName, scope, key) => {
      ensureExistence(scopeName, key);
      return get(findVersion(scope, key));
    });
    var loadFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
      return scope && __webpack_require__.o(scope, key)
        ? get(findVersion(scope, key))
        : fallback();
    });
    var loadVersionCheck = /*#__PURE__*/ init(
      (scopeName, scope, key, version) => {
        ensureExistence(scopeName, key);
        return get(
          findValidVersion(scope, key, version) ||
            warnInvalidVersion(scope, scopeName, key, version) ||
            findVersion(scope, key)
        );
      }
    );
    var loadSingletonVersionCheck = /*#__PURE__*/ init(
      (scopeName, scope, key, version) => {
        ensureExistence(scopeName, key);
        return getSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadStrictVersionCheck = /*#__PURE__*/ init(
      (scopeName, scope, key, version) => {
        ensureExistence(scopeName, key);
        return getValidVersion(scope, scopeName, key, version);
      }
    );
    var loadStrictSingletonVersionCheck = /*#__PURE__*/ init(
      (scopeName, scope, key, version) => {
        ensureExistence(scopeName, key);
        return getStrictSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadVersionCheckFallback = /*#__PURE__*/ init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !__webpack_require__.o(scope, key)) return fallback();
        return get(
          findValidVersion(scope, key, version) ||
            warnInvalidVersion(scope, scopeName, key, version) ||
            findVersion(scope, key)
        );
      }
    );
    var loadSingletonVersionCheckFallback = /*#__PURE__*/ init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !__webpack_require__.o(scope, key)) return fallback();
        return getSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadStrictVersionCheckFallback = /*#__PURE__*/ init(
      (scopeName, scope, key, version, fallback) => {
        var entry =
          scope &&
          __webpack_require__.o(scope, key) &&
          findValidVersion(scope, key, version);
        return entry ? get(entry) : fallback();
      }
    );
    var loadStrictSingletonVersionCheckFallback = /*#__PURE__*/ init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !__webpack_require__.o(scope, key)) return fallback();
        return getStrictSingletonVersion(scope, scopeName, key, version);
      }
    );
    var installedModules = {};
    var moduleToHandlerMapping = {
      "webpack/sharing/consume/default/add/add": () =>
        loadSingletonVersionCheckFallback(
          "default",
          "add",
          [1, 2, 0, 6],
          () => () =>
            __webpack_require__(/*! add */ "./node_modules/add/index.js")
        ),
    };
    // no consumes in initial chunks
    var chunkMapping = {
      webpack_sharing_consume_default_add_add: [
        "webpack/sharing/consume/default/add/add",
      ],
    };
    __webpack_require__.f.consumes = (chunkId, promises) => {
      if (__webpack_require__.o(chunkMapping, chunkId)) {
        chunkMapping[chunkId].forEach((id) => {
          if (__webpack_require__.o(installedModules, id))
            return promises.push(installedModules[id]);
          var onFactory = (factory) => {
            installedModules[id] = 0;
            __webpack_require__.m[id] = (module) => {
              delete __webpack_require__.c[id];
              module.exports = factory();
            };
          };
          var onError = (error) => {
            delete installedModules[id];
            __webpack_require__.m[id] = (module) => {
              delete __webpack_require__.c[id];
              throw error;
            };
          };
          try {
            var promise = moduleToHandlerMapping[id]();
            if (promise.then) {
              promises.push(
                (installedModules[id] = promise.then(onFactory).catch(onError))
              );
            } else onFactory(promise);
          } catch (e) {
            onError(e);
          }
        });
      }
    };
  })();

  /* webpack/runtime/jsonp chunk loading */
  (() => {
    // no baseURI

    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    var installedChunks = {
      app: 0,
    };

    __webpack_require__.f.j = (chunkId, promises) => {
      // JSONP chunk loading for javascript
      var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
      if (installedChunkData !== 0) {
        // 0 means "already installed".

        // a Promise means "currently loading".
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if ("app" == chunkId) {
            // setup Promise in chunk cache
            var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            promises.push((installedChunkData[2] = promise));

            // start chunk loading
            var url = __webpack_require__.p + __webpack_require__.u(chunkId);
            // create error before stack unwound to get useful stacktrace later
            var error = new Error();
            var loadingEnded = (event) => {
              if (__webpack_require__.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  error.name = "ChunkLoadError";
                  error.type = errorType;
                  error.request = realSrc;
                  installedChunkData[1](error);
                }
              }
            };
            __webpack_require__.l(
              url,
              loadingEnded,
              "chunk-" + chunkId,
              chunkId
            );
          } else installedChunks[chunkId] = 0;
        }
      }
    };

    // no prefetching

    // no preloaded

    // no HMR

    // no HMR manifest

    // no on chunks loaded

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0;
      for (moduleId in moreModules) {
        if (__webpack_require__.o(moreModules, moduleId)) {
          __webpack_require__.m[moduleId] = moreModules[moduleId];
        }
      }
      if (runtime) var result = runtime(__webpack_require__);
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkIds[i]] = 0;
      }
    };

    var chunkLoadingGlobal = (self["webpackChunkmain_app"] =
      self["webpackChunkmain_app"] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
  })();

  /************************************************************************/

  // module cache are used so entry inlining is disabled
  // startup
  // Load entry module and return exports
  var __webpack_exports__ = __webpack_require__("./src/index.js");

  /******/
})();
//# sourceMappingURL=app_1c573ab4.js.map
