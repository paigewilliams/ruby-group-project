# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Place.create!([
{ "name": "Epicodus", "latitude": "45.520788","longitude": "-122.677645"},
{ "name": "Portland Art Museum", "latitude": "45.516493", "longitude": "-122.684014"},
{ "name": "Japanese Garden", "latitude": "45.519105", "longitude": " -122.705346"}
])
