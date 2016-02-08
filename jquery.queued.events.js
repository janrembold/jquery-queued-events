/*! https://github.com/janrembold/jquery-queued-events | Jan Rembold <janrembold@gmail.com> | License: MIT */

(function($) {
    'use strict';

    var triggeredEvents = [];
    var original = {
        on: $.fn.on,
        trigger: $.fn.trigger
    };

    $.fn.extend({
        on: function() {

            var args = arguments;
            var context = original.on.apply(this, args);

            for(var i = 0, eventCount = triggeredEvents.length; i<eventCount; i++) {
                if( triggeredEvents[i].ctx.get(0) === this.get(0) && $.inArray(triggeredEvents[i].args[0], args[0].split(' ')) > -1 ) {
                    original.trigger.apply(triggeredEvents[i].ctx, triggeredEvents[i].args);
                }
            }

            return context;

        },

        trigger: function() {

            var args = arguments;
            //var addToQueue = true;
            //var eventCount = triggeredEvents.length;
            //
            //for(var i=0; i<eventCount; i++) {
            //    if( triggeredEvents[i].ctx.get(0) === this.get(0) && triggeredEvents[i].args === args) {
            //        addToQueue = false;
            //        break;
            //    }
            //}

            //if( addToQueue ) {
                triggeredEvents.push({
                    ctx: this,
                    args: args
                });
            //}

            return original.trigger.apply(this, args);
        }
    });

})(jQuery);
