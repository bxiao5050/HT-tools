require("should");
var name = "zhaojian";
describe("Name",function(){
	it("The name should be zhaojian",function(){
		name.should.eql("zhaojian");
	});
});

var Person = function(name) {
	this.name = name;
};
var zhaojian = new Person(name);

describe("InstanceOf",function(){
	it("Zhaojian should be an Instance Of Person",function(){
		zhaojian.should.be.an.instanceof(Person);
	});
});

describe("Property",function(){
	it("Zhaojian should have property name",function(){
		zhaojian.should.have.property("name");
	});
});
