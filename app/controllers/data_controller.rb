class DataController < ApplicationController
	before_action :current_customer
	before_action :current_user

	def rewards
		#Pull The Rewards from the API
		rewards_service = RewardsService.new(current_customer)
    @rewards = rewards_service.get_rewards(session[:user_token])
    render :json => @rewards
  end

	def reward
		#Pull Reward with :ID from the API
		rewards_service = RewardsService.new(current_customer)
		@reward = rewards_service.get_reward(params[:id], session[:user_token])
		render :json => @reward
	end

	def history
		#Pull The History from the API
		history_service = HistoryService.new(current_customer)
		@history = history_service.get_history(session[:user_token])
		render :json => @history
	end

	def feed
		#Pull The Feed from the API
		feed_service = FeedService.new(current_customer)
		@feed = feed_service.get_feed(session[:user_token])
		render :json => @feed
	end

	def user_twitter_credentials
		twitter_account = current_user.user_twitter_account
		if (twitter_account.present?)
			if (twitter_account.access_token.present? && twitter_account.access_secret.present?)
				render :json => {:access_token => twitter_account.access_token, :access_secret => twitter_account.access_secret}
				return
			end
		end
		render :json => {:error => "No Twitter Credentials Found for User"}
	end

	def messages
		messages_service = MessagesService.new(current_customer)
		@messages = messages_service.get_messages(session[:user_token])
		render :json => @messages
	end

	def mark_message_as_read
		messages_service = MessagesService.new(current_customer)
		@result = messages_service.mark_message_as_read(session[:user_token], params[:id])
		render :json => @result
	end


end
