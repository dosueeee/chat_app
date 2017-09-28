module Api
	class MessagesController < ApplicationController
		def index
			@messsages = Message.all
			render json: @messsages.to_json
		end

		def create
		  	@message = current_user.messages.create(message_params)
		  	render json: {message: @message}
		end

		def upload_image
			@image_message = current_user.messages.new(params[:id])
			@image_message.to_user_id = params[:to_user_id]
			@image_message.set_image(params[:image])
			@image_message.save
			render json: {message: @image_message}
		end

		private

		def message_params
			params.require(:message).permit(:contents, :to_user_id)
		end
	end
end