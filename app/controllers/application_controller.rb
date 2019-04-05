require 'omniauth'
class ApplicationController < ActionController::Base
  use Rack::Session::Cookie
  protect_from_forgery with: :exception
  private

  def current_customer
    @current_customer = Customer.find_by_subdomain(request)
  end

  def current_user
  	if session[:user_token] != nil
  		return User.where(:user_token => session[:user_token]).first
    end
    return nil
  end

  helper_method :current_customer
  helper_method :current_user
end
