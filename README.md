Hey Will, here's how to get this thing running:

1. Install node.  Pretty sure you've got that sorted.
2. npm install -g firebase-tools.  Think you've got that, too.
3. Running "gulp" will build the site once, "gulp watch" does it on loop.
   Like usual.
3. firebase-deploy will grab the contents of dist and push them to firebase.
3. To run it locally, cd into dist and "python -m SimpleHTTPServer"
3. Note that there doesn't seem to be a way to write a firebase app that
   doesn't use production data all the time.  Not sure how to best deal
   with that.
