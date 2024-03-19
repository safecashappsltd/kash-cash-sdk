function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var axios = _interopDefault(require('axios'));
var Modal = _interopDefault(require('react-modal'));
var QRCode = _interopDefault(require('react-qr-code'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var url = 'https://prod-api.safecashapps.com/api/external/v1/';
var endPoints = {
  login: 'login',
  create: 'request/create',
  cancel: 'request/cancel',
  generatePaymentCode: 'transactions/generate/code',
  statusForPOS: 'request/statusForPOSByTransactionId'
};
var ErrorResponsesMessage;
(function (ErrorResponsesMessage) {
  ErrorResponsesMessage["EMPTY_REQUEST"] = "request data are empty";
  ErrorResponsesMessage["MUST_LOGIN"] = "must login first";
  ErrorResponsesMessage["ZERO_AMOUNT"] = "Amount cant be zero or less";
  ErrorResponsesMessage["EXTERNAL_ID_EMPTY"] = "externalId not provided";
  ErrorResponsesMessage["USERNAME_PASSWORD_EMPTY"] = "username or password not provided";
  ErrorResponsesMessage["BUSINESS_ID_EMPTY"] = "businessId not provided";
})(ErrorResponsesMessage || (ErrorResponsesMessage = {}));
var ErrorStatuses;
(function (ErrorStatuses) {
  ErrorStatuses[ErrorStatuses["EMPTY"] = 0] = "EMPTY";
  ErrorStatuses[ErrorStatuses["ZERO"] = 1] = "ZERO";
  ErrorStatuses[ErrorStatuses["NOT_PROVIDED"] = 2] = "NOT_PROVIDED";
  ErrorStatuses[ErrorStatuses["EXTERNAL"] = 3] = "EXTERNAL";
})(ErrorStatuses || (ErrorStatuses = {}));

(function (Type) {
  Type[Type["WITH_ICON"] = 0] = "WITH_ICON";
  Type[Type["WITHOUT_ICON"] = 1] = "WITHOUT_ICON";
})(exports.Type || (exports.Type = {}));

(function (Style) {
  Style[Style["BRIGHT"] = 0] = "BRIGHT";
  Style[Style["DARK"] = 1] = "DARK";
})(exports.Style || (exports.Style = {}));
var TransactionType;
(function (TransactionType) {
  TransactionType[TransactionType["DEBIT_TRANSACTION"] = 101] = "DEBIT_TRANSACTION";
  TransactionType[TransactionType["REFUND_TRANSACTION"] = 103] = "REFUND_TRANSACTION";
})(TransactionType || (TransactionType = {}));
var BuyerMethod;
(function (BuyerMethod) {
  BuyerMethod[BuyerMethod["BLUETOOTH"] = 0] = "BLUETOOTH";
  BuyerMethod[BuyerMethod["QR_CODE"] = 1] = "QR_CODE";
  BuyerMethod[BuyerMethod["PAY_BY_CODE"] = 2] = "PAY_BY_CODE";
})(BuyerMethod || (BuyerMethod = {}));
var TransactionStatus;
(function (TransactionStatus) {
  TransactionStatus[TransactionStatus["PENDING"] = 0] = "PENDING";
  TransactionStatus[TransactionStatus["SUCCESS"] = 1] = "SUCCESS";
  TransactionStatus[TransactionStatus["CANCELED"] = 2] = "CANCELED";
  TransactionStatus[TransactionStatus["REJECTED"] = 3] = "REJECTED";
  TransactionStatus[TransactionStatus["REQUESTED"] = 7] = "REQUESTED";
  TransactionStatus[TransactionStatus["LIMITED"] = -1] = "LIMITED";
})(TransactionStatus || (TransactionStatus = {}));
var emptyData = function emptyData() {
  return {
    message: ErrorResponsesMessage.EMPTY_REQUEST,
    errorCode: ErrorStatuses.EMPTY,
    status: ErrorStatuses.EMPTY
  };
};
var amountLessThenZero = function amountLessThenZero() {
  return {
    message: ErrorResponsesMessage.ZERO_AMOUNT,
    errorCode: ErrorStatuses.ZERO,
    status: ErrorStatuses.ZERO
  };
};
var externalIdNotProvided = function externalIdNotProvided() {
  return {
    message: ErrorResponsesMessage.EXTERNAL_ID_EMPTY,
    errorCode: ErrorStatuses.NOT_PROVIDED,
    status: ErrorStatuses.NOT_PROVIDED
  };
};
var mustLoginFirst = function mustLoginFirst() {
  return {
    message: ErrorResponsesMessage.MUST_LOGIN,
    errorCode: ErrorStatuses.EXTERNAL,
    status: ErrorStatuses.EXTERNAL
  };
};

var ButtonComponent = function ButtonComponent(_ref) {
  var title = _ref.title,
    onPress = _ref.onPress,
    customButtonStyle = _ref.customButtonStyle,
    sdkConfig = _ref.sdkConfig;
  var buttonStyle = sdkConfig.buttonStyle,
    buttonType = sdkConfig.buttonType;
  var color = buttonStyle === exports.Style.BRIGHT;
  var type = buttonType === exports.Type.WITHOUT_ICON;
  var styles = {
    color: color ? 'white' : 'black',
    backgroundColor: color ? 'orange' : 'white',
    borderRadius: type ? '8px' : '25px',
    padding: '10px',
    fontFamily: 'Sans-Serif'
  };
  return React__default.createElement("div", null, React__default.createElement("button", {
    style: _extends({}, styles, customButtonStyle),
    onClick: onPress
  }, React__default.createElement("h3", null, title)));
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0'
};
var create = function create(req) {
  try {
    return Promise.resolve(_catch(function () {
      if (!req) {
        return emptyData();
      }
      var amount = req.amount,
        externalId = req.externalId,
        auth = req.auth,
        businessId = req.businessId,
        customCreateTransactionFunction = req.customCreateTransactionFunction;
      if (!auth) {
        return mustLoginFirst();
      }
      if (externalId === '') {
        return externalIdNotProvided();
      }
      if (amount <= 0) {
        return amountLessThenZero();
      }
      var headers = _extends({}, baseHeaders, {
        "x-api-key": auth
      });
      if (customCreateTransactionFunction) {
        return Promise.resolve(customCreateTransactionFunction(amount, externalId, businessId)).then(function (response) {
          var status = response.status,
            data = response.data;
          return {
            data: data,
            status: status,
            errorCode: 200,
            message: 'Ok'
          };
        });
      } else {
        return Promise.resolve(axios.post("" + url + endPoints.create, {
          amount: amount,
          externalId: externalId,
          businessId: businessId
        }, {
          headers: headers
        })).then(function (response) {
          var status = response.status,
            data = response.data;
          return {
            data: data,
            status: status,
            errorCode: 200,
            message: 'Ok'
          };
        });
      }
    }, function (error) {
      return {
        message: JSON.stringify(error),
        errorCode: 404,
        status: 404
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var generateManualCode = function generateManualCode(req) {
  try {
    var auth = req.auth,
      transactionId = req.transactionId,
      businessId = req.businessId;
    if (!transactionId && transactionId === '') {
      return Promise.resolve({
        message: 'generateManualCode not transaction id',
        errorCode: 404,
        status: 404
      });
    }
    var headers = _extends({}, baseHeaders, {
      "x-api-key": auth
    });
    return Promise.resolve(_catch(function () {
      return Promise.resolve(axios.post("" + url + endPoints.generatePaymentCode, {
        transactionId: transactionId,
        businessId: businessId
      }, {
        headers: headers
      })).then(function (response) {
        var status = response.status,
          data = response.data;
        return {
          data: data,
          status: status,
          errorCode: 200,
          message: 'Ok'
        };
      });
    }, function (error) {
      return {
        message: JSON.stringify(error),
        errorCode: 404,
        status: 404
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getTransactionStatus = function getTransactionStatus(req) {
  try {
    var auth = req.auth,
      transactionId = req.transactionId,
      businessId = req.businessId;
    if (!transactionId && transactionId === '') {
      return Promise.resolve({
        message: 'generateManualCode not transaction id',
        errorCode: 404,
        status: 404
      });
    }
    var headers = _extends({}, baseHeaders, {
      "x-api-key": auth
    });
    return Promise.resolve(_catch(function () {
      return Promise.resolve(axios.post("" + url + endPoints.statusForPOS, {
        transactionId: transactionId,
        businessId: businessId
      }, {
        headers: headers
      })).then(function (response) {
        var status = response.status,
          data = response.data;
        return {
          data: data,
          status: status,
          errorCode: 200,
          message: 'Ok'
        };
      });
    }, function (error) {
      return {
        message: JSON.stringify(error),
        errorCode: 404,
        status: 404
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var cancelTransaction = function cancelTransaction(req) {
  try {
    var auth = req.auth,
      transactionId = req.transactionId,
      businessId = req.businessId;
    var headers = _extends({}, baseHeaders, {
      "x-api-key": auth
    });
    return Promise.resolve(_catch(function () {
      return Promise.resolve(axios.post("" + url + endPoints.cancel, {
        transactionId: transactionId,
        businessId: businessId
      }, {
        headers: headers
      })).then(function (response) {
        var status = response.status,
          data = response.data;
        return {
          data: data,
          status: status,
          errorCode: 200,
          message: 'Ok'
        };
      });
    }, function (error) {
      return {
        message: JSON.stringify(error),
        errorCode: 404,
        status: 404
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var usePolling = function usePolling(data) {
  var businessId = data.businessId,
    pollingInterval = data.pollingInterval,
    closeModal = data.closeModal;
  var _useState = React.useState(false),
    isPollingProcess = _useState[0],
    setPollingProcess = _useState[1];
  var _useState2 = React.useState(TransactionStatus.REQUESTED),
    isStatusFinal = _useState2[0],
    setIsStatusFinal = _useState2[1];
  var _useState3 = React.useState(false),
    isError = _useState3[0],
    setIsError = _useState3[1];
  var interval;
  var timeout;
  var transactionStatusPolling = function transactionStatusPolling(transactionId, auth) {
    try {
      interval = setInterval(function () {
        getTransactionStatusUpdate(transactionId, auth);
        return Promise.resolve();
      }, pollingInterval);
      timeout = setTimeout(function () {
        stopInterval();
        cancelTransaction({
          businessId: businessId,
          transactionId: transactionId,
          auth: auth
        });
      }, 60000);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var getTransactionStatusUpdate = function getTransactionStatusUpdate(transactionId, auth) {
    return Promise.resolve(getTransaction(transactionId, auth)).then(function (res) {
      setIsStatusFinal(function (prevState) {
        if (prevState === res) {
          return prevState;
        } else {
          return res;
        }
      });
    });
  };
  var getTransaction = function getTransaction(transactionId, auth) {
    try {
      var _exit = false;
      var transactionStatus = TransactionStatus.REQUESTED;
      var _temp = _catch(function () {
        setPollingProcess(true);
        return Promise.resolve(getTransactionStatus({
          businessId: businessId,
          transactionId: transactionId,
          auth: auth
        })).then(function (response) {
          var _response$data;
          if (response.errorCode !== 200) {
            stopInterval();
            setIsStatusFinal(0);
            transactionStatus = TransactionStatus.REQUESTED;
            setIsError(true);
            _exit = true;
            return;
          }
          switch ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.transactionStatus) {
            case TransactionStatus.CANCELED:
            case TransactionStatus.REJECTED:
            case TransactionStatus.SUCCESS:
            case TransactionStatus.LIMITED:
              stopInterval();
              transactionStatus = response.data.transactionStatus;
              setIsError(true);
              break;
            case TransactionStatus.PENDING:
            case TransactionStatus.REQUESTED:
              transactionStatus = response.data.transactionStatus;
              break;
          }
        });
      }, function () {
        transactionStatus = TransactionStatus.CANCELED;
        cancelTransaction({
          businessId: businessId,
          transactionId: transactionId,
          auth: auth
        });
        closeModal();
        setPollingProcess(false);
        setIsError(true);
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function (_result) {
        return _exit ? _result : transactionStatus;
      }) : _exit ? _temp : transactionStatus);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var stopInterval = function stopInterval() {
    closeModal();
    clearTimeout(timeout);
    clearInterval(interval);
    setPollingProcess(false);
  };
  return {
    isError: isError,
    isStatusFinal: isStatusFinal,
    isPollingProcess: isPollingProcess,
    stopInterval: stopInterval,
    transactionStatusPolling: transactionStatusPolling
  };
};

var useCreateTransaction = function useCreateTransaction(sdkConfig, externalId, amount, onSuccess, onError, returnUrl) {
  var _useState = React.useState(false),
    isModalShow = _useState[0],
    setIsModalShow = _useState[1];
  var _useState2 = React.useState(false),
    isProcessing = _useState2[0],
    setIsProcessing = _useState2[1];
  var _useState3 = React.useState(''),
    qrCode = _useState3[0],
    setQrCode = _useState3[1];
  var _useState4 = React.useState(''),
    manualCode = _useState4[0],
    setManualCode = _useState4[1];
  var _useState5 = React.useState(''),
    transactionId = _useState5[0],
    setTransactionId = _useState5[1];
  var showModal = function showModal() {
    setIsModalShow(true);
  };
  var closeModal = function closeModal() {
    setIsModalShow(false);
  };
  var _usePolling = usePolling({
      businessId: sdkConfig.businessId,
      pollingInterval: sdkConfig.pollingInterval,
      closeModal: closeModal
    }),
    isStatusFinal = _usePolling.isStatusFinal,
    transactionStatusPolling = _usePolling.transactionStatusPolling,
    stopInterval = _usePolling.stopInterval;
  var openAppWithCashierClient = function openAppWithCashierClient(requestId) {
    var appSchema = "cashiclient://payByIntent?requestId=" + requestId + "&schemaUrl=" + returnUrl;
    if (window.location && window.location.assign) {
      window.location.assign(appSchema);
    } else {
      window.location.href = appSchema;
    }
  };
  var createTransaction = function createTransaction() {
    try {
      setIsProcessing(true);
      return Promise.resolve(create({
        externalId: externalId,
        amount: amount,
        auth: sdkConfig.merchantToken,
        businessId: sdkConfig.businessId,
        customCreateTransactionFunction: sdkConfig.customCreateTransactionFunction
      })).then(function (response) {
        var _temp = function () {
          if (response.status === 200 && response.data) {
            openAppWithCashierClient(response.data.transactionId);
            setQrCode(response.data.qrCodeAsString);
            setTransactionId(response.data.transactionId);
            return Promise.resolve(generateManualCode({
              auth: sdkConfig.merchantToken,
              transactionId: response.data.transactionId,
              businessId: sdkConfig.businessId
            })).then(function (manualCodeResponse) {
              setManualCode(manualCodeResponse === null || manualCodeResponse === void 0 ? void 0 : manualCodeResponse.data);
              showModal();
              onSuccess(response);
              transactionStatusPolling(response.data.transactionId, sdkConfig.merchantToken);
              setIsProcessing(false);
            });
          } else {
            onError(response);
            setIsProcessing(false);
          }
        }();
        if (_temp && _temp.then) return _temp.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return {
    createTransaction: createTransaction,
    showModal: showModal,
    closeModal: closeModal,
    stopInterval: stopInterval,
    transactionId: transactionId,
    isModalShow: isModalShow,
    isProcessing: isProcessing,
    qrCode: qrCode,
    manualCode: manualCode,
    isStatusFinal: isStatusFinal
  };
};

var QRCodeModal = function QRCodeModal(props) {
  var isModalShow = props.isModalShow,
    closeModal = props.closeModal,
    qrValue = props.qrValue,
    manualCode = props.manualCode;
  return React__default.createElement("div", null, React__default.createElement(Modal, {
    isOpen: isModalShow,
    onAfterOpen: function onAfterOpen() {},
    onRequestClose: closeModal,
    style: customStyles,
    contentLabel: 'Payment'
  }, React__default.createElement("div", {
    style: {
      background: 'white',
      padding: '16px',
      borderRadius: 10
    }
  }, React__default.createElement("button", {
    onClick: closeModal,
    style: {
      position: 'absolute',
      right: 10,
      top: 10,
      borderWidth: 0,
      backgroundColor: 'transparent'
    }
  }, React__default.createElement("text", {
    style: {
      fontSize: 18,
      fontWeight: 'bolder'
    }
  }, "X")), React__default.createElement(QRCode, {
    value: qrValue
  }), React__default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px'
    }
  }, React__default.createElement("text", {
    style: {
      fontSize: 22,
      fontWeight: 'bold'
    }
  }, 'Code: ' + manualCode)))));
};
var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999
  }
};

var DEFAULT_POLLING_INTERVAL = 5000;
var EMPTY_STRING = '';
var PROCESSING = 'בתהליך...';

var sdkConfig = {
  username: EMPTY_STRING,
  password: EMPTY_STRING,
  businessId: EMPTY_STRING,
  posVendorId: undefined,
  version: undefined,
  pollingInterval: DEFAULT_POLLING_INTERVAL,
  merchantToken: EMPTY_STRING,
  customCreateTransactionFunction: undefined,
  buttonType: exports.Type.WITH_ICON,
  buttonStyle: exports.Style.BRIGHT
};
var KashCashInit = function KashCashInit(config) {
  var username = config.username,
    password = config.password,
    businessId = config.businessId,
    posVendorId = config.posVendorId,
    version = config.version,
    pollingInterval = config.pollingInterval,
    merchantToken = config.merchantToken,
    customCreateTransactionFunction = config.customCreateTransactionFunction,
    buttonStyle = config.buttonStyle,
    buttonType = config.buttonType;
  sdkConfig.username = username;
  sdkConfig.password = password;
  sdkConfig.businessId = businessId;
  sdkConfig.posVendorId = posVendorId;
  sdkConfig.version = version;
  sdkConfig.pollingInterval = pollingInterval;
  sdkConfig.merchantToken = merchantToken;
  sdkConfig.customCreateTransactionFunction = customCreateTransactionFunction;
  sdkConfig.buttonStyle = buttonStyle;
  sdkConfig.buttonType = buttonType;
};
var KashCashPay = function KashCashPay(_ref) {
  var customButtonStyle = _ref.customButtonStyle,
    externalId = _ref.externalId,
    onSuccess = _ref.onSuccess,
    onError = _ref.onError,
    amount = _ref.amount,
    returnUrl = _ref.returnUrl,
    onTransactionStatus = _ref.onTransactionStatus;
  var _useCreateTransaction = useCreateTransaction(sdkConfig, externalId, amount, onSuccess, onError, returnUrl),
    createTransaction = _useCreateTransaction.createTransaction,
    closeModal = _useCreateTransaction.closeModal,
    stopInterval = _useCreateTransaction.stopInterval,
    isModalShow = _useCreateTransaction.isModalShow,
    isProcessing = _useCreateTransaction.isProcessing,
    qrCode = _useCreateTransaction.qrCode,
    manualCode = _useCreateTransaction.manualCode,
    transactionId = _useCreateTransaction.transactionId,
    isStatusFinal = _useCreateTransaction.isStatusFinal;
  var manualCloseModal = function manualCloseModal() {
    closeModal();
    cancelTransaction({
      transactionId: transactionId,
      auth: sdkConfig.merchantToken,
      businessId: sdkConfig.businessId
    });
  };
  React.useEffect(function () {
    switch (isStatusFinal) {
      case TransactionStatus.CANCELED:
        manualCloseModal();
      case TransactionStatus.LIMITED:
      case TransactionStatus.REJECTED:
        closeModal();
        stopInterval();
        break;
      case TransactionStatus.SUCCESS:
        closeModal();
        break;
    }
    onTransactionStatus(isStatusFinal);
    return function () {
      cancelTransaction({
        transactionId: transactionId,
        auth: sdkConfig.merchantToken,
        businessId: sdkConfig.businessId
      });
    };
  }, [isStatusFinal]);
  return React.createElement("div", null, React.createElement(ButtonComponent, {
    sdkConfig: sdkConfig,
    title: isProcessing ? PROCESSING : 'תשלום בקשקאש',
    onPress: createTransaction,
    customButtonStyle: customButtonStyle
  }), React.createElement(QRCodeModal, {
    manualCode: manualCode,
    qrValue: qrCode,
    isModalShow: isModalShow,
    closeModal: manualCloseModal
  }));
};

exports.KashCashInit = KashCashInit;
exports.default = KashCashPay;
//# sourceMappingURL=index.js.map
