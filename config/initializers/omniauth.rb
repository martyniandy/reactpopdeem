TWITTER_PROC = lambda do |env| 
  request = ActionDispatch::Request.new(env)
  customer = Customer.find_by_subdomain(request)
  env['omniauth.strategy'].options[:consumer_key] = customer.customer_twitter_setting.consumer_key
  env['omniauth.strategy'].options[:consumer_secret] = customer.customer_twitter_setting.consumer_secret
end

INSTAGRAM_PROC = lambda do |env|
  request = ActionDispatch::Request.new(env)
  customer = Customer.find_by_subdomain(request)
  env['omniauth.strategy'].options[:client_id] = customer.customer_instagram_setting.client_id
  env['omniauth.strategy'].options[:client_secret] = customer.customer_instagram_setting.client_secret
end
  
FACEBOOK_PROC = lambda do |env|
  request = ActionDispatch::Request.new(env)
  customer = Customer.find_by_subdomain(request)
  env['omniauth.strategy'].options[:client_id] = customer.customer_facebook_setting.app_id
  env['omniauth.strategy'].options[:client_secret] = customer.customer_facebook_setting.app_access_token
end

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, :setup => TWITTER_PROC
  provider :instagram, :setup => INSTAGRAM_PROC
  provider :facebook, :setup => FACEBOOK_PROC
end