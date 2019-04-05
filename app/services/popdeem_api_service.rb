require 'net/http'
require 'uri'
require 'json'
class PopdeemApiService
	def initialize(customer)
		@current_customer = customer
	end

	def prep_req(req)
		req.add_field("Api-Key", @current_customer.api_key)
		req.add_field("Content-Type", 'application/json')
		req.add_field("Accept", 'application/json')
	end

end