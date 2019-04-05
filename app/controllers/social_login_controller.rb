class SocialLoginController < ApplicationController
	def index
		if current_user.present?
			redirect_to :controller => 'social_home', :action => 'index'
		end
	end
end
