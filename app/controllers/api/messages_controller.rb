module Api
	class MessagesController < ApplicationController
		def index
			@messsages = Message.all
			render json: @messsages.to_json
		end
		def create
		  	@messages = Message.new(contents: params[:contents], from_user_id: params[:from_user_id], to_user_id: params[:to_user_id])
		  	if @messages.save
		  		render json: {messages: @messages}
		  	end
		end
	end
end