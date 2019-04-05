class SocialHomeController < ApplicationController
	def index
		if session[:user_token] == nil
			redirect_to :controller => 'social_login', :action => 'index'
			return
		end
		@user_profile_picture_url = "https://www.tm-town.com/assets/default_male300x300-aae6ae0235b6cd78cee8df7ae19f6085.png"
		@user_name = "#{current_user.first_name.upcase_first} #{current_user.last_name.upcase_first}"
	end

	def messages 
		if session[:user_token] == nil
			redirect_to :controller => 'social_login', :action => 'index'
		end
	end
	
	def message_show
		if session[:user_token] == nil
			redirect_to :controller => 'social_login', :action => 'index'
		end
	end
end
