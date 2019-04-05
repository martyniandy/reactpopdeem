class ShareController < ApplicationController
	def index
		if !current_user.present?
			redirect_to :controller => 'social_login', :action => 'index'
		end
		@reward_id = params[:id]
	end
end
