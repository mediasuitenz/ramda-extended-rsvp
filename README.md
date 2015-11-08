# ramda-extended-rsvp

This package does the following:

1. Adds `R.rsvp` namespace to house RSVP specific helper functions
2. Supports raw [RSVP.js](https://github.com/tildeio/rsvp.js/) as well as [Ember.RSVP](http://emberjs.com/api/classes/RSVP.html) (see [ember-cli-ramda-extended](https://github.com/mediasuitenz/ramda-extended) for Ember.js support)


## Installation (Browser)

```
<script src="bower_components/ramda-extended/dist/ramda-extended.js">
<script src="bower_components/ramda-extended-rsvp/dist/ramda-extended-rsvp.js">
```

## Installation (Bower)

* `bower install --save ramda-extended-rsvp`

## Installation (Node)

* `npm install --save ramda-extended-rsvp`
* `var R = require('ramda-extended-rsvp')`


## See Also

* [ramda-extended](https://github.com/mediasuitenz/ramda-extended)
* [ramda-extended-rsvp](https://github.com/mediasuitenz/ramda-extended-rsvp)
* [ember-cli-ramda-extended](https://github.com/mediasuitenz/ember-cli-ramda-extended)



## Usage Notes

After installing, the `R` namespace is globally available, including `R.rsvp` and `R.Ember`
