module Api
	class MessagesController < ApplicationController
		def index
			@messsages = Message.all
			render json: @messsages.to_json
		end
	end
end