var Hex = (function () {
    function Hex(Q, R) {
        this._H = 1;
        this.Tile = new Tile();
        this._Q = Q;
        this._R = R;
        this._S = -Q - R;
        if (this._Q + this._R + this._S != 0) {
            console.log(this);
            throw "Violates Q+R+S=0 constraint!";
        }
    }
    Hex.equals = function (A, B) {
        if (A._Q === B._Q && A._R === B._R && A._S === B._S) {
            return true;
        }
        return false;
    };
    Hex.hex_add = function (a, b) {
        return new Hex(a._Q + b._Q, a._R + b._R, a._S + b._S);
    };
    Hex.hex_subtract = function (a, b) {
        return new Hex(a._Q - b._Q, a._R - b._R, a._S - b._S);
    };
    Hex.hex_multiply = function (a, f) {
        return new Hex(a._Q * f, a._R * f, a._S * f);
    };
    Hex.hex_length = function (a) {
        return new Number(Math.abs(a._Q) + Math.abs(a._R) + Math.abs(a._S) / 2);
    };
    Hex.hex_distance = function (a, b) {
        return Hex.hex_length(Hex.hex_subtract(a, b));
    };
    return Hex;
}());
//# sourceMappingURL=Hex.js.map