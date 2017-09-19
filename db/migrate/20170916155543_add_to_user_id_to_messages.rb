class AddToUserIdToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :to_user_id, :integer
  end
end
