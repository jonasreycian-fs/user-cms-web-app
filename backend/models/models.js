// This file contains the models for the database

// Address with a landmark, city, street, country
class Address {
  constructor(landmark, street, city, country) {
    this.landmark = landmark;
    this.street = street;
    this.city = city;
    this.country = country;
  }
}

// A user with an id, first_name, last_name, email, physical_address, and billing_address, updated_at, and created_at
class Users {
  constructor(
    id,
    first_name,
    last_name,
    email,
    physical_address,
    billing_address,
    updated_at,
    created_at
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.physical_address = physical_address;
    this.billing_address = billing_address;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}

module.exports = {
  Address: Address,
  Users: Users,
};
