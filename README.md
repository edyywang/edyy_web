# edyy test web
* https://edyy-web.herokuapp.com/

## test GA event with Tag Manager
1) create User Defined Variable ga_event_category, ga_event_action, ga_event_label, ga_event_value in Tag Manager
2) trigger fire when custom event matching "^event_" by reg matching, so will fire when the event name starts with "event_"
3) add Tag for GA tracking event with user defined variable

* landing page
```
  event: event_sign_up
  ga_event_category: sign_up
  ga_event_action: sign_up
  ga_event_label: sign_up_1 or sign_up_2
  ga_event_value: 0
```
* sign up 1 page
```
  event: event_sign_up
  ga_event_category: sign_up
  ga_event_action: signing_up
  ga_event_label: signing_up_1
  ga_event_value: 4
```
* sign up 2 page
```
  event: event_sign_up
  ga_event_category: sign_up
  ga_event_action: signing_up
  ga_event_label: signing_up_2
  ga_event_value: 6
```
* sign up success page
```
  event: event_sign_up
  ga_event_category: sign_up
  ga_event_action: sign_up_success
  ga_event_label: sign_up_success
  ga_event_value: 10
```

## test Vue.js
Vue JS

## test Vue D3
Vue D3

## test AirBnB Superset js
Superset

## test Axios & Lodash for Ajax API
need to find a public API for testing like google DNS

## test Google Map API
google map API

## Facebook chatbot
facebook chatbot

## Line chatbot
line chatbot
