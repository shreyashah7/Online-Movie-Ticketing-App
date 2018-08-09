var modelBilling = require('./../../models/Billing');

function handle_request(msg, callback) {
    console.log(`Handle request: ${msg}`);
    modelBilling.find({ where: { bill_id: msg.bill_id } })
        .then((bill) => {
            bill.update({ status: 'C' })
                .then(function (updatedBill) {
                    callback(null, updatedBill);
                })
        })
}

module.exports = {
    handle_request
}