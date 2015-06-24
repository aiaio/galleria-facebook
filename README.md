galleria-facebook
=================

Display Facebook Photos on Your Website with Galleria in a responsive layout.

Original blog post available at [aiaio](http://www.alexanderinteractive.com/blog/2012/03/display-facebook-photos-on-your-website-with-galleria/)

Galleria
--------
[Galleria](http://galleria.io/)  is a popular, open source responsive photo gallery whose "aim is to simplify the process of creating professional image galleries for the web and mobile devices."  Best of all, it's free and comes with an attractive theme for displaying your photo albums.  You can purchase additional themes, though I've found the basic, free theme to be attractive and sufficient for most purposes.

Out of the box, Galleria does not currently support loading Facebook albums, but does have excellent support for Flickr and Picassa.  I adapted their Flickr plugin to work with Facebook.  You can see an example of the Galleria Facebook Plugin in action on [The Gaga Center](http://www.gagacenter.com) site.

Galleria Facebook Plugin How-To
--------
Instructions on how to display a Facebook photo album on your website using Galleria.

1. You will first need to find the identifier for the Facebook album that you want to display. I haven't yet found an easy way to do this other than looking in the URL when you're viewing the album at Facebook. Navigate to the album in question, and copy down the album id that I've **{{PUTINBRACES}}** below (for your own album, of course):
  
  http://www.facebook.com/media/set/?set=a.{{291489504249941}}.68160.249094895156069&type=3
2. **(New for June 2015!)** Get a Facebook API access token. Facebook now requires us to have an access token to retrieve photos.  This is true even for public photo albums.  We hope to soon have a post up on the easiest way to generate a token (that doesn't expire), but in the meantime follow the advice of @norbertFeron from [Unable to retrieve Facebook photos from album](https://github.com/aiaio/galleria-facebook/issues/14).
3. Download and install Galleria:

  [http://galleria.io/download/](http://galleria.io/download/)
4. Download and install my Galleria Facebook Plugin:

  Now hosted at GitHub: [https://github.com/aiaio/galleria-facebook](https://github.com/aiaio/galleria-facebook)
The Galleria library has a directory called plugins/.  Download the [latest version of the Galleria Facebook Plugin](https://github.com/aiaio/galleria-facebook/archive/master.zip) from GitHub and place the entire facebook/ folder directly in the plugins/ directory so the file layout looks like this:

    galleria/
      galleria/plugins
        galleria/plugins/facebook
5. Load jQuery, Galleria, and the Galleria Facebook Plugin in your HTML page (this assumes you've put the basic Galleria files in a js/ directory):

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/galleria/galleria-1.4.2.min.js"></script>
<script src="js/galleria/plugins/facebook/galleria.facebook.js"></script>
```
6. Add the following snippet of HTML to your page, setting your album_id (gathered in step 1), facebook_access_token (created in step 2), and optionally the [height](http://galleria.io/docs/options/height/) and [width](http://galleria.io/docs/options/width/).  Galleria has great support for [responsive layouts](http://galleria.io/docs/options/responsive/).

```html
<script>
Galleria.loadTheme('js/galleria/themes/classic/galleria.classic.min.js');
Galleria.run('#galleria', {
 facebook: 'album:291489504249941',
 width: 745,
 height: 550,
 lightbox: true,
 facebookOptions: {
   max: 30, // optional override for limit of 40 photos on an album
   facebook_access_token: 'YOUR_ACCESS_TOKEN_FROM_STEP_2'
 }
});
</script>
<div id="galleria"></div>
```
7. You can explore more Galleria display options and fun tweaks in the [Galleria Documentation](http://galleria.io/docs).

An Example!
-----
See the [Facebook Galleria Plugin](http://www.alexanderinteractive.com/blog/2012/03/display-facebook-photos-on-your-website-with-galleria/) in action on [The Gaga Center](http://www.gagacenter.com/gallery) website.

Support Galleria
----
Finally, do consider purchasing additional themes as the developer generously donates this photo gallery to the world and I'm sure would appreciate it! (we have no connection to them) The gallery has great support for mobile and tablet, including native swipe gestures.

Credits
----
Brought to you by your friends at [Ai](http://www.alexanderinteractive.com).

Special thanks to the active community of users and testers on the [aiaio blog](http://www.alexanderinteractive.com/blog).
