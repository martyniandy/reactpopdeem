class RewardsService < PopdeemApiService

  def get_rewards(userToken = nil)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_REWARDS_PATH}")
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

  def get_reward(reward_id, userToken)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_REWARDS_PATH}/#{reward_id}")
    req = Net::HTTP::Get.new(url.to_s)
    prep_req(req)
    req.add_field("User-Token", userToken)
    res = Net::HTTP.start(url.host, url.port) {|http|
  			http.request(req)
		}
		return JSON.parse(res.body)
  end

end
