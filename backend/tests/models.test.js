// Tests the models Address and Users

const { Address, User } = require("../models/models");

describe("Address", () => {
  it("should create a new address", () => {
    const address = new Address("Landmark", "Street", "City", "Country");
    expect(address).toBeInstanceOf(Address);
    expect(address.landmark).toEqual("Landmark");
    expect(address.street).toEqual("Street");
    expect(address.city).toEqual("City");
  });

  it("should create a new address with default values", () => {
    const address = new Address();
    expect(address).toEqual({
      landmark: undefined,
      street: undefined,
      city: undefined,
      country: undefined,
    });
  });
});

// describe("Users", () => {
//   it("should have an id, first_name, last_name, email, physical_address, and billing_address", () => {});
//   it("should accept an default constructor", () => {});
// });
