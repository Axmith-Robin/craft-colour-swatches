ColourSelectInput = Garnish.Base.extend({

    $container: null,
    $options: null,
    $selectedOption: null,
    $defaultOption: null,
    $input: null,

    init: function(id)
    {
        this.$container = $('#'+id);
        this.$options = this.$container.find('.option');
        this.$selectedOption = this.$options.filter('.button-active');
        this.$defaultOption = this.$options.filter('.option--default');
        this.$input = this.$container.next('input');

        this.addListener(this.$options, 'click', 'onOptionSelect');
    },

    select: function($option)
    {
        if (this.$selectedOption) {
            this.$selectedOption.removeClass('button-active').attr('aria-pressed', 'false');
        }

        if (!$option || !$option.length) {
            this.$selectedOption = null;
            this.$input.val('');
            return;
        }

        this.$selectedOption = $option.addClass('button-active').attr('aria-pressed', 'true');
        var value = $option.data('value');
        this.$input.val(value ? JSON.stringify(value) : '');
    },

    onOptionSelect: function(ev)
    {
        var $option = $(ev.currentTarget);

        // Clicking the active colour again clears it - back to the
        // "Default" choice when the field has one, otherwise to nothing.
        if ($option.hasClass('button-active'))
        {
            if (!$option.is(this.$defaultOption)) {
                this.select(this.$defaultOption.length ? this.$defaultOption : null);
            }
            return;
        }

        this.select($option);
    }

});
