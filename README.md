# Brunch with coffee and spine
This is a simple [Spine](http://spinejs.com/) Coffee skeleton for [Brunch](http://brunch.io/).

Main languages are [CoffeeScript](http://coffeescript.org/),
[Stylus](http://learnboost.github.com/stylus/) and
[Eco](https://github.com/sstephenson/eco/).

## Getting started

#### Brunch with Spine Skeleton

    $ brunch new <appname> --skeleton git@github.com:m9dfukc/spine-on-brunch
    $ brunch w -s

or

    $ git clone git@github.com:m9dfukc/spine-on-brunch
    $ npm install
    $ brunch w -s

or

    $ git clone git@github.com:m9dfukc/spine-on-brunch && npm install && brunch w -s

See more info on the [official site](http://brunch.io).

## Overview

    config.coffee
    README.md
    /app/
      assets/
        index.html
      models/
      styles/
      views/
      application.coffee
    /test/
      spec.coffee
    /vendor/
      scripts/
        common/jquery-1.8.0.js
        common/console-helper.js
        common/underscore-1.3.3.js
        spine/spine.js
        spine/lib/ajax.js
        spine/lib/databind.js
        spine/lib/list.js
        spine/lib/local.js
        spine/lib/manager.js
        spine/lib/route.js
        spine/lib/relation.js
      styles/
        normalize.css
        helpers.css

* `config.coffee` contains configuration of your app. You can set plugins /
languages that would be used here.
* `app/assets` contains images / static files. Contents of the directory would
be copied to `build/` without change.
Other `app/` directories could contain files that would be compiled. Languages,
that compile to JS (coffeescript, roy etc.) or js files and located in app are
automatically wrapped in module closure so they can be loaded by
`require('module/location')`.
* `app/models` & `app/views` contain base classes your app should inherit from.
* `test/` contains feature & unit tests.
* `vendor/` contains all third-party code. The code wouldn’t be wrapped in
modules, it would be loaded instantly instead.

This all will generate `public/` (by default) directory when `brunch build` or `brunch watch` is executed.


## Spine Extensions

* Nathan Palmers' [Databind](https://github.com/nathanpalmer/spine.databind) module.  


## Other
Versions of software the skeleton uses:

* jQuery 1.8.0
* Spine 1.0.8
* Eco 1.3.0
* HTML5Boilerplate 3.0.3