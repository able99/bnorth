"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

require("core-js/modules/es6.string.ends-with");

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.starts-with");

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _history = require("history");

var _path = require("path");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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

    _this.app = RouterComponent.app;
    /**
     * 模块的 id
     * @type {string}
     */

    _this._id = _this.app._id + '.router.component';
    _this.state = {
      pageInfos: [],
      poplayerInfos: []
    };
    _this.app.router.component = (0, _assertThisInitialized2.default)(_this);
    _this.spePage = '/';
    _this.prePage = '#';
    _this.preSubPage = '|';
    _this.speParams = ':';
    _this.optionalParams = '?';
    _this._locationStates = {};
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
    _this.Page = _this.app.context.consumerHoc(_this.app.Page);
    _this.Poplayer = _this.app.context.consumerHoc(_this.app.Poplayer);
    _this.historyCount = 0;
    _this.history = (0, _history.createHashHistory)();

    _this.history.listen(function (location, action) {
      return _this._handleLocationChange();
    });

    _this._handleLocationChange();

    return _this;
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "_handleLocationChange",
    value: function _handleLocationChange() {
      var _this2 = this;

      var location = this.history.location;
      var action = this.history.action;
      RouterComponent.app.event.emit(RouterComponent.app._id, 'onLocationChange', location, action);
      (0, _keys.default)(this._locationStates).filter(function (v) {
        return !location.pathname.startsWith(v);
      }).forEach(function (v) {
        delete _this2._locationStates[v];
      });
      if (location.state) this._locationStates[location.pathname] = location.state;
      location.query = {};
      location.search.slice(1).split('&').filter(function (v) {
        return v;
      }).forEach(function (v) {
        var vs = v.split('=');
        location.query[vs[0]] = decodeURIComponent(vs[1]);
      });
      if (action === 'PUSH') this.historyCount++;
      if (action === 'POP') this.historyCount = Math.max(--this.historyCount, 0);
      var pos = 0;
      var pathnames = [];

      while (pos < location.pathname.length - 1) {
        var index = location.pathname.indexOf(this.spePage, pos + 1);
        index = index >= 0 ? index : location.pathname.length;
        var sub = location.pathname.slice(pos + 1, index);

        if (pos === 0 && sub[0] === this.speParams || RouterComponent.app.router.getRouteByPageName(this.spePage + sub.split(this.speParams)[0]).length) {
          pathnames.push(this.spePage + sub);
        } else if (pos === 0) {
          pathnames.push(this.spePage);
          pathnames.push(sub);
        } else {
          pathnames.push(sub);
        }

        pos = index;
      }

      if (!pathnames.length) pathnames.push(this.spePage);
      location.pathnames = pathnames;

      if (location.ignore) {
        location.ignore = false;
      } else {
        this._updateRouterInfo();
      }
    }
  }, {
    key: "_updateRouterInfo",
    value: function () {
      var _updateRouterInfo2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _this3 = this;

        var location, router, pathName, _idPrev, params, pageInfos, isPop, isFirst, prevActive, level, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret, aprevActive, canClose, _i, _pageInfos, pageInfo, _block;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                location = this.history.location;
                router = RouterComponent.app.router;

                if ((0, _keys.default)(router.getRoutes()).length) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                pathName = '';
                params = {};
                pageInfos = [];
                isPop = this.history.action === 'POP';
                isFirst = this.state.pageInfos.length === 0;
                prevActive = this.state.pageInfos[this.state.pageInfos.length - 1];
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

                  var _pagePathName$split = pagePathName.split(_this3.speParams),
                      _pagePathName$split2 = (0, _toArray2.default)(_pagePathName$split),
                      pageName = _pagePathName$split2[0],
                      pageParams = _pagePathName$split2.slice(1);

                  var _id = _this3.prePage + pathName;

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
                    state: _this3._locationStates[pathName],
                    pageParams: pageParams,
                    hash: location.hash ? location.hash.slice(1) : '',
                    subPageInfos: {}
                  };

                  var _router$getRouteByPag = router.getRouteByPageName(pageInfo.pageName),
                      _router$getRouteByPag2 = (0, _slicedToArray2.default)(_router$getRouteByPag, 2),
                      routeName = _router$getRouteByPag2[0],
                      routeDefine = _router$getRouteByPag2[1];

                  if (!routeName || !routeDefine) return {
                    v: RouterComponent.app.event.emit(RouterComponent.app._id, 'onRouteError', pageInfo.pageName, pageInfo, location)
                  };
                  pageInfo.routeName = routeName;
                  pageInfo.routeDefine = routeDefine;
                  pageInfo.routeParams = routeName.split(_this3.speParams).slice(1);
                  pageInfo.params = _this3.passParams ? _objectSpread({}, params) : {};
                  pageInfo.routeParams.forEach(function (v, i) {
                    var optional = v.endsWith(_this3.optionalParams);
                    if (optional) v = v.slice(0, -1);
                    if (!optional && i > pageInfo.pageParams.length - 1) return _this3.app.event.emit(RouterComponent.app._id, 'onRouteError', v, pageInfo, location);
                    pageInfo.params[v] = pageInfo.pageParams[i] ? decodeURIComponent(pageInfo.pageParams[i]) : null;
                    if (_this3.passParams) params[v] = pageInfo.params[v];
                  });

                  var prevOne = _this3.state.pageInfos.find(function (vv) {
                    return vv._id === pageInfo._id;
                  });

                  var isNew = !prevOne;
                  var isPrevActive = prevActive && pageInfo._id === prevActive._id && !isLast;
                  var isReactive = isLast && prevOne && (!prevActive || pageInfo._id !== prevActive._id);

                  if (isFirst) {
                    pageInfo.status = isLast ? 'normal' : 'waitting';
                  } else if (isNew && isLast) {
                    pageInfo.status = isPop ? 'popin' : 'pushin';
                  } else if (isNew && !isLast) {
                    pageInfo.status = 'waitting';
                  } else if (isPrevActive) {
                    pageInfo.status = isPop ? 'popout' : 'pushout';
                  } else if (isReactive) {
                    pageInfo.status = 'popin';
                  } else {
                    pageInfo.status = isLast ? 'normal' : 'background';
                  }

                  var subNo = 0;
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = (0, _getIterator2.default)((0, _isArray.default)(routeDefine.subPages) ? routeDefine.subPages.map(function (v, i) {
                      return [v, v];
                    }) : (0, _entries.default)(routeDefine.subPages || {})), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
                          k = _step2$value[0],
                          v = _step2$value[1];

                      var subPageInfo = _objectSpread({}, pageInfo);

                      subPageInfo._idParent = subPageInfo._id;
                      subPageInfo._idSubPage = k;
                      subPageInfo.subNo = subNo;
                      subPageInfo._id = subPageInfo._id + _this3.preSubPage + subPageInfo._idSubPage;
                      subPageInfo.pageName = v;
                      subPageInfo.isSubPage = true;
                      subPageInfo.subPageInfos = {};

                      var _router$getRouteByPag3 = router.getRouteByPageName(subPageInfo.pageName),
                          _router$getRouteByPag4 = (0, _slicedToArray2.default)(_router$getRouteByPag3, 2),
                          routeNameSubPage = _router$getRouteByPag4[0],
                          routeDefineSubPage = _router$getRouteByPag4[1];

                      if (!routeNameSubPage || !routeDefineSubPage) return {
                        v: RouterComponent.app.event.emit(RouterComponent.app._id, 'onRouteError', subPageInfo.pageName, subPageInfo, location)
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

                _iterator = (0, _getIterator2.default)(location.pathnames);

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
                if (!(prevActive && !this._isTransforming())) {
                  _context.next = 57;
                  break;
                }

                aprevActive = pageInfos.find(function (v) {
                  return v._id === prevActive._id;
                });

                if (!aprevActive) {
                  _context.next = 46;
                  break;
                }

                aprevActive.isActive = false;
                aprevActive.isInactive = true;
                _context.next = 57;
                break;

              case 46:
                if (!this.app.Page.getPage(prevActive._id)._onWillClose) {
                  _context.next = 53;
                  break;
                }

                _context.next = 49;
                return this.app.Page.getPage(prevActive._id)._onWillClose();

              case 49:
                canClose = _context.sent;

                if (canClose) {
                  _context.next = 53;
                  break;
                }

                this._location.ignore = true;
                return _context.abrupt("return", this.history.push(this._location));

              case 53:
                prevActive.isActive = false;
                prevActive.isInactive = true;
                prevActive.status = isPop ? 'popout' : 'pushout';
                pageInfos.unshift(prevActive);

              case 57:
                _i = 0, _pageInfos = pageInfos;

              case 58:
                if (!(_i < _pageInfos.length)) {
                  _context.next = 70;
                  break;
                }

                pageInfo = _pageInfos[_i];

                if (!pageInfo.isInactive) {
                  _context.next = 62;
                  break;
                }

                return _context.abrupt("continue", 67);

              case 62:
                _context.next = 64;
                return RouterComponent.app.event.emit(RouterComponent.app._id, 'onRouteMatch', pageInfo, location);

              case 64:
                _block = _context.sent;

                if (!_block) {
                  _context.next = 67;
                  break;
                }

                return _context.abrupt("return", router.block(_block));

              case 67:
                _i++;
                _context.next = 58;
                break;

              case 70:
                this.setState({
                  error: null,
                  pageInfos: pageInfos,
                  poplayerInfos: this.state.poplayerInfos.filter(function (v) {
                    return !v.options._idPage || pageInfos.find(function (vv) {
                      return vv._id === v.options._idPage;
                    });
                  })
                });
                this._location = this.history.location;

              case 72:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 27, 31, 39], [32,, 34, 38]]);
      }));

      function _updateRouterInfo() {
        return _updateRouterInfo2.apply(this, arguments);
      }

      return _updateRouterInfo;
    }()
  }, {
    key: "_isTransforming",
    value: function _isTransforming() {
      return this.state.pageInfos[this.state.pageInfos.length - 1].status.includes('in');
    }
  }, {
    key: "_pageTransform",
    value: function _pageTransform() {
      var _this4 = this;

      var page = RouterComponent.app.Page.getPage();
      var status = page && page.status;

      if (status !== 'normal') {
        this._isPageTransforming = true;
        requestAnimationFrame(function () {
          _this4._isPageTransforming = false;

          _this4._updateRouterInfo(_this4.history.location);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      !this.state.error && this._pageTransform();
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        error: {
          message: error,
          data: info
        }
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return !this._isPageTransforming;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          pageInfos = _this$state.pageInfos,
          poplayerInfos = _this$state.poplayerInfos,
          error = _this$state.error;
      return _react.default.createElement(_react.default.Fragment, null, error ? _react.default.createElement(RouterComponent.app.router.ComponentError, (0, _extends2.default)({
        RouterError: true
      }, error)) : null, !error && pageInfos.map(function (v) {
        return _react.default.createElement(_this5.Page, (0, _extends2.default)({
          key: v._id
        }, v), (0, _entries.default)(v.subPageInfos).reduce(function (vv1, _ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              kk2 = _ref2[0],
              vv2 = _ref2[1];

          vv1[kk2] = _react.default.createElement(_this5.Page, (0, _extends2.default)({
            key: vv2._id
          }, vv2));
          return vv1;
        }, {}));
      }), !error && poplayerInfos.map(function (v) {
        return _react.default.createElement(_this5.Poplayer, (0, _extends2.default)({
          key: v.options._id
        }, v));
      }));
    }
  }]);
  return RouterComponent;
}(_react.default.Component);

exports.default = RouterComponent;