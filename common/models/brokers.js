'use strict';

var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "noreply@asksage.com"; //Replace this address with actual address

module.exports = function (Broker) {

  //Reset
  Broker.on('resetPasswordRequest', function (info) {
    // console.log(info.email); // the email of the requested user
    // console.log(info.accessToken.id); // the temp access token to allow password reset

    Broker.email(info.email,info.accessToken.id );
    // // requires AccessToken.belongsTo(User)
    // info.accessToken.user(function (err, user) {
    //   console.log(user); // the actual user
    // });
  });


  //   Broker.disableRemoteMethodByName('create');
  //   Broker.disableRemoteMethodByName('upsert');
  //   Broker.disableRemoteMethodByName('updateAll');
  //   Broker.disableRemoteMethodByName('prototype.updateAttributes');

  //   Broker.disableRemoteMethodByName('find');
  //   // Broker.disableRemoteMethodByName('findById');
  //   Broker.disableRemoteMethodByName('findOne');

  //   Broker.disableRemoteMethodByName('deleteById');

  //   Broker.disableRemoteMethodByName('confirm');
  //   Broker.disableRemoteMethodByName('count');
  //   Broker.disableRemoteMethodByName('exists');
  //   Broker.disableRemoteMethodByName('resetPassword');

  //   Broker.disableRemoteMethodByName('prototype.__count__accessTokens');
  //   Broker.disableRemoteMethodByName('prototype.__create__accessTokens');
  //   Broker.disableRemoteMethodByName('prototype.__delete__accessTokens');
  //   Broker.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  //  // // Broker.disableRemoteMethodByName('prototype.__findById__accessTokens');
  //   Broker.disableRemoteMethodByName('prototype.__get__accessTokens');
  //   Broker.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  //   Broker.disableRemoteMethodByName('upsertWithWhere');
  // "*": false,

  Broker.email = function (email,tempToken) {
    // console.log('from Broker endpoint');

    console.log(email, tempToken);
  
    //reset the broker password to above
    //email the new password to the email   ID provided

    var url = ""

    // http://localhost:3000/api/Brokers/reset-password?access_token=9KMW34K44rQixEAEOTzaOtQqYVut3fvbaGBa9YG0WNSpYg4MhgTC6OURw0nNJBWN


    //Send email
    Broker.app.models.Email.send({
      to: email,
      from: senderAddress,
      subject: 'Ask Sage',
      html: ' <h1 class="title">Ask Sage</h1> </div><div class="col s12"><h5 class="subtitle">Broker questions. Answered.</h5></div>   <br><br><a href="/reset">Click here to reset</a>'      
      + tempToken
    }, function (err, mail) {
      console.log(mail);

      // cb(err, 'Email sent... SUCCESS');
    });




  };





  Broker.remoteMethod('email', {
    accepts: { arg: 'email', type: 'string' },
    returns: { arg: 'Sucess', type: 'boolean' }
  });

  // Broker.afterRemote('login', function (ctx, data, next) {
  // // if first time logging in prompt for password
  // console.log(ctx, data, next);
  // });


  // Broker.on('resetPasswordRequest', function (info) {
  //   console.log(info.email); // the email of the requested user
  //   console.log(info.accessToken.id); // the temp access token to allow password reset 
  //   // requires AccessToken.belongsTo(User)
  //   info.accessToken.broker(function(err, user) {
  //     console.log(Broker); // the actual user
  //   });
  // });


  // //send verification email after registration
  // Broker.afterRemote('create', function(context, user, next) {
  //   var options = {
  //     type: 'email',
  //     to: user.email,
  //     from: senderAddress,
  //     subject: 'Thanks for registering.',
  //     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //     redirect: '/verified',
  //     user: user
  //   };

  //   user.verify(options, function(err, response) {
  //     if (err) {
  //       User.deleteById(user.id);
  //       return next(err);
  //     }
  //     context.res.render('response', {
  //       title: 'Signed up successfully',
  //       content: 'Please check your email and click on the verification link ' +
  //           'before logging in.',
  //       redirectTo: '/',
  //       redirectToLinkText: 'Log in'
  //     });
  //   });
  // });








};
