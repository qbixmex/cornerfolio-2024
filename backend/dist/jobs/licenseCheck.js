"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyLicenseCheck = void 0;
const models_1 = require("../models");
const node_schedule_1 = __importDefault(require("node-schedule"));
exports.dailyLicenseCheck = node_schedule_1.default.scheduleJob("0 0 * * * *", //* this is just to check if works correctly every 24 hours
async () => {
    // export const dailyLicenseCheck = schedule.scheduledJob("0 0 * * *", async () => { //* this will check license expiration at 00:00 everyday
    const currentDateUTC = new Date();
    const localCurrentDate = new Date(currentDateUTC.getTime() - currentDateUTC.getTimezoneOffset() * 60000);
    // console.log("Today's date: ", localCurrentDate);
    try {
        console.log("Implementing every 24 hours");
        const licenses = await models_1.License.find();
        for (const license of licenses) {
            if (license.endDate && license.endDate < localCurrentDate) {
                console.log("before downgrading", license);
                license.type = "free";
                license.startDate = null;
                license.endDate = null;
                console.log("after downgrading", license);
                await license.save();
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=licenseCheck.js.map