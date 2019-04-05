class FeedService < PopdeemApiService
  def get_feed(userToken = nil)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_FEEDS_PATH}")
    req = Net::HTTP::Get.new(url.to_s)
		prep_req(req)
    if (userToken.present?)
      req.add_field("User-Token", userToken)
    end
    res = Net::HTTP.start(url.host, url.port) {|http|
  			http.request(req)
    }
		return JSON.parse(res.body)
  end
end