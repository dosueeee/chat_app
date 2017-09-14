module Api
class MessagesController < ApplicationController
	def index
		@messsages = message.all
		render json: @messages
	end
end