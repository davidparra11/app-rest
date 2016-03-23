/**
 * Created by HP 14 V014 on 22/03/2016.
 */
module.exports = {

    attributes: {
        // Sender
        from: {
            model: 'user',
            required: true
        },
        // Receiver
        channel: {
            model: 'channel',
            required: true
        },
        msg: {
            type: 'text',
            required: true
        }


    }
};
