module Api
	class MessagesController < ApplicationController
		def index
			@messsages = Message.all
			render json: @messsages.to_json
		end
		def create
		  	@messages = Message.new(contents: params[:contents], from: params[:from])
		  	# @messages = Message.new(params[:contents])
		  	# @messages = Message.new(contents_params)
		  	if @messages.save
		  		render json: {messages: @messages}
		  	end
		end
	end
end