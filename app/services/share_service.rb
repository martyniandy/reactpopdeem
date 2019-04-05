class ShareService < PopdeemApiService
  def share(params)
    share_params = Hash.new
    if (params[:body][:message])
      share_params[:message] = params[:body][:message]
    end
    if (params[:body][:facebook])
      share_params[:facebook] = Hash.new
      share_params[:facebook][:access_token] = params[:body][:facebook][:access_token]
    end
    location = Hash.new
    location[:longitude] = -6.266340000000014
    location[:latitude] = 53.3357
    location[:id] = 741
    share_params[:location] = location

    if (params[:body][:file].present?) 
      share_params[:file] = params[:body][:file]
    end

    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_REWARDS_PATH}/#{params[:body][:reward_id]}/claim")
    req = Net::HTTP::Post.new(url.to_s)
    prep_req(req)
    req.body = share_params.to_json
    if (params[:body][:user_token].present?)
      req.add_field("User-Token", params[:body][:user_token])
    end

    res = Net::HTTP.start(url.host, url.port) {|http|
  			http.request(req)
    }
	  return res.body
  end
end