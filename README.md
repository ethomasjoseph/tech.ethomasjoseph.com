# Github + Bootstrap Powered Website
This project is the code and configuration for my personal bliki website (blog + wiki), which gives me the power to write articles that evolve over time.

This uses an interesting mix of technology - aptly to power my technology bliki:
* [Jekyll](https://jekyllrb.com) (& its related technologies in [Ruby](https://www.ruby-lang.org))
* [Bootstrap](http://getbootstrap.com/) & [jQuery](https://jquery.com/)
* [NodeJS](https://nodejs.org) and friends ([Bower](https://bower.io/), [Gulp](http://gulpjs.com/) etc.)

## Driving Forces
The reason for me to start a Github powered website had multiple reasons:

1. [Flexibility](http://www.martinfowler.com/bliki/WhatIsaBliki.html) of a blog & wiki as described by Martin Fowler. I used Blogger since 2006 for my blog, but I always wanted more power - especially when dealing with technology topics.
2. Power and flexibility to control the look and feel of the content published.
3. Learning and apply some frontend technologies such as Bootstrap, Bower & Gulp.
4. Free - as in free speech as well as free as in free beer. Being in Github does not require me to have a web hosting provider. The even better part is that it is free for anyone to see and learn. 

### Focus
While the primary focus of this project is to control the content of my website(s), I will also try to focus that the overall project is reusable enough, so that anyone with similar intent can simply clone this repository - make changes and get started fast.

Having a [Yeoman](http://yeoman.io/) generator is even better, but just too far away at this point of time to consider doing it myself. But this being available on Github, I would not be surprised if someone will come up with a Yeoman generator!

## Setting up your local environment
#### 1. Install latest version of ruby and devkit - from http://rubyinstaller.org/downloads/.

#### 2. Install Jekyll and other dependencies

```bash
gem install jekyll
gem install bundler
gem install github-pages
gem install jemoji
gem install wdm
```
#### 3. Delete the ```Gemfile.lock``` and rebuild it:

```bash
bundle install
```

#### 4. Make changes and run Jekyll locally to confirm that the command executes properly. Do not focus on the website output yet. More information on Jekyll on its official documentation at https://jekyllrb.com/docs/home/.
```bash
bundle exec jekyll serve
```

#### 5. No doubt - you will have to also setup NodeJS and its friends. Install the latest NodeJS from https://nodejs.org/.

#### 6. Now install Gulp as described in https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md.

#### 7. Now setup initial NodeJS dependencies for this project

```bash
npm install
```

## Building & Publishing
This is where NodeJS and friends come to play. Gulp has been used to automate most of the tasks needed for building and running the website locally.

### Updating web dependencies
If you need to update the web dependencies, update the version on ```bower.json``` and run the gulp task so that the latest versions of the web dependencies are applied.
```bash
gulp updatelibs
```

After making these changes, you will note that there are changes in the ```assets``` folder. Ensure that these changes are committed and pushed to the repository.

### Editing website content and bulding
The normal website edit - whether it is changing the code or design, or whether it is adding new content, gulp tasks have been confugured for these as well, which will also run the Jekyll, so that you can exactly see how it will look when hosted on Github pages.

```bash
gulp serve
```

The above command will process the JavaScript files by concatinating, uglifying and linting them; start Jekyll server; and lint the generated HTML files as well!

Simply running ```gulp``` will do all the above tasks, but without running the Jekyll server itself, and hence will not also perform the linting of HTML files. This would be useful if your changes are small and can be directly pushed into Github pages.

Commit the files and pushing it to Github will publish the files.

# Contributions
Please use the issues tracker on Github to report any issues on this project. 

# References
* Github Pages documentation - https://pages.github.com/
* Inspiration on Jekyll with Bootstrap - http://jekyllbootstrap.com/
* Import your old & busted site or blog for use with Jekyll - http://import.jekyllrb.com/
* Learn about liquid syntax (templating language used in Jekyll) - https://shopify.github.io/liquid/
* Nice & elaborates tutorial on setting up Jekyll website on Github pages - http://digitaldrummerj.me//blogging-on-github-part-1-Getting-Started/
