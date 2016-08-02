/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'homepage'
    },

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/
    //recursos para los usuarios
    'GET /user/': 'UserController.find',
    //obtiene todos las personas agregadas a la base de datos
    'GET /users/': 'UserController.findAll',
    // crea un usuario con todos los atributos que estan establecidos en el modelo User
    'POST /create': 'UserController.create',
    // metodo para loguear el usuario
    'POST /login/': 'UserController.login',
    // elimina el usuario ingresado por su username
    'DELETE /users/delete/:_id': 'UserController.delete',
    //desinscribe la persona de la applicacion
    'PUT /unsubscribe/': 'UserController.unsubscribe',
    // actualiza la persona buscandola por su id
    'PUT /update/': 'UserController.update',

    // recursos para la pasarela de registro (RegisterController)
    //actalizar numero de celular
    'PUT /phoneNumber/': 'RegisterController.update',
    // recursos para los comparar los amigos de la agenda con nuestras bases de datos(RegisterController)
    'POST /friends/': 'RegisterController.getFriends',
    // recursos para los comparar los amigos de la agenda de los dispositivos Ios con nuestras bases de datos(RegisterController)
    'POST /friendsIos/': 'RegisterController.getFriendsIos',


    //recurso para almacenar en un array el id de la persona que sigue a otra en la App
    'PUT /follows/': 'FriendController.follow',

    // recursos para  actualizar el token de una persona en especifico.
    'PUT /token/': 'TokenController.update',


};
