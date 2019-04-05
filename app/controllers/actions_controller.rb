class ActionsController < ApplicationController
  def share
    share_service = ShareService.new(current_customer)
    result = share_service.share(params)
    render :json => result
  end

  def background_scan
    scan_service = BackgroundService.new(current_customer)
    result = scan_service.scan(background_params)
    render :json => result
  end

  private
  def share_params
    params.require(:message, :reward_id).permit(:twitter, :facebook, :instagram, :file)
  end

  def background_params
    params.require(:body)
  end
end