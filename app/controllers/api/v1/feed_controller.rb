module Api
  module V1
    class FeedController < Api::ApiController
      def index
        @feed = []
        render :json => {"feed" => @feed}
      end
    end
  end
end
