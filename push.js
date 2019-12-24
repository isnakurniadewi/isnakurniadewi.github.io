var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCPEKqcdMYSnp7_-rFoq2l0NdaIYk_ZBlCFoPgmsorPikXvXm3RUSQzJAfJQcM",
   "privateKey": "aaIQcnoD1qBhztTqhA"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/doNre0ZfXHo:APA91bFN3nH7r9BkqH_nGw3hLKUhirfbvgP-j3NOBLKebz5sXDgDtNivIlQSiZRC0EV7ZWiSE_-YmDuZsiFtZgNmEB4nwM1eUkmqcP42bk9iFEuEch1oTGwOOqgpEcYVDSLntgInL0tu",
   "keys": {
       "p256dh": "BEQ86fllVB71/sRcX3zs3BX+xXZHHMpi/nqL4j12BRSOV2HNLe1zZ8li3Ry2f0BUdstpZgEXqjNwr0J6rGF0iZw=",
       "auth": "xJUoU+7Tny4guPrVOp/Xzg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '941295860789',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);