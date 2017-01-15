window.App = {
    Models: {}
};

App.Models.Pet = Backbone.Model.extend({  
    defaults: {
        name: ''
    },

    getId: function() {
        return this.id;
    },

    getName: function() {
        return this.get('name');
    }
});

describe('App.Models.Pet', function() {
    it('should be defined', function() {
        expect(App.Models.Pet).toBeDefined();
    });

    it('can be instantiated', function() {
        var pet = new App.Models.Pet();
        expect(pet).not.toBeNull();
    });

    beforeEach(function() {
        this.pet = new App.Models.Pet();
    });

    describe('default values', function() {
        it('should have mpety default value', function() {
            expect(this.pet.get('name')).toEqual('');
        }); 
    });

    describe('getters', function() {
        describe('#getId', function() {
            it('should be defined', function() {
                expect(this.pet.getId).toBeDefined();
            });

            it('returns undefined if id is not defined', function() {
                expect(this.pet.getId()).toBeUndefined();
            });

            it("otherwise returns model's id", function() {
                this.pet.id = 66;
                expect(this.pet.getId()).toEqual(66);
            });
        });

        describe('#getName', function() {
            it('should be defined', function() {
                expect(this.pet.getName).toBeDefined();
            });

            it('returns value for the name attribute', function() {
                var stub = sinon.stub(this.pet, 'get').returns('');

                expect(this.pet.getName()).toEqual('');
                expect(stub.calledWith('name')).toBeTruthy();
            });
        }); 
    }); 
});

execJasmine();