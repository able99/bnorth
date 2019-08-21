"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.string.ends-with");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));

var _path = require("path");

var _routerLoading = _interopRequireDefault(require("./router.loading.js"));

var _routerError = _interopRequireDefault(require("./router.error.js"));

/**
 * @module
 */
var spe = '/';
var ParamSpe = ':';
var SubPageSpe = '|';
var ParamOptional = '?';
var PageSign = '#';

var RouterComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RouterComponent, _React$Component);

  function RouterComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RouterComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).call(this, props));
    /**
     * App 的实例
     * @type {module:app.App}
     */

    _this.app = _this.props.app;
    /**
     * 模块的 id
     * @type {string}
     */

    _this._id = _this.app._id + '.router.component';
    _this.props.app.router.component = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      _pageInfos: [],
      _popLayerInfos: []
      /*!
       * 弹出层 id 的随机发生数
       */

    };
    _this._popLayerIdRandom = 0;
    _this._states = {};
    /**
     * 设置导航时是否传递之前的查询字符串到新页面
     * @type {boolean}
     */

    _this.passQuery = false;
    /**
     * 设置导航时是否传递之前的状态数据到新页面
     * @type {boolean}
     */

    _this.passState = false;
    /**
     * 设置导航时是否传递之前的页面参数到新页面
     * @type {boolean}
     */

    _this.passParams = false;
    /**
     * 设置页面进场动画是否显示白屏提高速度
     * @type {boolean}
     */

    _this.transInBlank = true;
    /**
     * 设置页面离场动画是否显示白屏提高速度
     * @type {boolean}
     */

    _this.transOutBlank = true;
    _this.Page = _this.app.context.consumerHoc(_this.app.Page);
    _this.PopLayer = _this.app.context.consumerHoc(_this.app.PopLayer);
    _this._historyCount = 0;
    _this._history = (0, _createHashHistory.default)();

    _this._history.listen(function (location, action) {
      return _this._handleLocationChange(location, action);
    });

    _this._handleLocationChange(_this._history.location, _this._history.action);

    return _this;
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "_handleLocationChange",
    value: function _handleLocationChange(location, action) {
      var _this2 = this;

      this.props.app.log.debug('router location', location); // this._clearError();

      Object.keys(this._states).filter(function (v) {
        return !location.pathname.startsWith(v);
      }).forEach(function (v) {
        delete _this2._states[v];
      });
      if (location.state) this._states[location.pathname] = location.state;
      location.query = {};
      location.search.slice(1).split('&').filter(function (v) {
        return v;
      }).forEach(function (v) {
        var vs = v.split('=');
        location.query[vs[0]] = decodeURIComponent(vs[1]);
      });
      if (action === 'PUSH') this._historyCount++;
      if (action === 'POP') this._historyCount = Math.max(--this._historyCount, 0);
      var pos = 0;
      var pathnames = [];

      while (pos < location.pathname.length - 1) {
        var index = location.pathname.indexOf(spe, pos + 1);
        index = index >= 0 ? index : location.pathname.length;
        var sub = location.pathname.slice(pos + 1, index);

        if (pos === 0 && sub[0] === ParamSpe || this.props.app.router.getRouteByPageName(spe + sub.split(ParamSpe)[0]).length) {
          pathnames.push(spe + sub);
        } else if (pos === 0) {
          pathnames.push(spe);
          pathnames.push(sub);
        } else {
          pathnames.push(sub);
        }

        pos = index;
      }

      if (!pathnames.length) pathnames.push(spe);
      location.pathnames = pathnames;

      if (location.ignore) {
        location.ignore = false;
        return;
      }

      this._updateRouterInfo(location);
    }
  }, {
    key: "_updateRouterInfo",
    value: function () {
      var _updateRouterInfo2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(location) {
        var _this3 = this;

        var router, pathName, _idPrev, params, pageInfos, isPop, isFirst, prevActive, level, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, _i, pageInfo, _block, poplayers;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                router = this.props.app.router;

                if (Object.keys(router.getRoutes()).length) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                pathName = '';
                params = {};
                pageInfos = [];
                /* route */

                console.log(999);
                isPop = this._history.action === 'POP';
                isFirst = this.state._pageInfos.length === 0;
                prevActive = this.state._pageInfos[this.state._pageInfos.length - 1];
                if (prevActive && prevActive.isInactive) prevActive = undefined;
                level = 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 15;

                _loop = function _loop() {
                  var pagePathName = _step.value;
                  var isLast = pagePathName === location.pathnames[location.pathnames.length - 1];
                  pathName = (0, _path.join)(pathName, decodeURIComponent(pagePathName));

                  var _pagePathName$split = pagePathName.split(ParamSpe),
                      _pagePathName$split2 = (0, _toArray2.default)(_pagePathName$split),
                      pageName = _pagePathName$split2[0],
                      pageParams = _pagePathName$split2.slice(1);

                  var _id = PageSign + pathName;

                  var pageInfo = {
                    _id: _id,
                    _idPrev: _idPrev,
                    level: level,
                    pageName: pageName,
                    pathName: pathName,
                    pagePathName: pagePathName,
                    isSubPage: false,
                    isActive: isLast,
                    query: location.query,
                    state: _this3._states[pathName],
                    pageParams: pageParams,
                    hash: location.hash ? location.hash.slice(1) : '',
                    subPageInfos: {}
                  };

                  var _router$getRouteByPag = router.getRouteByPageName(pageInfo.pageName),
                      _router$getRouteByPag2 = (0, _slicedToArray2.default)(_router$getRouteByPag, 2),
                      routeName = _router$getRouteByPag2[0],
                      routeDefine = _router$getRouteByPag2[1];

                  if (!routeName || !routeDefine) return {
                    v: _this3.props.app.event.emit(_this3.app._id, 'onRouteErrorNoRoute', pageInfo.pageName, pageInfo, location)
                  };
                  pageInfo.routeName = routeName;
                  pageInfo.routeDefine = routeDefine;
                  pageInfo.routeParams = routeName.split(ParamSpe).slice(1);
                  pageInfo.params = _this3.passParams ? (0, _objectSpread2.default)({}, params) : {};
                  pageInfo.routeParams.forEach(function (v, i) {
                    var optional = v.endsWith(ParamOptional);
                    if (optional) v = v.slice(0, -1);
                    if (!optional && i > pageInfo.pageParams.length - 1) return _this3.app.event.emit(_this3.app._id, 'onRouteErrorNoParam', v, pageInfo, location);
                    pageInfo.params[v] = pageInfo.pageParams[i] ? decodeURIComponent(pageInfo.pageParams[i]) : null;
                    if (_this3.passParams) params[v] = pageInfo.params[v];
                  });

                  var prevOne = _this3.state._pageInfos.find(function (vv) {
                    return vv._id === pageInfo._id;
                  });

                  var isNew = !prevOne;
                  var isPrevActive = prevActive && pageInfo._id === prevActive._id && !isLast;
                  var isReactive = prevActive && pageInfo._id !== prevActive._id && isLast;
                  var status = void 0;

                  if (isFirst) {
                    status = isLast ? 'normal' : 'waitting';
                  } else if (isNew && isLast) {
                    status = isPop ? 'popin' : 'pushin';
                  } else if (isNew && !isLast) {
                    status = 'waitting';
                  } else if (isPrevActive) {
                    status = isPop ? 'popout' : 'pushout';
                  } else if (isReactive) {
                    status = 'popin';
                  } else {
                    status = isLast ? 'normal' : 'background';
                  }

                  pageInfo.status = status;
                  console.log(pageInfo._id, status);
                  var subNo = 0;
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = (Array.isArray(routeDefine.subPages) ? routeDefine.subPages.map(function (v, i) {
                      return [v, v];
                    }) : Object.entries(routeDefine.subPages || {}))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
                          k = _step2$value[0],
                          v = _step2$value[1];

                      var subPageInfo = (0, _objectSpread2.default)({}, pageInfo);
                      subPageInfo._idParent = subPageInfo._id;
                      subPageInfo._idSubPage = k;
                      subPageInfo.subNo = subNo;
                      subPageInfo._id = subPageInfo._id + SubPageSpe + subPageInfo._idSubPage;
                      subPageInfo.pageName = v;
                      subPageInfo.isSubPage = true;
                      subPageInfo.subPageInfos = {};

                      var _router$getRouteByPag3 = router.getRouteByPageName(subPageInfo.pageName),
                          _router$getRouteByPag4 = (0, _slicedToArray2.default)(_router$getRouteByPag3, 2),
                          routeNameSubPage = _router$getRouteByPag4[0],
                          routeDefineSubPage = _router$getRouteByPag4[1];

                      if (!routeNameSubPage || !routeDefineSubPage) return {
                        v: _this3.props.app.event.emit(_this3.app._id, 'onRouteErrorNoRoute', subPageInfo.pageName, subPageInfo, location)
                      };
                      subPageInfo.routeName = routeNameSubPage;
                      subPageInfo.routeDefine = routeDefineSubPage;
                      pageInfo.subPageInfos[subPageInfo._idSubPage] = subPageInfo;
                      subNo++;
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  _idPrev = _id;
                  level++;
                  pageInfos.push(pageInfo);
                };

                _iterator = location.pathnames[Symbol.iterator]();

              case 18:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 25;
                  break;
                }

                _ret = _loop();

                if (!((0, _typeof2.default)(_ret) === "object")) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", _ret.v);

              case 22:
                _iteratorNormalCompletion = true;
                _context.next = 18;
                break;

              case 25:
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](15);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 31:
                _context.prev = 31;
                _context.prev = 32;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 34:
                _context.prev = 34;

                if (!_didIteratorError) {
                  _context.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context.finish(34);

              case 38:
                return _context.finish(31);

              case 39:
                _i = 0;

              case 40:
                if (!(_i < pageInfos.length)) {
                  _context.next = 50;
                  break;
                }

                pageInfo = pageInfos[_i];
                _context.next = 44;
                return this.props.app.event.emit(this.props.app._id, 'onRouteMatch', pageInfo, location);

              case 44:
                _block = _context.sent;

                if (!_block) {
                  _context.next = 47;
                  break;
                }

                return _context.abrupt("return", router.block(_block));

              case 47:
                _i++;
                _context.next = 40;
                break;

              case 50:
                /* inactive */
                if (prevActive) {
                  prevActive.isActive = false;
                  prevActive.isInactive = true;
                  if (!pageInfos.find(function (v) {
                    return v._id === prevActive._id;
                  })) pageInfos.unshift(prevActive);
                }

                poplayers = this.state._popLayerInfos;
                poplayers = poplayers.filter(function (v) {
                  return !v.options._idPage || pageInfos.find(function (v) {
                    return v._id === v.options._idPage;
                  });
                });
                this.setState({
                  _pageInfos: pageInfos
                });

              case 54:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 27, 31, 39], [32,, 34, 38]]);
      }));

      return function _updateRouterInfo(_x) {
        return _updateRouterInfo2.apply(this, arguments);
      };
    }()
  }, {
    key: "_pageTransform",
    value: function _pageTransform() {
      var _this4 = this;

      var app = this.props.app;
      var router = app.router;
      var page = app.Page.getPage();
      var status = page && page.status;
      if (status !== 'normal') requestAnimationFrame(function () {
        return _this4._updateRouterInfo(_this4._history.location);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._pageTransform();
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      debugger;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          _pageInfos = _this$state._pageInfos,
          _popLayerInfos = _this$state._popLayerInfos;
      return _react.default.createElement(_react.default.Fragment, null, _pageInfos.map(function (v) {
        return _react.default.createElement(_this5.Page, (0, _extends2.default)({
          key: v._id
        }, v), Object.entries(v.subPageInfos).reduce(function (vv1, _ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              kk2 = _ref2[0],
              vv2 = _ref2[1];

          vv1[kk2] = _react.default.createElement(_this5.Page, (0, _extends2.default)({
            key: vv2._id
          }, vv2));
          return vv1;
        }, {}));
      }), _popLayerInfos.map(function (v) {
        return _react.default.createElement(_this5.PopLayer, (0, _extends2.default)({
          key: v.options._id
        }, v));
      }));
    }
  }]);
  return RouterComponent;
}(_react.default.Component);

exports.default = RouterComponent;