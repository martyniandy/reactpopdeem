require 'hash_dot'
class User < ApplicationRecord
	belongs_to :customer

	def self.from_omniauth(auth, customer)
		case auth.provider
			when 'instagram'
				popdeem_service = UserService.new(customer)
				user_json = popdeem_service.register_user_with_instagram(auth.uid, auth.credentials.token, auth.info.full_name, auth.info.profile_picture)
				user = User.from_popdeem_json(user_json, customer)
    		return user
			when 'facebook'
				popdeem_service = UserService.new(customer)
				user_json = popdeem_service.register_user_with_facebook(auth.uid, auth.credentials.token)
				user = User.from_popdeem_json(user_json, customer)
				return user
			when 'twitter'
				popdeem_service = UserService.new(customer)
				user_json = popdeem_service.register_user_with_twitter(auth.uid, auth.credentials.token, auth.credentials.secret)
				user = User.from_popdeem_json(user_json, customer)
				return user
			else
				return nil
			end
  end

  def self.from_popdeem_json(json, customer)
		json = json.to_dot
		user = User.find_or_create_by(popdeem_id: json.user.id)
		user.first_name = json.user.first_name
		user.last_name = json.user.last_name
		user.sex = json.user.sex
		user.college = json.user.college
		user.customer_id = customer.id
		user.user_token = json.user.user_token

  	#facebook
  	fb = json.user.facebook
  	if fb.access_token.present?
			user.facebook_id = fb.facebook_id
			user.facebook_access_token = fb.access_token
			user.facebook_profile_picture_url = fb.profile_picture_url
  	end
  	#twitter
		tw = json.user.twitter
		if tw.access_token.present?
			user.twitter_id = tw.twitter_id
  		user.twitter_access_token = tw.access_token
			user.twitter_access_secret = tw.access_secret
			user.twitter_profile_picture_url = tw.profile_picture_url
  	end
  	#instagram
  	ig = json.user.instagram
  	if ig.access_token.present?
  		user.instagram_id = ig.instagram_id
  		user.instagram_access_token = ig.access_token
			user.instagram_access_secret = ig.access_secret
			user.instagram_profile_picture_url = ig.profile_picture_url
		end
  	user.save!
    user
  end

  def update
  	popdeem_service = UserService.new(self.customer)
  	user_json = popdeem_service.update_user(self)
  	self.update_with_popdeem_json(user_json)
  end

  def update_with_popdeem_json(json)
  end

end
