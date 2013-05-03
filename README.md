galleria-facebook
=================

Display Facebook Photos on Your Website with Galleria.

Original blog post available at [aiaio](http://www.alexanderinteractive.com/blog/2012/03/display-facebook-photos-on-your-website-with-galleria/)

Galleria
--------
[Galleria](http://galleria.io/)  is a popular, open source photo gallery whose "aim is to simplify the process of creating professional image galleries for the web and mobile devices."  Best of all, it's free and comes with an attractive theme for displaying your photo albums.  You can purchase additional themes, though I've found the basic, free theme to be attractive and sufficient for most purposes.

Out of the box, Galleria does not currently support loading Facebook albums, but does have excellent support for Flickr and Picassa.  I adapted their Flickr plugin to work with Facebook.  You can see an example of the Galleria Facebook Plugin in action on [The Gaga Center](http://www.gagacenter.com) site.

Galleria Facebook Plugin How-To
--------
Instructions on how to display a Facebook photo album on your website using Galleria.

1. You will first need to find the identifier for the Facebook album that you want to display. I haven't yet found an easy way to do this other than looking in the URL when you're viewing the album at Facebook. Navigate to the album in question, and copy down the album id that I've bolded below (for your own album, of course):
  
  http://www.facebook.com/media/set/?set=a.__291489504249941__.68160.249094895156069&type=3
2. Download and install Galleria:

  [http://galleria.io/download/](http://galleria.io/download/)
3. Download and install my Galleria Facebook Plugin:

  Now hosted at GitHub: [https://github.com/aiaio/galleria-facebook](https://github.com/aiaio/galleria-facebook)

The Galleria library has a directory called plugins/.  Download the [latest version of the Galleria Facebook Plugin](https://github.com/aiaio/galleria-facebook/archive/master.zip) from GitHub and place the entire facebook/ folder directly in the plugins/ directory so the file layout looks like this:

    galleria/
      galleria/plugins
        galleria/plugins/facebook
4. Load jQuery, Galleria, and the Galleria Facebook Plugin in your HTML page (this assumes you've put the basic Galleria files in a js/ directory):

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>
    <script src="js/galleria/galleria-1.2.9.min.js"></script>
    <script src="js/galleria/plugins/facebook/galleria.facebook.js"></script>
5. Add the following snippet of HTML to your page, setting your album_id (gathered in step 1), height, and width:

    <script>
    Galleria.loadTheme('js/galleria/themes/classic/galleria.classic.min.js');
    Galleria.run('#galleria', {
     facebook: 'album:291489504249941',
     width: 745,
     height: 550,
     lightbox: true});
    </script>
    <div id="galleria"></div>
6. You can explore more Galleria display options and fun tweaks in the [Galleria Documentation](http://galleria.io/docs).

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