function Message(status, message, data) {
    var _this = this;

    _this.status = status ? status : undefined;
    _this.message = message ? message : undefined;
    _this.data = data ? data : undefined;

    _this.setStatus = function (status) {
        _this.status = status;
        return _this;
    }

    _this.setMessage = function (message) {
        _this.message = message;
        return _this;
    }

    _this.setData = function (data) {
        _this.data = data;
        return _this;
    }
}

module.exports = Message;