# jquery-queued-events

This plugin adds an event queue to the default jQuery functions `on()` and `trigger()`.
That means that events that have no listeners yet are pushed to an internal event queue and fired as soon as the listener is created.

This is helpful if script include order is random or not predictable. 

## Usage

Just include the script and use your jQuery events as usual.  

```html 
<script src="dist/jquery.queued.events.min.js"></script>
```

