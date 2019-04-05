class MessagesService < PopdeemApiService

  def get_messages(userToken = nil)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_MESSAGES_PATH}")
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

  def mark_message_as_read(userToken = nil, message_id)
    url = URI.parse("#{POPDEEM_API_URL}/#{POPDEEM_MESSAGES_PATH}/#{message_id}/mark_as_read")
    req = Net::HTTP::Put.new(url.to_s)
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
