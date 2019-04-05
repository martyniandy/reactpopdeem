class UserService < PopdeemApiService

	def register_user_with_facebook(id, access_token)
		url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_USERS_PATH}")
		req = Net::HTTP::Post.new(url.to_s)
		prep_req(req)
		req.body = {user: {facebook: {id: id, access_token: access_token}}}.to_json
		res = Net::HTTP.start(url.host, url.port) {|http|
			http.request(req)
		}
		return JSON.parse(res.body)
	end

	def register_user_with_instagram(id, access_token, full_name = "", profile_picture = "")
		url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_USERS_PATH}")
		req = Net::HTTP::Post.new(url.to_s)
		prep_req(req)
		req.body = {user: {instagram: {id: id, access_token: access_token, full_name: full_name, profile_picture: profile_picture}}}.to_json
		res = Net::HTTP.start(url.host, url.port) {|http|
  		http.request(req)
		}
		return JSON.parse(res.body)
	end

	def register_user_with_twitter(id, access_token, access_secret)
		url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_USERS_PATH}")
		req = Net::HTTP::Post.new(url.to_s)
		prep_req(req)
		req.body = {user: {twitter: {id: id, access_token: access_token, access_secret: access_secret}}}.to_json
		res = Net::HTTP.start(url.host, url.port) {|http|
			http.request(req)
		}
		return JSON.parse(res.body)
	end

	def get_user_details(user)
		url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_USERS_PATH}/#{user.id}")
		req = Net::HTTP::Get.new(url.to_s)
		prep_req(req)
		req.add_field("User_Token", user.user_token)
		res = Net::HTTP.start(url.host, url.port) {|http|
  			http.request(req)
		}
		return JSON.parse(res.body)
	end

	def update_user(user)
		url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_USERS_PATH}")
		req = Net::HTTP::Put.new(url.to_s)
		req.add_field("User_Token", user.user_token)
		req.body = {user: {
			platform: 'web'
		}}.to_json
		res = Net::HTTP.start(url.host, url.port) {|http|
  			http.request(req)
		}
		return JSON.parse(res.body)
	end

end