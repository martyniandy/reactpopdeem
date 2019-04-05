class Customer < ApplicationRecord

	has_one :customer_facebook_setting
	has_one :customer_twitter_setting
	has_one :customer_instagram_setting
	has_one :customer_theme

	def self.find_by_subdomain(request)
		Customer.where('lower(slug) = ?', request.subdomain.downcase).first
	end
end
