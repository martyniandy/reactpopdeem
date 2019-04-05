class ConnectService < PopdeemApiService
  def connect_with_hash(auth_hash, userToken)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_USERS_PATH}/connect_social_account")
    req = Net::HTTP::Post.new(url.to_s)
    prep_req(req)
    req.add_field("User-Token", userToken)
    if (auth_hash[:provider] == "facebook")
		  req.body = {user: {facebook: {id: auth_hash[:uid], access_token: auth_hash[:credentials][:access_token]}}}.to_json
    elsif (auth_hash[:provider] == "twitter")
      req.body = {user: {twitter: {id: auth_hash[:uid], access_token: auth_hash[:credentials][:token], access_secret: auth_hash[:credentials][:secret]}}}.to_json
    elsif (auth_hash[:provider] == "instagram")
      req.body = {user: {instagram: {id: auth_hash[:uid], access_token: auth_hash[:credentials][:token], screen_name: auth_hash[:info][:nickname]}}}.to_json
    end
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    return JSON.parse(res.body)
  end

  def connect_facebook(auth_hash, userToken) 
  end
end