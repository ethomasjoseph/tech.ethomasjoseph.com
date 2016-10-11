# Github Powered Website
This project is my personal bliki website (blog + wiki), which gives me the power to write blogs or wiki articles that evolve over time.

This uses an interesting mix of technology - aptly to power my technology bliki:
* [Jekyll](https://jekyllrb.com) (& its related technologies in [Ruby](https://www.ruby-lang.org))
* [Bootstrap](http://getbootstrap.com/) & [jQuery](https://jquery.com/)
* [NodeJS](https://nodejs.org) and friends ([Bower](https://bower.io/), [Gulp](http://gulpjs.com/) etc.)

# Driving Forces
The reason for me to start a Github powered website had multiple reasons:

1. [Flexibility](http://www.martinfowler.com/bliki/WhatIsaBliki.html) of a blog & wiki as described by Martin Fowler. I used Blogger all since 2006 for my blog, but I always wanted more power - especially when dealing with technology topics.
2. Power and flexibility to control the look and feel of the content published.
3. Learning and apply some frontend technologies such as Bootstrap, Bower & Gulp.
4. Free - as in free speech as well as free as in free beer. Being in Github does not require me to have a web hosting provider. The even better part is that it is free for anyone to see and learn. 

## Focus
While the primary focus of this project is to control the content of my website(s), I will also try to focus that the overall project is reusable enough, so that anyone with similar intents can simply clone this repository - make changes and get started fast.

Having a [Yeoman](http://yeoman.io/) generator is even better, but just too far away at this point of time to consider doing it myself. But this being available on Github, I would not be surprised if some of you may come up with a Yeoman generator!

# Building & Publishing
1. Install latest version of ruby and devkit - from http://rubyinstaller.org/downloads/.
2. Install Jekyll and other dependencies

```bash
gem install jekyll
gem install bundler
gem install github-pages
gem install jemoji
gem install wdm
```

3. Delete the ```Gemfile.lock``` and rebuild it:

```bash
bundle install
```

4. Make changes and run Jekyll locally

```bash
bundle exec jekyll serve
```

5. Commit the added or changed files and push to Github repository.


## Updating web dependencies
This is where NodeJS and friends come to play. If you ever need to update the web dependencies, update the version on ```bower.json``` and run the gulp task so that the latest versions of the web dependencies are applied.

```bash
gulp
```

After making these changes, you will note that there are changes in the ```assets``` folder. Ensure that these changes are committed and pushed to the repository.


# Contributions
Please use the issues tracker on Github to report any issues on this project.

# References
* Inspiration on Jekyll with Bootstrap - http://jekyllbootstrap.com/
* Import your old & busted site or blog for use with Jekyll - http://import.jekyllrb.com/
