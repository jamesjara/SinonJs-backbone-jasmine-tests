window.App = {
	Models : {}
};

App.Models.Pet = Backbone.Model.extend({
	defaults : {
		name : '',
		url : ''
	},

	getId : function() {
		return this.id;
	},

	getName : function() {
		return this.get('name');
	},

	getUrl : function() {
		return this.get('url');
	}
});

describe('App.Models.Pet', function() {
	it("should make the correct server request", function() {

		var pet = new App.Models.Pet({
			name : "gutty",
			url : "/pet/1"
		});

		// Spy on jQuery's ajax method
		var spy = sinon.spy(jQuery, 'ajax');

		// Save the model
		pet.save();

		// Spy was called
		expect(spy).toHaveBeenCalled();
		
		// Check url property of first argument
		expect(spy.getCall(0).args[0].url).toEqual("/pet/1");

		// Restore jQuery.ajax to normal
		jQuery.ajax.restore();
	});
});

execJasmine();