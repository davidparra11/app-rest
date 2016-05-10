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
    'get /user/': {
        controller: 'UserController',
        action: 'find'
    },
    //obtiene todos las personas agregadas a la base de datos 
    'get /users/': {
        controller: 'UserController',
        action: 'findAll'
    },
    // crea un usuario con todos los atributos que estan establecidos en el modelo User
    'post /create/': {
        controller: 'UserController',
        action: 'create'
    },
    // metodo para loguear el usuario
    'post /login/': {
        controller: 'UserController',
        action: 'login'
    },
    // elimina el usuario ingresado por su username
    'delete /users/delete/:_id': {
        controller: 'UserController',
        action: 'delete'
    },
    //desinscribe la persona de la applicacion
    'put /unsubscribe/': {
        controller: 'UserController',
        action: 'unsubscribe'
    },
    // actualiza la persona buscandola por su id
    'put /update/': {
        controller: 'UserController',
        action: 'update'
    },

    // recursos para la pasarela de registro (RegisterController)
    //actalizar numero de celular
    'put /phoneNumber/': {
        controller: 'RegisterController',
        action: 'update'
    },

    // recursos para los comparar los amigos de la agenda con nuestras bases de datos(RegisterController)
    'post /friends/': {
        controller: 'RegisterController',
        action: 'getFriends'
    },


    // recursos para giardar en bases de datos la reacion de amigos cuando una persona desea seguir a otra(RegisterController).
    'put /follow/': {
        controller: 'RegisterController',
        action: 'follow'
    },

    // recursos para  actualizar el token de una persona en especifico.
    'put /token/': {
        controller: 'TokenController',
        action: 'update'
    },

};