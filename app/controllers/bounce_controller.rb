class BounceController < ApplicationController
	def bounce
		redirect_to 'http://www.popdeem.com'
	end
end
