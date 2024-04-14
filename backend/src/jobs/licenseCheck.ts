import { License } from "../models";

const schedule = require('node-schedule');

export const dailyLicenseCheck = schedule.scheduleJob("*/5 * * * * *", async () => {    //* this is just to check if works correctly every 5 seconds
    // export const dailyLicenseCheck = schedule.scheduledJob("0 0 * * *", async () => {    //* this will check license expiration at 00:00 everyday
    const currentDateUTC = new Date();
    const localCurrentDate = new Date(currentDateUTC.getTime() - currentDateUTC.getTimezoneOffset() * 60000);
    console.log("Today's date: ", localCurrentDate);

    try {
        console.log("Implementing every 5 seconds");

        const licenses = await License.find();
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
    } catch (err) {
        console.log(err);
    }
});