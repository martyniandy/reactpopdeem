class BackgroundService < PopdeemApiService
  def scan(params)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_REWARDS_PATH}/#{params[:reward_id]}/autodiscovery")
    req = Net::HTTP::Post.new(url.to_s)
    prep_req(req)
    if (params[:user_token].present?)
      req.add_field("User-Token", params[:user_token])
    end
    share_params = Hash.new
    share_params[:network] = params[:network]
    req.body = share_params.to_json
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    return JSON.parse(res.body)
  end
end