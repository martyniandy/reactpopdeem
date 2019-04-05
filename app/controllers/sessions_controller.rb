class SessionsController < ApplicationController
  def new
  end

  def create
    if current_user.present?
      #this is now a connect?
      connect_service = ConnectService.new(current_customer)
      user_json = connect_service.connect_with_hash(auth_hash, session[:user_token])
      if user_json["error"]
        flash[:alert] = user_json["error"]
        redirect_to :controller => 'social_home', :action => 'index'
        return
      end
      @user = User.from_popdeem_json(user_json, current_customer)
      session[:user_token] = @user.user_token
      redirect_to :controller => 'social_home', :action => 'index'
      return
    end

    @user = User.from_omniauth(auth_hash, current_customer)
    session[:user_token] = @user.user_token
    redirect_to :controller => 'social_home', :action => 'index'
    return
  end

  def logout
    session.delete(:user_token)
    redirect_to :controller => 'social_login', :action => 'index'
  end

  def failure
    puts env['omniauth.error'].inspect
  end

  def auth_hash
  	request.env['omniauth.auth']
  end
end
