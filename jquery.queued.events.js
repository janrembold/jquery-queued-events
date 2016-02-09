/*! https://github.com/janrembold/jquery-queued-events | Jan Rembold <janrembold@gmail.com> | License: MIT */

(function($) {
    'use strict';

    var eventQueue = [];
    var originalOn = $.fn.on;
    var originalTrigger = $.fn.trigger;

    $.fn.extend({
        on: function() {

            var args = arguments;
            var context = originalOn.apply(this, args);

            // check queue for existing events
            for(var i = 0, eventCount = eventQueue.length; i<eventCount; i++) {
                if( eventQueue[i].ctx.get(0) === this.get(0) && $.inArray(eventQueue[i].args[0], args[0].split(' ')) > -1 ) {
                    originalTrigger.apply(eventQueue[i].ctx, eventQueue[i].args);
                }
            }

            return context;
        },

        trigger: function() {

            var args = arguments;
            var events = $._data(this[0], 'events');

            if( !events || !events[ args[0] ] ) {
                eventQueue.push({
                    ctx: this,
                    args: args
                });
            }

            return originalTrigger.apply(this, args);
        }
    });

})(jQuery);
