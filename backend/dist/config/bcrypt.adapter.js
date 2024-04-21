"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const bcryptAdapter = {
    hash: (password) => {
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        return (0, bcryptjs_1.hashSync)(password, salt);
    },
    compare: (password, hashedPassword) => {
        return (0, bcryptjs_1.compareSync)(password, hashedPassword);
    }
};
exports.default = bcryptAdapter;
//# sourceMappingURL=bcrypt.adapter.js.map