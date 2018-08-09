const billingmodel = require('../../models/Billing');

module.exports = {
    bookMovie: async function(body,cb){
        const bill = await billingmodel.create(body);
        if(bill.bill_id){
            cb(null,{bill_id:bill.bill_id});
        }else{
            cb(null,null);
        }
    },
    cancelBooking: async function(body,cb){
        const bill_id = body['bill_id'];
        const result = await billingmodel.update({"status":"C"},{where:{"bill_id":bill_id}});
        if(result){
            cb(null,result);
        }else{
            cb(null,"bill_id does not exist");
        }
    }
};