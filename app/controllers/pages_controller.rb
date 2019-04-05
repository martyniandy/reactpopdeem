class PagesController < ApplicationController
	before_action :current_customer
	def index
	end
	def home
	end
	def share
		@reward_id = params[:id]
	end
end
