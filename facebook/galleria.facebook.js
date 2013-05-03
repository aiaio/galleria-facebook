/**
 * Galleria Facebook Plugin 2012-04-04
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */

(function($) {

/*global jQuery, Galleria, window */

Galleria.requires(1.25, 'The Facebook Plugin requires Galleria version 1.2.5 or later.');

// The script path
var PATH = Galleria.utils.getScriptPath();

/**

    @class
    @constructor

    @example var facebook = new Galleria.Facebook();

    @author http://aino.se
    @author Alex Schmelkin, as@alexanderinteractive.com

    @requires jQuery
    @requires Galleria

    @returns Instance
*/

Galleria.Facebook = function( api_key ) {

    this.options = {
        max: 40,                       // photos to return
        imageSize: 'original',         // facebook album photo property for the main gallery image
        thumbSize: 'thumb',            // facebook album photo property for the thumbnail
        description: false,            // set this to true to get description as caption
        complete: function(){},        // callback to be called inside the Galleria.prototype.load
        backlink: false                // set this to true if you want to pass a link back to the original image
    };
};

Galleria.Facebook.prototype = {

    // bring back the constructor reference

    constructor: Galleria.Facebook,

    /**
        Get photos from an album by ID

        @param {String|Number} album_id The photoset id to fetch
        @param {Function} [callback] The callback to be called when the data is ready

        @returns Instance
    */

    album: function( album_id, callback ) {
	return this._find({
	    album_id: album_id
	}, callback);
    },

    /**
        Set facebook options

        @param {Object} options The options object to blend

        @returns Instance
    */

    setOptions: function( options ) {
        $.extend(this.options, options);
        return this;
    },


    // call Facebook and raise errors

    _call: function( params, callback ) {

	// as of April 2013 the graph api started acting funny in Chrome and Safari because of a new user cookies scheme on Facebook
	// read: http://stackoverflow.com/questions/16063370/facebook-graph-api-call-no-longer-works-because-of-facebook-cookies
	// the workaround is to explicitly call the fields we're looking for on a public Facebook album
	// fields: images, source, picture, link, name
        var url = 'http://graph.facebook.com/' + params['album_id'] + '?callback=?' + '&fields=photos.fields(images,source,picture,link,name)&photos.limit=' + this.options.max;

        var scope = this;

        $.getJSON(url, function(data) {
            if ( data && data.photos && data.photos.data && data.photos.data.length > 0 ) {
                callback.call(scope, data);
            } else {
		Galleria.raise( 'Unable to retrieve Facebook photos from album ' + params['album_id'] );
            }
        });
        return scope;
    },

    // the first element of the photo.images array is the largest one

    _getBig: function( photo ) {
	
	return photo.images[0].source;

    },

    // get image size by option name

    _getSize: function( photo, size ) {

        var img;

        switch(size) {

            case 'thumb':
                img = photo.picture;
                break;

            case 'small':
                img = photo.picture;
                break;

            case 'big':
                img = this._getBig( photo );
                break;

            case 'original':
                img = photo.source;
                break;

            default:
                img = photo.source;
                break;
        }
        return img;
    },


    // ask facebook for photos, parse the result and call the callback with the galleria-ready data array

    _find: function( params, callback ) {

        return this._call( params, function(data) {

            var gallery = [],
	        photos = data.photos.data,
                len = Math.min( this.options.max, photos.length ),
                photo,
                i;

            for ( i=0; i<len; i++ ) {

                photo = photos[i];

                gallery.push({
                    thumb: this._getSize( photo, this.options.thumbSize ),
                    image: this._getSize( photo, this.options.imageSize ),
		    big: this._getBig( photo ),
		    title: photo.name,
                    description: this.options.description && photo.name ? photo.name : '',
                    link: this.options.backlink ? photo.link : ''
                });
            }
            callback.call( this, gallery );
        });
    }
};


/**
    Galleria modifications
    We fake-extend the load prototype to make Facebook integration as simple as possible
*/


// save the old prototype in a local variable

var load = Galleria.prototype.load;


// fake-extend the load prototype using the facebook data

Galleria.prototype.load = function() {

    // pass if no data is provided or facebook option not found
    if ( arguments.length || typeof this._options.facebook !== 'string' ) {
        load.apply( this, Galleria.utils.array( arguments ) );
        return;
    }

    // define some local vars
    var self = this,
        args = Galleria.utils.array( arguments ),
        facebook = this._options.facebook.split(':'),
        f,
        opts = $.extend({}, self._options.facebookOptions),
        loader = typeof opts.loader !== 'undefined' ?
            opts.loader : $('<div>').css({
                width: 48,
                height: 48,
                opacity: 0.7,
                background:'#000 url('+PATH+'loader.gif) no-repeat 50% 50%'
            });

    if ( facebook.length ) {

        // validate the method
        if ( typeof Galleria.Facebook.prototype[ facebook[0] ] !== 'function' ) {
            Galleria.raise( facebook[0] + ' method not found in Facebook plugin' );
            return load.apply( this, args );
        }

        // validate the argument
        if ( !facebook[1] ) {
            Galleria.raise( 'No facebook argument found' );
            return load.apply( this, args );
        }

        // apply the preloader
        window.setTimeout(function() {
            self.$( 'target' ).append( loader );
        },100);

        // create the instance
        f = new Galleria.Facebook();

        // apply Facebook options
        if ( typeof self._options.facebookOptions === 'object' ) {
            f.setOptions( self._options.facebookOptions );
        }

        // call the facebook method and trigger the DATA event
        f[ facebook[0] ]( facebook[1], function( data ) {

            self._data = data;
            loader.remove();
            self.trigger( Galleria.DATA );
            f.options.complete.call(f, data);

        });
    } else {

        // if facebook array not found, pass
        load.apply( this, args );
    }
};

}( jQuery ) );