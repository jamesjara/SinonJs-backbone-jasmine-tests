window.App = {
	Models : {}
};

App.Models.Pet = Backbone.Model.extend({
	defaults : {
		name : '',
		url : ''
	},

	url : function() {
		return "/pet/" + this.id;
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

describe("pets model", function() {
	beforeEach(function() {
		this.server = sinon.fakeServer.create();
	});

	afterEach(function() {
		this.server.restore();
	});

	it("should fire the change event", function() {
		var callback = sinon.spy();
		// will return a 200 response of type
		// application/json with the given JSON response body
		this.server.respondWith("GET", "/pet/123", [ 200, {
			"Content-Type" : "application/json"
		}, '{"id":123,"name":"skyisthelimit"}' ]);

		var pet = new App.Models.Pet({
			id : 123
		});

		// Bind to the change event on the model
		pet.bind('change', callback);

		// makes an ajax request to the server
		pet.fetch();

		// Fake server responds to the request
		this.server.respond();

		// Expect that the spy was called with the new model
		expect(callback.called).toBeTruthy();
		expect(callback.getCall(0).args[0].attributes).toEqual({
			id : 123,
			name : "skyisthelimit"
		});

	});

});

execJasmine();